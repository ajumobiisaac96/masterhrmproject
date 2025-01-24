import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import test from '../assets/test.png';
import '../pages/profile.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom'
import AttendanceLeaveOverview from '../components/AttendanceLeaveOverview';

library.add(fas);

const Profile = () => {
  const [activeSection, setActiveSection] = useState('personalInfo');
  
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

          <div className="dashboard-detail-1">
            <Link to={"/employee-managment"} ><h1 className="employee-profile"><FontAwesomeIcon icon="fa-solid fa-arrow-left" className = "left-arrow" />Employee Profile</h1></Link>
            <h6>24 Thursday October 2024</h6>
          </div>

          <div className="number-of-employee">
            <div className="div-one">
              <div className="div1-1">
                <img src={test} alt="My profile" className ="My-profile" />
              </div>
              <div className="div1-2">
                <h1>Michael Chen</h1>
                <h2>Product Designer</h2>
              </div>
              <div className="div1-3">
                <div className="btn-4">
                  <button>Active</button>
                </div>
              </div>
          </div>
            <div className="div-2">
              <div className="btn">
                  <Link to={"/edit-profile"}><button>Edit Profile</button></Link>
              </div>
            </div>
          </div>


          <div className="employee-info">
                <h2><FontAwesomeIcon icon="fa-envelope" className = "icon" />michaelchen@rotech.com</h2>
                <h2><FontAwesomeIcon icon="fa-solid fa-phone" className = "icon" />08052567231</h2>
                <h2><FontAwesomeIcon icon="fa-solid fa-location-dot" className = "icon" />New York office, Floor 5v</h2>
              </div>

          {/* Subnav Buttons */}
          <div className="employee-profile-info">
            <div>
              <button
                onClick={() => setActiveSection('personalInfo')}
                className={activeSection === 'personalInfo' ? 'active' : ''}
              >
                <FontAwesomeIcon icon="fa-building" className="icon" />
                Personal Information
              </button>
            </div>
            <div>
              <button
                onClick={() => setActiveSection('compensation')}
                className={activeSection === 'compensation' ? 'active' : ''}
              >
                <FontAwesomeIcon icon="fa-solid fa-money-bill" className="icon" />
                Compensation
              </button>
            </div>
            <div>
              <button
                onClick={() => setActiveSection('employeeDetails')}
                className={activeSection === 'employeeDetails' ? 'active' : ''}
              >
                <FontAwesomeIcon icon="fa-solid fa-list-check" className="icon" />
                Employee Details
              </button>
            </div>
            <div>
              <button
                onClick={() => setActiveSection('performanceMetrics')}
                className={activeSection === 'performanceMetrics' ? 'active' : ''}
              >
                <FontAwesomeIcon icon="fa-solid fa-chart-simple" className="icon" />
                Performance Metrics
              </button>
            </div>
            <div>
              <button
                onClick={() => setActiveSection('attendanceLeave')}
                className={activeSection === 'attendanceLeave' ? 'active' : ''}
              >
                <FontAwesomeIcon icon="fa-solid fa-calendar-days" className="icon" />
                Attendance & Leave
              </button>
            </div>
          </div>

          {/* Personal Information Section */}
          <div
            style={{ display: activeSection === 'personalInfo' ? 'block' : 'none' }}
          >
            <div className="dashboard-detail">
              <div className="header">
                <h1>Personal Information</h1>
              </div>
              <div className="dashboard-details-2-1">
                <div className="row-1">
                  <div>
                    <h2>Full Name</h2>
                    <h3>Michael Chen</h3>
                  </div>
                  <div>
                    <h2>Date of Birth</h2>
                    <h3>Tue Nov 12 1998</h3>
                  </div>
                  <div>
                    <h2>Gender</h2>
                    <h3>Male</h3>
                  </div>
                  <div>
                    <h2>Phone</h2>
                    <h3>08034521176</h3>
                  </div>
                </div>
                <div className="row-1">
                <div>
                  <h2>Email</h2>
                  <h3>michaelchen@rotech.com</h3>
                </div>
                <div>
                  <h2>Address</h2>
                  <h3>123 Tech Lance,
                  San Francisco, CA, USA</h3>
                </div>
                <div>
                  <h2>Emergency Contact Name</h2>
                  <h3>Mrs Sarah Chen</h3>
                </div>
                <div>
                  <h2>Relationship to Employee</h2>
                  <h3>spouse</h3>
                </div>
              </div>

              <div className="row-1">
                <div>
                  <h2>Spouse Number</h2>
                  <h3>09064377589</h3>
                </div>
                <div>
                  <h2>Employee ID</h2>
                  <h3>00172</h3>
                </div>
                <div>
                  <h2>Employee Date</h2>
                  <h3>March 15,2021</h3>
                </div>
                <div>
                  <h2>Department</h2>
                  <h3>Design</h3>
                </div>
              </div>

              <div className="row-1">
                <div>
                  <h2>Head of Department</h2>
                  <h3>David Wilson</h3>
                </div>
                <div>
                  <h2>work mode</h2>
                  <h3>onsite</h3>
                </div>
                <div>
                  <h2>Work location</h2>
                  <h3>New York Offfice, Floor 5V</h3>
                </div>
                <div>
                  <h2>Role</h2>
                  <h3>Full Time</h3>
                </div>
              </div>

              </div>
            </div>
          </div>

          {/* Compensation Section */}
          <div
            style={{ display: activeSection === 'compensation' ? 'block' : 'none' }}
          >
            <div className="dashboard-detail">
              <div className="header">
                <h1>Compensation</h1>
              </div>
              <div className="dashboard-details-2-2">
                <div className="row-1">
                  <div>
                    <h2>Basic Salary</h2>
                    <h3 className="green">750,000/month</h3>
                  </div>
                  <div>
                    <h2>Bonuses</h2>
                    <h3>Status: <span className="green">Eligible</span></h3>
                    <h3>Performance Bonus: <span className="green">150,000/year</span></h3>
                  </div>
                  <div>
                    <h2>Allowances</h2>
                    <h3>Housing: <span className="green">N60,000</span></h3>
                    <h3>Medical: <span className="green">40,000</span></h3>
                    <h3>Transport: <span className="green">N30,000</span></h3>
                  </div>
                  <div>
                    <h2>Deductions</h2>
                    <h3>Tax: <div className="red">N45,000</div></h3>
                    <h3>Retirement Fund: <div className="red">N22,500</div></h3>
                  </div>
                </div>
                <div className="row-1">
                  <div>
                    <h2>Pension Plan</h2>
                    <h3>Employee: <span className="green">5%</span></h3>
                    <h3>Employer: <span className="green">7.5%</span></h3>
                    <h3>Annual Contribution: <span className="green">N720,000</span></h3>
                  </div>
                  <div>
                    <h2>Health Insurance</h2>
                    <h3>Coverage: Comprehensive (Employee + spouse and child)</h3>
                    <h3>Provider: LeadWay Health Insurance</h3>
                  </div>
                  <div>
                    <h2>Net Pay</h2>
                    <h3>N822,500/month <span>(after allowances and deductions)</span></h3>
                  </div>
                  <div className="empty-div"></div>
                </div>
              </div>
            </div>
          </div>

                    {/* Employee Details */}
                    <div
            style={{ display: activeSection === 'employeeDetails' ? 'block' : 'none' }}
          >
            <div className="dashboard-detail">
              <div className="header">
                <h1>Employee Details</h1>
              </div>
              <div className="dashboard-details-2-1">
                <div className="row-1">
                  <div>
                    <h2>Job Title</h2>
                    <h3>Michael Chen</h3>
                  </div>
                  <div>
                    <h2>Employee ID</h2>
                    <h3>Tue Nov 12 1998</h3>
                  </div>
                  <div>
                    <h2>Employment Date</h2>
                    <h3>March 15, 2021</h3>
                  </div>
                  <div>
                    <h2>Department</h2>
                    <h3>Design</h3>
                  </div>
                </div>
                <div className="row-1">
                <div>
                  <h2>Head of Department</h2>
                  <h3>David Wilson</h3>
                </div>
                <div>
                  <h2>Work Mode</h2>
                  <h3>On site</h3>
                </div>
                <div>
                  <h2>Work Location</h2>
                  <h3>Kaduna Office Floor 5v</h3>
                </div>
                <div>
                  <h2>Role</h2>
                  <h3>Full Time</h3>
                </div>
              </div>

              <div className="row-1">
                <div>
                  <h2>working Hours</h2>
                  <h3>8 Hours</h3>
                </div>
                <div>
                  <h2>Vacation Days</h2>
                  <h3>30 Days</h3>
                </div>
                <div>
                  {/* <h2>Employee Date</h2>
                  <h3>March 15,2021</h3> */}
                </div>
                <div>
                  {/* <h2>Department</h2>
                  <h3>Design</h3> */}
                </div>
              </div>

              </div>
            </div>
          </div>

                  {/* Performance Metrics */}
                    <div
            style={{ display: activeSection === 'performanceMetrics' ? 'block' : 'none' }}
          >
            <div className="dashboard-detail">
              <div className="header">
                <h1>Performance Metrics</h1>
              </div>
              <div className="dashboard-details-2-1">
                <div className="row-1">
                  <div>
                    <h2>Attendance Rate</h2>
                    <h3>Monthly Attendance <span>95%</span> </h3>
                    <p className='Progress-bar-grey'></p>
                    <h1 className='Progress-bar-green'><span></span></h1>
                    <h3>Year-to-Date Attendance<span>92%</span> </h3>
                    <p className='Progress-bar-grey'></p>
                    <h1 className='Progress-bar-green'><span></span></h1>
                  </div>
                  <div>
                    <h2>Leave Balance</h2>
                    <h3>Remaining Leave Days : 12/20 Days</h3>
                  </div>
                  <div>
                    <h2>Late check-ins</h2>
                    <h3>This month : 3 occurences</h3> 
                    <h3>Year-to-Date : 3 occurences</h3>
                  </div>
                  {/* <div>
                    <h2>Overtime Hours</h2>
                    <h3>Design</h3>
                  </div> */}
                </div>
                <div className="row-1">
                <div>
                  <h2>Overtime Hours</h2>
                  <h3>This month : 10 hours</h3>
                  <h3>Year-to-Date : 85 hours</h3>
                </div>
                <div>
                  <h2>Partial Attendance</h2>
                  <h3>This Month: 2 occurence</h3>
                  <h3>Year-to-Date: 25 occurence</h3>
                </div>
                <div> 
                </div>
              </div>

              </div>
            </div>
            
          </div>
        
          
                            {/* Attendance Leave */}
                            <div
            style={{ display: activeSection === 'attendanceLeave' ? 'block' : 'none' }}
          >
            <AttendanceLeaveOverview />
          </div>
        


        </div>
      </div>
    </div>
  );
};

export default Profile;
