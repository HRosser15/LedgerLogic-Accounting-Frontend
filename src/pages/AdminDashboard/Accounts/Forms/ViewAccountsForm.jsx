import React, { useState, useContext, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { fetchAccounts } from "../../../../services/AccountService";
import styles from "./AccountForm.module.css";
import DatePicker from "react-datepicker";
import "./DatePickerStyles.css";
import AppContext from "../../../../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const ViewAccountsForm = ({ selectedDate }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [selectedFilterOption, setSelectedFilterOption] = useState("");
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

  useEffect(() => {
    fetchAccounts()
      .then((response) => {
        const sortedAccounts = response.data.sort(
          (a, b) => a.accountNumber - b.accountNumber
        );
        setAccounts(sortedAccounts);
      })
      .catch((error) => {
        console.error(error);
        concole.log(
          "Make sure you alter the column size of previous_state and current_state (in the h2 database)"
        );
        console.log(
          "This can be done in the h2 console at 'http://localhost:8080/h2-console' (Password is 'password' with:"
        );
        console.log(
          "ALTER TABLE event_log ALTER COLUMN previous_state VARCHAR(60000);"
        );
        console.log(
          "ALTER TABLE event_log ALTER COLUMN current_state VARCHAR(60000);"
        );
      });
  }, []);

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
    setDateFilter((prevState) => ({
      ...prevState,
      [field]: date ? date.toISOString() : "",
    }));
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
              <DatePicker
                selected={dateFilter.start ? new Date(dateFilter.start) : null}
                onChange={(date) => handleDateFilterChange(date, "start")}
                placeholderText="Start Date"
              />
            </div>
            <div
              className={`${styles.datePickerContainer} ${styles.leftAlignedDatePicker}`}
            >
              <DatePicker
                selected={dateFilter.end ? new Date(dateFilter.end) : null}
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
    // Filter by creation date
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

    return (
      <form className={styles.forms}>
        <h2 className="text-center">{tableTitle}</h2>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>No.</th>
              <th>Account Name</th>
              <th>Subcategory</th>
              <th>Normal Side</th>
              <th>Description</th>
              <th>Balance</th>
              <th>Creation Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredTableAccounts.map((account) => (
              <tr key={account.accountNumber}>
                <td>{account.accountNumber}</td>
                <td>
                  <Link to={`/account/${account.accountNumber}`}>
                    {account.accountName}
                  </Link>
                </td>
                <td>{account.subCategory}</td>
                <td>{account.normalSide}</td>
                <td>{account.description}</td>
                <td>
                  {parseFloat(account.initialBalance).toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </td>
                <td>{formatDate2(account.creationDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    );
  };

  return (
    <Container className={styles.dashboardContainer}>
      <Row className="mb-4">
        <Col>
          <div className="container">
            <Form.Group
              controlId="searchTerm"
              className="d-flex flex-column align-items-start"
            >
              <Form.Label className="mr-2">Search Accounts:</Form.Label>
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
              <Form.Label className="mr-2">Filter Accounts:</Form.Label>
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
      <Row className="mb-4">
        <Col>
          <div className="container">
            {renderTable("Assets", assetAccounts)}
            {renderTable("Liabilities", liabilityAccounts)}
            {renderTable("Equity", equityAccounts)}
            {renderTable("Revenue", revenueAccounts)}
            {renderTable("Expenses", expenseAccounts)}
            <div style={{ height: "200px" }}></div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ViewAccountsForm;
