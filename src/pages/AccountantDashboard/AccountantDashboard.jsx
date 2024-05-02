import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Modal,
  Button,
  Card,
} from "react-bootstrap";
import { emailUser } from "../../services/EmailService";
import { fetchAccounts } from "../../services/AccountService";
import axios from "axios";
import styles from "./AccountantDashboard.module.css";
import AppContext from "../../../context/AppContext";
import logo from "../../assets/logoNoWords.png";

const AccountantDashboard = ({ username }) => {
  const { state } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const subject = "Message from your Accountant";
  const fromEmail = state.email;
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [accounts, setAccounts] = useState([]);

  const handleButtonClick = () => {
    if (!email) {
      // Alert the user if the email field is empty
      alert("Please enter an email address");
      return;
    }

    // Assuming you have access to the email content from the textarea
    const emailContent = document.querySelector(
      'textarea[name="emailContent"]'
    ).value;

    // Call the emailUser function with the email and emailContent
    emailUser(email, fromEmail, subject, emailContent)
      .then((response) => {
        // Handle successful email sending
        setModalTitle("Email Sent");
        setModalMessage("Email sent successfully!");
        setShowModal(true); // Optionally, you can display a modal to inform the user
      })
      .catch((error) => {
        // Handle error if email sending fails
        console.error("Error sending email:", error);
        setModalTitle("Email Error");
        setModalMessage(
          "There was an error sending the email. Please try again later."
        );
        setShowModal(true); // Optionally, you can display a modal to inform the user
      });
  };

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  {
    /* =====================
      Fetching Account Data
      ===================== */
  }

  useEffect(() => {
    const fetchBalances = async () => {
      try {
        const response = await fetchAccounts();
        setAccounts(response.data);
        console.log("response data: ", response);
      } catch (error) {
        console.error("Error fetching account balances:", error);
      }
    };

    fetchBalances();
  }, []);

  {
    /* =====================
      Fetching Journal Data
      ===================== */
  }
  const [hasPendingJournals, setHasPendingJournals] = useState(false);

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/journal/getAll"
        );
        const journals = response.data;
        const pendingJournals = journals.filter(
          (journal) => journal.status === "PENDING"
        );
        setHasPendingJournals(pendingJournals.length > 0);
      } catch (error) {
        console.error("Error fetching journals:", error);
      }
    };

    fetchJournals();
  }, []);

  const filterAccountsBySubcategory = (subcategory) => {
    if (accounts.length === 0) {
      return [];
    }
    return accounts.filter((account) => account.subCategory === subcategory);
  };

  const calculateSubtotal = (accounts, isExpense = false) => {
    return accounts.reduce((total, account) => {
      const balance = parseFloat(account.balance);
      return isExpense ? total - balance : total + balance;
    }, 0);
  };

  // Data Necessary for Financial Ratios

  const currentAssets = filterAccountsBySubcategory("Current Assets");
  const totalCurrentAssets = calculateSubtotal(currentAssets);
  console.log("Total Current Assets: ", totalCurrentAssets);

  const nonCurrentAssets = filterAccountsBySubcategory(
    "Property Plant and Equipment"
  );
  const totalNonCurrentAssets = calculateSubtotal(nonCurrentAssets);
  console.log("Total Non-Current Assets: ", totalNonCurrentAssets);

  const totalAssets = totalCurrentAssets + totalNonCurrentAssets;

  const currentLiabilities = filterAccountsBySubcategory("Current Liabilities");
  const totalCurrentLiabilities = calculateSubtotal(currentLiabilities);
  console.log("Total Current Liabilities: ", totalCurrentLiabilities);

  const nonCurrentLiabilities = filterAccountsBySubcategory(
    "Long-Term Liabilities"
  );
  const totalNonCurrentLiabilities = calculateSubtotal(nonCurrentLiabilities);
  console.log("Total Non-Current Liabilities: ", totalNonCurrentLiabilities);

  const totalLiabilities = totalCurrentLiabilities + totalNonCurrentLiabilities;

  const revenue = filterAccountsBySubcategory("Service Revenue");
  const totalRevenue = calculateSubtotal(revenue);
  console.log("Total Revenue: ", totalRevenue);

  const expenses = filterAccountsBySubcategory("Operating Expenses");
  const otherExpenses = filterAccountsBySubcategory("Other Expenses");
  const COGS = filterAccountsBySubcategory("Cost of Goods Sold");
  const totalExpenses =
    calculateSubtotal(expenses, true) +
    calculateSubtotal(otherExpenses, true) +
    calculateSubtotal(COGS, true);
  console.log("Total Expenses: ", totalExpenses);

  const netIncome = totalRevenue + totalExpenses;
  console.log("Net Income: ", netIncome);

  const suppliesAccount = accounts.find(
    (account) => account.accountName === "Supplies"
  );
  const suppliesBalance = suppliesAccount ? suppliesAccount.balance : 0;
  console.log("Supplies Balance: ", suppliesBalance);

  const inventory = totalRevenue + totalExpenses + suppliesBalance;
  console.log("Inventory: ", inventory);

  const costOfGoodsSoldAccounts =
    filterAccountsBySubcategory("Cost of Goods Sold");
  const totalCOGS = calculateSubtotal(costOfGoodsSoldAccounts);
  const shareholdersEquity = filterAccountsBySubcategory("Owner's Equity");
  const totalshareholdersEquity = calculateSubtotal(shareholdersEquity);

  {
    /* ================
      Liquidity Ratios
      ================ */
  }

  // Current Ratios
  const calculateCurrentRatio = (currentAssets, currentLiabilities) => {
    if (currentLiabilities === 0) {
      return null;
    }
    return currentAssets / currentLiabilities;
  };

  const determineCurrentRatioHealth = (currentRatio) => {
    if (currentRatio >= 1.5 && currentRatio <= 2.0) {
      return "green"; // Healthy
    } else if (
      (currentRatio >= 1.0 && currentRatio < 1.5) ||
      (currentRatio > 2.0 && currentRatio <= 3.0)
    ) {
      return "yellow"; // Slightly outside of normal
    } else {
      return "red"; //Significantly outside of normal"
    }
  };

  // Quick Ratios
  const calculateQuickRatio = (
    currentAssets,
    inventory,
    currentLiabilities
  ) => {
    const quickAssets = currentAssets - suppliesBalance;
    if (currentLiabilities === 0) {
      return null;
    }
    return quickAssets / currentLiabilities;
  };

  const determineQuickRatioHealth = (quickRatio) => {
    if (quickRatio >= 1.0 && quickRatio <= 1.5) {
      return "green"; //Healthy
    } else if (
      (quickRatio >= 0.5 && quickRatio < 1.0) ||
      (quickRatio > 1.5 && quickRatio <= 2.0)
    ) {
      return "yellow"; // Slightly outside of normal
    } else {
      return "red"; //Significantly outside of normal
    }
  };

  {
    /* ====================
      Profitability Ratios
      ==================== */
  }

  // Gross Profit Margin
  const calculateGrossProfitMargin = (revenue, costOfGoodsSold) => {
    if (revenue === 0 || costOfGoodsSold == null || costOfGoodsSold == 0) {
      return null;
    }
    console.log("Revenue: ", revenue);
    console.log("COGS: ", costOfGoodsSold);
    console.log(
      "Gross Profit Margin: ",
      ((revenue - costOfGoodsSold) / revenue) * 100
    );
    return ((revenue - costOfGoodsSold) / revenue) * 100;
  };

  const determineGrossProfitMarginHealth = (grossProfitMargin) => {
    if (grossProfitMargin == null) {
      return "Not Available";
    }

    if (grossProfitMargin >= 35 && grossProfitMargin <= 50) {
      return "green"; //Healthy
    } else if (
      (grossProfitMargin >= 25 && grossProfitMargin < 35) ||
      (grossProfitMargin > 50 && grossProfitMargin <= 60)
    ) {
      return "yellow"; //Slightly outside of normal
    } else {
      return "red"; //Significantly outside of normal
    }
  };

  // Net Profit Margin
  const calculateNetProfitMargin = (netIncome, revenue) => {
    if (revenue === 0) {
      return null;
    }
    return (netIncome / revenue) * 100;
  };

  const determineNetProfitMarginHealth = (netProfitMargin) => {
    console.log("Net Profit Margin: ", netProfitMargin);
    if (netProfitMargin >= 8 && netProfitMargin <= 15) {
      return "green"; //Healthy
    } else if (
      (netProfitMargin >= 5 && netProfitMargin < 8) ||
      (netProfitMargin > 15 && netProfitMargin <= 20)
    ) {
      return "yellow"; //Slightly outside of normal
    } else {
      return "red"; //Significantly outside of normal
    }
  };

  // Return on Assets
  const calculateROA = (netIncome, totalAssets) => {
    console.log("Net Income: ", netIncome);
    console.log("Total Assets: ", totalAssets);
    console.log("ROA: ", (netIncome / totalAssets) * 100);
    if (totalAssets === 0) {
      return null;
    }
    return (netIncome / totalAssets) * 100;
  };

  const determineROAHealth = (ROA) => {
    if (ROA >= 10 && ROA <= 20) {
      return "green"; //Healthy
    } else if ((ROA >= 5 && ROA < 10) || (ROA > 20 && ROA <= 25)) {
      return "yellow"; //Slightly outside of normal
    } else {
      return "red"; //Significantly outside of normal
    }
  };

  // Return on Equity
  const calculateROE = (netIncome, shareholdersEquity) => {
    const totalShareholdersEquity = calculateSubtotal(shareholdersEquity);
    console.log("Total Shareholders Equity: ", totalShareholdersEquity);
    console.log("shareholdersEquity: ", shareholdersEquity);
    if (totalShareholdersEquity === 0) {
      return null;
    }
    console.log("Net Income: ", netIncome);
    console.log("ROE: ", (netIncome / totalShareholdersEquity) * 100);
    return (netIncome / totalShareholdersEquity) * 100;
  };

  const determineROEHealth = (ROE) => {
    if (ROE >= 15 && ROE <= 25) {
      return "green"; //Healthy
    } else if ((ROE >= 10 && ROE < 15) || (ROE > 25 && ROE <= 30)) {
      return "yellow"; //Slightly outside of normal
    } else {
      return "red"; //Significantly outside of normal
    }
  };

  {
    /* ==================
      Efficiency Ratios
      ================== */
  }

  //Inventory Turnover Ratio
  const calculateInventoryTurnover = (costOfGoodsSold, averageInventory) => {
    console.log("Cost of Goods Sold: ", costOfGoodsSold);
    console.log("Average Inventory: ", averageInventory);
    if (averageInventory === 0) {
      return null;
    }
    console.log(
      "Inventory Turnover Ratio: ",
      costOfGoodsSold / averageInventory
    );
    return costOfGoodsSold / averageInventory;
  };

  // Inventory Turnover Ratio
  const inventoryTurnoverRatio = calculateInventoryTurnover(
    totalCOGS,
    inventory
  );

  //Determining Health of Inventory Turnover Ratio
  const determineInventoryTurnoverHealth = (ratio) => {
    if (ratio >= 4 && ratio <= 6) {
      return "green"; // Healthy
    } else if ((ratio >= 2 && ratio < 4) || (ratio > 6 && ratio <= 8)) {
      return "yellow"; // Slightly outside of normal
    } else {
      return "red"; // Significantly outside of normal
    }
  };

  const inventoryTurnoverRatioHealth = determineInventoryTurnoverHealth(
    inventoryTurnoverRatio
  );

  //Accounts Receivable Turnover Ratio
  const calculateAccountsReceivableTurnover = (
    netCreditSales,
    averageReceivables
  ) => {
    if (averageReceivables === 0) {
      return null;
    }
    return netCreditSales / averageReceivables;
  };

  //Determining Health of Accounts Receivable Turnover Ratio
  const determineAccountsReceivableTurnoverHealth = (ratio) => {
    if (ratio >= 6 && ratio <= 10) {
      return "green"; // Healthy
    } else if ((ratio >= 4 && ratio < 6) || (ratio > 10 && ratio <= 12)) {
      return "yellow"; // Slightly outside of normal
    } else {
      return "red"; // Significantly outside of normal
    }
  };

  //Total Asset Turnover Ratio
  const calculateTotalAssetTurnover = (netSales, averageTotalAssets) => {
    if (averageTotalAssets === 0) {
      return null;
    }
    return netSales / averageTotalAssets;
  };

  //Determining Health of Total Asset Turnover Ratio
  const determineTotalAssetTurnoverHealth = (ratio) => {
    if (ratio >= 1.5 && ratio <= 2.5) {
      return "green"; // Healthy
    } else if ((ratio >= 1.0 && ratio < 1.5) || (ratio > 2.5 && ratio <= 3.0)) {
      return "yellow"; // Slightly outside of normal
    } else {
      return "red"; // Significantly outside of normal
    }
  };

  // Accounts Receivable Turnover Ratio
  const accountsReceivableTurnoverRatio = calculateAccountsReceivableTurnover(
    totalRevenue,
    totalCurrentAssets
  );
  const accountsReceivableTurnoverRatioHealth =
    determineAccountsReceivableTurnoverHealth(accountsReceivableTurnoverRatio);

  // Total Asset Turnover Ratio
  const totalAssetTurnoverRatio = calculateTotalAssetTurnover(
    totalRevenue,
    inventory
  );
  const totalAssetTurnoverRatioHealth = determineTotalAssetTurnoverHealth(
    totalAssetTurnoverRatio
  );

  {
    /* ================
      Leverage Ratios
      ================ */
  }

  //Debt to Equity Ratio
  const calculateDebtToEquity = (totalLiabilities, totalshareholdersEquity) => {
    console.log("Total Liabilities: ", totalLiabilities);
    console.log("Total Shareholders Equity: ", totalshareholdersEquity);
    if (totalshareholdersEquity === 0) {
      return null;
    }
    console.log(
      "Debt to Equity Ratio: ",
      totalLiabilities / totalshareholdersEquity
    );
    return totalLiabilities / totalshareholdersEquity;
  };

  //Determining Health of Debt to Equity Ratio
  const determineDebtToEquityHealth = (debtEquity) => {
    if (debtEquity >= 1 && debtEquity <= 1.5) {
      return "green"; // Healthy
    } else if (
      (debtEquity >= 0.5 && debtEquity < 1) ||
      (debtEquity > 1.5 && debtEquity <= 2.0)
    ) {
      return "yellow"; // Slightly outside of normal
    } else {
      return "red"; // Significantly outside of normal
    }
  };

  //Debt Ratio
  const calculateDebt = (totalLiabilities, totalCurrentAssets) => {
    if (totalCurrentAssets === 0) {
      return null;
    }
    console.log("Debt Ratio: ", totalLiabilities / totalCurrentAssets);
    return totalLiabilities / totalCurrentAssets;
  };

  //Determining Health of Debt Ratio
  const determineDebtHealth = (debt) => {
    if (debt >= 0.4 && debt <= 0.6) {
      return "green"; // Healthy
    } else if ((debt >= 0.3 && debt < 0.4) || (debt > 0.6 && debt <= 0.7)) {
      return "yellow"; // Slightly outside of normal
    } else {
      return "red"; // Significantly outside of normal
    }
  };

  // Current Ratios
  const currentRatio = calculateCurrentRatio(
    totalCurrentAssets,
    totalCurrentLiabilities
  );
  const currentRatioHealth = determineCurrentRatioHealth(currentRatio);

  // Quick Ratios
  const quickRatio = calculateQuickRatio(
    totalCurrentAssets,
    inventory,
    totalCurrentLiabilities
  );
  const quickRatioHealth = determineQuickRatioHealth(quickRatio);

  // Gross Profit Margin
  const grossProfitMargin = calculateGrossProfitMargin(totalRevenue, totalCOGS);
  const grossProfitMarginHeath =
    determineGrossProfitMarginHealth(grossProfitMargin);

  // Net Profit Margin
  const netProfitMargin = calculateNetProfitMargin(netIncome, totalRevenue);
  const netProfitMarginHealth = determineNetProfitMarginHealth(netProfitMargin);

  // Return on Assets
  const ROA = calculateROA(netIncome, totalAssets);
  const ROAHealth = determineROAHealth(ROA);

  // Return on Equity
  const ROE = calculateROE(netIncome, shareholdersEquity);
  const ROEHealth = determineROEHealth(ROE);

  // Inventory Turnover Ratio
  const ITR = calculateInventoryTurnover(netIncome, shareholdersEquity);
  const ITRHealth = determineInventoryTurnoverHealth(ITR);

  // Accounts Receiveable Turnover Ratio
  const ART = calculateAccountsReceivableTurnover(
    netIncome,
    shareholdersEquity
  );
  const ARTHealth = determineAccountsReceivableTurnoverHealth(ART);

  // Total Asset Turnover Ratio
  const TAT = calculateTotalAssetTurnover(netIncome, shareholdersEquity);
  const TATHealth = determineTotalAssetTurnoverHealth(TAT);

  // Debt to Equity Ratio
  const debtEquity = calculateDebtToEquity(
    totalLiabilities,
    totalshareholdersEquity
  );
  const debtEquityHealth = determineDebtToEquityHealth(debtEquity);

  // Debt Ratio
  const debt = calculateDebt(totalLiabilities, totalAssets);
  const debtHealth = determineDebtHealth(debt);

  console.log("debt: ", debt);

  const CircleDisplay = ({ health, ratio }) => {
    const circleStyle = {
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: "bold",
      margin: "10px",
      backgroundColor:
        health === "green"
          ? "#336b45"
          : health === "yellow"
          ? "yellow"
          : "#ee2424",
      color:
        health === "green" ? "white" : health === "yellow" ? "black" : "white",
      fontSize: ".75em",
    };

    const formattedRatio = ratio !== null ? ratio.toFixed(2) : "N/A";

    return <div style={circleStyle}>{formattedRatio}</div>;
  };

  return (
    <Container className={styles.dashboardContainer}>
      <div style={{ height: "30px" }}></div>
      <h1>Accountant Dashboard</h1>
      <div style={{ height: "30px" }}></div>
      <img className={styles.image} src={logo} alt="Logo"></img>
      <h2 className={styles.welcomeMessage}> Welcome {state.username}!</h2>
      <div style={{ height: "30px" }}></div>

      {hasPendingJournals && (
        <div className={styles.pendingJournalsMessage}>
          <p>There are pending journals awaiting a manager's approval.</p>
        </div>
      )}

      <form className={styles.forms}>
        <Row>
          <h1>Financial Ratios</h1>
          <div style={{ height: "30px" }}></div>
        </Row>

        <Row>
          {/* =========
            Liquidity
            ========= */}
          <Col md={3}>
            <Card>
              <Card.Body>
                <Card.Title style={{ fontWeight: "bold" }}>
                  Liquidity
                </Card.Title>
                <Card.Text style={{ marginTop: "30px" }}>
                  <Row>
                    <Col xs={6}>
                      <span>Current Ratio</span>
                    </Col>
                    <Col xs={6}>
                      <CircleDisplay
                        health={currentRatioHealth}
                        ratio={currentRatio}
                      />
                    </Col>
                  </Row>
                  <hr class="rounded"></hr>
                  <Row>
                    <Col xs={6}>
                      <span>Quick Ratio</span>
                    </Col>
                    <Col xs={6}>
                      <CircleDisplay
                        health={quickRatioHealth}
                        ratio={quickRatio}
                      />
                    </Col>
                  </Row>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* =============
            Profitability
            ============= */}
          <Col md={3}>
            <Card>
              <Card.Body>
                <Card.Title style={{ fontWeight: "bold" }}>
                  Profitability
                </Card.Title>
                <Card.Text style={{ marginTop: "30px" }}>
                  <Row>
                    <Col xs={6}>
                      <span>Gross Profit Margin</span>
                    </Col>
                    <Col xs={6}>
                      <CircleDisplay
                        health={grossProfitMarginHeath}
                        ratio={grossProfitMargin}
                      />
                    </Col>
                  </Row>
                  <hr class="rounded"></hr>
                  <Row>
                    <Col xs={6}>
                      <span>Net Profit Margin</span>
                    </Col>
                    <Col xs={6}>
                      <CircleDisplay
                        health={netProfitMarginHealth}
                        ratio={netProfitMargin}
                      />
                    </Col>
                  </Row>
                  <hr class="rounded"></hr>
                  <Row>
                    <Col xs={6}>
                      <span>Return on Assets</span>
                    </Col>
                    <Col xs={6}>
                      <CircleDisplay health={ROAHealth} ratio={ROA} />
                    </Col>
                  </Row>
                  <hr class="rounded"></hr>
                  <Row>
                    <Col xs={6}>
                      <span>Return on Equity</span>
                    </Col>
                    <Col xs={6}>
                      <CircleDisplay health={ROEHealth} ratio={ROE} />
                    </Col>
                  </Row>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* ==========
            Efficiency
            ========== */}

          <Col md={3}>
            <Card>
              <Card.Body>
                <Card.Title style={{ fontWeight: "bold" }}>
                  Efficiency
                </Card.Title>
                <Card.Text style={{ marginTop: "30px" }}>
                  <Row>
                    <Col xs={6}>
                      <span>Inventory Turnover Ratio</span>
                    </Col>
                    <Col xs={6}>
                      <CircleDisplay
                        health={inventoryTurnoverRatioHealth}
                        ratio={inventoryTurnoverRatio}
                      />
                    </Col>
                  </Row>
                  <hr class="rounded"></hr>
                  <Row>
                    <Col xs={6}>
                      <span>Accounts Receivable Turnover Ratio</span>
                    </Col>
                    <Col xs={6}>
                      <CircleDisplay
                        health={accountsReceivableTurnoverRatioHealth}
                        ratio={accountsReceivableTurnoverRatio}
                      />
                    </Col>
                  </Row>
                  <hr class="rounded"></hr>
                  <Row>
                    <Col xs={6}>
                      <span>Total Asset Turnover Ratio</span>
                    </Col>
                    <Col xs={6}>
                      <CircleDisplay
                        health={totalAssetTurnoverRatioHealth}
                        ratio={totalAssetTurnoverRatio}
                      />
                    </Col>
                  </Row>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          {/* ========
            Leverage
            ======== */}

          <Col md={3}>
            <Card>
              <Card.Body>
                <Card.Title style={{ fontWeight: "bold" }}>Leverage</Card.Title>
                <Card.Text style={{ marginTop: "30px" }}>
                  <Row>
                    <Col xs={6}>
                      <span>Debt-to-Equity Ratio</span>
                    </Col>
                    <Col xs={6}>
                      <CircleDisplay
                        health={debtEquityHealth}
                        ratio={debtEquity}
                      />
                    </Col>
                  </Row>
                  <hr class="rounded"></hr>
                  <Row>
                    <Col xs={6}>
                      <span>Debt Ratio</span>
                    </Col>
                    <Col xs={6}>
                      <CircleDisplay health={debtHealth} ratio={debt} />
                    </Col>
                  </Row>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </form>

      <div style={{ height: "50px" }}></div>

      {/* ============
                CONTACT USER
                ============ */}
      <form className={styles.forms}>
        <h4>Contact Manager</h4>

        <Row>
          <Col className="col-md-2">
            <Form.Group controlId="email">
              <Form.Label>User Email Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="JohnSmith@email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="custom-textbox"
                style={{
                  marginLeft: "20px",
                }}
              />
            </Form.Group>
          </Col>
          <Col className="col-md-8">
            <span>Enter your message below:</span>
            <label>
              <textarea
                name="emailContent"
                defaultValue=""
                rows={4}
                cols={80}
                align="left"
                style={{
                  backgroundColor: "#ffffff",
                  color: "black",
                  borderRadius: "5px",
                }}
              />
            </label>
          </Col>
        </Row>

        <Row></Row>
        <Row>
          <Col>
            <Button variant="primary" onClick={handleButtonClick}>
              Send Email to User
            </Button>
          </Col>
        </Row>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{modalTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{modalMessage}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </form>
      <div style={{ height: "200px" }}></div>
    </Container>
  );
};

export default AccountantDashboard;
