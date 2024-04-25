import React, { useContext, useState } from "react";
import { Container, Row, Col, Form, Modal, Button } from "react-bootstrap";
import { emailUser } from "../../services/EmailService";

import styles from "./Accounts/Forms/AccountForm.module.css";
import AppContext from "../../../context/AppContext";
import logo from "../../assets/logoNoWords.png";

const AccountantDashboard = ({ username }) => {
  const { state } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const subject = "Message from your Accountant";
  const fromEmail = "ksmith@gmail.com";
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const handleButtonClick = () => {
    if (!email) {
      // Alert the user if the email field is empty
      alert("Please enter an email address");
      return;
    }

    // Assuming you have access to the email content from the textarea
    const emailContent = document.querySelector(
      'textarea[name="emailContent"]'
    ).value;

    // Call the emailUser function with the email and emailContent
    emailUser(email, fromEmail, subject, emailContent)
      .then((response) => {
        // Handle successful email sending
        setModalTitle("Email Sent");
        setModalMessage("Email sent successfully!");
        setShowModal(true); // Optionally, you can display a modal to inform the user
      })
      .catch((error) => {
        // Handle error if email sending fails
        console.error("Error sending email:", error);
        setModalTitle("Email Error");
        setModalMessage(
          "There was an error sending the email. Please try again later."
        );
        setShowModal(true); // Optionally, you can display a modal to inform the user
      });
  };

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container className={styles.dashboardContainer}>
      <div style={{ height: "50px" }}></div>
      <h1>Accountant Dashboard</h1>
      <div style={{ height: "50px" }}></div>
      <img className={styles.image} src={logo} alt="Logo"></img>
      <h2 className={styles.welcomeMessage}> Welcome {state.username}!</h2>
      <div style={{ height: "50px" }}></div>

      {/* ============
                CONTACT USER
                ============ */}
      <form className={styles.forms}>
        <h4>Contact Manager</h4>

        <Row>
          <Col className="col-md-2">
            <Form.Group controlId="email">
              <Form.Label>User Email Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="JohnSmith@email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="custom-textbox"
                style={{
                  marginLeft: "20px",
                }}
              />
            </Form.Group>
          </Col>
          <Col className="col-md-8">
            <p>Enter your message below:</p>
            <label>
              <textarea
                name="emailContent"
                defaultValue=""
                rows={4}
                cols={80}
                align="left"
                style={{
                  backgroundColor: "#ffffff",
                  color: "black",
                  borderRadius: "5px",
                }}
              />
            </label>
          </Col>
        </Row>

        <Row>
          <p></p>
        </Row>
        <Row>
          <Col>
            <Button variant="primary" onClick={handleButtonClick}>
              Send Email to User
            </Button>
          </Col>
        </Row>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{modalTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{modalMessage}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </form>
      <div style={{ height: "200px" }}></div>
    </Container>
  );
};

export default AccountantDashboard;
