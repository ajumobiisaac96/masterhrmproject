

// import React, { useState, useEffect } from 'react';
// import Sidebar from '../components/Sidebar';
// import EmployeeNavbar from '../components/EmployeeNavbar.jsx';
// import './EmployeeDashboard.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Link } from 'react-router-dom';

// const EmployeeDashboard = () => {
//   const currentYear = new Date().getFullYear();
//   const currentMonth = new Date().getMonth() + 1;

//   const [attendanceStats, setAttendanceStats] = useState({
//     attendance_percentage: 0,
//     annual_leave_balance: 0,
//     net_pay: 0,
//     total_overtime_hours: 0,
//   });

//   const [leaveStats, setLeaveStats] = useState({
//     pending_leave_requests: 0,
//     remaining_leave_days: 0,
//     approved_leave_requests: 0,
//   });

//   // const [workingHours, setWorkingHours] = useState(0);
//   // const [breakTime, setBreakTime] = useState(0);
//   // const [isTimerRunning, setIsTimerRunning] = useState(false);
//   // const [isBreakActive, setIsBreakActive] = useState(false);
//   // const [loading, setLoading] = useState(true);
//   // const [clockInTime, setClockInTime] = useState(null);
//   // const [clockOutTime, setClockOutTime] = useState(null);



//   const [workingHours, setWorkingHours] = useState(0);
//   const [breakTime, setBreakTime] = useState(0);
//   const [isTimerRunning, setIsTimerRunning] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [isBreakActive, setIsBreakActive] = useState(false);
//   const [clockInTime, setClockInTime] = useState(null);
//   const [clockOutTime, setClockOutTime] = useState(null);

//   const [attendanceSummary, setAttendanceSummary] = useState({
//     attendance_percentage: 0,
//     days_worked: 0,
//     days_absent: 0,
//     undertime_hours: 0,
//     overtime_hours: 0,
//   });

//   const [compensationData, setCompensationData] = useState({
//     payment_status: 'Unpaid',
//     last_salary: 0,
//     next_salary_date: '',
//   });

//   useEffect(() => {
//     const authData = JSON.parse(localStorage.getItem('employeeAuthToken'));
//     const token = authData?.access_token;
//     console.log("Token:", token);
//     if (!token) {
//       console.error('No token found. Redirecting to login.');
//       window.location.href = '/login'; 
//       return;
//     }

//     // Fetch Monthly Stats (Attendance, Leave Balance, etc.)
//     const fetchMonthlyStats = async () => {
//       try {
//         const response = await fetch(`https://proximahr.onrender.com/api/v2/attendance/employee/monthly-stats?month=${currentMonth}&year=${currentYear}`, {
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

//     // Fetch Leave Statistics (Pending, Remaining, Approved Leave Requests)
//     const fetchLeaveStats = async () => {
//       try {
//         const response = await fetch('https://proximahr.onrender.com/api/v2/employee/leave-statistics', {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//         });
//         const data = await response.json();
//         console.log('Leave Statistics:', data);
//         setLeaveStats({
//           pending_leave_requests: data.pending_leave_requests || 0,
//           remaining_leave_days: data.remaining_leave_days || 0,
//           approved_leave_requests: data.approved_leave_requests || 0,
//         });
//       } catch (error) {
//         console.error('Error fetching leave stats:', error);
//       }
//     };

//     // Fetch Attendance Summary
//     const fetchAttendanceSummary = async () => {
//       try {
//         const response = await fetch('https://proximahr.onrender.com/api/v2/attendance/employee/attendance-summary', {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//         });
//         const data = await response.json();
//         console.log('Attendance Summary:', data);
//         setAttendanceSummary({
//           attendance_percentage: data.attendance_percentage || 0,
//           days_worked: data.days_worked || 0,
//           days_absent: data.absences || 0,
//           undertime_hours: data.undertime_hours || 0,
//           overtime_hours: data.total_overtime_hours || 0,
//         });
//       } catch (error) {
//         console.error('Error fetching attendance summary:', error);
//       }
//     };

//     fetchMonthlyStats();
//     fetchLeaveStats();
//     fetchAttendanceSummary();
//   }, [currentMonth, currentYear]);

//   useEffect(() => {
//     const paymentStatus = attendanceStats.net_pay ? 'Paid' : 'Unpaid';
//     const nextSalaryDate = new Date(currentYear, currentMonth, 0).toLocaleDateString(); // Last day of the current month

//     setCompensationData({
//       payment_status: paymentStatus,
//       last_salary: attendanceStats.net_pay || 0,
//       next_salary_date: nextSalaryDate,
//     });
//   }, [attendanceStats]);

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
//   };

//   const startTimer = async () => {

//     const authData = JSON.parse(localStorage.getItem('employeeAuthToken'));
//     const token = authData?.access_token;
//     if (!token) {
//       console.error('No token found.');
//       return;
//     }

//     const response = await fetch('https://proximahr.onrender.com/api/v2/attendance/employee/timer/start', {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//       },
//     });

//     if (response.ok) {
//       const data = await response.json();
//       console.log('Timer started:', data);
//       setIsTimerRunning(true);
//        setClockInTime(new Date()); // Set the clock-in time when the user starts working
//     }
//   };

//   useEffect(() => {
//     const storedState = JSON.parse(localStorage.getItem('employeeTimerState'));
//     if (storedState) {
//       setWorkingHours(storedState.workingHours);
//       setBreakTime(storedState.breakTime);
//       setClockInTime(storedState.clockInTime);
//       setClockOutTime(storedState.clockOutTime);
//       setIsTimerRunning(storedState.isTimerRunning);
//       setIsBreakActive(storedState.isBreakActive);
//     }

//   // Automatically start the timer if the user was clocked in before the page refresh
//   if (storedState.isTimerRunning) {
//     setIsTimerRunning(true); // Continue the working timer
//   }
//   if (storedState.isBreakActive) {
//     setIsBreakActive(true); // Continue the break timer if it was active
//   }

//   }, []);

//   // Working Hours Timer
//   useEffect(() => {
//     if (isTimerRunning) {
//       const timer = setInterval(() => {
//         setWorkingHours((prev) => prev + 1000); // Increase by 1 second for working hours
//       }, 1000);
//       return () => clearInterval(timer);
//     }
//   }, [isTimerRunning]);

//   // Break Timer
//   useEffect(() => {
//     if (isBreakActive) {
//       const breakTimer = setInterval(() => {
//         setBreakTime((prev) => prev + 1000); // Increase by 1 second for break time
//       }, 1000);
//       return () => clearInterval(breakTimer);
//     }
//   }, [isBreakActive]);

//   // Store the state to localStorage to persist timers across page reloads or navigation
//   useEffect(() => {
//     const timerState = {
//       workingHours,
//       breakTime,
//       clockInTime,
//       clockOutTime,
//       isTimerRunning,
//       isBreakActive,
//     };
//     localStorage.setItem('employeeTimerState', JSON.stringify(timerState));
//   }, [workingHours, breakTime, clockInTime, clockOutTime, isTimerRunning, isBreakActive]);


//   const pauseTimer = async () => {
//     const authData = JSON.parse(localStorage.getItem('employeeAuthToken'));
//     const token = authData?.access_token;
//     if (!token) {
//       console.error('No token found.');
//       return;
//     }

//     const response = await fetch('https://proximahr.onrender.com/api/v2/attendance/employee/timer/pause', {
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
//     const token = authData?.access_token;
//     if (!token) {
//       console.error('No token found.');
//       return;
//     }

//     const response = await fetch('https://proximahr.onrender.com/api/v2/attendance/employee/timer/resume', {
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
//     const token = authData?.access_token;
//     if (!token) {
//       console.error('No token found.');
//       return;
//     }

//     const response = await fetch('https://proximahr.onrender.com/api/v2/attendance/employee/timer/stop', {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//       },
//     });

//     if (response.ok) {
//       const data = await response.json();
//       console.log('Timer stopped:', data);
//       setIsTimerRunning(false);
//       setClockOutTime(new Date());
//       setIsBreakActive(false);
//       setClockOutTime(new Date());
//       calculateTime();

//       // Trigger the Daily Attendance endpoint
//       await fetch('https://proximahr.onrender.com/api/v2/attendance/employee/daily-attendance', {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       })
//         .then((res) => res.json())
//         .then((data) => console.log('Daily Attendance Summary:', data));
//     }
//   };

//   const calculateTime = () => {
//     const totalWorkedTime = workingHours + breakTime;
//     console.log('Total worked time (including breaks):', formatTime(totalWorkedTime));
//   };

//   const formatTime = (timeInMillis) => {
//     const hours = Math.floor(timeInMillis / 3600000);
//     const minutes = Math.floor((timeInMillis % 3600000) / 60000);
//     const seconds = Math.floor((timeInMillis % 60000) / 1000);
//     return `${hours}:${minutes}:${seconds}`;
//   };

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


//     <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
//       {/* First Row: Clock In/Clock Out and Leave Requests */}
//       <div style={{ width: '48%' }}>
//       {/* Clock In / Clock Out Section */}
//       <div className="grid">
//         <h1>Clock In / Clock Out</h1>
//         <hr />
//         <div className="firstCol" style={{ display: 'flex', alignItems: 'center' }}>
//           <div className="left-side">
//             <h5>Clock In</h5>
//             <h6>{clockInTime ? clockInTime.toLocaleTimeString() : 'Not yet clocked in'}</h6>
//           </div>
//           <div className="right-side-col">
//             <h5>Clock Out</h5>
//             <h6>{clockOutTime ? clockOutTime.toLocaleTimeString() : 'Not yet clocked out'}</h6>
//           </div>
//         </div>

//         <div className="priority">
//           <h5>Lunch Break</h5>
//           <div>
//             <h6 style={{ background: 'none', color: '#4E4E4E' }}>
//               {isBreakActive ? 'Break Active' : 'No Break'}
//             </h6>
//           </div>
//         </div>

//         <div className="TaskProgress">
//           <div className="firstCol" style={{ display: 'flex', alignItems: 'center' }}>
//             <div className="left-side">
//               <h5>Working Hours</h5>
//               <h6>{formatTime(workingHours)}</h6>
//             </div>
//             <div className="right-side-col">
//               <h5>Break Time</h5>
//               <h6>{formatTime(breakTime)}</h6>
//             </div>
//           </div>
//         </div>

//         <button
//           style={{ background: '#007BFF', color: '#fff', width: '200px' }}
//           onClick={isTimerRunning ? stopTimer : startTimer}
//         >
//           <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" />
//           {isTimerRunning ? 'Clock Out' : 'Clock In'}
//         </button>

//         <button
//           style={{ color: '#2E2E2E', border: '1px solid #2E2E2E', width: '200px' }}
//           onClick={isBreakActive ? resumeTimer : pauseTimer}
//         >
//           <FontAwesomeIcon icon="fa-solid fa-mug-hot" />
//           {isBreakActive ? 'End Break' : 'Start Break'}
//         </button>
//       </div>
//     </div>


//     {/* Leave Requests Section */}
//     <div style={{ width: '48%' }}>
//     <div className="grid">
//       <h1>Leave Requests</h1>
//       <hr />
//       <h5>Number of pending Leave Requests</h5>
//       <h6>{leaveStats.pending_leave_requests} pending Tasks</h6>

//       <div className="priority">
//         <h5>Number of available remaining</h5>
//         <h6 style={{ background: 'none', border: '1px solid #D9D9D9', color: '#2E2E2E', textAlign: 'left', width: '100px' }}>
//           {leaveStats.remaining_leave_days} Days
//         </h6>
//       </div>

//       <div className="TaskProgress">
//         <h5>Number of approved leaves</h5>
//         <h6 style={{ background: 'none', border: '1px solid #D9D9D9', color: '#2E2E2E', textAlign: 'left', width: '200px' }}>
//           {leaveStats.approved_leave_requests} Approved Leaves
//         </h6>
//       </div>

//       <div className="last-div">
//         <Link to={'/EmployeeLeave'}>
//         <button style={{ width: '200px', background: '#007BFF', color: '#fff' }}>
//           <FontAwesomeIcon icon="fa-solid fa-calendar" />
//           Request Leave
//         </button></Link>
//       </div>
//     </div>
// </div>
// </div>

//   {/* Second Row: Attendance Summary and Compensation */}
//   <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
//     <div style={{ width: '48%' }}>
//     {/* Attendance Summary Card */}
//     <div className="grid">
//       <h1>Attendance Summary</h1>
//       <hr />
//       <div className="TaskProgress-3" style={{ display: 'flex', justifyContent: 'space-between' }}>
//         <div className="attendance-div">
//           <h5>Total Attendance Percentage</h5>
//           <p style={{ color: attendanceSummary.attendance_percentage >= 75 ? '#22C55E' : '#FF6464' }}>
//             {attendanceSummary.attendance_percentage}%
//           </p>
//         </div>
//         <div className="attendance-div">
//           <h5>Days Worked</h5>
//           <p>{attendanceSummary.days_worked} days</p>
//         </div>
//         <div className="attendance-div">
//           <h5>Days Absent</h5>
//           <p>{attendanceSummary.days_absent} days</p>
//         </div>
//       </div>

//       <div className="TaskProgress-3">
//         <h5>Undertime Hours</h5>
//         <p>{attendanceSummary.undertime_hours} hours</p>
//       </div>

//       <div className="TaskProgress-3">
//         <h5>Overtime Hours</h5>
//         <p>{attendanceSummary.overtime_hours} hours</p>
//       </div>

//       <div className="last-div">
//         <Link to={'/EmployeeAttendance'}><button style={{ width: '200px', background: '#007BFF', color: '#fff' }}>
//           <FontAwesomeIcon icon="fa-solid fa-clock" />
//           View Attendance
//         </button></Link>
//       </div>
//     </div>

//     </div>


//     <div style={{ width: '48%' }}>
//         {/* Compensation Card */}
//         <div className="grid">
//             <h1>Compensation</h1>
//             <hr />
//             <div className="TaskProgress-3" style={{ display: 'flex', justifyContent: 'space-between' }}>
//               <div className="attendance-div">
//                 <h5>Payment Status</h5>
//                 <p style={{ color: compensationData.payment_status === 'Paid' ? '#22C55E' : '#FF6464' }}>
//                   {compensationData.payment_status}
//                 </p>
//               </div>
//               <div className="attendance-div">
//                 <h5>Last Salary</h5>
//                 <p>{compensationData.last_salary ? formatCurrency(compensationData.last_salary) : 'Not Paid'}</p>
//               </div>
//             </div>

//             <div className="TaskProgress-3">
//               <h5>Next Salary</h5>
//               <p>Due: {compensationData.next_salary_date}</p>
//             </div>

//             <div className="last-div">
//               <button style={{ width: '200px', background: '#007BFF', color: '#fff' }}>
//                 <FontAwesomeIcon icon="fa-solid fa-dollar-sign" />
//                 Compensation
//               </button>
//             </div>
//           </div>
//           </div>
//         </div>


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
import { Link } from 'react-router-dom';

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

  // const [workingHours, setWorkingHours] = useState(0);
  // const [breakTime, setBreakTime] = useState(0);
  // const [isTimerRunning, setIsTimerRunning] = useState(false);
  // const [isBreakActive, setIsBreakActive] = useState(false);
  // const [loading, setLoading] = useState(true);
  // const [clockInTime, setClockInTime] = useState(null);
  // const [clockOutTime, setClockOutTime] = useState(null);



  const [workingHours, setWorkingHours] = useState(0);
  const [breakTime, setBreakTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isBreakActive, setIsBreakActive] = useState(false);
  const [clockInTime, setClockInTime] = useState(null);
  const [clockOutTime, setClockOutTime] = useState(null);

  const [attendanceSummary, setAttendanceSummary] = useState({
    attendance_percentage: 0,
    days_worked: 0,
    days_absent: 0,
    undertime_hours: 0,
    overtime_hours: 0,
  });

  const [compensationData, setCompensationData] = useState({
    payment_status: 'Unpaid',
    last_salary: 0,
    next_salary_date: '',
  });

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem('employeeAuthToken'));
    const token = authData?.access_token;
    console.log("Token:", token);
    if (!token) {
      console.error('No token found. Redirecting to login.');
      window.location.href = '/login'; 
      return;
    }

    // Fetch Monthly Stats (Attendance, Leave Balance, etc.)
    const fetchMonthlyStats = async () => {
      try {
        const response = await fetch(`https://proximahr.onrender.com/api/v2/attendance/employee/monthly-stats?month=${currentMonth}&year=${currentYear}`, {
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
        const response = await fetch('https://proximahr.onrender.com/api/v2/employee/leave-statistics', {
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

    // Fetch Attendance Summary
    const fetchAttendanceSummary = async () => {
      try {
        const response = await fetch('https://proximahr.onrender.com/api/v2/attendance/employee/attendance-summary', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log('Attendance Summary:', data);
        setAttendanceSummary({
          attendance_percentage: data.attendance_percentage || 0,
          days_worked: data.days_worked || 0,
          days_absent: data.absences || 0,
          undertime_hours: data.undertime_hours || 0,
          overtime_hours: data.total_overtime_hours || 0,
        });
      } catch (error) {
        console.error('Error fetching attendance summary:', error);
      }
    };

    fetchMonthlyStats();
    fetchLeaveStats();
    fetchAttendanceSummary();
  }, [currentMonth, currentYear]);

  useEffect(() => {
    const paymentStatus = attendanceStats.net_pay ? 'Paid' : 'Unpaid';
    const nextSalaryDate = new Date(currentYear, currentMonth, 0).toLocaleDateString(); // Last day of the current month

    setCompensationData({
      payment_status: paymentStatus,
      last_salary: attendanceStats.net_pay || 0,
      next_salary_date: nextSalaryDate,
    });
  }, [attendanceStats]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
  };

  const startTimer = async () => {

    const authData = JSON.parse(localStorage.getItem('employeeAuthToken'));
    const token = authData?.access_token;
    if (!token) {
      console.error('No token found.');
      return;
    }

    const response = await fetch('https://proximahr.onrender.com/api/v2/attendance/employee/timer/start', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Timer started:', data);
      setIsTimerRunning(true);
       setClockInTime(new Date()); // Set the clock-in time when the user starts working
    }
  };

  useEffect(() => {
    const storedState = JSON.parse(localStorage.getItem('employeeTimerState'));
    if (storedState) {
      setWorkingHours(storedState.workingHours);
      setBreakTime(storedState.breakTime);
      setClockInTime(storedState.clockInTime);
      setClockOutTime(storedState.clockOutTime);
      setIsTimerRunning(storedState.isTimerRunning);
      setIsBreakActive(storedState.isBreakActive);
    }

  // Automatically start the timer if the user was clocked in before the page refresh
  if (storedState.isTimerRunning) {
    setIsTimerRunning(true); // Continue the working timer
  }
  if (storedState.isBreakActive) {
    setIsBreakActive(true); // Continue the break timer if it was active
  }

  }, []);

  // Working Hours Timer
  useEffect(() => {
    if (isTimerRunning) {
      const timer = setInterval(() => {
        setWorkingHours((prev) => prev + 1000); // Increase by 1 second for working hours
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isTimerRunning]);

  // Break Timer
  useEffect(() => {
    if (isBreakActive) {
      const breakTimer = setInterval(() => {
        setBreakTime((prev) => prev + 1000); // Increase by 1 second for break time
      }, 1000);
      return () => clearInterval(breakTimer);
    }
  }, [isBreakActive]);

  // Store the state to localStorage to persist timers across page reloads or navigation
  useEffect(() => {
    const timerState = {
      workingHours,
      breakTime,
      clockInTime,
      clockOutTime,
      isTimerRunning,
      isBreakActive,
    };
    localStorage.setItem('employeeTimerState', JSON.stringify(timerState));
  }, [workingHours, breakTime, clockInTime, clockOutTime, isTimerRunning, isBreakActive]);


  const pauseTimer = async () => {
    const authData = JSON.parse(localStorage.getItem('employeeAuthToken'));
    const token = authData?.access_token;
    if (!token) {
      console.error('No token found.');
      return;
    }

    const response = await fetch('https://proximahr.onrender.com/api/v2/attendance/employee/timer/pause', {
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
    const token = authData?.access_token;
    if (!token) {
      console.error('No token found.');
      return;
    }

    const response = await fetch('https://proximahr.onrender.com/api/v2/attendance/employee/timer/resume', {
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
    const token = authData?.access_token;
    if (!token) {
      console.error('No token found.');
      return;
    }

    const response = await fetch('https://proximahr.onrender.com/api/v2/attendance/employee/timer/stop', {
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
      setIsBreakActive(false);
      setClockOutTime(new Date());
      calculateTime();

      // Trigger the Daily Attendance endpoint
      await fetch('https://proximahr.onrender.com/api/v2/attendance/employee/daily-attendance', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => console.log('Daily Attendance Summary:', data));
    }
  };

  const calculateTime = () => {
    const totalWorkedTime = workingHours + breakTime;
    console.log('Total worked time (including breaks):', formatTime(totalWorkedTime));
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


    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      {/* First Row: Clock In/Clock Out and Leave Requests */}
      <div style={{ width: '48%' }}>
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

        <button
          style={{ background: '#007BFF', color: '#fff', width: '200px' }}
          onClick={isTimerRunning ? stopTimer : startTimer}
        >
          <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" />
          {isTimerRunning ? 'Clock Out' : 'Clock In'}
        </button>

        <button
          style={{ color: '#2E2E2E', border: '1px solid #2E2E2E', width: '200px' }}
          onClick={isBreakActive ? resumeTimer : pauseTimer}
        >
          <FontAwesomeIcon icon="fa-solid fa-mug-hot" />
          {isBreakActive ? 'End Break' : 'Start Break'}
        </button>
      </div>
    </div>


    {/* Leave Requests Section */}
    <div style={{ width: '48%' }}>
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
        <Link to={'/EmployeeLeave'}>
        <button style={{ width: '200px', background: '#007BFF', color: '#fff' }}>
          <FontAwesomeIcon icon="fa-solid fa-calendar" />
          Request Leave
        </button></Link>
      </div>
    </div>
</div>
</div>

  {/* Second Row: Attendance Summary and Compensation */}
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
    <div style={{ width: '48%' }}>
    {/* Attendance Summary Card */}
    <div className="grid">
      <h1>Attendance Summary</h1>
      <hr />
      <div className="TaskProgress-3" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className="attendance-div">
          <h5>Total Attendance Percentage</h5>
          <p style={{ color: attendanceSummary.attendance_percentage >= 75 ? '#22C55E' : '#FF6464' }}>
            {attendanceSummary.attendance_percentage}%
          </p>
        </div>
        <div className="attendance-div">
          <h5>Days Worked</h5>
          <p>{attendanceSummary.days_worked} days</p>
        </div>
        <div className="attendance-div">
          <h5>Days Absent</h5>
          <p>{attendanceSummary.days_absent} days</p>
        </div>
      </div>

      <div className="TaskProgress-3">
        <h5>Undertime Hours</h5>
        <p>{attendanceSummary.undertime_hours} hours</p>
      </div>

      <div className="TaskProgress-3">
        <h5>Overtime Hours</h5>
        <p>{attendanceSummary.overtime_hours} hours</p>
      </div>

      <div className="last-div">
        <Link to={'/EmployeeAttendance'}><button style={{ width: '200px', background: '#007BFF', color: '#fff' }}>
          <FontAwesomeIcon icon="fa-solid fa-clock" />
          View Attendance
        </button></Link>
      </div>
    </div>

    </div>


    <div style={{ width: '48%' }}>
        {/* Compensation Card */}
        <div className="grid">
            <h1>Compensation</h1>
            <hr />
            <div className="TaskProgress-3" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div className="attendance-div">
                <h5>Payment Status</h5>
                <p style={{ color: compensationData.payment_status === 'Paid' ? '#22C55E' : '#FF6464' }}>
                  {compensationData.payment_status}
                </p>
              </div>
              <div className="attendance-div">
                <h5>Last Salary</h5>
                <p>{compensationData.last_salary ? formatCurrency(compensationData.last_salary) : 'Not Paid'}</p>
              </div>
            </div>

            <div className="TaskProgress-3">
              <h5>Next Salary</h5>
              <p>Due: {compensationData.next_salary_date}</p>
            </div>

            <div className="last-div">
              <button style={{ width: '200px', background: '#007BFF', color: '#fff' }}>
                <FontAwesomeIcon icon="fa-solid fa-dollar-sign" />
                Compensation
              </button>
            </div>
          </div>
          </div>
        </div>


        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;


