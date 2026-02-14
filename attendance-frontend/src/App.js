import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import Students from "./pages/Students";
import Attendance from "./pages/Attendance";
import Report from "./pages/Report";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

import "./App.css";
import { motion } from "framer-motion";

/* ===================== SIDEBAR ===================== */

function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <h2 className="logo">AMS</h2>

      <Link to="/dashboard">📊 Dashboard</Link>
      <Link to="/students">👨‍🎓 Students</Link>
      <Link to="/attendance">📅 Attendance</Link>
      <Link to="/report">📈 Report</Link>

      <button className="logout-btn" onClick={logout}>
        🚪 Logout
      </button>
    </div>
  );
}

/* ===================== LAYOUT ===================== */

function Layout() {
  const location = useLocation();
  const hideSidebar = location.pathname === "/login";

  return (
    <div className="layout">
      {!hideSidebar && <Sidebar />}

      <div className="content">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Routes>
            <Route path="/students" element={<Students />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/report" element={<Report />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </motion.div>
      </div>
    </div>
  );
}

/* ===================== APP ===================== */

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
