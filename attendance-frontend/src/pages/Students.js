import { useEffect, useState } from "react";
import axios from "axios";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [email, setEmail] = useState("");

  const fetchStudents = () => {
    axios.get("http://127.0.0.1:8000/api/students/")
      .then(res => setStudents(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const addStudent = () => {
    axios.post("http://127.0.0.1:8000/api/students/", {
      name: name,
      roll_number: roll,
      email: email
    }).then(() => {
      fetchStudents();
      setName("");
      setRoll("");
      setEmail("");
    });
  };

  return (
    <div>
      <h2>Add Student</h2>

      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Roll Number" value={roll} onChange={e => setRoll(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <button onClick={addStudent}>Add</button>

      <h2>Students List</h2>
      <ul>
        {students.map(s => (
          <li key={s.id}>{s.name} - {s.roll_number}</li>
        ))}
      </ul>
    </div>
  );
}
