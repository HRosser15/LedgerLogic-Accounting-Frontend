import React, { useState, useEffect } from "react";
import axios from "axios";
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
import { fetchJournalEntriesForAccount } from "../../../../services/JournalService";

const AccountantViewLedger = ({
  account,
  handleBackToAccounts,
  accounts,
  handleAccountSelection,
}) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("approved");
  const [journalEntries, setJournalEntries] = useState([]);
  const [matchedJournal, setMatchedJournal] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (account && account.accountName) {
        const entries = await fetchJournalEntriesForAccount(
          account.accountName
        );
        console.log("Fetched journal entries from useEffect:", entries);
        setJournalEntries(entries);
      } else {
        setJournalEntries([]);
      }
    };

    fetchData();
  }, [account]);

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
          <option value="approved">Posted</option>
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

    const dollarAmountPattern = /\$?(\d+(\.\d{1,2})?)$/;
    const isDollarAmount = dollarAmountPattern.test(searchValue);

    let filteredData;
    if (account === null) {
      filteredData = filterAccountsByRange(1000, 7999).filter(
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
      );
      // Update state with filtered data
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
      filteredData = journalEntries.filter(
        (entry) =>
          entry.description.toLowerCase().includes(searchValue.toLowerCase()) ||
          (isDollarAmount &&
            (entry.debit.toString().includes(searchValue.replace(/\$/g, "")) ||
              entry.credit.toString().includes(searchValue.replace(/\$/g, ""))))
      );
    }
  };

  const filterDataByDate = (data, startDate, endDate) => {
    if (!startDate && !endDate) {
      return data;
    }

    const filteredData = data.filter((item) => {
      const itemDate = item.transactionDate
        ? new Date(item.transactionDate)
        : new Date(item.creationDate);

      if (startDate && endDate) {
        return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
      } else if (startDate) {
        return itemDate >= new Date(startDate);
      } else {
        return itemDate <= new Date(endDate);
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

  const handleViewPR = async (e, entry) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://localhost:8080/journal/getAll`);
      const journals = response.data;

      const matchedJournal = journals.find((journal) =>
        journal.journalEntries.some(
          (journalEntry) => journalEntry.journalEntryId === entry.journalEntryId
        )
      );

      if (matchedJournal) {
        setSelectedEntry({ ...entry, journalId: matchedJournal.journalId });
        setMatchedJournal(matchedJournal); // Add this line to set the matched journal
        setShowPostReferenceModal(true);
      } else {
        console.error("No matching journal found for the selected entry.");
      }
    } catch (error) {
      console.error("Failed to fetch journals:", error);
    }
  };

  const handleClosePostReferenceModal = () => {
    setShowPostReferenceModal(false);
    setSelectedEntry(null);
  };

  const handleEntryUpdate = (updatedEntry) => {
    const updatedJournalEntries = journalEntries.map((entry) =>
      entry.journalEntryId === updatedEntry.journalEntryId
        ? updatedEntry
        : entry
    );
    setJournalEntries(updatedJournalEntries);
  };

  const renderTable = (tableTitle, tableAccounts) => {
    if (account !== null) {
      // ============================
      // Render Subledger tables
      // ============================
      console.log("Subledger--Non-Filtered Journal Entries:", journalEntries);
      let filteredTableAccounts = filterDataByDate(
        journalEntries,
        startDate,
        endDate
      );
      console.log(
        "1 Subledger Filtered table accounts:",
        filteredTableAccounts
      );

      // Filter by status
      filteredTableAccounts = filteredTableAccounts.filter(
        (entry) => statusFilter === "all" || entry.status === statusFilter
      );
      console.log(
        "2 Subledger Filtered table accounts:",
        filteredTableAccounts
      );

      // Filter by search term
      filteredTableAccounts = filteredTableAccounts.filter(
        (entry) =>
          (entry.description &&
            entry.description
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          entry.debit.toString().includes(searchTerm.replace(/\$/g, "")) ||
          entry.credit.toString().includes(searchTerm.replace(/\$/g, ""))
      );
      console.log(
        "3 Subledger Filtered table accounts:",
        filteredTableAccounts
      );

      if (filteredTableAccounts.length === 0) {
        return null;
      }

      const debitTotal = filteredTableAccounts.reduce(
        (total, entry) => total + entry.debit,
        0
      );
      const creditTotal = filteredTableAccounts.reduce(
        (total, entry) => total + entry.credit,
        0
      );
      const balanceTotal = debitTotal - creditTotal;

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
              {console.log("filteredTableAccounts:", filteredTableAccounts)}
              <tbody>
                {filteredTableAccounts.map((entry) => (
                  <tr key={entry.journalEntryId}>
                    <td>
                      {new Date(entry.transactionDate).toLocaleDateString()}
                    </td>
                    <td>{entry.description || ""}</td>
                    <td>${entry.debit.toFixed(2)}</td>
                    <td>${entry.credit.toFixed(2)}</td>
                    <td>${(entry.debit - entry.credit).toFixed(2)}</td>
                    <td>
                      {entry.status}
                      {entry.status === "rejected" && entry.rejectionReason ? (
                        <span> - {entry.rejectionReason}</span>
                      ) : null}
                    </td>
                    <td>
                      <button onClick={(e) => handleViewPR(e, entry)}>
                        View PR
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Row>
              <Col>
                <div>Debit total: ${debitTotal.toFixed(2)}</div>
              </Col>
              <Col>
                <div>Credit total: ${creditTotal.toFixed(2)}</div>
              </Col>
              <Col>
                <div>Balance total: ${balanceTotal.toFixed(2)}</div>
              </Col>
            </Row>
          </form>
        </React.Fragment>
      );
    } else {
      // ============================
      // Render General Ledger tables
      // ============================
      let filteredTableAccounts = filterDataByDate(
        tableAccounts,
        startDate,
        endDate
      );

      // Filter by search term
      filteredTableAccounts = filteredTableAccounts.filter(
        (account) =>
          account.accountName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          account.accountNumber.toString().includes(searchTerm.toLowerCase()) ||
          account.debit.toString().includes(searchTerm.replace(/\$/g, "")) ||
          account.credit.toString().includes(searchTerm.replace(/\$/g, ""))
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
                      {parseFloat(account.balance).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
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
                      {renderTable("Journal Entries", journalEntries)}
                    </div>
                  )}
                  {showPostReferenceModal && (
                    <PostReference
                      entry={selectedEntry}
                      matchedJournal={matchedJournal}
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
