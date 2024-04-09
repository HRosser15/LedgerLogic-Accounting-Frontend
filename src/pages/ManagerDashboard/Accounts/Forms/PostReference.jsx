import React, { useState } from "react";
import { Container, Form, Button, Modal, Table } from "react-bootstrap";
import styles from "./AccountForm.module.css";
import modalBodyStyles from "./ModalBody.module.css";

const PostReference = ({ entry, onClose, handleEntryUpdate }) => {
  const [reference, setReference] = useState("");
  const [showModal, setShowModal] = useState(true);

  const handleApprove = () => {
    const updatedEntry = { ...entry, status: "posted" };
    handleEntryUpdate(updatedEntry);
    setShowModal(false);
    onClose();
  };

  const handleReject = () => {
    const updatedEntry = { ...entry, status: "rejected" };
    handleEntryUpdate(updatedEntry);
    setShowModal(false);
    onClose();
  };

  const handleCancel = () => {
    setShowModal(false);
    onClose();
  };

  return (
    <Modal
      show={showModal}
      onHide={handleCancel}
      centered
      className={styles.customModal}
      style={{ maxWidth: "800px" }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Post Reference</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={modalBodyStyles.wideModalBody}>
          <Container>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Ledger ID</th>
                  <th>Account</th>
                  <th>Debit</th>
                  <th>Credit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{entry.date}</td>
                  <td>{entry.ledgerId}</td>
                  <td>{entry.account1Name}</td>
                  <td>${(entry.debit ?? 0).toFixed(2)}</td>
                  <td>${(entry.credit ?? 0).toFixed(2)}</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>{entry.account2Name}</td>
                  <td>${(entry.debit2 ?? 0).toFixed(2)}</td>
                  <td>${(entry.credit2 ?? 0).toFixed(2)}</td>
                </tr>
                <tr>
                  <th>Description</th>
                  <td colSpan="4">{entry.description}</td>
                </tr>
                <tr>
                  <th>Status</th>
                  <td colSpan="4">{entry.status}</td>
                </tr>
              </tbody>
            </table>
            <React.Fragment>
              {entry.status === "pending" ? (
                <Form.Group controlId="reference">
                  <Form.Label>Reference</Form.Label>
                  <Form.Control
                    type="text"
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                  />
                </Form.Group>
              ) : null}
            </React.Fragment>
          </Container>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel}>
          Close
        </Button>
        <React.Fragment>
          {entry.status === "pending" ? (
            <Button variant="primary" onClick={handleReject}>
              Reject
            </Button>
          ) : null}
        </React.Fragment>
        <React.Fragment>
          {entry.status === "pending" ? (
            <Button variant="primary" onClick={handleApprove}>
              Approve
            </Button>
          ) : null}
        </React.Fragment>
      </Modal.Footer>
    </Modal>
  );
};

export default PostReference;
