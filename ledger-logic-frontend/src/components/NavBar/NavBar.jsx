"use client";
import styles from "./NavBar.module.css";
import { useContext } from "react";
import AppContext from "../../../context/AppContext";
import userIcon from "../../assets/icon.png";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
const NavBar = () => {
  const { state, setState } = useContext(AppContext);
  console.log(state);
  return (
    <div className={`${styles.container} pd-hz`}>
      <Link to="/">
        <img alt="Ledger Logic LOGO" src={logo} className={styles.logo} />
      </Link>

      <div>
        {!state.isLoggedIn ? (
          <Link to="/login">Log in</Link>
        ) : (
          <div className={styles.toggle}>
            <Link to="/UserDashboard">
              <img
                alt="user profile icon"
                src={userIcon}
                width={30}
                height={30}
              />
            </Link>
            <Link to="/">Log out</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
