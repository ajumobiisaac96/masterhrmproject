// import React, { useEffect, useState } from "react";
// import "./AttendanceTable.css";

// const AttendanceTable = ({ endpoint }) => {
//   const [data, setData] = useState([]);
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   useEffect(() => {
//     if (startDate && endDate) {
//       const fetchData = async () => {
//         try {
//           const response = await fetch(`${endpoint}?startDate=${startDate}&endDate=${endDate}`);
//           const result = await response.json();
//           setData(result);
//         } catch (error) {
//           console.error("Error fetching attendance data:", error);
//         }
//       };

//       fetchData();
//     }
//   }, [startDate, endDate, endpoint]);

//   const handleDateChange = (event) => {
//     const { name, value } = event.target;
//     if (name === "startDate") setStartDate(value);
//     if (name === "endDate") setEndDate(value);
//   };

//   return (
//     <div className="table-container">
//       <div className="date-picker">
//         <label htmlFor="startDate">Start Date: </label>
//         <input
//           type="date"
//           id="startDate"
//           name="startDate"
//           value={startDate}
//           onChange={handleDateChange}
//         />
//         <label htmlFor="endDate">End Date: </label>
//         <input
//           type="date"
//           id="endDate"
//           name="endDate"
//           value={endDate}
//           onChange={handleDateChange}
//         />
//       </div>

//       <table className="attendance-table">
//         <thead>
//           <tr>
//             <th>Date</th>
//             <th>Clock-in Time</th>
//             <th>Clock-out Time</th>
//             <th>Hours Worked</th>
//             <th>Overtime Hours</th>
//             <th>Undertime Hours</th>
//             <th>Absences</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.length > 0 ? (
//             data.map((entry, index) => (
//               <tr key={index} className={index % 2 === 0 ? "even-row" : "odd-row"}>
//                 <td>{entry.date}</td>
//                 <td>{entry.clockInTime}</td>
//                 <td>{entry.clockOutTime}</td>
//                 <td>{entry.hoursWorked}</td>
//                 <td>{entry.overtimeHours}</td>
//                 <td>{entry.undertimeHours}</td>
//                 <td>{entry.absences}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="7" className="no-data">No data available</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AttendanceTable;

// // CSS File (AttendanceTable.css)

















// import React, { useEffect, useState } from "react";
// import "./AttendanceTable.css";

// const AttendanceTable = ({ year, month, token }) => {
//   const [data, setData] = useState([]);
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   useEffect(() => {
//     if (startDate && endDate) {
//       const fetchData = async () => {
//         try {
//           // Construct the API URL with year, month, startDate, and endDate as query parameters
//           const response = await fetch(
//             `https://proximahr.onrender.com/attendance/employee/attendance-tracking?year=${year}&month=${month}&startDate=${startDate}&endDate=${endDate}`,
//             {
//               headers: {
//                 "Authorization": `Bearer ${token}`, // Include token for authorization
//               },
//             }
//           );

//           if (!response.ok) {
//             throw new Error(`Error: ${response.status} ${response.statusText}`);
//           }

//           const result = await response.json();
//           setData(result);
//         } catch (error) {
//           console.error("Error fetching attendance data:", error);
//         }
//       };

//       fetchData();
//     }
//   }, [startDate, endDate, year, month, token]);

//   const handleDateChange = (event) => {
//     const { name, value } = event.target;
//     if (name === "startDate") setStartDate(value);
//     if (name === "endDate") setEndDate(value);
//   };

//   return (
//     <div className="table-container">
//       <div className="date-picker">
//         <label htmlFor="startDate">Start Date: </label>
//         <input
//           type="date"
//           id="startDate"
//           name="startDate"
//           value={startDate}
//           onChange={handleDateChange}
//         />
//         <label htmlFor="endDate">End Date: </label>
//         <input
//           type="date"
//           id="endDate"
//           name="endDate"
//           value={endDate}
//           onChange={handleDateChange}
//         />
//       </div>

//       <table className="attendance-table">
//         <thead>
//           <tr>
//             <th>Date</th>
//             <th>Clock-in Time</th>
//             <th>Clock-out Time</th>
//             <th>Hours Worked</th>
//             <th>Overtime Hours</th>
//             <th>Undertime Hours</th>
//             <th>Absences</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.length > 0 ? (
//             data.map((entry, index) => (
//               <tr key={index} className={index % 2 === 0 ? "even-row" : "odd-row"}>
//                 <td>{entry.date}</td>
//                 <td>{entry.clockInTime}</td>
//                 <td>{entry.clockOutTime}</td>
//                 <td>{entry.hoursWorked}</td>
//                 <td>{entry.overtimeHours}</td>
//                 <td>{entry.undertimeHours}</td>
//                 <td>{entry.absences}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="7" className="no-data">No data available</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AttendanceTable;














import React from 'react';

const AttendanceTable = ({ filteredData }) => {
  return (
    <div className="table-container" style={styles.tableContainer}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
            <th>Hours Worked</th>
            <th>Overtime Hours</th>
            <th>Undertime Hours</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((attendance, index) => (
              <tr key={index}>
                <td>{attendance.date}</td>
                <td>{attendance.attendance_status}</td>
                <td>{attendance.hours_worked || '0'}</td>
                <td>{attendance.overtime || '0'}</td>
                <td>{attendance.undertime || '0'}</td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="5">No records found</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  tableContainer: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    margin: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
};

export default AttendanceTable;
