import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams, useNavigate } from "react-router-dom";
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
import { fetchAccounts } from "../../../../services/AccountService";
import { fetchJournalEntriesForAccount } from "../../../../services/JournalService";

const ManagerViewLedger = ({ account, handleBackToAccounts }) => {
  const { accountId } = useParams();
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("approved");
  const [journalEntries, setJournalEntries] = useState([]);
  const [matchedJournal, setMatchedJournal] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [allAccounts, setAllAccounts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAccounts();
        setAccounts(response.data);
        setAllAccounts(response.data);
        console.log("Accounts:", response.data);

        if (accountId) {
          // Find the account object based on the accountId
          const selectedAccount = response.data.find(
            (account) => account.accountId === parseInt(accountId)
          );

          if (selectedAccount) {
            // Fetch the journal entries for the selected account using the account name
            const entries = await fetchJournalEntriesForAccount(
              selectedAccount.accountName
            );
            setJournalEntries(entries);
            setSelectedAccount(selectedAccount); // Update the selectedAccount state
          } else {
            setSelectedAccount(undefined);
            setJournalEntries([]);
          }
        } else {
          setSelectedAccount(undefined);
          setJournalEntries([]);
        }
      } catch (error) {
        console.error("Failed to fetch accounts or journal entries:", error);
      }
    };

    console.log("accountId:", accountId);
    fetchData();
  }, [accountId]);

  const handleAccountSelection = (account) => {
    navigate(`/manager-accounts-management/ledgers/${account.accountId}`);
  };

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
    if (!accounts || !Array.isArray(accounts)) {
      return []; // Return an empty array if accounts is undefined or not an array
    }

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
    if (account === undefined) {
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
    navigate("/manager-accounts-management/ledgers");
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

  const renderGeneralLedgerTables = (tableTitle, accountCategory) => {
    let filteredTableAccounts = allAccounts.filter(
      (account) => account.category === accountCategory
    );

    filteredTableAccounts = filterDataByDate(
      filteredTableAccounts,
      startDate,
      endDate
    );

    // Filter by search term
    filteredTableAccounts = filteredTableAccounts.filter(
      (account) =>
        (account.accountName?.toLowerCase() || "").includes(
          searchTerm.toLowerCase()
        ) ||
        (account.accountNumber?.toString() || "").includes(
          searchTerm.toLowerCase()
        ) ||
        (account.debit?.toString() || "").includes(
          searchTerm.replace(/\$/g, "")
        ) ||
        (account.credit?.toString() || "").includes(
          searchTerm.replace(/\$/g, "")
        )
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
                  <td>
                    {account.creationDate && formatDate2(account.creationDate)}
                  </td>
                  <td>
                    <span
                      style={{
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                      onClick={() => {
                        // console.log("Clicked account:", account);
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
                      color: account.normalSide === "Credit" ? "black" : "red",
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
  };

  const renderSubledgerTable = () => {
    // console.log("Subledger--Non-Filtered Journal Entries:", journalEntries);
    let filteredJournalEntries = filterDataByDate(
      journalEntries,
      startDate,
      endDate
    );
    // console.log("1 Subledger Filtered table accounts:", filteredJournalEntries);

    // Filter by status
    filteredJournalEntries = filteredJournalEntries.filter(
      (entry) => statusFilter === "all" || entry.status === statusFilter
    );
    // console.log("2 Subledger Filtered table accounts:", filteredJournalEntries);

    // Filter by search term
    filteredJournalEntries = filteredJournalEntries.filter(
      (entry) =>
        (entry.description &&
          entry.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        entry.debit.toString().includes(searchTerm.replace(/\$/g, "")) ||
        entry.credit.toString().includes(searchTerm.replace(/\$/g, ""))
    );
    // console.log("3 Subledger Filtered table accounts:", filteredJournalEntries);

    if (filteredJournalEntries.length === 0) {
      return null;
    }

    const debitTotal = filteredJournalEntries.reduce(
      (total, entry) => total + entry.debit,
      0
    );
    const creditTotal = filteredJournalEntries.reduce(
      (total, entry) => total + entry.credit,
      0
    );
    const balanceTotal = debitTotal - creditTotal;

    return (
      <React.Fragment>
        <form className={styles.forms}>
          <h2 className="text-center">
            Journals affecting{" "}
            {selectedAccount
              ? `${selectedAccount.accountName} (${selectedAccount.accountNumber})`
              : ""}
          </h2>
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
            {/* {console.log("filteredJournalEntries:", filteredJournalEntries)} */}
            <tbody>
              {filteredJournalEntries.map((entry) => (
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
  };

  const renderTable = (tableTitle) => {
    console.log("renderTable called with accountId:", accountId);
    if (accountId === undefined) {
      // If accountId is undefined, render the General Ledger tables
      console.log("Rendering General Ledger tables");
      return renderGeneralLedgerTables(tableTitle);
    }

    if (!accountId) {
      console.log("accountId is falsy:", accountId);
      // If accountId is falsy (null or empty string), don't render anything
      console.log("AccountId is null or empty string:", accountId);
      return null;
    }

    if (account === null) {
      console.log("Account is null:", account);
      // If account is null, return null to avoid rendering anything
      console.log("Account is null:", account);
      return null;
    }

    // Otherwise, render the Subledger table
    console.log("Rendering Subledger table");
    return renderSubledgerTable();
  };

  return (
    <Container className={styles.dashboardContainer}>
      <Row>
        <Col>
          <div className="container">
            <div>
              <div style={{ height: "20px" }}></div>
              <React.Fragment>
                {accountId !== undefined ? (
                  <div
                    className="prevButton"
                    style={{ float: "left", marginRight: "10px" }}
                  >
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id="view-pr-tooltip">
                          Return to the General Ledger
                        </Tooltip>
                      }
                    >
                      <img
                        src={previous}
                        alt="Return to General Ledger"
                        onClick={handleBackClick}
                        style={{ cursor: "pointer" }}
                      />
                    </OverlayTrigger>
                  </div>
                ) : null}
              </React.Fragment>
              <React.Fragment>
                {accountId === undefined ? (
                  <h1>General Ledger</h1>
                ) : (
                  <h1>
                    Ledger for Account{" "}
                    {selectedAccount
                      ? `${selectedAccount.accountName} (${selectedAccount.accountNumber})`
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
                    {account === undefined ? (
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
                  {accountId !== undefined ? <StatusFilterDropdown /> : null}
                </React.Fragment>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col>
                <React.Fragment>
                  {accountId === undefined ? (
                    <div className="container">
                      {renderGeneralLedgerTables("Assets", "Assets")}
                      {renderGeneralLedgerTables("Liabilities", "Liabilities")}
                      {renderGeneralLedgerTables("Equity", "Equity")}
                      {renderGeneralLedgerTables("Revenue", "Revenue")}
                      {renderGeneralLedgerTables("Expenses", "Expenses")}
                    </div>
                  ) : (
                    <div className="container">{renderSubledgerTable()}</div>
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
                {accountId !== undefined ? (
                  <Col>
                    <div className={styles.tooltipContainer}>
                      <button
                        className={`${styles.tooltip}`}
                        onClick={handleBackClick}
                      >
                        Back to General Ledger
                        <span className={styles.tooltipText}>
                          Return to the General Ledger
                        </span>
                      </button>
                    </div>
                  </Col>
                ) : null}
              </React.Fragment>
              <Col>
                <div className={styles.tooltipContainer}>
                  <Link to="/manager-accounts-management/journal">
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

export default ManagerViewLedger;
