import React, { useState, useEffect, useRef } from "react";
import { fetchAggregatedAccountBalancesByDateRange } from "../../services/AccountService";
import { emailUserTrialBalance } from "../../services/EmailService";
import { Container, Row, Col, Table, Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import html2canvas from "html2canvas";
import "./DatePickerStyles.css";
import styles from "./TrialBalance.module.css";

const TrialBalance = () => {
  const [accounts, setAccounts] = useState([]);
  const [startDate, setStartDate] = useState(
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() - 365
    )
  );
  const [endDate, setEndDate] = useState(new Date());
  const trialBalanceRef = useRef(null);

  const [emailAddress, setEmailAddress] = useState("");
  const [emailContent, setEmailContent] = useState("");

  useEffect(() => {
    const fetchBalances = async () => {
      try {
        const response = await fetchAggregatedAccountBalancesByDateRange(
          startDate,
          endDate
        );
        setAccounts(response);
        console.log("response data with date range: ", response);
      } catch (error) {
        console.error("Error fetching trial balances:", error);
      }
    };

    fetchBalances();
  }, [startDate, endDate]);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

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
    const subject = `Trial Balance Report for ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`;
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
      <div style={{ height: "50px" }}></div>
      <h1>Trial Balance Report</h1>
      <Form>
        <Row>
          <Col>
            <Form.Label>Select Start Date</Form.Label>
            <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select start date"
            />
          </Col>
          <Col>
            <Form.Label>Select End Date</Form.Label>
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select end date"
            />
          </Col>
        </Row>
      </Form>

      <div style={{ height: "50px" }}></div>
      <Container ref={trialBalanceRef}>
        <Row>
          <Col>
            <h3>
              Trial Balance for {startDate.toLocaleDateString()} to{" "}
              {endDate.toLocaleDateString()}
            </h3>
          </Col>
        </Row>
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
                    ? parseFloat(account.debit).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    : "0.00"}
                </td>
                <td>
                  {account.credit
                    ? parseFloat(account.credit).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
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
                <strong>
                  {totalDebit.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </strong>
              </td>
              <td>
                <strong>
                  {totalCredit.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </strong>
              </td>
            </tr>
          </tfoot>
        </Table>
      </Container>

      <div style={{ height: "30px" }}></div>
      {/* Buttons */}
      <Row>
        <Col>
          <Button style={{ minWidth: "100px" }} onClick={handleSaveReport}>
            Save
          </Button>
        </Col>
        <Col>
          <Button style={{ minWidth: "100px" }} onClick={handlePrintReport}>
            Print
          </Button>
        </Col>
      </Row>
      <div style={{ height: "50px" }}></div>
      <h3>Email Trial Balance Report</h3>
      <Form>
        <div className={styles.emailFormContainer}>
          <Form.Group controlId="emailAddress">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email address"
              value={emailAddress}
              onChange={handleEmailChange}
            />
          </Form.Group>
        </div>
        <div style={{ height: "20px" }}></div>
        <Form.Group controlId="emailContent">
          <Form.Label>Email Body</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter email body content"
            value={emailContent}
            onChange={handleEmailContentChange}
          />
        </Form.Group>
        <div style={{ height: "20px" }}></div>
        <Button variant="primary" onClick={handleSendEmail}>
          Send Email
        </Button>
      </Form>
      <div style={{ height: "200px" }}></div>
      <div style={{ height: "200px" }}></div>
    </Container>
  );
};

export default TrialBalance;
