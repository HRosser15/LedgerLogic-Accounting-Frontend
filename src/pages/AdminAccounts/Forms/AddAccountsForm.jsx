import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import styles from "./AccountForm.module.css";

const AddAccountsForm = () => {
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [initialDebit, setInitialDebit] = useState("");
  const [initialCredit, setInitialCredit] = useState("");
  const [balance, setBalance] = useState("");
  const [normalSide, setNormalSide] = useState("");

  const handleDebitChange = (event) => {
    setInitialDebit(event.target.value);
    calculateBalance(event.target.value, initialCredit);
  };

  const handleCreditChange = (event) => {
    setInitialCredit(event.target.value);
    calculateBalance(initialDebit, event.target.value);
  };

  const handleNormalSideChange = (event) => {
    setNormalSide(event.target.value);
    calculateBalance(initialDebit, initialCredit, event.target.value);
  };

  const calculateBalance = (debit, credit) => {
    const debitAmount = parseFloat(debit) || 0;
    const creditAmount = parseFloat(credit) || 0;

    const sign =
      document.getElementById("normalSide").value === "Debit" ? 1 : -1;

    const calculatedBalance = sign * (debitAmount - creditAmount);
    setBalance(calculatedBalance.toFixed(2));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Container>
      <h2>Add Account</h2>

      <Form className={styles.forms} onSubmit={handleSubmit}>
        <Container>
          <Row className="mb-4">
            <Col>
              <Form.Group controlId="accountName">
                <Form.Label>Account's Name</Form.Label>
                <Form.Control type="text" placeholder="Enter account name" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="accountNumber">
                <Form.Label>Account's Number</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter account number"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="normalSide">
                <Form.Label>Normal Side</Form.Label>
                <Form.Control
                  as="select"
                  value={normalSide}
                  onChange={handleNormalSideChange}
                >
                  <option value="" disabled className={styles.grayOption}>
                    Select
                  </option>
                  <option value="Debit">Debit</option>
                  <option value="Credit">Credit</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col>
              <Form.Group controlId="accountCategory">
                <Form.Label>Account Category</Form.Label>
                <Form.Control as="select">
                  <option>Assets</option>
                  <option>Liabilities</option>
                  <option>Equity</option>
                  <option>Revenue</option>
                  <option>Expenses</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="accountSubcategory">
                <Form.Label>Account's Subcategory</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter account subcategory"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col className="col-md-9">
              <Form.Group controlId="accountDescription">
                <Form.Label>Account Description</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter account description"
                  rows="3" // Set the initial number of rows
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="order">
                <Form.Label>Order</Form.Label>
                <Form.Control type="number" placeholder="Enter order" />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col>
              <Form.Group controlId="Initial Debit">
                <Form.Label>Debit</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  value={initialDebit}
                  onChange={handleDebitChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="Initial Credit">
                <Form.Label className={`${styles.textLeft}`}>Credit</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  value={initialCredit}
                  onChange={handleCreditChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="initialBalance">
                <Form.Label>Initial Balance</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="0.00"
                  value={balance}
                  readOnly
                />
              </Form.Group>
            </Col>
          </Row>
          <Button variant="success" type="submit">
            Add Account
          </Button>
          <Button variant="secondary" type="button">
            Cancel
          </Button>
        </Container>
      </Form>

      <div style={{ height: "200px" }}></div>
    </Container>
  );
};

export default AddAccountsForm;
