import React, { useState } from "react";
import ViewAccountsForm from "../AdminAccounts/Forms/ViewAccountsForm";
import styles from "./ManagerDashboard.module.css";


const toggleModal = async (e) => {
  var modal = <ViewAccountsForm />;
        if (modal) {
            modal.style.display = modal.style.display === "block" ? "none" : "block";
        }
}
const ManagerDashboard = () => {
  // Add your component logic here


  return (
    <div className={styles.dashboardContainer}>
      <h1>Manager Dashboard</h1>
      {/* Your manager dashboard content */}
      <button className="button" onClick={toggleModal}>View Current Users</button>
      <div style={{ height: "200px" }}></div>
    </div>
  );
};

export default ManagerDashboard;