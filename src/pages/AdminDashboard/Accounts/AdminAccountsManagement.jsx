import React, { useContext, useState, useEffect } from "react";
import { fetchAccounts } from "../../../services/AccountService";
import { Container, Tab, Tabs, Tooltip, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./AdminAccountsManagement.module.css";
import "./DatePickerStyles.css";
import AppContext from "../../../../context/AppContext";
import AddAccountsForm from "./Forms/AddAccountsForm";
import EditAccountsForm from "./Forms/EditAccountsForm";
import ViewAccountsForm from "./Forms/ViewAccountsForm";
import DeactivateAccountsForm from "./Forms/DeactivateAccountsForm";
import AdminViewLedger from "./Forms/ViewLedger";
import AdminCreateJournal from "./Forms/CreateJournalEntry";
import EventLog from "./Forms/EventLog";

const AdminAccountsManagement = ({ username }) => {
  const { state } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState("view");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [newEntry, setNewEntry] = useState(null);

  const handleTabSelect = (tab) => {
    setActiveTab(tab);
    if (tab === "view") {
      setSelectedAccount(null);
    }
  };

  const handleAccountSelection = (account) => {
    setSelectedAccount(account);
    handleTabSelect("ledgers");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "add":
        return <AddAccountsForm onCancel={() => handleCancel()} />;
      case "edit":
        return <EditAccountsForm />;
      case "view":
        return (
          <ViewAccountsForm
            selectedDate={selectedDate}
            handleAccountSelection={handleAccountSelection}
            accounts={accounts}
            newEntry={newEntry}
          />
        );
      case "deactivate":
        return <DeactivateAccountsForm />;
      case "ledgers":
        return (
          <AdminViewLedger
            account={selectedAccount}
            handleBackToAccounts={handleBackToAccounts}
            accounts={accounts}
            handleAccountSelection={handleAccountSelection}
            newEntry={newEntry}
          />
        );
      case "journal":
        return (
          <AdminCreateJournal
            handleBackToAccounts={handleBackToAccounts}
            accounts={accounts}
            handleAccountSelection={handleAccountSelection}
          />
        );
      case "event log":
        return <EventLog />;
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
        id="admin-tabs"
        activeKey={activeTab}
        onSelect={handleTabSelect}
        className={styles.tabs}
      >
        <Tab
          eventKey="view"
          title={<span title="View existing accounts">Chart of Accounts</span>}
        >
          <div style={{ height: "20px" }}></div>
        </Tab>
        <Tab
          eventKey="add"
          title={<span title="Add a new account">Add Account</span>}
        >
          <div style={{ height: "20px" }}></div>
        </Tab>
        <Tab
          eventKey="edit"
          title={<span title="Edit an existing account">Update Account</span>}
        >
          {/* Edit Account Form Component Goes Here */}
          <div style={{ height: "20px" }}></div>
        </Tab>
        <Tab
          eventKey="deactivate"
          title={
            <span title="Deactivate an existing account">
              Deactivate Account
            </span>
          }
        >
          {/* Deactivate Account Form Component Goes Here */}
          <h2>Deactivate Account</h2>
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
      </Tabs>

      {renderTabContent(selectedDate)}
    </Container>
  );
};

export default AdminAccountsManagement;
