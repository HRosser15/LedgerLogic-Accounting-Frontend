import React, { useState, useContext, useHistory } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import styles from "./AccountForm.module.css";
import { JournalContext } from '../../../../../context/JournalContext';
import AppContext from "../../../../../context/AppContext";

const ManagerCreateJournal = () => {
    const { state } = useContext(AppContext);
    const history = useHistory();
    const { addJournalEntry } = useContext(JournalContext);
    const [accountDebitName, setAccountDebitName] = useState("");
    const [accountCreditName, setAccountCreditName] = useState("");
    const [date, setDate] = useState("");
    const [debit, setDebit] = useState("");
    const [credit, setCredit] = useState("");
    const [documents, setDocuments] = useState(null); 
    const [error, setError] = useState(""); 

    const handleReset = () => {
        setAccountDebitName("");
        setAccountCreditName("");
        setDate("");
        setDebit("");
        setCredit("");
        setDocuments(null); 
        setError(""); 
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (debit === "" || credit === "") {
            setError("Debit and Credit amounts are required.");
            return;
        }

        const debitAmount = parseFloat(debit);
        const creditAmount = parseFloat(credit);

        if (isNaN(debitAmount) || isNaN(creditAmount) || debitAmount <= 0 || creditAmount <= 0) {
            setError("Invalid Debit or Credit amounts.");
            return;
        }

        if (debitAmount !== creditAmount) {
            setError("Debit and Credit amounts must be equal.");
            return;
        }

        if (!documents) {
            setError("Please upload supporting documents.");
            return;
        }
        const newEntry = {
            accountDebitName,
            accountCreditName,
            date,
            debit,
            credit,
            documents,
          };
      
          addJournalEntry(newEntry);
          history.push("./Forms/AccountManagement");

        setError(""); 
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.ms-excel', 'text/csv', 'image/jpeg', 'image/png'];

        if (file && allowedTypes.includes(file.type)) {
            setDocuments(file);
            setError(""); 
        } else {
            setDocuments(null);
            setError("Invalid file type. Please upload a PDF, Word document, Excel file, CSV file, JPEG, or PNG.");
        }
    };

    const handleCancel = () => {
        return <Link to="./Forms/AccountManagement" />;
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Container>
                    <Col>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Row className="mb-4">
                            <Form.Group controlId='accountDebitName'>
                                <Form.Label>Debit Account Name</Form.Label>
                                <Form.Control type='text' placeholder='Enter Debit Account Name' value={accountDebitName} onChange={(e) => setAccountDebitName(e.target.value)} />
                            </Form.Group>
                        </Row>

                        <Row className="mb-4">
                            <Form.Group controlId='accountCreditName'>
                                <Form.Label>Credit Account Name</Form.Label>
                                <Form.Control type='text' placeholder='Enter Credit Account Name' value={accountCreditName} onChange={(e) => setAccountCreditName(e.target.value)} />
                            </Form.Group>
                        </Row>

                        <Row className="mb-4">
                            <Form.Group controlId='date'>
                                <Form.Label>Date</Form.Label>
                                <Form.Control type='date' value={date} onChange={(e) => setDate(e.target.value)} />
                            </Form.Group>
                        </Row>

                        <Row className="mb-4">
                            <Form.Group controlId='debit'>
                                <Form.Label>Debit Amount</Form.Label>
                                <Form.Control type='number' placeholder='Enter Debit Amount' value={debit} onChange={(e) => setDebit(e.target.value)} />
                            </Form.Group>
                        </Row>

                        <Row className="mb-4">
                            <Form.Group controlId='credit'>
                                <Form.Label>Credit Amount</Form.Label>
                                <Form.Control type='number' placeholder='Enter Credit Amount' value={credit} onChange={(e) => setCredit(e.target.value)} />
                            </Form.Group>
                        </Row>

                        <Row className="mb-4">
                            <Form.Group controlId='documents'>
                                <Form.Label>Upload Documents</Form.Label>
                                <Form.Control type='file' onChange={handleFileUpload} />
                            </Form.Group>
                        </Row>

                        <Row>
                            <Button variant="secondary" onClick={handleReset}>Reset</Button>
                            <Button variant="danger" onClick={handleCancel}>Cancel</Button>
                            <Button variant="primary" type="submit">Submit</Button>
                        </Row>
                    </Col>
                </Container>
            </Form>
        </Container>
    );
}

export default ManagerCreateJournal;
