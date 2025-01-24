import {React} from 'react';
import Sidebar from '../components/Sidebar'
import test from '../assets/test.png'
import '../pages/SearchEmployee.css'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom';

library.add(fas);

const SearchEmployee = () => {

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
                  {/* <div className="search">
                    <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" className="glass-icon" /><input type="text" placeholder='Search' />
                  </div> */}
    
                  <div className="notification">
                    <FontAwesomeIcon icon="fa-solid fa-bell" />
                    <h6>6</h6>
                  </div>
    
                  <div className="user-profile">
                  <img src={test} alt="My profile" className ="My-profile" />
                  </div>
                </div> 
              </div>
    
              <hr className="horizontal" />
    
              <div className="dashboard-details">
              <Link to={"/department/add-new-department"}><h5><FontAwesomeIcon icon="fa-solid fa-arrow-left" className = "left-arrow"></FontAwesomeIcon>Add Employees</h5></Link>
                <h6>24 Thursday October 2024</h6>
              </div>
    

              <div className="number-of-employee">
                <div className="new-div-1">
                    <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" className="glass-icon" /><input type="text" placeholder='Search Department' />
                </div>
                <div className="btn">
                      <Link to={"/add-employee-to-department"}><button><FontAwesomeIcon icon="fa-solid fa-plus" />Add To Department</button></Link>
                  </div>
              </div>

              <div className="employee-department-section">
  
                    <div className="row-one">
                        <p>Full Name</p>
                        <p>Job Title</p>
                        <p>Employee ID</p>
                    </div>

                  <hr />

                  <div className="row-two">
                      <div>
                          <img src={test} alt="My profile" className="My-profile" /> 
                          <p>Sarah Johnson</p>
                      </div>
                      <p>Software - Engineer</p>
                      <p>0876</p>

                  </div>

                  <hr />

                  <div className="row-two">
                      <div>
                          <img src={test} alt="My profile" className="My-profile" /> 
                          <p>Sarah Johnson</p>
                      </div>
                      <p>Software - Engineer</p>
                      <p>0876</p>

                  </div>

                  <hr />

                  <div className="row-two">
                      <div>
                          <img src={test} alt="My profile" className="My-profile" /> 
                          <p>Sarah Johnson</p>
                      </div>
                      <p>Software - Engineer</p>
                      <p>0876</p>

                  </div>

                  <hr />

                  <div className="row-two">
                      <div>
                          <img src={test} alt="My profile" className="My-profile" /> 
                          <p>Sarah Johnson</p>
                      </div>
                      <p>Software - Engineer</p>
                      <p>0876</p>

                  </div>

                  <hr />

                  <div className="row-two">
                      <div>
                          <img src={test} alt="My profile" className="My-profile" /> 
                          <p>Sarah Johnson</p>
                      </div>
                      <p>Software - Engineer</p>
                      <p>0876</p>

                  </div>

                  <hr />

                  <div className="row-two">
                      <div>
                          <img src={test} alt="My profile" className="My-profile" /> 
                          <p>Sarah Johnson</p>
                      </div>
                      <p>Software - Engineer</p>
                      <p>0876</p>

                  </div>

                  <hr />

                  <div className="row-two">
                      <div>
                          <img src={test} alt="My profile" className="My-profile" /> 
                          <p>Sarah Johnson</p>
                      </div>
                      <p>Software - Engineer</p>
                      <p>0876</p>

                  </div>

                  <hr />

                  <div className="row-two">
                      <div>
                          <img src={test} alt="My profile" className="My-profile" /> 
                          <p>Sarah Johnson</p>
                      </div>
                      <p>Software - Engineer</p>
                      <p>0876</p>

                  </div>

                </div>

              <div className="showing-entries">
                <div className="number-div">
                    <p>showing <span>1</span>to <span>10</span>of <span>40 entries</span></p>
                </div>
                <div className="pagination">
                  <p className='active-1'>01</p>
                  <p>02</p>
                  <p>03</p>
                  <p>04</p>
                  <p>05</p>
                  <p>06</p>
                  <p>07</p>
                </div>
              </div>

    
            </div>
    
          </div>
        </div>
      )

}

export default SearchEmployee
