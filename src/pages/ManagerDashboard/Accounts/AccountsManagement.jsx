import React, { useContext, useState, useEffect } from "react";
import { fetchAccounts } from "../../../services/AccountService";
import { Container, Tab, Tabs, Tooltip, Row, Col } from "react-bootstrap";
import { JournalContext } from "../../../../context/JournalContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./AccountsManagement.module.css";
import "./DatePickerStyles.css";
import AppContext from "../../../../context/AppContext";
import ManagerViewAccountsForm from "./Forms/ViewAccountsForm";
import ManagerViewLedger from "./Forms/ViewLedger";
import ManagerCreateJournal from "./Forms/CreateJournalEntry";
import EventLog from "./Forms/EventLog";

const ManagerAccountsManagement = ({ username }) => {
  const { state } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState("Chart of Accounts");
  const [selectedDate, setSelectedDate] = useState(null);
  // const [selectedAccountNumber, setSelectedAccountNumber] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [newEntry, setNewEntry] = useState(null);

  const handleTabSelect = (tab) => {
    setActiveTab(tab);
    if (tab === "Chart of Accounts") {
      setSelectedAccount(null);
    }
  };

  const handleAccountSelection = (account) => {
    setSelectedAccount(account);
    handleTabSelect("ledgers");
  };

  const renderTabContent = () => {
    // console.log("selectedAccountNumber:", selectedAccountNumber);
    console.log("selectedAccount:", selectedAccount);
    switch (activeTab) {
      case "Chart of Accounts":
        return (
          <ManagerViewAccountsForm
            selectedDate={selectedDate}
            handleAccountSelection={handleAccountSelection}
            accounts={accounts}
            newEntry={newEntry}
          />
        );
      case "ledgers":
        return (
          <ManagerViewLedger
            // accountNumber={selectedAccountNumber}
            account={selectedAccount}
            handleBackToAccounts={handleBackToAccounts}
            accounts={accounts}
            handleAccountSelection={handleAccountSelection}
            newEntry={newEntry}
          />
        );
      case "journal":
        return (
          <ManagerCreateJournal
            // accountNumber={selectedAccountNumber}
            handleBackToAccounts={handleBackToAccounts}
            accounts={accounts}
            handleAccountSelection={handleAccountSelection}
          />
        );
      case "event log":
        return <EventLog />;
      case "balance sheet":
        return <BalanceSheet accounts={accounts} />;
      default:
        return null;
    }
  };

  const handleBackToAccounts = () => {
    setSelectedAccount(null);
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

  const { journalEntries } = useContext(JournalContext);

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
          eventKey="Chart of Accounts"
          title={<span title="View existing accounts">Chart of Accounts</span>}
        >
          <div style={{ height: "20px" }}></div>
        </Tab>
        <Tab
          eventKey="ledgers"
          title={<span title="View account ledgers">Ledgers</span>}
        >
          <div style={{ height: "20px" }}></div>
        </Tab>
        <Tab
          eventKey="journal"
          title={<span title="Open journal">Journal</span>}
        ></Tab>
        <Tab
          eventKey="event log"
          title={<span title="Open Event Log">Event Log</span>}
        >
          <div style={{ height: "20px" }}></div>
        </Tab>
        <Tab
          eventKey="balance sheet"
          title={<span title="View Balance Sheet">Balance Sheet</span>}
        >
          <div style={{ height: "20px" }}></div>
        </Tab>
      </Tabs>

      {renderTabContent(selectedDate)}
    </Container>
  );
};

export default ManagerAccountsManagement;
