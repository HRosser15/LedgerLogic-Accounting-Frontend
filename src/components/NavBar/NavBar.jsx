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

const renderLinks = () => {
    if (state.isLoggedIn) {
      switch (state.userRole) {
        case "admin":
          return (
            <>
              <Link to="/admin-dashboard">Admin Dashboard</Link>
              <Link to="/user-list">View User List</Link>
              <Link to="/user-list">View Expired Passwords</Link>
              <Link to="/user-list">Email User</Link>
              {/* Add other admin links here */}
            </>
          );
        case "manager":
          return (
            <>
              <Link to="/manager-dashboard">Manager Dashboard</Link>
              {/* Add other manager links here */}
            </>
          );
        case "user":
          return (
            <>
              <Link to="/user-dashboard">User Dashboard</Link>
              {/* Add other user links here */}
            </>
          );
        default:
          return null;
      }
    }
    return null;
  };

  return (
    <div className={`${styles.container} pd-hz`}>
      {renderLinks()}
      <Link to="/"></Link>
      <div>
        {state.isLoggedIn ? (
          <div className={styles.toggle}>
            <img alt="Ledger Logic LOGO" src={logo} className={styles.logo} />
            
            <Link to="/">
              {state.username}
              <img
                className={styles.userIcon}
                alt="user profile icon"
                src={userIcon}
                width={30}
                height={30}
              />
            </Link>
          </div>
        ) : (
          <div className={styles.toggle}>
            <img alt="Ledger Logic LOGO" src={logo} className={styles.logo} />
            <Link to="/login-choice"></Link>
            <Link to="/login-choice">
              Log In
              <img
                className={styles.userIcon}
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
