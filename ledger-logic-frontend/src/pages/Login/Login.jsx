// Login.jsx

import React, { useState } from 'react';
import styles from './Login.module.css';
import logo from "../../assets/logo.png";
import { Link } from 'react-router-dom';



const LoginPage = () => {
  // Add your component logic here
  
  return (
    <div className={styles.loginContainer}>
      {/* Your login page content */}
      <h1>Welcome to the login page!</h1>
      <img src={logo} alt="Logo"></img>
    </div>
  );
};

export default LoginPage;
