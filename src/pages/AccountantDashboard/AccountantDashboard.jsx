import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Form, Modal, Button, Card } from "react-bootstrap";
import { emailUser } from "../../services/EmailService";
import { fetchAccounts } from "../../services/AccountService";
import styles from "./Accounts/Forms/AccountForm.module.css";
import AppContext from "../../../context/AppContext";
import logo from "../../assets/logoNoWords.png";

const AccountantDashboard = ({ username }) => {
  const { state } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const subject = "Message from your Accountant";
  const fromEmail = "ksmith@gmail.com";
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

  {/* =====================
      Fetching Account Data
      ===================== */}


  useEffect = () => {
    const fetchBalances = async () => {
      try {
        const response = await fetchAccounts();
        setAccounts(response);
        console.log("response data: ", response);
      }
      catch (error) {
        console.error("Error fetching account balances:", error);
      }
    };
  };

  const filterAccountsBySubcategory = (subcategory) => {
    return (
      accounts?.filter((account) => account.subCategory === subcategory) || []
    );
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
  
  const nonCurrentAssets = filterAccountsBySubcategory("Property Plant and Equipment");
  const totalNonCurrentAssets = calculateSubtotal(nonCurrentAssets);

  const inventory = totalCurrentAssets + totalNonCurrentAssets;

  const currentLiabilities = filterAccountsBySubcategory("Current Liabilities");
  const totalCurrentLiabilities = calculateSubtotal(currentLiabilities);

  const revenue = filterAccountsBySubcategory("Service Revenue");
  const totalRevenue = calculateSubtotal(revenue);

  const expenses = filterAccountsBySubcategory("Operating Expenses");
  const otherExpenses = filterAccountsBySubcategory("Other Expenses");
  const totalExpenses = calculateSubtotal(expenses, true) + calculateSubtotal(otherExpenses, true);

  const netIncome = totalRevenue - totalExpenses;

  const costOfGoodsSoldAccounts = filterAccountsBySubcategory("Cost of Goods Sold");
  const totalCOGS = calculateSubtotal(costOfGoodsSoldAccounts);
  const shareholdersEquity = filterAccountsBySubcategory("Owner's Equity");
  const totalshareholdersEquity = calculateSubtotal(shareholdersEquity);


  {/* ================
      Liquidity Ratios
      ================ */}
  
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
    } else if ((currentRatio >= 1.0 && currentRatio < 1.5) || (currentRatio > 2.0 && currentRatio <= 3.0)) {
      return "yellow"; // Slightly outside of normal
    } else {
      return "red";  //Significantly outside of normal"
    }
  };

  // Quick Ratios
  const calculateQuickRatio = (currentAssets, inventory, currentLiabilities) => {
    const quickAssets = currentAssets - inventory;
    if (currentLiabilities === 0) {
      return null; 
    }
    return quickAssets / currentLiabilities;
  };

  const determineQuickRatioHealth = (quickRatio) => {
    if (quickRatio >= 1.0 && quickRatio <= 1.5) {
      return "green"; //Healthy
    } else if ((quickRatio >= 0.5 && quickRatio < 1.0) || (quickRatio > 1.5 && quickRatio <= 2.0)) {
      return "yellow"; // Slightly outside of normal
    } else {
      return "red"; //Significantly outside of normal
    }
  };

  {/* ====================
      Profitability Ratios
      ==================== */}
  

  // Gross Profit Margin
  const calculateGrossProfitMargin = (revenue, costOfGoodsSold) => {
  if (revenue === 0 || costOfGoodsSold == null || costOfGoodsSold == 0) {
    return null; 
  }
  return ((revenue - costOfGoodsSold) / revenue) * 100; 
  };

  const determineGrossProfitMarginHealth = (grossProfitMargin) => {
    if (grossProfitMargin == null) {
      return ("Not Available");
    }
    
    if (grossProfitMargin >= 35 && grossProfitMargin <= 50) {
      return "green"; //Healthy
    } else if ((grossProfitMargin >= 25 && grossProfitMargin < 35) || (grossProfitMargin > 50 && grossProfitMargin <= 60)) {
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
    if (netProfitMargin >= 8 && netProfitMargin <= 15) {
      return "green"; //Healthy
    } else if ((netProfitMargin >= 5 && netProfitMargin < 8) || (netProfitMargin > 15 && netProfitMargin <= 20)) {
      return "yellow"; //Slightly outside of normal
    } else {
      return "red" //Significantly outside of normal
    }
  };


  // Return on Assets
  const calculateROA = (netIncome, totalAssets) => {
    if (totalAssets === 0) {
      return null; 
    }
    return (netIncome / totalAssets) * 100; 
  };

  const determineROAHealth = (ROA) => {
    if (ROA >= 10 && ROA <= 20) {
      return "green" //Healthy
    } else if ((ROA >= 5 && ROA < 10) || (ROA > 20 && ROA <= 25)) {
      return "yellow" //Slightly outside of normal
    } else {
      return "red" //Significantly outside of normal
    }
  };


  // Return on Equity
  const calculateROE = (netIncome, shareholdersEquity) => {
    if (shareholdersEquity === 0) {
      return null; 
    }
    return (netIncome / shareholdersEquity) * 100; 
  };

  const determineROEHealth = (ROE) => {
    if (ROE >= 15 && ROE <= 25) {
      return "green" //Healthy
    } else if ((ROE >= 10 && ROE < 15) || (ROE > 25 && ROE <= 30)) {
      return "yellow" //Slightly outside of normal
    } else {
      return "red" //Significantly outside of normal
    }
  };

  {/* ==================
      Efficiency Ratios
      ================== */}

  
  {/* ================
      Leverage Ratios
      ================ */}


 
  // Current Ratios
  const currentRatio = calculateCurrentRatio(totalCurrentAssets, totalCurrentLiabilities);
  const currentRatioHealth = determineCurrentRatioHealth(currentRatio) ;
  
  // Quick Ratios
  const quickRatio = calculateQuickRatio(totalCurrentAssets, inventory, totalCurrentLiabilities);
  const quickRatioHealth = determineQuickRatioHealth(quickRatio);

  // Gross Profit Margin
  const grossProfitMargin = calculateGrossProfitMargin(totalRevenue, totalCOGS);
  const grossProfitMarginHeath = determineGrossProfitMarginHealth(grossProfitMargin);

  // Net Profit Margin
  const netProfitMargin = calculateNetProfitMargin(netIncome, totalRevenue);
  const netProfitMarginHealth = determineNetProfitMarginHealth(netProfitMargin);

  // Return on Assets
  const ROA = calculateROA(netIncome, inventory);
  const ROAHealth = determineROAHealth(ROA);

  // Return on Equity
  const ROE = calculateROE(netIncome, shareholdersEquity);
  const ROEHealth = determineROAHealth(ROE);


  return (
    <Container className={styles.dashboardContainer}>
      <div style={{ height: "50px" }}></div>
      <h1>Accountant Dashboard</h1>
      <div style={{ height: "50px" }}></div>
      <img className={styles.image} src={logo} alt="Logo"></img>
      <h2 className={styles.welcomeMessage}> Welcome {state.username}!</h2>
      
      <Row>
        {/* =========
            Liquidity
            ========= */}
        <Col md={3}>
          <Card>
            <Card.Body>
              <Card.Title>Liquidity</Card.Title>
              <Card.Text>
              <Row>
                <Col xs={6}>
                  <p>Current Ratio</p>
                </Col>
                <Col xs={6}>
                  <div className={`${styles.circle} ${currentRatioHealth}`}>
                  {currentRatio}
                </div>
              </Col>
              </Row>

              <Row>
                <Col xs={6}>
                  <p>Quick Ratio</p>
                </Col>
                <Col xs={6}>
                  <div className={`${styles.circle} ${quickRatioHealth}`}>
                  {quickRatio}
                </div>
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
              <Card.Title>Profitability</Card.Title>
              <Card.Text>
              <Row>
                <Col xs={6}>
                  <p>Gross Profit Margin</p>
                </Col>
                <Col xs={6}>
                  <div className={`${styles.circle} ${grossProfitMarginHeath}`}>
                  {grossProfitMargin}
                </div>
              </Col>
              </Row>

              <Row>
                <Col xs={6}>
                  <p>Net Profit Margin</p>
                </Col>
                <Col xs={6}>
                  <div className={`${styles.circle} ${netProfitMarginHealth}`}>
                  {netProfitMargin}
                </div>
              </Col>
              </Row>

              <Row>
                <Col xs={6}>
                  <p>Return on Assets</p>
                </Col>
                <Col xs={6}>
                  <div className={`${styles.circle} ${ROAHealth}`}>
                  {ROA}
                </div>
              </Col>
              </Row>

              <Row>
                <Col xs={6}>
                  <p>Return on Equity</p>
                </Col>
                <Col xs={6}>
                  <div className={`${styles.circle} ${ROEHealth}`}>
                  {ROE}
                </div>
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
              <Card.Title>Efficiency</Card.Title>
              <Card.Text>
              <Row>
                <Col xs={6}>
                  <p>Inventory Turnover Ratio</p>
                </Col>
                <Col xs={6}>
                  <div className={`${styles.circle} ${grossProfitMarginHeath}`}>
                  {grossProfitMargin}
                </div>
              </Col>
              </Row>

              <Row>
                <Col xs={6}>
                  <p>Accounts Receivable Turnover Ratio</p>
                </Col>
                <Col xs={6}>
                  <div className={`${styles.circle} ${netProfitMarginHealth}`}>
                  {netProfitMargin}
                </div>
              </Col>
              </Row>

              <Row>
                <Col xs={6}>
                  <p>Total Asset Turnover Ratio</p>
                </Col>
                <Col xs={6}>
                  <div className={`${styles.circle} ${ROAHealth}`}>
                  {ROA}
                </div>
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
              <Card.Title>Liquidity</Card.Title>
              <Card.Text>
              <Row>
                <Col xs={6}>
                  <p>Debt-to-Equity Ratio</p>
                </Col>
                <Col xs={6}>
                  <div className={`${styles.circle} ${currentRatioHealth}`}>
                  {currentRatio}
                </div>
              </Col>
              </Row>

              <Row>
                <Col xs={6}>
                  <p>Debt Ratio</p>
                </Col>
                <Col xs={6}>
                  <div className={`${styles.circle} ${quickRatioHealth}`}>
                  {quickRatio}
                </div>
              </Col>
              </Row>
    
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        
      </Row>
      
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
            <p>Enter your message below:</p>
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

        <Row>
          <p></p>
        </Row>
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
