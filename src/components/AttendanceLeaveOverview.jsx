// import React, { useState } from "react";
// import "./AttendanceLeaveOverview.css";

// const AttendanceLeaveOverview = () => {
//   const [month, setMonth] = useState("November 2024");

//   const handleMonthChange = (direction) => {
//     // Logic for changing months
//     console.log(direction);
//   };

//   return (
//     <div className="attendance-container">
//       <div className="attendance-grid">
//         {/* Monthly Attendance */}
//         <div className="card calendar-card">
//           <h2>Monthly Attendance</h2>
//           <div className="month-navigation">
//             < p onClick={() => handleMonthChange("prev")}>&lt;</p>
//             <span>{month}</span>
//             <p onClick={() => handleMonthChange("next")}>&gt;</p>
//           </div>
//           <div className="calendar">
//             {"Sun Mon Tue Wed Thu Fri Sat".split(" ").map((day) => (
//               <div key={day} className="day-header">
//                 {day}
//               </div>
//             ))}
//             {Array.from({ length: 30 }, (_, i) => i + 1).map((date) => (
//               <div
//                 key={date}
//                 className={`date ${
//                   date === 14 || date === 15
//                     ? "absent"
//                     : date === 6 || date === 28
//                     ? "undertime"
//                     : date === 3 || date === 24 || date === 5
//                     ? "leave"
//                     : "present"
//                 }`}
//               >
//                 {date}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Right Side - Leave Overview and Recent Leave History */}
//         <div className="right-side">
//           <div className="card leave-overview-card">
//             <h2>Leave Overview</h2>
//             <div className="leave-overview">
//               <p>Total Vacation Days: <span>30</span></p>
//               <p>Used Leave Days: <span>20</span></p>
//               <p>Remaining Leave Days: <span>10</span></p>
//               <p>Pending Leave Requests: <span>1</span></p>
//             </div>
//           </div>

//           <div className="card leave-history-card">
//             <h2>Recent Leave History</h2>
//             <div className="leave-history">
//               <p>
//                 Parental Leave: <span className="pending">Pending</span>
//                 <br />
//                 Nov 15, 2024 - Nov 20, 2024
//               </p>
//               <p>
//                 Sick Leave: <span className="approved">Approved</span>
//                 <br />
//                 Jun 15, 2024 - Jul 21, 2024
//               </p>
//               <p>
//                 Sick Leave: <span className="approved">Approved</span>
//                 <br />
//                 Feb 12, 2024 - Feb 20, 2024
//               </p>
//               <p>
//                 Personal Leave: <span className="rejected">Rejected</span>
//                 <br />
//                 Jan 15, 2024 - Jan 26, 2024
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AttendanceLeaveOverview;
















import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AttendanceLeaveOverview = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);  // Default to current month

  const selectedEmployeeId = localStorage.getItem('selectedEmployee_id');
  let accessToken = null;

  try {
    const authData = JSON.parse(localStorage.getItem('authData'));
    if (authData && authData.access_token) {
      accessToken = authData.access_token;
    }
  } catch (err) {
    console.error('Error parsing authData from local storage', err);
  }

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedEmployeeId || !accessToken) {
        console.error('Missing required authentication details:', { selectedEmployeeId, accessToken });
        setError('Missing required authentication details');
        setLoading(false);
        return;
      }

      try {
        // Fetch employee data (Personal, Compensation, etc.)
        const employeeResponse = await axios.get(
          `https://proximahr.onrender.com/api/v2/employee-management/${selectedEmployeeId}/employee`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        console.log('Employee Data:', employeeResponse.data);
        setEmployeeData(employeeResponse.data.data);

        // Fetch attendance data
        const attendanceResponse = await axios.get(
          `https://proximahr.onrender.com/api/v2/attendance-management/attendance`,
          {
            params: { employee_id: selectedEmployeeId },
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        console.log('Attendance Data:', attendanceResponse.data);
        setAttendanceData(attendanceResponse.data.attendance_summary);
        setLoading(false);
      } catch (err) {
        console.error('API request failed:', err.response ? err.response.data : err.message);
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedEmployeeId, accessToken]);

  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value));
  };

  // Filter attendance data for the selected month
  const filteredAttendance = attendanceData.filter(item => {
    const month = new Date(item.date).getMonth() + 1;
    return month === selectedMonth;
  });

  return (
    <div>
      {loading ? (
        <p>Loading attendance data...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div style={{ margin: '20px', border: '1px solid #ddd', borderRadius: '8px', padding: '20px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Attendance & Leave Overview</h2>

          {/* Month Dropdown */}
          <div style={{ marginBottom: '20px', textAlign: 'center' }}>
            <label htmlFor="month-select" style={{ fontSize: '16px', marginRight: '10px' }}>Select Month: </label>
            <select id="month-select" value={selectedMonth} onChange={handleMonthChange} style={{ padding: '8px', fontSize: '14px' }}>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i + 1}>{new Date(0, i).toLocaleString('en', { month: 'long' })}</option>
              ))}
            </select>
          </div>

          {/* Flex Container for Calendar and Leave Overview */}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>

            {/* Left Section: Calendar */}
            <div style={{ width: '65%', borderRight: '2px solid #ddd', paddingRight: '20px' }}>
              <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Monthly Attendance</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px' }}>
                {filteredAttendance.length > 0 ? (
                  filteredAttendance.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        backgroundColor:
                          item.attendance_status === 'present'
                            ? '#A2FAC3'
                            : item.attendance_status === 'absent'
                            ? '#FD9292'
                            : item.attendance_status === 'leave'
                            ? '#FAFC8B'
                            : item.attendance_status === 'undertime'
                            ? '#7EB1FF'
                            : '#ccc',
                        color: 'white',
                        padding: '10px',
                        textAlign: 'center',
                        borderRadius: '5px',
                      }}
                    >
                      <p>{new Date(item.date).getDate()}</p>
                    </div>
                  ))
                ) : (
                  <p style={{ textAlign: 'center' }}>No attendance data available for this employee in {new Date(0, selectedMonth - 1).toLocaleString('en', { month: 'long' })}.</p>
                )}
              </div>
            </div>

            {/* Right Section: Leave Overview */}
            <div style={{ width: '30%', paddingLeft: '20px' }}>
              <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Leave Overview</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                <div>
                  <p style={{ fontWeight: 'bold' }}>Total Vacation Days</p>
                  <p style={{ fontWeight: 'bold', color: 'green' }}>{employeeData?.annual_leave_days}</p>
                </div>
                <div>
                  <p style={{ fontWeight: 'bold' }}>Used Leave Days</p>
                  <p style={{ fontWeight: 'bold', color: 'red' }}>{employeeData?.used_leave_days}</p>
                </div>
                <div>
                  <p style={{ fontWeight: 'bold' }}>Remaining Leave Days</p>
                  <p style={{ fontWeight: 'bold', color: 'green' }}>
                    {employeeData?.annual_leave_days - employeeData?.used_leave_days}
                  </p>
                </div>
                <div>
                  <p style={{ fontWeight: 'bold' }}>Pending Leave Requests</p>
                  <p style={{ fontWeight: 'bold', color: 'orange' }}></p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceLeaveOverview;








