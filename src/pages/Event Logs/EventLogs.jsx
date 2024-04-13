import React, { useState, useEffect } from 'react';
import { AccountService } from '../services/AccountService';
import styles from './EventLogs.module.css'; 

const EventLogImage = ({ imageUrl, altText }) => {
  if (!imageUrl) {
    return <span>None</span>;
  }
  return <img src={imageUrl} alt={altText} className={styles.eventLogImage} />;
};

const EventLogs = ({ accountId }) => {
  const [eventLogs, setEventLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    AccountService.getEventLogs(accountId)
      .then(logs => {
        setEventLogs(logs);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching event logs:', err);
        setError(err);
        setIsLoading(false);
      });
  }, [accountId]);

  if (isLoading) return <div className={styles.loader}>Loading event logs...</div>;
  if (error) return <div className={styles.error}>Failed to load event logs: {error.message}</div>;
  if (!eventLogs.length) return <div className={styles.noLogs}>No event logs found for this account.</div>;

  return (
    <div className={styles.logsContainer}>
      <h2 className={styles.heading}>Event Logs for Account ID: {accountId}</h2>
      {eventLogs.map((log, index) => (
        <div key={index} className={styles.logEntry}>
          <div><strong>Change Time:</strong> {new Date(log.changeTime).toLocaleString()}</div>
          <div><strong>User ID:</strong> {log.userId}</div>
          <div><strong>Before:</strong> <EventLogImage imageUrl={log.beforeImage} altText="Before state" /></div>
          <div><strong>After:</strong> <EventLogImage imageUrl={log.afterImage} altText="After state" /></div>
        </div>
      ))}
    </div>
  );
};

export default EventLogs;
