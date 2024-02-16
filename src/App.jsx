import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import ContextProvider from "../context/ContextProvider";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login/Login";
import LoginChoice from "./pages/LoginChoice/LoginChoice";
import UserLogin from "./pages/UserLogin/UserLogin";
import ManagerLogin from "./pages/ManagerLogin/ManagerLogin";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import CreateNewUser from "./pages/CreateNewUser/CreateNewUser";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import UserDashboard from "./pages/UserDashboard/UserDashboard";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ManagerDashboard from "./pages/ManagerDashboard/ManagerDashboard";
import UserList from "./pages/UserList/UserList";
import NotFound from "./pages/NotFound/NotFound";
import Feedback from "./pages/Feedback/Feedback";

function App() {
  const [count, setCount] = useState(0);

  return (
    <ContextProvider>
      <Router>
        <NavBar />
        <div className="pd-hz ht-100 pd-vt bg-light-gray">
          <Routes>
            <Route path="/" element={<LoginChoice />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user-login" element={<UserLogin />} />
            <Route path="/manager-login" element={<ManagerLogin />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/create-new-user" element={<CreateNewUser />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/manager-dashboard" element={<ManagerDashboard />} />
            <Route path="/user-list" element={<UserList />} />
            <Route path= "/feedback" element={<Feedback />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </ContextProvider>
  );
}

export default App;
