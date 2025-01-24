import React, { useState } from "react";

const DepartmentDetails = ({ department, employees }) => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  if (!employees || employees.length === 0) {
    return <div>No employees available for this department.</div>;
  }

  const handleViewClick = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleBackClick = () => {
    setSelectedEmployee(null);
  };

  if (selectedEmployee) {
    return (
      <div>
        <h2>{selectedEmployee.name}'s Attendance Details</h2>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>Date</th>
              <th style={tableHeaderStyle}>Check-in Time</th>
              <th style={tableHeaderStyle}>Check-out Time</th>
              <th style={tableHeaderStyle}>Hours Worked</th>
              <th style={tableHeaderStyle}>Overtime Hours</th>
              <th style={tableHeaderStyle}>Undertime Hours</th>
              <th style={tableHeaderStyle}>Absences</th>
            </tr>
          </thead>
          <tbody>
            {selectedEmployee.attendanceDetails && selectedEmployee.attendanceDetails.length > 0 ? (
              selectedEmployee.attendanceDetails.map((detail, index) => (
                <tr key={index} style={tableRowStyle}>
                  <td style={tableCellStyle}>{detail.date}</td>
                  <td style={tableCellStyle}>{detail.checkIn}</td>
                  <td style={tableCellStyle}>{detail.checkOut}</td>
                  <td style={tableCellStyle}>{detail.hoursWorked}</td>
                  <td style={tableCellStyle}>{detail.overtime}</td>
                  <td style={tableCellStyle}>{detail.undertime}</td>
                  <td style={tableCellStyle}>{detail.absences}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={tableCellStyle}>No attendance details available.</td>
              </tr>
            )}
          </tbody>
        </table>
        <p
          onClick={handleBackClick}
          style={backButtonStyle}
        >
          Back to Employees
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2>{department} Department Details</h2>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Employee Name</th>
            <th style={tableHeaderStyle}>Attendance</th>
            <th style={tableHeaderStyle}>Overtime Hours</th>
            <th style={tableHeaderStyle}>Undertime Hours</th>
            <th style={tableHeaderStyle}>Absences</th>
            <th style={tableHeaderStyle}>Total Hours Logged</th>
            <th style={tableHeaderStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={index} style={tableRowStyle}>
              <td style={tableCellStyle}>{employee.name}</td>
              <td style={tableCellStyle}>{employee.attendance}</td>
              <td style={tableCellStyle}>{employee.overtime}</td>
              <td style={tableCellStyle}>{employee.undertime}</td>
              <td style={tableCellStyle}>{employee.absences}</td>
              <td style={tableCellStyle}>{employee.totalLogged}</td>
              <td style={tableCellStyle}>
                <p
                  onClick={() => handleViewClick(employee)}
                  style={viewButtonStyle}
                >
                  View
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p
        onClick={() => window.location.reload()}
        style={backButtonStyle}
      >
        Back to Departments
      </p>
    </div>
  );
};

// Styling
const tableHeaderStyle = {
  border: "1px solid #ddd",
  padding: "12px",
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

const backButtonStyle = {
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
  marginTop: "20px",
};

export default DepartmentDetails;