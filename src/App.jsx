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
import UsersDashboard from "./pages/AdminDashboard/Users/UsersDashboard";
import UserList from "./pages/AdminDashboard/Users/UserList";
import ExpiredPasswords from "./pages/AdminDashboard/Users/ExpiredPasswords";
import UpdateUser from "./pages/AdminDashboard/Users/UpdateUser";
import AdminAccountsManagement from "./pages/AdminDashboard/Accounts/AdminAccountsManagement";
import ViewLedger from "./pages/AdminDashboard/Accounts/Forms/ViewLedger";

import ManagerDashboard from "./pages/ManagerDashboard/ManagerDashboard";
import ManagerUserList from "./pages/ManagerDashboard/Users/ManagerUserList";
import ManagerAccountsManagement from "./pages/ManagerDashboard/Accounts/AccountsManagement";
import ManagerViewLedger from "./pages/ManagerDashboard/Accounts/Forms/ViewLedger";
import ManagerCreateJournal from "./pages/ManagerDashboard/Accounts/Forms/CreateJournalEntry";
import ManagerReportsDashboard from "./pages/ManagerDashboard/Reports/ReportsDashboard";
import ManagerBalanceSheet from "./pages/ManagerDashboard/Reports/BalanceSheet";
import ManagerIncomeStatement from "./pages/ManagerDashboard/Reports/IncomeStatement";
import ManagerRetainedEarnings from "./pages/ManagerDashboard/Reports/RetainedEarnings";
import ManagerTrialBalance from "./pages/ManagerDashboard/Reports/TrialBalance";

import AccountantDashboard from "./pages/AccountantDashboard/AccountantDashboard";
import AccountantAccountsManagement from "./pages/AccountantDashboard/Accounts/AccountsManagement";
import AccountantViewLedger from "./pages/AccountantDashboard/Accounts/Forms/ViewLedger";
import AccountantCreateJournal from "./pages/AccountantDashboard/Accounts/Forms/CreateJournalEntry";

import EventLog from "./pages/ManagerDashboard/Accounts/Forms/EventLog";
import PostReference from "./pages/ManagerDashboard/Accounts/Forms/PostReference";

import Help from "./pages/Help/Help";

import NotFound from "./pages/NotFound/NotFound";
import { JournalProvider } from "../context/JournalContext";

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
        <JournalProvider>
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

                {/* ===================
                  ADMINISTRATOR PAGES
                  ===================*/}
                <Route
                  path="/admin-dashboard"
                  element={<AdminDashboard username={state.username} />}
                />
                <Route
                  path="/admin-user-management"
                  element={<UsersDashboard />}
                ></Route>
                <Route
                  path="admin-accounts-management"
                  element={<AdminAccountsManagement />}
                />
                <Route
                  path="/account/:accountNumber"
                  element={<ViewLedger />}
                />
                <Route path="/user-list" element={<UserList />} />
                <Route
                  path="/expired-passwords"
                  element={<ExpiredPasswords />}
                />
                <Route path="/update-user" element={<UpdateUser />} />

                {/* =============
                  MANAGER PAGES
                  =============*/}
                <Route
                  path="/manager-dashboard"
                  element={<ManagerDashboard />}
                />
                <Route
                  path="manager-accounts-management"
                  element={<ManagerAccountsManagement />}
                />
                <Route
                  path="manager/account/:accountNumber"
                  element={<ManagerViewLedger />}
                />
                <Route
                  path="/manager-user-list"
                  element={<ManagerUserList />}
                />
                <Route
                  path="/manager-create-journal"
                  element={<ManagerCreateJournal />}
                />
                <Route
                  path="/manager-reports"
                  element={<ManagerReportsDashboard />}
                />
                <Route
                  path="/manager-balance-sheet"
                  element={<ManagerBalanceSheet />}
                />
                <Route
                  path="/manager-income-statement"
                  element={<ManagerIncomeStatement />}
                />
                <Route
                  path="/manager-retained-earnings"
                  element={<ManagerRetainedEarnings />}
                />
                <Route
                  path="/manager-trial-balance"
                  element={<ManagerTrialBalance />}
                />

                {/* ================
                  ACCOUNTANT PAGES
                  ================*/}
                <Route
                  path="/accountant-dashboard"
                  element={<AccountantDashboard />}
                />
                <Route
                  path="accountant-accounts-management"
                  element={<AccountantAccountsManagement />}
                />
                <Route
                  path="/accountant/account/:accountNumber"
                  element={<AccountantViewLedger />}
                />
                <Route
                  path="/accountant-create-journal"
                  element={<AccountantCreateJournal />}
                />

                {/* =========
                    Event Log
                    =========  */}
                <Route path="/event-log" element={<EventLog />} />

                {/* ===============
                    EPost Reference
                    ===============  */}
                <Route path="/post-reference" element={<PostReference />} />

                {/* =========
                     Help
                  =========*/}
                <Route path="/help" element={<Help />} />

                {/* =========
                  Not Found
                  =========*/}
                <Route path="*" element={<NotFound />} />

                <Route path="/navbar" element={<NavBar />}></Route>
              </Routes>
            </div>
            <Footer />
          </Router>
        </JournalProvider>
      </AuthProvider>
    </ContextProvider>
  );
}

export default App;
