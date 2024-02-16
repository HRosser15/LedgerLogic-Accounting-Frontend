import styles from './Footer.module.css'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <div className={styles.container}>
        <img src={logo} alt="logo" className={styles.logo}/>
        <p>
        Elevate Your Accounting Game with Ledger Logic - Balancing the Books, Unleashing Potential
        </p>

        <h6>Quick Nav (temporary for dev use)</h6>
        <div className={styles.flex}>
          <Link to="/">Login</Link>
          <Link to="/login-choice">LoginChoice</Link>
          <Link to="/user-login">UserLogin</Link>
          <Link to="/manager-login">ManagerLogin</Link>
          <Link to="/admin-login">AdminLogin</Link>
          <Link to="/admin-dashboard">AdminDashboard</Link>
          <Link to="/user-dashboard">UserDashboard</Link>
          <Link to="/create-new-user">CreateNewUser</Link>
          <Link to="/forgot-password">ForgotPassword</Link>
          <Link to="/manager-dashboard">ManagerDashboard</Link>
          <Link to="/user-list">UserList</Link>
        </div>
    </div>
  )
}

export default Footer;