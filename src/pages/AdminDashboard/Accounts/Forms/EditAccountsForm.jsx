import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./AccountForm.module.css";
import {
  fetchAccounts,
  updateAccount,
} from "../../../../services/AccountService";

const EditAccountsForm = () => {
  const [formData, setFormData] = useState({});
  const [accounts, setAccounts] = useState([]);
  const [requestSent, setRequestSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);

  useEffect(() => {
    fetchAccounts()
      .then((response) => {
        setAccounts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching accounts:", error);
      });
  }, []);

  const handleClose = () => {
    setRequestSent(false);
    setErrorMessage("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { accountName, accountNumber } = formData;

    const matchedAccount = accounts.find(
      (account) =>
        account.accountName === accountName ||
        account.accountNumber === accountNumber
    );

    console.log("formData:", formData);

    // Helper function to determine the normalSide based on the category
    const getNormalSide = (category) => {
      const debitCategories = ["asset", "expenses"];
      const creditCategories = ["liabilities", "revenue", "equity"];

      if (category && debitCategories.includes(category.toLowerCase())) {
        return "Debit";
      } else if (
        category &&
        creditCategories.includes(category.toLowerCase())
      ) {
        return "Credit";
      }
      return "";
    };

    if (matchedAccount) {
      try {
        const updatedData = {
          accountNumber: formData.accountNumber || matchedAccount.accountNumber,
          accountName: formData.accountName || matchedAccount.accountName,
          description: formData.accountDesc,
          normalSide: getNormalSide(formData.category) || "",
          category: formData.category,
          subCategory: formData.subcategory,
          initialBalance: parseFloat(formData.initialBalance) || 0,
          debit: parseFloat(formData.debit) || 0,
          credit: parseFloat(formData.credit) || 0,
          balance: parseFloat(formData.balance) || 0,
          orderNumber: parseInt(formData.order) || 0,
          statement: formData.statement || "IS", // Default to 'IS' if not provided
          comment: formData.comment,
        };

        console.log("updatedData:", updatedData);

        await updateAccount(matchedAccount.accountId, updatedData);
        setRequestSent(true);
        toggleModal();
      } catch (error) {
        console.error("Error updating account:", error);
        setErrorMessage("Failed to update account. Please try again.");
        toggleModal();
      }
    } else {
      setErrorMessage(
        "Account not found. Please check the account name or number."
      );
      toggleModal();
    }
  };

  return (
    <div className={`container ${styles.formContainer}`}>
      <h2>Edit Account</h2>
      <div className={styles.forms}>
        <div className={styles.formMargin}>
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-3">
              <label htmlFor="accountNumber" className="form-label">
                Account Name or Number
              </label>
              <input
                type="text"
                className="form-control"
                id="accountName"
                name="accountName"
                value={formData.streetAddress} // not the right variable
                onChange={handleChange}
                placeholder="Account Name or No."
              />
              <p className={styles.textboxInfo}>
                This must match the existing account you want to update
              </p>
            </div>

            <div className="col-md-9"></div>

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
        </div>
      </div>
      <Modal show={requestSent || !!errorMessage} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {requestSent ? "Changes Saved" : "Changes Not Saved"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {requestSent
            ? "Edits have been saved."
            : errorMessage || "Please check the account name or number."}
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
