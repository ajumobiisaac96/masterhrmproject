// import React from 'react';
// import PropTypes from 'prop-types';
// import OvertimeHours from '../data/OvertimeHours';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Sidebar from '../components/Sidebar';
// import test from '../assets/test.png';
// import { useState } from 'react';
// import { Link } from 'react-router-dom';

// const OvertimeHoursTable = ({ onBack }) => {
//   const [isMonthOpen, setIsMonthOpen] = useState(false);
//   const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);

//   const toggleMonthDropdown = () => {
//     setIsMonthOpen(!isMonthOpen);
//     setIsDepartmentOpen(false);
//   };

//   const toggleDepartmentDropdown = () => {
//     setIsDepartmentOpen(!isDepartmentOpen);
//     setIsMonthOpen(false);
//   };

//   return (
//     <div>
//       <div className="main-dashboard">
//         <Sidebar />
//         <div className="dashboard">
//           <div className="slide-one">
//             <div className="slide-one-1">
//               <div className="name">
//                 <h5>Joseph Dooley</h5>
//                 <h6>Good Morning</h6>
//               </div>
//             </div>
//             <div className="slide-one-2">
//               <div className="search">
//                 <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" className="glass-icon" />
//                 <input type="text" placeholder="Search" />
//               </div>
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
//             <Link to="/ReportAndAnalysis" onClick={onBack} className="back-link">
//               <FontAwesomeIcon icon="fa-solid fa-arrow-left" className="left-arrow" />
//               <h5>Report and Analysis</h5>
//             </Link>
//             <h6>24 Thursday October 2024</h6>
//           </div>
//           <div className="number-of-employee">
//             <div className="new-div-1">
//               <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" className="glass-icon" />
//               <input type="text" placeholder="Search" />
//             </div>
//             <div className="div-2">
//               <div className="new-btn">
//                 <button onClick={toggleMonthDropdown}>
//                   This Month <FontAwesomeIcon icon="fa-circle-chevron-down" />
//                 </button>
//                 {isMonthOpen && (
//                   <div className="dropdownstyle month-dropdown">
//                     {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month) => (
//                       <p key={month}>{month}</p>
//                     ))}
//                   </div>
//                 )}
//               </div>
//               <div className="btn">
//                 <button onClick={toggleDepartmentDropdown}>
//                   <FontAwesomeIcon icon="fa-filter" /> All Department
//                 </button>
//                 {isDepartmentOpen && (
//                   <div className="dropdownstyle department-dropdown">
//                     {['HR', 'IT', 'Finance', 'Sales', 'Marketing', 'Operations', 'Support', 'Legal', 'Logistics', 'Admin'].map((dept) => (
//                       <p key={dept}>{dept}</p>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//           <OvertimeHours />
//         </div>
//       </div>
//     </div>
//   );
// };

// OvertimeHoursTable.defaultProps = {
//   onBack: () => {
//     console.warn('onBack function not provided');
//   },
// };

// OvertimeHoursTable.propTypes = {
//   onBack: PropTypes.func,
// };

// export default OvertimeHoursTable;






// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Sidebar from '../components/Sidebar';
// import EmployerNavbar from '../components/EmployerNavbar';
// import { Link } from 'react-router-dom';

// const OvertimeHoursTable = ({ onBack }) => {
//   const [isMonthOpen, setIsMonthOpen] = useState(false);
//   const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
//   const [overtimeData, setOvertimeData] = useState({});
//   const [selectedMonth, setSelectedMonth] = useState(null);
//   const [selectedDepartment, setSelectedDepartment] = useState('All Department');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const toggleMonthDropdown = () => {
//     setIsMonthOpen(!isMonthOpen);
//     setIsDepartmentOpen(false);
//   };

//   const toggleDepartmentDropdown = () => {
//     setIsDepartmentOpen(!isDepartmentOpen);
//     setIsMonthOpen(false);
//   };

//   const handleMonthSelect = (month) => {
//     setSelectedMonth(month);
//     setIsMonthOpen(false);
//   };

//   const handleDepartmentSelect = (department) => {
//     setSelectedDepartment(department);
//     setIsDepartmentOpen(false);
//   };

//   // Fetch Overtime Data based on selected filters (month and department)
//   useEffect(() => {
//     const fetchOvertimeData = async () => {
//       try {
//         setLoading(true);
//         const year = 2024; // Default to current year, can be dynamically changed as needed
//         const month = selectedMonth ? selectedMonth : 1; // Default to January if no month is selected
  
//         // Retrieve the token from localStorage
//         const authData = JSON.parse(localStorage.getItem('authData'));
//         const token = authData?.token;
  
//         if (!token) {
//           setError('Unauthorized: No token found');
//           setLoading(false);
//           return;
//         }
  
//         // Make API call to fetch overtime data
//         const response = await fetch(`https://proximahr.onrender.com/analytics/overtime-by-department-by-month?month=${month}&year=${year}`, {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`, // Add token to Authorization header
//             'Content-Type': 'application/json',
//           },
//         });
  
//         // Log the response to check what the backend is sending
//         const data = await response.json();
//         console.log("API Response:", data); // Log the data to see the structure
  
//         if (data.overtime_by_department) {
//           setOvertimeData(data.overtime_by_department);
//         } else {
//           setError('No data found');
//         }
//         setLoading(false);
//       } catch (err) {
//         setError('Error fetching data');
//         setLoading(false);
//       }
//     };
  
//     fetchOvertimeData();
//   }, [selectedMonth, selectedDepartment]);


//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div>
//       <div className="main-dashboard">
//         <Sidebar />
//         <div className="dashboard">
//         <EmployerNavbar />
//           <hr className="horizontal" />
//           <div className="dashboard-details">
//             <Link to="/ReportAndAnalysis" onClick={onBack} className="back-link">
//               <FontAwesomeIcon icon="fa-solid fa-arrow-left" className="left-arrow" />
//               <h5>Report and Analysis</h5>
//             </Link>
//             <h6>24 Thursday October 2024</h6>
//           </div>

//           <div className="number-of-employee">
//             <div className="new-div-1">
//               <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" className="glass-icon" />
//               <input type="text" placeholder="Search" />
//             </div>
//             <div className="div-2">
//               <div className="new-btn">
//                 <button onClick={toggleMonthDropdown}>
//                   {selectedMonth ? `Month: ${selectedMonth}` : 'Select Month'}
//                   <FontAwesomeIcon icon="fa-circle-chevron-down" />
//                 </button>
//                 {isMonthOpen && (
//                   <div className="dropdownstyle month-dropdown">
//                     {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month, index) => (
//                       <p key={index} onClick={() => handleMonthSelect(index + 1)}>{month}</p>
//                     ))}
//                   </div>
//                 )}
//               </div>
//               <div className="btn">
//                 <button onClick={toggleDepartmentDropdown}>
//                   <FontAwesomeIcon icon="fa-filter" /> {selectedDepartment}
//                 </button>
//                 {isDepartmentOpen && (
//                   <div className="dropdownstyle department-dropdown">
//                     {['All Department', 'HR', 'IT', 'Finance', 'Sales', 'Marketing', 'Operations', 'Support', 'Legal', 'Logistics', 'Admin'].map((dept) => (
//                       <p key={dept} onClick={() => handleDepartmentSelect(dept)}>{dept}</p>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           <div className="attendance-table">
//             <table>
//               <thead>
//                 <tr>
//                   <th>Department</th>
//                   <th>Total Employees</th>
//                   <th>Employees Present</th>
//                   <th>Attendance Percentage</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {Object.keys(overtimeData).length > 0 ? (
//                   Object.keys(overtimeData).map((month) => (
//                     <tr key={month}>
//                       <td>{month}</td>
//                       {overtimeData[month].map((data, index) => (
//                         <tr key={index}>
//                           <td>{data.department}</td>
//                           <td>{data.total_employees}</td>
//                           <td>{data.employees_present}</td>
//                           <td>{data.attendance_percentage}%</td>
//                         </tr>
//                       ))}
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="4">No data available for the selected filters.</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// OvertimeHoursTable.defaultProps = {
//   onBack: () => {
//     console.warn('onBack function not provided');
//   },
// };

// OvertimeHoursTable.propTypes = {
//   onBack: PropTypes.func,
// };

// export default OvertimeHoursTable;

















// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Sidebar from '../components/Sidebar';
// import EmployerNavbar from '../components/EmployerNavbar';
// import { Link } from 'react-router-dom';

// const OvertimeHoursTable = ({ onBack }) => {
//   const [isMonthOpen, setIsMonthOpen] = useState(false);
//   const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
//   const [overtimeData, setOvertimeData] = useState([]);
//   const [selectedMonth, setSelectedMonth] = useState(null);
//   const [selectedYear, setSelectedYear] = useState(2024);
//   const [selectedDepartment, setSelectedDepartment] = useState('All Department');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [departments, setDepartments] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');

//   const toggleMonthDropdown = () => {
//     setIsMonthOpen(!isMonthOpen);
//     setIsDepartmentOpen(false);
//   };

//   const toggleDepartmentDropdown = () => {
//     setIsDepartmentOpen(!isDepartmentOpen);
//     setIsMonthOpen(false);
//   };

//   const handleMonthSelect = (month) => {
//     setSelectedMonth(month);
//     setIsMonthOpen(false);
//   };

//   const handleDepartmentSelect = (department) => {
//     setSelectedDepartment(department);
//     setIsDepartmentOpen(false);
//   };

//   const handleYearSelect = (year) => {
//     setSelectedYear(year);
//   };

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   // Fetch Overtime Data based on selected filters (month, year, and department)
//   useEffect(() => {
//     const fetchOvertimeData = async () => {
//       try {
//         setLoading(true);
//         const month = selectedMonth ? selectedMonth : 1; // Default to January if no month is selected

//         // Retrieve the token from localStorage
//         const authData = JSON.parse(localStorage.getItem('authData'));
//         const token = authData?.token;

//         if (!token) {
//           setError('Unauthorized: No token found');
//           setLoading(false);
//           return;
//         }

//         // Make API call to fetch overtime data
//         const response = await fetch(`https://proximahr.onrender.com/analytics/attendance/department-summary?month=${month}&year=${selectedYear}`, {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`, // Add token to Authorization header
//             'Content-Type': 'application/json',
//           },
//         });

//         const data = await response.json();
//         console.log("API Response:", data); // Log the data to see the structure

//         if (data.overtime_by_department) {
//           setOvertimeData(data.overtime_by_department);
//           setDepartments([...new Set(data.overtime_by_department.map(item => item.department))]); // Set unique departments
//         } else {
//           setError('No data found');
//         }
//         setLoading(false);
//       } catch (err) {
//         setError('Error fetching data');
//         setLoading(false);
//       }
//     };

//     fetchOvertimeData();
//   }, [selectedMonth, selectedYear, selectedDepartment]);

//   // Filter data based on selected department
//   useEffect(() => {
//     let filtered = overtimeData;

//     // Filter by department
//     if (selectedDepartment !== 'All Department') {
//       filtered = filtered.filter(item => item.department === selectedDepartment);
//     }

//     // Filter by search query
//     if (searchQuery) {
//       filtered = filtered.filter(item =>
//         item.department.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     setFilteredData(filtered);
//   }, [selectedDepartment, overtimeData, searchQuery]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div>
//       <div className="main-dashboard">
//         <Sidebar />
//         <div className="dashboard">
//           <EmployerNavbar />
//           <hr className="horizontal" />
//           <div className="dashboard-details">
//             <Link to="/ReportAndAnalysis" onClick={onBack} className="back-link">
//               <FontAwesomeIcon icon="fa-solid fa-arrow-left" className="left-arrow" />
//               <h5>Report and Analysis</h5>
//             </Link>
//             <h6>24 Thursday October 2024</h6>
//           </div>

//           <div className="number-of-employee">
//             <div className="new-div-1">
//               <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" className="glass-icon" />
//               <input
//                 type="text"
//                 placeholder="Search by Department"
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//               />
//             </div>
//             <div className="div-2">
//               <div className="new-btn">
//                 <button onClick={toggleMonthDropdown}>
//                   {selectedMonth ? `Month: ${selectedMonth}` : 'Select Month'}
//                   <FontAwesomeIcon icon="fa-circle-chevron-down" />
//                 </button>
//                 {isMonthOpen && (
//                   <div className="dropdownstyle month-dropdown">
//                     {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month, index) => (
//                       <p key={index} onClick={() => handleMonthSelect(index + 1)}>{month}</p>
//                     ))}
//                   </div>
//                 )}
//               </div>
//               <div className="btn">
//                 <button onClick={toggleDepartmentDropdown}>
//                   <FontAwesomeIcon icon="fa-filter" /> {selectedDepartment}
//                 </button>
//                 {isDepartmentOpen && (
//                   <div className="dropdownstyle department-dropdown">
//                     {['All Department', ...departments].map((dept) => (
//                       <p key={dept} onClick={() => handleDepartmentSelect(dept)}>{dept}</p>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           <div className="attendance-table">
//             <table>
//               <thead>
//                 <tr>
//                   <th>Department</th>
//                   <th>Total Working Days</th>
//                   <th>Present Days</th>
//                   <th>Absent Days</th>
//                   <th>Leave Days</th>
//                   <th>Undertime</th>
//                   <th>Attendance Rate (%)</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredData.length > 0 ? (
//                   filteredData.map((data, index) => (
//                     <tr key={index}>
//                       <td>{data.department}</td>
//                       <td>{data.total_working_days}</td>
//                       <td>{data.present_days}</td>
//                       <td>{data.absent_days}</td>
//                       <td>{data.leave_days}</td>
//                       <td>{data.undertime}</td>
//                       <td>{data.attendance_rate}%</td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="7">No data available for the selected filters.</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// OvertimeHoursTable.defaultProps = {
//   onBack: () => {
//     console.warn('onBack function not provided');
//   },
// };

// OvertimeHoursTable.propTypes = {
//   onBack: PropTypes.func,
// };

// export default OvertimeHoursTable;


















// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Sidebar from '../components/Sidebar';
// import EmployerNavbar from '../components/EmployerNavbar';
// import { Link } from 'react-router-dom';

// const OvertimeHoursTable = ({ onBack }) => {
//   const [isMonthOpen, setIsMonthOpen] = useState(false);
//   const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
//   const [overtimeData, setOvertimeData] = useState([]);
//   const [selectedMonth, setSelectedMonth] = useState(null);
//   const [selectedDepartment, setSelectedDepartment] = useState('All Department');
//   const [error, setError] = useState(null);
//   const [departments, setDepartments] = useState([]);

//   const toggleMonthDropdown = () => {
//     setIsMonthOpen(!isMonthOpen);
//     setIsDepartmentOpen(false);
//   };

//   const toggleDepartmentDropdown = () => {
//     setIsDepartmentOpen(!isDepartmentOpen);
//     setIsMonthOpen(false);
//   };

//   const handleMonthSelect = (month) => {
//     setSelectedMonth(month);
//     setIsMonthOpen(false);
//   };

//   const handleDepartmentSelect = (department) => {
//     setSelectedDepartment(department);
//     setIsDepartmentOpen(false);
//   };

//   // Fetch Overtime Data based on selected filters (month and department)
//   useEffect(() => {
//     const fetchOvertimeData = async () => {
//       try {
//         const month = selectedMonth ? selectedMonth : 1; // Default to January if no month is selected
  
//         // Retrieve the token from localStorage
//         const authData = JSON.parse(localStorage.getItem('authData'));
//         const token = authData?.token;
  
//         // Log the token to verify if it's correctly retrieved
//         console.log("Token being sent to API:", token);
  
//         if (!token) {
//           setError('Unauthorized: No token found');
//           return;
//         }
  
//         // Make API call to fetch overtime data
//         const response = await fetch(`https://proximahr.onrender.com/analytics/attendance/department-summary?month=${month}`, {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`, // Add token to Authorization header
//             'Content-Type': 'application/json',
//           },
//         });
  
//         // Log the full response to see the status and body
//         console.log("Response Status:", response.status); // Log status code
//         const data = await response.json();
//         console.log("API Response:", data); // Log the full response
  
//         if (response.ok) {
//           // Successfully received data
//           if (data && data.length > 0) {
//             setOvertimeData(data);
//             setDepartments([...new Set(data.map(item => item.department))]); // Extract unique departments
//           } else {
//             setError('No data found');
//           }
//         } else {
//           // Handle error responses like 500
//           setError(`Error: ${data.detail || response.statusText} (Status Code: ${response.status})`);
//         }
  
//       } catch (err) {
//         // Handle any other errors that occur during the fetch
//         setError(`Error fetching data: ${err.message}`);
//       }
//     };
  
//     fetchOvertimeData();
//   }, [selectedMonth, selectedDepartment]);
  
  

//   // Filter data based on selected department
//   const filteredData = selectedDepartment === 'All Department'
//     ? overtimeData
//     : overtimeData.filter(item => item.department === selectedDepartment);

//   return (
//     <div>
//       <div className="main-dashboard">
//         <Sidebar />
//         <div className="dashboard">
//           <EmployerNavbar />
//           <hr className="horizontal" />
//           <div className="dashboard-details">
//             <Link to="/ReportAndAnalysis" onClick={onBack} className="back-link">
//               <FontAwesomeIcon icon="fa-solid fa-arrow-left" className="left-arrow" />
//               <h5>Report and Analysis</h5>
//             </Link>
//             <h6>24 Thursday October 2024</h6>
//           </div>

//           {/* Search and Filter */}
//           <div className="number-of-employee">
//             <div className="new-div-1">
//               <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" className="glass-icon" />
//               <input type="text" placeholder="Search" />
//             </div>
//             <div className="div-2">
//               {/* Month Dropdown */}
//               <div className="new-btn">
//                 <button onClick={toggleMonthDropdown}>
//                   {selectedMonth ? `Month: ${selectedMonth}` : 'Select Month'}
//                   <FontAwesomeIcon icon="fa-circle-chevron-down" />
//                 </button>
//                 {isMonthOpen && (
//                   <div
//                     className="dropdownstyle month-dropdown"
//                     style={{
//                       position: 'absolute',
//                       zIndex: '1000',
//                       top: '40px', // Adjust this value to position the dropdown correctly
//                       left: '0',
//                       backgroundColor: 'white',
//                       borderRadius: '5px',
//                       boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
//                       width: '150px',  // Ensure it is the same width as the button
//                     }}
//                   >
//                     {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month, index) => (
//                       <p key={index} onClick={() => handleMonthSelect(index + 1)}>{month}</p>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* Department Dropdown */}
//               <div className="btn">
//                 <button onClick={toggleDepartmentDropdown}>
//                   <FontAwesomeIcon icon="fa-filter" /> {selectedDepartment}
//                 </button>
//                 {isDepartmentOpen && (
//                   <div className="dropdownstyle department-dropdown">
//                     {['All Department', ...departments].map((dept) => (
//                       <p key={dept} onClick={() => handleDepartmentSelect(dept)}>{dept}</p>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Table */}
//           <div className="attendance-table">
//             <table>
//               <thead>
//                 <tr>
//                   <th>Department</th>
//                   <th>Total Working Days</th>
//                   <th>Present Days</th>
//                   <th>Absent Days</th>
//                   <th>Leave Days</th>
//                   <th>On-time Hours</th>
//                   <th>Attendance Rate (%)</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredData.length > 0 ? (
//                   filteredData.map((data, index) => (
//                     <tr key={index}>
//                       <td>{data.department}</td>
//                       <td>{data.total_working_days}</td>
//                       <td>{data.present_days}</td>
//                       <td>{data.absent_days}</td>
//                       <td>{data.leave_days}</td>
//                       <td>{data.undertime}</td>
//                       <td>{data.attendance_rate}</td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="7">No data found for the selected filters.</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// OvertimeHoursTable.defaultProps = {
//   onBack: () => {
//     console.warn('onBack function not provided');
//   },
// };

// OvertimeHoursTable.propTypes = {
//   onBack: PropTypes.func,
// };

// export default OvertimeHoursTable;























import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Sidebar from '../components/Sidebar';
import EmployerNavbar from '../components/EmployerNavbar';
import { Link } from 'react-router-dom';

const OvertimeHoursTable = ({ onBack }) => {
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
  const [overtimeData, setOvertimeData] = useState({});
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedDepartment, setSelectedDepartment] = useState('All Department');
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  // Toggle dropdown visibility
  const toggleMonthDropdown = () => {
    setIsMonthOpen(!isMonthOpen);
    setIsDepartmentOpen(false);
  };

  const toggleDepartmentDropdown = () => {
    setIsDepartmentOpen(!isDepartmentOpen);
    setIsMonthOpen(false);
  };

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
    setIsMonthOpen(false);
  };

  const handleDepartmentSelect = (department) => {
    setSelectedDepartment(department);
    setIsDepartmentOpen(false);
  };

  const handleYearSelect = (year) => {
    setSelectedYear(year);
  };

  // Fetch Overtime Data based on selected filters (month, year, and department)
  useEffect(() => {
    const fetchTokenAndData = async () => {
      const rawData = localStorage.getItem('authData');
      console.log('Raw auth data:', rawData);

      try {
        const parsed = JSON.parse(rawData); // Parse the raw data
        console.log('Parsed auth data:', parsed);

        const token = parsed?.token; // Extract the token
        console.log('Actual Token:', token); // Log the token for debugging

        if (token) {
          setToken(token); // Set the token in state if it's valid
          fetchOvertimeData(token); // Fetch overtime data if token is valid
        } else {
          setError('Unauthorized: No token found');
        }
      } catch (err) {
        console.error('JSON parsing error:', err); // Log any errors during parsing
        setError('Failed to parse token');
      }
    };

    fetchTokenAndData();
  }, [selectedMonth, selectedYear, selectedDepartment]);

  // Function to fetch overtime data from the API
  const fetchOvertimeData = async (token) => {
    try {
      const month = selectedMonth ? selectedMonth : 1; // Default to January if no month is selected
      const year = selectedYear || new Date().getFullYear(); // Use selected year or current year
  
      // Log the URL and parameters
      console.log(`Making API request to: https://proximahr.onrender.com/analytics/attendance/department-summary?month=${month}&year=${year}`);
  
      // Make API call to fetch overtime data
      const response = await fetch(
        `https://proximahr.onrender.com/analytics/attendance/department-summary?month=${month}&year=${year}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Add token to Authorization header
            'Content-Type': 'application/json',
          },
        }
      );
  
      // Log the response status and response data
      console.log('Response Status:', response.status);
      const data = await response.json();
      console.log("API Response:", data);
  
      // Check if the data contains expected overtime data
      if (data && data.overtime_by_department) {
        setOvertimeData(data.overtime_by_department);
      } else {
        setError('No overtime data available');
      }
    } catch (err) {
      setError('Error fetching data');
      console.error('API Error:', err); // Log the error details
    }
  };
  

  if (error) {
    return <div>{error}</div>; // Show error message if any
  }

  return (
    <div>
      <div className="main-dashboard">
        <Sidebar />
        <div className="dashboard">
          <EmployerNavbar />
          <hr className="horizontal" />
          <div className="dashboard-details">
            <Link to="/ReportAndAnalysis" onClick={onBack} className="back-link">
              <FontAwesomeIcon icon="fa-solid fa-arrow-left" className="left-arrow" />
              <h5>Report and Analysis</h5>
            </Link>
            <h6>24 Thursday October 2024</h6>
          </div>

          <div className="number-of-employee">
            <div className="new-div-1">
              <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" className="glass-icon" />
              <input type="text" placeholder="Search" />
            </div>
            <div className="div-2">
              <div className="new-btn">
                <button onClick={toggleMonthDropdown}>
                  {selectedMonth ? `Month: ${selectedMonth}` : 'Select Month'}
                  <FontAwesomeIcon icon="fa-circle-chevron-down" />
                </button>
                {isMonthOpen && (
                  <div className="dropdownstyle month-dropdown" style={{ position: 'absolute', zIndex: 10 }}>
                    {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month, index) => (
                      <p key={index} onClick={() => handleMonthSelect(index + 1)}>{month}</p>
                    ))}
                  </div>
                )}
              </div>
              <div className="btn">
                <button onClick={toggleDepartmentDropdown}>
                  <FontAwesomeIcon icon="fa-filter" /> {selectedDepartment}
                </button>
                {isDepartmentOpen && (
                  <div className="dropdownstyle department-dropdown" style={{ position: 'absolute', zIndex: 10 }}>
                    {['All Department', 'HR', 'IT', 'Finance', 'Sales', 'Marketing', 'Operations', 'Support', 'Legal', 'Logistics', 'Admin'].map((dept) => (
                      <p key={dept} onClick={() => handleDepartmentSelect(dept)}>{dept}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="attendance-table">
            <table>
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Total Working Days</th>
                  <th>Present Days</th>
                  <th>Absent Days</th>
                  <th>Leave Days</th>
                  <th>On-time Hours</th>
                  <th>Attendance Rate (%)</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(overtimeData).length > 0 ? (
                  Object.keys(overtimeData).map((month) => (
                    <tr key={month}>
                      <td>{month}</td>
                      {overtimeData[month].map((data, index) => (
                        <tr key={index}>
                          <td>{data.department}</td>
                          <td>{data.total_working_days}</td>
                          <td>{data.present_days}</td>
                          <td>{data.absent_days}</td>
                          <td>{data.leave_days}</td>
                          <td>{data.ontime_hours}</td>
                          <td>{data.attendance_rate}</td>
                        </tr>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">No data available for the selected filters.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

OvertimeHoursTable.defaultProps = {
  onBack: () => {
    console.warn('onBack function not provided');
  },
};

OvertimeHoursTable.propTypes = {
  onBack: PropTypes.func,
};

export default OvertimeHoursTable;
