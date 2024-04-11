import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Table, Form, Button } from "react-bootstrap";
import balanceSheet from "../../../assets/balance-sheet.png";
import trialBalance from "../../../assets/trial-balance.png";
import incomeStatement from "../../../assets/income-statement.png";
import retainedEarnings from "../../../assets/retained-earnings.png";
import styles from "./ReportsDashboard.module.css";

const ManagerReportsDashboard = () => {
  return (
    <Container>
      <div>
        <div style={{ height: "50px" }}></div>
        <h1>Reports</h1>
        <div style={{ height: "50px" }}></div>
        <form className={styles.forms}>
          <Row>
            <Col>
              <Link to="/manager-balance-sheet">
                <h2
                  style={{
                    marginTop: "20px",
                  }}
                >
                  Balance Sheet
                </h2>
                <div style={{ height: "20px" }}></div>
                <img
                  src={balanceSheet}
                  alt="Balance Sheet"
                  style={{
                    marginBottom: "20px",
                  }}
                />
              </Link>
            </Col>
            <Col
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginRight: "50px",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              <p></p>
              <p></p>
              <p
                style={{
                  fontSize: "32px",
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                View the financial snapshot of your company at a specific point
                in time. It includes information about your assets, liabilities,
                and equity, providing valuable insights into your company's
                financial health.
              </p>
            </Col>
          </Row>
        </form>

        <div style={{ height: "50px" }}></div>

        <form className={styles.forms}>
          <Row>
            <Col
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <p></p>
              <p></p>
              <p></p>
              <p></p>
              <p
                style={{
                  fontSize: "32px",
                  fontWeight: "bold",
                  color: "black",
                  marginLeft: "50px",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              >
                View a summary of all ledger account balances to ensure that
                debits equal credits, providing a snapshot of your company's
                financial position.
              </p>
            </Col>
            <Col>
              <Link to="/manager-balance-sheet">
                <h2
                  style={{
                    marginTop: "20px",
                  }}
                >
                  Trial Balance
                </h2>
                <div style={{ height: "20px" }}></div>
                <img
                  src={trialBalance}
                  alt="Trial Balance"
                  style={{
                    marginBottom: "20px",
                  }}
                />
              </Link>
            </Col>
          </Row>
        </form>

        <div style={{ height: "50px" }}></div>

        <form className={styles.forms}>
          <Row>
            <Col>
              <Link to="/manager-balance-sheet">
                <h2
                  style={{
                    marginTop: "20px",
                  }}
                >
                  Income Statement
                </h2>
                <div style={{ height: "20px" }}></div>
                <img
                  src={incomeStatement}
                  alt="Income Statement"
                  style={{
                    marginBottom: "35px",
                  }}
                />
              </Link>
            </Col>
            <Col
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <p></p>
              <p></p>
              <p></p>
              <p></p>
              <p
                style={{
                  fontSize: "32px",
                  fontWeight: "bold",
                  color: "black",
                  marginRight: "50px",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              >
                View your company's revenues, expenses, and net income over a
                specific period, revealing its profitability.
              </p>
            </Col>
          </Row>
        </form>
        <div style={{ height: "50px" }}></div>

        <form className={styles.forms}>
          <Row>
            <Col
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <p></p>
              <p></p>
              <p
                style={{
                  fontSize: "32px",
                  fontWeight: "bold",
                  color: "black",
                  marginLeft: "50px",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              >
                View changes in your company's retained earnings over time,
                including net income, dividends, and other adjustments,
                providing insights into its financial performance and growth.
              </p>
              <p></p>
              <p></p>
            </Col>
            <Col>
              <Link to="/manager-balance-sheet">
                <h2
                  style={{
                    marginTop: "20px",
                  }}
                >
                  Retained Earnings
                </h2>
                <div style={{ height: "20px" }}></div>
                <img src={retainedEarnings} alt="Retained Earnings" />
              </Link>
            </Col>
          </Row>
        </form>
        <div style={{ height: "200px" }}></div>
      </div>
    </Container>
  );
};

export default ManagerReportsDashboard;
