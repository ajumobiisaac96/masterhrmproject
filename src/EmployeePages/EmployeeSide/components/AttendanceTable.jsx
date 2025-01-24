import React, { useEffect, useState } from "react";
import "./AttendanceTable.css";

const AttendanceTable = ({ endpoint }) => {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (startDate && endDate) {
      const fetchData = async () => {
        try {
          const response = await fetch(`${endpoint}?startDate=${startDate}&endDate=${endDate}`);
          const result = await response.json();
          setData(result);
        } catch (error) {
          console.error("Error fetching attendance data:", error);
        }
      };

      fetchData();
    }
  }, [startDate, endDate, endpoint]);

  const handleDateChange = (event) => {
    const { name, value } = event.target;
    if (name === "startDate") setStartDate(value);
    if (name === "endDate") setEndDate(value);
  };

  return (
    <div className="table-container">
      <div className="date-picker">
        <label htmlFor="startDate">Start Date: </label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={startDate}
          onChange={handleDateChange}
        />
        <label htmlFor="endDate">End Date: </label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={endDate}
          onChange={handleDateChange}
        />
      </div>

      <table className="attendance-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Clock-in Time</th>
            <th>Clock-out Time</th>
            <th>Hours Worked</th>
            <th>Overtime Hours</th>
            <th>Undertime Hours</th>
            <th>Absences</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((entry, index) => (
              <tr key={index} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                <td>{entry.date}</td>
                <td>{entry.clockInTime}</td>
                <td>{entry.clockOutTime}</td>
                <td>{entry.hoursWorked}</td>
                <td>{entry.overtimeHours}</td>
                <td>{entry.undertimeHours}</td>
                <td>{entry.absences}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="no-data">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;

// CSS File (AttendanceTable.css)
