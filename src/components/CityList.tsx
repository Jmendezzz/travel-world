import { City } from "../interfaces/City";
import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";

type props = {
  cities: Array<City>;
  isLoading: boolean;
};

function CityList({ cities, isLoading }: props) {

  if (isLoading) {
    return <Spinner />;
  }
  if (cities.length === 0) {
    return <Message message={"No cities added yet!"} /> 
  }

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}

export default CityList;
