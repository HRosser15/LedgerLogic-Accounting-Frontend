import React, { useEffect, useState, useContext } from "react";
import { fetchUsers } from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import styles from "./AdminDashboard.module.css";

import AppContext from "../../../context/AppContext";

import { activateUser, deactivateUser } from "../../services/UserService";

import { Modal, Button, Form, Container, Row, Col } from "react-bootstrap";

const UserList = () => {
  const { state } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  useEffect(() => {
    if (state.isLoggedIn && state.role === "admin") {
      fetchUsers()
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.log(
        "Error fetching data. isLoggedIn may be false or the role may not be admin."
      );
    }
  }, [state.isLoggedIn, state.role]);

  const handleButtonClick = async (action) => {
    switch (action) {
      case "ActivateUser":
        try {
          console.log(`Activate User with ID: ${userId}`);
          await activateUser(userId);
          setModalTitle("Action Success");
          setModalMessage("User activated successfully.");
          handleShowModal();
        } catch (error) {
          console.error("Error activating user:", error);
          setModalTitle("Action Failed");
          setModalMessage("Error activating user.");
          handleShowModal();
        }
        break;

      case "DeactivateUser":
        try {
          console.log(`Deactivate User with ID: ${userId}`);
          await deactivateUser(userId);
          setModalTitle("Action Success");
          setModalMessage("User deactivated successfully.");
          handleShowModal();
        } catch (error) {
          console.error("Error deactivating user:", error);
          setModalTitle("Action Failed");
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

  return (
    <Container className={styles.dashboardContainer}>
      <Row>
        <Col>
          <div className="container">
            <h2 className="text-center">User List</h2>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>User Id</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Role</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.userId}>
                    <td>{user.userId}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.role}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.status ? "Active" : "Inactive"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <hr className="my-4" />

            <h2 className="text-center">Activate or Deactivate a User</h2>
            <Row className="align-items-center justify-content-center">
              <Col md={6}>
                <Form.Group
                  controlId="userId"
                  className="d-flex justify-content-center"
                >
                  <Form.Label>User ID</Form.Label>
                  <div className={styles.inputBoxContainer}>
                    <Form.Control
                      type="text"
                      placeholder="Enter User ID"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      className={styles.inputBox}
                    />
                  </div>
                </Form.Group>
              </Col>

              <Col md={6} className="text-md-right">
                <Row>
                  <Button
                    variant="success"
                    className="mr-2 mb-2 "
                    style={{ maxWidth: "200px" }}
                    onClick={() => {
                      handleButtonClick("ActivateUser");
                      handleShowModal();
                    }}
                  >
                    Activate User
                  </Button>
                </Row>
                <Row>
                  <Button
                    variant="warning"
                    className="mb-2"
                    style={{ maxWidth: "200px" }}
                    onClick={() => {
                      handleButtonClick("DeactivateUser");
                      handleShowModal();
                    }}
                  >
                    Deactivate User
                  </Button>
                </Row>
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
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default UserList;
