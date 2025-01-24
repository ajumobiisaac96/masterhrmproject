import {React, useState} from 'react';
import Sidebar from '../components/Sidebar'
import test from '../assets/test.png'
import '../pages/AttendanceAndTracking.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DummyTable from '../components/DummyTable';
import Pagination from '../components/Pagination';

const AttendanceAndTracking = () => {
 // State to control the opening and closing of the dropdowns
 const [isMonthOpen, setIsMonthOpen] = useState(false);
 const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);

 // Handle opening and closing the "This Month" dropdown
 const toggleMonthDropdown = () => {
   setIsMonthOpen(!isMonthOpen);
   setIsDepartmentOpen(false); // Close the other dropdown when one is opened
 };

 // Handle opening and closing the "All Department" dropdown
 const toggleDepartmentDropdown = () => {
   setIsDepartmentOpen(!isDepartmentOpen);
   setIsMonthOpen(false); // Close the other dropdown when one is opened
 };

    return (
        <div>
          <div className="main-dashboard">
            <Sidebar/>
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
                <h5>Dashboard</h5>
                <h6>24 Thursday October 2024</h6>
              </div>
    
              <div className="dashboard-details-1">
                <div className="first-grid">
                  <FontAwesomeIcon icon=" fa-circle-check" className="dashboard-icon-1" style={{color:'#22C55E',}}/> 
                  <div>
                    <h6>Attendance Rate</h6>
                    <h5>92.5%</h5>
                  </div>
                </div>
    
                <div className="first-grid">
                <FontAwesomeIcon icon="fa-solid fa-calendar" className="dashboard-icon-2" style={{color:'#007BFF',}} />
                  <div>
                    <h6>Hours Logged</h6>
                    <h5>45,620</h5>
                  </div>
                </div>
    
                <div className="first-grid">
                <FontAwesomeIcon icon="fa-clock" className="dashboard-icon-3" style={{color:'#6F42C1',}}   />
                  <div>
                    <h6>overtime Hours</h6>
                    <h5>1,245</h5>
                  </div>
                </div>
    
                <div className="first-grid">
                <FontAwesomeIcon icon="fa-solid fa-triangle-exclamation" className="dashboard-icon-4" style={{color:'#FF6464',}} />
                  <div>
                    <h6>Undertime Hours</h6>
                    <h5>1,120</h5>
                  </div>
                </div>
              </div>

            <div className="number-of-employee">
                <div className="new-div-1">
                    <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" className="glass-icon" /><input type="text" placeholder='Search' />
                </div>
                <div className="div-2">
                  <div className="new-btn">
                    <button onClick={toggleMonthDropdown}>
                      This Month <FontAwesomeIcon icon="fa-circle-chevron-down" />
                    </button>
                    {isMonthOpen && (
                      <div className="dropdownstyle month-dropdown">
                        <p>January</p>
                        <p>February</p>
                        <p>March</p>
                        <p>April</p>
                        <p>May</p>
                        <p>June</p>
                        <p>July</p>
                        <p>August</p>
                        <p>September</p>
                        <p>October</p>
                        <p>November</p>
                        <p>December</p>
                      </div>
                    )}
                  </div>

                  <div className="btn">
                    <button onClick={toggleDepartmentDropdown}>
                      <FontAwesomeIcon icon="fa-filter" /> All Department
                    </button>
                    {isDepartmentOpen && (
                      <div className="dropdownstyle department-dropdown">
                        <p>HR</p>
                        <p>IT</p>
                        <p>Finance</p>
                        <p>Sales</p>
                        <p>Marketing</p>
                        <p>Operations</p>
                        <p>Support</p>
                        <p>Legal</p>
                        <p>Logistics</p>
                        <p>Admin</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="table-div">
                {/* <p>Attendance and Tracking Monthly Overview </p> */}
                <DummyTable/>
              </div>

              <Pagination/>
                
                  
            </div>
    
          </div>
        </div>
      )
}

export default AttendanceAndTracking
