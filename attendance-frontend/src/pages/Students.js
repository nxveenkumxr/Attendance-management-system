import { useEffect, useState } from "react";
import axios from "axios";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [roll, setRoll] = useState("");
  const [department, setDepartment] = useState("");

  const token = localStorage.getItem("access");

  const fetchStudents = (dept = "") => {
    if (!token) return;

    axios.get("http://127.0.0.1:8000/api/students/", {
      params: { department: dept },
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setStudents(res.data))
    .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchStudents(department);
  }, [department]);

  // Frontend search filtering
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(search.toLowerCase()) &&
    student.roll_number.toLowerCase().includes(roll.toLowerCase())
  );

  return (
    <div className="container">
      <h2 className="title">Students</h2>

      {/* Department Buttons */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setDepartment("")}>All</button>
        <button onClick={() => setDepartment("CSE")}>CSE</button>
        <button onClick={() => setDepartment("IT")}>IT</button>
        <button onClick={() => setDepartment("AI&DS")}>AI&DS</button>
      </div>

      {/* Search Inputs */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          type="text"
          placeholder="Filter by roll number"
          value={roll}
          onChange={(e) => setRoll(e.target.value)}
        />
      </div>

      {/* Table */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll Number</th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>
          {filteredStudents.length > 0 ? (
            filteredStudents.map(student => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.roll_number}</td>
                <td>{student.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="no-data">
                No students found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
