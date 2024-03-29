import styles from "./ForgotPassword.module.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  getSecurityQuestions,
  verifySecurityAnswer,
} from "../../services/PasswordService";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [securityQuestionResponse, setSecurityQuestionResponse] =
    useState(null);
  const navigate = useNavigate();

  const fetchSecurityQuestion = async () => {
    try {
      const response = await getSecurityQuestions(email);

      if (response) {
        console.log("Fetched security question:", response.question.content);
        setSecurityQuestion(response.question.content);
        console.log(securityQuestion);
        setSecurityQuestionResponse(response);
      } else {
        alert("No security question found for the provided email");
      }
    } catch (error) {
      console.error("Error fetching security question:", error);
    }
  };

  const verifyAnswer = async () => {
    try {
      // Verify that variables hold correct values
      console.log(
        "ForgotPassword.jsx:..." +
          email +
          ", " +
          securityQuestion +
          " , " +
          securityAnswer
      );
      const response = await verifySecurityAnswer(
        email,
        securityQuestion,
        securityAnswer
      );

      if (response) {
        navigate("/enter-new-password", { state: { email } });
      } else {
        console.error(
          "Incorrect security answer. Unable to set a new password."
        );
      }
    } catch (error) {
      console.error("Error verifying security answer:", error);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.column}>
        <form className={styles.forms}>
          <h1 className={styles.header}>Forgot Password</h1>
          <p className={styles.pSmall}>
            Please fill out the following information to reset your password
          </p>
          <div className={styles.container}>
            <div className={styles.row}>
              <label className={styles.label50}>Email</label>
            </div>
            <div className={styles.row}>
              <input
                type="text"
                className={styles.textField50Center}
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* BUTTON */}
            <div>
              <button
                className={styles.buttonGreen}
                type="button"
                onClick={fetchSecurityQuestion}
              >
                Get Security Question
              </button>
            </div>
          </div>
          <div>
            {/* Security Question */}
            <div className={styles.row}>
              {securityQuestion && (
                <label className={styles.label50}>{securityQuestion}</label>
              )}
            </div>
            <div className={styles.row}>
              <input
                type="text"
                className={styles.textField50Center}
                value={securityAnswer}
                onChange={(e) => setSecurityAnswer(e.target.value)}
              />
            </div>
          </div>

          <div>
            {/* Button for verifying answer */}
            <button
              className={styles.buttonGreen}
              type="button"
              onClick={verifyAnswer}
            >
              Set new Password
            </button>
          </div>
          <div>
            <Link className={styles.fixLinks} to="/login-choice">
              {/* Button for Cancel */}
              <button className={styles.button}>Cancel</button>
            </Link>
          </div>
        </form>
      </div>

      <div style={{ height: "200px" }}></div>
    </div>
  );
};

export default ForgotPassword;
