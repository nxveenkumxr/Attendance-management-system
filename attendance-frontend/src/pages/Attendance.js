import { useEffect, useState } from "react";
import axios from "axios";

export default function Attendance() {
  const [students, setStudents] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/students/")
      .then(res => setStudents(res.data));
  }, []);

  const markAttendance = (studentId, status) => {
    axios.post("http://127.0.0.1:8000/api/attendance/", {
      student: studentId,
      date: date,   // 👈 now using selected date
      status: status
    }).then(() => alert("Attendance saved"));
  };

  return (
    <div>
      <h2>Mark Attendance</h2>

      <label>Select Date: </label>
      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
      />

      <br /><br />

      {students.map(s => (
        <div key={s.id}>
          {s.name}
          <button onClick={() => markAttendance(s.id, "Present")}>Present</button>
          <button onClick={() => markAttendance(s.id, "Absent")}>Absent</button>
        </div>
      ))}
    </div>
  );
}
