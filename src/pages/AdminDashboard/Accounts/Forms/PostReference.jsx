import React, { useState } from "react";
import { Container, Form, Button, Modal, Table } from "react-bootstrap";
import styles from "./AccountForm.module.css";

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
    <Modal show={showModal} onHide={handleCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>Post Reference</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Form>
            <Table striped bordered>
              <tbody>
                <tr>
                  <th>Ledger ID</th>
                  <td>{entry.ledgerId}</td>
                </tr>
                <tr>
                  <th>Date</th>
                  <td>{entry.date}</td>
                </tr>
                <tr>
                  <th>Description</th>
                  <td>{entry.description}</td>
                </tr>
                <tr>
                  <th>Debit</th>
                  <td>${entry.debit.toFixed(2)}</td>
                </tr>
                <tr>
                  <th>Credit</th>
                  <td>${entry.credit.toFixed(2)}</td>
                </tr>
                <tr>
                  <th>Balance</th>
                  <td>${entry.balance.toFixed(2)}</td>
                </tr>
                <tr>
                  <th>Status</th>
                  <td>{entry.status}</td>
                </tr>
              </tbody>
            </Table>
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
          </Form>
        </Container>
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
