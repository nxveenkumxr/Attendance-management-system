import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access");

    if (!token) {
      console.log("No token found");
      return;
    }

    axios.get("http://127.0.0.1:8000/api/dashboard/", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setStats(res.data);
    })
    .catch(err => {
      console.log("Dashboard error:", err.response?.data || err);
    });

  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div>
      <h2>Dashboard</h2>

      <p>Total Students: {stats.total_students}</p>
      <p>Total Records: {stats.total_records}</p>
      <p>Overall %: {stats.overall_percentage}%</p>
      <p>Low Attendance: {stats.low_attendance_count}</p>
    </div>
  );
}
