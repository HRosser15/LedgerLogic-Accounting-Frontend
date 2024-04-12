import React, { useState, useEffect, useRef } from "react";
import {
  fetchAccounts,
  fetchAccountBalancesByDate,
} from "../../../services/AccountService";
import { emailUserWithAttachment } from "../../../services/EmailService";
import { Container, Row, Col, Table, Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import html2canvas from "html2canvas";
import "./DatePickerStyles.css";
import "./BalanceSheet.module.css";

const ManagerBalanceSheet = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const balanceSheetRef = useRef(null);

  const [emailAddress, setEmailAddress] = useState("");
  const [emailContent, setEmailContent] = useState("");

  useEffect(() => {
    const fetchBalances = async () => {
      try {
        if (selectedDate) {
          const response = await fetchAccountBalancesByDate(selectedDate);
          setAccounts(response.data);
        } else {
          // If no date is selected, fetch accounts in their current state
          fetchAccounts().then((response) => {
            console.log(response.data);
            const sortedAccounts = response.data.sort(
              (a, b) => a.accountNumber - b.accountNumber
            );
            console.log("Sorted accounts:", sortedAccounts);
            setAccounts(sortedAccounts);
          });
        }
      } catch (error) {
        console.error("Error fetching account balances:", error);
      }
    };

    fetchBalances();
  }, [selectedDate]);

  const handleSaveReport = () => {
    html2canvas(balanceSheetRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "balance_sheet.png";
      link.click();
    });
  };

  const handlePrintReport = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Balance Sheet Report</title>
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
          ${balanceSheetRef.current.innerHTML}
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
    const subject = `Balance Sheet Report for ${selectedDate.toLocaleDateString()}`;
    const reportHtml = balanceSheetRef.current.innerHTML;

    emailUserWithAttachment(
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

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const filterAccountsBySubcategory = (subcategory) => {
    return (
      accounts?.filter((account) => account.subCategory === subcategory) || []
    );
  };

  const calculateSubtotal = (accounts) => {
    return accounts.reduce((total, account) => {
      // Convert account balance to a number before adding
      const balance = parseFloat(account.balance);
      return total + balance;
    }, 0);
  };

  const formatNumber = (number) => {
    return number.toLocaleString();
  };

  const currentAssets = filterAccountsBySubcategory("Current Assets");
  const nonCurrentAssets = filterAccountsBySubcategory(
    "Property, Plant, and Equipment"
  );
  const currentLiabilities = filterAccountsBySubcategory("Current Liabilities");
  const nonCurrentLiabilities = filterAccountsBySubcategory(
    "Long-Term Liabilities"
  );
  const ownersEquity = filterAccountsBySubcategory("Owner's Equity");
  const retainedEarnings = filterAccountsBySubcategory("Retained Earnings");

  const totalCurrentAssets = calculateSubtotal(currentAssets);
  const totalNonCurrentAssets = calculateSubtotal(nonCurrentAssets);
  const totalAssets = totalCurrentAssets + totalNonCurrentAssets;

  const totalCurrentLiabilities = calculateSubtotal(currentLiabilities);
  const totalNonCurrentLiabilities = calculateSubtotal(nonCurrentLiabilities);
  const totalLiabilities = totalCurrentLiabilities + totalNonCurrentLiabilities;

  const totalOwnersEquity = calculateSubtotal(ownersEquity);
  const totalRetainedEarnings = calculateSubtotal(retainedEarnings);
  const totalEquity = totalOwnersEquity + totalRetainedEarnings;

  console.log("totalAssets:", totalAssets);
  console.log("Type of totalAssets:", typeof totalAssets);

  return (
    <Container>
      <div style={{ height: "50px" }}></div>
      <div id="balance-sheet-hide">
        <h1>Balance Sheet Report</h1>
        {/* Form for date range selection */}

        <Form>
          <Row>
            <Col>
              <Form.Label>Select a Date</Form.Label>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select a date"
              />
            </Col>
            <Col></Col>
            <Col></Col>
          </Row>
        </Form>
      </div>
      <div style={{ height: "50px" }}></div>
      <Container ref={balanceSheetRef}>
        <div id="balance-sheet-print">
          <Row>
            <Col>
              <h3>Balance Sheet for {selectedDate.toLocaleDateString()}</h3>
            </Col>
          </Row>
          <div style={{ height: "30px" }}></div>
          <Row>
            <Col>
              <Table striped bordered style={{ textAlign: "left" }}>
                <thead>
                  <tr>
                    <th style={{ fontWeight: "bold", fontSize: "20px" }}>
                      Assets
                    </th>
                    <th>$</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ paddingLeft: "30px" }}>Current Assets</td>
                    <td></td>
                  </tr>
                  {currentAssets.map((account) => (
                    <tr key={account.accountId}>
                      <td style={{ paddingLeft: "60px" }}>
                        {account.accountName}
                      </td>
                      <td>{formatNumber(account.balance)}</td>
                    </tr>
                  ))}
                  <tr
                    style={{
                      fontWeight: "bold",
                      color: "darkgray",
                    }}
                  >
                    <td
                      style={{
                        paddingLeft: "90px",
                        color: "gray",
                      }}
                    >
                      Total Current Assets
                    </td>
                    <td
                      style={{
                        color: "gray",
                      }}
                    >
                      {formatNumber(totalCurrentAssets)}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingLeft: "30px" }}>Non-current Assets</td>
                    <td></td>
                  </tr>
                  {nonCurrentAssets.map((account) => (
                    <tr key={account.accountId}>
                      <td style={{ paddingLeft: "60px" }}>
                        {account.accountName}
                      </td>
                      <td>{formatNumber(account.balance)}</td>
                    </tr>
                  ))}
                  <tr
                    style={{
                      fontWeight: "bold",
                      color: "gray",
                      paddingLeft: "90px",
                    }}
                  >
                    <td
                      style={{
                        fontWeight: "bold",
                        color: "gray",
                        paddingLeft: "90px",
                      }}
                    >
                      Total Non-current Assets
                    </td>
                    <td
                      style={{
                        fontWeight: "bold",
                        color: "gray",
                      }}
                    >
                      {formatNumber(totalNonCurrentAssets)}
                    </td>
                  </tr>
                  <tr style={{ fontWeight: "bold", color: "black" }}>
                    <td>Total Assets</td>
                    <td>{formatNumber(totalAssets)}</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>

          <div style={{ height: "30px" }}></div>

          <Row>
            <Col>
              <Table striped bordered style={{ textAlign: "left" }}>
                <thead>
                  <tr>
                    <th style={{ fontWeight: "bold", fontSize: "20px" }}>
                      Liabilities
                    </th>
                    <th>$</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ paddingLeft: "30px" }}>Current Liabilities</td>
                    <td></td>
                  </tr>
                  {currentLiabilities.map((account) => (
                    <tr key={account.accountId}>
                      <td style={{ paddingLeft: "60px" }}>
                        {account.accountName}
                      </td>
                      <td>{formatNumber(account.balance)}</td>
                    </tr>
                  ))}
                  <tr style={{ fontWeight: "bold", color: "darkgray" }}>
                    <td style={{ paddingLeft: "90px", color: "gray" }}>
                      Total Current Liabilities
                    </td>
                    <td style={{ color: "gray" }}>
                      {formatNumber(totalCurrentLiabilities)}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingLeft: "30px" }}>
                      Non-current Liabilities
                    </td>
                    <td></td>
                  </tr>
                  {nonCurrentLiabilities.map((account) => (
                    <tr key={account.accountId}>
                      <td style={{ paddingLeft: "60px" }}>
                        {account.accountName}
                      </td>
                      <td>{formatNumber(account.balance)}</td>
                    </tr>
                  ))}
                  <tr style={{ fontWeight: "bold", color: "darkgray" }}>
                    <td
                      style={{
                        fontWeight: "bold",
                        color: "gray",
                        paddingLeft: "90px",
                      }}
                    >
                      Total Non-current Liabilities
                    </td>
                    <td style={{ fontWeight: "bold", color: "gray" }}>
                      {formatNumber(totalNonCurrentLiabilities)}
                    </td>
                  </tr>
                  <tr style={{ fontWeight: "bold", color: "black" }}>
                    <td>Total Liabilities</td>
                    <td>{formatNumber(totalLiabilities)}</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>

          <div style={{ height: "30px" }}></div>

          <Row>
            <Col>
              <Table striped bordered style={{ textAlign: "left" }}>
                <thead>
                  <tr>
                    <th style={{ fontWeight: "bold", fontSize: "20px" }}>
                      Equity
                    </th>
                    <th>$</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ paddingLeft: "30px" }}>Owner's Equity</td>
                    <td></td>
                  </tr>
                  {ownersEquity.map((account) => (
                    <tr key={account.accountId}>
                      <td style={{ paddingLeft: "60px" }}>
                        {account.accountName}
                      </td>
                      <td>{formatNumber(account.balance)}</td>
                    </tr>
                  ))}
                  <tr style={{ fontWeight: "bold", color: "darkgray" }}>
                    <td style={{ color: "gray", paddingLeft: "90px" }}>
                      Total Owner's Equity
                    </td>
                    <td style={{ color: "gray" }}>
                      {formatNumber(totalOwnersEquity)}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingLeft: "30px" }}>Retained Earnings</td>
                    <td></td>
                  </tr>
                  {retainedEarnings.map((account) => (
                    <tr key={account.accountId}>
                      <td style={{ paddingLeft: "60px" }}>
                        {account.accountName}
                      </td>
                      <td>{formatNumber(account.balance)}</td>
                    </tr>
                  ))}
                  <tr style={{ fontWeight: "bold", color: "green" }}>
                    <td style={{ color: "gray", paddingLeft: "90px" }}>
                      Total Retained Earnings
                    </td>
                    <td style={{ color: "gray" }}>
                      {formatNumber(totalRetainedEarnings)}
                    </td>
                  </tr>
                  <tr style={{ fontWeight: "bold", color: "black" }}>
                    <td>Total Equity</td>
                    <td>{formatNumber(totalEquity)}</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </div>
      </Container>
      <div style={{ height: "50px" }}></div>
      {/* Buttons */}
      <Row>
        <Col>
          <Button onClick={handleSaveReport}>Save</Button>
        </Col>
        <Col>
          <Button onClick={handlePrintReport}>Print</Button>
        </Col>
      </Row>

      <div style={{ height: "50px" }}></div>
      <Form>
        <Form.Group controlId="emailAddress">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email address"
            value={emailAddress}
            onChange={handleEmailChange}
          />
        </Form.Group>
        <Form.Group controlId="emailContent">
          <Form.Label>Email Content</Form.Label>
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

      <div style={{ height: "200px" }}></div>
    </Container>
  );
};

export default ManagerBalanceSheet;
