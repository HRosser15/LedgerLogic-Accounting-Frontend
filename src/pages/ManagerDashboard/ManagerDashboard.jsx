// AdminDashboard.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from './ManagerDashboard.module.css';

const AdminDashboard = () => {
  // Add your component logic here

  return (
    <div className={styles.dashboardContainer}>
      <h1>Manager Dashboard</h1>
      <div>
      <Link to="/">
                    <button className = {styles.button}>Logout</button>
                </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
