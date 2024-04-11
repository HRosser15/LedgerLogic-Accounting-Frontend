import React, { useState, useEffect } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom";
import SearchAccounts from "./SearchAccounts";
import styles from "./AccountForm.module.css";
import previous from "../../../../assets/previous.png";
import PostReference from "./PostReference";
import {
  OverlayTrigger,
  Tooltip,
  Form,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const AccountantViewLedger = ({
  account,
  handleBackToAccounts,
  accounts,
  handleAccountSelection,
}) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("posted");

  const [dummyData, setDummyData] = useState([
    {
      ledgerId: 1,
      date: "2024-02-01",
      account1Name: "Cash",
      account2Name: "Owner's Equity",
      date: "2024-02-01",
      description: "Initial Deposit",
      debit: 10000.0,
      credit: 0.0,
      debit2: 0.0,
      credit2: 10000.0,
      balance: 10000.0,
      status: "posted",
    },
    {
      ledgerId: 2,
      date: "2024-04-04",
      account1Name: "Cash",
      account2Name: "Materials",
      description:
        "Bought roofing materials for customer John Smith at 123 St, Atlanta GA",
      debit: 0.0,
      credit: 5000.0,
      debit2: 5000.0,
      credit2: 0.0,
      balance: -5000.0,
      status: "pending",
    },
    {
      ledgerId: 3,
      date: "2024-03-25",
      account1Name: "Cash",
      account2Name: "Materials",
      description: "Got paid for work done",
      debit: 150.0,
      credit: 0.0,
      debit2: 5000.0,
      credit2: 0.0,
      balance: 150.0,
      status: "rejected",
    },
  ]);

  const StatusFilterDropdown = () => {
    const handleStatusFilterChange = (e) => {
      setStatusFilter(e.target.value);
    };

    return (
      <Form.Group>
        <Form.Label>Status Filter:</Form.Label>
        <Form.Control
          as="select"
          value={statusFilter}
          onChange={handleStatusFilterChange}
        >
          <option value="posted">Posted</option>
          <option value="rejected">Rejected</option>
          <option value="pending">Pending</option>
          <option value="all">All</option>
        </Form.Control>
      </Form.Group>
    );
  };

  const formatDate2 = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
      date
    );
    const day = date.getDate();

    return `${year}, ${month} ${day}`;
  };

  const filterAccountsByRange = (start, end) => {
    return accounts.filter(
      (account) =>
        parseInt(account.accountNumber) >= start &&
        parseInt(account.accountNumber) <= end
    );
  };

  const handleSearchChange = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(event.target.value);
    const dollarAmountPattern = /\$?\d+(\.\d{1,2})?/;
    const isDollarAmount = dollarAmountPattern.test(searchValue);

    const filteredData =
      account === null
        ? filterAccountsByRange(1000, 7999).filter(
            (account) =>
              account.accountName.toLowerCase().includes(searchValue) ||
              account.accountNumber.toString().includes(searchValue) ||
              (isDollarAmount &&
                (account.debit
                  .toString()
                  .includes(searchValue.replace(/\$/g, "")) ||
                  account.credit
                    .toString()
                    .includes(searchValue.replace(/\$/g, ""))))
          )
        : dummyData.filter(
            (entry) =>
              entry.description.toLowerCase().includes(searchValue) ||
              (isDollarAmount &&
                (entry.debit
                  .toString()
                  .includes(searchValue.replace(/\$/g, "")) ||
                  entry.credit
                    .toString()
                    .includes(searchValue.replace(/\$/g, ""))))
          );
    if (account === null) {
      setAssetAccounts(
        filteredData.filter(
          (account) =>
            account.accountNumber >= 1000 && account.accountNumber <= 1999
        )
      );
      setLiabilityAccounts(
        filteredData.filter(
          (account) =>
            account.accountNumber >= 3000 && account.accountNumber <= 3999
        )
      );
      setEquityAccounts(
        filteredData.filter(
          (account) =>
            account.accountNumber >= 5000 && account.accountNumber <= 5999
        )
      );
      setRevenueAccounts(
        filteredData.filter(
          (account) =>
            account.accountNumber >= 6000 && account.accountNumber <= 6999
        )
      );
      setExpenseAccounts(
        filteredData.filter(
          (account) =>
            account.accountNumber >= 7000 && account.accountNumber <= 7999
        )
      );
    } else {
      setDummyData(filteredData);
    }
  };

  const filterDataByDate = (data, startDate, endDate) => {
    if (!startDate && !endDate) {
      return data;
    }

    const filteredData = data.filter((entry) => {
      const entryDate = new Date(entry.date);
      if (startDate && endDate) {
        return entryDate >= startDate && entryDate <= endDate;
      } else if (startDate) {
        return entryDate >= startDate;
      } else {
        return entryDate <= endDate;
      }
    });

    return filteredData;
  };

  const assetAccounts = filterAccountsByRange(1000, 1999);
  const liabilityAccounts = filterAccountsByRange(3000, 3999);
  const equityAccounts = filterAccountsByRange(5000, 5999);
  const revenueAccounts = filterAccountsByRange(6000, 6999);
  const expenseAccounts = filterAccountsByRange(7000, 7999);

  const handleBackClick = () => {
    handleBackToAccounts();
  };

  const [showPostReferenceModal, setShowPostReferenceModal] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);

  const handleViewPR = (e, entry) => {
    e.preventDefault();
    setSelectedEntry(entry);
    setShowPostReferenceModal(true);
  };

  const handleClosePostReferenceModal = () => {
    setShowPostReferenceModal(false);
    setSelectedEntry(null);
  };

  const handleEntryUpdate = (updatedEntry) => {
    const updatedDummyData = dummyData.map((entry) =>
      entry.ledgerId === updatedEntry.ledgerId ? updatedEntry : entry
    );
    setDummyData(updatedDummyData);
  };

  const renderTable = (tableTitle, tableAccounts) => {
    if (account !== null) {
      // Render SubLedger table
      let filteredTableAccounts = filterDataByDate(
        tableAccounts,
        startDate,
        endDate
      );

      // Filter by status
      filteredTableAccounts = filteredTableAccounts.filter(
        (entry) => statusFilter === "all" || entry.status === statusFilter
      );

      if (filteredTableAccounts.length === 0) {
        return null;
      }

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

      const updatedDummyData = filteredTableAccounts.map((entry) => {
        let balance = 0;
        if (isDebitAccount) {
          balance = entry.debit - entry.credit;
        } else {
          balance = entry.credit - entry.debit;
        }
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

      return (
        <React.Fragment>
          <form className={styles.forms}>
            <h2 className="text-center">{tableTitle}</h2>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Debit</th>
                  <th>Credit</th>
                  <th>Balance</th>
                  <th>Status</th>
                  <th>Post Reference</th>
                </tr>
              </thead>
              <tbody>
                {filteredTableAccounts.map((entry) => (
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
                      {entry.status}{" "}
                      {entry.status === "rejected"
                        ? " - should be $1,500.00"
                        : null}
                    </td>
                    <td>
                      <div className={styles.tooltipContainer}>
                        <button
                          className={`${styles.prButton} ${styles.tooltip}`}
                          onClick={(e) => handleViewPR(e, entry)}
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
        </React.Fragment>
      );
    } else {
      // Render General Ledger tables
      let filteredTableAccounts = filterDataByDate(
        tableAccounts,
        startDate,
        endDate
      );
      // Filter by status (not applicable for General Ledger)

      // Apply other filters (search term, etc.)
      filteredTableAccounts = filteredTableAccounts.filter(
        (account) =>
          account.accountName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          account.accountNumber.toString().includes(searchTerm.toLowerCase())
      );

      if (filteredTableAccounts.length === 0) {
        return null;
      }

      return (
        <React.Fragment>
          <form className={styles.forms}>
            <h2 className="text-center">{tableTitle}</h2>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Creation Date</th>
                  <th>Account Name</th>
                  <th>Description</th>
                  <th>Debit</th>
                  <th>Credit</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                {filteredTableAccounts.map((account) => (
                  <tr key={account.accountNumber}>
                    <td>{formatDate2(account.creationDate)}</td>
                    <td>
                      <span
                        style={{
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                        onClick={() => {
                          console.log("Clicked account:", account);
                          handleAccountSelection(account);
                        }}
                      >
                        {account.accountName}
                      </span>
                    </td>
                    <td>{account.description}</td>
                    <td
                      style={{
                        color: account.normalSide === "Debit" ? "black" : "red",
                      }}
                    >
                      {parseFloat(account.debit).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </td>
                    <td
                      style={{
                        color:
                          account.normalSide === "Credit" ? "black" : "red",
                      }}
                    >
                      {parseFloat(account.credit).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </td>
                    <td>
                      {parseFloat(account.initialBalance).toLocaleString(
                        "en-US",
                        {
                          style: "currency",
                          currency: "USD",
                        }
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </form>
        </React.Fragment>
      );
    }
  };

  return (
    <Container className={styles.dashboardContainer}>
      <Row>
        <Col>
          <div className="container">
            <div>
              <div style={{ height: "20px" }}></div>
              <React.Fragment>
                {account !== null ? (
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
                ) : null}
              </React.Fragment>
              <React.Fragment>
                {account === null ? (
                  <h1>General Ledger</h1>
                ) : (
                  <h1>
                    Ledger for Account{" "}
                    {account
                      ? `${account.accountName} (${account.accountNumber})`
                      : ""}
                  </h1>
                )}
              </React.Fragment>
              <div style={{ height: "50px" }}></div>
            </div>

            <Row>
              <Col>
                <div className="container">
                  <React.Fragment>
                    {account === null ? (
                      <Form.Group
                        controlId="searchTerm"
                        className="d-flex flex-column align-items-start"
                      >
                        <Form.Label className="mr-2">
                          Search Ledgers:
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Name or Dollar Amount"
                          value={searchTerm}
                          onChange={handleSearchChange}
                          style={{
                            maxWidth: "400px",
                            marginRight: "10px",
                          }}
                        />
                      </Form.Group>
                    ) : (
                      <Form.Group
                        controlId="searchTerm"
                        className="d-flex flex-column align-items-start"
                      >
                        <Form.Label className="mr-2">
                          Search Journal Entries:
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Dollar Amount"
                          value={searchTerm}
                          onChange={handleSearchChange}
                          style={{
                            maxWidth: "400px",
                            marginRight: "10px",
                          }}
                        />
                      </Form.Group>
                    )}
                  </React.Fragment>
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
                  </Form.Group>
                </div>
              </Col>
              <Col>
                <React.Fragment>
                  {account !== null ? <StatusFilterDropdown /> : null}
                </React.Fragment>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col>
                <React.Fragment>
                  {account === null ? (
                    <div className="container">
                      {renderTable("Assets", assetAccounts)}
                      {renderTable("Liabilities", liabilityAccounts)}
                      {renderTable("Equity", equityAccounts)}
                      {renderTable("Revenue", revenueAccounts)}
                      {renderTable("Expenses", expenseAccounts)}
                    </div>
                  ) : (
                    <div className="container">
                      {renderTable("", dummyData)}
                    </div>
                  )}
                  {showPostReferenceModal && (
                    <PostReference
                      entry={selectedEntry}
                      onClose={handleClosePostReferenceModal}
                      handleEntryUpdate={handleEntryUpdate}
                    />
                  )}
                </React.Fragment>
              </Col>
            </Row>
            <Row>
              <div style={{ height: "20px" }}></div>
              <React.Fragment>
                {account !== null ? (
                  <Col>
                    <div className={styles.tooltipContainer}>
                      <Link>
                        <button
                          className={`${styles.tooltip}`}
                          onClick={handleBackClick}
                        >
                          Back to General Ledger
                          <span className={styles.tooltipText}>
                            Return to the General Ledger
                          </span>
                        </button>
                      </Link>
                    </div>
                  </Col>
                ) : null}
              </React.Fragment>
              <Col>
                <div className={styles.tooltipContainer}>
                  <Link to="/accountant-create-journal">
                    <button className={`${styles.addButton} ${styles.tooltip}`}>
                      Add Journal Entry
                      <span className={styles.tooltipText}>
                        Add a new journal entry for this account
                      </span>
                    </button>
                  </Link>
                </div>
              </Col>
            </Row>

            <div style={{ height: "200px" }}></div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AccountantViewLedger;
