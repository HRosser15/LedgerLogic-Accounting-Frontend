import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./AccountForm.module.css";

const EditAccountsForm = () => {
  const [formData, setFormData] = useState({});
  const [requestSent, setRequestSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);

  const handleClose = () => {
    setRequestSent(false);
    setErrorMessage("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "birthDay" ? new Date(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRequestSent(true);
    toggleModal();
  };

  return (
    <div className={`container ${styles.formContainer}`}>
      <h2>Edit Account</h2>

      <form onSubmit={handleSubmit} className="row g-3">
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
          <input
            id="subcategory"
            className="form-select"
            name="subcategory"
            value={formData.role} // not the right variable
            onChange={handleChange}
          ></input>
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
            value={formData.streetAddress} // not the right variable
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
            Apply Edits
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
          {requestSent ? "Edits have been saved." : errorMessage}
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

export default EditAccountsForm;
