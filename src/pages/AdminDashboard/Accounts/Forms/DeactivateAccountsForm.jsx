import React, { useState, useContext, useEffect } from "react";
import { Form, Button, Container, Row, Col, Modal } from "react-bootstrap";
import {
  deactivateAccount,
  reactivateAccount,
  fetchAccounts,
} from "../../../../services/AccountService";
import AppContext from "../../../../../context/AppContext";
import styles from "./AccountForm.module.css";

const DeactivateAccountsForm = () => {
  const [accounts, setAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleDeactivateAccount = async (account, e) => {
    e.preventDefault();
    if (parseFloat(account.initialBalance) !== 0) {
      setModalMessage("Account balance must be 0 to deactivate.");
      setShowModal(true);
      return;
    }

    try {
      const response = await deactivateAccount(account.accountId);
      console.log(response);
      setAccounts((prevAccounts) =>
        prevAccounts.map((acc) =>
          acc.accountId === account.accountId ? { ...acc, active: false } : acc
        )
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleReactivateAccount = async (account, e) => {
    e.preventDefault();
    try {
      const response = await reactivateAccount(account.accountId);
      console.log(response);
      setAccounts((prevAccounts) =>
        prevAccounts.map((acc) =>
          acc.accountId === account.accountId ? { ...acc, active: true } : acc
        )
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchAccounts()
      .then((response) => {
        setAccounts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const filterAccountsByRange = (start, end) => {
    return accounts.filter(
      (account) =>
        parseInt(account.accountNumber) >= start &&
        parseInt(account.accountNumber) <= end
    );
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const formatDate2 = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
      date
    );
    const day = date.getDate();
    return `${year}, ${month} ${day}`;
  };

  const assetAccounts = filterAccountsByRange(1000, 1999);
  const liabilityAccounts = filterAccountsByRange(3000, 3999);
  const equityAccounts = filterAccountsByRange(5000, 5999);
  const revenueAccounts = filterAccountsByRange(6000, 6999);
  const expenseAccounts = filterAccountsByRange(7000, 7999);

  const renderTable = (tableTitle, tableAccounts) => {
    const filteredTableAccounts = tableAccounts.filter(
      (account) =>
        account.accountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.accountNumber.toString().includes(searchTerm.toLowerCase())
    );

    if (filteredTableAccounts.length === 0) {
      return null;
    }

    return (
      <form className={styles.forms}>
        <h2 className="text-center">{tableTitle}</h2>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>No.</th>
              <th>Account Name</th>
              <th>Account ID</th>
              <th>Active?</th>
              <th>Description</th>
              <th>Balance</th>
              <th>Creation Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredTableAccounts.map((account) => (
              <tr
                key={account.accountNumber}
                className={!account.active ? "table-danger" : ""}
              >
                <td className={!account.active ? styles.strikethrough : ""}>
                  {account.accountNumber}
                </td>
                <td className={!account.active ? styles.strikethrough : ""}>
                  {account.accountName}
                </td>
                <td className={!account.active ? styles.strikethrough : ""}>
                  {account.accountId}
                </td>
                <td className={!account.active ? styles.strikethrough : ""}>
                  {account.active ? "Yes" : "No"}
                </td>
                <td className={!account.active ? styles.strikethrough : ""}>
                  {account.description}
                </td>
                <td className={!account.active ? styles.strikethrough : ""}>
                  {parseFloat(account.initialBalance).toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </td>
                <td>{formatDate2(account.creationDate)}</td>
                <td>
                  <button
                    className={
                      account.active ? "button" : styles.reactivateButton
                    }
                    onClick={(e) =>
                      account.active
                        ? handleDeactivateAccount(account, e)
                        : handleReactivateAccount(account, e)
                    }
                  >
                    {account.active ? "Deactivate" : "Reactivate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    );
  };
  return (
    <Container className={styles.dashboardContainer}>
      <Row className="mb-4">
        <Col>
          <div className="container">
            <Form.Group
              controlId="searchTerm"
              className="d-flex align-items-center"
            >
              <Form.Label className="mr-2">Search Accounts:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Account Name or Account No."
                value={searchTerm}
                onChange={handleSearchChange}
                style={{
                  maxWidth: "250px",
                  marginLeft: "10px",
                  marginRight: "10px",
                }}
              />
            </Form.Group>
          </div>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <h1>Chart of Accounts</h1>
      <Row className="mb-4">
        <Col>
          <div className="container">
            {renderTable("Assets", assetAccounts)}
            {renderTable("Liabilities", liabilityAccounts)}
            {renderTable("Equity", equityAccounts)}
            {renderTable("Revenue", revenueAccounts)}
            {renderTable("Expenses", expenseAccounts)}

            <div style={{ height: "200px" }}></div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default DeactivateAccountsForm;
