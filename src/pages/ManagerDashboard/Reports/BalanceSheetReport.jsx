import React from "react";
import { Container, Row, Col, Table } from "react-bootstrap";

const ManagerBalanceSheetReport = ({ accounts, selectedDate }) => {
  console.log("Accounts:", accounts);
  console.log("Selected Date:", selectedDate);
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

  return (
    <Container>
      <div id="balance-sheet-print">
        <Row>
          <Col>
            <h3>Balance Sheet for {selectedDate.toLocaleDateString()}</h3>
          </Col>
        </Row>
        <div style={{ height: "20px" }}></div>
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
                  <td style={{ fontWeight: "bold", paddingLeft: "30px" }}>
                    Non-current Assets
                  </td>
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
                  <td style={{ fontWeight: "bold", paddingLeft: "30px" }}>
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
                  <td style={{ fontWeight: "bold", paddingLeft: "30px" }}>
                    Retained Earnings
                  </td>
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
  );
};

export default ManagerBalanceSheetReport;
