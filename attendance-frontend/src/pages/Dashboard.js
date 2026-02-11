import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const [report, setReport] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/report/")
      .then(res => setReport(res.data));
  }, []);

  const data = {
    labels: report.map(r => r.student),
    datasets: [
      {
        label: "Attendance %",
        data: report.map(r => r.attendance_percentage),
      }
    ]
  };

  return (
    <div>
      <h2>Attendance Dashboard</h2>
      <Bar data={data} />
    </div>
  );
}
