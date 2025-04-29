// import React, { useState, useEffect } from 'react';
// import Sidebar from '../components/Sidebar';
// import test from '../assets/test.png';
// import '../pages/AttendanceAndTracking.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch, faFilter, faCalendar, faCheckCircle, faClock } from '@fortawesome/free-solid-svg-icons';
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
    
//         const storedAuthData = localStorage.getItem("authData");
//         const token = storedAuthData ? JSON.parse(storedAuthData).token : null;
//         const employeeId = localStorage.getItem("employee_id");
    
//         console.log("Employee ID:", employeeId);  // Log the employee ID
    
//         if (!token) throw new Error("❌ Authentication token is missing.");
//         if (!employeeId) throw new Error("❌ Employee ID is missing.");
    
//         const requestUrl = `https://proximahr.onrender.com/attendance-management/attendance/${employeeId}`;
    
//         const response = await fetch(requestUrl, {
//           method: "GET",
//           headers: {
//             "Authorization": `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });
    
//         console.log("Response Status:", response.status);  // Log the response status
//         const responseBody = await response.text();
//         console.log("Response Body:", responseBody);  // Log the response body
    
//         if (response.status === 404) {
//           // No attendance records found for this employee
//           setAttendanceRecords([]); // Clear out the records
//           setError("No attendance records available for this employee.");
//         } else if (!response.ok) {
//           throw new Error(`Failed to fetch attendance records: ${response.status} ${response.statusText}`);
//         } else {
//           const data = await response.json();
//           setAttendanceRecords(data?.attendance_summary || []);
//         }
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
//                 <h5>{attendanceRecords ? attendanceRecords.reduce((acc, record) => acc + record.hours_worked, 0).toFixed(2) : 'Loading...'}</h5>
//               </div>
//             </div>

//             <div className="first-grid">
//               <FontAwesomeIcon icon={faClock} className="dashboard-icon-3" style={{ color: '#6F42C1' }} />
//               <div>
//                 <h6>Overtime Hours</h6>
//                 <h5>{attendanceRecords ? attendanceRecords.filter(record => record.overtime === 1).length : 'Loading...'}</h5>
//               </div>
//             </div>

//             <div className="first-grid">
//               <FontAwesomeIcon icon="fa-solid fa-triangle-exclamation" className="dashboard-icon-4" style={{ color: '#FF6464' }} />
//               <div>
//                 <h6>Undertime Hours</h6>
//                 <h5>{attendanceRecords ? attendanceRecords.filter(record => record.undertime === 1).length : 'Loading...'}</h5>
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
//                     <tr><td colSpan="7" style={{ textAlign: 'center', color: 'red' }}>No attendance records found</td></tr>
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
// import EmployerNavbar from "../components/EmployerNavbar";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch, faFilter, faCalendar, faCheckCircle, faClock } from '@fortawesome/free-solid-svg-icons';
// import Pagination from '../components/Pagination';

// const AttendanceAndTracking = () => {
//   const [attendanceMetrics, setAttendanceMetrics] = useState(null);
//   const [departmentMetrics, setDepartmentMetrics] = useState([]);
//   const [employeeData, setEmployeeData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [selectedDepartment, setSelectedDepartment] = useState('All Department');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showEmployeeTable, setShowEmployeeTable] = useState(false);

//   // Fetch data for department metrics and attendance metrics
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const storedAuthData = localStorage.getItem("authData");
//         const token = storedAuthData ? JSON.parse(storedAuthData).access_token : null;

//         if (!token) {
//           console.error("❌ Error: Authentication token is missing.");
//           throw new Error("Authentication token is missing.");
//         }

//         // Fetch company-wide attendance metrics
//         const response = await fetch("https://proximahr.onrender.com/api/v2/attendance-management/company-overview", {
//           headers: {
//             "Authorization": `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`Failed to fetch company metrics: ${response.status} ${response.statusText}`);
//         }

//         const data = await response.json();
//         setAttendanceMetrics(data.company_metrics);
//         setLoading(false);

//         // Fetch department metrics
//         const departmentResponse = await fetch("https://proximahr.onrender.com/api/v2/attendance-management/departments-overview", {
//           headers: {
//             "Authorization": `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });

//         if (!departmentResponse.ok) {
//           throw new Error("Failed to fetch department metrics");
//         }

//         const departmentData = await departmentResponse.json();
//         const departments = Object.entries(departmentData.department_metrics).map(([departmentName, metrics]) => ({
//           department: departmentName,
//           ...metrics,
//         }));

//         setDepartmentMetrics(departments);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const filteredDepartments = departmentMetrics.filter(department =>
//     department.department.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleSearch = () => {
//     if (searchTerm === "") return departmentMetrics;
//     return departmentMetrics.filter(department =>
//       department.department.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   };

//   const handleViewClick = async (departmentName) => {
//     setSelectedDepartment(departmentName);
//     setShowEmployeeTable(true);

//     const storedAuthData = localStorage.getItem("authData");
//     const token = storedAuthData ? JSON.parse(storedAuthData).access_token : null;

//     if (!token) {
//       setError("Authentication token is missing.");
//       return;
//     }

//     try {
//       const url = `https://proximahr.onrender.com/api/v2/attendance-management/employees-attendance?department=${departmentName}`;
//       const response = await fetch(url, {
//         headers: {
//           "Authorization": `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.ok) {
//         setError("Unauthorized: Please check your login credentials.");
//         return;
//       }

//       const data = await response.json();
//       setEmployeeData(data.employee_attendance);
//     } catch (err) {
//       setError("Failed to fetch employee data");
//     }
//   };

//   const handleBackClick = () => {
//     setShowEmployeeTable(false);
//   };

//   return (
//     <div>
//       <div className="main-dashboard">
//         <Sidebar />
//         <div className="dashboard">
//           <EmployerNavbar />
//           <hr className="horizontal" />

//           {/* Company Overview Section */}
//           <div className="dashboard-details">
//             <h5>Attendance and Tracking</h5>
//             <h6>{new Date().toDateString()}</h6>
//           </div>

//           <div className="dashboard-details-1">
//             <div className="first-grid">
//               <FontAwesomeIcon icon={faCheckCircle} className="dashboard-icon-1" style={{ color: '#22C55E' }} />
//               <div>
//                 <h6>Attendance Rate</h6>
//                 <h5>{attendanceMetrics ? `${attendanceMetrics.average_attendance_rate}%` : 'Loading...'}</h5>
//               </div>
//             </div>

//             <div className="first-grid">
//               <FontAwesomeIcon icon={faCalendar} className="dashboard-icon-2" style={{ color: '#007BFF' }} />
//               <div>
//                 <h6>Hours Logged</h6>
//                 <h5>{attendanceMetrics ? attendanceMetrics.total_hours_logged : 'Loading...'}</h5>
//               </div>
//             </div>

//             <div className="first-grid">
//               <FontAwesomeIcon icon={faClock} className="dashboard-icon-3" style={{ color: '#6F42C1' }} />
//               <div>
//                 <h6>Overtime Hours</h6>
//                 <h5>{attendanceMetrics ? attendanceMetrics.total_overtime_hours : 'Loading...'}</h5>
//               </div>
//             </div>

//             <div className="first-grid">
//               <FontAwesomeIcon icon="fa-solid fa-triangle-exclamation" className="dashboard-icon-4" style={{ color: '#FF6464' }} />
//               <div>
//                 <h6>Undertime Hours</h6>
//                 <h5>{attendanceMetrics ? attendanceMetrics.total_undertime_hours : 'Loading...'}</h5>
//               </div>
//             </div>
//           </div>

//           <div className="number-of-employee" style={{ marginTop: '20px' }}>
//             <div className="new-div-1" style={{ width: '700px', padding: '10px' }}>
//               <FontAwesomeIcon icon={faSearch} className="glass-icon" />
//               <input
//                 type="text"
//                 placeholder="Search Department and Employee"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 style={{ padding: '10px' }}
//               />
//             </div>

//             <div className="div-2">
//               <button className="filter-btn">{selectedDepartment} <FontAwesomeIcon icon={faFilter} /></button>
//             </div>
//           </div>

//           {/* Show department data table */}
//           {!showEmployeeTable && (
//             <div className="table-div">
//               <table className="attendance-table">
//                 <thead>
//                   <tr>
//                     <th>Department</th>
//                     <th>Attendance %</th>
//                     <th>Overtime Hours</th>
//                     <th>Undertime Hours</th>
//                     <th>Absences</th>
//                     <th>Total Logged Hours</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredDepartments.length > 0 ? (
//                     filteredDepartments.map((department, index) => (
//                       <tr key={index}>
//                         <td>{department.department}</td>
//                         <td>{department.attendance_rate}%</td>
//                         <td>{department.overtime_hours}</td>
//                         <td>{department.undertime_hours}</td>
//                         <td>{department.absent_days}</td>
//                         <td>{department.total_hours_logged}</td>
//                         <td>
//                           <button onClick={() => handleViewClick(department.department)}>View</button> {/* Use department name for the View button */}
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr><td colSpan="7">No data found</td></tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {/* Show employee data table when the "View" button is clicked */}
//           {showEmployeeTable && employeeData.length > 0 && (
//             <div className="employee-table">
//               <button className="back-button" onClick={handleBackClick}>← Back</button>
//               <h3>Employees in {selectedDepartment} Department</h3>
//               <table className="employee-table">
//                 <thead>
//                   <tr>
//                     <th>Employee Name</th>
//                     <th>Attendance %</th>
//                     <th>Overtime Hours</th>
//                     <th>Absences</th>
//                     <th>Undertime Hours</th>
//                     <th>Total Logged Hours</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {employeeData.map((employee, index) => (
//                     <tr key={index}>
//                       <td>{employee.first_name} {employee.last_name}</td>
//                       <td>{employee.attendance_percentage}%</td>
//                       <td>{employee.overtime_hours}</td>
//                       <td>{employee.absences}</td>
//                       <td>{employee.undertime_hours}</td>
//                       <td>{employee.total_hours_logged}</td>
//                       <td><button>View</button></td> {/* View button for each employee */}
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           <Pagination />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AttendanceAndTracking;

















































// import React, { useState, useEffect } from 'react';
// import Sidebar from '../components/Sidebar';
// import EmployerNavbar from "../components/EmployerNavbar";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch, faFilter, faCalendar, faCheckCircle, faClock } from '@fortawesome/free-solid-svg-icons';
// import Pagination from '../components/Pagination';

// const AttendanceAndTracking = () => {
//   const [attendanceMetrics, setAttendanceMetrics] = useState(null);
//   const [departmentMetrics, setDepartmentMetrics] = useState([]);
//   const [employeeData, setEmployeeData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [selectedDepartment, setSelectedDepartment] = useState('All Department');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showEmployeeTable, setShowEmployeeTable] = useState(false);

//   // Fetch data for department metrics and attendance metrics
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const storedAuthData = localStorage.getItem("authData");
//         const token = storedAuthData ? JSON.parse(storedAuthData).access_token : null;

//         if (!token) {
//           console.error("❌ Error: Authentication token is missing.");
//           throw new Error("Authentication token is missing.");
//         }

//         // Fetch company-wide attendance metrics
//         const response = await fetch("https://proximahr.onrender.com/api/v2/attendance-management/company-overview", {
//           headers: {
//             "Authorization": `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`Failed to fetch company metrics: ${response.status} ${response.statusText}`);
//         }

//         const data = await response.json();
//         setAttendanceMetrics(data.company_metrics);
//         setLoading(false);

//         // Fetch department metrics
//         const departmentResponse = await fetch("https://proximahr.onrender.com/api/v2/attendance-management/departments-overview", {
//           headers: {
//             "Authorization": `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });

//         if (!departmentResponse.ok) {
//           throw new Error("Failed to fetch department metrics");
//         }

//         const departmentData = await departmentResponse.json();
//         const departments = Object.entries(departmentData.department_metrics).map(([departmentName, metrics]) => ({
//           department: departmentName,
//           ...metrics,
//         }));

//         setDepartmentMetrics(departments);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const filteredDepartments = departmentMetrics.filter(department =>
//     department.department.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleSearch = () => {
//     if (searchTerm === "") return departmentMetrics;
//     return departmentMetrics.filter(department =>
//       department.department.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   };

//   const handleViewClick = async (departmentName) => {
//     setSelectedDepartment(departmentName);
//     setShowEmployeeTable(true);

//     const storedAuthData = localStorage.getItem("authData");
//     const token = storedAuthData ? JSON.parse(storedAuthData).access_token : null;

//     if (!token) {
//       setError("Authentication token is missing.");
//       return;
//     }

//     try {
//       const url = `https://proximahr.onrender.com/api/v2/attendance-management/employees-attendance?department=${departmentName}`;
//       const response = await fetch(url, {
//         headers: {
//           "Authorization": `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.ok) {
//         setError("Unauthorized: Please check your login credentials.");
//         return;
//       }

//       const data = await response.json();
//       setEmployeeData(data.employee_attendance);
//     } catch (err) {
//       setError("Failed to fetch employee data");
//     }
//   };

//   const handleBackClick = () => {
//     setShowEmployeeTable(false);
//   };

//   return (
//     <div>
//       <div className="main-dashboard">
//         <Sidebar />
//         <div className="dashboard">
//           <EmployerNavbar />
//           <hr className="horizontal" />

//           {/* Company Overview Section */}
//           <div className="dashboard-details" style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}} >
//               <h5 style={{marginBottom:'15px'}} >Attendance and Tracking</h5>
//               <h6>{new Date().toLocaleDateString('en-GB', { day: '2-digit', weekday: 'long', month: 'long', year: 'numeric' })}</h6>
//             </div>
//           <div className="dashboard-details-1">
//             <div className="first-grid">
//               <FontAwesomeIcon icon={faCheckCircle} className="dashboard-icon-1" style={{ color: '#22C55E' }} />
//               <div>
//                 <h6>Attendance Rate</h6>
//                 <h5>{attendanceMetrics ? `${attendanceMetrics.average_attendance_rate}%` : 'Loading...'}</h5>
//               </div>
//             </div>

//             <div className="first-grid">
//               <FontAwesomeIcon icon={faCalendar} className="dashboard-icon-2" style={{ color: '#007BFF' }} />
//               <div>
//                 <h6>Hours Logged</h6>
//                 <h5>{attendanceMetrics ? attendanceMetrics.total_hours_logged : 'Loading...'}</h5>
//               </div>
//             </div>

//             <div className="first-grid">
//               <FontAwesomeIcon icon={faClock} className="dashboard-icon-3" style={{ color: '#6F42C1' }} />
//               <div>
//                 <h6>Overtime Hours</h6>
//                 <h5>{attendanceMetrics ? attendanceMetrics.total_overtime_hours : 'Loading...'}</h5>
//               </div>
//             </div>

//             <div className="first-grid">
//               <FontAwesomeIcon icon="fa-solid fa-triangle-exclamation" className="dashboard-icon-4" style={{ color: '#FF6464' }} />
//               <div>
//                 <h6>Undertime Hours</h6>
//                 <h5>{attendanceMetrics ? attendanceMetrics.total_undertime_hours : 'Loading...'}</h5>
//               </div>
//             </div>
//           </div>

//           <div className="number-of-employee" style={{ marginTop: '20px', marginBottom: '40px' }}>
//             <div className="new-div-1" style={{ width: '700px', padding: '10px' }}>
//               <FontAwesomeIcon icon={faSearch} className="glass-icon" />
//               <input
//                 type="text"
//                 placeholder="Search Department and Employee"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 style={{ padding: '10px' }}
//               />
//             </div>

//             <div className="div-2">
//               <button className="filter-btn">{selectedDepartment} <FontAwesomeIcon icon={faFilter} /></button>
//             </div>
//           </div>

//           {/* Show department data table */}
//           {!showEmployeeTable && (
//             <div className="table-div">
//               <table className="attendance-table">
//                 <thead>
//                   <tr>
//                     <th>Department</th>
//                     <th>Attendance %</th>
//                     <th>Overtime Hours</th>
//                     <th>Undertime Hours</th>
//                     <th>Absences</th>
//                     <th>Total Logged Hours</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredDepartments.length > 0 ? (
//                     filteredDepartments.map((department, index) => (
//                       <tr key={index}>
//                         <td>{department.department || 'Unknown Department'}</td>
//                         <td>{department.attendance_rate}%</td>
//                         <td>{department.overtime_hours}</td>
//                         <td>{department.undertime_hours}</td>
//                         <td>{department.absent_days}</td>
//                         <td>{department.total_hours_logged}</td>
//                         <td>
//                           <button onClick={() => handleViewClick(department.department)}>View</button> {/* Use department name for the View button */}
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr><td colSpan="7">No data found</td></tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {/* Show employee data table when the "View" button is clicked */}
//           {showEmployeeTable && employeeData.length > 0 && (
//             <div className="employee-table">
//               <button className="back-button" onClick={handleBackClick}>← Back</button>
//               <h3>Employees in {selectedDepartment} Department</h3>
//               <table className="employee-table">
//                 <thead>
//                   <tr>
//                     <th>Employee Name</th>
//                     <th>Attendance %</th>
//                     <th>Overtime Hours</th>
//                     <th>Absences</th>
//                     <th>Undertime Hours</th>
//                     <th>Total Logged Hours</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {employeeData.map((employee, index) => (
//                     <tr key={index}>
//                       <td>{employee.first_name} {employee.last_name}</td>
//                       <td>{employee.attendance_percentage}%</td>
//                       <td>{employee.overtime_hours}</td>
//                       <td>{employee.absences}</td>
//                       <td>{employee.undertime_hours}</td>
//                       <td>{employee.total_hours_logged}</td>
//                       <td><button>View</button></td> {/* View button for each employee */}
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           <Pagination />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AttendanceAndTracking;


































import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import EmployerNavbar from "../components/EmployerNavbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCalendar, faCheckCircle, faClock } from '@fortawesome/free-solid-svg-icons';

const AttendanceAndTracking = () => {
  const [attendanceMetrics, setAttendanceMetrics] = useState(null);
  const [departmentMetrics, setDepartmentMetrics] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState('All Department');
  const [selectedMonth, setSelectedMonth] = useState('All Months');
  const [searchTerm, setSearchTerm] = useState('');
  const [showEmployeeTable, setShowEmployeeTable] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(10);

  // Fetch data for department metrics and attendance metrics
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedAuthData = localStorage.getItem("authData");
        const token = storedAuthData ? JSON.parse(storedAuthData).access_token : null;

        if (!token) {
          console.error("❌ Error: Authentication token is missing.");
          throw new Error("Authentication token is missing.");
        }

        const response = await fetch("https://proximahr.onrender.com/api/v2/attendance-management/company-overview", {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch company metrics: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setAttendanceMetrics(data.company_metrics);

        const departmentResponse = await fetch("https://proximahr.onrender.com/api/v2/attendance-management/departments-overview", {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!departmentResponse.ok) {
          throw new Error("Failed to fetch department metrics");
        }

        const departmentData = await departmentResponse.json();
        const departments = Object.entries(departmentData.department_metrics).map(([departmentName, metrics]) => ({
          department: departmentName,
          ...metrics,
        }));

        setDepartmentMetrics(departments);
        
        const deptResponse = await fetch("https://proximahr.onrender.com/api/v2/departments", {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!deptResponse.ok) {
          throw new Error("Failed to fetch departments");
        }

        const deptData = await deptResponse.json();
        setDepartments(deptData.departments);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(departmentMetrics.length / entriesPerPage);

  const currentEntries = departmentMetrics.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const months = [
    "All Months", "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Filter departments based on selected department and month
  const filteredDepartments = currentEntries.filter(department =>
    (selectedDepartment === 'All Department' || department.department === selectedDepartment) &&
    (selectedMonth === 'All Months' || department.month === selectedMonth) &&
    department.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to page 1 when search term changes
  };

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    setCurrentPage(1); // Reset to page 1 when month changes
  };

  const handleViewClick = async (departmentName) => {
    setSelectedDepartment(departmentName);
    setShowEmployeeTable(true);

    const storedAuthData = localStorage.getItem("authData");
    const token = storedAuthData ? JSON.parse(storedAuthData).access_token : null;

    if (!token) {
      setError("Authentication token is missing.");
      return;
    }

    try {
      const url = `https://proximahr.onrender.com/api/v2/attendance-management/employees-attendance?department=${departmentName}`;
      const response = await fetch(url, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        setError("Unauthorized: Please check your login credentials.");
        return;
      }

      const data = await response.json();
      setEmployeeData(data.employee_attendance);
    } catch (err) {
      setError("Failed to fetch employee data");
    }
  };

  const handleBackClick = () => {
    setShowEmployeeTable(false);
  };

  return (
    <div>
      <div className="main-dashboard">
        <Sidebar />
        <div className="dashboard">
          <EmployerNavbar />
          <hr className="horizontal" />

          <div className="dashboard-details" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <h5 style={{ marginBottom: '15px' }}>Attendance and Tracking</h5>
            <h6>{new Date().toLocaleDateString('en-GB', { day: '2-digit', weekday: 'long', month: 'long', year: 'numeric' })}</h6>
          </div>

          <div className="number-of-employee" style={{ marginTop: '20px', marginBottom: '40px' }}>
            <div className="new-div-1" style={{ width: '700px', padding: '10px' }}>
              <FontAwesomeIcon icon={faSearch} className="glass-icon" />
              <input
                type="text"
                placeholder="Search Department and Employee"
                value={searchTerm}
                onChange={handleSearch}
                style={{ padding: '10px' }}
              />
            </div>

            {/* Department Filter */}
            <div className="filter-section" style={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
              <div className="dropdown" style={{ display: "inline-block" }}>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  style={{ height:'40px', width:'165px', padding:'10px', marginRight:'20px', borderRadius:'5px', }}
                >
                  <option value="All Department">All Departments</option>
                  {departments.map((dept, index) => (
                    <option key={index} value={dept.name}>{dept.name}</option>
                  ))}
                </select>
              </div>

              {/* Month Filter */}
              <div className="dropdown" style={{ display: "inline-block" }}>
                <select
                  value={selectedMonth}
                  onChange={(e) => handleMonthChange(e.target.value)}
                  style={{height:'40px', width:'120px', padding:'10px', marginRight:'20px', borderRadius:'5px', }}
                >
                  {months.map((month, index) => (
                    <option key={index} value={month}>{month}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Display Department and Employee Data */}
          <div className="table-div">
            <table className="attendance-table">
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Attendance %</th>
                  <th>Overtime Hours</th>
                  <th>Undertime Hours</th>
                  <th>Absences</th>
                  <th>Total Logged Hours</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredDepartments.length > 0 ? (
                  filteredDepartments.map((department, index) => (
                    <tr key={index}>
                      <td>{department.department || 'Unknown Department'}</td>
                      <td>{department.attendance_rate}%</td>
                      <td>{department.overtime_hours}</td>
                      <td>{department.undertime_hours}</td>
                      <td>{department.absent_days}</td>
                      <td>{department.total_hours_logged}</td>
                      <td>
                        <button onClick={() => handleViewClick(department.department)}>View</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="7">No data found</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop:'140px'}}>
            {/* Entries Count */}
            <div>
              <p>Showing {currentPage * entriesPerPage - entriesPerPage + 1} to {Math.min(currentPage * entriesPerPage, departmentMetrics.length)} of {departmentMetrics.length} entries</p>
            </div>

            {/* Pagination */}
            <div>
              <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                style={{ padding: '8px 16px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
              >
                First
              </button>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={{ padding: '8px 16px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
              >
                Prev
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={currentPage === index + 1 ? 'active' : ''}
                  style={{
                    padding: '8px 16px',
                    cursor: currentPage === index + 1 ? 'pointer' : 'not-allowed',
                    fontWeight: currentPage === index + 1 ? 'bold' : 'normal',
                    width:'50px',
                    border:'1px solid #007BFF',
                  }}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{ padding: '8px 16px', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
              >
                Next
              </button>
              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                style={{ padding: '8px 16px', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
              >
                Last
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceAndTracking;












































