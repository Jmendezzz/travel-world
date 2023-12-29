import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCitiesContext } from "../contexts/CitiesContext";


function CityList() {
  const { cities, isLoading} = useCitiesContext();

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
