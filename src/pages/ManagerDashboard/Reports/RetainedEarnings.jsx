import React, { useState, useEffect, useRef } from "react";
import { fetchAccounts, fetchAccountBalancesByDate } from "../../../services/AccountService";
import { emailUserRetainedEarnings } from "../../../services/EmailService"; 
import { Container, Row, Col, Table, Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import html2canvas from "html2canvas";
import "./DatePickerStyles.css";
import "./RetainedEarnings.module.css"; 

const ManagerRetainedEarnings = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const retainedEarningsRef = useRef(null);

  const [emailAddress, setEmailAddress] = useState("");
  const [emailContent, setEmailContent] = useState("");

  useEffect(() => {
    const fetchRetainedEarnings = async () => {
      try {
        const response = await fetchAccountBalancesByDate(selectedDate);
        setAccounts(response.data);
      } catch (error) {
        console.error("Error fetching retained earnings:", error);
      }
    };

    fetchRetainedEarnings();
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const formatNumber = (number) => {
    return number.toLocaleString();
  };

  const calculateRetainedEarnings = () => {
    let retainedEarnings = 0;
    accounts.forEach((account) => {
      if (account.type === "Retained Earnings") {
        retainedEarnings += parseFloat(account.balance);
      } else if (account.type === "Net Income") {
        retainedEarnings += parseFloat(account.balance);
      } else if (account.type === "Cash Dividends") {
        retainedEarnings -= parseFloat(account.balance);
      } else if (account.type === "Stock Dividends") {
        retainedEarnings -= parseFloat(account.balance);
      }
    });
    return retainedEarnings;
  };

  const handleSaveReport = () => {
    html2canvas(retainedEarningsRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "retained_earnings.png";
      link.click();
    });
  };

  const handlePrintReport = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Retained Earnings Report</title>
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
          ${retainedEarningsRef.current.innerHTML}
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
    const subject = `Retained Earnings Report for ${selectedDate.toLocaleDateString()}`;
    const reportHtml = retainedEarningsRef.current.innerHTML;

    emailUserRetainedEarnings(
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
      <div className="retained-earnings-header">
        <h1>Retained Earnings</h1>
      </div>

      <Form className="retained-earnings-form">
        <Row>
          <Col>
            <Form.Label>Select Date</Form.Label>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select date"
            />
          </Col>
        </Row>
      </Form>

      <Container ref={retainedEarningsRef}>
        <div className="retained-earnings-section">
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
                    <td>Beginning Period Retained Earnings</td>
                    <td>{formatNumber(calculateBeginningPeriodRE())}</td>
                  </tr>
                  <tr>
                    <td>Net Income/Loss</td>
                    <td>{formatNumber(calculateNetIncomeLoss())}</td>
                  </tr>
                  <tr>
                    <td>Cash Dividends</td>
                    <td>{formatNumber(calculateCashDividends())}</td>
                  </tr>
                  <tr>
                    <td>Stock Dividends</td>
                    <td>{formatNumber(calculateStockDividends())}</td>
                  </tr>
                  <tr>
                    <td>Retained Earnings</td>
                    <td>{formatNumber(calculateRetainedEarnings())}</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </div>
      </Container>

      <div className="retained-earnings-buttons">
        <Button onClick={handleSaveReport}>Save</Button>
        <Button onClick={handlePrintReport}>Print</Button>
        <Form className="email-form">
          <Form.Group controlId="emailAddress">
            <Form.Control
              type="email"
              placeholder="Enter email address"
              value={emailAddress}
              onChange={handleEmailChange}
            />
          </Form.Group>
          <Form.Group controlId="emailContent">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter email content"
              value={emailContent}
              onChange={handleEmailContentChange}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleSendEmail}>
            Send Email
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default ManagerRetainedEarnings;