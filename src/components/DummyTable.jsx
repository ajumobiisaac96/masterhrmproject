import React, { useState } from "react";
import DepartmentDetails from "./DepartmentDetails";

const DummyTable = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  // Dummy department data with more rows
  const data = [
    {
      department: "Human Resources",
      attendance: "95%",
      overtime: 30,
      undertime: 10,
      absences: 12,
      totalLogged: 160,
      employees: [
        {
          name: "John Doe",
          overtime: 30,
          undertime: 10,
          absences: 12,
          attendance: "95%",
          totalLogged: 160,
          attendanceDetails: [
            { date: "2023-01-01", checkIn: "09:00", checkOut: "17:00", hoursWorked: 8, overtime: 1, undertime: 0, absences: 0 },
            { date: "2023-01-02", checkIn: "09:15", checkOut: "17:00", hoursWorked: 7.75, overtime: 0.5, undertime: 0.25, absences: 0 },
            // More attendance details...
          ],
        },
        {
          name: "Jane Smith",
          overtime: 25,
          undertime: 5,
          absences: 12,
          attendance: "98%",
          totalLogged: 165,
          attendanceDetails: [
            { date: "2023-01-01", checkIn: "09:00", checkOut: "17:00", hoursWorked: 8, overtime: 1, undertime: 0, absences: 0 },
            { date: "2023-01-02", checkIn: "09:10", checkOut: "17:00", hoursWorked: 7.83, overtime: 0.5, undertime: 0.17, absences: 0 },
            // More attendance details...
          ],
        },
        // More employees...
      ],
    },
    {
      department: "Finance",
      overtime: 40,
      undertime: 5,
      location: "London",
      attendance: "92%",
      totalLogged: 170,
      absences: 20,
      employees: [
        {
          name: "Alice Brown",
          overtime: 40,
          undertime: 5,
          absences: 12,
          attendance: "92%",
          totalLogged: 170,
          attendanceDetails: [
            { date: "2023-01-01", checkIn: "09:00", checkOut: "17:00", hoursWorked: 8, overtime: 1, undertime: 0, absences: 0 },
            { date: "2023-01-02", checkIn: "09:20", checkOut: "17:00", hoursWorked: 7.67, overtime: 0.5, undertime: 0.33, absences: 0 },
            // More attendance details...
          ],
        },
        {
          name: "Bob White",
          overtime: 35,
          undertime: 10,
          absences: 12,
          attendance: "88%",
          totalLogged: 160,
          attendanceDetails: [
            { date: "2023-01-01", checkIn: "09:00", checkOut: "17:00", hoursWorked: 8, overtime: 1, undertime: 0, absences: 0 },
            { date: "2023-01-02", checkIn: "09:05", checkOut: "17:00", hoursWorked: 7.92, overtime: 0.5, undertime: 0.08, absences: 0 },
            // More attendance details...
          ],
        },
        // More employees...
      ],
    },
    {
      department: "IT",
      overtime: 50,
      undertime: 15,
      absences: 8,
      attendance: "97%",
      totalLogged: 180,
      employees: [
        {
          name: "Chris Allen",
          overtime: 50,
          undertime: 15,
          absences: 12,
          attendance: "97%",
          totalLogged: 180,
          attendanceDetails: [
            { date: "2023-01-01", checkIn: "09:00", checkOut: "17:00", hoursWorked: 8, overtime: 1, undertime: 0, absences: 0 },
            { date: "2023-01-02", checkIn: "09:30", checkOut: "17:00", hoursWorked: 7.5, overtime: 0.5, undertime: 0.5, absences: 0 },
            // More attendance details...
          ],
        },
        {
          name: "Sarah Wilson",
          overtime: 45,
          undertime: 10,
          absences: 12,
          attendance: "93%",
          totalLogged: 175,
          attendanceDetails: [
            { date: "2023-01-01", checkIn: "09:00", checkOut: "17:00", hoursWorked: 8, overtime: 1, undertime: 0, absences: 0 },
            { date: "2023-01-02", checkIn: "09:25", checkOut: "17:00", hoursWorked: 7.58, overtime: 0.5, undertime: 0.42, absences: 0 },
            // More attendance details...
          ],
        },
        // More employees...
      ],
    },
    {
      department: "Marketing",
      overtime: 20,
      undertime: 5,
      absences: 24,
      attendance: "98%",
      totalLogged: 160,
      employees: [
        {
          name: "Zoe Martin",
          overtime: 20,
          undertime: 5,
          absences: 12,
          attendance: "98%",
          totalLogged: 160,
          attendanceDetails: [
            { date: "2023-01-01", checkIn: "09:00", checkOut: "17:00", hoursWorked: 8, overtime: 1, undertime: 0, absences: 0 },
            { date: "2023-01-02", checkIn: "09:35", checkOut: "17:00", hoursWorked: 7.42, overtime: 0.5, undertime: 0.58, absences: 0 },
            // More attendance details...
          ],
        },
        {
          name: "Liam Lee",
          overtime: 18,
          undertime: 3,
          absences: 12,
          attendance: "99%",
          totalLogged: 162,
          attendanceDetails: [
            { date: "2023-01-01", checkIn: "09:00", checkOut: "17:00", hoursWorked: 8, overtime: 1, undertime: 0, absences: 0 },
            { date: "2023-01-02", checkIn: "09:40", checkOut: "17:00", hoursWorked: 7.33, overtime: 0.5, undertime: 0.67, absences: 0 },
            // More attendance details...
          ],
        },
        // More employees...
      ],
    },
    // More departments can be added in the same pattern.
  ];

  // Handle clicking on 'View' to show department details
  const handleViewDetails = (department, employees) => {
    setSelectedDepartment(department);
    setSelectedEmployees(employees);
  };

  return (
    <div>
      {!selectedDepartment ? (
        <div>
          <h2>Departments</h2>
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Department</th>
                <th style={tableHeaderStyle}>Attendance</th>
                <th style={tableHeaderStyle}>Overtime Hours</th>
                <th style={tableHeaderStyle}>Undertime Hours</th>
                <th style={tableHeaderStyle}>Absences</th>
                <th style={tableHeaderStyle}>Total Logged Hours</th>
                <th style={tableHeaderStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index} style={tableRowStyle}>
                  <td style={tableCellStyle}>{row.department}</td>
                  <td style={tableCellStyle}>{row.attendance}</td>
                  <td style={tableCellStyle}>{row.overtime}</td>
                  <td style={tableCellStyle}>{row.undertime}</td>
                  <td style={tableCellStyle}>{row.absences}</td>
                  <td style={tableCellStyle}>{row.totalLogged}</td>
                  <td style={tableCellStyle}>
                    <p
                      href="#"
                      onClick={() => handleViewDetails(row.department, row.employees)}
                      style={viewButtonStyle}
                    >
                      View
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <DepartmentDetails department={selectedDepartment} employees={selectedEmployees} />
      )}
    </div>
  );
};

// Styling
const tableHeaderStyle = {
  border: "1px solid #ddd",
  padding: "12px",
  margin : "10px",
  textAlign: "left",
  backgroundColor: "#f4f4f4",
  fontWeight: "bold",
};

const tableRowStyle = {
  borderBottom: "1px solid #ddd",
};

const tableCellStyle = {
  padding: "12px",
  border: "1px solid #ddd",
};

const viewButtonStyle = {
  display: "inline-block",
  padding: "8px 12px",
  backgroundColor: "#F8F8F8",
  color: "#007BFF",
  textDecoration: "none",
  borderRadius: "4px",
  cursor: "pointer",
  textAlign: "center",
  fontWeight: "bold",
  border: "1px solid #ddd",
};

export default DummyTable;