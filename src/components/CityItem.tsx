import { City } from "../interfaces/City";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";

type props = {
  city: City;
};
const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }: props) {
  return (
    <li>
      <Link
        className={styles.cityItem}
        to={`${city.id.toString()}?lat=${city.position.lat}&lng=${
          city.position.lng
        }`}
      >
        <span className={styles.emoji}>{city.emoji}</span>
        <h3 className={styles.name}>{city.cityName}</h3>
        <time className={styles.date}>{formatDate(city.date)}</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}

export default CityItem;
