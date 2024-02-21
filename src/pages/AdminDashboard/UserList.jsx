import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { fetchUsers } from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import styles from "./AdminDashboard.module.css";

import { Modal, Button, Form, Container, Row, Col } from "react-bootstrap";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetchUsers()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Container className={styles.dashboardContainer}>
      <Row>
        <Col md={3}>
          <Sidebar />
        </Col>
        <Col md={9}>
          <div className="container">
            <h2 className="text-center">User List</h2>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Role</th>
                  <th>Username</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.userId}>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.role}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <hr className="my-4" />

            <h2 className="text-center">Activate / Deactivate a User</h2>
            <Form.Group controlId="userId">
              <Form.Label>User ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </Form.Group>

            <Button
              variant="success"
              onClick={() => {
                handleButtonClick("ActivateUser");
                handleShowModal();
              }}
            >
              Activate User
            </Button>

            <Button
              variant="warning"
              padding-left="10px"
              onClick={() => {
                handleButtonClick("DeactivateUser");
                handleShowModal();
              }}
            >
              Deactivate User
            </Button>

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
