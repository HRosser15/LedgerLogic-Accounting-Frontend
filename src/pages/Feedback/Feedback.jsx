import React, { useEffect, useState } from 'react';
import styles from './Feedback.module.css';
import { Link } from 'react-router-dom';

const Feedback = () => {

    return(
        
        <div>
            <h1>Your information has been sent for approval.</h1>
            <div>
            <Link className = {styles.fixLinks} to = '/'>
            <button className = {styles.button}>Return</button>
            </Link>     
            </div>
            
        </div>
        
    )

    }
export default Feedback;

