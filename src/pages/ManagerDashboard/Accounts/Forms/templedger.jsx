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

const ManagerViewLedger = ({
  account,
  handleBackToAccounts,
  accounts,
  handleAccountSelection,
}) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilterOption, setSelectedFilterOption] = useState("");
  const [selectedFilterOptionText, setSelectedFilterOptionText] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([
    "Assets",
    "Liabilities",
    "equity",
    "revenue",
    "expenses",
  ]);
  const [subcategoryFilter, setSubcategoryFilter] = useState("");
  const [normalSideFilter, setNormalSideFilter] = useState("");
  const [balanceFilter, setBalanceFilter] = useState({ min: "", max: "" });
  const [dateFilter, setDateFilter] = useState({ start: "", end: "" });

  const filterOptions = [
    { value: "category", label: "Account Category", type: "checkbox" },
    { value: "subcategory", label: "Account Subcategory", type: "text" },
    { value: "balance", label: "Account Balance", type: "range" },
    { value: "normalSide", label: "Normal Side", type: "radio" },
    { value: "date", label: "Date Created", type: "date" },
  ];

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
    setSearchTerm(event.target.value);
  };

  const assetAccounts = filterAccountsByRange(1000, 1999);
  const liabilityAccounts = filterAccountsByRange(3000, 3999);
  const equityAccounts = filterAccountsByRange(5000, 5999);
  const revenueAccounts = filterAccountsByRange(6000, 6999);
  const expenseAccounts = filterAccountsByRange(7000, 7999);

  const handleFilterChange = (event) => {
    const selectedOption = filterOptions.find(
      (option) => option.value === event.target.value
    );

    setSelectedFilterOption(selectedOption.value);
    setSelectedFilterOptionText(selectedOption.label);
  };

  const handleCategoryChange = (category) => {
    const updatedCategories = [...selectedCategories];
    const index = updatedCategories.indexOf(category);

    if (index === -1) {
      updatedCategories.push(category);
    } else {
      updatedCategories.splice(index, 1);
    }

    setSelectedCategories(updatedCategories);
  };

  const handleSubcategoryFilterChange = (event) => {
    setSubcategoryFilter(event.target.value);
  };

  const handleNormalSideFilterChange = (event) => {
    setNormalSideFilter(event.target.value);
  };

  const handleBalanceFilterChange = (event, field) => {
    const value = event.target.value.replace(/[^0-9.]/g, "");
    setBalanceFilter((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleDateFilterChange = (date, field) => {
    if (field === "start") {
      setStartDate(date);
    } else if (field === "end") {
      setEndDate(date);
    }
  };

  const renderFilterOptions = () => {
    switch (selectedFilterOption) {
      case "category":
        return (
          <div>
            <Form.Check
              type="checkbox"
              id="assetCheckbox"
              label="Assets"
              checked={selectedCategories.includes("Assets")}
              onChange={() => handleCategoryChange("Assets")}
            />
            <Form.Check
              type="checkbox"
              id="liabilityCheckbox"
              label="Liabilities"
              checked={selectedCategories.includes("Liabilities")}
              onChange={() => handleCategoryChange("Liabilities")}
            />
            <Form.Check
              type="checkbox"
              id="equityCheckbox"
              label="Equity"
              checked={selectedCategories.includes("equity")}
              onChange={() => handleCategoryChange("equity")}
            />
            <Form.Check
              type="checkbox"
              id="revenueCheckbox"
              label="Revenue"
              checked={selectedCategories.includes("revenue")}
              onChange={() => handleCategoryChange("revenue")}
            />
            <Form.Check
              type="checkbox"
              id="expenseCheckbox"
              label="Expenses"
              checked={selectedCategories.includes("expenses")}
              onChange={() => handleCategoryChange("expenses")}
            />
          </div>
        );
      case "subcategory":
        return (
          <Form.Control
            type="text"
            value={subcategoryFilter}
            onChange={handleSubcategoryFilterChange}
            placeholder="Enter subcategory"
          />
        );
      case "normalSide":
        return (
          <div>
            <Form.Check
              type="radio"
              id="debitRadio"
              label="Debit"
              value="Debit"
              checked={normalSideFilter === "Debit"}
              onChange={handleNormalSideFilterChange}
            />
            <Form.Check
              type="radio"
              id="creditRadio"
              label="Credit"
              value="Credit"
              checked={normalSideFilter === "Credit"}
              onChange={handleNormalSideFilterChange}
            />
          </div>
        );
      case "balance":
        return (
          <div>
            <Form.Control
              type="text"
              placeholder="Minimum"
              value={balanceFilter.min}
              onChange={(e) => handleBalanceFilterChange(e, "min")}
            />
            <Form.Control
              type="text"
              placeholder="Maximum"
              value={balanceFilter.max}
              onChange={(e) => handleBalanceFilterChange(e, "max")}
            />
          </div>
        );
      case "date":
        return (
          <div>
            <div
              className={`${styles.datePickerContainer} ${styles.leftAlignedDatePicker}`}
            >
              <ReactDatePicker
                selected={startDate}
                onChange={(date) => handleDateFilterChange(date, "start")}
                placeholderText="Start Date"
              />
            </div>
            <div
              className={`${styles.datePickerContainer} ${styles.leftAlignedDatePicker}`}
            >
              <ReactDatePicker
                selected={endDate}
                onChange={(date) => handleDateFilterChange(date, "end")}
                placeholderText="End Date"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderTable = (tableTitle, tableAccounts) => {
    let filteredTableAccounts = tableAccounts;

    // Filter by category
    if (selectedFilterOption === "category") {
      filteredTableAccounts = tableAccounts.filter((account) =>
        selectedCategories.some(
          (category) =>
            category.toLowerCase() === account.category.toLowerCase()
        )
      );
    }

    // Filter by subcategory
    if (selectedFilterOption === "subcategory") {
      filteredTableAccounts = tableAccounts.filter((account) =>
        account.subCategory
          .toLowerCase()
          .includes(subcategoryFilter.toLowerCase())
      );
    }

    // Filter by normal side
    if (selectedFilterOption === "normalSide") {
      filteredTableAccounts = tableAccounts.filter(
        (account) => account.normalSide === normalSideFilter
      );
    }

    // Filter by balance
    if (selectedFilterOption === "balance") {
      filteredTableAccounts = tableAccounts.filter(
        (account) =>
          account.balance >= parseFloat(balanceFilter.min) &&
          account.balance <= parseFloat(balanceFilter.max)
      );
    }

    // Filter by creation date
    if (selectedFilterOption === "date") {
      filteredTableAccounts = tableAccounts.filter((account) => {
        const creationDate = new Date(account.creationDate);
        const startDate = new Date(dateFilter.start);
        const endDate = new Date(dateFilter.end);
        endDate.setHours(23, 59, 59, 999); // Set the end date to the end of the day

        return creationDate >= startDate && creationDate <= endDate;
      });
    }

    // Additional filtering based on the search term
    filteredTableAccounts = filteredTableAccounts.filter(
      (account) =>
        account.accountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.accountNumber.toString().includes(searchTerm.toLowerCase())
    );

    if (filteredTableAccounts.length === 0) {
      return null;
    }

    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
    };

    const handleBackClick = () => {
      handleBackToAccounts();
      handleTabSelect("Chart of Accounts");
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
    if (account !== null) {
      console.log("Account: ", account);
      console.log("account number: ", account.accountNumber);
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
                    Ledger for Account{" "}
                    {account
                      ? `${account.accountName} (${account.accountNumber})`
                      : ""}
                  </h1>
                  <div style={{ height: "50px" }}></div>
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

                        {renderFilterOptions()}
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
                      <Link>
                        <button
                          className={`${styles.tooltip}`}
                          onClick={handleBackClick}
                        >
                          Back to Accounts
                          <span className={styles.tooltipText}>
                            Return to the Chart of Accounts
                          </span>
                        </button>
                      </Link>
                    </div>
                  </Col>
                  <Col>
                    <div className={styles.tooltipContainer}>
                      <Link to="/manager-create-journal">
                        <button
                          className={`${styles.addButton} ${styles.tooltip}`}
                        >
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
    }

    // =================
    // GENERAL LEDGER
    // =================
    if (account === null) {
      console.log("Account variable is null. Rendering General Ledger");
      return (
        <Container>
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
        </Container>
      );
    }
  };

  return (
    // <React.Fragment>
    //   {account === null ? (
    <Container className={styles.dashboardContainer}>
      {account === null ? (
        <React.Fragment>
          <Row>
            <h1>General Ledger</h1>
            <div style={{ height: "50px" }}></div>
          </Row>
          <Row className="mb-4">
            <Col>
              <div className="container">
                <Form.Group
                  controlId="searchTerm"
                  className="d-flex flex-column align-items-start"
                >
                  <Form.Label className="mr-2">Search Ledgers:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Account Name or Account No."
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
                  <Form.Label className="mr-2">Filter Ledgers:</Form.Label>
                  <Form.Control
                    as="select"
                    value={selectedFilterOption || ""} // Display the selected filter option text
                    onChange={handleFilterChange}
                    style={{ maxWidth: "400px", marginBottom: "10px" }}
                  >
                    <option value="">Select Filter</option>
                    {filterOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Form.Control>

                  {renderFilterOptions()}
                </Form.Group>
              </div>
            </Col>
          </Row>
        </React.Fragment>
      ) : null}

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
                <div style={{ height: "200px" }}></div>
              </div>
            ) : (
              <div className="container">
                {renderTable("Assets", assetAccounts)}
                <div style={{ height: "200px" }}></div>
              </div>
            )}
          </React.Fragment>
        </Col>
      </Row>
    </Container>
  );
};

export default ManagerViewLedger;
