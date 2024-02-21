import React from "react";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Link to="/user-list">View All Users</Link>
      <Link to="/view-expired-passwords">View Expired Passwords</Link>
      <Link to="/create-new-user">Create New User</Link>
      {/* We can add more links as needed */}
    </div>
  );
};

export default Sidebar;
