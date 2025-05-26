import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Sidebar from '../components/Sidebar';
import EmployerNavbar from '../components/EmployerNavbar';
import { Link,useNavigate } from 'react-router-dom';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const OvertimeHoursTable = ({ onBack }) => {
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
  const [overtimeData, setOvertimeData] = useState({});
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedDepartment, setSelectedDepartment] = useState('All Department');
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [departmentData, setDepartmentData] = useState([]);
  const [departments, setDepartments] = useState([]);

    const navigate = useNavigate();

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

        const token = parsed?.access_token; // Extract the token
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
      const month = selectedMonth ? selectedMonth : 1;
      const year = selectedYear || new Date().getFullYear();

      const response = await fetch(
        `https://proximahr.onrender.com/api/v2/analytics/attendance/department-summary?month=${month}&year=${year}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();
      console.log("API Response:", data);

      if (data && data.data) {
        // Convert object to array for table rendering
        const arr = Object.entries(data.data)
          .filter(([dept]) => dept && dept !== "null")
          .map(([department, values]) => ({
            department,
            ...values,
          }));
        setDepartmentData(arr);
        setDepartments(arr.map(item => item.department));
      } else {
        setDepartmentData([]);
      }
    } catch (err) {
      setDepartmentData([]);
      setError('Error fetching data');
      console.error('API Error:', err);
    }
  };
  

  if (error) {
    return <div>{error}</div>; // Show error message if any
  }

  // Filtered data based on selected department
  const filteredData = selectedDepartment === 'All Department'
    ? departmentData
    : departmentData.filter(item => item.department === selectedDepartment);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div>
      <div className="main-dashboard">
        <Sidebar />
        <div className="dashboard">
          <EmployerNavbar />
          <hr className="horizontal" />


          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <FontAwesomeIcon
              icon={faArrowLeft}
              style={{ marginRight: '10px', cursor: 'pointer' }}
              onClick={() => navigate(-1)}
            />
            <h5 style={{ marginBottom: '0', fontFamily:'Inter', fontWeight:'400' }}>Report and Analysis</h5>
          </div>

          <h6 style={{fontSize:'16px', fontWeight:'400'}}>{new Date().toLocaleDateString('en-GB', { day: '2-digit', weekday: 'long', month: 'long', year: 'numeric' })}</h6>

          <div className="number-of-employee" style={{marginBottom:'20px', marginTop:'20px'}}>
            <div className="new-div-1">
              <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" className="glass-icon" />
              <input type="text" placeholder="Search" />
            </div>
            <div className="div-2">
              <div className="new-btn" style={{ position: 'relative' }}>
                <button onClick={toggleMonthDropdown} style={{ width: '100%', height:'40px',border:'1px solid #ddd', cursor:'pointer' }}>
                  {selectedMonth ? monthNames[selectedMonth - 1] : 'Select Month'}
                  <FontAwesomeIcon icon="fa-circle-chevron-down" />
                </button>
                {isMonthOpen && (
                  <div
                    className="dropdownstyle month-dropdown"
                    style={{
                      position: 'absolute',
                      zIndex: 1000,
                      top: '40px',
                      left: 0,
                      backgroundColor: 'white',
                      borderRadius: '5px',
                      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                      width: '150px',
                    }}
                  >
                    {monthNames.map((month, index) => (
                      <p key={month} onClick={() => handleMonthSelect(index + 1)} style={{ margin: 0, padding: '8px 12px', cursor: 'pointer' }}>
                        {month}
                      </p>
                    ))}
                  </div>
                )}
              </div>
              <div className="btn" style={{border:'none'}}>
                <button onClick={toggleDepartmentDropdown} style={{ width: '100%', height:'40px',border:'1px solid #ddd', cursor:'pointer' }}>
                  <FontAwesomeIcon icon="fa-filter" /> {selectedDepartment}
                </button>
                {isDepartmentOpen && (
                  <div className="dropdownstyle department-dropdown" style={{ position: 'absolute', zIndex: 10 }}>
                    {['All Department', ...departments].map((dept) => (
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
                  <th>Undertime</th>
                  <th>Attendance Percentage</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((data, index) => (
                    <tr key={index}>
                      <td>{data.department}</td>
                      <td>{data.total_working_days}</td>
                      <td>{data.present_days}</td>
                      <td>{data.absent_days}</td>
                      <td>{data.leave_days}</td>
                      <td>{data.undertime_count}</td>
                      <td>{data.attendance_percentage}%</td>
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
