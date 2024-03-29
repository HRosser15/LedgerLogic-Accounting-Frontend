import React, { useContext, useState } from "react";
import { Container, Tab, Tabs, Tooltip, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./AccountsManagement.module.css";
import "./DatePickerStyles.css";
import AppContext from "../../../../context/AppContext";
import AccountantViewAccountsForm from "./Forms/ViewAccountsForm";

const AccountantAccountsManagement = ({ username }) => {
  const { state } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState("view");
  const [selectedDate, setSelectedDate] = useState(null);

  const handleTabSelect = (tab) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "view":
        return <AccountantViewAccountsForm selectedDate={selectedDate} />;
      // More tabs here
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
        id="accountant-tabs"
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
        {/* Add more tabs here */}
      </Tabs>

      {renderTabContent(selectedDate)}
    </Container>
  );
};

export default AccountantAccountsManagement;
