import React from 'react';
import Sidebar from '../components/Sidebar';
import test from '../assets/test.png';
import '../pages/AddEmployeeDepartment.css'
import '../pages/profile.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom'

library.add(fas);

const AddEmployeeDepartment = () => {

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
              <Link to = "/department" ><h1 className="employee-profile"><FontAwesomeIcon icon="fa-solid fa-arrow-left" className = "left-arrow"></FontAwesomeIcon>Product design Department</h1></Link>
              <h6>24 Thursday October 2024</h6>
            </div>
  
            <div className="dashboard-details-1">
                <div className="number-of-employee">
                  <div className="div-1">
                    <div className="div1-1">
                      <img src={test} alt="My profile" className ="My-profile" />
                    </div>
                    <div className="div1-2">
                      <h1>Michael Chen</h1>
                      <h2>Product Designer</h2>
                    </div>
                  </div>
                  <div className="div-2">
                    <div className="btn">
                        <button className ="grey-btn" >Deactivate Department</button>
                        <Link to={"/department/edit-department"}><button><FontAwesomeIcon icon="fa-solid fa-pen-to-square" />Edit Profile</button></Link>
                    </div>
                  </div>
                </div>
            </div>
  
            <div className="employee-info">
                <div>
                    <h2><FontAwesomeIcon icon="fa-envelope" className = "icon" />michaelchen@rotech.com</h2>
                    <h2><FontAwesomeIcon icon="fa-solid fa-phone" className = "icon" />08052567231</h2>
                    <h2><FontAwesomeIcon icon="fa-solid fa-location-dot" className = "icon" />New York office, Floor 5v</h2>
                </div>
                <div className="employee-info-description">
                    <h1>Description</h1>
                    <p>Develops and maintains technical systems and software</p>
                </div>
            </div>

            <h3>Department Overview</h3>

            <div className="search-input">
                <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /><input type="text" placeholder='Search employee, Job title, employee Id, status and work mode ' />
            </div>

            <div className="employee-department-section">

                <div className="row-one">
                    <p>Full Name</p>
                    <p>Job Title</p>
                    <p>Employee ID</p>
                    <p>status</p>
                    <p>Work Mode</p>
                    <p>Position</p>
                </div>

<hr />

                <div className="row-two">
                    <div>
                        <img src={test} alt="My profile" className="My-profile" /> 
                        <p>Sarah Johnson</p>
                    </div>
                    <p>Software - Engineer</p>
                    <p>0876</p>
                    <p className = "active-btn">Active</p>
                    <p>On Feild</p>
                    <p>Department Head</p>
                </div>

                <hr />
                <div className="row-two">
                    <div>
                        <img src={test} alt="My profile" className="My-profile" /> 
                        <p>Sarah Johnson</p>
                    </div>
                    <p>Software - Engineer</p>
                    <p>0876</p>
                    <p className = "active-btn">Active</p>
                    <p>On Feild</p>
                    <p>Department Head</p>
                </div>

                <hr />
                <div className="row-two">
                    <div>
                        <img src={test} alt="My profile" className="My-profile" /> 
                        <p>Sarah Johnson</p>
                    </div>
                    <p>Software - Engineer</p>
                    <p>0876</p>
                    <p className = "active-btn">Active</p>
                    <p>On Feild</p>
                    <p>Department Head</p>
                </div>

                <hr />
                <div className="row-two">
                    <div>
                        <img src={test} alt="My profile" className="My-profile" /> 
                        <p>Sarah Johnson</p>
                    </div>
                    <p>Software - Engineer</p>
                    <p>0876</p>
                    <p className = "active-btn">Active</p>
                    <p>On Feild</p>
                    <p>Department Head</p>
                </div>

                <hr />

                <div className="row-two">
                    <div>
                        <img src={test} alt="My profile" className="My-profile" /> 
                        <p>Sarah Johnson</p>
                    </div>
                    <p>Software - Engineer</p>
                    <p>0876</p>
                    <p className = "active-btn">Active</p>
                    <p>On Feild</p>
                    <p>Department Head</p>
                </div>

                <hr />

                <div className="row-two">
                    <div>
                        <img src={test} alt="My profile" className="My-profile" /> 
                        <p>Sarah Johnson</p>
                    </div>
                    <p>Software - Engineer</p>
                    <p>0876</p>
                    <p className = "active-btn">Active</p>
                    <p>On Feild</p>
                    <p>Department Head</p>
                </div>

                <hr />

                <div className="row-two">
                    <div>
                        <img src={test} alt="My profile" className="My-profile" /> 
                        <p>Sarah Johnson</p>
                    </div>
                    <p>Software - Engineer</p>
                    <p>0876</p>
                    <p className = "active-btn">Active</p>
                    <p>On Feild</p>
                    <p>Department Head</p>
                </div>

            </div>
            <button className='grey-btn-1'>View more</button>

          </div>
        </div>
      </div>
    );
}

export default AddEmployeeDepartment
