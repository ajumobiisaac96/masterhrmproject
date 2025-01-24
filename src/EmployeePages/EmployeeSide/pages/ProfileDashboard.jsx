import {React,useState} from 'react'
import Sidebar from '../components/Sidebar'
import EmployeeNavbar from '../components/EmployeeNavbar.jsx'
import './EmployeeDashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Test from '../assets/test.png' 

const ProfileDashboard = () => {

  const [activeSection, setActiveSection] = useState('personalInfo');

  return (
      <div>
        <div>
        <div className="main-dashboard">
          <Sidebar/>
          <div className="dashboard">
          
          <EmployeeNavbar/>

            <hr className="horizontal" />

            <div className="employee-dashboard-info" style={{display:'flex', justifyContent:'space-between', width: '1000px'}}>
              
              <div className="profile-info" style={{display:'flex', }}>
                <div className="profile-image">
                  <img src={Test} alt="" style={{ width: '100px' , height: '100px' }} />
                </div>
                <div className="dashboard-details" style={{flexDirection:'column', alignItems:'flex-start', height:'40px'}}>
                  <h5>David Kim</h5>
                  <h6>HRMS Admnistrator</h6>
                  <h6>davidkim@proxima.com</h6>
                </div>
              </div>
              
              <div className="employee-dashboard-info" style={{display:'flex', flexDirection:'column', marginLeft:'-200px'}}>
                <h1>Working Hours</h1>
                <div className="clock" style={{display:'flex', alignItems:'center', marginTop:'-20px'}} >
                  <div className="timer" 
                  style={{
                    width: '100px',
                      height: '38px',
                      padding: '8px',
                      marginTop:'10px',
                      borderRadius: '4px',
                      border: '1px solid #F8F8F8',
                      background:'#D9D9D9'
                  }}>00:00:00</div>
                  <button style={{width:'100px'}}> <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" />Clock Out</button>
                </div>
              </div>

            </div>
            
            <div className="dashboard-details-1">
              <div className="first-grid">
              <FontAwesomeIcon icon="fa-solid fa-clock" className="dashboard-icon"/>
                <div>
                  <h6>Attendance</h6>
                  <h5>90%</h5>
                </div>
              </div>
  
              <div className="first-grid">
              <FontAwesomeIcon icon="fa-solid fa-calendar" className="dashboard-icon" />
                <div>
                  <h6>Leave Balance</h6>
                  <h5>0 Days</h5>
                </div>
              </div>
  
              <div className="first-grid">
              <FontAwesomeIcon icon="fa-solid fa-calendar" className="dashboard-icon" />
                <div>
                  <h6>Net Pay</h6>
                  <h5>Salary :Dec 25</h5>
                </div>
              </div>
  
              <div className="first-grid">
              <FontAwesomeIcon icon="fa-solid fa-users" className="dashboard-icon" />
                <div>
                  <h6>Overtime Hours</h6>
                  <h5>15 Hours</h5>
                </div>
              </div>
            </div>

            {/* Subnav Buttons */}
      <div className="employee-profile-info">
                  <div>
                    <button
                      onClick={() => setActiveSection('personalInfo')}
                      className={activeSection === 'personalInfo' ? 'active' : ''}
                    >
                      <FontAwesomeIcon icon="fa-building" className="icon" />
                      Account Setting
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => setActiveSection('compensation')}
                      className={activeSection === 'compensation' ? 'active' : ''}
                    >
                      <FontAwesomeIcon icon="fa-solid fa-money-bill" className="icon" />
                      Pesonal Information
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => setActiveSection('employeeDetails')}
                      className={activeSection === 'employeeDetails' ? 'active' : ''}
                    >
                      <FontAwesomeIcon icon="fa-solid fa-list-check" className="icon" />
                      Employment Details
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => setActiveSection('performanceMetrics')}
                      className={activeSection === 'performanceMetrics' ? 'active' : ''}
                    >
                      <FontAwesomeIcon icon="fa-solid fa-chart-simple" className="icon" />
                      Compensation
                    </button>
                  </div>
                </div>

                {/* Account Section */}
                <div
                  style={{ display: activeSection === 'personalInfo' ? 'block' : 'none' }}
                >
                  <div className="dashboard-detail">
                    <div className="header">
                      <h1>Account Setting</h1>
                    </div>
                    <div className="dashboard-details-2-1">
                      <div className="row-1" style={{flexDirection:'column'}} >
                        <div style={{marginTop:'10px', marginBottom:'30px'}}>
                          <label htmlFor="">Email</label>
                          <div className="input-div" style={{display:'flex',  width:'950px', border:'2px solid #D9D9D9', alignItems:'center', borderRadius:'8px', marginBottom:'20px'}} >
                            <input type="text" placeholder='Michael Chen@robotec.com'  style={{width:'900px', height:'40px', outline:'none', padding:'20px'}}/>
                            <h3>Edit</h3>
                          </div>
                        </div> 
                        <div style={{marginTop:'30px', marginBottom:'30px'}}>
                          <label htmlFor="">Emergency contact Name</label>
                          <div className="input-div" style={{display:'flex',  width:'950px', border:'2px solid #D9D9D9', alignItems:'center', borderRadius:'8px', marginBottom:'20px'}} >
                            <input type="text" placeholder='Sarah Owen'  style={{width:'900px', height:'40px', outline:'none', padding:'20px'}}/>
                            <h3>Edit</h3>
                          </div>
                        </div>
                        <div style={{marginTop:'30px', marginBottom:'30px', width:'300px'}}>
                          <label htmlFor="">Choose Relationship to Employee</label>
                          <div className="input-div" style={{display:'flex',  width:'950px', border:'2px solid #D9D9D9', alignItems:'center', borderRadius:'8px', marginBottom:'20px'}} >
                            <input type="text" placeholder=''  style={{width:'900px', height:'40px', outline:'none', padding:'20px'}}/>
                            <h3>Edit</h3>
                          </div>
                        </div>   
                        <div style={{marginTop:'30px', marginBottom:'30px', width:'300px'}}>
                          <label htmlFor="">Emergency contact Phone Number </label>
                          <div className="input-div" style={{display:'flex',  width:'950px', border:'2px solid #D9D9D9', alignItems:'center', borderRadius:'8px', marginBottom:'20px'}} >
                            <input type="text" placeholder='903-406-8577'  style={{width:'900px', height:'40px', outline:'none', padding:'20px'}}/>
                            <h3>Edit</h3>
                          </div>
                        </div>
                        <div style={{marginTop:'30px', marginBottom:'30px'}}>
                          <label htmlFor="">Password</label>
                          <div className="input-div" style={{display:'flex',  width:'950px', border:'2px solid #D9D9D9', alignItems:'center', borderRadius:'8px', marginBottom:'20px'}} >
                            <input type="password"  style={{width:'900px', height:'40px', outline:'none', padding:'20px'}}/>
                            <h3>Edit</h3>
                          </div>
                        </div>              
                                                                    
 
                      </div>

                    </div>
                  </div>
                </div>

                {/* Peresonal Information Section */}
                <div
                  style={{ display: activeSection === 'compensation' ? 'block' : 'none' }}
                >
                  <div className="dashboard-detail">
                    <div className="header">
                      <h1>Personal Details</h1>
                    </div>
                    <div className="dashboard-details-2-1">
                      <div className="row-1">
                        <div>
                          <h2>Name</h2>
                          <h3>David Kim</h3>
                        </div>
                        <div>
                          <h2>Job Title</h2>
                          <h3>Software Engineer</h3>
                        </div>
                        <div>
                          <h2>Email</h2>
                          <h3>davidkim@proxima.com</h3>
                        </div>
                        <div>
                          <h2>Department</h2>
                          <h3>Engineering</h3>
                        </div>
                      </div>
                      <div className="row-1">
                      <div>
                        <h2>Address</h2>
                        <h3>No 34 Adamu Michaels Street</h3>
                      </div>
                      {/* <div>
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
                      </div> */}
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

                        {/* Compensation */}
                          <div
                  style={{ display: activeSection === 'performanceMetrics' ? 'block' : 'none' }}
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
          </div>
        </div>
        </div>
    </div>
  )
}

export default ProfileDashboard
