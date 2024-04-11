import React, { useState, useEffect } from "react";
import {
  fetchAccounts,
  fetchAccountBalancesByDate,
} from "../../../services/AccountService";
import { Container, Row, Col, Table, Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ManagerBalanceSheet = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

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
      <h2>Balance Sheet</h2>
      {/* Form for date range selection */}

      <Form>
        <Row>
          <Col>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select a date"
            />
          </Col>
        </Row>
      </Form>
      <Row>
        <Col>
          <h3>Assets</h3>
          <Table striped bordered style={{ textAlign: "left" }}>
            <thead>
              <tr>
                <th>Assets</th>
                <th>$</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: "bold", paddingLeft: "30px" }}>
                  Current Assets
                </td>
                <td></td>
              </tr>
              {currentAssets.map((account) => (
                <tr key={account.accountId}>
                  <td style={{ paddingLeft: "60px" }}>{account.accountName}</td>
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
                <td style={{ fontWeight: "bold", paddingLeft: "30px" }}>
                  Non-current Assets
                </td>
                <td></td>
              </tr>
              {nonCurrentAssets.map((account) => (
                <tr key={account.accountId}>
                  <td style={{ paddingLeft: "60px" }}>{account.accountName}</td>
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
        <Col>
          <h3>Liabilities</h3>
          <Table striped bordered style={{ textAlign: "left" }}>
            <thead>
              <tr>
                <th>Account</th>
                <th>$</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: "bold", paddingLeft: "30px" }}>
                  Current Liabilities
                </td>
                <td></td>
              </tr>
              {currentLiabilities.map((account) => (
                <tr key={account.accountId}>
                  <td style={{ paddingLeft: "60px" }}>{account.accountName}</td>
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
                <td style={{ fontWeight: "bold", paddingLeft: "30px" }}>
                  Non-current Liabilities
                </td>
                <td></td>
              </tr>
              {nonCurrentLiabilities.map((account) => (
                <tr key={account.accountId}>
                  <td style={{ paddingLeft: "60px" }}>{account.accountName}</td>
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
      <Row>
        <Col>
          <h3>Equity</h3>
          <Table striped bordered style={{ textAlign: "left" }}>
            <thead>
              <tr>
                <th>Account</th>
                <th>$</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: "bold", paddingLeft: "30px" }}>
                  Owner's Equity
                </td>
                <td></td>
              </tr>
              {ownersEquity.map((account) => (
                <tr key={account.accountId}>
                  <td style={{ paddingLeft: "60px" }}>{account.accountName}</td>
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
                <td style={{ fontWeight: "bold", paddingLeft: "30px" }}>
                  Retained Earnings
                </td>
                <td></td>
              </tr>
              {retainedEarnings.map((account) => (
                <tr key={account.accountId}>
                  <td style={{ paddingLeft: "60px" }}>{account.accountName}</td>
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
      {/* Buttons */}
      <Row>{/* ... */}</Row>
      <div style={{ height: "200px" }}></div>
    </Container>
  );
};

export default ManagerBalanceSheet;
