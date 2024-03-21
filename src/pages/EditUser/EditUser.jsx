import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { registerUser } from "../../services/AuthService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./EditUser.module.css";

const EditUser = () => {
  const securityQuestionOptions = [
    [
      "What was the name of your favorite childhood pet?",
      "What was the name of your best friend growing up?",
      "What year was your grandmother born?",
    ],
    [
      "What is your mother's maiden name?",
      "What was your nickname growing up?",
      "What year was your grandmother born?",
    ],
    [
      "What was the make of your first car?",
      "What was the name of the school you attended for first grade?",
      "What is your favorite movie quote?",
    ],
  ];

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    passwordContent: "",
    role: "",
    birthDay: null,
    streetAddress: "",
    status: "false",
    passwordSecurityQuestions: [
      {
        answer: "",
        question: {
          content: "",
        },
      },
      {
        answer: "",
        question: {
          content: "",
        },
      },
      {
        answer: "",
        question: {
          content: "",
        },
      },
    ],
  });

  const handleChangeSecurityQuestion = (e, index) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      passwordSecurityQuestions: prevFormData.passwordSecurityQuestions.map(
        (question, i) =>
          i === index
            ? {
                ...question,
                question: {
                  content:
                    name === `securityQuestion${index + 1}`
                      ? value
                      : question.question.content,
                },
                answer:
                  name === `securityAnswer${index + 1}`
                    ? value
                    : question.answer,
              }
            : question
      ),
    }));
  };

  const [requestSent, setRequestSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "birthDay" ? new Date(value) : value,
    }));
  };

  const registerUserHandler = async () => {
    try {
      const response = await registerUser(formData);

      if (response.status === 201) {
        console.log("Changes saved");
        setRequestSent(true);
      } else {
        console.error("Changes not saved");
        setErrorMessage(
          "Request failed. Please check that the information entered is valid."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(
        "Request failed. Please check that the information entered is valid."
      );
    }
  };

  const handleClose = () => {
    setRequestSent(false);
    setErrorMessage("");
  };

  return (
    <div className={`container ${styles.formContainer}`}>
      <h2>Edit Account</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          registerUserHandler();
        }}
        className="row g-3"
      >
        <div className="col-md-6">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First name"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last name"
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="passwordContent"
            name="passwordContent"
            value={formData.passwordContent}
            onChange={handleChange}
            placeholder="Password"
          />
          <p className="password-requirements">
            Password must be 8 or characters and at least one of each:
            uppercase, number, special character{" "}
          </p>
        </div>

        <div className="col-md-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            id="category"
            className="form-select"
            name="category"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="asset">Asset</option>
            <option value="expenses">Expenses</option>
            <option value="liabilities">Liabilities</option>
            <option value="equity">Equity</option>
            <option value="revenue">Revenue</option>
          </select>
        </div>

        <div className="col-md-3">
          <label htmlFor="subcategory" className="form-label">
            Sub-Category
          </label>
          <select
            id="subcategory"
            className="form-select"
            name="subcategory"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="current assets">Current Assets</option>
            <option value="fixed assets">Fixed Assets</option>
          </select>
        </div>

        <div className="col-md-6">
          <label htmlFor="accountDesc" className="form-label">
            Account Description
          </label>
          <input
            type="text"
            className="form-control"
            id="accountDesc"
            name="accountDesc"
            value={formData.streetAddress}
            onChange={handleChange}
            placeholder="Account description"
          />
        </div>

        <div className="col-md-3">
          <label htmlFor="initialBalance" className="form-label">
            Initial Balance
          </label>
          <input
            type="text"
            className="form-control"
            id="initialBalance"
            name="initialBalance"
            placeholder="$0.00"
          />
        </div>

        <div className="col-md-3">
          <label htmlFor="debit" className="form-label">
            Debit
          </label>
          <input
            type="text"
            className="form-control"
            id="debit"
            name="debit"
            placeholder="$0.00"
          />
        </div>

        <div className="col-md-3">
          <label htmlFor="credit" className="form-label">
            Credit
          </label>
          <input
            type="text"
            className="form-control"
            id="credit"
            name="credit"
            placeholder="$0.00"
          />
        </div>

        <div className="col-md-3">
          <label htmlFor="balance" className="form-label">
            Balance
          </label>
          <input
            type="text"
            className="form-control"
            id="balance"
            name="balance"
            placeholder="$0.00"
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="account-added" className="form-label">
            Date Account Added
          </label>
          <input
            type="text"
            className="form-control"
            id="account-added"
            name="account-added"
            placeholder="XX/XX/XXXX"
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="user-id" className="form-label">
            User ID
          </label>
          <input
            type="text"
            className="form-control"
            id="user-id"
            name="user-id"
            placeholder="User ID"
          />
        </div>

        <div className="col-md-2">
          <label htmlFor="order" className="form-label">
            Order
          </label>
          <input
            type="text"
            className="form-control"
            id="order"
            name="order"
            placeholder="01"
          />
        </div>

        <div className="col-md-2">
          <label htmlFor="statement" className="form-label">
            Statement
          </label>
          <input
            type="text"
            className="form-control"
            id="statement"
            name="statement"
            placeholder="IS"
          />
        </div>

        <div className="col-md-5">
          <label htmlFor="comment" className="form-label">
            Comment
          </label>
          <input
            type="text"
            className="form-control"
            id="comment"
            name="comment"
            placeholder="Comment"
          />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Submit Request
          </button>
        </div>
      </form>
      <Modal show={requestSent || !!errorMessage} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {requestSent ? "Changes Saved" : "Changes Not Saved"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {requestSent
            ? "Edit changes have been saved."
            : errorMessage}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div style={{ height: "200px" }}></div>
    </div>
  );
};

export default EditUser;
