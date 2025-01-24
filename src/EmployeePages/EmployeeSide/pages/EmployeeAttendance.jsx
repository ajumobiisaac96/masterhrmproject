import React from 'react';
import Sidebar from '../components/Sidebar'
import EmployeeNavbar from '../components/EmployeeNavbar.jsx'
import './EmployeeDashboard.css'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AttendanceTable from '../components/AttendanceTable.jsx';
import Pagination from '../components/Pagination.jsx';

library.add(fas);

const EmployeeAttendance = () => {
  return (
    <div>
            <div className="main-dashboard">
                <Sidebar/>
                <div className="dashboard">
                
                <EmployeeNavbar/>

                <hr className="horizontal" />

                <div className="employee-dashboard-info" style={{display:'flex'}}>
                    <div className="dashboard-details" style={{flexDirection:'column', alignItems:'flex-start', height:'40px'}}>
                    <h5>Attendance & Tracking</h5>
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


                <div className="dashboard-details-1" style={{marginBottom:'30px'}}>
                    <div className="first-grid">
                    <FontAwesomeIcon icon="fa-solid fa-clock" className="dashboard-icon"/>
                    <div>
                        <h6>Present Days</h6>
                        <h5>30 Days</h5>
                    </div>
                    </div>

                    <div className="first-grid">
                    <FontAwesomeIcon icon="fa-solid fa-calendar" className="dashboard-icon" />
                    <div>
                        <h6>Absent Days</h6>
                        <h5>1 Day</h5>
                    </div>
                    </div>

                    <div className="first-grid">
                    <FontAwesomeIcon icon="fa-solid fa-calendar" className="dashboard-icon" />
                    <div>
                        <h6>Overtime Hours</h6>
                        <h5>15 Hours</h5>
                    </div>
                    </div>

                    <div className="first-grid">
                    <FontAwesomeIcon icon="fa-solid fa-users" className="dashboard-icon" />
                    <div>
                        <h6>Undertime Hours</h6>
                        <h5>02 Hours</h5>
                    </div>
                    </div>
                </div>

                <AttendanceTable/>

                <Pagination/>


            </div>



            </div>
    </div>
  )
}

export default EmployeeAttendance
