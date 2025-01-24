import React from 'react';
import Sidebar from '../components/Sidebar';
import test from '../assets/test.png';
import '../pages/DeactivateEmployee.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom'

library.add(fas)

const SuspendEmployee = () => {
    // const [activeSection, setActiveSection] = useState('personalInfo');

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
              <Link to={"/employee-managment"} ><h1 className="employee-profile"><FontAwesomeIcon icon="fa-solid fa-arrow-left" className = "left-arrow" />Suspend Employee</h1></Link>
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
                <div className="first-row">
                    <div className="first-col">
                        <label htmlFor="">Start Date</label>
                        <input type="date" id="start-date" name="start-date" />
                    </div>
                    <div className="second-col">
                        <label htmlFor="">End Date</label>
                        <input type="date" id="start-date" name="start-date" />
                    </div>
                </div>
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
                <div className="third-row">
                    <label htmlFor="">Additional Notes</label>
                    <input type="text" placeholder='Enter any additional details about the suspension' />
                </div>
                <div className="fourth-row">
                    <p>During suspension, the employee will have limited access to company resources and 
                    systems.</p>
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

export default SuspendEmployee
