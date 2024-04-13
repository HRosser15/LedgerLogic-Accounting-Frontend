import React, { useState, useEffect, useRef } from 'react';
import { fetchTrialBalancesByDate } from '../../../services/AccountService';
import { emailUserTrialBalance } from '../../../services/EmailService';
import { Container, Row, Col, Table, Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import html2canvas from 'html2canvas';
import './DatePickerStyles.css';
import './TrialBalance.module.css';

const ManagerTrialBalance = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const trialBalanceRef = useRef(null);

  const [emailAddress, setEmailAddress] = useState("");
  const [emailContent, setEmailContent] = useState("");

  useEffect(() => {
    const fetchBalances = async () => {
      try {
        const response = await fetchTrialBalancesByDate(selectedDate);
        setAccounts(response.data);
      } catch (error) {
        console.error("Error fetching trial balances:", error);
      }
    };

    fetchBalances();
  }, [selectedDate]);

  const handleSaveReport = () => {
    html2canvas(trialBalanceRef.current).then(canvas => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'trial_balance.png';
      link.click();
    });
  };

  const handlePrintReport = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Trial Balance Report</title>
          <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid black; padding: 8px; }
          </style>
        </head>
        <body>
          ${trialBalanceRef.current.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  };

  const handleEmailChange = (e) => setEmailAddress(e.target.value);
  const handleEmailContentChange = (e) => setEmailContent(e.target.value);

  const handleSendEmail = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const fromEmail = user.email;
    const subject = `Trial Balance Report for ${selectedDate.toLocaleDateString()}`;
    const reportHtml = trialBalanceRef.current.innerHTML;

    emailUserTrialBalance(emailAddress, fromEmail, subject, emailContent, reportHtml)
      .then(() => {
        alert("Email sent successfully!");
        setEmailAddress("");
        setEmailContent("");
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        alert("Failed to send email. Please try again.");
      });
  };

  const handleDateChange = (date) => setSelectedDate(date);

  return (
    <Container>
      <h1>Trial Balance Report</h1>
      <Form>
        <Row className="mb-3">
          <Col>
            <Form.Label>Select a Date</Form.Label>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
            />
          </Col>
        </Row>
      </Form>

      <Container ref={trialBalanceRef}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Account Name</th>
              <th>Debit ($)</th>
              <th>Credit ($)</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map(account => (
              <tr key={account.accountId}>
                <td>{account.accountName}</td>
                <td>{account.debit}</td>
                <td>{account.credit}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      <Row className="mt-3">
        <Col>
          <Button onClick={handleSaveReport}>Save</Button>
          <Button onClick={handlePrintReport}>Print</Button>
        </Col>
      </Row>

      <Form>
        <Form.Group controlId="emailAddress" className="mt-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email address"
            value={emailAddress}
            onChange={handleEmailChange}
          />
        </Form.Group>
        <Form.Group controlId="emailContent" className="mt-3">
          <Form.Label>Email Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter email content"
            value={emailContent}
            onChange={handleEmailContentChange}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleSendEmail} className="mt-3">
          Send Email
        </Button>
      </Form>
    </Container>
  );
};

export default ManagerTrialBalance;
