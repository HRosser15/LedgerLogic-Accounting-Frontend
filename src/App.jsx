import { useState, useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";
import ContextProvider from "../context/ContextProvider";
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
import AdminViewAccountsForm from "./pages/AdminDashboard/Accounts/Forms/ViewAccountsForm";
import AddAccountsForm from "./pages/AdminDashboard/Accounts/Forms/AddAccountsForm";
import EditAccountsForm from "./pages/AdminDashboard/Accounts/Forms/EditAccountsForm";
import DeactivateAccountsForm from "./pages/AdminDashboard/Accounts/Forms/DeactivateAccountsForm";
import AdminViewLedger from "./pages/AdminDashboard/Accounts/Forms/ViewLedger";
import AdminCreateJournal from "./pages/AdminDashboard/Accounts/Forms/CreateJournalEntry";

import ManagerDashboard from "./pages/ManagerDashboard/ManagerDashboard";
import ManagerUserList from "./pages/ManagerDashboard/Users/ManagerUserList";
import ManagerViewAccountsForm from "./pages/ManagerDashboard/Accounts/Forms/ViewAccountsForm";
import ManagerAccountsManagement from "./pages/ManagerDashboard/Accounts/AccountsManagement";
import ManagerViewLedger from "./pages/ManagerDashboard/Accounts/Forms/ViewLedger";
import ManagerCreateJournal from "./pages/ManagerDashboard/Accounts/Forms/CreateJournalEntry";

import AccountantDashboard from "./pages/AccountantDashboard/AccountantDashboard";
import AccountantAccountsManagement from "./pages/AccountantDashboard/Accounts/AccountsManagement";
import AccountantViewLedger from "./pages/AccountantDashboard/Accounts/Forms/ViewLedger";
import AccountantCreateJournal from "./pages/AccountantDashboard/Accounts/Forms/CreateJournalEntry";
import AccountantViewAccountsForm from "./pages/AccountantDashboard/Accounts/Forms/ViewAccountsForm";

import ReportsDashboard from "./pages/Reports/ReportsDashboard";
import BalanceSheet from "./pages/Reports/BalanceSheet";
import IncomeStatement from "./pages/Reports/IncomeStatement";
import RetainedEarnings from "./pages/Reports/RetainedEarnings";
import TrialBalance from "./pages/Reports/TrialBalance";

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
                  path="/admin-accounts-management"
                  element={<AdminAccountsManagement />}
                >
                  <Route index element={<AdminViewAccountsForm />} />
                  <Route path="add" element={<AddAccountsForm />} />
                  <Route path="edit" element={<EditAccountsForm />} />
                  <Route
                    path="deactivate"
                    element={<DeactivateAccountsForm />}
                  />
                  <Route path="ledgers" element={<AdminViewLedger />} />
                  <Route
                    path="ledgers/:accountId"
                    element={<AdminViewLedger />}
                  />
                  <Route path="journal" element={<AdminCreateJournal />} />
                  <Route path="event-log" element={<EventLog />} />
                </Route>
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
                  path="/manager-accounts-management"
                  element={<ManagerAccountsManagement />}
                >
                  <Route
                    path="/manager-accounts-management/ledgers"
                    element={<ManagerViewLedger />}
                  />
                  <Route index element={<ManagerViewAccountsForm />} />
                  <Route
                    path="ledgers/:accountId"
                    element={<ManagerViewLedger />}
                  />
                  <Route path="journal" element={<ManagerCreateJournal />} />
                  <Route path="event-log" element={<EventLog />} />
                </Route>
                <Route
                  path="/manager-user-list"
                  element={<ManagerUserList />}
                />

                {/* ================
                  ACCOUNTANT PAGES
                  ================*/}
                <Route
                  path="/accountant-dashboard"
                  element={<AccountantDashboard />}
                />
                <Route
                  path="/accountant-accounts-management"
                  element={<AccountantAccountsManagement />}
                >
                  <Route index element={<AccountantViewAccountsForm />} />
                  <Route path="ledgers" element={<AccountantViewLedger />} />
                  <Route
                    path="ledgers/:accountId"
                    element={<AccountantViewLedger />}
                  />
                  <Route path="journal" element={<AccountantCreateJournal />} />
                  <Route path="event-log" element={<EventLog />} />
                </Route>

                {/* =========
                    Reports
                    =========  */}
                <Route path="/event-log" element={<EventLog />} />
                <Route path="/reports" element={<ReportsDashboard />} />
                <Route path="/balance-sheet" element={<BalanceSheet />} />
                <Route path="/income-statement" element={<IncomeStatement />} />
                <Route
                  path="/retained-earnings"
                  element={<RetainedEarnings />}
                />
                <Route path="/trial-balance" element={<TrialBalance />} />

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
