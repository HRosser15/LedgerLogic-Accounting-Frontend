import React, { useContext, useState, useEffect } from "react";
import { fetchAccounts } from "../../../services/AccountService";
import { Container, Tab, Tabs, Tooltip, Row, Col } from "react-bootstrap";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

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
      case "Chart of Accounts":
        return (
          <AdminViewAccountsForm
            selectedDate={selectedDate}
            handleAccountSelection={handleAccountSelection}
            accounts={accounts}
            newEntry={newEntry}
            isGeneralLedger={false}
          />
        );
      case "ledgers":
        return (
          <AdminViewAccountsForm
            selectedDate={selectedDate}
            handleAccountSelection={handleAccountSelection}
            accounts={accounts}
            newEntry={newEntry}
            isGeneralLedger={true}
          />
        );
      case "journal":
        return (
          <AdminCreateJournal
            // accountNumber={selectedAccountNumber}
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
        activeKey={location.pathname}
        onSelect={(key) => {
          if (key === "/admin-accounts-management/ledgers") {
            setSelectedAccount(null);
          }
          navigate(key);
        }}
        className={styles.tabs}
      >
        <Tab
          eventKey="/admin-accounts-management"
          title={<span title="View existing accounts">Chart of Accounts</span>}
        >
          <div style={{ height: "20px" }}></div>
        </Tab>
        <Tab
          eventKey="/admin-accounts-management/add"
          title={<span title="Add a new account">Add Account</span>}
        >
          <div style={{ height: "20px" }}></div>
        </Tab>
        <Tab
          eventKey="/admin-accounts-management/edit"
          title={<span title="Edit an existing account">Update Account</span>}
        >
          <div style={{ height: "20px" }}></div>
        </Tab>
        <Tab
          eventKey="/admin-accounts-management/deactivate"
          title={
            <span title="Deactivate an existing account">
              Deactivate Account
            </span>
          }
        >
          <div style={{ height: "20px" }}></div>
        </Tab>
        <Tab
          eventKey="/admin-accounts-management/ledgers"
          title={<span title="View account ledgers">Ledgers</span>}
        >
          <div style={{ height: "20px" }}></div>
        </Tab>
        <Tab
          eventKey="/admin-accounts-management/journal"
          title={<span title="Open journal">Journal</span>}
        ></Tab>
        <Tab
          eventKey="/admin-accounts-management/event-log"
          title={<span title="Open Event Log">Event Log</span>}
        >
          <div style={{ height: "20px" }}></div>
        </Tab>
      </Tabs>

      <Outlet />
    </Container>
  );
};

export default AdminAccountsManagement;
