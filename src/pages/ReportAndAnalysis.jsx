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

















// src/components/ReportAndAnalysis.jsx

// import React, { useState, useEffect } from 'react';
// import Sidebar from '../components/Sidebar';
// import test from '../assets/test.png';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import LineGraph from '../components/LineGraph';
// import TopAttendanceAchievers from '../components/TopAttendanceAchievers';
// import ProgressBars from '../components/ProgressBars';
// import MonthlyAttendanceTrends from '../components/MonthlyAttendanceTrends';
// import './ReportAndAnalysis.css';
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
// } from '../utils/api'; // Import the API functions

// const ReportAndAnalysis = () => {
//   const [overtimeData, setOvertimeData] = useState({});  // Initialize as empty object
//   const [attendanceRate, setAttendanceRate] = useState(null);
//   const [topAttendanceAchievers, setTopAttendanceAchievers] = useState([]);
//   const [workforceData, setWorkforceData] = useState(null);
//   const [leaveUtilization, setLeaveUtilization] = useState(null);
//   const [payrollCost, setPayrollCost] = useState(null);
//   const [monthlyAttendanceData, setMonthlyAttendanceData] = useState({});
//   const [progressBarData, setProgressBarData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [token, setToken] = useState(null);

//   // Get token from localStorage (parsing JSON)
//   useEffect(() => {
//     const authData = JSON.parse(localStorage.getItem('authData')); // Parse the stored object
//     const token = authData?.token; // Get the token if available
//     console.log('JWT Token for report an Analytics:', token); // Log the token to check its value
//     if (token) {
//       setToken(token); // Set the token in state
//     } else {
//       setError('Token not found in localStorage.');
//       setLoading(false);
//     }
//   }, []);

//   // Fetch data using the token
//   const fetchData = async () => {
//     try {
//       const year = 2024; // Example year
  
//       const overtimeResponse = await getOvertimeByDepartment(year, token);
//       console.log('Overtime Data:', overtimeResponse);
//       setOvertimeData(overtimeResponse.overtime_by_department);  // Ensure the structure matches the expected data format
  
//       const attendanceResponse = await getTopAttendanceAchievers(year, token);
//       console.log('Top Attendance Achievers:', attendanceResponse);
//       setTopAttendanceAchievers(attendanceResponse);
  
//       const attendanceTrendResponse = await getYearlyAttendanceTrend(year, token);
//       setMonthlyAttendanceData(attendanceTrendResponse);
  
//       const departmentAttendanceResponse = await getDepartmentAttendancePercentage(token);
//       console.log('Department Attendance Data:', departmentAttendanceResponse);
//       setProgressBarData(departmentAttendanceResponse);
  
//       const workforceResponse = await getWorkforceGrowth(year, token);
//       setWorkforceData(workforceResponse);
  
//       const rateResponse = await getAttendanceRate(token);
//       setAttendanceRate(rateResponse);
  
//       const leaveUtilizationResponse = await getLeaveUtilization(token);
//       setLeaveUtilization(leaveUtilizationResponse);
  
//       const payrollResponse = await getPayrollCost(year, token);
//       setPayrollCost(payrollResponse);
  
//       setLoading(false);
//     } catch (error) {
//       setError('Error fetching data.');
//       setLoading(false);
//     }
//   };
  

//   useEffect(() => {
//     if (token) {
//       fetchData();
//     }
//   }, [token]);

//   if (loading) {
//     return <div>Loading...</div>; // Show a loading message while data is being fetched
//   }

//   if (error) {
//     return <div>{error}</div>; // Show error if data fetch fails
//   }

//   return (
//     <div className="main-dashboard">
//       <Sidebar />
//       <div className="dashboard">
//         <div className="slide-one-1">
//           <div className="name">
//             <h5>Joseph Dooley</h5>
//             <h6>Good Morning</h6>
//           </div>
//           <div className="slide-one-2-1">
//             <div className="notification">
//               <FontAwesomeIcon icon="fa-solid fa-bell" />
//               <h6>6</h6>
//             </div>
//             <div className="user-profile">
//               <img src={test} alt="My profile" className="My-profile" />
//             </div>
//           </div>
//         </div>
//         <hr className="horizontal" />
//         <div className="dashboard-details">
//           <h5>Report and Analysis</h5>
//           <h6>24 Thursday October 2024</h6>
//         </div>
//         <div className="dashboard-details-1">
//         <div className="first-grid">
//           <FontAwesomeIcon icon="fa-circle-check" className="dashboard-icon-1" style={{ color: '#22C55E' }} />
//           <div>
//             <h6>Total workforce</h6>
//             <h5>{workforceData ? workforceData.current_workforce : 'Loading...'}</h5>
            
//             {/* Trend Icon for Total Workforce */}
//             <div className="trend-icon" style={{ color: workforceData?.trend > 0 ? '#22C55E' : (workforceData?.trend < 0 ? '#FF6464' : '#FFC107') }}>
//               {workforceData?.trend > 0 ? (
//                 <FontAwesomeIcon icon="fa-solid fa-arrow-up" />  // Green up arrow for increase
//               ) : workforceData?.trend < 0 ? (
//                 <FontAwesomeIcon icon="fa-solid fa-arrow-down" />  // Red down arrow for decrease
//               ) : (
//                 <FontAwesomeIcon icon="fa-solid fa-arrows-alt-h" />  // Yellow side arrow for no change
//               )}
//               <span>{workforceData?.trend}%</span> {/* Show trend percentage */}
//             </div>
//           </div>
//         </div>


//         <div className="first-grid">
//               <FontAwesomeIcon icon="fa-solid fa-calendar" className="dashboard-icon-2" style={{ color: '#007BFF' }} />
//               <div>
//                 <h6>Attendance Rate</h6>
//                 <h5>{attendanceRate ? `${attendanceRate.current_month_attendance_rate}%` : 'Loading...'}</h5>
                
//                 {/* Trend Icon */}
//                 <div className="trend-icon" style={{ color: attendanceRate.attendance_trend > 0 ? '#22C55E' : (attendanceRate.attendance_trend < 0 ? '#FF6464' : '#FFC107') }}>
//                   {attendanceRate.attendance_trend > 0 ? (
//                     <FontAwesomeIcon icon="fa-solid fa-arrow-up" />  // Green up arrow for increase
//                   ) : attendanceRate.attendance_trend < 0 ? (
//                     <FontAwesomeIcon icon="fa-solid fa-arrow-down" />  // Red down arrow for decrease
//                   ) : (
//                     <FontAwesomeIcon icon="fa-solid fa-arrows-alt-h" />  // Yellow side arrow for no change
//                   )}
//                   <span>{attendanceRate.attendance_trend}%</span> {/* Show trend percentage */}
//                 </div>
//               </div>
//             </div>


            
//             <div className="first-grid">
//                 <FontAwesomeIcon icon="fa-solid fa-leaf" className="dashboard-icon-3" style={{ color: '#6F42C1' }} />
//                 <div>
//                   <h6>Leave Utilization</h6>
//                   <h5>{leaveUtilization ? `${leaveUtilization.current_month_leave_utilization}%` : 'Loading...'}</h5>
                  
//                   {/* Trend Icon */}
//                   <div className="trend-icon" style={{ color: leaveUtilization.leave_trend > 0 ? '#22C55E' : (leaveUtilization.leave_trend < 0 ? '#FF6464' : '#FFC107') }}>
//                     {leaveUtilization.leave_trend > 0 ? (
//                       <FontAwesomeIcon icon="fa-solid fa-arrow-up" />  // Green up arrow for increase
//                     ) : leaveUtilization.leave_trend < 0 ? (
//                       <FontAwesomeIcon icon="fa-solid fa-arrow-down" />  // Red down arrow for decrease
//                     ) : (
//                       <FontAwesomeIcon icon="fa-solid fa-arrows-alt-h" />  // Yellow side arrow for no change
//                     )}
//                     <span>{leaveUtilization.leave_trend}%</span> {/* Show trend percentage */}
//                   </div>
//                 </div>
//               </div>


//             <div className="first-grid">
//             <FontAwesomeIcon icon="fa-solid fa-dollar-sign" className="dashboard-icon-4" style={{ color: '#FF6464' }} />
//             <div>
//               <h6>Payroll Cost</h6>
//               <h5>{payrollCost ? `N${payrollCost.payroll_cost}` : 'Loading...'}</h5>
              
//               {/* Trend Icon for Payroll Cost */}
//               <div className="trend-icon" style={{ color: payrollCost?.trend > 0 ? '#22C55E' : (payrollCost?.trend < 0 ? '#FF6464' : '#FFC107') }}>
//                 {payrollCost?.trend > 0 ? (
//                   <FontAwesomeIcon icon="fa-solid fa-arrow-up" />  // Green up arrow for increase
//                 ) : payrollCost?.trend < 0 ? (
//                   <FontAwesomeIcon icon="fa-solid fa-arrow-down" />  // Red down arrow for decrease
//                 ) : (
//                   <FontAwesomeIcon icon="fa-solid fa-arrows-alt-h" />  // Yellow side arrow for no change
//                 )}
//                 <span>{payrollCost?.trend}%</span> {/* Show trend percentage */}
//               </div>
//             </div>
//           </div>


//           </div>




//         {/* <div className="first-graph">
//           <div className="graph-container">
//             <LineGraph data={overtimeData} />
//           </div>
//           <TopAttendanceAchievers achievers={topAttendanceAchievers.length > 0 ? topAttendanceAchievers : ['No data available']} />
//         </div> */}




//           <div className="first-graph">
//             <div className="graph-container">
//               {/* Pass overtime data to LineGraph for Overtime Hours by Department */}
//               <LineGraph data={overtimeData} />  {/* Top Overtime Hours */}
//             </div>
//             <TopAttendanceAchievers achievers={topAttendanceAchievers || []} />
//           </div>

//           {/* Pass monthly attendance data to LineGraph for Monthly Attendance Trends */}
//           <div className="attendance-trends">
//             <div>
//               <MonthlyAttendanceTrends data={monthlyAttendanceData} />
//             </div>
//             <div>
//               <ProgressBars data={progressBarData || []} />  {/* Department Attendance Progress Bars */}
//             </div>
//           </div>




//         {/* <div className="attendance-trends">
//         <div>
//           <MonthlyAttendanceTrends data={monthlyAttendanceData} />
//         </div>
//         <div>
//         <ProgressBars data={progressBarData.length > 0 ? progressBarData : [{ department: 'No data', percentage: 0 }]} />
//         </div>
//       </div> */}






//         <div className="attendance-trends">
//           <div>
//             <MonthlyAttendanceTrends data={monthlyAttendanceData} />
//           </div>
//           <div>
//             <ProgressBars data={progressBarData || []} />  {/* Top Monthly Attendance by Department */}
//           </div>
//         </div>



//         <Link to={'/ReportAndAnalysis/AttendancePerformanceTable'}>
//           <button className="view-button">View Attendance Performance</button>
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

const ReportAndAnalysis = () => {
  const [overtimeData, setOvertimeData] = useState({});
  const [attendanceRate, setAttendanceRate] = useState(null);
  const [topAttendanceAchievers, setTopAttendanceAchievers] = useState([]);
  const [workforceData, setWorkforceData] = useState(null);
  const [leaveUtilization, setLeaveUtilization] = useState(null);
  const [payrollCost, setPayrollCost] = useState(null);
  const [monthlyAttendanceData, setMonthlyAttendanceData] = useState({});
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

      const overtimeResponse = await getOvertimeByDepartment(year, token);
      setOvertimeData(overtimeResponse.overtime_by_department);

      const attendanceResponse = await getTopAttendanceAchievers(year, token);
      setTopAttendanceAchievers(attendanceResponse?.best_attendance_records || []);

      const attendanceTrendResponse = await getYearlyAttendanceTrend(year, token);
      setMonthlyAttendanceData(attendanceTrendResponse);

      const departmentAttendanceResponse = await getDepartmentAttendancePercentage(token);
      setProgressBarData(departmentAttendanceResponse || []);

      const workforceResponse = await getWorkforceGrowth(year, token);
      setWorkforceData(workforceResponse);

      const rateResponse = await getAttendanceRate(token);
      setAttendanceRate(rateResponse);

      const leaveUtilizationResponse = await getLeaveUtilization(token);
      setLeaveUtilization(leaveUtilizationResponse);

      const payrollResponse = await getPayrollCost(year, token);
      setPayrollCost(payrollResponse);
    } catch (error) {
      setError('Error fetching data.');
    }
  };

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  const getTrendColor = (trend) => {
    if (trend <= 30) return 'red'; // Less than or equal to 30%
    if (trend > 30 && trend <= 50) return 'yellow'; // Between 30% and 50%
    return 'green'; // Anything greater than 50%
  };

  return (
    <div className="main-dashboard">
      <Sidebar />
      <div className="dashboard">
      <EmployerNavbar />
          <hr className="horizontal" />
          <div className="dashboard-details" style={{ marginBottom: "1rem" }}>
              
              <h5>
                    Report and Analytics
              </h5>

              <h6>{new Date().toDateString()}</h6>
          </div>

        {/* Cards Layout */}
        <div className="dashboard-details-1">
          <div className="card-container">
            {/* Total Workforce */}
            <div className="card-item">
              <FontAwesomeIcon icon="fa-circle-check" className="dashboard-icon-1" style={{ color: '#22C55E' }} />
              <div>
                <h6>Total workforce</h6>
                <h5>{workforceData ? workforceData.current_workforce : 'No data available'}</h5>
                <h6 style={{ color: getTrendColor(workforceData?.trend) }}>
                  {workforceData?.trend !== undefined ? `${workforceData.trend}%` : 'No trend available'}
                </h6>
              </div>
            </div>

            {/* Attendance Rate */}
            <div className="card-item">
              <FontAwesomeIcon icon="fa-solid fa-calendar" className="dashboard-icon-2" style={{ color: '#007BFF' }} />
              <div>
                <h6>Attendance Rate</h6>
                <h5>{attendanceRate ? `${attendanceRate.current_month_attendance_rate}%` : 'No data available'}</h5>
                <h6 style={{ color: getTrendColor(attendanceRate?.attendance_trend) }}>
                  {attendanceRate?.attendance_trend !== undefined ? `${attendanceRate.attendance_trend}%` : 'No trend available'}
                </h6>
              </div>
            </div>

            {/* Leave Utilization */}
            <div className="card-item">
              <FontAwesomeIcon icon="fa-solid fa-leaf" className="dashboard-icon-3" style={{ color: '#6F42C1' }} />
              <div>
                <h6>Leave Utilization</h6>
                <h5>{leaveUtilization ? `${leaveUtilization.current_month_leave_utilization}%` : 'No data available'}</h5>
                <h6 style={{ color: getTrendColor(leaveUtilization?.leave_trend) }}>
                  {leaveUtilization?.leave_trend !== undefined ? `${leaveUtilization.leave_trend}%` : 'No trend available'}
                </h6>
              </div>
            </div>

            {/* Payroll Cost */}
            <div className="card-item">
              <FontAwesomeIcon icon="fa-solid fa-dollar-sign" className="dashboard-icon-4" style={{ color: '#FF6464' }} />
              <div>
                <h6>Payroll Cost</h6>
                <h5>{payrollCost ? `N${payrollCost.payroll_cost}` : 'No data available'}</h5>
                <h6 style={{ color: getTrendColor(payrollCost?.trend) }}>
                  {payrollCost?.trend !== undefined ? `${payrollCost.trend}%` : 'No trend available'}
                </h6>
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
        <div className="graph-item"  style={{ width: '35%'}}>
          <h4>Top Attendance Achievers</h4>
          {topAttendanceAchievers && topAttendanceAchievers.length > 0 ? (
            <div>
              {topAttendanceAchievers.map((achiever, index) => (
                <div key={index} className="achiever-card">
                  <h5>{achiever.name}</h5>
                  <p>{achiever.job_title}</p>
                  <div className="rating">
                    <span>{'⭐'.repeat(achiever.rating)} </span>
                    <span>{achiever.rating}/5</span>
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
        <Link to={'/ReportAndAnalysis/OvertimeHours'}>
          <button className="view-button" style={{marginLeft:'750px'}}>View Department Overtime Hours</button>
        </Link>


      <div className="graphs-container" style={{ display:'flex', marginTop: '2rem', width: '100%' }}>
        {/* Top Monthly Attendance by Department */}
        <div className="graph-item" style={{ width: '60%'}}>
        <h4>Monthly Attendance Trends</h4>
        {monthlyAttendanceData && Object.keys(monthlyAttendanceData).length > 0 ? (
          <LineGraph data={monthlyAttendanceData} type="attendance" />
        ) : (
          <div className="no-data-message">
            <p>{monthlyAttendanceData?.message || 'No data available.'}</p>
          </div>
        )}
      </div>


        {/* Monthly Attendance Trends */}
          <div className="graph-item" style={{ width: '35%'}}>
          <h4>Monthly Attendance Trends</h4>
          {monthlyAttendanceData && Object.keys(monthlyAttendanceData).length > 0 ? (
            <LineGraph data={monthlyAttendanceData} type="attendance" />
          ) : (
            <div className="no-data-message">
              <p>No data available for monthly attendance trends. Please check back later.</p>
            </div>
          )}
        </div>


        
      </div>


        {/* Button */}
        <Link to={'/ReportAndAnalysis/AttendancePerformanceTable'}>
          <button className="view-button" style={{marginLeft:'750px'}}>View Attendance performance</button>
        </Link>
      </div>
    </div>
  );
};

export default ReportAndAnalysis;
