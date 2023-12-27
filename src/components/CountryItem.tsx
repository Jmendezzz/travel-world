import { Country } from "../interfaces/Country";
import styles from "./CountryItem.module.css";
type props = {
  country: Country
}
function CountryItem({ country }: props) {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );0
}

export default CountryItem;
