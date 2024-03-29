import React, { useState, useContext, useEffect } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Modal,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import AppContext from "../../../../../context/AppContext";
import { addAccount } from "../../../../services/AccountService";
import styles from "./AccountForm.module.css";

const AddAccountsForm = ({ onCancel }) => {
  const { state } = useContext(AppContext);
  const [accountName, setAccountName] = useState("");
  const [initialDebit, setInitialDebit] = useState("");
  const [initialCredit, setInitialCredit] = useState("");
  const [balance, setBalance] = useState("");
  const [normalSide, setNormalSide] = useState("");
  const [category, setCategory] = useState("");
  const [accountSubcategory, setAccountSubcategory] = useState("");
  const [accountDescription, setAccountDescription] = useState("");
  const [order, setOrder] = useState("");
  const [statement, setStatement] = useState("");
  const [comment, setComment] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [successTitle, setSuccessTitle] = useState("Success");
  const [successMessage, setSuccessMessage] = useState(
    "Account Added Successfully"
  );
  const [errorTitle, setErrorTitle] = useState("Validation Error");
  const [errorMessage, setErrorMessage] = useState(
    "Please fill out all required fields before submitting the form."
  );

  useEffect(() => {
    const categoryNormalSides = {
      Assets: "Debit",
      Liabilities: "Credit",
      Equity: "Credit",
      Revenue: "Credit",
      Expenses: "Debit",
      Dividends: "Debit",
    };

    setNormalSide(categoryNormalSides[category] || "");
    calculateBalance(initialCredit, initialDebit);
  }, [category]);

  const handleOrderChange = (event) => {
    const value = event.target.value.replace(/[^0-9]/g, "");
    setOrder(value);
  };

  if (!Number.isInteger(Number(order))) {
    setErrorTitle("Validation Error");
    setErrorMessage("Order must be a valid integer.");
    toggleModal();
    return;
  }

  const toggleModal = () => setShowModal(!showModal);

  const handleDebitChange = (event) => {
    setInitialDebit(event.target.value);
    calculateBalance(event.target.value, initialCredit);
  };

  const handleCreditChange = (event) => {
    setInitialCredit(event.target.value);
    calculateBalance(initialDebit, event.target.value);
  };

  const calculateBalance = (debit, credit) => {
    const debitAmount = parseFloat(debit) || 0;
    const creditAmount = parseFloat(credit) || 0;

    const sign = normalSide === "Debit" ? 1 : -1;

    const calculatedBalance = sign * (debitAmount - creditAmount);
    setBalance(calculatedBalance.toFixed(2));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requiredFields = [
      "accountName",
      "normalSide",
      "category",
      "accountSubcategory",
      "accountDescription",
      "order",
      "statement",
    ];

    const isAnyFieldEmpty = requiredFields.some((field) => !eval(`${field}`));

    if (isAnyFieldEmpty) {
      toggleModal();
      return;
    }

    const userId = state.userId;
    const currentDate = new Date().toISOString();

    const categoryDigits = {
      Assets: "1",
      Liabilities: "3",
      Equity: "5",
      Revenue: "6",
      Expenses: "7",
    };

    const firstDigit = categoryDigits[category] || "0";

    const orderString = order.toString().padStart(3, "0");

    const accountNumber = `${firstDigit}${orderString}`;

    console.log("Calculated Account Number:", accountNumber);

    const enteredAccountName = accountName;
    const enteredInitialDebit = initialDebit || "0.00";
    const enteredInitialCredit = initialCredit || "0.00";
    const enteredBalance = balance || "0.00";
    const enteredNormalSide = normalSide;
    const enteredCategory = category;
    const enteredAccountSubcategory = accountSubcategory;
    const enteredAccountDescription = accountDescription;
    const enteredOrder = order;
    const enteredStatement = statement;
    const enteredComment = comment;

    console.log("Entered Account Details:", {
      enteredAccountName,
      enteredInitialDebit,
      enteredInitialCredit,
      enteredBalance,
      enteredNormalSide,
      enteredCategory,
      enteredAccountSubcategory,
      enteredAccountDescription,
      enteredOrder,
      enteredStatement,
      enteredComment,
    });

    const requestData = {
      ownerUserId: userId,
      creationDate: currentDate,
      accountName: enteredAccountName,
      accountNumber: accountNumber,
      debit: enteredInitialDebit,
      credit: enteredInitialCredit,
      initialBalance: enteredBalance,
      normalSide: enteredNormalSide,
      category: enteredCategory,
      subCategory: enteredAccountSubcategory,
      description: enteredAccountDescription,
      orderNumber: enteredOrder,
      statement: enteredStatement,
      comment: enteredComment,
    };

    try {
      const response = await addAccount(requestData);

      console.log(response);
      if (response === "Account added successfully!") {
        setSuccessTitle("Success!");
        setSuccessMessage("Account Added Successfully");
        toggleModal();
      }
    } catch (error) {
      console.error(error.message);

      if (error.response && error.response.status === 400) {
        if (error.message === "Account name already exists!") {
          setErrorTitle("Validation Error");
          setErrorMessage("Account name already exists!"); // Use the specific error message
        } else {
          setErrorTitle("Validation Error");
          setErrorMessage(error.message); // Use the error message from the thrown error
        }
      } else {
        setErrorTitle("Error");
        setErrorMessage(error.message);
        concole.log(
          "Make sure you alter the column size of previous_state and current_state (in the h2 database)"
        );
        console.log(
          "This can be done in the h2 console at 'http://localhost:8080/h2-console' (Password is 'password' with:"
        );
        console.log(
          "ALTER TABLE event_log ALTER COLUMN previous_state VARCHAR(60000);"
        );
        console.log(
          "ALTER TABLE event_log ALTER COLUMN current_state VARCHAR(60000);"
        );
      }

      toggleModal();
    }
  };

  return (
    <Container>
      <h2>Add Account</h2>

      <Form className={styles.forms} onSubmit={handleSubmit}>
        <Container>
          <Row className="mb-4">
            <Col>
              <Form.Group controlId="accountName">
                <Form.Label>Account Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter account name"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col></Col>
          </Row>
          <Row className="mb-4">
            <Col>
              <Form.Group controlId="accountCategory">
                <Form.Label>Account Category</Form.Label>
                <Form.Control
                  as="select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="" disabled className={styles.grayOption}>
                    Select
                  </option>
                  {/* <option>Dividends</option> */}
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
                <Form.Label>Account Subcategory</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter account subcategory"
                  value={accountSubcategory}
                  onChange={(e) => setAccountSubcategory(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className="col-md-2">
              <p
                style={{
                  margin: 0,
                  paddingBottom: 20,
                  textAlign: "right",
                  fontWeight: "bold",
                }}
              >
                Normal Side:
              </p>
            </Col>
            <Col className="col-md-1">
              <p
                style={{
                  margin: 0,
                  padding: 0,
                  textAlign: "left",
                }}
              >
                {normalSide}
              </p>{" "}
            </Col>
            <Col className="col-md-1"></Col>
          </Row>
          <Row className="mb-4">
            <Col className="col-md-9">
              <Form.Group controlId="accountDescription">
                <Form.Label>Account Description</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter account description"
                  rows="3"
                  value={accountDescription}
                  onChange={(e) => setAccountDescription(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="order">
                <Form.Label>Order</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter order"
                  value={order}
                  onChange={handleOrderChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col>
              <Form.Group controlId="statement">
                <Form.Label>Statement</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter statement (e.g., IS, BS, RE)"
                  value={statement}
                  onChange={(e) => setStatement(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="comment">
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
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
          <Row>
            <Col></Col>
            <Col>
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip id="tooltip-add-account">
                    Cancel the creation of this account and return to the
                    accounts page
                  </Tooltip>
                }
              >
                <Button variant="secondary" type="button" onClick={onCancel}>
                  Cancel
                </Button>
              </OverlayTrigger>
            </Col>
            <Col>
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip id="tooltip-add-account">
                    Add account with the entered information
                  </Tooltip>
                }
              >
                <Button variant="success" type="submit">
                  Add Account
                </Button>
              </OverlayTrigger>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </Form>

      <Modal show={showModal} onHide={toggleModal}>
        <Modal.Header closeButton>
          {successTitle === "Success!" ? (
            <Modal.Title>{successTitle}</Modal.Title>
          ) : (
            <Modal.Title>{errorTitle}</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          {successTitle === "Success!" ? (
            <p>{successMessage}</p>
          ) : (
            <p>{errorMessage}</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div style={{ height: "200px" }}></div>
    </Container>
  );
};

export default AddAccountsForm;
