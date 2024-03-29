import React, { useContext, useState } from "react";
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

const AdminAccountsManagement = ({ username }) => {
  const { state } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState("view");
  const [selectedDate, setSelectedDate] = useState(null);

  const handleTabSelect = (tab) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "add":
        return <AddAccountsForm onCancel={() => handleCancel()} />;
      case "edit":
        return <EditAccountsForm />;
      case "view":
        return <ViewAccountsForm selectedDate={selectedDate} />;
      case "deactivate":
        return <DeactivateAccountsForm />;
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
        id="admin-tabs"
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
        <Tab eventKey="add" title={<span title="Add a new account">Add</span>}>
          <div style={{ height: "20px" }}></div>
        </Tab>
        <Tab
          eventKey="edit"
          title={<span title="Edit an existing account">Edit</span>}
        >
          {/* Edit Account Form Component Goes Here */}
          <div style={{ height: "20px" }}></div>
        </Tab>
        <Tab
          eventKey="deactivate"
          title={<span title="Deactivate an existing account">Deactivate</span>}
        >
          {/* Deactivate Account Form Component Goes Here */}
          <div style={{ height: "20px" }}></div>
          <h2>Deactivate Account</h2>
        </Tab>
      </Tabs>

      {renderTabContent(selectedDate)}
    </Container>
  );
};

export default AdminAccountsManagement;
