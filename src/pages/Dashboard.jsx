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

import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import '../pages/Dashboard.css';
import EmployerNavbar from "../components/EmployerNavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faBuilding, faCalendar } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  // ✅ State variables for company data
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [departmentCount, setDepartmentCount] = useState(0);
  const [pendingLeaveCount, setPendingLeaveCount] = useState(0);
  const [attendancePercentage, setAttendancePercentage] = useState(0);
  const [approvalProgress, setApprovalProgress] = useState(0);
  const [employeesPaidProgress, setEmployeesPaidProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        setLoading(true);

        // ✅ 1. Retrieve and Validate `company_id`
        const companyId = localStorage.getItem("company_id");
        if (!companyId) {
          throw new Error("Company ID is missing. Please log in again.");
        }

        // ✅ 2. Retrieve and Validate `authData`
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

        // ✅ 3. Construct API URL
        const apiUrl = `https://proximahr.onrender.com/dashboard/company-overview?company_id=${companyId}`;

        // ✅ 4. Fetch Data from API
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Failed to fetch company data: ${errorData.detail || response.status}`);
        }

        // ✅ 5. Parse Response Data
        const data = await response.json();

        // ✅ 6. Update State with API Data
        setTotalEmployees(data.total_employees || 0);
        setDepartmentCount(data.department_count || 0);
        setPendingLeaveCount(data.pending_leave_count || 0);
        setAttendancePercentage(data.attendance_percentage || 0);
        setApprovalProgress(data.approval_progress || 0);
        setEmployeesPaidProgress(data.employees_paid_progress || 0);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
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

          {/* ✅ Dashboard Summary - FLEX ROW */}
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
                <h5>{departmentCount}</h5>
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

          {/* ✅ 2x2 Grid Layout */}
          <div className="dashboard-details-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            {/* ✅ Department Overview */}
            <div className="grid">
              <h1>Department Overview</h1>
              <hr />
              <h5>Number of Departments</h5>
              <h6>{departmentCount} Department</h6>

              <div className="priority">
                <h5>Total Leaves</h5>
                <div>
                  <h6>{pendingLeaveCount} Total leaves</h6>
                </div>
              </div>

              <div className="TaskProgress">
                <h5>Attendance Rate</h5>
                <div className="progress-bar">
                  <div
                    style={{
                      width: `${attendancePercentage}%`,
                      backgroundColor: "#4caf50",
                      transition: "width 0.3s ease-in-out",
                    }}
                  ></div>
                </div>
                <p>{attendancePercentage}% completed</p>
              </div>
            </div>

            {/* ✅ Leave Requests */}
            <div className="grid">
              <h1>Leave Requests</h1>
              <hr />
              <h5>Number of pending tasks</h5>
              <h6>{pendingLeaveCount} pending Tasks</h6>
            </div>

            {/* ✅ Payroll Status */}
            <div className="grid">
              <h1>Payroll Status</h1>
              <hr />
              <h5>The current payroll status</h5>
              <h6>5 pending Tasks</h6>
            </div>

            {/* ✅ Birthdays & Anniversaries */}
            <div className="grid">
              <h1>Birthdays & Anniversaries</h1>
              <hr />
              <h5>Total count of birthdays and anniversaries</h5>
              <h6>4 upcoming</h6>
            </div>
          </div> 
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

