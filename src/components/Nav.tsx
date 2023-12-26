import { Link, NavLink } from "react-router-dom";
function Nav() {
  return (
    <nav>
      <ul>
        <li>
          {/* <Link to={"/"}> Home </Link> 
          <Link to={"/pricing"}> Pricing </Link>
          <Link to={"/product"}>Product</Link> */}
          <NavLink to={"/"}> Home </NavLink>
          <NavLink to={"/pricing"}> Pricing </NavLink>
          <NavLink to={"/product"}>Product</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
