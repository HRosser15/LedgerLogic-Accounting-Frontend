import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { registerUser } from "../../services/AuthService";
import DatePicker from "react-datepicker";
import "./DatePickerStyles.css";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./CreateNewUser.module.css";

const CreateNewUser = () => {
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
        console.log("Registration successful");
        setRequestSent(true);
      } else {
        console.error("Registration failed");
        setErrorMessage(
          "Request failed. Please check that you don't already have an account and verify that your password meets the requirements"
        );
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(
        "Request failed. Please check that you don't already have an account and verify that your password meets the minimum requirements"
      );
    }
  };

  const handleClose = () => {
    setRequestSent(false);
    setErrorMessage("");
  };

  return (
    <div className={`container ${styles.formContainer}`}>
      <h2>Create an Account</h2>

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
            Password must be 8 or more characters and contain at least one of
            each: uppercase, number, special character{" "}
          </p>
        </div>

        <div className="col-md-3">
          <label htmlFor="role" className="form-label">
            Role
          </label>
          <select
            id="role"
            className="form-select"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="accountant">Accountant</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="col-md-3">
          <label htmlFor="birthDay" className={`${styles.datePickerContainer}`}>
            Birthday
          </label>
          <div>
            <DatePicker
              id="birthDay"
              className="form-control"
              selected={formData.birthDay}
              onChange={(date) =>
                handleChange({ target: { name: "birthDay", value: date } })
              }
              dateFormat="MM/dd/yyyy" // We can customize the date format as needed
              style={{
                border: "2px solid #cccccc",
                height: "50px",
              }}
            />
          </div>
        </div>

        <div className="col-md-6">
          <label htmlFor="streetAddress" className="form-label">
            Street Address
          </label>
          <input
            type="text"
            className="form-control"
            id="streetAddress"
            name="streetAddress"
            value={formData.streetAddress}
            onChange={handleChange}
            placeholder="1234 Main Street"
          />
        </div>

        <div className="col-md-4">
          <label htmlFor="city" className="form-label">
            City
          </label>
          <input
            type="text"
            className="form-control"
            id="city"
            name="city"
            placeholder="Atlanta"
          />
        </div>

        <div className="col-md-4">
          <label htmlFor="state" className="form-label">
            State
          </label>
          <select id="state" className="form-select" name="state">
            <option value="" disabled>
              Choose...
            </option>
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
          </select>
        </div>

        <div className="col">
          <label htmlFor="zipCode" className="form-label">
            ZIP Code
          </label>
          <input
            type="text"
            className="form-control"
            id="zipCode"
            name="zipCode"
          />
        </div>

        {formData.passwordSecurityQuestions.map((question, index) => (
          <div className="mb-3" key={index}>
            <p>{`Question ${index + 1}:`}</p>
            <div className="d-flex">
              <select
                className="form-select me-3"
                id={`securityQuestion${index + 1}`}
                name={`securityQuestion${index + 1}`}
                value={question.selectedOption}
                onChange={(e) => handleChangeSecurityQuestion(e, index)}
              >
                <option value="">Select a question</option>
                {securityQuestionOptions[index].map((option, optionIndex) => (
                  <option key={optionIndex} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <input
                type="text"
                className="form-control"
                id={`securityAnswer${index + 1}`}
                name={`securityAnswer${index + 1}`}
                value={question.answer}
                onChange={(e) => handleChangeSecurityQuestion(e, index)}
              />
            </div>
          </div>
        ))}

        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Submit Request
          </button>
        </div>
      </form>
      <Modal show={requestSent || !!errorMessage} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {requestSent ? "Request Sent for Approval" : "Registration Failed"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {requestSent
            ? "Your registration request has been submitted and is pending approval."
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

export default CreateNewUser;
