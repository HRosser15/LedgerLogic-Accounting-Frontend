import AppContext from "../../../../../context/AppContext";
import React, { useState, useEffect, useContext } from "react";
import {
  fetchEventLog,
  fetchAccounts,
} from "../../../../services/AccountService";
import { Container, Spinner } from "react-bootstrap";
import styles from "./AccountForm.module.css";

const EventLog = () => {
  const { state } = useContext(AppContext);
  const [eventLog, setEventLog] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const eventLogResponse = await fetchEventLog();
        const filteredEventLog = eventLogResponse.data.filter(
          (event) => event.previousState && event.title !== "Update User"
        );
        setEventLog(filteredEventLog);

        const accountsResponse = await fetchAccounts();
        setAccounts(accountsResponse.data);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
        setIsLoading(false);
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

  const getUsernameFromId = (userId) => {
    if (userId === 1) {
      return "bwilson0424";
    } else if (userId === 2) {
      return "ksmith0424";
    }
    return "N/A";
  };

  const parseJournalState = (stateString) => {
    const matches = stateString.match(
      /journalId=(\d+), status=([^,]+), rejectionReason='([^']+)', balance=([^,]+), createdDate=([^}]+)/
    );

    if (!matches) return null;

    return {
      journalId: matches[1],
      status: matches[2],
      rejectionReason: matches[3],
      balance: matches[4],
      createdDate: matches[5],
    };
  };

  const parseAccountState = (stateString) => {
    const matches = stateString.match(
      /accountId=(\d+), accountNumber=(\d+), accountName=([^,]+), description=([^,]+), normalSide=([^,]+), category=([^,]+), active=([^,]+), subCategory=([^,]+), initialBalance=([^,]+), debit=([^,]+), credit=([^,]+), balance=([^,]+)/
    );

    if (!matches) return null;

    return {
      accountId: matches[1],
      accountNumber: matches[2],
      accountName: matches[3],
      description: matches[4],
      normalSide: matches[5],
      category: matches[6],
      active: matches[7] === "true",
      subCategory: matches[8],
      initialBalance: matches[9],
      debit: matches[10],
      credit: matches[11],
      balance: matches[12],
    };
  };

  const renderCurrentState = (event) => {
    if (event.title === "Update Account") {
      const accountData = parseAccountState(event.currentState);
      return (
        <div>
          Balance: {accountData.balance}
          <br />
          Debit: {accountData.debit}
          <br />
          Credit: {accountData.credit}
        </div>
      );
    } else if (
      event.title === "Approved New Journal" ||
      event.title === "Rejected New Journal"
    ) {
      const journalData = parseJournalState(event.currentState);
      if (journalData) {
        return (
          <div>
            Status: {journalData.status}
            {journalData.status === "REJECTED" && (
              <span> - Rejection Reason: {journalData.rejectionReason}</span>
            )}
          </div>
        );
      }
      return "Status: APPROVED";
    }
    return event.currentState;
  };

  const renderPreviousState = (event) => {
    if (
      event.title === "Approved New Journal" ||
      event.title === "Rejected New Journal"
    ) {
      return "status=PENDING";
    } else if (event.title === "Update Account") {
      const accountData = parseAccountState(event.previousState);
      return (
        <div>
          Balance: {accountData.balance}
          <br />
          Debit: {accountData.debit}
          <br />
          Credit: {accountData.credit}
        </div>
      );
    }
    return event.previousState;
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
                <td>{getUsernameFromId(event.modifiedById)}</td>
                <td>{formatModificationTime(event.modificationTime)}</td>
                <td>{renderCurrentState(event)}</td>
                <td>{renderPreviousState(event)}</td>
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
