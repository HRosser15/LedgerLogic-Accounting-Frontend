"use client";
import styles from "./NavBar.module.css";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../../context/AppContext";
import { useAuth } from "../../../context/AuthContext";
import userIcon from "../../assets/icon.png";
import logo from "../../assets/logo.png";
import { Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const { state, setState } = useContext(AppContext);
  const { logout } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(state.isLoggedIn);
  const navigate = useNavigate();
  // console.log(state);

  useEffect(() => {
    setIsLoggedIn(state.isLoggedIn);
  }, [state.isLoggedIn]);

  const handleLogout = () => {
    logout(setState);
    setIsLoggedIn(false);
    navigate("/user-login");
  };

  const renderLinks = () => {
    if (state.isLoggedIn) {
      switch (state.role) {
        case "admin":
          return (
            <>
              <Link to="/admin-dashboard">Admin Dashboard</Link>
              <Link to="/user-list">User List</Link>
              <Link to="/expired-passwords">View Expired Passwords</Link>
              <Link to="/create-new-user">Add User</Link>
              <Link to="/admin-accounts-management">Accounts</Link>
              {/* Add other ADMIN links here */}
            </>
          );
        case "manager":
          return (
            <>
              <Link to="/manager-dashboard">Manager Dashboard</Link>
              <Link to="/manager-user-list">View User List</Link>
              <Link to="/manager-accounts-management">Accounts</Link>
              {/* Add other MANAGER links here */}
            </>
          );
        case "accountant":
          return (
            <>
              <Link to="/accountant-dashboard">Accountant Dashboard</Link>
              <Link to="/accountant-accounts-management">Accounts</Link>
              {/* Add other ACCOUNTANT links here */}
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

            <Dropdown>
              <Dropdown.Toggle
                variant="primary"
                id="dropdown-basic"
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "black",
                }}
              >
                {state.username}
                <img
                  className={styles.userIcon}
                  alt="user profile icon"
                  src={userIcon}
                  width={30}
                  height={30}
                />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                {/* Add other dropdown items here */}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        ) : (
          <div className={styles.toggle}>
            <img alt="Ledger Logic LOGO" src={logo} className={styles.logo} />
            <Link to="/user-login"></Link>
            <Link to="/user-login">
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
