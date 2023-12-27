import styles from "./Sidebar.module.css";
import Logo from "./Logo";
import AppNav from "./AppNav";
import { Outlet } from "react-router-dom";
function Sidebar() {
  return (
    <div className={styles.sidebar}>
        <Logo /> 
        <AppNav />
        <Outlet />
        <footer className={styles.footer}>
            <p className={styles.copyright}>© 2023 Juan Gerardo</p>
        </footer>
    </div>
  )
}

export default Sidebar