import React from 'react';
import Sidebar from '../components/Sidebar';
import test from '../assets/test.png';
import '../pages/SuspendEmployee.css';
import ToggleButton from '../components/ToggleButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom'

const DeactivateEmployee = () => {


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
              <Link to={"/employee-managment"} ><h1 className="employee-profile"><FontAwesomeIcon icon="fa-solid fa-arrow-left" className = "left-arrow" />Deactivate Employee</h1></Link>
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
            </div>

            <div className="suspend-employee-form">
                <div className="second-row">
                    <label htmlFor="">Reason for Suspension</label>
                    <select name="" id="">
                        <option value="">Company Restructuring </option>
                        <option value="">Performance Issues</option>
                        <option value="">Policy Violation</option>
                        <option value="">Temporary Leave  </option>
                        <option value="">Other</option>
                    </select>
                </div>
                <div className="another-row">
                    <p>System Access Revocation</p>
                    <div className="another-row-dropDown">
                        <div className="another-row-content">
                            <label htmlFor="">Email Account</label>
                            <ToggleButton/>
                        </div>
                        <div className="another-row-content">
                            <label htmlFor="">Building Access</label>
                            <ToggleButton/>
                        </div>
                        <div className="another-row-content">
                            <label htmlFor="">Company Resources</label>
                            <ToggleButton/>
                        </div>
                        <div className="another-row-content">
                            <label htmlFor="">Project Managment Tools</label>
                            <ToggleButton/>
                        </div>
                    </div>
                </div>
                <div className="third-row">
                    <label htmlFor="">Additional Notes</label>
                    <input type="text" placeholder='Enter any additional details about the suspension' />
                </div>
                <div className="fourthh-row">
                    <p>Deactivation will permanently remove the employee's access to all company systems. 
                    This action cannot be easily reversed.</p>
                </div>
                
            <div className="submit-suspend-form">
                <button className='btn-6'>Cancel</button>
                <button className='btn-7'>Suspend Employee</button>
            </div>
            </div>

  
          </div>
        </div>
      </div>
    );
}
export default DeactivateEmployee
