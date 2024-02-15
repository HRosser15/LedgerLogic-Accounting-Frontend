// Login.jsx

import React, { useState } from 'react';
// import UserService from '../../services/UserService';

import styles from './Login.module.css';
import logo from "../../assets/logoNoWords.png";
import { Link } from 'react-router-dom';



const LoginPage = () => {
  // Add your component logic here
  
  const [formData, setFormData] = useState({
    userName: '',
    password: ''
  });

  const handleChange = (e) => {
    const {name, value } = e.target;
    setFormData((previousFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const response = await UserService.fetchUsers;
    } catch (error){
      console.error('Error:', error)
    }
  }
  
  



  return (
    

    <div className ={styles.main}>
      {/* Your login page content */}
      
      
      <div className = {styles.row}> 
        <div className = {styles.column}>
        <img className = {styles.image} src={logo} alt = "Logo" ></img>
          <h1 className = {styles.header}> Ledger Logic</h1>
          <p>A logical approach to accounting.</p>
          <button className = {styles.forgotPassword}>
              <Link className = {styles.fixLinks} to="/create-new-user">Register Now</Link>
              </button>
        </div>
        <div className = {styles.column}>
          <form onSubmit={handleSubmit} className = {styles.forms}>
          <h1 className = {styles.header}>Account Login</h1>
            <div>
            <label>
              <p>Username</p>
              <input className = {styles.inputBox} type = 'text' onChange={e => setUsername(e.target.value)} /> 
            </label>
            </div>
            <div>
              <label>
                <p>Password</p>
                <input className = {styles.inputBox} type = 'password' onChange={e => setPassword(e.target.value)} />
              </label>
            </div>
            
            <div>
              <button className = {styles.loginButton} type = 'submit'>Login</button>
            </div>
            <div>
              <button className = {styles.forgotPassword}>
              <Link className = {styles.fixLinks} to="/forgot-password">Forgot Password?</Link>
              </button>
            </div>
            
          </form>
        </div>
      </div>
      
    </div>
  );
};

export default LoginPage;
