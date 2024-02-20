import React, { useState } from "react";
import styles from "./Login.module.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className={styles.loginContainer}>
      <h1>Welcome to the login page!</h1>
      <img src={logo} alt="Logo"></img>

      <div style={{ height: "200px" }}></div>
    </div>
  );
};

export default LoginPage;
