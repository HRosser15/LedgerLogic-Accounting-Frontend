import { useState, useContext, useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import ContextProvider from "../context/ContextProvider";
import AppContext from "../context/AppContext";
import { AuthProvider } from "../context/AuthContext";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login/Login";
import CreateNewUser from "./pages/CreateNewUser/CreateNewUser";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import UserDashboard from "./pages/UserDashboard/UserDashboard";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ManagerDashboard from "./pages/ManagerDashboard/ManagerDashboard";
import UserList from "./pages/AdminDashboard/UserList";
import ManagerUserList from "./pages/ManagerDashboard/ManagerUserList";
import NotFound from "./pages/NotFound/NotFound";
import EnterNewPassword from "./pages/ForgotPassword/EnterNewPassword";
import UserLogin from "./pages/UserLogin/UserLogin"; // main login
import AdminAccountsManagement from "./pages/AdminAccounts/AdminAccountsManagement";
import ViewLedger from "./pages/AdminAccounts/Forms/ViewLedger";

import ManagerAccountsManagement from "./pages/AdminAccounts copy/ManagerAccountsManagement";
import ManagerViewLedger from "./pages/AdminAccounts copy/Forms/ManagerViewLedger";

import AccountantAccountsManagement from "./pages/AccountantAccounts/AccountantAccountsManagement";
import AccountantViewLedger from "./pages/AccountantAccounts/Forms/AccountantViewLedger";

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
              <Route path="/user-dashboard" element={<UserDashboard />} />
              <Route path="/manager-dashboard" element={<ManagerDashboard />} />
              <Route
                path="/admin-dashboard"
                element={<AdminDashboard username={state.username} />}
              />
              <Route path="/navbar" element={<NavBar />}></Route>

              {/* Accounts Management*/}
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
                path="accountant/account/:accountNumber"
                element={<AccountantViewLedger />}
              />

              {/* User list page */}
              <Route path="/user-list" element={<UserList />} />
              <Route path="/manager-user-list" element={<ManagerUserList />} />

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
