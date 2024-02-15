// AdminDashboard.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
  // Add your component logic here
  
  return (
    <div className={styles.dashboardContainer}>
      <h1>Admin Dashboard</h1>
      {/* Your admin dashboard content */}
    </div>
  );
};

export default AdminDashboard;
