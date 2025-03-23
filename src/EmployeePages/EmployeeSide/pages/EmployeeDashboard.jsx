












// import React, { useState, useEffect } from 'react';
// import Sidebar from '../components/Sidebar';
// import EmployeeNavbar from '../components/EmployeeNavbar.jsx';
// import './EmployeeDashboard.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// const EmployeeDashboard = () => {
//   const currentYear = new Date().getFullYear();
//   const currentMonth = new Date().getMonth() + 1;  // 1-based month

//   const [attendanceStats, setAttendanceStats] = useState({
//     attendance_percentage: 0,
//     annual_leave_balance: 0,
//     net_pay: 0,
//     total_overtime_hours: 0,
//   });
  
//   const [loading, setLoading] = useState(true);
  
//   // Fetch data from the Employee Monthly Stats API
//   useEffect(() => {
//     const authData = JSON.parse(localStorage.getItem('employeeAuthToken'));
//     const token = authData?.token;
//     // const token = localStorage.getItem('employeeAuthToken');
//     if (!token) {
//       console.error('No token found. Redirecting to login.');
//       window.location.href = '/login'; // Redirect to login if no token
//       return;
//     }

//     const fetchMonthlyStats = async () => {
//       try {
//         const response = await fetch(`https://proximahr.onrender.com/attendance/employee/monthly-stats?month=${currentMonth}&year=${currentYear}`, {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//         });

//         const data = await response.json();
//         console.log('Employee Monthly Stats Response:', data);

//         setAttendanceStats({
//           attendance_percentage: data.attendance_percentage || 0,
//           annual_leave_balance: data.annual_leave_balance || 0,
//           net_pay: data.net_pay || 0,
//           total_overtime_hours: data.total_overtime_hours || 0,
//         });

//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching employee stats:', error);
//         setLoading(false);
//       }
//     };

//     fetchMonthlyStats();
//   }, [currentMonth, currentYear]);

//   if (loading) {
//     return <div>Loading...</div>; // Show loading message while data is being fetched
//   }

//   return (
//     <div>
//       <div className="main-dashboard">
//         <Sidebar />
//         <div className="dashboard">
//           <EmployeeNavbar />
//           <hr className="horizontal" />

//           {/* Employee Dashboard Info Section */}
//           <div className="employee-dashboard-info" style={{ display: 'flex' }}>
//             <div className="dashboard-details" style={{ flexDirection: 'column', alignItems: 'flex-start', height: '40px' }}>
//               <h5>Employee Dashboard</h5>
//               <h6>{`${new Date().getDate()} ${new Date().toLocaleString('default', { month: 'long' })} ${new Date().getFullYear()}`}</h6>
//             </div>

//             <div className="employee-dashboard-info" style={{ display: 'flex', flexDirection: 'column' }}>
//                 <h1>Working Hours</h1>
//                 <div className="clock" style={{ display: 'flex', alignItems: 'center', marginTop: '-20px' }}>
//                     <div className="timer"
//                         style={{
//                             width: '100px',
//                             height: '38px',
//                             padding: '8px',
//                             marginTop: '10px',
//                             borderRadius: '4px',
//                             border: '1px solid #F8F8F8',
//                             background: '#D9D9D9'
//                         }}>00:00:00</div>
//                     <button style={{ width: '100px' }}>
//                         <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" /> Clock Out
//                     </button>
//                 </div>
//             </div>


//           </div>

//           {/* First Four Cards */}
//           <div className="dashboard-details-1" style={{ marginBottom: '30px' }}>
//             <div className="first-grid">
//               <FontAwesomeIcon icon="fa-solid fa-check-circle" className="dashboard-icon" style={{ color: '#22C55E' }} />
//               <div>
//                 <h6>Attendance Percentage</h6>
//                 <h5>{loading ? 'Loading...' : `${attendanceStats.attendance_percentage}%`}</h5>
//               </div>
//             </div>

//             <div className="first-grid">
//               <FontAwesomeIcon icon="fa-solid fa-calendar" className="dashboard-icon" />
//               <div>
//                 <h6>Leave Balance</h6>
//                 <h5>{loading ? 'Loading...' : `${attendanceStats.annual_leave_balance} Days`}</h5>
//               </div>
//             </div>

//             <div className="first-grid">
//               <FontAwesomeIcon icon="fa-solid fa-dollar-sign" className="dashboard-icon" style={{ color: '#6F42C1' }} />
//               <div>
//                 <h6>Net Pay</h6>
//                 <h5>{loading ? 'Loading...' : `₦${attendanceStats.net_pay}`}</h5>
//               </div>
//             </div>

//             <div className="first-grid">
//               <FontAwesomeIcon icon="fa-solid fa-clock" className="dashboard-icon" style={{ color: '#FFD700' }} />
//               <div>
//                 <h6>Overtime Hours</h6>
//                 <h5>{loading ? 'Loading...' : `${attendanceStats.total_overtime_hours} Hours`}</h5>
//               </div>
//             </div>
//           </div>

//           {/* Other Sections - Static or Dummy Data */}
//           <div className="dashboard-details-2">
//             <div className="grid">
//               <h1>Clock In / Clock Out</h1>
//               <hr />
//               <div className="firstCol" style={{ display: 'flex', alignItems: 'center' }}>
//                 <div className="left-side">
//                   <h5>Clock In</h5>
//                   <h6>00 : 00 : 00</h6>
//                 </div>
//                 <div className="right-side-col">
//                   <h5>Clock Out</h5>
//                   <h6>00 : 00 : 00</h6>
//                 </div>
//               </div>

//               <div className="priority">
//                 <h5>Lunch Break</h5>
//                 <div>
//                   <h6 style={{ background: 'none', color: '#4E4E4E' }}>01:00pm - 01:30pm</h6>
//                 </div>
//               </div>

//               <div className="TaskProgress">
//                 <div className="firstCol" style={{ display: 'flex', alignItems: 'center' }}>
//                   <div className="left-side">
//                     <h5>Working Hours</h5>
//                     <h6>00 : 00 : 00</h6>
//                   </div>
//                   <div className="right-side-col">
//                     <h5>Break Time</h5>
//                     <h6>00 : 00 : 00</h6>
//                   </div>
//                 </div>
//               </div>

//               <div className="last-div">
//                 <button style={{ background: '#007BFF', color: '#fff', width: '200px' }}>
//                   <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" /> Clock In
//                 </button>
//               </div>
//               <button style={{ color: '#2E2E2E', border: ' 1px solid #2E2E2E', width: '200px' }}>
//                 <FontAwesomeIcon icon="fa-solid fa-mug-hot" /> Start Break
//               </button>
//             </div>

//             {/* Leave Requests Section */}
//             <div className="grid">
//               <h1>Leave Requests</h1>
//               <hr />
//               <h5>Number of pending Leave Requests</h5>
//               <h6>0 pending Tasks</h6>

//               <div className="priority">
//                 <h5>Number of available remaining</h5>
//                 <h6 style={{ background: 'none', border: '1px solid #D9D9D9', color: '#2E2E2E', textAlign: 'left', width: '100px' }}>
//                   0 Days
//                 </h6>
//               </div>

//               <div className="TaskProgress">
//                 <h5>Number of approved leaves</h5>
//                 <h6 style={{ background: 'none', border: '1px solid #D9D9D9', color: '#2E2E2E', textAlign: 'left', width: '200px' }}>
//                   3 Approved Leaves
//                 </h6>
//               </div>

//               <div className="last-div">
//                 <button style={{ width: '200px', background: '#007BFF', color: '#fff' }}>
//                   <FontAwesomeIcon icon="fa-solid fa-calendar" /> Request Leave
//                 </button>
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeDashboard;





















// import React, { useState, useEffect } from 'react';
// import Sidebar from '../components/Sidebar';
// import EmployeeNavbar from '../components/EmployeeNavbar.jsx';
// import './EmployeeDashboard.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// const EmployeeDashboard = () => {
//   const currentYear = new Date().getFullYear();
//   const currentMonth = new Date().getMonth() + 1;

//   const [attendanceStats, setAttendanceStats] = useState({
//     attendance_percentage: 0,
//     annual_leave_balance: 0,
//     net_pay: 0,
//     total_overtime_hours: 0,
//   });

//   const [workingHours, setWorkingHours] = useState(0);
//   const [breakTime, setBreakTime] = useState(0);
//   const [isTimerRunning, setIsTimerRunning] = useState(false);
//   const [isBreakActive, setIsBreakActive] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [clockInTime, setClockInTime] = useState(null);
//   const [clockOutTime, setClockOutTime] = useState(null);

//   useEffect(() => {
//     const authData = JSON.parse(localStorage.getItem('employeeAuthToken'));
//     const token = authData?.token;
//     if (!token) {
//       console.error('No token found. Redirecting to login.');
//       window.location.href = '/login'; 
//       return;
//     }

//     const fetchMonthlyStats = async () => {
//       try {
//         const response = await fetch(`https://proximahr.onrender.com/attendance/employee/monthly-stats?month=${currentMonth}&year=${currentYear}`, {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//         });

//         const data = await response.json();
//         console.log('Employee Monthly Stats Response:', data);

//         setAttendanceStats({
//           attendance_percentage: data.attendance_percentage || 0,
//           annual_leave_balance: data.annual_leave_balance || 0,
//           net_pay: data.net_pay || 0,
//           total_overtime_hours: data.total_overtime_hours || 0,
//         });

//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching employee stats:', error);
//         setLoading(false);
//       }
//     };

//     fetchMonthlyStats();
//   }, [currentMonth, currentYear]);

//   const startTimer = async () => {
//     const authData = JSON.parse(localStorage.getItem('employeeAuthToken'));
//     const token = authData?.token;
//     if (!token) {
//       console.error('No token found.');
//       return;
//     }

//     const response = await fetch('https://proximahr.onrender.com/attendance/employee/timer/start', {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//       },
//     });

//     if (response.ok) {
//       const data = await response.json();
//       console.log('Timer started:', data);
//       setIsTimerRunning(true);
//       setClockInTime(new Date()); // Log the clock-in time
//     }
//   };

//   const pauseTimer = async () => {
//     const authData = JSON.parse(localStorage.getItem('employeeAuthToken'));
//     const token = authData?.token;
//     if (!token) {
//       console.error('No token found.');
//       return;
//     }

//     const response = await fetch('https://proximahr.onrender.com/attendance/employee/timer/pause', {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//       },
//     });

//     if (response.ok) {
//       const data = await response.json();
//       console.log('Timer paused:', data);
//       setIsBreakActive(true);
//     }
//   };

//   const resumeTimer = async () => {
//     const authData = JSON.parse(localStorage.getItem('employeeAuthToken'));
//     const token = authData?.token;
//     if (!token) {
//       console.error('No token found.');
//       return;
//     }

//     const response = await fetch('https://proximahr.onrender.com/attendance/employee/timer/resume', {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//       },
//     });

//     if (response.ok) {
//       const data = await response.json();
//       console.log('Timer resumed:', data);
//       setIsBreakActive(false);
//     }
//   };

//   const stopTimer = async () => {
//     const authData = JSON.parse(localStorage.getItem('employeeAuthToken'));
//     const token = authData?.token;
//     if (!token) {
//       console.error('No token found.');
//       return;
//     }

//     const response = await fetch('https://proximahr.onrender.com/attendance/employee/timer/stop', {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//       },
//     });

//     if (response.ok) {
//       const data = await response.json();
//       console.log('Timer stopped:', data);
//       setIsTimerRunning(false);
//       setClockOutTime(new Date()); // Log the clock-out time

//       // Trigger the Daily Attendance endpoint
//       await fetch('https://proximahr.onrender.com/attendance/employee/daily-attendance', {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       })
//         .then((res) => res.json())
//         .then((data) => console.log('Daily Attendance Summary:', data));
//     }
//   };

//   const formatTime = (timeInMillis) => {
//     const hours = Math.floor(timeInMillis / 3600000);
//     const minutes = Math.floor((timeInMillis % 3600000) / 60000);
//     const seconds = Math.floor((timeInMillis % 60000) / 1000);
//     return `${hours}:${minutes}:${seconds}`;
//   };

//   // For timer
//   useEffect(() => {
//     let timer;
//     if (isTimerRunning) {
//       timer = setInterval(() => {
//         setWorkingHours((prev) => prev + 1000); // increase by 1 second
//       }, 1000);
//     } else if (!isTimerRunning && clockInTime && clockOutTime) {
//       setWorkingHours(0); // Reset when timer stops
//     }
//     return () => clearInterval(timer);
//   }, [isTimerRunning, clockInTime, clockOutTime]);

//   useEffect(() => {
//     let breakTimer;
//     if (isBreakActive) {
//       breakTimer = setInterval(() => {
//         setBreakTime((prev) => prev + 1000); // Increase by 1 second for break time
//       }, 1000);
//     } else if (!isBreakActive) {
//       setBreakTime(0); // Reset break timer
//     }
//     return () => clearInterval(breakTimer);
//   }, [isBreakActive]);

//   return (
//     <div>
//       <div className="main-dashboard">
//         <Sidebar />
//         <div className="dashboard">
//           <EmployeeNavbar />
//           <hr className="horizontal" />

//           {/* Employee Dashboard Info Section */}
//           <div className="employee-dashboard-info" style={{ display: 'flex' }}>
//             <div className="dashboard-details" style={{ flexDirection: 'column', alignItems: 'flex-start', height: '40px' }}>
//               <h5>Employee Dashboard</h5>
//               <h6>{`${new Date().getDate()} ${new Date().toLocaleString('default', { month: 'long' })} ${new Date().getFullYear()}`}</h6>
//             </div>

//             <div className="employee-dashboard-info" style={{ display: 'flex', flexDirection: 'column' }}>
//               <h1>Working Hours</h1>
//               <div className="clock" style={{ display: 'flex', alignItems: 'center', marginTop: '-20px' }}>
//                 <div className="timer" style={{ width: '100px', height: '38px', padding: '8px', marginTop: '10px', borderRadius: '4px', border: '1px solid #F8F8F8', background: '#D9D9D9' }}>
//                   {formatTime(workingHours)}
//                 </div>
//                 <button style={{ width: '100px' }} onClick={isTimerRunning ? stopTimer : startTimer}>
//                   <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" /> {isTimerRunning ? 'Clock Out' : 'Clock In'}
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* First Four Cards */}
//           <div className="dashboard-details-1" style={{ marginBottom: '30px' }}>
//             <div className="first-grid">
//               <FontAwesomeIcon icon="fa-solid fa-check-circle" className="dashboard-icon" style={{ color: '#22C55E' }} />
//               <div>
//                 <h6>Attendance Percentage</h6>
//                 <h5>{loading ? 'Loading...' : `${attendanceStats.attendance_percentage}%`}</h5>
//               </div>
//             </div>

//             <div className="first-grid">
//               <FontAwesomeIcon icon="fa-solid fa-calendar" className="dashboard-icon" />
//               <div>
//                 <h6>Leave Balance</h6>
//                 <h5>{loading ? 'Loading...' : `${attendanceStats.annual_leave_balance} Days`}</h5>
//               </div>
//             </div>
//             <div className="first-grid">
//               <FontAwesomeIcon icon="fa-solid fa-dollar-sign" className="dashboard-icon" style={{ color: '#6F42C1' }} />
//               <div>
//                 <h6>Net Pay</h6>
//                 <h5>{loading ? 'Loading...' : `₦${attendanceStats.net_pay}`}</h5>
//               </div>
//             </div>

//             <div className="first-grid">
//               <FontAwesomeIcon icon="fa-solid fa-clock" className="dashboard-icon" style={{ color: '#FFD700' }} />
//               <div>
//                 <h6>Overtime Hours</h6>
//                 <h5>{loading ? 'Loading...' : `${attendanceStats.total_overtime_hours} Hours`}</h5>
//               </div>
//             </div>
//           </div>

//           {/* Clock In / Clock Out Section */}
//           <div className="grid">
//             <h1>Clock In / Clock Out</h1>
//             <hr />
//             <div className="firstCol" style={{ display: 'flex', alignItems: 'center' }}>
//               <div className="left-side">
//                 <h5>Clock In</h5>
//                 <h6>{clockInTime ? clockInTime.toLocaleTimeString() : 'Not yet clocked in'}</h6>
//               </div>
//               <div className="right-side-col">
//                 <h5>Clock Out</h5>
//                 <h6>{clockOutTime ? clockOutTime.toLocaleTimeString() : 'Not yet clocked out'}</h6>
//               </div>
//             </div>

//             <div className="priority">
//               <h5>Lunch Break</h5>
//               <div>
//                 <h6 style={{ background: 'none', color: '#4E4E4E' }}>
//                   {isBreakActive ? 'Break Active' : 'No Break'}
//                 </h6>
//               </div>
//             </div>

//             <div className="TaskProgress">
//               <div className="firstCol" style={{ display: 'flex', alignItems: 'center' }}>
//                 <div className="left-side">
//                   <h5>Working Hours</h5>
//                   <h6>{formatTime(workingHours)}</h6>
//                 </div>
//                 <div className="right-side-col">
//                   <h5>Break Time</h5>
//                   <h6>{formatTime(breakTime)}</h6>
//                 </div>
//               </div>
//             </div>

//             <div className="last-div">
//               <button style={{ background: '#007BFF', color: '#fff', width: '200px' }} onClick={isTimerRunning ? stopTimer : startTimer}>
//                 <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" />
//                 {isTimerRunning ? 'Clock Out' : 'Clock In'}
//               </button>
//             </div>
//             <button
//               style={{ color: '#2E2E2E', border: '1px solid #2E2E2E', width: '200px' }}
//               onClick={isBreakActive ? resumeTimer : pauseTimer}
//             >
//               <FontAwesomeIcon icon="fa-solid fa-mug-hot" />
//               {isBreakActive ? 'End Break' : 'Start Break'}
//             </button>
//           </div>

//           {/* Leave Requests Section */}
//           <div className="grid">
//             <h1>Leave Requests</h1>
//             <hr />
//             <h5>Number of pending Leave Requests</h5>
//             <h6>0 pending Tasks</h6>

//             <div className="priority">
//               <h5>Number of available remaining</h5>
//               <h6
//                 style={{
//                   background: 'none',
//                   border: '1px solid #D9D9D9',
//                   color: '#2E2E2E',
//                   textAlign: 'left',
//                   width: '100px',
//                 }}
//               >
//                 0 Days
//               </h6>
//             </div>

//             <div className="TaskProgress">
//               <h5>Number of approved leaves</h5>
//               <h6
//                 style={{
//                   background: 'none',
//                   border: '1px solid #D9D9D9',
//                   color: '#2E2E2E',
//                   textAlign: 'left',
//                   width: '200px',
//                 }}
//               >
//                 3 Approved Leaves
//               </h6>
//             </div>

//             <div className="last-div">
//               <button style={{ width: '200px', background: '#007BFF', color: '#fff' }}>
//                 <FontAwesomeIcon icon="fa-solid fa-calendar" />
//                 Request Leave
//               </button>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeDashboard;


           









import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import EmployeeNavbar from '../components/EmployeeNavbar.jsx';
import './EmployeeDashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const EmployeeDashboard = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const [attendanceStats, setAttendanceStats] = useState({
    attendance_percentage: 0,
    annual_leave_balance: 0,
    net_pay: 0,
    total_overtime_hours: 0,
  });

  const [leaveStats, setLeaveStats] = useState({
    pending_leave_requests: 0,
    remaining_leave_days: 0,
    approved_leave_requests: 0,
  });

  const [workingHours, setWorkingHours] = useState(0);
  const [breakTime, setBreakTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isBreakActive, setIsBreakActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [clockInTime, setClockInTime] = useState(null);
  const [clockOutTime, setClockOutTime] = useState(null);

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem('employeeAuthToken'));
    const token = authData?.token;
    if (!token) {
      console.error('No token found. Redirecting to login.');
      window.location.href = '/login'; 
      return;
    }

    // Fetch Monthly Stats (Attendance, Leave Balance, etc.)
    const fetchMonthlyStats = async () => {
      try {
        const response = await fetch(`https://proximahr.onrender.com/attendance/employee/monthly-stats?month=${currentMonth}&year=${currentYear}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log('Employee Monthly Stats Response:', data);
        setAttendanceStats({
          attendance_percentage: data.attendance_percentage || 0,
          annual_leave_balance: data.annual_leave_balance || 0,
          net_pay: data.net_pay || 0,
          total_overtime_hours: data.total_overtime_hours || 0,
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching employee stats:', error);
        setLoading(false);
      }
    };

    // Fetch Leave Statistics (Pending, Remaining, Approved Leave Requests)
    const fetchLeaveStats = async () => {
      try {
        const response = await fetch('https://proximahr.onrender.com/employee/leave-statistics', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log('Leave Statistics:', data);
        setLeaveStats({
          pending_leave_requests: data.pending_leave_requests || 0,
          remaining_leave_days: data.remaining_leave_days || 0,
          approved_leave_requests: data.approved_leave_requests || 0,
        });
      } catch (error) {
        console.error('Error fetching leave stats:', error);
      }
    };

    fetchMonthlyStats();
    fetchLeaveStats();
  }, [currentMonth, currentYear]);

  const startTimer = async () => {
    const authData = JSON.parse(localStorage.getItem('employeeAuthToken'));
    const token = authData?.token;
    if (!token) {
      console.error('No token found.');
      return;
    }

    const response = await fetch('https://proximahr.onrender.com/attendance/employee/timer/start', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Timer started:', data);
      setIsTimerRunning(true);
      setClockInTime(new Date());
    }
  };

  const pauseTimer = async () => {
    const authData = JSON.parse(localStorage.getItem('employeeAuthToken'));
    const token = authData?.token;
    if (!token) {
      console.error('No token found.');
      return;
    }

    const response = await fetch('https://proximahr.onrender.com/attendance/employee/timer/pause', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Timer paused:', data);
      setIsBreakActive(true);
    }
  };

  const resumeTimer = async () => {
    const authData = JSON.parse(localStorage.getItem('employeeAuthToken'));
    const token = authData?.token;
    if (!token) {
      console.error('No token found.');
      return;
    }

    const response = await fetch('https://proximahr.onrender.com/attendance/employee/timer/resume', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Timer resumed:', data);
      setIsBreakActive(false);
    }
  };

  const stopTimer = async () => {
    const authData = JSON.parse(localStorage.getItem('employeeAuthToken'));
    const token = authData?.token;
    if (!token) {
      console.error('No token found.');
      return;
    }

    const response = await fetch('https://proximahr.onrender.com/attendance/employee/timer/stop', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Timer stopped:', data);
      setIsTimerRunning(false);
      setClockOutTime(new Date());

      // Trigger the Daily Attendance endpoint
      await fetch('https://proximahr.onrender.com/attendance/employee/daily-attendance', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => console.log('Daily Attendance Summary:', data));
    }
  };

  const formatTime = (timeInMillis) => {
    const hours = Math.floor(timeInMillis / 3600000);
    const minutes = Math.floor((timeInMillis % 3600000) / 60000);
    const seconds = Math.floor((timeInMillis % 60000) / 1000);
    return `${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    let timer;
    if (isTimerRunning) {
      timer = setInterval(() => {
        setWorkingHours((prev) => prev + 1000); // increase by 1 second
      }, 1000);
    } else if (!isTimerRunning && clockInTime && clockOutTime) {
      setWorkingHours(0); // Reset when timer stops
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, clockInTime, clockOutTime]);

  useEffect(() => {
    let breakTimer;
    if (isBreakActive) {
      breakTimer = setInterval(() => {
        setBreakTime((prev) => prev + 1000); // Increase by 1 second for break time
      }, 1000);
    } else if (!isBreakActive) {
      setBreakTime(0); // Reset break timer
    }
    return () => clearInterval(breakTimer);
  }, [isBreakActive]);

  return (
    <div>
      <div className="main-dashboard">
        <Sidebar />
        <div className="dashboard">
          <EmployeeNavbar />
          <hr className="horizontal" />

          {/* Employee Dashboard Info Section */}
          <div className="employee-dashboard-info" style={{ display: 'flex' }}>
            <div className="dashboard-details" style={{ flexDirection: 'column', alignItems: 'flex-start', height: '40px' }}>
              <h5>Employee Dashboard</h5>
              <h6>{`${new Date().getDate()} ${new Date().toLocaleString('default', { month: 'long' })} ${new Date().getFullYear()}`}</h6>
            </div>

            <div className="employee-dashboard-info" style={{ display: 'flex', flexDirection: 'column' }}>
              <h1>Working Hours</h1>
              <div className="clock" style={{ display: 'flex', alignItems: 'center', marginTop: '-20px' }}>
                <div className="timer" style={{ width: '100px', height: '38px', padding: '8px', marginTop: '10px', borderRadius: '4px', border: '1px solid #F8F8F8', background: '#D9D9D9' }}>
                  {formatTime(workingHours)}
                </div>
                <button style={{ width: '100px' }} onClick={isTimerRunning ? stopTimer : startTimer}>
                  <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" /> {isTimerRunning ? 'Clock Out' : 'Clock In'}
                </button>
              </div>
            </div>
          </div>

          {/* First Four Cards */}
          <div className="dashboard-details-1" style={{ marginBottom: '30px' }}>
            <div className="first-grid">
              <FontAwesomeIcon icon="fa-solid fa-check-circle" className="dashboard-icon" style={{ color: '#22C55E' }} />
              <div>
                <h6>Attendance Percentage</h6>
                <h5>{loading ? 'Loading...' : `${attendanceStats.attendance_percentage}%`}</h5>
              </div>
            </div>

            <div className="first-grid">
              <FontAwesomeIcon icon="fa-solid fa-calendar" className="dashboard-icon" />
              <div>
                <h6>Leave Balance</h6>
                <h5>{loading ? 'Loading...' : `${attendanceStats.annual_leave_balance} Days`}</h5>
              </div>
            </div>
            <div className="first-grid">
              <FontAwesomeIcon icon="fa-solid fa-dollar-sign" className="dashboard-icon" style={{ color: '#6F42C1' }} />
              <div>
                <h6>Net Pay</h6>
                <h5>{loading ? 'Loading...' : `₦${attendanceStats.net_pay}`}</h5>
              </div>
            </div>

            <div className="first-grid">
              <FontAwesomeIcon icon="fa-solid fa-clock" className="dashboard-icon" style={{ color: '#FFD700' }} />
              <div>
                <h6>Overtime Hours</h6>
                <h5>{loading ? 'Loading...' : `${attendanceStats.total_overtime_hours} Hours`}</h5>
              </div>
            </div>
          </div>










{/* Clock In / Clock Out Section */}
      <div className="grid">
        <h1>Clock In / Clock Out</h1>
        <hr />
        <div className="firstCol" style={{ display: 'flex', alignItems: 'center' }}>
          <div className="left-side">
            <h5>Clock In</h5>
            <h6>{clockInTime ? clockInTime.toLocaleTimeString() : 'Not yet clocked in'}</h6>
          </div>
          <div className="right-side-col">
            <h5>Clock Out</h5>
            <h6>{clockOutTime ? clockOutTime.toLocaleTimeString() : 'Not yet clocked out'}</h6>
        </div>
        </div>

        <div className="priority">
          <h5>Lunch Break</h5>
          <div>
            <h6 style={{ background: 'none', color: '#4E4E4E' }}>
              {isBreakActive ? 'Break Active' : 'No Break'}
            </h6>
          </div>
        </div>

        <div className="TaskProgress">
          <div className="firstCol" style={{ display: 'flex', alignItems: 'center' }}>
            <div className="left-side">
              <h5>Working Hours</h5>
              <h6>{formatTime(workingHours)}</h6>
            </div>
            <div className="right-side-col">
              <h5>Break Time</h5>
              <h6>{formatTime(breakTime)}</h6>

            </div>
          </div>
      </div>

        <div className="last-div">
          <button style={{ background: '#007BFF', color: '#fff', width: '200px' }} onClick={isTimerRunning ? stopTimer : startTimer}>
            <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" />
            {isTimerRunning ? 'Clock Out' : 'Clock In'}
        </button>
        </div>
      <button
        style={{ color: '#2E2E2E', border: '1px solid #2E2E2E', width: '200px' }}
        onClick={isBreakActive ? resumeTimer : pauseTimer}
      >
        <FontAwesomeIcon icon="fa-solid fa-mug-hot" />
        {isBreakActive ? 'End Break' : 'Start Break'}
      </button>
    </div>









          {/* Leave Requests Section */}
          <div className="grid">
            <h1>Leave Requests</h1>
            <hr />
            <h5>Number of pending Leave Requests</h5>
            <h6>{leaveStats.pending_leave_requests} pending Tasks</h6>

            <div className="priority">
              <h5>Number of available remaining</h5>
              <h6 style={{ background: 'none', border: '1px solid #D9D9D9', color: '#2E2E2E', textAlign: 'left', width: '100px' }}>
                {leaveStats.remaining_leave_days} Days
              </h6>
            </div>

            <div className="TaskProgress">
              <h5>Number of approved leaves</h5>
              <h6 style={{ background: 'none', border: '1px solid #D9D9D9', color: '#2E2E2E', textAlign: 'left', width: '200px' }}>
                {leaveStats.approved_leave_requests} Approved Leaves
              </h6>
            </div>

            <div className="last-div">
              <button style={{ width: '200px', background: '#007BFF', color: '#fff' }}>
                <FontAwesomeIcon icon="fa-solid fa-calendar" />
                Request Leave
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;


