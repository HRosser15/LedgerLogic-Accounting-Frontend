import React, { useState } from "react";
import ViewAccountsForm from "../AdminAccounts/Forms/ViewAccountsForm";
import styles from "./UserDashboard.module.css";

const toggleModal = async (e) => {
  var modal = <ViewAccountsForm />;
  if (modal) {
    modal.style.display = modal.style.display === "block" ? "none" : "block";
  }
};
const UserDashboard = () => {
  // Add your component logic here

  return (
    <div className={styles.dashboardContainer}>
      <h1>Accountant Dashboard</h1>
      {/* Your user dashboard content */}
      <button className="button" onClick={toggleModal}>
        View Current Users
      </button>
      <div style={{ height: "200px" }}></div>
    </div>
  );
};

export default UserDashboard;
