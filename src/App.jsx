import { useState, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import ContextProvider from "../context/ContextProvider";
import { AuthProvider } from "../context/AuthContext";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login/Login";
import CreateNewUser from "./pages/CreateNewUser/CreateNewUser";
import EditUser from "./pages/EditUser/EditUser";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import UserDashboard from "./pages/UserDashboard/UserDashboard";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ManagerDashboard from "./pages/ManagerDashboard/ManagerDashboard";
import UserList from "./pages/AdminDashboard/UserList";
import NotFound from "./pages/NotFound/NotFound";
import EnterNewPassword from "./pages/ForgotPassword/EnterNewPassword";
import ManagerLogin from "./pages/ManagerLogin/ManagerLogin";
import LoginChoice from "./pages/LoginChoice/LoginChoice";
import React from "react";
import UserLogin from "./pages/UserLogin/UserLogin";
import AdminLogin from "./pages/AdminLogin/AdminLogin";

function App() {
  const [count, setCount] = useState(0);
  const [state, setState] = useState({
    isLoggedIn: false,
    username: "",
    role: "",
  });

  return (
    <ContextProvider>
      <AuthProvider>
        <Router>
          <NavBar />
          <div className="pd-hz ht-100 pd-vt bg-light-gray">
            <Routes>
              {/* Login options */}
              <Route path="/" element={<LoginChoice />} />
              <Route path="/login-choice" element={<LoginChoice />} />
              <Route path="/user-login" element={<UserLogin />} />
              <Route path="/manager-login" element={<ManagerLogin />} />
              <Route path="/admin-login" element={<AdminLogin />} />

              <Route path="/create-new-user" element={<CreateNewUser />} />
              <Route path="/edit-user" element={<EditUser />} />

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

              {/* User list page */}
              <Route path="/user-list" element={<UserList />} />

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
