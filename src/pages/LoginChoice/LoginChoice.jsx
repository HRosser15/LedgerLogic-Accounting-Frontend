// LoginChoice.jsx

import React, { useState } from 'react';
import styles from '../Login/Login.module.css';
import logo from "../../assets/logoNoWords.png";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const LoginChoice = () => {

return(
    <div className ={styles.main}>
      {/* Your login page content */}
      
      
        <div className = {styles.row}> 
            <div className = {styles.column}>
                <img className = {styles.image} src={logo} alt = "Logo" ></img>
                <h1 className = {styles.header}> Ledger Logic</h1>
                <p>A logical approach to accounting.</p>
                <Link className = {styles.fixLinks} to="/create-new-user">
                    <button className = {styles.forgotPassword}>Register Now</button>
                </Link>

            </div>

            <div className = {styles.column}>

            <Link className = {styles.fixLinks} to="/user-login">
              <button className = {styles.forgotPassword}>User Login</button>
                </Link>

            <Link className = {styles.fixLinks} to="/manager-login">
              <button className = {styles.forgotPassword}>Manager Login</button>
                </Link>

            <Link className = {styles.fixLinks} to="/admin-login">
              <button className = {styles.forgotPassword}>Admin Login</button>
                </Link>
        </div>

        </div>

        
    </div>

)


}

export default LoginChoice;