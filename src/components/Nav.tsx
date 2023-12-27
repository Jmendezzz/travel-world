import { NavLink } from "react-router-dom";
import styles from "./Nav.module.css";
function Nav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          {/* <Link to={"/"}> Home </Link> 
          <Link to={"/pricing"}> Pricing </Link>
          <Link to={"/product"}>Product</Link> */}
          <NavLink to={"/"}> Home </NavLink>
        </li>
        <li>
          <NavLink to={"/pricing"}> Pricing </NavLink>
        </li>
        <li>
          <NavLink to={"/product"}>Product</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
