import React, { useContext, useState } from "react";
import { Container, Tab, Tabs, Tooltip, Row, Col } from "react-bootstrap";
import styles from "../AdminDashboard.module.css";
import AppContext from "../../../../context/AppContext";
import UserList from "./UserList";
import ExpiredPasswords from "./ExpiredPasswords";
import AddNewUser from "./AddNewUser";
import UpdateUser from "./UpdateUser";
import DatePicker from "react-datepicker";

const UsersDashboard = ({ username }) => {
  const { state } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState("view");
  const [selectedDate, setSelectedDate] = useState(null);

  const handleTabSelect = (tab) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "add":
        return <AddNewUser onCancel={() => handleCancel()} />;
      case "update":
        return <UpdateUser />;
      case "view":
        return <UserList selectedDate={selectedDate} />;
      case "expired-passwords":
        return <ExpiredPasswords />;

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
          <h1>User Management</h1>
        </Col>
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
          title={<span title="View existing users">View</span>}
        >
          <div style={{ height: "20px" }}></div>
        </Tab>
        <Tab eventKey="add" title={<span title="Add a new user">Add</span>}>
          <div style={{ height: "20px" }}></div>
        </Tab>
        <Tab
          eventKey="update"
          title={<span title="Update an existing user">Update</span>}
        >
          {/* Edit Account Form Component Goes Here */}
          <div style={{ height: "20px" }}></div>
        </Tab>
        <Tab
          eventKey="expired-passwords"
          title={
            <span title="View account expiration dates">Expired Passwords</span>
          }
        >
          {/* Deactivate Account Form Component Goes Here */}
          <div style={{ height: "20px" }}></div>
        </Tab>
      </Tabs>

      {renderTabContent(selectedDate)}
    </Container>
  );
};

export default UsersDashboard;
