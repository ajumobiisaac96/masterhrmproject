import React from 'react';
import PropTypes from 'prop-types';
import AttendancePerformance from '../data/AttendancePerformance';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Sidebar from '../components/Sidebar';
import test from '../assets/test.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';


const AttendancePerformanceTable = (onBack) => {
    const [isMonthOpen, setIsMonthOpen] = useState(false);
    const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
  
    const toggleMonthDropdown = () => {
      setIsMonthOpen(!isMonthOpen);
      setIsDepartmentOpen(false);
    };
  
    const toggleDepartmentDropdown = () => {
      setIsDepartmentOpen(!isDepartmentOpen);
      setIsMonthOpen(false);
    };
  
    return (
      <div>
        <div className="main-dashboard">
          <Sidebar />
          <div className="dashboard">
          <div className="slide-one-1">
            <div className="slide-one-1">
              <div className="name">
                <h5>Joseph Dooley</h5>
                <h6>Good Morning</h6>
              </div> 
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
              <Link to="/ReportAndAnalysis"  className="back-link">
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
                    This Month <FontAwesomeIcon icon="fa-circle-chevron-down" />
                  </button>
                  {isMonthOpen && (
                    <div className="dropdownstyle month-dropdown">
                      {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month) => (
                        <p key={month}>{month}</p>
                      ))}
                    </div>
                  )}
                </div>
                <div className="btn">
                  <button onClick={toggleDepartmentDropdown}>
                    <FontAwesomeIcon icon="fa-filter" /> All Department
                  </button>
                  {isDepartmentOpen && (
                    <div className="dropdownstyle department-dropdown">
                      {['HR', 'IT', 'Finance', 'Sales', 'Marketing', 'Operations', 'Support', 'Legal', 'Logistics', 'Admin'].map((dept) => (
                        <p key={dept}>{dept}</p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <AttendancePerformance/>
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


export default AttendancePerformanceTable
