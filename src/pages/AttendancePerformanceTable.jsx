import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../components/Sidebar';
import { Link, useNavigate } from 'react-router-dom';
import EmployerNavbar from "../components/EmployerNavbar";
import './AttendancePerformance.css';

const AttendancePerformanceTable = ({ onBack }) => {
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
  const [overtimeData, setOvertimeData] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('January');
  const [selectedDepartment, setSelectedDepartment] = useState('All Department');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const authData = JSON.parse(localStorage.getItem('authData'));
        const token = authData?.access_token;

        if (!token) {
          setError('Unauthorized: No token found');
          return;
        }

        const response = await fetch(
          `https://proximahr.onrender.com/api/v2/departments`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        const data = await response.json();
        console.log('Departments:', data);

        if (data && data.departments) {
          setDepartments(['All Department', ...data.departments]);
        } else {
          setError('No departments found');
        }
      } catch (err) {
        setError('Error fetching departments');
      }
    };

    fetchDepartments();
  }, []);

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
          `https://proximahr.onrender.com/api/v2/analytics/overtime/by-department?month=${getMonthNumber(selectedMonth)}&year=2024&department=${selectedDepartment !== 'All Department' ? selectedDepartment : ''}`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        const data = await response.json();
        console.log('Overtime Data:', data);

        // Handle the nested structure
        if (data && data.data && data.data.data && data.data.data.length > 0) {
          setOvertimeData(data.data.data);
          setError(null);
        } else {
          setOvertimeData([]);
          setError('No overtime data found for the selected month and year.');
        }
      } catch (err) {
        setError('Error fetching data');
      }
    };

    fetchOvertimeData();
  }, [selectedMonth, selectedDepartment]);

  const getMonthNumber = (monthName) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months.indexOf(monthName) + 1;
  };

  return (
    <div>
      <div className="main-dashboard">
        <Sidebar />
        <div className="dashboard">
          <EmployerNavbar style={{ width: "100%", display: "flex", justifyContent: "space-between" }} />

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

          <div className="number-of-employee" style={{ marginBottom: '30px', marginTop: '30px', display: 'flex', gap: '20px' }}>
            <div className="new-div-1" style={{ flex: 1 }}>
              <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" className="glass-icon" />
              <input type="text" placeholder="Search" style={{ width: '100%' }} />
            </div>
            <div className="new-btn" style={{ position: 'relative', flex: 1 }}>
              <button className='filter-btn' onClick={toggleMonthDropdown} style={{ width: '100%', height:'40px',border:'1px solid #ddd', cursor:'pointer' }}>
                {selectedMonth}
                <FontAwesomeIcon icon="fa-circle-chevron-down" />
              </button>
              {isMonthOpen && (
                <div
                  className="dropdownstyle month-dropdown"
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    zIndex: 10,
                    backgroundColor: '#fff',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    width: '100%',
                  }}
                >
                  {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month, index) => (
                    <p key={index} onClick={() => handleMonthSelect(month)}>{month}</p>
                  ))}
                </div>
              )}
            </div>
            <div className="btn" style={{ position: 'relative', flex: 1 }}>
              <button className='filter-btn'  onClick={toggleDepartmentDropdown} style={{ width: '100%', border:'1px solid #ddd', height:'40px', cursor:'pointer' }}>
                <FontAwesomeIcon icon="fa-filter" /> {selectedDepartment}
              </button>
              {isDepartmentOpen && (
                <div
                  className="dropdownstyle department-dropdown"
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    zIndex: 10,
                    backgroundColor: '#fff',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    width: '100%',
                  }}
                >
                  {departments.map((dept, index) => (
                    <p key={index} onClick={() => handleDepartmentSelect(dept.name)}>{dept.name}</p>
                  ))}
                </div>
              )}
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
                      <td>{data.average_overtime_hours}</td>
                      <td>
                        {data.employee_with_max_overtime?.name || 'N/A'}
                        {typeof data.employee_with_max_overtime?.hours !== 'undefined' && (
                          <> ({data.employee_with_max_overtime.hours} hrs)</>
                        )}
                      </td>
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



