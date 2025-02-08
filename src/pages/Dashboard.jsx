// import React, { useState, useEffect } from 'react';
// import Sidebar from '../components/Sidebar';
// import test from '../assets/test.png';
// import '../pages/Dashboard.css';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fas } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import EmployerNavbar from '../components/EmployerNavbar';

// library.add(fas);

// const Dashboard = () => {
//   const [attendanceProgress, setAttendanceProgress] = useState(0);
//   const [approvalProgress, setApprovalProgress] = useState(0);
//   const [employeesPaidProgress, setEmployeesPaidProgress] = useState(0);

//   // Simulate fetching data from backend
//   useEffect(() => {
//     // Replace this with actual API calls
//     const fetchData = async () => {
//       const backendData = {
//         attendanceRate: 94,
//         approvalRate: 40,
//         employeesPaidRate: 96,
//       };
//       setAttendanceProgress(backendData.attendanceRate);
//       setApprovalProgress(backendData.approvalRate);
//       setEmployeesPaidProgress(backendData.employeesPaidRate);
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <div className="main-dashboard">
//         <Sidebar />
//         <div className="dashboard">
//           <div className="slide-one-1">
//             <EmployerNavbar/>
//           </div>

//           <hr className="horizontal" />

//           <div className="dashboard-details">
//             <h5>Department</h5>
//             <h6>24 Thursday October 2024</h6>
//           </div>

//           <div className="dashboard-details-1">
//             <div className="first-grid">
//               <FontAwesomeIcon icon="fa-solid fa-users" className="dashboard-icon" />
//               <div>
//                 <h6>Total employees</h6>
//                 <h5>40</h5>
//               </div>
//             </div>

//             <div className="first-grid">
//               <FontAwesomeIcon icon="fa-solid fa-building" className="dashboard-icon" />
//               <div>
//                 <h6>Department</h6>
//                 <h5>13</h5>
//               </div>
//             </div>

//             <div className="first-grid">
//               <FontAwesomeIcon icon="fa-solid fa-calendar" className="dashboard-icon" />
//               <div>
//                 <h6>Leave requests</h6>
//                 <h5>2</h5>
//               </div>
//             </div>

//             <div className="first-grid">
//               <FontAwesomeIcon icon="fa-solid fa-users" className="dashboard-icon" />
//               <div>
//                 <h6>Attendance Overview</h6>
//                 <h5>92%</h5>
//               </div>
//             </div>
//           </div>

//           <div className="dashboard-details-2">
//             <div className="grid">
//               <h1>Department Overview</h1>
//               <hr />
//               <h5>Number of Department</h5>
//               <h6>13 Department</h6>

//               <div className="priority">
//                 <h5>Total Leaves</h5>
//                 <div>
//                   <h6>32 Total leaves</h6>
//                 </div>
//               </div>

//               <div className="TaskProgress">
//                 <h5>Attendance Rate</h5>
//                 <div
//                   style={{
//                     width: "100%",
//                     height: "10px",
//                     backgroundColor: "#e0e0e0",
//                     borderRadius: "5px",
//                     overflow: "hidden",
//                     padding: "0 5px",
//                   }}
//                 >
//                   <div
//                     style={{
//                       width: `${attendanceProgress}%`,
//                       height: "100%",
//                       backgroundColor: "#4caf50",
//                       transition: "width 0.3s ease-in-out",
//                     }}
//                   ></div>
//                 </div>
//                 <p>{attendanceProgress}% completed</p>
//               </div>

//               <div className="last-div">
//                 <div className="lastdiv-1">
//                   <div><FontAwesomeIcon icon="fa-calendar" /></div>
//                   <div>
//                     <h6>Average Work Hours</h6>
//                     <h5>07:20:03</h5>
//                   </div>
//                 </div>
//                 <button style={{width:'170px'}} >Manage Deaprtment</button>
//               </div>
//             </div>

//             <div className="grid">
//               <h1>Leave Requests</h1>
//               <hr />
//               <h5>Number of pending tasks</h5>
//               <h6>2 pending Tasks</h6>

//               <div className="priority">
//                 <h5>Leave Type</h5>
//                 <div>
//                   <h4>2 pending</h4>
//                   <h3>1 Approved</h3>
//                 </div>
//               </div>

//               <div className="TaskProgress">
//                 <h5>Approval Status</h5>
//                 <div
//                   style={{
//                     width: "100%",
//                     height: "10px",
//                     backgroundColor: "#e0e0e0",
//                     borderRadius: "5px",
//                     overflow: "hidden",
//                     padding: "0 5px",
//                   }}
//                 >
//                   <div
//                     style={{
//                       width: `${approvalProgress}%`,
//                       height: "100%",
//                       backgroundColor: "#2196F3",
//                       transition: "width 0.3s ease-in-out",
//                     }}
//                   ></div>
//                 </div>
//                 <p>{approvalProgress}% Approved</p>
//               </div>

//               <div className="last-div">
//                 <div className="lastdiv-1">
//                   <div><FontAwesomeIcon icon="fa-calendar" /></div>
//                   <div>
//                     <h6>Upcoming Leave Dates</h6>
//                     <h5>Oct 20, 2024</h5>
//                   </div>
//                 </div>
//                 <button>Manage Leave</button>
//               </div>
//             </div>
//           </div>

//           <div className="dashboard-details-2">
//             <div className="grid-3">
//               <h1>Payroll Status</h1>
//               <hr />
//               <h5>The current payroll status</h5>
//               <h6>5 pending Tasks</h6>

//               <div className="TaskProgress-3">
//                 <h5>Employees Paid</h5>
//                 <div
//                   style={{
//                     width: "100%",
//                     height: "10px",
//                     backgroundColor: "#e0e0e0",
//                     borderRadius: "5px",
//                     overflow: "hidden",
//                     padding: "0 5px",
//                   }}
//                 >
//                   <div
//                     style={{
//                       width: `${employeesPaidProgress}%`,
//                       height: "100%",
//                       backgroundColor: "#4caf50",
//                       transition: "width 0.3s ease-in-out",
//                     }}
//                   ></div>
//                 </div>
//                 <p>{employeesPaidProgress}% completed</p>
//               </div>

//               <div className="last-div-3">
//                 <div className="lastdiv-1-3">
//                   <div><FontAwesomeIcon icon="fa-calendar" /></div>
//                   <div>
//                     <h6>Next Payroll Date</h6>
//                     <h5>Oct 31, 2024</h5>
//                   </div>
//                 </div>
//                 <button>Manage Payroll</button>
//               </div>
//             </div>

//             <div className="grid">
//               <h1>Birthdays & Anniversaries</h1>
//               <hr />
//               <h5>Total count of birthdays and anniversaries</h5>
//               <h6>4 upcoming</h6>

//               <div className="priority">
//                 <h5>Events</h5>
//                 <div>
//                   <h6>2 Birthdays</h6>
//                   <h4>2 Anniversaries</h4>
//                 </div>
//               </div>

//               <div className="last-div">
//                 <div className="lastdiv-1">
//                   <div><FontAwesomeIcon icon="fa-calendar" /></div>
//                   <div>
//                     <h6>Birthday</h6>
//                     <h5>John Doe</h5>
//                   </div>
//                 </div>
//                 <div className="lastdiv-1">
//                   <div><FontAwesomeIcon icon="fa-calendar" /></div>
//                   <div>
//                     <h6>One Year Anniversary</h6>
//                     <h5>Emma Clark</h5>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



// import React, { useState, useEffect } from "react";
// import Sidebar from "../components/Sidebar";
// import '../pages/Dashboard.css';
// import EmployerNavbar from "../components/EmployerNavbar";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUsers, faBuilding, faCalendar } from "@fortawesome/free-solid-svg-icons";

// const Dashboard = () => {
//   // ✅ State variables for Department Overview (Connected to API)
//   const [departmentCount, setDepartmentCount] = useState(0);
//   const [attendanceRate, setAttendanceRate] = useState(0);
//   const [approvedLeaveCount, setApprovedLeaveCount] = useState(0);
//   const [activeLeaveCount, setActiveLeaveCount] = useState(0);
//   const [averageHoursWorked, setAverageHoursWorked] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchDepartmentOverview = async () => {
//       try {
//         setLoading(true);

//         // ✅ Retrieve `company_id`
//         const companyId = localStorage.getItem("company_id");
//         if (!companyId) {
//           throw new Error("Company ID is missing. Please log in again.");
//         }

//         // ✅ Retrieve and Validate `authData`
//         const storedAuthData = localStorage.getItem("authData");
//         if (!storedAuthData) {
//           throw new Error("Authentication data is missing. Please log in.");
//         }

//         let authData;
//         try {
//           authData = JSON.parse(storedAuthData);
//         } catch (error) {
//           throw new Error("Invalid authentication data format. Please log in again.");
//         }

//         const token = authData?.token;
//         if (!token) {
//           throw new Error("Authentication token is missing. Please log in.");
//         }

//         // ✅ Construct API URL
//         const apiUrl = `https://proximahr.onrender.com/dashboard/department-overview?company_id=${companyId}`;

//         // ✅ Fetch Data from API
//         const response = await fetch(apiUrl, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(`Failed to fetch department overview: ${errorData.detail || response.status}`);
//         }

//         // ✅ Parse Response Data
//         const data = await response.json();

//         // ✅ Update State with API Data
//         setDepartmentCount(data.department_count || 0);
//         setAttendanceRate(data.attendance_rate || 0);
//         setApprovedLeaveCount(data.approved_leave_count || 0);
//         setActiveLeaveCount(data.active_leave_count || 0);
//         setAverageHoursWorked(data.average_hours_worked || 0);

//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDepartmentOverview();
//   }, []);

//   return (
//     <div>
//       <div className="main-dashboard">
//         <Sidebar />
//         <div className="dashboard">
//           <div className="slide-one-1">
//             <EmployerNavbar />
//           </div>

//           <hr className="horizontal" />

//           <div className="dashboard-details">
//             <h5>Department</h5>
//             <h6>{new Date().toDateString()}</h6>
//           </div>

//           {/* ✅ Dashboard Summary */}
//           <div className="dashboard-details-1" style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "space-between" }}>
//             <div className="first-grid">
//               <FontAwesomeIcon icon={faUsers} className="dashboard-icon" />
//               <div>
//                 <h6>Total Employees</h6>
//                 <h5>{departmentCount}</h5>
//               </div>
//             </div>

//             <div className="first-grid">
//               <FontAwesomeIcon icon={faBuilding} className="dashboard-icon" />
//               <div>
//                 <h6>Departments</h6>
//                 <h5>{departmentCount}</h5>
//               </div>
//             </div>

//             <div className="first-grid">
//               <FontAwesomeIcon icon={faCalendar} className="dashboard-icon" />
//               <div>
//                 <h6>Pending Leave Requests</h6>
//                 <h5>{approvedLeaveCount}</h5>
//               </div>
//             </div>

//             <div className="first-grid">
//               <FontAwesomeIcon icon={faUsers} className="dashboard-icon" />
//               <div>
//                 <h6>Attendance Overview</h6>
//                 <h5>{attendanceRate}%</h5>
//               </div>
//             </div>
//           </div>

//           {/* ✅ 2x2 Grid Layout With Adjustable Height */}
//           <div className="dashboard-details-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            
//             {/* ✅ Department Overview (Detailed API Data) */}
//             <div className="grid" style={{ minHeight: "420px", padding: "20px", border: "1px solid #ddd", borderRadius: "10px" }}>
//               <h1>Department Overview</h1>
//               <hr style={{ width: "487px", marginLeft:"-20px", marginTop:"10px", marginBottom:"30px", borderTop: "2px solid #ccc" }} />
//               <h5>Number of Departments</h5>
//               <h6>{departmentCount} Department(s)</h6>

//               <div className="priority">
//                 <h5>Total Approved Leaves</h5>
//                 <div>
//                   <h6>{approvedLeaveCount} Approved Leaves</h6>
//                 </div>
//               </div>

//               <div className="priority">
//                 <h5>Active Leaves</h5>
//                 <div>
//                   <h6>{activeLeaveCount} Active Leaves</h6>
//                 </div>
//               </div>

//               <div className="TaskProgress">
//                 <h5>Attendance Rate</h5>
//                 <div className="progress-bar">
//                   <div
//                     style={{
//                       width: `${attendanceRate}%`,
//                       backgroundColor: "#4caf50",
//                       transition: "width 0.3s ease-in-out",
//                     }}
//                   ></div>
//                 </div>
//                 <p>{attendanceRate}% Attendance</p>
//               </div>

//               <div className="last-div">
//                 <div className="lastdiv-1">
//                   <FontAwesomeIcon icon={faCalendar} />
//                   <div>
//                     <h6>Average Work Hours</h6>
//                     <h5>{averageHoursWorked} Hours/Day</h5>
//                   </div>
//                 </div>
//                 <button style={{ width: '170px' }}>Manage Department</button>
//               </div>
//             </div>

//             {/* ✅ Other Grid Containers */}
//             <div className="grid" style={{ minHeight: "260px", padding: "20px" }}><h1>Leave Requests</h1></div>
//             <div className="grid" style={{ minHeight: "260px", padding: "20px" }}><h1>Payroll Status</h1></div>
//             <div className="grid" style={{ minHeight: "260px", padding: "20px" }}><h1>Birthdays & Anniversaries</h1></div>

//           </div> 
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import '../pages/Dashboard.css';
import { Link } from "react-router-dom";
import EmployerNavbar from "../components/EmployerNavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faBuilding, faCalendar } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  
  // ✅ State variables for Company Data  
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [newDepartmentCount, setnewDepartmentCount] = useState(0);
  const [pendingLeaveCount, setPendingLeaveCount] = useState(0);
  const [attendancePercentage, setAttendancePercentage] = useState(0);


  // ✅ State variables for Department Overview
  const [departmentCount, setDepartmentCount] = useState(0);
  const [attendanceRate, setAttendanceRate] = useState(0);
  const [approvedLeaveCount, setApprovedLeaveCount] = useState(0);
  const [activeLeaveCount, setActiveLeaveCount] = useState(0);
  const [averageHoursWorked, setAverageHoursWorked] = useState(0);
  
  // ✅ State variables for Leave Overview
  const [pendingLeaves, setPendingLeaves] = useState(0);
  const [monthlyApprovedLeaves, setMonthlyApprovedLeaves] = useState(0);
  const [leaveApprovalRate, setLeaveApprovalRate] = useState(0);

  // ✅ State variables for payroll status
  const [totalPayrollCost, setTotalPayrollCost] = useState(0);
  const [paidPercentage, setPaidPercentage] = useState(0);
  const [paidEmployees, setPaidEmployees] = useState(0);
  const [nextPayrollDate, setNextPayrollDate] = useState("");

  // ✅ State variables for Events Overview
  const [birthdayCount, setBirthdayCount] = useState(0);
  const [birthdays, setBirthdays] = useState([]);
  const [anniversaryCount, setAnniversaryCount] = useState(0);
  const [anniversaries, setAnniversaries] = useState([]);
  const [totalEventCount, setTotalEventCount] = useState(0);


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // ✅ Retrieve `company_id`
        const companyId = localStorage.getItem("company_id");
        if (!companyId) {
          throw new Error("Company ID is missing. Please log in again.");
        }

        // ✅ Retrieve and Validate `authData`
        const storedAuthData = localStorage.getItem("authData");
        if (!storedAuthData) {
          throw new Error("Authentication data is missing. Please log in.");
        }

        let authData;
        try {
          authData = JSON.parse(storedAuthData);
        } catch (error) {
          throw new Error("Invalid authentication data format. Please log in again.");
        }

        const token = authData?.token;
        if (!token) {
          throw new Error("Authentication token is missing. Please log in.");
        }

        // ✅ API URLs
        const apiUrl = `https://proximahr.onrender.com/dashboard/company-overview?company_id=${companyId}`;
        const departmentApiUrl = `https://proximahr.onrender.com/dashboard/department-overview?company_id=${companyId}`;
        const leaveApiUrl = `https://proximahr.onrender.com/dashboard/leave-overview?company_id=${companyId}`;
        const payrollApiUrl = `https://proximahr.onrender.com/dashboard/payroll-overview?company_id=${companyId}`;
        const eventsApiUrl = `https://proximahr.onrender.com/dashboard/events?company_id=${companyId}`;


        // ✅ Fetch company data
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("API Error Response:", errorData);
          throw new Error(`Failed to fetch company data: ${errorData.detail || response.status}`);
        }
  

        // ✅ Fetch Department Overview & Leave Overview in Parallel
        const [deptResponse, leaveResponse,eventsResponse] = await Promise.all([
          fetch(departmentApiUrl, {
            method: "GET",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          }),
          fetch(leaveApiUrl, {
            method: "GET",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          }),
          fetch(eventsApiUrl, {
            method: "GET",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          }),
        ]);

        if (!deptResponse.ok) {
          throw new Error(`Failed to fetch department overview`);
        }
        if (!leaveResponse.ok) {
          throw new Error(`Failed to fetch leave overview`);
        }
        if (!eventsResponse.ok) {
          throw new Error(`Failed to fetch events overview`);
        }



        // ✅ Fetch company data
        const payrollResponse = await fetch(payrollApiUrl, {
          method: "GET",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        });
    
        if (!payrollResponse.ok) {
          throw new Error("Failed to fetch payroll overview");
        }

        

        // ✅ Parse Response Data
        const data = await response.json();
        const deptData = await deptResponse.json();
        const leaveData = await leaveResponse.json();
        const payrollData = await payrollResponse .json();
        const eventsData = await eventsResponse.json();
        

        // ✅ Update company data State
        setTotalEmployees(data.total_employees);
        setnewDepartmentCount(data.department_count);
        setPendingLeaveCount(data.pending_leave_count);
        setAttendancePercentage(data.attendance_percentage);
  

        // ✅ Update Department Overview State
        setDepartmentCount(deptData.department_count || 0);
        setAttendanceRate(deptData.attendance_rate || 0);
        setApprovedLeaveCount(deptData.approved_leave_count || 0);
        setActiveLeaveCount(deptData.active_leave_count || 0);
        setAverageHoursWorked(deptData.average_hours_worked || 0);



        // ✅ Update Leave Overview State
        setPendingLeaves(leaveData.pending_leaves || 0);
        setMonthlyApprovedLeaves(leaveData.monthly_approved_leaves || 0);
        setLeaveApprovalRate(leaveData.leave_approval_rate || 0);


        // ✅ Update Payroll Overview State
        setTotalPayrollCost(payrollData.total_payroll_cost || 0);
        setPaidPercentage(payrollData.paid_percentage || 0);
        setPaidEmployees(payrollData.paid_employees || 0);
        setNextPayrollDate(payrollData.next_payroll_date || "N/A");


        // ✅ Update Events Overview State
        setBirthdayCount(eventsData.birthday_count || 0);
        setBirthdays(eventsData.birthdays || []);
        setAnniversaryCount(eventsData.anniversary_count || 0);
        setAnniversaries(eventsData.anniversaries || []);
        setTotalEventCount(eventsData.total_event_count || 0);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div>
      <div className="main-dashboard">
        <Sidebar />
        <div className="dashboard">
          <div className="slide-one-1">
            <EmployerNavbar />
          </div>

          <hr className="horizontal" />

          <div className="dashboard-details">
            <h5>Department</h5>
            <h6>{new Date().toDateString()}</h6>
          </div>

           {/* ✅ Dashboard Summary */}
            <div className="dashboard-details-1" style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "space-between" }}>
            <div className="first-grid">
            <FontAwesomeIcon icon={faUsers} className="dashboard-icon" />
            <div>
            <h6>Total Employees</h6>
            <h5>{totalEmployees}</h5>
            </div>
            </div>

            <div className="first-grid">
            <FontAwesomeIcon icon={faBuilding} className="dashboard-icon" />
            <div>
            <h6>Departments</h6>
            <h5>{newDepartmentCount}</h5>
            </div>
            </div>

            <div className="first-grid">
            <FontAwesomeIcon icon={faCalendar} className="dashboard-icon" />
            <div>
            <h6>Pending Leave Requests</h6>
            <h5>{pendingLeaveCount}</h5>
            </div>
            </div>

            <div className="first-grid">
            <FontAwesomeIcon icon={faUsers} className="dashboard-icon" />
            <div>
            <h6>Attendance Overview</h6>
            <h5>{attendancePercentage}%</h5>
            </div>
            </div>
            </div>


          {/* ✅ 2x2 Grid Layout With Adjustable Height */}
          <div className="dashboard-details-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            
            {/* ✅ Department Overview */}
            <div className="grid" style={{ minHeight: "420px"}}>
              <h1>Department Overview</h1>
              <hr />
              <h5>Number of Departments</h5>
              <h6>{departmentCount} Department(s)</h6>
              <div className="priority">
                <h5>Total Approved Leaves</h5>
                <div>
                  <h6>{approvedLeaveCount} Approved Leaves</h6>
                </div>
              </div>
              <div className="priority">
                <h5>Active Leaves</h5>
                <div>
                  <h6>{activeLeaveCount} Active Leaves</h6>
                </div>
              </div>
              <div className="TaskProgress">
                <h5>Attendance Rate</h5>
                <div className="progress-bar">
                  <div style={{ width: `${attendanceRate}%`, backgroundColor: "#4caf50", transition: "width 0.3s ease-in-out" }}></div>
                </div>
                <p>{attendanceRate}% Attendance</p>
              </div>

              <div className="last-div">
                <div className="lastdiv-1">
                  <FontAwesomeIcon icon={faCalendar} />
                  <div>
                    <h6>Average Work Hours</h6>
                    <h5>{averageHoursWorked} Hours/Day</h5>
                  </div>
                </div>
                <Link to="/department"><button style={{ width: '170px', backgroundColor: "#007BFF", color: "#fff"}}>Manage Department</button></Link>
              </div>


            </div>

            {/* ✅ Leave Requests */}
            <div className="grid" style={{ minHeight: "420px"}}>
              <h1>Leave Requests</h1>
              <hr />
              <h5>Pending Leaves</h5>
              <h6>{pendingLeaves} Pending</h6>
              <div className="priority">
                <h5>Leave Type</h5>
                <div>
                  <h4>{pendingLeaves} pending</h4>
                  <h3>{monthlyApprovedLeaves} Approved</h3>
                </div>
              </div>
              <div className="TaskProgress">
                <h5>Approval Status</h5>
                <div className="progress-bar">
                  <div style={{ width: `${leaveApprovalRate}%`, backgroundColor: "#2196F3", transition: "width 0.3s ease-in-out" }}></div>
                </div>
                <p>{leaveApprovalRate}% Approved</p>
              </div>

              <div className="last-div" style={{ marginTop: "65px"}}>
                <div className="lastdiv-1">
                  <FontAwesomeIcon icon={faCalendar} />
                  <div>
                    <h6>Monthly Approved Leaves</h6>
                    <h5>{monthlyApprovedLeaves}</h5>
                  </div>
                </div>
                <button style={{ width: '170px', backgroundColor: "#007BFF", color: "#fff"}}>Manage Leaves</button>
              </div>
            </div>


            <div className="grid" style={{ minHeight: "420px", marginBottom: "110px"}}>
                  <h1>Payroll Status</h1>
                  <hr />
                  <h5>Total Payroll Cost</h5>
                  <h6>${totalPayrollCost.toFixed(2)}</h6>

                  <div className="TaskProgress-3">
                    <h5>Employees Paid</h5>
                    <div
                      style={{
                        width: "100%",
                        height: "10px",
                        backgroundColor: "#e0e0e0",
                        borderRadius: "5px",
                        overflow: "hidden",
                        padding: "0 5px",
                      }}
                    >
                      <div
                        style={{
                          width: `${paidPercentage}%`,
                          height: "100%",
                          backgroundColor: "#4caf50",
                          transition: "width 0.3s ease-in-out",
                        }}
                      ></div>
                    </div>
                    <p>{paidPercentage}% completed</p>
                  </div>

                  <div className="last-div-3">
                    <div className="lastdiv-1-3">
                      <div><FontAwesomeIcon icon={faCalendar} /></div>
                      <div >
                        <h6>Next Payroll Date</h6>
                        <h5>{nextPayrollDate}</h5>
                      </div>
                    </div>
                    <button style={{ width: '170px', backgroundColor: "#007BFF", color: "#fff"}} >Manage Payroll</button>
                  </div>
                </div>  



            <div className="grid" style={{ minHeight: "420px" , marginBottom: "110px"}}>
              <h1>Birthdays & Anniversaries</h1>
              <hr />
              <h5>Total Upcoming Events</h5>
              <h6>{totalEventCount} events</h6>

              <div className="priority">
                <h5>Upcoming Birthdays</h5>
                {birthdays.length > 0 ? (
                  birthdays.map((birthday, index) => (
                    <h6 key={index}>
                      {birthday.first_name} {birthday.last_name} - {birthday.this_year_birthday}
                    </h6>
                  ))
                ) : (
                  <h6 style={{width: "300px"}} >No upcoming birthdays</h6>
                )}
              </div>

              <div className="priority">
                <h5>Upcoming Anniversaries</h5>
                {anniversaries.length > 0 ? (
                  anniversaries.map((anniversary, index) => (
                    <h6 key={index}>
                      {anniversary.first_name} {anniversary.last_name} - {anniversary.this_year_anniversary}
                    </h6>
                  ))
                ) : (
                  <h6 style={{width: "300px"}}>No upcoming anniversaries</h6>
                )}
              </div>

              <div className="last-div">
                <div className="lastdiv-1">
                  <FontAwesomeIcon icon={faCalendar} />
                  <div>
                    <h6>Manage Events</h6>
                  </div>
                </div>
                {/* <button style={{ width: '170px' }}>Manage Events</button> */}
              </div>
            </div>


            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
