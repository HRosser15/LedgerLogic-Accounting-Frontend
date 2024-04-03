import React, { useContext, useState, useEffect } from "react";
import { fetchAccounts } from "../../../services/AccountService";
import { Container, Tab, Tabs, Tooltip, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./AccountsManagement.module.css";
import "./DatePickerStyles.css";
import AppContext from "../../../../context/AppContext";
import ManagerViewAccountsForm from "./Forms/ViewAccountsForm";
import ManagerViewLedger from "./Forms/ViewLedger";

const ManagerAccountsManagement = ({ username }) => {
  const { state } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState("view");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedAccountNumber, setSelectedAccountNumber] = useState(null);
  const [accounts, setAccounts] = useState([]);

  const handleTabSelect = (tab) => {
    setActiveTab(tab);
    if (tab === "view") {
      setSelectedAccountNumber(null);
    }
  };

  const handleAccountSelection = (accountNumber) => {
    setSelectedAccountNumber(accountNumber);
    handleTabSelect("ledgers");
  };

  const renderTabContent = () => {
    console.log("selectedAccountNumber:", selectedAccountNumber);
    switch (activeTab) {
      case "view":
        return (
          <ManagerViewAccountsForm
            selectedDate={selectedDate}
            handleAccountSelection={handleAccountSelection}
            accounts={accounts}
          />
        );
      case "ledgers":
        return selectedAccountNumber ? (
          <ManagerViewLedger
            accountNumber={selectedAccountNumber}
            handleBackToAccounts={handleBackToAccounts}
            accounts={accounts}
            handleAccountSelection={handleAccountSelection}
          />
        ) : (
          <ManagerViewLedger
            accountNumber={selectedAccountNumber}
            handleBackToAccounts={handleBackToAccounts}
            accounts={accounts}
            handleAccountSelection={handleAccountSelection}
          />
        );
      default:
        return null;
    }
  };

  const handleBackToAccounts = () => {
    setSelectedAccountNumber(null);
  };

  const handleCancel = () => {
    setActiveTab("view");
  };

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
        console.log(
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

  return (
    <Container>
      <div style={{ height: "50px" }}></div>
      <Row>
        <Col>
          <div className={`${styles.textLeft}`}>
            <p>Select a date</p>
          </div>
          <div
            className={`${styles.datePickerContainer} ${styles.leftAlignedDatePicker}`}
          >
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
            />
          </div>
        </Col>
        <Col>
          <h1>Account Management</h1>
        </Col>
        <Col></Col>
      </Row>

      {/* Tabbed Interface */}
      <Tabs
        id="manager-tabs"
        activeKey={activeTab}
        onSelect={handleTabSelect}
        className={styles.tabs}
      >
        <Tab
          eventKey="view"
          title={<span title="View existing accounts">View</span>}
        >
          <div style={{ height: "20px" }}></div>
        </Tab>
        <Tab
          eventKey="ledgers"
          title={<span title="View account ledgers">Ledgers</span>}
        >
          <div style={{ height: "20px" }}></div>
        </Tab>
      </Tabs>

      {renderTabContent(selectedDate)}
    </Container>
  );
};

export default ManagerAccountsManagement;
