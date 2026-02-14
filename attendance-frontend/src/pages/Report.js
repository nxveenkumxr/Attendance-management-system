import { useEffect, useState } from "react";
import axios from "axios";

export default function Report() {
  const [report, setReport] = useState([]);
  const [department, setDepartment] = useState("");

  const token = localStorage.getItem("access");

  const fetchReport = (dept = "") => {
    axios.get("http://127.0.0.1:8000/api/report/", {
      params: { department: dept },
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setReport(res.data))
    .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchReport(department);
  }, [department]);

  return (
    <div>
      <h2>Attendance Report</h2>

      <div>
        <button onClick={() => setDepartment("")}>All</button>
        <button onClick={() => setDepartment("CSE")}>CSE</button>
        <button onClick={() => setDepartment("IT")}>IT</button>
        <button onClick={() => setDepartment("AI&DS")}>AI&DS</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll</th>
            <th>Department</th>
            <th>Attendance %</th>
          </tr>
        </thead>

        <tbody>
          {report.map((r, index) => (
            <tr key={index}>
              <td>{r.student}</td>
              <td>{r.roll_number}</td>
              <td>{r.department}</td>
              <td>{r.attendance_percentage}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
