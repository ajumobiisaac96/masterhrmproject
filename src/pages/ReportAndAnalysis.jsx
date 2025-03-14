// import React from 'react';
// import Sidebar from '../components/Sidebar';
// import test from '../assets/test.png';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import LineGraph from '../components/LineGraph';
// import TopAttendanceAchievers from '../components/TopAttendanceAchievers';
// import ProgressBars from '../components/ProgressBars';
// import MonthlyAttendanceTrends from '../components/MonthlyAttendanceTrends';
// import './ReportAndAnalysis.css';
// import { Link } from 'react-router-dom';

// // Placeholder data for the line graph
// const overtimeData = {
//   January: [
//     { department: 'HR', hours: 120 },
//     { department: 'Finance', hours: 150 },
//     { department: 'IT', hours: 180 },
//     { department: 'Marketing', hours: 100 },
//     { department: 'Sales', hours: 90 },
//   ],
//   February: [
//     { department: 'HR', hours: 110 },
//     { department: 'Finance', hours: 140 },
//     { department: 'IT', hours: 170 },
//     { department: 'Marketing', hours: 90 },
//     { department: 'Sales', hours: 80 },
//   ],
//   // Add more months as needed
// };

// const topAttendanceAchievers = ['Employee 1', 'Employee 2', 'Employee 3', 'Employee 4', 'Employee 5'];

// const progressBarData = [
//   { department: 'HR', percentage: 95 },
//   { department: 'Finance', percentage: 90 },
//   { department: 'IT', percentage: 85 },
//   { department: 'Marketing', percentage: 80 },
//   { department: 'Sales', percentage: 75 },
// ];

// // Placeholder data for the monthly attendance trends graph
// const monthlyAttendanceData = {
//   January: 95,
//   February: 90,
//   March: 85,
//   April: 80,
//   May: 75,
//   June: 70,
//   July: 65,
//   August: 60,
//   September: 55,
//   October: 50,
//   November: 45,
//   December: 40,
// };

// const ReportAndAnalysis = () => {
//   return (
//       <div className="main-dashboard">
//         <Sidebar />
//         <div className="dashboard">
//         <div className="slide-one-1">
//             <div className="slide-one-1">
//               <div className="name">
//                 <h5>Joseph Dooley</h5>
//                 <h6>Good Morning</h6>
//               </div> 
//             </div>
//             <div className="slide-one-2-1">
//               <div className="notification">
//                 <FontAwesomeIcon icon="fa-solid fa-bell" />
//                 <h6>6</h6>
//               </div>

//               <div className="user-profile">
//                 <img src={test} alt="My profile" className="My-profile" />
//               </div>
//             </div> 
//           </div>
//           <hr className="horizontal" />
//           <div className="dashboard-details">
//             <h5>Report and Analysis</h5>
//             <h6>24 Thursday October 2024</h6>
//           </div>
//           <div className="dashboard-details-1">
//             <div className="first-grid">
//               <FontAwesomeIcon icon="fa-circle-check" className="dashboard-icon-1" style={{ color: '#22C55E' }} />
//               <div>
//                 <h6>Total work force</h6>
//                 <h5>28</h5>
//               </div>
//             </div>
//             <div className="first-grid">
//               <FontAwesomeIcon icon="fa-solid fa-calendar" className="dashboard-icon-2" style={{ color: '#007BFF' }} />
//               <div>
//                 <h6>Attendance Rate</h6>
//                 <h5>92.5%</h5>
//               </div>
//             </div>
//             <div className="first-grid">
//               <FontAwesomeIcon icon="fa-clock" className="dashboard-icon-3" style={{ color: '#6F42C1' }} />
//               <div>
//                 <h6>Leave Utilization</h6>
//                 <h5>65%</h5>
//               </div>
//             </div>
//             <div className="first-grid">
//               <FontAwesomeIcon icon="fa-solid fa-triangle-exclamation" className="dashboard-icon-4" style={{ color: '#FF6464' }} />
//               <div>
//                 <h6>Payroll cost</h6>
//                 <h5>N15,300,000</h5>
//               </div>
//             </div>
//           </div>

//           <div className="first-graph">
//           <div className="graph-container">
//             <LineGraph data={overtimeData} />
//           </div>
//           <TopAttendanceAchievers achievers={topAttendanceAchievers} />
//         </div>

//         <Link to={'/ReportAndAnalysis/OvertimeHours'} ><button className="view-button" style={{background:'transparent', color:'#2E2E2E', border:'1px solid #D9D9D9', marginLeft:'600px'}} >View Department Overtime Hours</button></Link>
        
//         <div className="attendance-trends">
//           <div>
//             <MonthlyAttendanceTrends data={monthlyAttendanceData} />
//           </div>
//           <div>
//              <ProgressBars data={progressBarData} /> 
//           </div>
//         </div>

//         <Link to={'/ReportAndAnalysis/AttendancePerformanceTable'} ><button className="view-button" style={{background:'transparent', color:'#2E2E2E', border:'1px solid #D9D9D9', marginLeft:'600px'}} >View Attendance Performance</button></Link>

//         </div>
        

//       </div>
//   );
// };

// export default ReportAndAnalysis;

import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ReportAndAnalysis.css';
import { Link } from 'react-router-dom';
import EmployerNavbar from "../components/EmployerNavbar";

const ReportAndAnalysis = () => {
  const [attendanceRate, setAttendanceRate] = useState(null);
  const [leaveUtilization, setLeaveUtilization] = useState(null);
  const [payrollCost, setPayrollCost] = useState(null);
  const [payrollTrend, setPayrollTrend] = useState(null);
  const [workforceData, setWorkforceData] = useState(null);
  const [overtimeData, setOvertimeData] = useState(null);
  const [topAttendanceRecords, setTopAttendanceRecords] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear()); // Set the default year to the current year dynamically

  // Fetching Attendance Rate and Leave Utilization
  const fetchAttendanceData = async () => {
    try {
      const storedAuthData = localStorage.getItem('authData');
      const token = storedAuthData ? JSON.parse(storedAuthData).token : null;

      if (!token) {
        throw new Error('Authentication token is missing');
      }

      const [attendanceResponse, leaveUtilizationResponse] = await Promise.all([
        fetch('https://proximahr.onrender.com/analytics/attendance-rate', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }),
        fetch('https://proximahr.onrender.com/analytics/leave-utilization', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }),
      ]);

      if (!attendanceResponse.ok || !leaveUtilizationResponse.ok) {
        throw new Error(`API error: ${attendanceResponse.status} ${attendanceResponse.statusText}`);
      }

      const attendanceData = await attendanceResponse.json();
      const leaveUtilizationData = await leaveUtilizationResponse.json();

      console.log('Attendance Rate Data:', attendanceData);
      console.log('Leave Utilization Data:', leaveUtilizationData);

      setAttendanceRate(attendanceData.current_month_attendance_rate || 0);
      setLeaveUtilization(leaveUtilizationData.leave_utilization || 0);

    } catch (error) {
      console.error('Error fetching attendance or leave utilization data:', error);
    }
  };

  // Fetch Payroll Data for Payroll Cost and Trend
  const fetchPayrollData = async () => {
    try {
      const storedAuthData = localStorage.getItem('authData');
      const token = storedAuthData ? JSON.parse(storedAuthData).token : null;

      if (!token) {
        throw new Error('Authentication token is missing');
      }

      const response = await fetch('https://proximahr.onrender.com/analytics/payroll', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Payroll Data:', data);

      setPayrollCost(data.payroll_cost);
      setPayrollTrend(data.trend);

    } catch (error) {
      console.error('Error fetching payroll data:', error);
    }
  };

  // Fetch Workforce Data
  const fetchWorkforceData = async () => {
    try {
      const storedAuthData = localStorage.getItem('authData');
      const token = storedAuthData ? JSON.parse(storedAuthData).token : null;

      if (!token) {
        throw new Error('Authentication token is missing');
      }

      const response = await fetch('https://proximahr.onrender.com/analytics/workforce', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Workforce Data:', data);

      setWorkforceData(data.current_workforce);

    } catch (error) {
      console.error('Error fetching workforce data:', error);
    }
  };

  // Fetch Overtime Hours by Department
  const fetchOvertimeData = async () => {
    try {
      const storedAuthData = localStorage.getItem('authData');
      const token = storedAuthData ? JSON.parse(storedAuthData).token : null;

      if (!token) {
        throw new Error('Authentication token is missing');
      }

      const response = await fetch(`https://proximahr.onrender.com/analytics/overtime-by-department-by-month?year=${year}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Overtime Data:', data);

      if (!data.overtime_by_department || Object.keys(data.overtime_by_department).length === 0) {
        setOvertimeData(null);
        setIsEmpty(true);
      } else {
        setOvertimeData(data.overtime_by_department);
        setIsEmpty(false);
      }

    } catch (error) {
      console.error('Error fetching overtime data:', error);
    }
  };

  // Fetch Top Attendance Records
  const fetchTopAttendanceRecords = async () => {
    try {
      const storedAuthData = localStorage.getItem('authData');
      const token = storedAuthData ? JSON.parse(storedAuthData).token : null;
  
      if (!token) {
        throw new Error('Authentication token is missing');
      }
  
      const response = await fetch(`https://proximahr.onrender.com/analytics/top-attendance?year=${year}&top_n=10`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Top Attendance Records:', data);
  
      // Ensure the data is an array before setting it
      if (Array.isArray(data)) {
        setTopAttendanceRecords(data); // Assuming the data returned is an array of records
      } else {
        setTopAttendanceRecords([]); // In case the response is not an array, set an empty array
      }
  
    } catch (error) {
      console.error('Error fetching top attendance records:', error);
      setTopAttendanceRecords([]); // Set an empty array in case of an error
    }
  };
  

  useEffect(() => {
    fetchAttendanceData();
    fetchPayrollData();
    fetchWorkforceData();
    fetchOvertimeData();
    fetchTopAttendanceRecords(); // Fetch top attendance records when component mounts
  }, [year]);

  // Render Top Attendance Achievers
  const renderTopAttendanceAchievers = () => {
    if (!topAttendanceRecords || topAttendanceRecords.length === 0) {
      return <div>No top attendance records found.</div>;
    }

    return (
      <div>
        <h6>Top Attendance Achievers</h6>
        {topAttendanceRecords.map((record, index) => (
          <div key={index} className="attendance-achiever">
            <p><strong>{record.name}</strong></p>
            <p>Attendance Days: {record.attendance_days}</p>
            <p>Hours Worked: {record.hours_worked}</p>
          </div>
        ))}
      </div>
    );
  };

  // Render Overtime by Department chart
  const renderOvertimeChart = () => {
    if (!overtimeData) {
      return <div>Loading overtime data...</div>;
    }

    // If overtimeData is empty, show a message
    if (Object.keys(overtimeData).length === 0) {
      return <div>No overtime data found for this year.</div>;
    }

    const departments = Object.keys(overtimeData); // List of departments
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    return (
      <div>
        <h6>Top Overtime Hours by Department ({year})</h6>
        <svg width="100%" height="300">
          {departments.map((department, index) => {
            const data = overtimeData[department]; // Overtime data for each department
            const pathData = data
              .map((hours, monthIndex) => `${(monthIndex + 1) * 60},${300 - hours}`) // Coordinates for each data point
              .join(" ");

            return (
              <g key={index}>
                {/* Render polyline for each department */}
                <polyline
                  fill="none"
                  stroke="blue"
                  strokeWidth="2"
                  points={pathData}
                />
                {/* Render the data points on the chart */}
                {data.map((hours, monthIndex) => (
                  <circle
                    key={monthIndex}
                    cx={(monthIndex + 1) * 60}
                    cy={300 - hours}
                    r="3"
                    fill="blue"
                  />
                ))}
                {/* Label the department */}
                <text x={60} y={300 + 20} fontSize="12" textAnchor="middle">
                  {department}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    );
  };

  return (
    <div className="main-dashboard">
      <Sidebar />
      <div className="dashboard">
        <EmployerNavbar />
        <hr className="horizontal" />
        <div className="dashboard-details">
          <h5>Report and Analysis</h5>
          <h6>{new Date().toDateString()}</h6>
        </div>

        <div className="dashboard-details-1">
          {/* Total Workforce */}
          <div className="first-grid">
            <FontAwesomeIcon icon="fa-circle-check" className="dashboard-icon-1" style={{ color: '#22C55E' }} />
            <div>
              <h6>Total workforce</h6>
              <h5>{workforceData !== null ? workforceData : 'Loading...'}</h5>
            </div>
          </div>
          {/* Attendance Rate */}
          <div className="first-grid">
            <FontAwesomeIcon icon="fa-solid fa-calendar" className="dashboard-icon-2" style={{ color: '#007BFF' }} />
            <div>
              <h6>Attendance Rate</h6>
              <h5>{attendanceRate !== null ? `${attendanceRate}%` : 'Loading...'}</h5>
            </div>
          </div>
          {/* Leave Utilization */}
          <div className="first-grid">
            <FontAwesomeIcon icon="fa-clock" className="dashboard-icon-3" style={{ color: '#6F42C1' }} />
            <div>
              <h6>Leave Utilization</h6>
              <h5>{leaveUtilization !== null ? `${leaveUtilization}%` : 'Loading...'}</h5>
            </div>
          </div>
          {/* Payroll Cost */}
          <div className="first-grid">
            <FontAwesomeIcon icon="fa-solid fa-triangle-exclamation" className="dashboard-icon-4" style={{ color: '#FF6464' }} />
            <div>
              <h6>Payroll Cost</h6>
              <h5>{payrollCost !== null ? `N${payrollCost.toLocaleString()}` : 'Loading...'}</h5>
            </div>
          </div>
          {/* Payroll Trend */}
          <div className="first-grid">
            <FontAwesomeIcon icon="fa-solid fa-arrow-up" className="dashboard-icon-5" style={{ color: '#FFA500' }} />
            <div>
              <h6>Payroll Trend</h6>
              <h5>{payrollTrend !== null ? `${payrollTrend}%` : 'Loading...'}</h5>
            </div>
          </div>
        </div>

        {/* Flex Layout for Overtime Data and Top Attendance Achievers */}
        <div className="flex-container" style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
          <div className="overtime-chart-container">
            {renderOvertimeChart()}
          </div>

          <div className="attendance-achievers-container">
            {renderTopAttendanceAchievers()}
          </div>
        </div>

        <Link to={'/ReportAndAnalysis/AttendancePerformanceTable'} ><button className='view-department-overtime-hours'>View Department Overtime Hours </button></Link>
      </div>
    </div>
  );
};

export default ReportAndAnalysis;
