import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import styles from "./AccountForm.module.css";

const AddAccountsForm = ({ selectedDate }) => {
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Container>
      <h2>View Account</h2>
      <p>
        Selected Date:{" "}
        {selectedDate ? selectedDate.toDateString() : "No date selected"}
      </p>
    </Container>
  );
  //     <form className={styles.forms} onSubmit={handleSubmit}>
  //       <label>
  //         Account Name:
  //         <input
  //           type="text"
  //           value={accountName}
  //           onChange={(e) => setAccountName(e.target.value)}
  //         />
  //       </label>
  //       <label>
  //         Account Number:
  //         <input
  //           type="text"
  //           value={accountNumber}
  //           onChange={(e) => setAccountNumber(e.target.value)}
  //         />
  //       </label>
  //       {/* ... other form fields */}
  //       <button type="submit">Submit</button>
  //     </form>
  //   );
};

export default AddAccountsForm;
