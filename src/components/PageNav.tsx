import styles from "./PageNav.module.css";
import { NavLink,Link } from "react-router-dom";
import Logo from "./Logo";
function PageNav() {
    return (
        <nav className={styles.nav}>
            <Link to={"/"}> <Logo/> </Link>
          <ul>

              {/* <Link to={"/"}> Home </Link> 
              <Link to={"/pricing"}> Pricing </Link>
              <Link to={"/product"}>Product</Link> */}
            <li>
              <NavLink to={"/pricing"}> Pricing </NavLink>
            </li>
            <li>
              <NavLink to={"/product"}>Product</NavLink>
            </li>
            <li>
              <Link className="cta" to={"/login"}>Login</Link>
            </li>
          </ul>
        </nav>
      );
}

export default PageNav