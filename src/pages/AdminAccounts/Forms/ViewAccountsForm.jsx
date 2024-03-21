import React, { useState, useContext, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { fetchAccounts } from "../../../services/AccountService";
import styles from "./AccountForm.module.css";
import AppContext from "../../../../context/AppContext";
import { useNavigate } from "react-router-dom";

const ViewAccountsForm = ({ selectedDate }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    fetchAccounts()
      .then((response) => {
        setAccounts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const formatDate1 = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}${month}${day}`;
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
              <th>Normal Side</th>
              <th>Description</th>
              <th>Balance</th>
              <th>Creation Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredTableAccounts.map((account) => (
              <tr key={account.accountNumber}>
                <td>{account.accountNumber}</td>
                <td>{account.accountName}</td>
                <td>{account.normalSide}</td>
                <td>{account.description}</td>
                <td>
                  {parseFloat(account.initialBalance).toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </td>
                <td>{formatDate2(account.creationDate)}</td>
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

export default ViewAccountsForm;
