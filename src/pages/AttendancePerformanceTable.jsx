// import React from 'react';
// import PropTypes from 'prop-types';
// import AttendancePerformance from '../data/AttendancePerformance';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Sidebar from '../components/Sidebar';
// import test from '../assets/test.png';
// import { useState } from 'react';
// import { Link } from 'react-router-dom';


// const AttendancePerformanceTable = (onBack) => {
//     const [isMonthOpen, setIsMonthOpen] = useState(false);
//     const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
  
//     const toggleMonthDropdown = () => {
//       setIsMonthOpen(!isMonthOpen);
//       setIsDepartmentOpen(false);
//     };
  
//     const toggleDepartmentDropdown = () => {
//       setIsDepartmentOpen(!isDepartmentOpen);
//       setIsMonthOpen(false);
//     };
  
//     return (
//       <div>
//         <div className="main-dashboard">
//           <Sidebar />
//           <div className="dashboard">
//           <div className="slide-one-1">
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
//             <hr className="horizontal" />
//             <div className="dashboard-details">
//               <Link to="/ReportAndAnalysis"  className="back-link">
//                 <FontAwesomeIcon icon="fa-solid fa-arrow-left" className="left-arrow" />
//                 <h5>Report and Analysis</h5>
//               </Link>
//               <h6>24 Thursday October 2024</h6>
//             </div>
//             <div className="number-of-employee">
//               <div className="new-div-1">
//                 <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" className="glass-icon" />
//                 <input type="text" placeholder="Search" />
//               </div>
//               <div className="div-2">
//                 <div className="new-btn">
//                   <button onClick={toggleMonthDropdown}>
//                     This Month <FontAwesomeIcon icon="fa-circle-chevron-down" />
//                   </button>
//                   {isMonthOpen && (
//                     <div className="dropdownstyle month-dropdown">
//                       {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month) => (
//                         <p key={month}>{month}</p>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//                 <div className="btn">
//                   <button onClick={toggleDepartmentDropdown}>
//                     <FontAwesomeIcon icon="fa-filter" /> All Department
//                   </button>
//                   {isDepartmentOpen && (
//                     <div className="dropdownstyle department-dropdown">
//                       {['HR', 'IT', 'Finance', 'Sales', 'Marketing', 'Operations', 'Support', 'Legal', 'Logistics', 'Admin'].map((dept) => (
//                         <p key={dept}>{dept}</p>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//             <AttendancePerformance/>
//           </div>
//         </div>
//       </div>
//     );
//   };
  
// AttendancePerformanceTable.defaultProps = {
//   onBack: () => {
//     console.warn('onBack function not provided');
//   },
// };

// AttendancePerformanceTable.propTypes = {
//   onBack: PropTypes.func,
// };


// export default AttendancePerformanceTable



















import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Sidebar from '../components/Sidebar';
import test from '../assets/test.png';
import { Link } from 'react-router-dom';
import EmployerNavbar from "../components/EmployerNavbar";

const AttendancePerformanceTable = ({ onBack }) => {
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
  const [overtimeData, setOvertimeData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(1); // Default to January
  const [selectedDepartment, setSelectedDepartment] = useState('All Department');
  const [error, setError] = useState(null);

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

  // Fetch the data from the API based on selected month and department
  useEffect(() => {
    const fetchOvertimeData = async () => {
      try {
        const authData = JSON.parse(localStorage.getItem('authData'));
        const token = authData?.access_token;

        if (!token) {
          setError('Unauthorized: No token found');
          return;
        }

        const response = await fetch(
          `https://proximahr.onrender.com/api/v2/analytics/overtime/by-department?month=${selectedMonth}&year=2024`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`, // Add token to Authorization header
              'Content-Type': 'application/json',
            },
          }
        );

        const data = await response.json();
        console.log('API Response:', data);

        if (data && data.overtime_by_department && data.overtime_by_department.length > 0) {
          setOvertimeData(data.overtime_by_department);
        } else {
          setError('No overtime data found for the selected month and year');
        }
      } catch (err) {
        setError('Error fetching data');
      }
    };

    fetchOvertimeData();
  }, [selectedMonth, selectedDepartment]);

  return (
    <div>
      <div className="main-dashboard">
        <Sidebar />
        <div className="dashboard">
            <EmployerNavbar style={{ width: "100%", display: "flex", justifyContent: "space-between" }} />

          <hr className="horizontal" />

          <div className="dashboard-details" style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}} >
            <h5 style={{marginBottom:'15px'}} >Report and Analysis</h5>
            <h6>{new Date().toLocaleDateString('en-GB', { day: '2-digit', weekday: 'long', month: 'long', year: 'numeric' })}</h6>
          </div>

          <div className="number-of-employee" style={{marginBottom:'30px'}}>
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
                  <div className="dropdownstyle month-dropdown">
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
                  <div className="dropdownstyle department-dropdown">
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
                  <th>Total Overtime Hours</th>
                  <th>Average Overtime Per Employee</th>
                  <th>Top Contributor</th>
                </tr>
              </thead>
              <tbody>
                {overtimeData.length > 0 ? (
                  overtimeData.map((data, index) => (
                    <tr key={index}>
                      <td>{data.department}</td>
                      <td>{data.total_overtime_hours}</td>
                      <td>{data.average_overtime_per_employee}</td>
                      <td>{data.top_contributor}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">{error || 'No overtime data found for the selected month and year.'}</td>
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

AttendancePerformanceTable.defaultProps = {
  onBack: () => {
    console.warn('onBack function not provided');
  },
};

AttendancePerformanceTable.propTypes = {
  onBack: PropTypes.func,
};

export default AttendancePerformanceTable;



