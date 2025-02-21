// import {React, useState} from 'react';
// import Sidebar from '../components/Sidebar'
// import test from '../assets/test.png'
// import '../pages/AttendanceAndTracking.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import DummyTable from '../components/DummyTable';
// import Pagination from '../components/Pagination';

// const AttendanceAndTracking = () => {
//  // State to control the opening and closing of the dropdowns
//  const [isMonthOpen, setIsMonthOpen] = useState(false);
//  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);

//  // Handle opening and closing the "This Month" dropdown
//  const toggleMonthDropdown = () => {
//    setIsMonthOpen(!isMonthOpen);
//    setIsDepartmentOpen(false); // Close the other dropdown when one is opened
//  };

//  // Handle opening and closing the "All Department" dropdown
//  const toggleDepartmentDropdown = () => {
//    setIsDepartmentOpen(!isDepartmentOpen);
//    setIsMonthOpen(false); // Close the other dropdown when one is opened
//  };

//     return (
//         <div>
//           <div className="main-dashboard">
//             <Sidebar/>
//             <div className="dashboard">
//             <div className="slide-one-1">
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
    
//               <hr className="horizontal" />
    
//               <div className="dashboard-details">
//                 <h5>Dashboard</h5>
//                 <h6>24 Thursday October 2024</h6>
//               </div>
    
//               <div className="dashboard-details-1">
//                 <div className="first-grid">
//                   <FontAwesomeIcon icon=" fa-circle-check" className="dashboard-icon-1" style={{color:'#22C55E',}}/> 
//                   <div>
//                     <h6>Attendance Rate</h6>
//                     <h5>92.5%</h5>
//                   </div>
//                 </div>
    
//                 <div className="first-grid">
//                 <FontAwesomeIcon icon="fa-solid fa-calendar" className="dashboard-icon-2" style={{color:'#007BFF',}} />
//                   <div>
//                     <h6>Hours Logged</h6>
//                     <h5>45,620</h5>
//                   </div>
//                 </div>
    
//                 <div className="first-grid">
//                 <FontAwesomeIcon icon="fa-clock" className="dashboard-icon-3" style={{color:'#6F42C1',}}   />
//                   <div>
//                     <h6>overtime Hours</h6>
//                     <h5>1,245</h5>
//                   </div>
//                 </div>
    
//                 <div className="first-grid">
//                 <FontAwesomeIcon icon="fa-solid fa-triangle-exclamation" className="dashboard-icon-4" style={{color:'#FF6464',}} />
//                   <div>
//                     <h6>Undertime Hours</h6>
//                     <h5>1,120</h5>
//                   </div>
//                 </div>
//               </div>

//             <div className="number-of-employee">
//                 <div className="new-div-1">
//                     <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" className="glass-icon" /><input type="text" placeholder='Search' />
//                 </div>
//                 <div className="div-2">
//                   <div className="new-btn">
//                     <button onClick={toggleMonthDropdown}>
//                       This Month <FontAwesomeIcon icon="fa-circle-chevron-down" />
//                     </button>
//                     {isMonthOpen && (
//                       <div className="dropdownstyle month-dropdown">
//                         <p>January</p>
//                         <p>February</p>
//                         <p>March</p>
//                         <p>April</p>
//                         <p>May</p>
//                         <p>June</p>
//                         <p>July</p>
//                         <p>August</p>
//                         <p>September</p>
//                         <p>October</p>
//                         <p>November</p>
//                         <p>December</p>
//                       </div>
//                     )}
//                   </div>

//                   <div className="btn">
//                     <button onClick={toggleDepartmentDropdown}>
//                       <FontAwesomeIcon icon="fa-filter" /> All Department
//                     </button>
//                     {isDepartmentOpen && (
//                       <div className="dropdownstyle department-dropdown">
//                         <p>HR</p>
//                         <p>IT</p>
//                         <p>Finance</p>
//                         <p>Sales</p>
//                         <p>Marketing</p>
//                         <p>Operations</p>
//                         <p>Support</p>
//                         <p>Legal</p>
//                         <p>Logistics</p>
//                         <p>Admin</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               <div className="table-div">
//                 {/* <p>Attendance and Tracking Monthly Overview </p> */}
//                 <DummyTable/>
//               </div>

//               <Pagination/>
                
                  
//             </div>
    
//           </div>
//         </div>
//       )
// }

// export default AttendanceAndTracking

// import React, { useState, useEffect } from 'react';
// import Sidebar from '../components/Sidebar';
// import test from '../assets/test.png';
// import '../pages/AttendanceAndTracking.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch, faFilter, faCalendar, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
// import Pagination from '../components/Pagination';

// const AttendanceAndTracking = () => {
//   const [attendanceMetrics, setAttendanceMetrics] = useState(null);
//   const [attendanceRecords, setAttendanceRecords] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [selectedMonth, setSelectedMonth] = useState('This Month');
//   const [selectedDepartment, setSelectedDepartment] = useState('All Department');
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     const fetchAttendanceMetrics = async () => {
//       try {
//         const response = await fetch(`https://proximahr.onrender.com/attendance-management/metrics`, {
//           headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
//         });
//         if (!response.ok) throw new Error("Failed to fetch metrics");
//         const data = await response.json();
//         setAttendanceMetrics(data);
//       } catch (err) {
//         setError(err.message);
//       }
//     };

//     const fetchAttendanceRecords = async () => {
//       try {
//         const response = await fetch(`https://proximahr.onrender.com/attendance-management/attendance`, {
//           headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
//         });
//         if (!response.ok) throw new Error("Failed to fetch attendance records");
//         const data = await response.json();
//         setAttendanceRecords(data?.attendance_summary || []);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAttendanceMetrics();
//     fetchAttendanceRecords();
//   }, []);

//   return (
//     <div>
//       <div className="main-dashboard">
//         <Sidebar />
//         <div className="dashboard">
//           <div className="slide-one-1">
//             <div className="name">
//               <h5>Joseph Dooley</h5>
//               <h6>Good Morning</h6>
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
//             <h5>Attendance and Tracking</h5>
//             <h6>{new Date().toDateString()}</h6>
//           </div>

//           <div className="dashboard-details-1">
//             <div className="first-grid">
//               <FontAwesomeIcon icon={faCheckCircle} className="dashboard-icon-1" style={{ color: '#22C55E' }} />
//               <div>
//                 <h6>Attendance Rate</h6>
//                 <h5>{attendanceMetrics ? `${attendanceMetrics.attendance_rate}%` : 'Loading...'}</h5>
//               </div>
//             </div>

//             <div className="first-grid">
//               <FontAwesomeIcon icon={faCalendar} className="dashboard-icon-2" style={{ color: '#007BFF' }} />
//               <div>
//                 <h6>Hours Logged</h6>
//                 <h5>{attendanceMetrics ? attendanceMetrics.hours_logged : 'Loading...'}</h5>
//               </div>
//             </div>

//             <div className="first-grid">
//               <FontAwesomeIcon icon="fa-clock" className="dashboard-icon-3" style={{ color: '#6F42C1' }} />
//               <div>
//                 <h6>Overtime Hours</h6>
//                 <h5>{attendanceMetrics ? attendanceMetrics.overtime_hours : 'Loading...'}</h5>
//               </div>
//             </div>

//             <div className="first-grid">
//               <FontAwesomeIcon icon="fa-solid fa-triangle-exclamation" className="dashboard-icon-4" style={{ color: '#FF6464' }} />
//               <div>
//                 <h6>Undertime Hours</h6>
//                 <h5>{attendanceMetrics ? attendanceMetrics.undertime_hours : 'Loading...'}</h5>
//               </div>
//             </div>
//           </div>

//           <div className="number-of-employee">
//             <div className="new-div-1">
//               <FontAwesomeIcon icon={faSearch} className="glass-icon" />
//               <input type="text" placeholder="Search Department and Employee" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
//             </div>
//             <div className="div-2">
//               <button className="filter-btn">{selectedMonth} <FontAwesomeIcon icon="fa-circle-chevron-down" /></button>
//               <button className="filter-btn">{selectedDepartment} <FontAwesomeIcon icon={faFilter} /></button>
//             </div>
//           </div>

//           <div className="table-div">
//             <table className="attendance-table">
//               <thead>
//                 <tr>
//                   <th>Department</th>
//                   <th>Attendance %</th>
//                   <th>Overtime Hours</th>
//                   <th>Undertime Hours</th>
//                   <th>Absences</th>
//                   <th>Total Logged Hours</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {loading ? (
//                   <tr><td colSpan="7">Loading...</td></tr>
//                 ) : error ? (
//                   <tr><td colSpan="7" style={{ color: 'red' }}>{error}</td></tr>
//                 ) : (
//                   attendanceRecords.length > 0 ? (
//                     attendanceRecords.map((record, index) => (
//                       <tr key={index}>
//                         <td>{record.department}</td>
//                         <td>{record.attendance_status}</td>
//                         <td>{record.overtime}</td>
//                         <td>{record.undertime}</td>
//                         <td>{record.absent}</td>
//                         <td>{record.hours_worked}</td>
//                         <td><button className="view-btn">View</button></td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr><td colSpan="7" style={{ textAlign: 'center', color: 'red' }}>No records found</td></tr>
//                   )
//                 )}
//               </tbody>
//             </table>
//           </div>

//           <Pagination />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AttendanceAndTracking;

// import React, { useState, useEffect } from 'react';
// import Sidebar from '../components/Sidebar';
// import test from '../assets/test.png';
// import '../pages/AttendanceAndTracking.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch, faFilter, faCalendar, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
// import Pagination from '../components/Pagination';

// const AttendanceAndTracking = () => {
//   const [attendanceMetrics, setAttendanceMetrics] = useState(null); // Stores attendance rate
//   const [attendanceRecords, setAttendanceRecords] = useState([]);  // Stores detailed records
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [selectedMonth, setSelectedMonth] = useState('This Month');
//   const [selectedDepartment, setSelectedDepartment] = useState('All Department');
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     const fetchAttendanceMetrics = async () => {
//       try {
//         const storedAuthData = localStorage.getItem("authData");
//         const token = storedAuthData ? JSON.parse(storedAuthData).token : null;
    
//         if (!token) {
//           console.error("❌ Error: Authentication token is missing.");
//           throw new Error("Authentication token is missing.");
//         }
    
//         const response = await fetch(`https://proximahr.onrender.com/attendance-management/metrics`, {
//           headers: {
//             "Authorization": `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });
    
//         if (!response.ok) throw new Error(`Failed to fetch metrics: ${response.status} ${response.statusText}`);
    
//         const data = await response.json();
//         console.log("✅ Attendance Metrics API Response:", data);
//         setAttendanceMetrics(data);
//       } catch (err) {
//         console.error("❌ Error fetching attendance metrics:", err.message);
//         setError(err.message);
//       }
//     };
    

//     const fetchAttendanceRecords = async () => {
//       try {
//         setLoading(true);
//         setError("");
    
//         // 🔹 Get stored authentication data
//         const storedAuthData = localStorage.getItem("authData");
//         const token = storedAuthData ? JSON.parse(storedAuthData).token : null;
//         const employeeId = localStorage.getItem("employee_id"); // ✅ Get Employee ID
    
//         if (!token) throw new Error("❌ Authentication token is missing.");
//         if (!employeeId) throw new Error("❌ Employee ID is missing.");
    
//         // ✅ Use ONLY Employee ID as a PATH PARAMETER
//         const requestUrl = `https://proximahr.onrender.com/attendance-management/attendance/HR101}`;
    
//         console.log("🔹 Fetching Attendance from:", requestUrl);
    
//         const response = await fetch(requestUrl, {
//           method: "GET",
//           headers: {
//             "Authorization": `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });
    
//         if (!response.ok) {
//           const errorResponse = await response.json();
//           console.error("❌ API Error Response:", errorResponse);
//           throw new Error(`Failed to fetch attendance records: ${response.status} ${response.statusText}`);
//         }
    
//         const data = await response.json();
//         console.log("✅ Attendance Records API Response:", data);
    
//         setAttendanceRecords(data?.attendance_summary || []);
//       } catch (err) {
//         console.error("❌ Error fetching attendance records:", err.message);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
    
    
    
  
    
//     fetchAttendanceMetrics();
//     fetchAttendanceRecords();
//   }, []);

//   return (
//     <div>
//       <div className="main-dashboard">
//         <Sidebar />
//         <div className="dashboard">
//           <div className="slide-one-1">
//             <div className="name">
//               <h5>Joseph Dooley</h5>
//               <h6>Good Morning</h6>
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
//             <h5>Attendance and Tracking</h5>
//             <h6>{new Date().toDateString()}</h6>
//           </div>

//           <div className="dashboard-details-1">
//             <div className="first-grid">
//               <FontAwesomeIcon icon={faCheckCircle} className="dashboard-icon-1" style={{ color: '#22C55E' }} />
//               <div>
//                 <h6>Attendance Rate</h6>
//                 <h5>{attendanceMetrics ? `${attendanceMetrics.attendance_rate}%` : 'Loading...'}</h5>
//               </div>
//             </div>

//             <div className="first-grid">
//               <FontAwesomeIcon icon={faCalendar} className="dashboard-icon-2" style={{ color: '#007BFF' }} />
//               <div>
//                 <h6>Hours Logged</h6>
//                 <h5>{attendanceMetrics ? attendanceMetrics.hours_logged : 'Loading...'}</h5>
//               </div>
//             </div>

//             <div className="first-grid">
//               <FontAwesomeIcon icon="fa-clock" className="dashboard-icon-3" style={{ color: '#6F42C1' }} />
//               <div>
//                 <h6>Overtime Hours</h6>
//                 <h5>{attendanceMetrics ? attendanceMetrics.overtime_hours : 'Loading...'}</h5>
//               </div>
//             </div>

//             <div className="first-grid">
//               <FontAwesomeIcon icon="fa-solid fa-triangle-exclamation" className="dashboard-icon-4" style={{ color: '#FF6464' }} />
//               <div>
//                 <h6>Undertime Hours</h6>
//                 <h5>{attendanceMetrics ? attendanceMetrics.undertime_hours : 'Loading...'}</h5>
//               </div>
//             </div>
//           </div>

//           <div className="number-of-employee">
//             <div className="new-div-1">
//               <FontAwesomeIcon icon={faSearch} className="glass-icon" />
//               <input type="text" placeholder="Search Department and Employee" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
//             </div>
//             <div className="div-2">
//               <button className="filter-btn">{selectedMonth} <FontAwesomeIcon icon="fa-circle-chevron-down" /></button>
//               <button className="filter-btn">{selectedDepartment} <FontAwesomeIcon icon={faFilter} /></button>
//             </div>
//           </div>

//           <div className="table-div">
//             <table className="attendance-table">
//               <thead>
//                 <tr>
//                   <th>Date</th>
//                   <th>Attendance Status</th>
//                   <th>Hours Worked</th>
//                   <th>Overtime</th>
//                   <th>Undertime</th>
//                   <th>Absent</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {loading ? (
//                   <tr><td colSpan="7">Loading...</td></tr>
//                 ) : error ? (
//                   <tr><td colSpan="7" style={{ color: 'red' }}>{error}</td></tr>
//                 ) : (
//                   attendanceRecords.length > 0 ? (
//                     attendanceRecords.map((record, index) => (
//                       <tr key={index}>
//                         <td>{record.date}</td>
//                         <td>{record.attendance_status}</td>
//                         <td>{record.hours_worked}</td>
//                         <td>{record.overtime ? "Yes" : "No"}</td>
//                         <td>{record.undertime ? "Yes" : "No"}</td>
//                         <td>{record.absent ? "Yes" : "No"}</td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr><td colSpan="7" style={{ textAlign: 'center', color: 'red' }}>No records found</td></tr>
//                   )
//                 )}
//               </tbody>
//             </table>
//           </div>

//           <Pagination />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AttendanceAndTracking;

import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import test from '../assets/test.png';
import '../pages/AttendanceAndTracking.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faCalendar, faCheckCircle, faClock } from '@fortawesome/free-solid-svg-icons';
import Pagination from '../components/Pagination';

const AttendanceAndTracking = () => {
  const [attendanceMetrics, setAttendanceMetrics] = useState(null); // Stores attendance rate
  const [attendanceRecords, setAttendanceRecords] = useState([]);  // Stores detailed records
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMonth, setSelectedMonth] = useState('This Month');
  const [selectedDepartment, setSelectedDepartment] = useState('All Department');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAttendanceMetrics = async () => {
      try {
        const storedAuthData = localStorage.getItem("authData");
        const token = storedAuthData ? JSON.parse(storedAuthData).token : null;

        if (!token) {
          console.error("❌ Error: Authentication token is missing.");
          throw new Error("Authentication token is missing.");
        }

        const response = await fetch(`https://proximahr.onrender.com/attendance-management/metrics`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error(`Failed to fetch metrics: ${response.status} ${response.statusText}`);

        const data = await response.json();
        setAttendanceMetrics(data);
      } catch (err) {
        console.error("❌ Error fetching attendance metrics:", err.message);
        setError(err.message);
      }
    };

    const fetchAttendanceRecords = async () => {
      try {
        setLoading(true);
        setError("");
    
        const storedAuthData = localStorage.getItem("authData");
        const token = storedAuthData ? JSON.parse(storedAuthData).token : null;
        const employeeId = localStorage.getItem("employee_id");
    
        console.log("Employee ID:", employeeId);  // Log the employee ID
    
        if (!token) throw new Error("❌ Authentication token is missing.");
        if (!employeeId) throw new Error("❌ Employee ID is missing.");
    
        const requestUrl = `https://proximahr.onrender.com/attendance-management/attendance/${employeeId}`;
    
        const response = await fetch(requestUrl, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
    
        console.log("Response Status:", response.status);  // Log the response status
        const responseBody = await response.text();
        console.log("Response Body:", responseBody);  // Log the response body
    
        if (response.status === 404) {
          // No attendance records found for this employee
          setAttendanceRecords([]); // Clear out the records
          setError("No attendance records available for this employee.");
        } else if (!response.ok) {
          throw new Error(`Failed to fetch attendance records: ${response.status} ${response.statusText}`);
        } else {
          const data = await response.json();
          setAttendanceRecords(data?.attendance_summary || []);
        }
      } catch (err) {
        console.error("❌ Error fetching attendance records:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    

    fetchAttendanceMetrics();
    fetchAttendanceRecords();
  }, []);

  return (
    <div>
      <div className="main-dashboard">
        <Sidebar />
        <div className="dashboard">
          <div className="slide-one-1">
            <div className="name">
              <h5>Joseph Dooley</h5>
              <h6>Good Morning</h6>
            </div>
            <div className="slide-one-2-1">
              <div className="notification">
                <FontAwesomeIcon icon="fa-solid fa-bell" />
                <h6>6</h6>
              </div>
              <div className="user-profile">
                <img src={test} alt="My profile" className="My-profile" />
              </div>
            </div>
          </div>

          <hr className="horizontal" />

          <div className="dashboard-details">
            <h5>Attendance and Tracking</h5>
            <h6>{new Date().toDateString()}</h6>
          </div>

          <div className="dashboard-details-1">
            <div className="first-grid">
              <FontAwesomeIcon icon={faCheckCircle} className="dashboard-icon-1" style={{ color: '#22C55E' }} />
              <div>
                <h6>Attendance Rate</h6>
                <h5>{attendanceMetrics ? `${attendanceMetrics.attendance_rate}%` : 'Loading...'}</h5>
              </div>
            </div>

            <div className="first-grid">
              <FontAwesomeIcon icon={faCalendar} className="dashboard-icon-2" style={{ color: '#007BFF' }} />
              <div>
                <h6>Hours Logged</h6>
                <h5>{attendanceRecords ? attendanceRecords.reduce((acc, record) => acc + record.hours_worked, 0).toFixed(2) : 'Loading...'}</h5>
              </div>
            </div>

            <div className="first-grid">
              <FontAwesomeIcon icon={faClock} className="dashboard-icon-3" style={{ color: '#6F42C1' }} />
              <div>
                <h6>Overtime Hours</h6>
                <h5>{attendanceRecords ? attendanceRecords.filter(record => record.overtime === 1).length : 'Loading...'}</h5>
              </div>
            </div>

            <div className="first-grid">
              <FontAwesomeIcon icon="fa-solid fa-triangle-exclamation" className="dashboard-icon-4" style={{ color: '#FF6464' }} />
              <div>
                <h6>Undertime Hours</h6>
                <h5>{attendanceRecords ? attendanceRecords.filter(record => record.undertime === 1).length : 'Loading...'}</h5>
              </div>
            </div>
          </div>

          <div className="number-of-employee">
            <div className="new-div-1">
              <FontAwesomeIcon icon={faSearch} className="glass-icon" />
              <input type="text" placeholder="Search Department and Employee" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <div className="div-2">
              <button className="filter-btn">{selectedMonth} <FontAwesomeIcon icon="fa-circle-chevron-down" /></button>
              <button className="filter-btn">{selectedDepartment} <FontAwesomeIcon icon={faFilter} /></button>
            </div>
          </div>

          <div className="table-div">
            <table className="attendance-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Attendance Status</th>
                  <th>Hours Worked</th>
                  <th>Overtime</th>
                  <th>Undertime</th>
                  <th>Absent</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="7">Loading...</td></tr>
                ) : error ? (
                  <tr><td colSpan="7" style={{ color: 'red' }}>{error}</td></tr>
                ) : (
                  attendanceRecords.length > 0 ? (
                    attendanceRecords.map((record, index) => (
                      <tr key={index}>
                        <td>{record.date}</td>
                        <td>{record.attendance_status}</td>
                        <td>{record.hours_worked}</td>
                        <td>{record.overtime ? "Yes" : "No"}</td>
                        <td>{record.undertime ? "Yes" : "No"}</td>
                        <td>{record.absent ? "Yes" : "No"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="7" style={{ textAlign: 'center', color: 'red' }}>No attendance records found</td></tr>
                  )
                )}
              </tbody>

            </table>
          </div>

          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default AttendanceAndTracking;
