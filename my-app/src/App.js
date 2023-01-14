import React, { useState } from 'react';
import './App.css';
import './styles.css'

const App = () => {
  const [currentTab, setCurrentTab] = useState("employees");
  const [employees, setEmployees] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [sex, setSex] = useState("male");
  const [work, setWork] = useState("");
  
  const [deadline, setDeadline] = useState("");


  const removeEmployee = (index) => {
    const newEmployees = [...employees];
    newEmployees.splice(index, 1);
    setEmployees(newEmployees);
}

const isWorkPossible = () => {
  let totalPower = 0;
  for (let i = 0; i < employees.length; i++) {
    totalPower += employees[i].power;
  }
  return work && deadline && work !== 0 && deadline !== 0 && work / deadline <= totalPower;
}



  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!firstName || !lastName || !sex) {
        setError("Fill in the whole form");
        return;
    }
    setError("");
    let power = 0;
    if (sex === "male") {
        power = 1;
    } else if (sex === "female") {
        power = 0.5;
    }
    const newEmployee = { firstName, lastName, sex, power: power + " m³/h" };
    setEmployees([...employees, newEmployee]);
    setFirstName("");
    setLastName("");
    setSex("male");
}

  return (
    <div className={`App ${currentTab}`}>
      <div className="tabs">
        <button className={currentTab === "employees" ? "active" : ""} onClick={() => setCurrentTab("employees")}>Employees</button>
        <button className={currentTab === "tasks" ? "active" : ""} onClick={() => setCurrentTab("tasks")}>Tasks</button>
      </div>
      {currentTab === "employees" && (
        <div className="tab-content">
          {error && <p className="error">{error}</p>}
          <h1>Employees</h1>
          <form onSubmit={handleSubmit}>
            <label>
              First Name:
              <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </label>
            <br />
            <label>
              Last Name:
              <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </label>
            <br />
            <label>
              Sex:
              <select value={sex} onChange={(e) => setSex(e.target.value)}>
                <option value="">Please select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>
            <br />
            <button type="submit">Add Employee</button>
          </form>
          <br />
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Sex</th>
                  <th>Performance</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee, index) => (
                  <tr key={index}>
                    <td>{employee.firstName} {employee.lastName}</td>
                    <td>{employee.sex}</td>
                    <td>{employee.power}</td>
                    <td>
                      <button className="remove-button" onClick={()=> removeEmployee(index)}>Fire</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {currentTab === "tasks" && (
        <div className="tab-content">
          <h1>Tasks</h1>
          <form>
            <label>
              Work (m³):
              <input type="number" value={work} onChange={(e) => setWork(e.target.value)} />
            </label>
            <br />
            <label>
              Deadline (hours):
              <input type="number" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
            </label>
            <br />
            <button type="submit" className={isWorkPossible() ? "possible" : "impossible"}  disabled={!isWorkPossible()}>Check</button>

          </form>
        </div>
      )}

    </div>
  );
}

export default App;