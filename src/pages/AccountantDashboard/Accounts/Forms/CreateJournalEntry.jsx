import React, { useState, useContext } from "react";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Alert,
  Modal,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { emailUser } from "../../../../services/EmailService";
import styles from "./AccountForm.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePickerStyles.css";
import { JournalContext } from "../../../../../context/JournalContext";
import AppContext from "../../../../../context/AppContext";

const AccountantCreateJournal = () => {
  const { state } = useContext(AppContext);
  const navigate = useNavigate();
  const { addJournalEntry } = useContext(JournalContext);
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState("");
  const [accounts, setAccounts] = useState([
    { name: "", debit: "", credit: "" },
  ]);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [balance, setBalance] = useState(0);
  const [newEntry, setNewEntry] = useState(null);
  const email = "bw@gmail.com";
  const subject = "Journal Entry Pending Approval";
  const fromEmail = "journal.services@ledgerlogic.com";
  const body =
    "A new journal entry has been created and is pending your approval. Please log in to your account to review the entry.";

  const handleReset = () => {
    setDate("");
    setDescription("");
    setDocuments(null);
    setError("");
    setAccounts([{ name: "", debit: "", credit: "" }]);
    setShowResetModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const debitTotal = accounts.reduce(
      (total, account) => total + parseFloat(account.debit || 0),
      0
    );
    const creditTotal = accounts.reduce(
      (total, account) => total + parseFloat(account.credit || 0),
      0
    );

    if (debitTotal === 0 || creditTotal === 0) {
      setError("Debit and Credit amounts are required.");
      setShowErrorModal(true);
      return;
    }

    if (debitTotal !== creditTotal) {
      setError("Debit and Credit amounts must be equal.");
      setShowErrorModal(true);
      return;
    }

    if (!documents) {
      setError("Please upload supporting documents.");
      setShowErrorModal(true);
      return;
    }

    const newEntry = {
      date,
      description,
      accounts,
      documents,
    };

    const newJournalEntry = {
      date,
      description,
      accounts,
      documents,
    };

    setNewEntry(newJournalEntry);
    try {
      await emailUser(email, fromEmail, subject, body);

      // Navigate to the desired page after submitting
      setShowSuccessModal(true);
      // navigate("/manager-accounts-management");

      setError(""); // Reset any previous errors
    } catch (error) {
      console.error("Error sending email:", error);
      // Handle error if email sending fails
      setShowErrorModal(true);
      setError("Error sending email. Please try again later.");
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.ms-excel",
      "text/csv",
      "image/jpeg",
      "image/png",
      "image/jpg",
    ];

    if (file && allowedTypes.includes(file.type)) {
      setDocuments(file);
      setError("");
    } else {
      setDocuments(null);
      setError(
        "Invalid file type. Please upload a PDF, Word document, Excel file, CSV file, JPEG, or PNG."
      );
    }
  };

  const handleCancel = () => {
    return navigate("/manager-accounts-management");
  };

  const handleAccountChange = (index, field, value) => {
    const updatedAccounts = [...accounts];
    updatedAccounts[index][field] = value;
    setAccounts(updatedAccounts);

    let totalDebit = 0;
    let totalCredit = 0;
    updatedAccounts.forEach((account) => {
      totalDebit += parseFloat(account.debit || 0);
      totalCredit += parseFloat(account.credit || 0);
    });

    const balance = totalDebit - totalCredit;
    setBalance(balance);
  };

  const addAccount = () => {
    setAccounts([...accounts, { name: "", debit: "", credit: "" }]);
  };

  const handleCloseErrorModal = () => setShowErrorModal(false);
  const handleCloseResetModal = () => setShowResetModal(false);
  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    navigate("/accountant-accounts-management");
  };
  const handleShowResetModal = () => setShowResetModal(true);

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Container>
          <Col>
            <div style={{ height: "50px" }}></div>
            <h1>Journal</h1>
            <div style={{ height: "50px" }}></div>

            <Row className="mb-4">
              <Col>
                <Form.Group controlId="date">
                  <Form.Label>Date</Form.Label>
                  <div
                    className={`${styles.datePickerContainer} ${styles.leftAlignedDatePicker}`}
                  >
                    <DatePicker
                      selected={date}
                      onChange={(date) => setDate(date)}
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="journalEntryName">
                  <Form.Label>Journal Entry Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    //   value={journalEntryName}
                    //   onChange={(e) => setJournalEntryName(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col></Col>
            </Row>

            {accounts.map((account, index) => (
              <Row key={index} className="mb-4">
                <Col className="mr-4">
                  <Form.Group controlId={`accountName-${index}`}>
                    <Form.Label>Account</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Account Name"
                      value={account.name}
                      onChange={(e) =>
                        handleAccountChange(index, "name", e.target.value)
                      }
                    />
                  </Form.Group>
                </Col>
                <Col className="mr-4">
                  <Form.Group controlId={`accountDebit-${index}`}>
                    <Form.Label>Debit</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Amount"
                      value={account.debit}
                      onChange={(e) =>
                        handleAccountChange(index, "debit", e.target.value)
                      }
                    />
                  </Form.Group>
                </Col>
                <Col className="mr-4">
                  <Form.Group controlId={`accountCredit-${index}`}>
                    <Form.Label>Credit</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Amount"
                      value={account.credit}
                      onChange={(e) =>
                        handleAccountChange(index, "credit", e.target.value)
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
            ))}
            <Row>
              <Col></Col>
              <Col></Col>
              <Col>
                <p className={balance !== 0 ? styles.redBalance : ""}>
                  Balance: {balance}
                </p>
              </Col>
            </Row>

            <Row>
              <Button variant="primary" onClick={addAccount}>
                Add Account
              </Button>
              <div style={{ height: "50px" }}></div>
            </Row>

            <Row>
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
              <div style={{ height: "50px" }}></div>
            </Row>

            <Row className="mb-4">
              <Form.Group controlId="documents">
                <Form.Label>Upload Documents</Form.Label>
                <Form.Control type="file" onChange={handleFileUpload} />
              </Form.Group>
            </Row>

            <Row className="mb-4">
              <Col></Col>
              <Col></Col>
              <Col className="mb-4">
                <Button
                  className={styles.grayButton}
                  onClick={handleShowResetModal}
                >
                  Reset
                </Button>
              </Col>
            </Row>

            <Row>
              <Col></Col>
              <Col>
                <Button className={styles.redButton} onClick={handleCancel}>
                  Cancel
                </Button>
              </Col>
              <Col>
                <Button className={styles.blueButton} type="submit">
                  Submit
                </Button>
              </Col>
              <Col></Col>
              <div style={{ height: "200px" }}></div>
            </Row>
          </Col>
        </Container>
      </Form>

      <Modal show={showErrorModal} onHide={handleCloseErrorModal}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: "red" }}>{error}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseErrorModal}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Reset Confirmation Modal */}
      <Modal show={showResetModal} onHide={handleCloseResetModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Reset</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This will clear all of your input. Do you want to continue?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseResetModal}>
            No
          </Button>
          <Button variant="primary" onClick={handleReset}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
        <Modal.Header closeButton>
          <Modal.Title>Journal Submitted</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your journal has been submitted. A manager will review it shortly.
          Clsoing this dialog will redirect you to the Chart of Accounts.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSuccessModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AccountantCreateJournal;
