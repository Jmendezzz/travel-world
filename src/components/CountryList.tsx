import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";
import { Country } from "../interfaces/Country";
import { useCitiesContext } from "../contexts/CitiesContext";


function CountryList() {
  const { cities, isLoading } = useCitiesContext();
  if (isLoading) {
    return <Spinner />;
  }

  if (cities.length === 0) {
    return <Message message={"No cities added yet!"} />;
  }
  const countries:Array<Country> = cities.reduce((arr, city) => 
  {
    if(arr.map(el=>el.country).includes(city.country)){
      return arr;
    }else{
      return [...arr, {country: city.country, emoji: city.emoji}];
    }
  }
   ,[] as Array<Country>);

  return <ul className={styles.countryList}>
    {countries.map((country) => (<CountryItem key={country.country} country={country} />))}
  </ul>;
}

export default CountryList;
