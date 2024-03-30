import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { registerUser } from "../../../services/AuthService";
import DatePicker from "react-datepicker";
import "./DatePickerStyles.css";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./AddNewUser.module.css";
import { updateUserInfo } from "../../../services/UserService";

const UpdateUser = () => {
  const [formData, setFormData] = useState({
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    birthDay: null,
    streetAddress: "",
    status: "false",
  });

  const [requestSent, setRequestSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "birthDay" ? new Date(value) : value,
    }));
  };

  const updateUserHandler = async () => {
    try {
      const response = await updateUserInfo(formData);

      if (response.status === 200) {
        console.log("User updated successfully");
        setRequestSent(true);
      } else {
        console.error("User update failed");
        setErrorMessage("Failed to update user. Please try again later.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Failed to update user. Please try again later.");
    }
  };

  const handleClose = () => {
    setRequestSent(false);
    setErrorMessage("");
  };

  return (
    <div className={`container ${styles.formContainer}`}>
      <h2>Update a User</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateUserHandler();
        }}
        className="row g-3"
      >
        <div className="col-md-2">
          <label htmlFor="userId" className="form-label">
            User ID
          </label>
          <input
            type="text"
            className="form-control"
            id="userId"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            placeholder="User ID"
            autoComplete="off"
          />
        </div>
        <div className="col-md-10"></div>
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
            autoComplete="off"
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
            autoComplete="off"
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
            autoComplete="off"
          />
        </div>

        {/* <div className="col-md-6">
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
            autoComplete="off"
          />
          <p className="password-requirements">
            Password must be 8 or more characters and contain at least one of
            each: uppercase, number, special character{" "}
          </p>
        </div> */}

        {/* <div className="col-md-3">
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
        </div> */}

        <div className="col-md-3">
          <label htmlFor="birthDay" className={`${styles.datePickerContainer}`}>
            Birthday
          </label>
          <div>
            <DatePicker
              id="birthDay"
              name="birthDay"
              className="form-control"
              selected={formData.birthDay}
              onChange={(date) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  birthDay: date,
                }))
              }
              dateFormat="MM/dd/yyyy" // We can customize the date format as needed
              isClearable
              showPopperArrow
              autoComplete="off"
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
            autoComplete="off"
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
            autoComplete="off"
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
            autoComplete="off"
          />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Update User
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

export default UpdateUser;
