import styles from "./ForgotPassword.module.css";
import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Function to validate and handle password update
const handleUpdatePassword = (
  userId,
  email,
  securityAnswer1,
  securityAnswer2
) => {
  // Validation logic (API calls will go here in the future)
  if (!userId || !email || !securityAnswer1 || !securityAnswer2) {
    alert("Please fill out all fields.");
    return;
  }

  // API call for validation (to be implemented)
  // validateInfo(userId, email, securityAnswer1, securityAnswer2);
};

const ForgotPassword = () => {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [securityAnswer1, setSecurityAnswer1] = useState("");
  const [securityAnswer2, setSecurityAnswer2] = useState("");
  const navigate = useNavigate();

  const handleUpdatePassword = (e) => {
    e.preventDefault();

    if (checkPassword(password, confirmPassword)) {
      navigate("/enter-new-password");
    } else {
      alert(
        "Please fill out all fields and ensure you have entered the correct credentials."
      );
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.column}>
        <form className={styles.forms}>
          <h1 className={styles.header}>Forgot Password</h1>
          <p className={styles.pSmall}>
            Please fill out the following information to reset your password
          </p>
          <div className={styles.container}>
            {/* Username and Email - labels*/}
            <div className={styles.row}>
              <label className={styles.label50}>Username</label>
              <label className={styles.label50}>Email</label>
            </div>
            {/* Username and Email - textboxes*/}
            <div className={styles.row}>
              <input
                type="text"
                className={styles.textField50}
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
              <input
                type="text"
                className={styles.textField50}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Security Question 1 */}
            <div className={styles.row}>
              <label className={styles.label50}>
                What was your first pet's name?
              </label>
            </div>
            <div className={styles.row}>
              <input
                type="text"
                className={styles.textField}
                value={securityAnswer1}
                onChange={(e) => setSecurityAnswer1(e.target.value)}
              />
            </div>

            {/* Security Question 2 */}
            <div className={styles.row}>
              <label className={styles.label50}>
                What is your mother's maiden name?
              </label>
            </div>
            <div className={styles.row}>
              <input
                type="text"
                className={styles.textField}
                value={securityAnswer2}
                onChange={(e) => setSecurityAnswer2(e.target.value)}
              />
            </div>
          </div>

          <div>
            {/* Button for Reset Password */}
            <button
              className={styles.button}
              type="button"
              onClick={() =>
                handleUpdatePassword(
                  userId,
                  email,
                  securityAnswer1,
                  securityAnswer2
                )
              }
            >
              Set new Password
            </button>
          </div>
          <div>
            <Link className={styles.fixLinks} to="/login-choice">
              {/* Button for Cancel */}
              <button className={styles.button}>Cancel</button>
            </Link>
          </div>
        </form>
      </div>

      <div style={{ height: "200px" }}></div>
    </div>
  );
};

export default ForgotPassword;

// import React, { useState } from "react";
// import { Modal, Button } from "react-bootstrap";
// import { forgotPassword } from "../../services/AuthService";
// import "react-datepicker/dist/react-datepicker.css";
// import styles from "./ForgotPassword.module.css";

// const ForgotPassword = () => {
//   const [requestSent, setRequestSent] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   // Create a state to manage form data
//   const [formData, setFormData] = useState({
//     userId: "",
//     email: "",
//     securityAnswer1: "",
//     securityAnswer2: "",
//     password: "",
//     passwordConfirm: "",
//   });

//   // function to handle form data changes
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // function to handle forgot password
//   const forgotPasswordHandler = () => {
//     // Call the forgotPassword function from AuthServices.js with the form data
//     forgotPassword(formData)
//       .then((response) => {
//         // We can handle the response as needed
//         // We can update the state, show a success message, or redirect the user
//       })
//       .catch((error) => {
//         console.error("Forgot Password Error:", error);
//         // We can update the state or show error message to the user
//       });
//   };

//   const handleClose = () => {
//     setRequestSent(false);
//     setErrorMessage("");
//   };

//   return (
//     <div className={`container ${styles.formContainer}`}>
//       <h2>Forgot Password</h2>

//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           forgotPasswordHandler();
//         }}
//         className="row g-3"
//       >
//         <div className="col-md-4">
//           <label htmlFor="useriD" className="form-label">
//             User ID
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="useriD"
//             name="useriD"
//             value={formData.useriD}
//             onChange={handleChange}
//             placeholder="Enter your user ID"
//           />
//         </div>

//         <div className="col-md-4">
//           <label htmlFor="email" className="form-label">
//             Email Address
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Enter your email address"
//           />
//         </div>

//         <div className="col-mb-3">
//           <label htmlFor="securityAnswer1" className="form-label">
//             What was the name of your first pet?
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="securityAnswer1"
//             name="securityAnswer1"
//             value={formData.securityAnswer1}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="col-mb-3">
//           <label htmlFor="securityAnswer2" className="form-label">
//             What is your mother's maiden name?
//           </label>
//           <input
//             type="securityAnswer2"
//             className="form-control"
//             id="securityAnswer2"
//             name="securityAnswer2"
//             value={formData.securityAnswer2}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="col-md-6">
//           <label htmlFor="password" className="form-label">
//             New Password
//           </label>
//           <input
//             type="password"
//             className="form-control"
//             id="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             placeholder="Password"
//           />
//           <p className="password-requirements">
//             Password must be 8 or characters and at least one of each:
//             uppercase, number, special character{" "}
//           </p>
//         </div>

//         <div className="col-md-6">
//           <label htmlFor="passwordConfirm" className="form-label">
//             Confirm New Password
//           </label>
//           <input
//             type="passwordConfirm"
//             className="form-control"
//             id="passwordConfirm"
//             name="passwordConfirm"
//             onChange={handleChange}
//             placeholder="Confirm New Password"
//           />
//         </div>

//         <div className="col-12">
//           <button type="submit" className="btn btn-primary">
//             Submit Request
//           </button>
//         </div>
//       </form>

//       <Modal show={requestSent || !!errorMessage} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>
//             {requestSent ? "Request Sent for Approval" : "Registration Failed"}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {requestSent
//             ? "Your registration request has been submitted and is pending approval."
//             : errorMessage}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       <div style={{ height: "200px" }}></div>
//     </div>
//   );
// };

// export default ForgotPassword;
