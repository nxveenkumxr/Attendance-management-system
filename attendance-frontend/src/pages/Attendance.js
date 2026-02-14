import { useEffect, useState } from "react";
import axios from "axios";

export default function Attendance() {
  const [records, setRecords] = useState([]);
  const [department, setDepartment] = useState("");

  const token = localStorage.getItem("access");

  const fetchAttendance = (dept = "") => {
    axios.get("http://127.0.0.1:8000/api/attendance/", {
      params: { department: dept },
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setRecords(res.data))
    .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchAttendance(department);
  }, [department]);

  return (
    <div>
      <h2>Attendance</h2>

      <div>
        <button onClick={() => setDepartment("")}>All</button>
        <button onClick={() => setDepartment("CSE")}>CSE</button>
        <button onClick={() => setDepartment("IT")}>IT</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Department</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {records.map(r => (
            <tr key={r.id}>
              <td>{r.student_name}</td>
              <td>{r.department_name}</td>
              <td>{r.status}</td>
              <td>{r.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
