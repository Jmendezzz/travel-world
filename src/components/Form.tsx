// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";


import styles from "./Form.module.css";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const navigate = useNavigate();
  const [lat, lng] = useUrlPosition();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState<Date | null >(new Date());
  const [notes, setNotes] = useState("");

  const [isLoadindGeo, setIsLoadingGeo] = useState(false);
  const [geoError, setGeoError] = useState<any>(null);
  useEffect(() => {
    if (!lat || !lng) return;
    
    async function fetchCityData() {
      try{
        setIsLoadingGeo(true);
        setGeoError(null);
        const response = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await response.json();
        if(!data.countryCode){
          throw new Error("That doesn't seem to be a city. Please try again.😪");
        }
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
      }catch(error){
        setGeoError(error.message);
    }finally{
      setIsLoadingGeo(false);
    }
  }
    fetchCityData();
  },[lat, lng]);

  if(isLoadindGeo){
    return (
      <Spinner /> 
    )
  }
  if(!lat || !lng){
    return (
      <Message message="Please select a location on the map." /> 
    )
  }

  if(geoError){
    return (
      <Message message={geoError} /> 
    )
  }

  function submitHandler(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    if(!cityName || !country || !date) return;
  
    const city = {
      cityName,
      country,
      date,
      notes,
      position: {
        lat,
        lng,
      },
    };

  }

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker onChange={date=> setDate(date)} selected={date} dateFormat="dd/MM/yyyy" />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
