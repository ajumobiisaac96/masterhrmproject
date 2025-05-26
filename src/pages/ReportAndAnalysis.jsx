// import React, { useState, useEffect } from 'react';
// import Sidebar from '../components/Sidebar';
// import test from '../assets/test.png';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import LineGraph from '../components/LineGraph';
// import TopAttendanceAchievers from '../components/TopAttendanceAchievers';
// import ProgressBars from '../components/ProgressBars';
// import MonthlyAttendanceTrends from '../components/MonthlyAttendanceTrends';
// import './ReportAndAnalysis.css';
// import EmployerNavbar from '../components/EmployerNavbar';
// import { Link } from 'react-router-dom';
// import {
//   getOvertimeByDepartment,
//   getTopAttendanceAchievers,
//   getYearlyAttendanceTrend,
//   getDepartmentAttendancePercentage,
//   getWorkforceGrowth,
//   getAttendanceRate,
//   getLeaveUtilization,
//   getPayrollCost,
// } from '../utils/api';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { 
//   faUsers, 
//   faArrowUp, 
//   faArrowDown, 
//   faCalendar, 
//   faDollarSign 
// } from '@fortawesome/free-solid-svg-icons';
// import { 
//   faCircleCheck, 
//   faClock, 
//   faMoneyBill1 
// } from '@fortawesome/free-regular-svg-icons';

// // Add icons to the library
// library.add(
//   faUsers, 
//   faArrowUp, 
//   faArrowDown, 
//   faCalendar, 
//   faDollarSign, 
//   faCircleCheck, 
//   faClock, 
//   faMoneyBill1
// );

// const ReportAndAnalysis = () => {
//   const [overtimeData, setOvertimeData] = useState({});
//   const [attendanceRate, setAttendanceRate] = useState(null);
//   const [topAttendanceAchievers, setTopAttendanceAchievers] = useState([]);
//   const [workforceData, setWorkforceData] = useState(null);
//   const [leaveUtilization, setLeaveUtilization] = useState(null);
//   const [payrollCost, setPayrollCost] = useState(null);
//   const [monthlyAttendanceData, setMonthlyAttendanceData] = useState([]);
//   const [progressBarData, setProgressBarData] = useState([]);
//   const [error, setError] = useState(null);
//   const [token, setToken] = useState(null);

//   useEffect(() => {
//     const authData = JSON.parse(localStorage.getItem('authData'));
//     const token = authData?.access_token;
//     if (token) {
//       setToken(token);
//     } else {
//       setError('Token not found in localStorage.');
//     }
//   }, []);

//   const fetchData = async () => {
//     try {
//       const year = 2024;

//       // Fetch Overtime Data
//       const overtimeResponse = await getOvertimeByDepartment(year, token);
//       setOvertimeData(overtimeResponse.overtime_by_department);

//       // Fetch Top Attendance Achievers
//       const attendanceResponse = await getTopAttendanceAchievers(year, token);
//       setTopAttendanceAchievers(attendanceResponse?.best_attendance_records || []);

//       // Fetch Yearly Attendance Trend
//       const attendanceTrendResponse = await getYearlyAttendanceTrend(year, token);
//       setMonthlyAttendanceData(attendanceTrendResponse.data || []);

//       // Fetch Department Attendance Percentage
//       const departmentAttendanceResponse = await getDepartmentAttendancePercentage(token);
//       setProgressBarData(departmentAttendanceResponse || []);

//       // Fetch Workforce Growth
//       const workforceResponse = await getWorkforceGrowth(year, token);
//       setWorkforceData(workforceResponse);

//       // Fetch Attendance Rate
//       const rateResponse = await getAttendanceRate(token);
//       setAttendanceRate(rateResponse);

//       // Fetch Leave Utilization
//       const leaveUtilizationResponse = await getLeaveUtilization(token);
//       setLeaveUtilization(leaveUtilizationResponse);

//       // Fetch Payroll Cost
//       const payrollResponse = await getPayrollCost(year, token);
//       setPayrollCost(payrollResponse);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setError('Error fetching data.');
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       fetchData();
//     }
//   }, [token]);

//   // Log graph data when monthlyAttendanceData changes
//   useEffect(() => {
//     if (monthlyAttendanceData && monthlyAttendanceData.length > 0) {
//       console.log('LineGraph data:', getMonthlyAttendanceGraphData(monthlyAttendanceData));
//     }
//   }, [monthlyAttendanceData]);

//   const getTrendColor = (trend) => {
//     if (trend <= 30) return 'red'; // Less than or equal to 30%
//     if (trend > 30 && trend <= 50) return 'yellow'; // Between 30% and 50%
//     return 'green'; // Anything greater than 50%
//   };

//   const getMonthlyAttendanceGraphData = (rawData) => {
//     const months = [
//       'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
//       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
//     ];
//     // Create a default array for all months
//     const dataByMonth = Array(12).fill(0);
//     if (Array.isArray(rawData)) {
//       rawData.forEach(item => {
//         if (item.month >= 1 && item.month <= 12) {
//           dataByMonth[item.month - 1] = item.attendance_percentage;
//         }
//       });
//     }
//     // Return data in the format your LineGraph expects
//     return {
//       labels: months,
//       datasets: [
//         {
//           label: 'Attendance %',
//           data: dataByMonth,
//           borderColor: '#22C55E',
//           backgroundColor: 'rgba(34,197,94,0.1)',
//           pointBackgroundColor: '#22C55E',
//           tension: 0.4,
//         }
//       ]
//     };
//   };

//   return (
//     <div className="main-dashboard">
//       <Sidebar />
//       <div className="dashboard">
//       <EmployerNavbar />
//           <hr className="horizontal" />
//           <div className="dashboard-details" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
//               <h5 style={{ marginBottom: '15px' }}>Report and Analysis </h5>
//               <h6>{new Date().toDateString()}</h6>
//           </div>

//         {/* Cards Layout */}
//         <div className="dashboard-details-1">
//           <div className="card-container" style={{
//             display: 'flex',
//             gap: '20px',
//             margin: '-10px -30px',
//             justifyContent: 'flex-start'
//           }}>
//             {/* Total Workforce */}
//             <div className="card-item" style={{
//               flex: 1,
//               background: '#fff',
//               border: '1px solid #E5E7EB',
//               borderRadius: '16px',
//               padding: '10px 10px',
//               display: 'flex',
//               alignItems: 'center',
//               minWidth: 200
//             }}>
//               <FontAwesomeIcon icon={['fas', 'users']} style={{ fontSize: 20, color: '#22C55E', marginRight: 18 }} />
//               <div>
//                 <div style={{ fontSize: 15, color: '#6E6E6E', fontWeight: 500, fontFamily:'Inter' }}>Total Workforce</div>
//                 <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '4px 0' }}>
//                   <span style={{ fontSize: 20, fontWeight: 700, color:'#2E2E2E', fontFamily:"Inter"}}>
//                     {workforceData?.current_workforce ?? 0}
//                   </span>
//                   <span style={{
//                     fontSize: 13,
//                     background: (workforceData?.trend ?? 0) >= 0 ? '#E6F9ED' : '#FDEDED',
//                     color: (workforceData?.trend ?? 0) >= 0 ? '#22C55E' : '#FF6464',
//                     borderRadius: 8,
//                     padding: '2px 8px',
//                     fontWeight: 600,
//                     display: 'flex',
//                     alignItems: 'center'
//                   }}>
//                     <FontAwesomeIcon icon={ (workforceData?.trend ?? 0) >= 0 ? ['fas', 'arrow-up'] : ['fas', 'arrow-down'] } style={{ marginRight: 4, fontSize: 14 }} />
//                     {(workforceData?.trend ?? 0) >= 0 ? '+' : ''}{workforceData?.trend ?? 0}%
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Attendance Rate */}
//             <div className="card-item" style={{
//               flex: 1,
//               background: '#fff',
//               border: '1px solid #E5E7EB',
//               borderRadius: '16px',
//               padding: '10px 10px',
//               display: 'flex',
//               alignItems: 'center',
//               minWidth: 200
//             }}>
//               <FontAwesomeIcon icon={['far', 'circle-check']} style={{ fontSize: 20, color: '#22C55E', marginRight: 18 }} />
//               <div>
//                 <div style={{ fontSize: 15, color: '#6E6E6E', fontWeight: 500, fontFamily:'Inter' }}>Attendance Rate</div>
//                 <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '4px 0' }}>
//                   <span style={{ fontSize: 20, fontWeight: 700, color:'#2E2E2E', fontFamily:"Inter"}}>
//                     {attendanceRate?.current_month_attendance_rate ?? 0}%
//                   </span>
//                   <span style={{
//                     fontSize: 13,
//                     background: (attendanceRate?.attendance_trend ?? 0) >= 0 ? '#E6F9ED' : '#FDEDED',
//                     color: (attendanceRate?.attendance_trend ?? 0) >= 0 ? '#22C55E' : '#FF6464',
//                     borderRadius: 8,
//                     padding: '2px 8px',
//                     fontWeight: 600,
//                     display: 'flex',
//                     alignItems: 'center'
//                   }}>
//                     <FontAwesomeIcon icon={ (attendanceRate?.attendance_trend ?? 0) >= 0 ? ['fas', 'arrow-up'] : ['fas', 'arrow-down'] } style={{ marginRight: 4, fontSize: 14 }} />
//                     {(attendanceRate?.attendance_trend ?? 0) >= 0 ? '+' : ''}{attendanceRate?.attendance_trend ?? 0}%
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Leave Utilization */}
//             <div className="card-item" style={{
//               flex: 1,
//               background: '#fff',
//               border: '1px solid #E5E7EB',
//               borderRadius: '16px',
//               padding: '10px 5px',
//               display: 'flex',
//               alignItems: 'center',
//               minWidth: 200
//             }}>
//               <FontAwesomeIcon icon={['far', 'clock']} style={{ fontSize: 20, color: '#FFD600', marginRight: 18 }} />
//               <div>
//                 <div style={{ fontSize: 15, color: '#6E6E6E', fontWeight: 500, fontFamily:'Inter' }}>Leave Utilization</div>
//                 <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '4px 0' }}>
//                   <span style={{ fontSize: 20, fontWeight: 700, color:'#2E2E2E' }}>
//                     {leaveUtilization?.current_month_leave_utilization ?? 0}%
//                   </span>
//                   <span style={{
//                     fontSize: 13,
//                     background: (leaveUtilization?.leave_trend ?? 0) >= 0 ? '#E6F9ED' : '#FDEDED',
//                     color: (leaveUtilization?.leave_trend ?? 0) >= 0 ? '#22C55E' : '#FF6464',
//                     borderRadius: 8,
//                     padding: '2px 8px',
//                     fontWeight: 600,
//                     display: 'flex',
//                     alignItems: 'center'
//                   }}>
//                     <FontAwesomeIcon icon={ (leaveUtilization?.leave_trend ?? 0) >= 0 ? ['fas', 'arrow-up'] : ['fas', 'arrow-down'] } style={{ marginRight: 4, fontSize: 14 }} />
//                     {(leaveUtilization?.leave_trend ?? 0) >= 0 ? '+' : ''}{leaveUtilization?.leave_trend ?? 0}%
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Payroll Cost */}
//             <div className="card-item" style={{
//               flex: 1,
//               background: '#fff',
//               border: '1px solid #E5E7EB',
//               borderRadius: '16px',
//               padding: '10px 40px',
//               display: 'flex',
//               alignItems: 'center',
//               minWidth: 200
//             }}>
//               <FontAwesomeIcon icon={['far', 'money-bill-1']} style={{ fontSize: 20, color: '#6F42C1', marginRight: 18 }} />
//               <div>
//                 <div style={{ fontSize: 15, color: '#6E6E6E', fontWeight: 500, fontFamily:'Inter' }}>Payroll Cost</div>
//                 <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '4px 0' }}>
//                   <span style={{ fontSize: 20, fontWeight: 700, color:'#2E2E2E' }}>
//                     ₦{payrollCost?.payroll_cost ? Number(payrollCost.payroll_cost).toLocaleString() : 0}
//                   </span>
//                   <span style={{
//                     fontSize: 13,
//                     background: (payrollCost?.trend ?? 0) >= 0 ? '#E6F9ED' : '#FDEDED',
//                     color: (payrollCost?.trend ?? 0) >= 0 ? '#22C55E' : '#FF6464',
//                     borderRadius: 8,
//                     padding: '2px 8px',
//                     fontWeight: 600,
//                     display: 'flex',
//                     alignItems: 'center'
//                   }}>
//                     <FontAwesomeIcon icon={ (payrollCost?.trend ?? 0) >= 0 ? ['fas', 'arrow-up'] : ['fas', 'arrow-down'] } style={{ marginRight: 4, fontSize: 14 }} />
//                     {(payrollCost?.trend ?? 0) >= 0 ? '+' : ''}{payrollCost?.trend ?? 0}%
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Graphs and Achievers */}
//         <div className="graphs-container">
//           {/* Top Overtime Hours by Department */}
//           <div className="graph-item" style={{ width: '60%'}}>
//             <h4>Top Overtime Hours by Department</h4>
//             {overtimeData && Object.keys(overtimeData).length > 0 ? (
//               <LineGraph data={overtimeData} type="overtime" />
//             ) : (
//               <div className="no-data-message">
//                 <p>No data available for overtime hours. Please check back later.</p>
//               </div>
//             )}
//           </div>

//           {/* Top Attendance Achievers */}
//           <div className="graph-item" style={{ width: '35%' }}>
//             <h4>Top Attendance Achievers</h4>
//             {topAttendanceAchievers && topAttendanceAchievers.length > 0 ? (
//               <div>
//                 {topAttendanceAchievers.map((achiever, index) => (
//                   <div
//                     key={index}
//                     className="achiever-card"
//                     style={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'space-between',
//                       background: '#fff',
//                       borderRadius: 12,
//                       padding: '10px 0',
//                       marginBottom: 2,
//                     }}
//                   >
//                     {/* Profile initials */}
//                     <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
//                       <div
//                         style={{
//                           width: 38,
//                           height: 38,
//                           borderRadius: '50%',
//                           background: '#F3F4F6',
//                           display: 'flex',
//                           alignItems: 'center',
//                           justifyContent: 'center',
//                           fontWeight: 600,
//                           fontSize: 16,
//                           color: '#555',
//                           overflow: 'hidden',
//                         }}
//                       >
//                         {`${achiever.first_name?.[0] ?? ''}${achiever.last_name?.[0] ?? ''}`.toUpperCase()}
//                       </div>
//                       <div>
//                         <div style={{ fontWeight: 600, color: '#222', fontSize: 15 }}>
//                           {achiever.first_name} {achiever.last_name}
//                         </div>
//                         <div style={{ color: '#888', fontSize: 13 }}>{achiever.job_title}</div>
//                       </div>
//                     </div>
//                     {/* Rating pill */}
//                     <div
//                       style={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         background: '#FFF9E6',
//                         color: '#FFD600',
//                         borderRadius: 8,
//                         padding: '4px 12px',
//                         fontWeight: 600,
//                         fontSize: 15,
//                         minWidth: 54,
//                         justifyContent: 'center',
//                         gap: 6,
//                       }}
//                     >
//                       <FontAwesomeIcon icon={['fas', 'star']} style={{ color: '#FFD600', fontSize: 16 }} />
//                       <span style={{ color: '#222', fontWeight: 600 }}>
//                         {(achiever.attendance_rating ?? 0).toFixed(1)}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="no-data-message">
//                 <p>No top attendance achievers found. Please check back later.</p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Button */}
//         <Link to={'/ReportAndAnalysis/AttendancePerformanceTable'}>
//           <button className="view-button" style={{marginLeft:'750px'}}>View Department Overtime Hours</button>
//         </Link>

//         <div className="graphs-container" style={{ display:'flex', marginTop: '2rem', width: '100%' }}>
//           {/* Monthly Attendance Trends */}
//           <div className="graph-item" style={{ width: '60%'}}>
//             <h4>Monthly Attendance Trends</h4>
//             {Array.isArray(monthlyAttendanceData) && monthlyAttendanceData.length > 0 ? (
//               <LineGraph data={getMonthlyAttendanceGraphData(monthlyAttendanceData)} type="attendance" />
//             ) : (
//               <div className="no-data-message">
//                 <p>No data available for monthly attendance trends. Please check back later.</p>
//               </div>
//             )}
//           </div>
//           {/* Top Monthly Attendance by Department */}
//           <div className="graph-item" style={{ width: '35%'}}>
//             <h4>Top Monthly Attendance by Department</h4>
//             {Array.isArray(monthlyAttendanceData) && monthlyAttendanceData.length > 0 ? (
//               <LineGraph data={getMonthlyAttendanceGraphData(monthlyAttendanceData)} type="attendance" />
//             ) : (
//               <div className="no-data-message">
//                 <p>No data available.</p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Button */}
//         <Link to={'/ReportAndAnalysis/OvertimeHours'}>
//           <button className="view-button" style={{marginLeft:'750px'}}>View Attendance performance</button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default ReportAndAnalysis;





import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import test from '../assets/test.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LineGraph from '../components/LineGraph';
import TopAttendanceAchievers from '../components/TopAttendanceAchievers';
import ProgressBars from '../components/ProgressBars';
import MonthlyAttendanceTrends from '../components/MonthlyAttendanceTrends';
import './ReportAndAnalysis.css';
import EmployerNavbar from '../components/EmployerNavbar';
import { Link } from 'react-router-dom';
import {
  getOvertimeByDepartment,
  getTopAttendanceAchievers,
  getYearlyAttendanceTrend,
  getDepartmentAttendancePercentage,
  getWorkforceGrowth,
  getAttendanceRate,
  getLeaveUtilization,
  getPayrollCost,
} from '../utils/api';
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faUsers, 
  faArrowUp, 
  faArrowDown, 
  faCalendar, 
  faDollarSign 
} from '@fortawesome/free-solid-svg-icons';
import { 
  faCircleCheck, 
  faClock, 
  faMoneyBill1 
} from '@fortawesome/free-regular-svg-icons';

// Add icons to the library
library.add(
  faUsers, 
  faArrowUp, 
  faArrowDown, 
  faCalendar, 
  faDollarSign, 
  faCircleCheck, 
  faClock, 
  faMoneyBill1
);

const ReportAndAnalysis = () => {
  const [overtimeData, setOvertimeData] = useState({});
  const [attendanceRate, setAttendanceRate] = useState(null);
  const [topAttendanceAchievers, setTopAttendanceAchievers] = useState([]);
  const [workforceData, setWorkforceData] = useState(null);
  const [leaveUtilization, setLeaveUtilization] = useState(null);
  const [payrollCost, setPayrollCost] = useState(null);
  const [monthlyAttendanceData, setMonthlyAttendanceData] = useState([]);
  const [progressBarData, setProgressBarData] = useState([]);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem('authData'));
    const token = authData?.access_token;
    if (token) {
      setToken(token);
    } else {
      setError('Token not found in localStorage.');
    }
  }, []);

const fetchData = async () => {
  try {
    const year = 2024;

    // Fetch Overtime Data (assumed to be direct)
    const overtimeResponse = await getOvertimeByDepartment(year, token);
    setOvertimeData(overtimeResponse.overtime_by_department || {});

    // Fetch Top Attendance Achievers (array)
    const attendanceResponse = await getTopAttendanceAchievers(year, token);
    setTopAttendanceAchievers(attendanceResponse?.best_attendance_records || []);

    // Fetch Yearly Attendance Trend (array directly)
    const attendanceTrendResponse = await getYearlyAttendanceTrend(year, token);
    console.log('Raw Yearly Attendance Trend API Response:', attendanceTrendResponse);
    setMonthlyAttendanceData(attendanceTrendResponse || []);

    if (!attendanceTrendResponse || attendanceTrendResponse.length === 0) {
      console.log('No yearly attendance trend data returned from API.');
    }

    // Fetch Department Attendance Percentage (array or object)
    const departmentAttendanceResponse = await getDepartmentAttendancePercentage(token);
    setProgressBarData(departmentAttendanceResponse || []);

    // Fetch Workforce Growth (object)
    const workforceResponse = await getWorkforceGrowth(year, token);
    setWorkforceData(workforceResponse || {});

    // Fetch Attendance Rate (object)
    const rateResponse = await getAttendanceRate(token);
    setAttendanceRate(rateResponse || {});

    // Fetch Leave Utilization (object)
    const leaveUtilizationResponse = await getLeaveUtilization(token);
    setLeaveUtilization(leaveUtilizationResponse || {});

    // Fetch Payroll Cost (object)
    const payrollResponse = await getPayrollCost(year, token);
    setPayrollCost(payrollResponse || {});
  } catch (error) {
    console.error('Error fetching data:', error);
    setError('Error fetching data.');
  }
};


  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  // Log graph data when monthlyAttendanceData changes
  useEffect(() => {
    if (monthlyAttendanceData && monthlyAttendanceData.length > 0) {
      console.log('LineGraph data:', getMonthlyAttendanceGraphData(monthlyAttendanceData));
    }
  }, [monthlyAttendanceData]);

  const getTrendColor = (trend) => {
    if (trend <= 30) return 'red'; // Less than or equal to 30%
    if (trend > 30 && trend <= 50) return 'yellow'; // Between 30% and 50%
    return 'green'; // Anything greater than 50%
  };

const getMonthlyAttendanceGraphData = (rawData) => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  // Initialize all months with 0 attendance percentage
  const attendanceData = Array(12).fill(0);

  if (Array.isArray(rawData)) {
    rawData.forEach(item => {
      const monthIndex = item.month - 1;
      if (monthIndex >= 0 && monthIndex < 12) {
        attendanceData[monthIndex] = item.attendance_percentage || 0;
      }
    });
  }

  return {
    labels: months,
    datasets: [
      {
        label: 'Attendance %',
        data: attendanceData,
        borderColor: '#22C55E',       // green line
        backgroundColor: 'rgba(34,197,94,0.1)',
        pointBackgroundColor: '#22C55E',
        tension: 0.4,
      }
    ]
  };
};

  return (
    <div className="main-dashboard">
      <Sidebar />
      <div className="dashboard">
      <EmployerNavbar />
          <hr className="horizontal" />
          <div className="dashboard-details" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <h5 style={{ marginBottom: '15px' }}>Report and Analysis </h5>
              <h6>{new Date().toDateString()}</h6>
          </div>

        {/* Cards Layout */}
        <div className="dashboard-details-1">
          <div className="card-container" style={{
            display: 'flex',
            gap: '20px',
            margin: '-10px -30px',
            justifyContent: 'flex-start'
          }}>
            {/* Total Workforce */}
            <div className="card-item" style={{
              flex: 1,
              background: '#fff',
              border: '1px solid #E5E7EB',
              borderRadius: '16px',
              padding: '10px 10px',
              display: 'flex',
              alignItems: 'center',
              minWidth: 200
            }}>
              <FontAwesomeIcon icon={['fas', 'users']} style={{ fontSize: 20, color: '#22C55E', marginRight: 18 }} />
              <div>
                <div style={{ fontSize: 15, color: '#6E6E6E', fontWeight: 500, fontFamily:'Inter' }}>Total Workforce</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '4px 0' }}>
                  <span style={{ fontSize: 20, fontWeight: 700, color:'#2E2E2E', fontFamily:"Inter"}}>
                    {workforceData?.current_workforce ?? 0}
                  </span>
                  <span style={{
                    fontSize: 13,
                    background: (workforceData?.trend ?? 0) >= 0 ? '#E6F9ED' : '#FDEDED',
                    color: (workforceData?.trend ?? 0) >= 0 ? '#22C55E' : '#FF6464',
                    borderRadius: 8,
                    padding: '2px 8px',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <FontAwesomeIcon icon={ (workforceData?.trend ?? 0) >= 0 ? ['fas', 'arrow-up'] : ['fas', 'arrow-down'] } style={{ marginRight: 4, fontSize: 14 }} />
                    {(workforceData?.trend ?? 0) >= 0 ? '+' : ''}{workforceData?.trend ?? 0}%
                  </span>
                </div>
              </div>
            </div>

            {/* Attendance Rate */}
            <div className="card-item" style={{
              flex: 1,
              background: '#fff',
              border: '1px solid #E5E7EB',
              borderRadius: '16px',
              padding: '10px 10px',
              display: 'flex',
              alignItems: 'center',
              minWidth: 200
            }}>
              <FontAwesomeIcon icon={['far', 'circle-check']} style={{ fontSize: 20, color: '#22C55E', marginRight: 18 }} />
              <div>
                <div style={{ fontSize: 15, color: '#6E6E6E', fontWeight: 500, fontFamily:'Inter' }}>Attendance Rate</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '4px 0' }}>
                  <span style={{ fontSize: 20, fontWeight: 700, color:'#2E2E2E', fontFamily:"Inter"}}>
                    {attendanceRate?.current_month_attendance_rate ?? 0}%
                  </span>
                  <span style={{
                    fontSize: 13,
                    background: (attendanceRate?.attendance_trend ?? 0) >= 0 ? '#E6F9ED' : '#FDEDED',
                    color: (attendanceRate?.attendance_trend ?? 0) >= 0 ? '#22C55E' : '#FF6464',
                    borderRadius: 8,
                    padding: '2px 8px',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <FontAwesomeIcon icon={ (attendanceRate?.attendance_trend ?? 0) >= 0 ? ['fas', 'arrow-up'] : ['fas', 'arrow-down'] } style={{ marginRight: 4, fontSize: 14 }} />
                    {(attendanceRate?.attendance_trend ?? 0) >= 0 ? '+' : ''}{attendanceRate?.attendance_trend ?? 0}%
                  </span>
                </div>
              </div>
            </div>

            {/* Leave Utilization */}
            <div className="card-item" style={{
              flex: 1,
              background: '#fff',
              border: '1px solid #E5E7EB',
              borderRadius: '16px',
              padding: '10px 5px',
              display: 'flex',
              alignItems: 'center',
              minWidth: 200
            }}>
              <FontAwesomeIcon icon={['far', 'clock']} style={{ fontSize: 20, color: '#FFD600', marginRight: 18 }} />
              <div>
                <div style={{ fontSize: 15, color: '#6E6E6E', fontWeight: 500, fontFamily:'Inter' }}>Leave Utilization</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '4px 0' }}>
                  <span style={{ fontSize: 20, fontWeight: 700, color:'#2E2E2E' }}>
                    {leaveUtilization?.current_month_leave_utilization ?? 0}%
                  </span>
                  <span style={{
                    fontSize: 13,
                    background: (leaveUtilization?.leave_trend ?? 0) >= 0 ? '#E6F9ED' : '#FDEDED',
                    color: (leaveUtilization?.leave_trend ?? 0) >= 0 ? '#22C55E' : '#FF6464',
                    borderRadius: 8,
                    padding: '2px 8px',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <FontAwesomeIcon icon={ (leaveUtilization?.leave_trend ?? 0) >= 0 ? ['fas', 'arrow-up'] : ['fas', 'arrow-down'] } style={{ marginRight: 4, fontSize: 14 }} />
                    {(leaveUtilization?.leave_trend ?? 0) >= 0 ? '+' : ''}{leaveUtilization?.leave_trend ?? 0}%
                  </span>
                </div>
              </div>
            </div>

            {/* Payroll Cost */}
            <div className="card-item" style={{
              flex: 1,
              background: '#fff',
              border: '1px solid #E5E7EB',
              borderRadius: '16px',
              padding: '10px 40px',
              display: 'flex',
              alignItems: 'center',
              minWidth: 200
            }}>
              <FontAwesomeIcon icon={['far', 'money-bill-1']} style={{ fontSize: 20, color: '#6F42C1', marginRight: 18 }} />
              <div>
                <div style={{ fontSize: 15, color: '#6E6E6E', fontWeight: 500, fontFamily:'Inter' }}>Payroll Cost</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '4px 0' }}>
                  <span style={{ fontSize: 20, fontWeight: 700, color:'#2E2E2E' }}>
                    ₦{payrollCost?.payroll_cost ? Number(payrollCost.payroll_cost).toLocaleString() : 0}
                  </span>
                  <span style={{
                    fontSize: 13,
                    background: (payrollCost?.trend ?? 0) >= 0 ? '#E6F9ED' : '#FDEDED',
                    color: (payrollCost?.trend ?? 0) >= 0 ? '#22C55E' : '#FF6464',
                    borderRadius: 8,
                    padding: '2px 8px',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <FontAwesomeIcon icon={ (payrollCost?.trend ?? 0) >= 0 ? ['fas', 'arrow-up'] : ['fas', 'arrow-down'] } style={{ marginRight: 4, fontSize: 14 }} />
                    {(payrollCost?.trend ?? 0) >= 0 ? '+' : ''}{payrollCost?.trend ?? 0}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Graphs and Achievers */}
        <div className="graphs-container">
          {/* Top Overtime Hours by Department */}
          <div className="graph-item" style={{ width: '60%'}}>
            <h4>Top Overtime Hours by Department</h4>
            {overtimeData && Object.keys(overtimeData).length > 0 ? (
              <LineGraph data={overtimeData} type="overtime" />
            ) : (
              <div className="no-data-message">
                <p>No data available for overtime hours. Please check back later.</p>
              </div>
            )}
          </div>

          {/* Top Attendance Achievers */}
          <div className="graph-item" style={{ width: '35%' }}>
            <h4>Top Attendance Achievers</h4>
            {topAttendanceAchievers && topAttendanceAchievers.length > 0 ? (
              <div>
                {topAttendanceAchievers.map((achiever, index) => (
                  <div
                    key={index}
                    className="achiever-card"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: '#fff',
                      borderRadius: 12,
                      padding: '10px 0',
                      marginBottom: 2,
                    }}
                  >
                    {/* Profile initials */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div
                        style={{
                          width: 38,
                          height: 38,
                          borderRadius: '50%',
                          background: '#F3F4F6',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 600,
                          fontSize: 16,
                          color: '#555',
                          overflow: 'hidden',
                        }}
                      >
                        {`${achiever.first_name?.[0] ?? ''}${achiever.last_name?.[0] ?? ''}`.toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, color: '#222', fontSize: 15 }}>
                          {achiever.first_name} {achiever.last_name}
                        </div>
                        <div style={{ color: '#888', fontSize: 13 }}>{achiever.job_title}</div>
                      </div>
                    </div>
                    {/* Rating pill */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        background: '#FFF9E6',
                        color: '#FFD600',
                        borderRadius: 8,
                        padding: '4px 12px',
                        fontWeight: 600,
                        fontSize: 15,
                        minWidth: 54,
                        justifyContent: 'center',
                        gap: 6,
                      }}
                    >
                      <FontAwesomeIcon icon={['fas', 'star']} style={{ color: '#FFD600', fontSize: 16 }} />
                      <span style={{ color: '#222', fontWeight: 600 }}>
                        {(achiever.attendance_rating ?? 0).toFixed(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-data-message">
                <p>No top attendance achievers found. Please check back later.</p>
              </div>
            )}
          </div>
        </div>

        {/* Button */}
        <Link to={'/ReportAndAnalysis/AttendancePerformanceTable'}>
          <button className="view-button" style={{marginLeft:'750px'}}>View Department Overtime Hours</button>
        </Link>

        <div className="graphs-container" style={{ display:'flex', marginTop: '2rem', width: '100%' }}>
          {/* Monthly Attendance Trends */}
          <div className="graph-item" style={{ width: '60%'}}>
            <h4>Monthly Attendance Trends</h4>
            {Array.isArray(monthlyAttendanceData) && monthlyAttendanceData.length > 0 ? (
              <LineGraph data={getMonthlyAttendanceGraphData(monthlyAttendanceData)} type="attendance" />
            ) : (
              <div className="no-data-message">
                <p>No data available for monthly attendance trends. Please check back later.</p>
              </div>
            )}
          </div>
          {/* Top Monthly Attendance by Department */}
          <div className="graph-item" style={{ width: '35%'}}>
            <h4>Top Monthly Attendance by Department</h4>
            {Array.isArray(monthlyAttendanceData) && monthlyAttendanceData.length > 0 ? (
              <LineGraph data={getMonthlyAttendanceGraphData(monthlyAttendanceData)} type="attendance" />
            ) : (
              <div className="no-data-message">
                <p>No data available.</p>
              </div>
            )}
          </div>
        </div>

        {/* Button */}
        <Link to={'/ReportAndAnalysis/OvertimeHours'}>
          <button className="view-button" style={{marginLeft:'750px'}}>View Attendance performance</button>
        </Link>
      </div>
    </div>
  );
};

export default ReportAndAnalysis;