import React from "react";
import styles from "./UserDashboard.module.css";

const UserDashboard = () => {
  // Add your component logic here

  return (
    <div className={styles.dashboardContainer}>
      <h1>User Dashboard</h1>
      {/* Your user dashboard content */}

      <div style={{ height: "200px" }}></div>
    </div>
  );
};

export default UserDashboard;
