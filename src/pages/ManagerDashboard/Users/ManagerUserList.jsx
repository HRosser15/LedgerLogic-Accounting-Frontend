import React, { useEffect, useState, useContext } from "react";
import { fetchUsers } from "../../../services/UserService";
import { useNavigate } from "react-router-dom";
import styles from "../ManagerDashboard.module.css";
import AppContext from "../../../../context/AppContext";
import { Modal, Button, Form, Container, Row, Col } from "react-bootstrap";

const ManagerUserList = () => {
  const { state } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  useEffect(() => {
    if (state.isLoggedIn && state.role === "manager") {
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
            {/* ===============
                USER LIST TABLE
                =============== */}
            <form className={styles.forms}>
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
            </form>
            <div style={{ height: "200px" }}></div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ManagerUserList;
