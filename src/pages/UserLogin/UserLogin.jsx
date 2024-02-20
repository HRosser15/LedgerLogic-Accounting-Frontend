// UserLogin.jsx

import React, { useState } from 'react';
import { loginUser } from '../../services/UserService';

import styles from './UserLogin.module.css';
import logo from "../../assets/logoNoWords.png";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



const UserLogin = () => {
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
        navi.push('/UserDashboard');
    } catch (err) {
        setError('Invalid username or password');
        console.error('Login error:', err);
    }
    finally{
      navi.push('/user-dashboard');
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
            <button className = {styles.button}>Register Now</button>
            </Link>
              
        </div>
        <div className = {styles.column}>
          <form onSubmit={handleSubmit} className = {styles.forms}>
          <h1 className = {styles.header}>User Login</h1>
            <div>
            <label>
              <p>Username</p>
              <input className = {styles.inputBox} type = "text" value = {username} onChange={e => setUsername(e.target.value)} /> 
            </label>
            </div>
            <div>
              <label>
                <p>Password</p>
                <input className = {styles.inputBox} type = "password" value = {password} onChange={e => setPassword(e.target.value)} />
              </label>
            </div>
            
            <div>
              <Link className = {styles.fixLinks} to="/user-dashboard">
                <button className = {styles.button} type = "submit">Login</button>
              </Link>
              
              
              
            </div>
            <div>
              <Link className = {styles.fixLinks} to="/forgot-password">
              <button className = {styles.button}>Forgot Password?</button>
                </Link>
            </div>
            
          </form>
        </div>
      </div>
      
    </div>
  );
};

export default UserLogin;
