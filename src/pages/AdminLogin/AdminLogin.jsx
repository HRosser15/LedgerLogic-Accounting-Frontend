// AdminLogin.jsx

import React, { useState } from 'react';
import { loginUser } from '../../services/UserService';
import styles from './AdminLogin.module.css';
import logo from "../../assets/logoNoWords.png";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



const AdminLogin = () => {
  // Add your component logic here
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navi = useNavigate();

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await loginUser(username, password);
        console.log('Login successful:', response.data);
        navi.push('/AdminDashboard');
    } catch (err) {
        setError('Invalid username or password');
        console.error('Login error:', err);
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
          <Link className = {styles.fixLinks} to="/create-new-user">
            <button className = {styles.forgotPassword}>Register Now</button>
            </Link>
              
        </div>
        <div className = {styles.column}>
          <form onSubmit={handleSubmit} className = {styles.forms}>
          <h1 className = {styles.header}>Admin Login</h1>
            <div>
            <label>
              <p>Username</p>
              <input className = {styles.inputBox} type = 'text' value = {username} onChange={e => setUsername(e.target.value)} /> 
            </label>
            </div>
            <div>
              <label>
                <p>Password</p>
                <input className = {styles.inputBox} type = 'password' value = {password} onChange={e => setPassword(e.target.value)} />
              </label>
            </div>
            
            <div>
              <button className = {styles.loginButton} type = 'submit'>Login</button>
            </div>
            <div>
              <Link className = {styles.fixLinks} to="/forgot-password">
              <button className = {styles.forgotPassword}>Forgot Password?</button>
                </Link>
            </div>
            
          </form>
        </div>
      </div>
      
    </div>
  );
};

export default AdminLogin;