import React from 'react';
import Sidebar from '../components/Sidebar';
import test from '../assets/test.png';
import '../pages/AddEmployeeToDepartment.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom'

library.add(fas);

const AddEmployeeToDepartment = () => {
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
                <Link to = "/department/add-new-department" ><h1 className="employee-profile"><FontAwesomeIcon icon="fa-solid fa-arrow-left" className = "left-arrow"></FontAwesomeIcon>Add Employees</h1></Link>
                <h6>24 Thursday October 2024</h6>
              </div>
    

              <div className="Department-info">
                <div className="department-info-1">
                  <div className="div-1">
                    <label htmlFor="">Department Name</label>
                    <input type="text" placeholder='Engineering Department' />
                  </div>
                </div>
                

                <h3>Add Employee</h3>
  
              <div className="employee-department-section">
  
                  <div className="row-one">
                      <p>Full Name</p>
                      <p>Job Title</p>
                      <p>Employee ID</p>
                      <p>Edit</p>
                  </div>
  
  <hr />
  
                  <div className="row-two">
                      <div>
                          <img src={test} alt="My profile" className="My-profile" /> 
                          <p>Sarah Johnson</p>
                      </div>
                      <p>Software - Engineer</p>
                      <p>0876</p>
                      <p className = "grey-btn">Remove Employee</p>
                  </div>
  
                  <hr />
                  <div className="row-two">
                      <div>
                          <img src={test} alt="My profile" className="My-profile" /> 
                          <p>Sarah Johnson</p>
                      </div>
                      <p>Software - Engineer</p>
                      <p>0876</p>
                      <p className = "grey-btn">Remove Employee</p>
                  </div>
  
                  <hr />
                  <div className="row-two">
                      <div>
                          <img src={test} alt="My profile" className="My-profile" /> 
                          <p>Sarah Johnson</p>
                      </div>
                      <p>Software - Engineer</p>
                      <p>0876</p>
                      <p className = "grey-btn">Remove Employee</p>
                  </div>
  
                  <hr />
                  <div className="row-two">
                      <div>
                          <img src={test} alt="My profile" className="My-profile" /> 
                          <p>Sarah Johnson</p>
                      </div>
                      <p>Software - Engineer</p>
                      <p>0876</p>
                      <p className = "grey-btn">Remove Employee</p>
                  </div>
  
                  <hr />
  
                  <div className="row-two">
                      <div>
                          <img src={test} alt="My profile" className="My-profile" /> 
                          <p>Sarah Johnson</p>
                      </div>
                      <p>Software - Engineer</p>
                      <p>0876</p>
                      <p className = "grey-btn">Remove Employee</p>
                  </div>
  
                  <hr />
  
                  <div className="row-two">
                      <div>
                          <img src={test} alt="My profile" className="My-profile" /> 
                          <p>Sarah Johnson</p>
                      </div>
                      <p>Software - Engineer</p>
                      <p>0876</p>
                      <p className = "grey-btn">Remove Employee</p>
                  </div>
  
                  <hr />
  
                  <div className="row-two">
                      <div>
                          <img src={test} alt="My profile" className="My-profile" /> 
                          <p>Sarah Johnson</p>
                      </div>
                      <p>Software - Engineer</p>
                      <p>0876</p>
                      <p className = "grey-btn">Remove Employee</p>

                  </div>
  
              </div>
              
              <button className='btn-2'>Approve</button>


            <div className="department-Head">
                <label htmlFor="">Department Head</label>
                <select name="" id="">
                    <option value="" className='select-option'>Select Department Head</option>
                    <option value="" className='select-option'>option 1</option>
                    <option value="" className='select-option'>option 1</option>
                    <option value="" className='select-option'>option 1</option>
                </select>
            </div>
            
              <div className="department-description">
                <label htmlFor="">Department Description</label>
                <textarea name="" id="" placeholder='Develops and maintains technical systems and software'></textarea>

              </div>

              </div>

              <div className="department-buttons">
                <button className='grey-btn'>cancel</button>
                <button>Save changes</button>
              </div>


  
                
            </div>
          </div>
        </div>
      );
      
}

export default AddEmployeeToDepartment
