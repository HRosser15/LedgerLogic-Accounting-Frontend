import React, { useContext, useState } from "react";
import { Container, Tab, Tabs, Tooltip, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./AccountsManagement.module.css";
import "./DatePickerStyles.css";
import AppContext from "../../../context/AppContext";
import ManagerViewAccountsForm from "./Forms/ViewAccountsForm";
import ManagerViewLedger from "./Forms/ViewLedger";

const ManagerAccountsManagement = ({ username }) => {
  const { state } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState("view");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedAccountNumber, setSelectedAccountNumber] = useState(null);

  const handleTabSelect = (tab) => {
    setActiveTab(tab);
  };

  const handleAccountSelection = (accountNumber) => {
    setSelectedAccountNumber(accountNumber);
  };

  const renderTabContent = () => {
    console.log("selectedAccountNumber:", selectedAccountNumber);
    switch (activeTab) {
      case "view":
        return selectedAccountNumber ? (
          <ManagerViewLedger
            accountNumber={selectedAccountNumber}
            handleAccountSelection={handleAccountSelection}
          />
        ) : (
          <ManagerViewAccountsForm
            selectedDate={selectedDate}
            setSelectedAccountNumber={setSelectedAccountNumber}
            handleAccountSelection={handleAccountSelection}
          />
        );
      default:
        return null;
    }
  };

  const handleCancel = () => {
    setActiveTab("view");
  };

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
      </Tabs>

      {renderTabContent(selectedDate)}
    </Container>
  );
};

export default ManagerAccountsManagement;
