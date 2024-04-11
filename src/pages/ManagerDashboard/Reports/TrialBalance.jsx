import React, { useState, useEffect } from "react";
import {
  fetchAccounts,
  fetchAccountBalancesByDate,
} from "../../../services/AccountService";
import { Container, Row, Col, Table, Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ManagerTrialBalance = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <Container>
      <div style={{ height: "50px" }}></div>
      <h1>Trial Balance</h1>

      <div style={{ height: "200px" }}></div>
    </Container>
  );
};

export default ManagerTrialBalance;
