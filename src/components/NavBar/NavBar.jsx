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
        
      </Link>

      <div>
        {!state.isLoggedIn ? (
          <Link to="/login">Log in</Link>
        ) : (
          <div className={styles.toggle}>
            <img alt="Ledger Logic LOGO" src={logo} className={styles.logo} />
            <Link to="/admin-dashboard"></Link>
            <Link to="/admin-dashboard">ab0224
              <img className={styles.userIcon}
                alt="user profile icon"
                src={userIcon}
                width={30}
                height={30}
              />
            </Link>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;

//   TODO: 
//  add current_user's username at right side of NavBar
//  make the navbar response depended on user type
//           * User should go to UserDashboard
//           * Manager should go to ManagerDashboard
//           * Admin should go to AdminDashboard