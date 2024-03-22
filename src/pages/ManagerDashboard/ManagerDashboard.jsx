import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import styles from "./ManagerDashboard.module.css";
import AppContext from "../../../context/AppContext";
import logo from "../../assets/logoNoWords.png";

const ManagerDashboard = ({ username }) => {
  const { state } = useContext(AppContext);

  return (
    <Container className={styles.dashboardContainer}>
      <h1>Manager Dashboard</h1>
      <div style={{ height: "50px" }}></div>
      <img className={styles.image} src={logo} alt="Logo"></img>
      <h2 className={styles.welcomeMessage}> Welcome {state.username}!</h2>
      <div style={{ height: "200px" }}></div>
      <p>Some general info can be displayed here eventually</p>
      <div style={{ height: "200px" }}></div>
    </Container>
  );
};

export default ManagerDashboard;
