import React, { useContext, useState, useEffect } from "react";
import { fetchAccounts } from "../../../services/AccountService";
import { Container, Tab, Tabs, Tooltip, Row, Col } from "react-bootstrap";
import { JournalContext } from "../../../../context/JournalContext";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const handleTabSelect = (tab) => {
    setActiveTab(tab);
    if (tab === "Chart of Accounts") {
      setSelectedAccount(null);
    }
  };

  const handleAccountSelection = (account) => {
    setSelectedAccount(account);
    navigate(`/manager-accounts-management/ledgers/${account.accountId}`);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Chart of Accounts":
        return (
          <ManagerViewAccountsForm
            selectedDate={selectedDate}
            handleAccountSelection={handleAccountSelection}
            accounts={accounts}
            newEntry={newEntry}
            isGeneralLedger={false}
          />
        );
      case "ledgers":
        return (
          <ManagerViewAccountsForm
            selectedDate={selectedDate}
            handleAccountSelection={handleAccountSelection}
            accounts={accounts}
            newEntry={newEntry}
            isGeneralLedger={true}
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
      });
  }, []);

  const { journalEntries } = useContext(JournalContext);

  return (
    <Container className={styles.dashboardContainer}>
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
        activeKey={location.pathname}
        onSelect={(key) => {
          if (key === "/manager-accounts-management/ledgers") {
            setSelectedAccount(null);
          }
          navigate(key);
        }}
        className={styles.tabs}
      >
        <Tab
          eventKey="/manager-accounts-management"
          title={<span title="View existing accounts">Chart of Accounts</span>}
        >
          <div style={{ height: "20px" }}></div>
        </Tab>
        <Tab
          eventKey="/manager-accounts-management/ledgers"
          title={<span title="View account ledgers">Ledgers</span>}
        >
          <div style={{ height: "20px" }}></div>
        </Tab>
        <Tab
          eventKey="/manager-accounts-management/journal"
          title={<span title="Open journal">Journal</span>}
        ></Tab>
        <Tab
          eventKey="/manager-accounts-management/event-log"
          title={<span title="Open Event Log">Event Log</span>}
        >
          <div style={{ height: "20px" }}></div>
        </Tab>
      </Tabs>

      <Outlet />
    </Container>
  );
};

export default ManagerAccountsManagement;
