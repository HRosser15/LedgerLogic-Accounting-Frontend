import React, { useState } from "react";
import { Container, Form, Button, Modal, Table } from "react-bootstrap";
import styles from "./AccountForm.module.css";

const PostReference = ({ entry, onClose }) => {
  const [reference, setReference] = useState("");
  const [showModal, setShowModal] = useState(true);

  const handleSave = () => {
    // Save the reference data
    console.log("Save reference:", reference);
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
                  <th>Date</th>
                  <th>Account</th>
                </tr>

                <tr>
                  <td>{entry.ledgerId}</td>
                </tr>
                <tr>
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
            <Form.Group controlId="reference">
              <Form.Label>Reference</Form.Label>
              <Form.Control
                type="text"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PostReference;
