import styles from "./EnterNewPassword.module.css";
import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const checkPassword = (password, confirmPassword) => {
  if (password.length < 8) {
    return false;
  }
  if (!/[A-Z]/.test(password)) {
    return false;
  }
  if (!/[0-9]/.test(password)) {
    return false;
  }
  if (!/[!@#$%^&*]/.test(password)) {
    return false;
  }
  if (password !== confirmPassword) {
    return false;
  }
  return true;
};

const EnterNewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdatePassword = (e) => {
    e.preventDefault();

    if (checkPassword(password, confirmPassword)) {
      alert("Password Updated");
      navigate("/manager-dashboard");
    } else {
      alert("Password invalid");
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.centeredColumn}>
        <form className={styles.forms}>
          <h1 className={styles.header}>Password Reset</h1>
          <div>
            <label>
              <p>Enter a new password</p>
            </label>
            <input
              className={styles.inputBox}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className={styles.pSmall}>
              Password must be at least 8 characters long and have at least one
              capital letter, one number, and one special character
            </p>
          </div>
          <div>
            <label>
              <p>Confirm new password</p>
            </label>
            <input
              className={styles.inputBox}
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div>
            <Link
              className={styles.fixLinks}
              to="/manager-dashboard"
              onClick={handleUpdatePassword}
            >
              <button
                className={styles.button}
                type="submit"
                onClick={handleUpdatePassword}
              >
                Update Password
              </button>
            </Link>
          </div>
          <div>
            <Link className={styles.fixLinks} to="/login-choice">
              <button className={styles.button}>Cancel</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnterNewPassword;
