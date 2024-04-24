import React, { useState, useEffect, useRef } from "react";
import { fetchAggregatedAccountBalancesByDateRange } from "../../services/AccountService";
import { emailUserIncomeStatement } from "../../services/EmailService";
import { Container, Row, Col, Table, Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import html2canvas from "html2canvas";
import "./DatePickerStyles.css";
import styles from "./IncomeStatement.module.css";

const IncomeStatement = () => {
  const [accounts, setAccounts] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const incomeStatementRef = useRef(null);

  const [emailAddress, setEmailAddress] = useState("");
  const [emailContent, setEmailContent] = useState("");

  useEffect(() => {
    const fetchIncomeStatement = async () => {
      try {
        const response = await fetchAggregatedAccountBalancesByDateRange(
          startDate,
          endDate
        );
        setAccounts(response);
      } catch (error) {
        console.error("Error fetching income statement:", error);
      }
    };

    fetchIncomeStatement();
  }, [startDate, endDate]);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const formatNumber = (number) => {
    return number.toLocaleString();
  };

  const calculateTotalRevenue = () => {
    let totalRevenue = 0;
    accounts.forEach((account) => {
      if (account.category === "Revenue") {
        totalRevenue += parseFloat(account.balance);
      }
    });
    return totalRevenue;
  };

  const calculateTotalExpenses = () => {
    let totalExpenses = 0;
    accounts.forEach((account) => {
      if (account.category === "Expenses") {
        totalExpenses += parseFloat(account.balance);
      }
    });
    return totalExpenses;
  };

  const calculateNetIncome = () => {
    return calculateTotalRevenue() - calculateTotalExpenses();
  };

  const isWithinDateRange = (account) => {
    const accountDate = new Date(account.date);
    return accountDate >= startDate && accountDate <= endDate;
  };

  const handleSaveReport = () => {
    html2canvas(incomeStatementRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "income_statement.png";
      link.click();
    });
  };

  const handlePrintReport = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Income Statement Report</title>
          <style>
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid black;
              padding: 8px;
            }
          </style>
        </head>
        <body>
          ${incomeStatementRef.current.innerHTML}  
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  };

  const handleEmailChange = (e) => {
    setEmailAddress(e.target.value);
  };

  const handleEmailContentChange = (e) => {
    setEmailContent(e.target.value);
  };

  const handleSendEmail = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const fromEmail = user.email;
    const subject = `Income Statement Report for ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`;
    const reportHtml = incomeStatementRef.current.innerHTML;

    emailUserIncomeStatement(
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

  return (
    <Container>
      <div style={{ height: "50px" }}></div>
      <div className="income-statement-header">
        <h1>Income Statement</h1>
      </div>

      <Form className="income-statement-form">
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
      <Container ref={incomeStatementRef}>
        <div className="income-statement-print">
          <Row>
            <Col>
              <h3>
                Income Statement for {startDate.toLocaleDateString()} to{" "}
                {endDate.toLocaleDateString()}
              </h3>
            </Col>
          </Row>
          <div className="income-statement-section">
            <Row>
              <Col>
                <Table striped bordered>
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Amount ($)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Total Revenue</td>
                      <td>{formatNumber(calculateTotalRevenue())}</td>
                    </tr>
                    <tr>
                      <td>Total Expenses</td>
                      <td>{formatNumber(calculateTotalExpenses())}</td>
                    </tr>
                    <tr>
                      <td>Net Income</td>
                      <td>{formatNumber(calculateNetIncome())}</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </div>
        </div>
      </Container>

      <div style={{ height: "20px" }}></div>

      <div className="income-statement-buttons">
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
        <h3>Email Income Statement Report</h3>
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
      </div>
    </Container>
  );
};

export default IncomeStatement;
