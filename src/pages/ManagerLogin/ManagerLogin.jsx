import React, { useState, useContext } from "react";
import logo from "../../assets/logo.png";
import styles from "./ManagerLogin.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as userService from "../../services/AuthService";
import AppContext from "../../../context/AppContext";
import { Modal, Button } from "react-bootstrap";

const ManagerLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { state, setState } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const user = await userService.loginUser(username, password);

      if (!user) {
        console.error("Login failed: User data not found in the response");
        setShowModal(true);
        return;
      }

      console.log("Login successful:", user);

      setState({
        ...state,
        isLoggedIn: true,
        username: user.username,
        role: user.role,
      });

      // handle successful login based on the user role.
      if (user.role === "admin") {
        navigate("/admin-dashboard");
      } else if (user.role === "manager") {
        navigate("/manager-dashboard");
      } else {
        navigate("/user-dashboard");
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
          <form className={styles.forms}>
            <h1 className={styles.header}>Manager Login</h1>
            <div>
              <label>
                <p>Username</p>
                <input
                  className={styles.inputBox}
                  type="text"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>

            <div>
              <button
                className={styles.button}
                type="button"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
            <div>
              <Link className={styles.fixLinks} to="/forgot-password">
                <button className={styles.button}>Forgot Password?</button>
              </Link>
            </div>
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
    </div>
  );
};

export default ManagerLogin;
