import { useState, useContext, useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import ContextProvider from "../context/ContextProvider";
import AppContext from "../context/AppContext";
import { AuthProvider } from "../context/AuthContext";

import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

import CreateNewUser from "./pages/CreateNewUser/CreateNewUser";
import UserLogin from "./pages/UserLogin/UserLogin"; // main login
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import EnterNewPassword from "./pages/ForgotPassword/EnterNewPassword";

import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import AccountantDashboard from "./pages/AccountantDashboard/AccountantDashboard";
import ManagerDashboard from "./pages/ManagerDashboard/ManagerDashboard";

import UserList from "./pages/AdminDashboard/UserList";
import ManagerUserList from "./pages/ManagerDashboard/ManagerUserList";
import ExpiredPasswords from "./pages/AdminDashboard/ExpiredPasswords";

import AdminAccountsManagement from "./pages/AdminAccounts/AdminAccountsManagement";
import ViewLedger from "./pages/AdminAccounts/Forms/ViewLedger";

import ManagerAccountsManagement from "./pages/ManagerAccounts/AccountsManagement";
import ManagerViewLedger from "./pages/ManagerAccounts/Forms/ViewLedger";

import AccountantAccountsManagement from "./pages/AccountantAccounts/AccountsManagement";
import AccountantViewLedger from "./pages/AccountantAccounts/Forms/ViewLedger";

import Help from "./pages/Help/Help";

import NotFound from "./pages/NotFound/NotFound";

function App() {
  const [count, setCount] = useState(0);
  const [state, setState] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser
      ? { isLoggedIn: true, ...JSON.parse(storedUser) }
      : { isLoggedIn: false, username: "", role: "" };
  });

  useEffect(() => {
    // console.log("Initial State in App.jsx:", state);
  }, []);

  return (
    <ContextProvider>
      <AuthProvider>
        <Router>
          <NavBar />
          <div className="pd-hz ht-100 pd-vt bg-light-gray">
            <Routes>
              {/* Login options */}
              <Route path="/" element={<UserLogin />} />
              <Route path="/user-login" element={<UserLogin />} />
              <Route path="/create-new-user" element={<CreateNewUser />} />

              {/* Forgot password pages */}
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/enter-new-password"
                element={<EnterNewPassword />}
              />

              {/* Dashboard pages */}
              <Route
                path="/accountant-dashboard"
                element={<AccountantDashboard />}
              />
              <Route path="/manager-dashboard" element={<ManagerDashboard />} />
              <Route
                path="/admin-dashboard"
                element={<AdminDashboard username={state.username} />}
              />
              <Route path="/navbar" element={<NavBar />}></Route>

              {/* ===================
                  Accounts Management
                  ===================*/}
              {/* Admin */}
              <Route
                path="admin-accounts-management"
                element={<AdminAccountsManagement />}
              />
              <Route path="/account/:accountNumber" element={<ViewLedger />} />

              {/* Manager */}
              <Route
                path="manager-accounts-management"
                element={<ManagerAccountsManagement />}
              />
              <Route
                path="manager/account/:accountNumber"
                element={<ManagerViewLedger />}
              />

              {/* Accountant */}
              <Route
                path="accountant-accounts-management"
                element={<AccountantAccountsManagement />}
              />
              <Route
                path="/accountant/account/:accountNumber"
                element={<AccountantViewLedger />}
              />

              {/* =========
                  User List
                  =========*/}
              <Route path="/user-list" element={<UserList />} />
              <Route path="/manager-user-list" element={<ManagerUserList />} />
              <Route path="/expired-passwords" element={<ExpiredPasswords />} />

              {/* =========
                     Help
                  =========*/}
              <Route path="/help" element={<Help />} />

              {/* =========
                  Not Found
                  =========*/}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </AuthProvider>
    </ContextProvider>
  );
}

export default App;
