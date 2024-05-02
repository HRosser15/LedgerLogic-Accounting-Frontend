import React, { useState, useContext } from "react";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Modal,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "./AccountForm.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePickerStyles.css";
import AppContext from "../../../../../context/AppContext";
import { JournalContext } from "../../../../../context/JournalContext";
import { fetchAccounts } from "../../../../services/AccountService";
import axios from "axios";

const AdminCreateJournal = () => {
  const navigate = useNavigate();
  const { addJournal } = useContext(JournalContext);
  const [date, setDate] = useState(null);
  const [description, setDescription] = useState("");
  const [attachedFile, setAttachedFile] = useState(null);
  const [error, setError] = useState("");
  const [jAccounts, setJAccounts] = useState([
    { accountId: "", debit: "", credit: "", name: "" },
    { accountId: "", debit: "", credit: "", name: "" },
  ]);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [balance, setBalance] = useState(0);
  const { state } = useContext(AppContext);
  const userId = state.userId;

  const handleReset = () => {
    setDate("");
    setDescription("");
    setAttachedFile(null);
    setError("");
    setJAccounts([
      { accountId: "", debit: "", credit: "", name: "" },
      { accountId: "", debit: "", credit: "", name: "" },
    ]);
    setShowResetModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date) {
      setError("A date must be selected.");
      setShowErrorModal(true);
      return;
    }

    const debitTotal = jAccounts.reduce(
      (total, account) => total + parseFloat(account.debit || 0),
      0
    );
    const creditTotal = jAccounts.reduce(
      (total, jAccount) => total + parseFloat(jAccount.credit || 0),
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

    // if (!attachedFile) {
    //   setError("Please upload a file.");
    //   return;
    // }

    const formData = new FormData();

    const journalEntries = jAccounts.map((jAccount) => ({
      credit: parseFloat(jAccount.credit) || 0,
      debit: parseFloat(jAccount.debit) || 0,
      description: description,
      account: {
        accountId: jAccount.accountId,
      },
    }));

    const journal = {
      status: "PENDING",
      rejectionReason: null,
      balance: null,
      createdDate: new Date().toISOString(),
      transactionDate: date.toISOString(),
      createdBy: {
        userId: userId,
      },
      journalEntries: journalEntries,
    };

    formData.append("journal", JSON.stringify(journal));
    if (attachedFile) {
      formData.append("attachedFile", attachedFile);
      formData.append("attachedFileContentType", attachedFile.type);
    }
    formData.append("userId", userId);

    try {
      const response = await axios.post(
        "http://localhost:8080/journal/addJournal",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // console.log(response.data);
      setShowSuccessModal(true);
    } catch (error) {
      console.error(error);
      setShowErrorModal(true);
      // Handle any errors
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    navigate("/admin-accounts-management");
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
      setAttachedFile(file);
      setError("");
    } else {
      setAttachedFile(null);
      setError(
        "Invalid file type. Please upload a PDF, Word document, Excel file, CSV file, JPEG, or PNG."
      );
    }
  };

  const handleCancel = () => {
    navigate("/admin-accounts-management");
  };

  const handleAccountChange = async (index, field, value) => {
    const updatedJAccounts = [...jAccounts];
    updatedJAccounts[index][field] = value;

    if (field === "name") {
      try {
        const response = await fetchAccounts();
        const matchedAccount = response.data.find(
          (account) => account.accountName === value
        );
        if (matchedAccount) {
          updatedJAccounts[index].accountId = matchedAccount.accountId;
        } else {
          updatedJAccounts[index].accountId = "";
        }
        console.log(
          "AccountId for entered account name:",
          updatedJAccounts[index].accountId
        );
      } catch (error) {
        console.error("Failed to fetch accounts:", error);
      }
    }

    setJAccounts(updatedJAccounts);

    let totalDebit = 0;
    let totalCredit = 0;
    updatedJAccounts.forEach((jAccount) => {
      totalDebit += parseFloat(jAccount.debit || 0);
      totalCredit += parseFloat(jAccount.credit || 0);
    });

    const balance = totalDebit - totalCredit;
    setBalance(balance);
  };

  const addAccount = () => {
    setJAccounts([
      ...jAccounts,
      { accountId: "", debit: "", credit: "", name: "" },
    ]);
  };

  const handleDateChange = (selectedDate) => {
    setDate(new Date(selectedDate));
  };

  const handleCloseErrorModal = () => setShowErrorModal(false);
  const handleCloseResetModal = () => setShowResetModal(false);
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
                    <DatePicker selected={date} onChange={handleDateChange} />
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

            {jAccounts.map((jAccount, index) => (
              <Row key={index} className="mb-4">
                <Col className="mr-4">
                  <Form.Group controlId={`accountName-${index}`}>
                    <Form.Label>Account</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Account Name"
                      value={jAccount.name}
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
                      value={jAccount.debit}
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
                      value={jAccount.credit}
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
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id="add-account-tooltip">
                    Add another account to this Journal Entry
                  </Tooltip>
                }
              >
                <Button
                  className={styles.transparentButton}
                  onClick={addAccount}
                >
                  Add Another Account
                </Button>
              </OverlayTrigger>
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
              <Form.Group controlId="attachedFile">
                <Form.Label>Upload Documents</Form.Label>
                <Form.Control type="file" onChange={handleFileUpload} />
              </Form.Group>
            </Row>

            <Row className="mb-4">
              <Col></Col>
              <Col></Col>
              <Col className="mb-4">
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip id="reset-tooltip">Reset Form</Tooltip>}
                >
                  <Button
                    className={styles.grayButton}
                    onClick={handleShowResetModal}
                  >
                    Reset
                  </Button>
                </OverlayTrigger>
              </Col>
            </Row>

            <Row>
              <Col></Col>
              <Col>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id="cancel-tooltip">Cancel and Go Back</Tooltip>
                  }
                >
                  <Button className={styles.redButton} onClick={handleCancel}>
                    Cancel
                  </Button>
                </OverlayTrigger>
              </Col>
              <Col>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id="submit-tooltip">Submit Journal Entry</Tooltip>
                  }
                >
                  <Button className={styles.blueButton} type="submit">
                    Submit
                  </Button>
                </OverlayTrigger>
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
          <Modal.Title>Journal Entry Submitted</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          A manager has been notified and will review it shortly. Closing this
          dialog will redirect you to the Chart of Accounts.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseSuccessModal}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminCreateJournal;
