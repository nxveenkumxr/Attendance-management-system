import { useEffect, useState } from "react";
import axios from "axios";

export default function Report() {
  const [report, setReport] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/report/")
      .then(res => setReport(res.data));
  }, []);

  return (
    <div>
      <h2>Attendance Report</h2>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll No</th>
            <th>Attendance %</th>
          </tr>
        </thead>
        <tbody>
          {report.map((r, i) => (
            <tr key={i}>
              <td>{r.student}</td>
              <td>{r.roll_number}</td>
              <td>{r.attendance_percentage}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
