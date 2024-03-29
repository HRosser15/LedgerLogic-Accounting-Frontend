import styles from "./EnterNewPassword.module.css";
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { resetPassword } from "../../services/PasswordService";

const EnterNewPassword = () => {
  const location = useLocation();
  const { email } = location.state;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  let errorMessage = "";

  const checkPassword = (password, confirmPassword) => {
    if (password.length < 8) {
      errorMessage = "Password must be at least 8 characters";
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      errorMessage = "Password must contain at least one capital letter";
      return false;
    }
    if (!/[0-9]/.test(password)) {
      errorMessage = "Password must contain at least one digit";
      return false;
    }
    if (!/[!@#$%^&*]/.test(password)) {
      errorMessage =
        "Password must contain at least one special character: !@#$%^&*)";
      return false;
    }
    if (password !== confirmPassword) {
      errorMessage = "Passwords must match";
      return false;
    }
    return true;
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (checkPassword(password, confirmPassword)) {
      try {
        await resetPassword(email, password);
        alert("Password Updated");
        navigate("/user-login");
      } catch (error) {
        alert(error);
      }
    } else {
      alert(errorMessage);
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
                className={styles.buttonGreen}
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
