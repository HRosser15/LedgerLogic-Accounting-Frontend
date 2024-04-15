import AppContext from "../../../../../context/AppContext";
import React, { useState, useEffect, useContext } from "react";
import {
  fetchEventLog,
  fetchAccounts,
} from "../../../../services/AccountService";
import { Container, Spinner } from "react-bootstrap"; // Added Spinner for loading state
import styles from "./AccountForm.module.css";

const EventLog = () => {
  const { state } = useContext(AppContext);
  const [eventLog, setEventLog] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Set loading state to true before fetching data
      try {
        // Fetch event log data
        const eventLogResponse = await fetchEventLog();
        const filteredEventLog = eventLogResponse.data.filter(
          (event) => event.previousState && event.title !== "Update User"
        );
        setEventLog(filteredEventLog);

        // Fetch accounts data
        const accountsResponse = await fetchAccounts();
        setAccounts(accountsResponse.data);

        setIsLoading(false); // Set loading state to false after successful data fetch
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error); // Set error state if there's an error during data fetch
        setIsLoading(false); // Set loading state to false after error
      }
    };

    fetchData();
  }, []);

  const getAccountName = (entityId) => {
    const account = accounts.find((acc) => acc.accountId === entityId);
    return account ? account.accountName : "N/A";
  };

  const formatModificationTime = (time) => {
    const date = new Date(time);
    const year = date.getFullYear();
    const month = date.toLocaleString("default", { month: "long" });
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${year}, ${month} ${day} ${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  if (isLoading) {
    return (
      <Container className={styles.loaderContainer}>
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className={styles.errorContainer}>
        <div>Error fetching data: {error.message}</div>
      </Container>
    );
  }

  return (
    <Container>
      <form className={styles.forms}>
        <h2 className="text-center">Event Log</h2>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th style={{ maxWidth: "10%" }}>ID</th>
              <th style={{ maxWidth: "15%" }}>Account Name</th>
              <th style={{ maxWidth: "15%" }}>Title</th>
              <th style={{ maxWidth: "20%" }}>Modified By</th>
              <th style={{ maxWidth: "20%" }}>Modification Time</th>
              <th style={{ maxWidth: "20%" }}>Current State</th>
              <th style={{ maxWidth: "20%" }}>Previous State</th>
            </tr>
          </thead>
          <tbody>
            {eventLog.map((event, index) => (
              <tr key={event.id}>
                <td>{index + 1}</td>
                <td>{getAccountName(event.entityId)}</td>
                <td>{event.title}</td>
                <td>User ID: hrosser0424</td>
                <td>{formatModificationTime(event.modificationTime)}</td>
                <td>{event.currentState}</td>
                <td>{event.previousState}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>

      <div style={{ height: "200px" }}></div>
    </Container>
  );
};

export default EventLog;
