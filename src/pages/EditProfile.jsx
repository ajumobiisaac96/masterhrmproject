import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import test from '../assets/test.png';
import '../pages/AddEmployee.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas, faCircleCheck} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

library.add(fas);

const EditProfile = () => {
    const [activeSection, setActiveSection] = useState('Basic Information'); // Tracks the active section

  return (
    <div>
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
              <Link to={'/employee-managment/view-profile'}>
                <h1 className="employee-profile">
                  <FontAwesomeIcon
                    icon="fa-solid fa-arrow-left"
                    className="left-arrow"
                  />
                  Edit profile
                </h1>
              </Link>
              <h6>24 Thursday October 2024</h6>
            </div>

            <div className="dashboard-details-1">
              <p
                className={activeSection === 'Basic Information' ? 'active' : ''}
                onClick={() => setActiveSection('Basic Information')}
              >
                Basic Information
              </p>
              <p
                className={activeSection === 'Employment Details' ? 'active' : ''}
                onClick={() => setActiveSection('Employment Details')}
              >
                Employment Details
              </p>
              <p
                className={activeSection === 'Compensation Details' ? 'active' : ''}
                onClick={() => setActiveSection('Compensation Details')}
              >
                Compensation Details
              </p>
            </div>

            <div className="add-employee-form">
              {activeSection === 'Basic Information' && (
                <div>
                  <div className="splited-row">
                    <div className="left-hand-side-col">
                      <label htmlFor="">First Name <span>(Required)</span></label>
                      <input type="text" placeholder="Enter First Name" />
                    </div>

                    <div className="right-hand-side-col">
                      <label htmlFor="">Last Name <span>(Required)</span></label>
                      <input type="text" placeholder="Enter Last Name" />
                    </div>
                  </div>

                  <div className="single-row">
                    <label htmlFor="Email">Email <span>(Required)</span></label>
                    <input type="text" placeholder="Enter Email" />
                  </div>

                  <div className="splited-row">
                    <div className="left-hand-side-col">
                      <label htmlFor="">Employee ID <span>(Required)</span></label>
                      <input type="text" placeholder="Enter Employee ID" />
                    </div>

                    <div className="right-hand-side-col">
                      <label htmlFor="">Phone Number <span>(Required)</span></label>
                      <input type="text" placeholder="Enter Phone Number" />
                    </div>
                  </div>

                  <div className="splited-row">
                <div className="left-hand-side-col">
                  <label htmlFor="">Date of Birth <span>(Required)</span></label>
                  <input type="text" placeholder='DD/MM/YY' />
                </div>

                <div className="right-hand-side-col">
                  <label htmlFor="">Gender <span>(Required)</span></label>
                  <select name="" id="">
                    <option value="">Male</option>
                    <option value="">Female</option>
                  </select>
                </div>
            </div>

            <div className="splited-row">
                <div className="left-hand-side-col">
                  <label htmlFor="">Home Address <span>(Required)</span></label>
                  <input type="text" placeholder='Enter Home Address' />
                </div>

                <div className="right-hand-side-col">
                  <label htmlFor="">Country <span>(Required)</span></label>
                  <input type="text" placeholder='Enter country' />
                </div>
            </div>

            <div className='add-employee-btn'>
              <button className='btn-2'> Next</button>
            </div>
                </div>
              )}

              {activeSection === 'Employment Details' && (
                <div>
                <div className="splited-row">
                  <div className="left-hand-side-col">
                    <label htmlFor="">Job Title <span>(Required)</span></label>
                    <input type="text" placeholder="Enter Job Title" />
                  </div>

                  <div className="right-hand-side-col">
                    <label htmlFor="">Department <span>(Required)</span></label>
                    <input type="text" placeholder="choose Department" />
                  </div>
                </div>

                <div className="splited-row">
                  <div className="left-hand-side-col">
                    <label htmlFor="">Role <span>(Required)</span></label>
                    <input type="text" placeholder="Choose Role" />
                  </div>

                  <div className="right-hand-side-col">
                    <label htmlFor="">Employment Date <span>(Required)</span></label>
                    <input type="text" placeholder="Employment Date" />
                  </div>
                </div>

                <div className="splited-row">
                  <div className="left-hand-side-col">
                    <label htmlFor="">Work Mode <span>(Required)</span></label>
                    <input type="text" placeholder="choose Work mode" />
                  </div>

                  <div className="right-hand-side-col">
                    <label htmlFor="">Work Location <span>(Required)</span></label>
                    <input type="text" placeholder="Enter Location" />
                  </div>
                </div>

                <div className="splited-row">
                  <div className="left-hand-side-col">
                    <label htmlFor="">Working Hours<span>(Required)</span></label>
                    <input type="text" placeholder="choose working Hours" />
                  </div>

                  <div className="right-hand-side-col">
                    <label htmlFor="">Vacation Days <span>(Required)</span></label>
                    <input type="text" placeholder="Enter Phone Number" />
                  </div>
                </div>

                <div className="single-row">
                  <label htmlFor="Email">Weekly work days <span>(Required)</span></label>
                  <input type="text" placeholder="choose the Amount of work days" />
                </div>

                <div className='add-employee-btn'>
              <button className='btn-2'> Next</button>
            </div>

              </div>
              )}

              {activeSection === 'Compensation Details' && (
                <div>
                <div className="splited-row">
                  <div className="left-hand-side-col">
                    <label htmlFor="">Base salary <span>(Required)</span></label>
                    <input type="text" placeholder="Enter salary" />
                  </div>

                  <div className="right-hand-side-col">
                    <label htmlFor="">Payment frequency <span>(Required)</span></label>
                    <select name="" id="" placeholder="choose payment Frequency">
                      <option value="">Monthly</option>
                      <option value="">Weekly</option>
                      <option value="">Bi-weekly</option>
                    </select>
                  </div>
                </div>

                <div className="splited-row">
                  <div className="left-hand-side-col">
                    <label htmlFor="">Account Name <span>(Required)</span></label>
                    <input type="text" placeholder="Enter Account Name" />
                  </div>

                  <div className="right-hand-side-col">
                    <label htmlFor="">Account Number<span>(Required)</span></label>
                    <input type="text" placeholder="Employment Date" />
                  </div>
                </div>

                <div className="single-row">
                  <label htmlFor="Email">Bank Name <span>(Required)</span></label>
                  <input type="text" placeholder="choose the Amount of work days" />
                </div>

                <div className="splited-row">
                  <div className="left-hand-side-col">
                    <label htmlFor="">Overtime Hours Allowance <span>(Required)</span></label>
                    <input type="text" placeholder="Enter Hour Allowance" />
                  </div>

                  <div className="right-hand-side-col">
                    <label htmlFor="">Housing Allowance <span>(Required)</span></label>
                    <input type="text" placeholder="Enter Location" />
                  </div>
                </div>

                <div className="splited-row">
                  <div className="left-hand-side-col">
                    <label htmlFor="">Medical Allowance<span>(Required)</span></label>
                    <input type="text" placeholder="Enter Medical Allowance" />
                  </div>

                  <div className="right-hand-side-col">
                    <label htmlFor="">Transport Allowance <span>(Required)</span></label>
                    <input type="text" placeholder="Enter Transport Allowance" />
                  </div>
                </div>

                <div className="splited-row">
                  <div className="left-hand-side-col">
                    <label htmlFor="">Employee contribution (pension)<span>(Required)</span></label>
                    <input type="text" placeholder="choose working Hours" />
                  </div>

                  <div className="right-hand-side-col">
                    <label htmlFor="">company Match (pension) <span>(Required)</span></label>
                    <input type="text" placeholder="Enter Phone Number" />
                  </div>
                </div>

                <div className="single-row">
                  <label htmlFor="Email">PAYE Deduction <span>(Required)</span></label>
                  <input type="text" placeholder="Enter percentage of PAYE deduction" />
                </div>

                <div className="splited-row">
                  <div className="left-hand-side-col">
                    <label htmlFor="">Insurance provider<span>(Required)</span></label>
                    <select name="" id="">
                      <option value="">Leadway Assurance</option>
                      <option value="">AXA Mansaard Insurance</option>
                      <option value="">custodian and Allied Insurance</option>
                      <option value="">cornerstone Insurance</option>
                      <option value="">FBN Insurance</option>
                      <option value="">African Alliance Insurance</option>
                    </select>
                  </div>

                  <div className="right-hand-side-col">
                    <label htmlFor="">Lead Way Health Insurance <span>(Required)</span></label>
                    <select name="" id="">
                      <option value="">Group Life Assurance</option>
                      <option value="">Employee compensation Insurance</option>
                      <option value="">Health Insurance Plans</option>
                      <option value="">Personal Accident Insurance</option>
                      <option value="">Travel Insurance</option>
                    </select>
                  </div>
                </div>

                <div className='add-employee-btn'>
              <button className='btn-2'> Add Employee</button>
            </div>

          <div className="container-2">
        <FontAwesomeIcon icon={faCircleCheck} className="check-icon" />
        <div className="pop-up-txt">
          <h1>Changes Made successfully</h1>
          <p>The employee profile has been updated successfully. All changes have been saved.</p>
          <Link to="/employee-managment/view-profile">
            <h3>Employee Profile</h3>
          </Link>
        </div>
      </div>

              </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default EditProfile
