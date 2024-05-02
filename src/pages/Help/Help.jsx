import React, { useContext, useState } from "react";
import { emailUser } from "../../services/EmailService";
import AppContext from "../../../context/AppContext";

const HelpPage = () => {
  const { state } = useContext(AppContext);
  const [feedbackSubject, setFeedbackSubject] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleFeedbackSubmit = () => {
    const email = "hrosser15@gmail.com";
    const fromEmail = state.email ? state.email : "feedback@ledgerlogic.com";
    const subject = `Feedback - ${feedbackSubject}`;
    const emailContent = feedbackMessage;

    emailUser(email, fromEmail, subject, emailContent)
      .then((response) => {
        // Handle successful email sending
        alert("Feedback submitted successfully!");
        setFeedbackSubject("");
        setFeedbackMessage("");
      })
      .catch((error) => {
        // Handle error if email sending fails
        console.error("Error submitting feedback:", error);
        alert(
          "There was an error submitting your feedback. Please try again later."
        );
      });
  };

  return (
    <div className="container">
      <h1 className="my-4">Help Page</h1>

      {/* ===============
            Getting Started
            =============== */}
      <div className="accordion" id="accordionHelp1">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="false"
              aria-controls="collapseOne"
            >
              Getting Started
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
            style={{ textAlign: "left" }}
          >
            <div className="accordion-body">
              <h5>Overview</h5>
              <p>
                This platform is designed to provide comprehensive accounting
                and financial management solutions. Our main features include:
              </p>
              <ul>
                <li>Chart of accounts management</li>
                <li>Transaction recording and journalizing</li>
                <li>Financial reporting and analysis</li>
              </ul>

              <h5>Registration</h5>
              <p>
                To get started, follow these steps to register for an account:
              </p>
              <ol>
                <li>Visit the homepage and click on the "Log In" button.</li>
                <li>Click on the "Register Now" button.</li>
                <li>Fill out the registration form with your details</li>
                <li>
                  Click "Submit Request" to complete the registration process
                  and an adminisgrator will review your request within 2
                  business days.
                </li>
                <li>
                  Upon approval of your registration request, you will be able
                  to log in using your password and assigned username. Your
                  username will be your first initial + your last name + the
                  month and year you signed up. For example, if John Smith
                  signed up on March 2023, his username would be jsmith0324.
                </li>
              </ol>

              <h5>Navigation</h5>
              <p>
                Once you've registered and logged in, you'll be able to access
                different sections of the platform using the navigation menu.
                The main sections include:
              </p>
              <ul>
                <li>Dashboard</li>
                <li>Chart of Accounts</li>
                <li>Transactions</li>
                <li>Event Logs</li>
              </ul>
            </div>
          </div>
        </div>

        {/* ==================
            User Management
            ================== */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              User Management
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
            style={{ textAlign: "left" }}
          >
            <div className="accordion-body">
              <h5>Creating and Editing Accounts</h5>
              <p>To create a new user account, follow these steps:</p>
              <ol>
                <li>Navigate to the "User Management" section.</li>
                <li>Click on the "Add User" button.</li>
                <li>
                  Fill out the user registration form with the required details.
                </li>
                <li>
                  Assign the appropriate user role (e.g., administrator,
                  manager, accountant).
                </li>
                <li>Click "Add Account" to create the new user account.</li>
              </ol>

              <p>
                To activate/deactivate an existing user account, follow these
                steps:
              </p>
              <ol>
                <li>Navigate to the "User List" section.</li>
                <li>
                  Locate the user account you want to edit and note their User
                  ID.
                </li>
                <li>
                  Enter the user ID in the text field under "Activate /
                  Deactivate" and click the appropriate "Activate" or
                  "Deactivate" button.
                </li>
              </ol>

              <p>To suspend an existing user account, follow these steps:</p>
              <ol>
                <li>Navigate to the "User List" section.</li>
                <li>
                  Locate the user account you want to edit and note their User
                  ID.
                </li>
                <li>
                  Enter the user ID in the text field under "Suspend User" and
                  choose the date the suspension will start and the date the
                  suspension will end.
                </li>
                <li>Click the "Suspend" button.</li>
              </ol>

              <p>To email an existing user, follow these steps:</p>
              <ol>
                <li>Navigate to the "User List" section.</li>
                <li>
                  Locate the user account you want to edit and note their email.
                </li>
                <li>
                  Enter the user email in the text field under "Contact User"
                  and enter the message you'd like to send them.
                </li>
                <li>Click the "Send" button.</li>
              </ol>

              <h5>Password Management</h5>
              <p>To reset your password, follow these steps:</p>
              <ol>
                <li>Click on the "Forgot Password" link on the login page.</li>
                <li>
                  Enter your email address or username associated with your
                  account.
                </li>
                <li>
                  Follow the instructions provided to reset your password
                  securely.
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* ==================
            Chart of Accounts
            ================== */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              Chart of Accounts
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
            style={{ textAlign: "left" }}
          >
            <div className="accordion-body">
              <h5>What is a Chart of Accounts?</h5>
              <p>
                The chart of accounts is a comprehensive list of all the
                accounts used by an organization to record financial
                transactions. It serves as the foundation for the organization's
                accounting system and is essential for maintaining accurate
                financial records.
              </p>

              <h5>Managing Accounts</h5>
              <p>
                To add a new account to the chart of accounts, follow these
                steps:
              </p>
              <ol>
                <li>Navigate to the "Chart of Accounts" section.</li>
                <li>Click on the "Add Account" button.</li>
                <li>
                  Fill out the account details, such as account name, number,
                  category, and description.
                </li>
                <li>Click "Add Account" to add the new account.</li>
              </ol>

              <p>To edit existing accounts, follow these steps:</p>
              <ol>
                <li>Navigate to the "Chart of Accounts" section.</li>
                <li>Locate the "Edit" tab.</li>
                <li>
                  Enter in the account number of the account you'd like to edit,
                  make the necessary changes, and click "Submit".
                </li>
                <li>Make the necessary changes or confirm the action.</li>
                <li>
                  Click "Save" or "Confirm" to apply the changes or deactivate
                  the account.
                </li>
              </ol>

              <p>To deactivate existing accounts, follow these steps:</p>
              <ol>
                <li>Navigate to the "Chart of Accounts" section.</li>
                <li>Locate the "Deactivate" tab.</li>
                <li>
                  Find the account you'd like to deactivate, and click the
                  deactivate button to the right of it.
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* ===========================
            Data Entry and Transactions
            =========================== */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFour"
              aria-expanded="false"
              aria-controls="collapseFour"
            >
              Data Entry and Transactions
            </button>
          </h2>
          <div
            id="collapseFour"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
            style={{ textAlign: "left" }}
          >
            <div className="accordion-body">
              <h5>Recording Transactions</h5>
              <p>To record a financial transaction, follow these steps:</p>
              <ol>
                <li>
                  Navigate to the "Accounts" section in the navigation bar, then
                  select the "Journal" tab.
                </li>
                <li>
                  Enter the appropriate info for your transaction. Once
                  submitted, a manager will review it for approval. Until then
                  it will appear in the ledger as 'PENDING'
                </li>
              </ol>
              <p>
                Alternatively, you can record a financial transaction from the
                Chart of Accounts or General Ledger by:
              </p>
              <ol>
                <li>
                  Click on the account name or account number for the account
                  you'd like to enter a transaction for.
                </li>
                <li>
                  From the ledger page, you can click "Add Journal Entry" to
                  record a new transaction.
                </li>
                <li>
                  Enter the appropriate info for your transaction. Once
                  submitted, a manager will review it for approval. Until then
                  it will appear in the ledger as 'PENDING'
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* =====================
            Reporting and Analysis
            ====================== */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFive"
              aria-expanded="false"
              aria-controls="collapseFive"
            >
              Reporting and Analysis
            </button>
          </h2>
          <div
            id="collapseFive"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
            style={{ textAlign: "left" }}
          >
            <div className="accordion-body">
              <h5>Financial Reports</h5>
              <p>
                Our platform offers a range of financial reports to help you
                analyze your organization's financial performance. These reports
                include:
              </p>
              <ul>
                <li>Balance Sheet</li>
                <li>Income Statement</li>
                <li>Cash Flow Statement</li>
                <li>Trial Balance</li>
              </ul>

              <h5>Generating Reports</h5>
              <p>To generate a financial report, follow these steps:</p>
              <ol>
                <li>Navigate to the "Reports" section.</li>
                <li>Select the desired report type.</li>
                <li>
                  Choose the reporting period or date range for the report.
                </li>
                <li>Click "Save" or "Print" to save or print the report.</li>
                <li>
                  Enter an email address and email body message, then click
                  "Send Email" to email the report to an email address
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* ========================
            Financial Ratios
            ======================== */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseRatios"
              aria-expanded="false"
              aria-controls="collapseRatios"
            >
              Financial Ratios
            </button>
          </h2>
          <div
            id="collapseRatios"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionHelp1"
            style={{ textAlign: "left" }}
          >
            <div className="accordion-body">
              <h5>Overview</h5>
              <p>
                The main dashboard of our application displays these financial
                ratios for the accounts using three color codes:
              </p>
              <ul>
                <li>
                  <strong>Green (Normal):</strong>
                  <ul>
                    <li>Ratios within healthy ranges.</li>
                  </ul>
                </li>
                <li>
                  <strong>Yellow (Warning):</strong>
                  <ul>
                    <li>Ratios slightly outside of normal ranges.</li>
                  </ul>
                </li>
                <li>
                  <strong>Red (Needs Closer Look):</strong>
                  <ul>
                    <li>Ratios significantly outside of normal ranges.</li>
                  </ul>
                </li>
              </ul>

              {/* Liquidity Ratios */}
              <h5>Liquidity Ratios</h5>
              <p>
                Liquidity ratios measure a company's ability to meet short-term
                obligations with its short-term assets.
              </p>
              <ul>
                <li>
                  <strong>Current Ratio:</strong> Current Assets / Current
                  Liabilities
                  <ul>
                    <li>Healthy: 1.5 to 2.0</li>
                    <li>
                      Slightly outside of normal: 1.0 to 1.5 or 2.0 to 3.0
                    </li>
                    <li>
                      Significantly outside of normal: Below 1.0 or above 3.0
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Quick Ratio (Acid-Test Ratio):</strong> (Current
                  Assets - Inventory) / Current Liabilities
                  <ul>
                    <li>Healthy: 1.0 to 1.5</li>
                    <li>
                      Slightly outside of normal: 0.5 to 1.0 or 1.5 to 2.0
                    </li>
                    <li>
                      Significantly outside of normal: Below 0.5 or above 2.0
                    </li>
                  </ul>
                </li>
              </ul>

              {/* Profitability Ratios */}
              <h5>Profitability Ratios</h5>
              <p>
                Profitability ratios measure the company's ability to generate
                profits from its operations.
              </p>
              <ul>
                <li>
                  <strong>Gross Profit Margin:</strong> (Revenue - Cost of Goods
                  Sold) / Revenue
                  <ul>
                    <li>Healthy: 35% to 50%</li>
                    <li>
                      Slightly outside of normal: 25% to 35% or 50% to 60%
                    </li>
                    <li>
                      Significantly outside of normal: Below 25% or above 60%
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Net Profit Margin:</strong> Net Income / Revenue
                  <ul>
                    <li>Healthy: 8% to 15%</li>
                    <li>Slightly outside of normal: 5% to 8% or 15% to 20%</li>
                    <li>
                      Significantly outside of normal: Below 5% or above 20%
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Return on Assets (ROA):</strong> Net Income / Total
                  Assets
                  <ul>
                    <li>Healthy: 10% to 20%</li>
                    <li>Slightly outside of normal: 5% to 10% or 20% to 25%</li>
                    <li>
                      Significantly outside of normal: Below 5% or above 25%
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Return on Equity (ROE):</strong> Net Income /
                  Shareholders' Equity
                  <ul>
                    <li>Healthy: 15% to 25%</li>
                    <li>
                      Slightly outside of normal: 10% to 15% or 25% to 30%
                    </li>
                    <li>
                      Significantly outside of normal: Below 10% or above 30%
                    </li>
                  </ul>
                </li>
              </ul>

              {/* Efficiency Ratios */}
              <h5>Efficiency Ratios</h5>
              <p>
                Efficiency ratios measure how effectively a company utilizes its
                assets and liabilities.
              </p>
              <ul>
                <li>
                  <strong>Inventory Turnover Ratio:</strong> Cost of Goods Sold
                  / Average Inventory
                  <ul>
                    <li>Healthy: 4 to 6 times per year</li>
                    <li>
                      Slightly outside of normal: 2 to 4 or 6 to 8 times per
                      year
                    </li>
                    <li>
                      Significantly outside of normal: Below 2 or above 8 times
                      per year
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Accounts Receivable Turnover Ratio:</strong> Net
                  Credit Sales / Average Accounts Receivable
                  <ul>
                    <li>Healthy: 6 to 10 times per year</li>
                    <li>
                      Slightly outside of normal: 4 to 6 or 10 to 12 times per
                      year
                    </li>
                    <li>
                      Significantly outside of normal: Below 4 or above 12 times
                      per year
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Total Asset Turnover Ratio:</strong> Net Sales /
                  Average Total Assets
                  <ul>
                    <li>Healthy: 1.5 to 2.5 times per year</li>
                    <li>
                      Slightly outside of normal: 1.0 to 1.5 or 2.5 to 3.0 times
                      per year
                    </li>
                    <li>
                      Significantly outside of normal: Below 1.0 or above 3.0
                      times per year
                    </li>
                  </ul>
                </li>
              </ul>

              {/* Leverage Ratios */}
              <h5>Leverage Ratios</h5>
              <p>
                Leverage ratios measure the proportion of debt in a company's
                capital structure and its ability to meet financial obligations.
              </p>
              <ul>
                <li>
                  <strong>Debt-to-Equity Ratio:</strong> Total Liabilities /
                  Total Shareholders' Equity
                  <ul>
                    <li>Healthy: 0.5 to 1.5</li>
                    <li>
                      Slightly outside of normal: 1.5 to 2.0 or 0.2 to 0.5
                    </li>
                    <li>
                      Significantly outside of normal: Above 2.0 or below 0.2
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Debt Ratio:</strong> Total Liabilities / Total Assets
                  <ul>
                    <li>Healthy: 0.4 to 0.6</li>
                    <li>
                      Slightly outside of normal: 0.6 to 0.7 or 0.3 to 0.4
                    </li>
                    <li>
                      Significantly outside of normal: Above 0.7 or below 0.3
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ========================
            Troubleshooting and FAQs
            ========================= */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseSix"
              aria-expanded="false"
              aria-controls="collapseSix"
            >
              Troubleshooting and FAQs
            </button>
          </h2>
          <div
            id="collapseSix"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
            style={{ textAlign: "left" }}
          >
            <div className="accordion-body">
              <h5>Common Issues</h5>
              <p>
                Here are some common issues users may encounter and their
                resolutions:
              </p>
              <ul>
                <li>
                  <strong>Unable to log in:</strong> Ensure that you are
                  entering the correct username and password. If you've
                  forgotten your password, use the "Forgot Password" feature to
                  reset it.
                </li>
                <li>
                  <strong>Error recording a transaction:</strong> Double-check
                  that you have entered all the required fields correctly and
                  that the debits and credits are balanced.
                </li>
                <li>
                  <strong>Report not generating:</strong> Verify that you have
                  selected the correct reporting period and that there is data
                  available for that period.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ===============================
            Contact Information and Support
            =============================== */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseSeven"
              aria-expanded="false"
              aria-controls="collapseSeven"
            >
              Contact Information and Support
            </button>
          </h2>
          <div
            id="collapseSeven"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
            style={{ textAlign: "left" }}
          >
            <div className="accordion-body">
              <h5>Customer Support</h5>
              <p>
                If you need further assistance or have any questions, our
                customer support team is here to help. You can reach us through
                the following channels:
              </p>
              <ul>
                <li>
                  <strong>Email:</strong> grosser1@students.kennesaw.edu
                </li>
                <li>
                  <strong>Phone:</strong> +1 (555) 123-4567
                </li>
              </ul>

              <p>
                Our support team is available Monday through Friday, from 9 AM
                to 6 PM (EST). We strive to respond to all inquiries within 24
                hours.
              </p>
            </div>
          </div>
        </div>

        {/* ===================
            Share Your Thoughts
            =================== */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseEight"
              aria-expanded="false"
              aria-controls="collapseEight"
            >
              Share Your Thoughts
            </button>
          </h2>
          <div
            id="collapseEight"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
            style={{ textAlign: "left" }}
          >
            <div className="accordion-body">
              <h5>Share Your Thoughts</h5>
              <p>
                We value your feedback and suggestions as they help us improve
                our platform and provide better services to our users. If you
                have any comments, ideas, or issues to report, please use the
                feedback form below:
              </p>
              <form>
                <div className="form-group">
                  <label htmlFor="feedbackSubject">Subject</label>
                  <input
                    type="text"
                    className="form-control"
                    id="feedbackSubject"
                    placeholder="Enter a subject"
                    value={feedbackSubject}
                    onChange={(e) => setFeedbackSubject(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="feedbackMessage">Message</label>
                  <textarea
                    className="form-control"
                    id="feedbackMessage"
                    rows="3"
                    placeholder="Enter your feedback or suggestions"
                    value={feedbackMessage}
                    onChange={(e) => setFeedbackMessage(e.target.value)}
                  ></textarea>
                </div>
                <button
                  onClick={handleFeedbackSubmit}
                  type="button"
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: "200px" }}></div>
    </div>
  );
};

export default HelpPage;
