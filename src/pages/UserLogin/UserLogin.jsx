import React, { useState, useContext } from "react";
import logo from "../../assets/logo.png";
import styles from "./UserLogin.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as AuthService from "../../services/AuthService";
import AppContext from "../../../context/AppContext";
import { Modal, Button } from "react-bootstrap";

const UserLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { setState } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const user = await AuthService.loginUser(username, password);

      if (!user) {
        console.error("Login failed: User data not found in the response");
        setShowModal(true);
        return;
      }

      // Upon successful login...
      console.log("Login successful:", user);

      localStorage.setItem("user", JSON.stringify(user));

      setState({
        ...user,
        isLoggedIn: true,
      });

      // handle successful login based on the user role.
      if (user.role === "admin") {
        navigate("/admin-dashboard");
      } else if (user.role === "manager") {
        navigate("/manager-dashboard");
      } else {
        navigate("/accountant-dashboard");
      }
    } catch (error) {
      console.error(
        "Login failed:",
        error.response ? error.response.data : error.message
      );
      setShowModal(true);
    }
  };

  const handleCloseModal = () => setShowModal(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className={styles.main}>
      <div className={styles.row}>
        <div className={styles.column}>
          <img className={styles.image} src={logo} alt="Logo"></img>
          <h1 className={styles.header}> Ledger Logic</h1>
          <p>A logical approach to accounting.</p>
          <Link className={styles.fixLinks} to="/create-new-user">
            <button className={styles.button}>Register Now</button>
          </Link>
        </div>
        <div className={styles.column}>
          <form className={styles.forms} onSubmit={handleFormSubmit}>
            <h1 className={styles.header}>Login</h1>
            <div>
              <label>
                <p>Username</p>
                <input
                  className={styles.inputBox}
                  type="text"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                <p>Password</p>
                <input
                  className={styles.inputBox}
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </label>
            </div>

            <div>
              <button className={styles.button} type="submit">
                Login
              </button>
            </div>
            <div>
              <Link className={styles.fixLinks} to="/forgot-password">
                Forgot Password?
              </Link>
            </div>
            <div style={{ height: "40px" }}></div>
          </form>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Login Failed</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please try again.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div style={{ height: "200px" }}></div>
    </div>
  );
};

export default UserLogin;
