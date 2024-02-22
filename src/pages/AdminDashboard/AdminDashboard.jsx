import React, { useState, useContext } from "react";
import { Modal, Button, Form, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "./AdminDashboard.module.css";
import AppContext from "../../../context/AppContext";
import logo from "../../assets/logoNoWords.png";
import { activateUser, deactivateUser } from "../../services/UserService";

const AdminDashboard = ({ username }) => {
  const { state } = useContext(AppContext);
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const handleButtonClick = async (action) => {
    switch (action) {
      case "ViewAllUsers":
        navigate("/user-list");
        break;

      case "ViewExpiredPasswords":
        navigate("/view-expired-passwords");
        // Modal to show the expired passwords
        // Logic is still needed here to display the expired passwords
        break;

      case "CreateNewUser":
        navigate("/create-new-user");
        break;

      case "ActivateUser":
        try {
          console.log(`Activate User with ID: ${userId}`);
          await activateUser(userId);
          setModalMessage("User activated successfully.");
          handleShowModal();
        } catch (error) {
          console.error("Error activating user:", error);
          setModalMessage("Error activating user.");
          handleShowModal();
        }
        break;

      case "DeactivateUser":
        try {
          console.log(`Deactivate User with ID: ${userId}`);
          await deactivateUser(userId);
          setModalMessage("User deactivated successfully.");
          handleShowModal();
        } catch (error) {
          console.error("Error deactivating user:", error);
          setModalMessage("Error deactivating user.");
          handleShowModal();
        }
        break;

      case "SendEmailToUser":
        // Logic is still needed to send an email to the user using the email
        console.log(`Send Email to User with ID: ${userId}`);
        break;

      default:
        break;
    }
  };

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const [showExpiredPasswordsModal, setShowExpiredPasswordsModal] =
    useState(false);

  const handleShowExpiredPasswordsModal = () => {
    setShowExpiredPasswordsModal(true);
  };

  const handleCloseExpiredPasswordsModal = () => {
    setShowExpiredPasswordsModal(false);
  };

  return (
    <Container className={styles.dashboardContainer}>
      <h1>Admin Dashboard</h1>

      <div style={{ height: "50px" }}></div>
      <img className={styles.image} src={logo} alt="Logo"></img>
      <h2 className={styles.welcomeMessage}> Welcome {state.username}!</h2>

      <Row className="mt-4">
        <Col>
          <Button
            variant="info"
            onClick={() => handleButtonClick("ViewAllUsers")}
          >
            View All Users
          </Button>
        </Col>

        <Col>
          <Button variant="info" onClick={handleShowExpiredPasswordsModal}>
            View Expired Passwords
          </Button>
          <Modal
            show={showExpiredPasswordsModal}
            onHide={handleCloseExpiredPasswordsModal}
          >
            <Modal.Header closeButton>
              <Modal.Title>Expired Passwords</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* We need to add the content for displaying expired passwords here */}

              <p>Expired Passwords will be displayed here.</p>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={handleCloseExpiredPasswordsModal}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>

        <Col>
          <Button
            variant="info"
            onClick={() => handleButtonClick("CreateNewUser")}
          >
            Create New User
          </Button>
        </Col>
      </Row>

      <hr className="my-4" />
      <h4>Activate or Deactivate User</h4>
      <Row className="mt-4">
        <Col className="col-md-2">
          <Form.Group controlId="userId">
            <Form.Label>User ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col>
          <Button
            variant="success"
            onClick={() => {
              handleButtonClick("ActivateUser");
              handleShowModal();
            }}
          >
            Activate User
          </Button>
        </Col>

        <Col>
          <Button
            variant="warning"
            onClick={() => {
              handleButtonClick("DeactivateUser");
              handleShowModal();
            }}
          >
            Deactivate User
          </Button>
        </Col>

        <Col></Col>
        <Col></Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Action Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <hr className="my-4" />
      <h4>Contact User</h4>

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
            />
          </Form.Group>
        </Col>
        <Col className="col-md-8">
          <p>Enter your email below:</p>
          <label>
            <textarea
              name="emailContent"
              defaultValue=""
              rows={4}
              cols={80}
              align="left"
              style={{
                backgroundColor: "#f5f5f5",
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
          <Button
            variant="primary"
            onClick={() => handleButtonClick("SendEmailToUser")}
          >
            Send Email to User
          </Button>
        </Col>
      </Row>

      <div style={{ height: "200px" }}></div>
    </Container>
  );
};

export default AdminDashboard;
