import React from 'react';
import Sidebar from '../components/Sidebar'
import EmployeeNavbar from '../components/EmployeeNavbar.jsx'
import './EmployeeDashboard.css'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(fas);

const dashboard = () => {
  return (
    <div>
      <div className="main-dashboard">
        <Sidebar/>
        <div className="dashboard">
        
        <EmployeeNavbar/>

          <hr className="horizontal" />

          <div className="employee-dashboard-info" style={{display:'flex'}}>
            <div className="dashboard-details" style={{flexDirection:'column', alignItems:'flex-start', height:'40px'}}>
              <h5>Department</h5>
              <h6>24 Thursday October 2024</h6>
            </div>
            <div className="employee-dashboard-info" style={{display:'flex', flexDirection:'column'}}>
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
                <h5>_ _</h5>
              </div>
            </div>

            <div className="first-grid">
            <FontAwesomeIcon icon="fa-solid fa-calendar" className="dashboard-icon" />
              <div>
                <h6>Net Pay</h6>
                <h5>N822,550</h5>
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

          <div className="dashboard-details-2">
            <div className="grid">
              <h1>Clock In / Clock Out</h1>
              <hr />
              <div className='firstCol' style={{display:'flex', alignItems:'center'}}>
                <div className="left-side">
                  <h5>Clock In</h5>
                  <h6>00 : 00 : 00</h6>
                </div>
                <div className="right-side-col">
                  <h5 style={{}}>Clock Out</h5>
                  <h6>00 : 00 : 00</h6>
                </div>

              </div>


              <div className = "priority">
              <h5>Lunch Break</h5>
                <div>
                  <h6 style={{background:'none', color:'#4E4E4E'}}>01:00pm - 01:30pm</h6>
                </div>
              </div>

              <div className="TaskProgress">
              <div className='firstCol' style={{display:'flex', alignItems:'center'}}>
                <div className="left-side">
                  <h5>Working Hours</h5>
                  <h6>00 : 00 : 00</h6>
                </div>
                <div className="right-side-col">
                  <h5 style={{}}>Break Time</h5>
                  <h6>00 : 00 : 00</h6>
                </div>

              </div>
              </div>

              <div className="last-div">
                <div className="lastdiv-1">
                    <div>
                    <button style={{background:'#007BFF', color:'#fff', width:'200px'}}><FontAwesomeIcon icon="fa-solid fa-right-from-bracket" />Clock In</button>
                    </div>
                </div>
                <button style={{color:'#2E2E2E', border:' 1px solid #2E2E2E',width:'200px' }}><FontAwesomeIcon icon="fa-solid fa-mug-hot" />Start Break</button>
              </div>
            </div>

            <div className="grid">
              <h1>Leave Requests</h1>
              <hr />
              <h5>Number of pending Leave Request</h5>
              <h6>0 pending Tasks</h6>

              <div className = "priority">
              <h5>Number of available remaining</h5>
              <h6 style={{background:'none', border:'1px solid #D9D9D9', color:'#2E2E2E', textAlign:'left', width:'100px'
              }}>0 Days</h6>
              </div>

              <div className="TaskProgress">
                <h5>Number of approved leaves</h5>
                <h6 style={{background:'none', border:'1px solid #D9D9D9', color:'#2E2E2E', textAlign:'left', width:'200px'
              }}>3 Approved Leaves</h6>
              </div>

              <div className="last-div">
                <button style={{width:'200px', background:'#007BFF', color:'#fff'}}><FontAwesomeIcon icon="fa-solid fa-calendar" />Request Leave</button>
              </div>
            </div>

          </div>
          <div className="dashboard-details-2">
            <div className="grid-3" style={{height:'350px'}}>
              <h1>Attendance summary</h1>
              <hr />
              <h5>Total attendance percentage</h5>
              <h6 style={{width:'50px', background:'#DCFCE8', border:'1px solid #22C55E'}} >85%</h6>

              <div className="TaskProgress-3" style={{display:'flex',  justifyContent:'space-between', paddingRight:'10px'}}>
                <div className="attendance-div">
                  <h5>Days worked</h5>
                  <p style={{
                      width: '67px',
                      height: '27px',
                      padding: '4px',
                      gap: '4px',
                      borderRadius: '24px',
                      border: '1px solid #D9D9D9',
                  }}  >18days</p>
                </div>
                <div className="attendance-div">
                  <h5>Days Absent</h5>
                  <p style={{color:'#FF6464', border: '1px solid #D9D9D9', borderRadius: '24px', textAlign:'center'}}>02 days</p>
                </div>
                <div className="attendance-div">
                  <h5>Undertime Hours</h5>
                  <p style={{color:'#FF6464', border: '1px solid #D9D9D9', borderRadius: '24px', textAlign:'center'}}>00 days</p>
                </div>
              </div>

              <div className="TaskProgress-3">
                <h5>Overtime Hours</h5>
                <p>05 hrs</p>
              </div>

              <div className="last-div-3">
              <button style={{width:'200px', background:'#007BFF', color:'#fff'}}><FontAwesomeIcon icon="fa-solid fa-clock"/>View Attendance</button>
              </div>
            </div>

            <div className="grid">
              <h1>Compensation</h1>
              <hr />
              <h5>Payment status</h5>
              <h6>paid</h6>

              <div className = "priority">
                <h5>Last salary</h5>
                <h6 style={{background:'none', width:'300px', color:'#2E2E2E', border: '1px solid #D9D9D9', borderRadius: '24px', textAlign:'center'}}>Paid: ₦720,000 on Nov 25</h6>
              </div>

              
              <div className = "priority">
                <h5>Next salary</h5>
                <h6 style={{background:'none', width:'300px', color:'#2E2E2E', border: '1px solid #D9D9D9', borderRadius: '24px', textAlign:'center'}} >Due: Dec 25</h6>
              </div>

              <div className="last-div">
                <button style={{width:'200px', background:'#007BFF', color:'#fff'}}><FontAwesomeIcon icon="fa-solid fa-clock"/>Compensation</button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default dashboard
