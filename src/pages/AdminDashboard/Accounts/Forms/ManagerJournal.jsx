import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom";
import SearchAccounts from "./SearchAccounts";
import styles from "./AccountForm.module.css";
import previous from "../../../../assets/previous.png";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Modal, Button, Form, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const ManagerJournal = ({
  account,
  handleBackToAccounts,
  accounts,
  handleAccountSelection,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleBackClick = () => {
    handleBackToAccounts();
    handleTabSelect("view");
  };

  const handleAddJournalEntry = () => {
    console.log("Add Journal Entry button clicked");
  };

  const handleViewPR = (e) => {
    e.preventDefault();
    console.log("View PR button clicked");
  };

  const dummyData = [
    {
      ledgerId: 1,
      date: "2021-10-01",
      description: "Initial Deposit",
      debit: 1000.0,
      credit: 0.0,
      balance: "",
    },
    {
      ledgerId: 2,
      date: "2021-10-02",
      description: "Paid for materials",
      debit: 0.0,
      credit: 200.0,
      balance: "",
    },
    {
      ledgerId: 3,
      date: "2021-10-05",
      description: "Got paid for work done",
      debit: 1500.0,
      credit: 0.0,
      balance: "",
    },
  ];

  // ==============
  // Sub Ledger
  // ==============
  if (!account) {
    console.log("Account: ", account);
    const isDebitAccount =
      account.accountNumber !== null &&
      (account.accountNumber.toString().startsWith("1") ||
        account.accountNumber.toString().startsWith("5"));
    const isCreditAccount =
      account.accountNumber !== null &&
      !isDebitAccount &&
      (account.accountNumber.toString().startsWith("3") ||
        account.accountNumber.toString().startsWith("6") ||
        account.accountNumber.toString().startsWith("7"));

    const updatedDummyData = dummyData.map((entry) => {
      const balance = isDebitAccount
        ? entry.debit - entry.credit
        : entry.credit - entry.debit;
      return { ...entry, balance };
    });

    const debitTotal = updatedDummyData.reduce(
      (total, entry) => total + entry.debit,
      0
    );
    const creditTotal = updatedDummyData.reduce(
      (total, entry) => total + entry.credit,
      0
    );
    const balanceTotal = updatedDummyData.reduce(
      (total, entry) => total + entry.balance,
      0
    );

    const filteredData = updatedDummyData.filter((entry) => {
      if (!startDate || !endDate) return true; // If no dates selected, show all entries
      const entryDate = new Date(entry.date);
      return entryDate >= startDate && entryDate <= endDate;
    });

    return (
      <Container className={styles.dashboardContainer}>
        <Row>
          <Col>
            <div className="container">
              <div>
                <div style={{ height: "20px" }}></div>
                <div
                  className="prevButton"
                  style={{ float: "left", marginRight: "10px" }}
                >
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="view-pr-tooltip">
                        Back to Chart of Accounts
                      </Tooltip>
                    }
                  >
                    <Link onClick={handleBackClick}>
                      <img src={previous} alt="Return to Chart of Accounts" />
                    </Link>
                  </OverlayTrigger>
                </div>

                <h1>
                  Ledger for Account {account ? account.accountNumber : ""}
                </h1>
                <p>(Manager View)</p>
              </div>

              {/* =================
                  SEARCH AND FILTER
                  ================= */}
              <Row>
                <Col>
                  <div className="container">
                    <Form.Group
                      controlId="searchTerm"
                      className="d-flex flex-column align-items-start"
                    >
                      <Form.Label className="mr-2">
                        Search Journal Entries:
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Account Name or Dollar Amount"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        style={{
                          maxWidth: "400px",
                          marginRight: "10px",
                        }}
                      />
                    </Form.Group>
                  </div>
                </Col>
                <Col>
                  <div className="container">
                    <Form.Group
                      controlId="filterCriteria"
                      className="d-flex flex-column align-items-start"
                    >
                      <Form.Label className={styles.filterTitle}>
                        Filter by Date:
                      </Form.Label>
                      <div className="container">
                        <div
                          className={`${styles.datePickerContainer} ${styles.leftAlignedDatePicker}`}
                        >
                          <ReactDatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            placeholderText="Start Date"
                            className={styles.datePicker}
                          />
                          <ReactDatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            placeholderText="End Date"
                            className={styles.datePicker}
                          />
                        </div>
                      </div>

                      {/* {renderFilterOptions()} */}
                    </Form.Group>
                  </div>
                </Col>
              </Row>

              {/* ==================
                    SUBLEDGER TABLE
                  ================== */}
              <form className={styles.forms}>
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Description</th>
                      <th>Debit</th>
                      <th>Credit</th>
                      <th>Balance</th>
                      <th>Post Reference</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((entry) => (
                      <tr key={entry.ledgerId}>
                        <td>{entry.date}</td>
                        <td>{entry.description}</td>
                        <td>
                          $
                          {entry.debit.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                          })}
                        </td>
                        <td>
                          $
                          {entry.credit.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                          })}
                        </td>
                        <td>
                          $
                          {entry.balance.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                          })}
                        </td>
                        <td>
                          <div className={styles.tooltipContainer}>
                            <button
                              className={`${styles.prButton} ${styles.tooltip}`}
                              onClick={handleViewPR}
                            >
                              View PR
                              <span className={styles.tooltipText}>
                                View the posting reference for this entry
                              </span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Row>
                  <Col>
                    <div>
                      Debit total: $
                      {debitTotal.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </div>
                  </Col>
                  <Col>
                    <div>
                      Credit total: $
                      {creditTotal.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </div>
                  </Col>
                  <Col>
                    <div>
                      Balance total: $
                      {balanceTotal.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </div>
                  </Col>
                </Row>
              </form>
              <Row>
                <div style={{ height: "20px" }}></div>
                <Col>
                  <div className={styles.tooltipContainer}>
                    <button
                      className={`${styles.tooltip}`}
                      onClick={handleBackClick}
                    >
                      Back to Accounts
                      <span className={styles.tooltipText}>
                        Return to the Chart of Accounts
                      </span>
                    </button>
                  </div>
                </Col>
                <Col>
                  <div className={styles.tooltipContainer}>
                    <button
                      className={`${styles.addButton} ${styles.tooltip}`}
                      onClick={handleAddJournalEntry}
                    >
                      Add Journal Entry
                      <span className={styles.tooltipText}>
                        Add a new journal entry for this account
                      </span>
                    </button>
                  </div>
                </Col>
              </Row>
              <div style={{ height: "200px" }}></div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

  // =================
  // GENERAL LEDGER
  // =================
  if (account === null) {
    console.log("Account variable is null. Rendering General Ledger");
    return (
      <Container>
        <Row>
          <Col>
            <div className="container">
              <div>
                <div style={{ height: "20px" }}></div>
                <div
                  className="prevButton"
                  style={{ float: "left", marginRight: "10px" }}
                >
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="view-pr-tooltip">
                        Back to General Ledger
                      </Tooltip>
                    }
                  >
                    <Link onClick={handleBackClick}>
                      <img src={previous} alt="Return to Chart of Accounts" />
                    </Link>
                  </OverlayTrigger>
                </div>
                <h2>Journal</h2>
                <p>(From general ledger page)</p>
              </div>
            </div>
          </Col>
        </Row>

        <div style={{ height: "200px" }}></div>
      </Container>
    );
  } else {
    console.log(`Account ID: ${account.accountId}`);
  }
};

export default ManagerJournal;
