import React, { useEffect, useState, useContext } from "react";
import {
  fetchUsers,
  fetchExpiredPasswords,
} from "../../../services/UserService";
import styles from "../AdminDashboard.module.css";
import AppContext from "../../../../context/AppContext";
import { Container, Row, Col } from "react-bootstrap";

const ExpiredPasswords = () => {
  const { state } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [expiredPasswords, setExpiredPasswords] = useState([]);

  useEffect(() => {
    if (state.isLoggedIn && state.role === "admin") {
      fetchExpiredPasswords()
        .then((response) => {
          setExpiredPasswords(response.data);
        })
        .catch((error) => {
          console.error(error);
        });

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

  const filteredUsers = users.filter(
    (user) => new Date(user.expirationDate) > new Date()
  );

  return (
    <Container className={styles.dashboardContainer}>
      <Row>
        <Col>
          <div className="container">
            {/* =================
                EXPIRED PASSWORDS
                ================= */}
            {expiredPasswords.length > 0 && (
              <form className={styles.forms}>
                <h2 className="text-center">Expired Passwords</h2>
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>User Id</th>
                      <th>Full Name</th>
                      <th>Role</th>
                      <th>Username</th>
                      <th>Expiration Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expiredPasswords.map((expiredPasswords) => (
                      <tr key={expiredPasswords.userId}>
                        <td>{expiredPasswords.userId}</td>
                        <td>
                          {expiredPasswords.firstName + " "}
                          {expiredPasswords.lastName}
                        </td>
                        <td>{expiredPasswords.role}</td>
                        <td>{expiredPasswords.username}</td>
                        <td>{expiredPasswords.expirationDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </form>
            )}

            {/* ===============
                USER LIST TABLE
                =============== */}
            {filteredUsers.length > 0 && (
              <form className={styles.forms}>
                <h2 className="text-center">Active User List</h2>
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>User Id</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Role</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Expiration Date</th>
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
                        <td>{user.expirationDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </form>
            )}

            <div style={{ height: "200px" }}></div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ExpiredPasswords;
