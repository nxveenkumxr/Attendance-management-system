import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Students from "./pages/Students";
import Attendance from "./pages/Attendance";
import Report from "./pages/Report";
import Dashboard from "./pages/Dashboard";




function App() {
  return (
    <Router>
      <div style={{ padding: "20px" }}>
        <h1>Attendance Management System</h1>

        <nav>
          <Link to="/students">Students</Link> | 
          <Link to="/attendance">Attendance</Link> | 
          <Link to="/report">Report</Link>
          <Link to="/dashboard">Dashboard</Link>
        </nav>

        <Routes>
          <Route path="/students" element={<Students />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/report" element={<Report />} />
          <Route path="/dashboard" element={<Dashboard />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
