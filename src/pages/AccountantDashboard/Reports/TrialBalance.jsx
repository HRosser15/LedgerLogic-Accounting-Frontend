import React, { useState, useEffect, useRef } from "react";
import { fetchAccountBalancesByDate } from "../../../services/AccountService";
import { emailUserTrialBalance } from "../../../services/EmailService";
import { Container, Row, Col, Table, Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import html2canvas from "html2canvas";
import "./DatePickerStyles.css";
import "./TrialBalance.module.css";

const AccountantTrialBalance = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const trialBalanceRef = useRef(null);

  const [emailAddress, setEmailAddress] = useState("");
  const [emailContent, setEmailContent] = useState("");

  useEffect(() => {
    const fetchBalances = async () => {
      try {
        const response = await fetchAccountBalancesByDate(selectedDate);
        setAccounts(response.data);
        console.log("response data", response.data);
      } catch (error) {
        console.error("Error fetching trial balances:", error);
      }
    };

    fetchBalances();
  }, [selectedDate]);

  const handleSaveReport = () => {
    html2canvas(trialBalanceRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "trial_balance.png";
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

    emailUserTrialBalance(
      emailAddress,
      fromEmail,
      subject,
      emailContent,
      reportHtml
    )
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

  const totalDebit = accounts.reduce(
    (sum, account) => sum + parseFloat(account.debit || 0),
    0
  );
  const totalCredit = accounts.reduce(
    (sum, account) => sum + parseFloat(account.credit || 0),
    0
  );

  // getting rid of the two blank rows below header and above footer
  const filteredAccounts = accounts.filter(
    (account) =>
      account && account.accountName && account.accountName.trim() !== ""
  );

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
            {filteredAccounts.map((account) => (
              <tr key={account.accountId}>
                <td>{account.accountName || "-"}</td>
                <td>
                  {account.debit
                    ? parseFloat(account.debit).toFixed(2)
                    : "0.00"}
                </td>
                <td>
                  {account.credit
                    ? parseFloat(account.credit).toFixed(2)
                    : "0.00"}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>
                <strong>Total</strong>
              </td>
              <td>
                <strong>{totalDebit.toFixed(2)}</strong>
              </td>
              <td>
                <strong>{totalCredit.toFixed(2)}</strong>
              </td>
            </tr>
          </tfoot>
        </Table>
      </Container>

      <Row className="mt-3">
        <Col>
          <Button onClick={handleSaveReport}>Save</Button>
        </Col>
        <Col>
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
      <div style={{ height: "200px" }}></div>
    </Container>
  );
};

export default AccountantTrialBalance;
