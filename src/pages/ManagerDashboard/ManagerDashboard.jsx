// AdminDashboard.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './ManagerDashboard.module.css';

const ManagerDashboard = () => {
  // Add your component logic here

  return (
    <div className={styles.dashboardContainer}>
      <h1>Manager Dashboard</h1>
      {/* manager dashboard content */}

      
      <div style={{ height: '200px' }}></div>
    </div>
  );
};

export default ManagerDashboard;
