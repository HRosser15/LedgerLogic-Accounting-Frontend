// UserDashboard.jsx

import React from 'react';
import styles from './UserDashboard.module.css';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  // Add your component logic here

  return (
    <div className={styles.dashboardContainer}>
      <h1>User Dashboard</h1>
      <div>
      <Link to="/">
                    <button className = {styles.button}>Logout</button>
                </Link>
      </div>
    </div>
  );
};

export default UserDashboard;
