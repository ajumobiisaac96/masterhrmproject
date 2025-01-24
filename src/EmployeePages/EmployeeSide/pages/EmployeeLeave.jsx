import {React, useState, useEffect} from 'react';
import Sidebar from '../components/Sidebar'
import EmployeeNavbar from '../components/EmployeeNavbar.jsx'
import './EmployeeDashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom'



const EmployeeLeave = () => {
      const [isMonthOpen, setIsMonthOpen] = useState(false);
      const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
      const [filter, setFilter] = useState('pending');

      const [leaveData, setLeaveData] = useState([]);

    useEffect(() => {
        // Replace with your API endpoint
        fetch('https://api.example.com/leave-history')
            .then(response => response.json())
            .then(data => setLeaveData(data))
            .catch(error => console.error('Error fetching leave data:', error));
    }, []);
      

      const toggleMonthDropdown = () => {
        setIsMonthOpen(!isMonthOpen);
        setIsDepartmentOpen(false);
      };
    
      const toggleDepartmentDropdown = () => {
        setIsDepartmentOpen(!isDepartmentOpen);
        setIsMonthOpen(false);
      };
    
      const handleFilterChange = (status) => {
        setFilter(status);
        setIsDepartmentOpen(false); // Close the dropdown after selecting a filter
      };

      

  return (
    <div>
        <div className="main-dashboard">
            <Sidebar/>
            <div className="dashboard">
            
            <EmployeeNavbar/>

            <hr className="horizontal" />

            <div className="employee-dashboard-info" style={{display:'flex'}}>
                <div className="dashboard-details" style={{flexDirection:'column', alignItems:'flex-start', height:'40px'}}>
                <h5>Leave Request</h5>
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
                <FontAwesomeIcon icon="fa-solid fa-circle-check" className="dashboard-icon" style={{color:'#22C55E'}}/>
                <div>
                    <h6>Annual Leave</h6>
                    <h5>30 Days</h5>
                </div>
                </div>

                <div className="first-grid">
                <FontAwesomeIcon icon="fa-solid fa-clock" className="dashboard-icon" style={{color:'#6F42C1'}}/>
                <div>
                    <h6>Used Leave</h6>
                    <h5>20 Days</h5>
                </div>
                </div>

                <div className="first-grid">
                <FontAwesomeIcon icon="fa-solid fa-calendar" className="dashboard-icon" />
                <div>
                    <h6>Remaining Leave</h6>
                    <h5>10 Days</h5>
                </div>
                </div>

                <div className="first-grid">
                <FontAwesomeIcon icon="fa-solid fa-hourglass-start" className="dashboard-icon" style={{color:'#FFD700'}}/>
                <div>
                    <h6>Pending Leaves</h6>
                    <h5>0</h5>
                </div>
                </div>
            </div>

            <div className="number-of-employee">
            <div className="new-div-1">
                <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" className="glass-icon" />
                <input type="text" placeholder="Search" />
            </div>
            <div className="div-2">
                <div className="btn">
                <button onClick={toggleDepartmentDropdown}>
                    <FontAwesomeIcon icon="fa-filter" /> Filter
                </button>
                {isDepartmentOpen && (
                    <div className="dropdownstyle department-dropdown">
                    <p onClick={() => handleFilterChange('pending')}>Pending Requests</p>
                    <p onClick={() => handleFilterChange('approved')}>Approved</p>
                    <p onClick={() => handleFilterChange('rejected')}>Rejected</p>
                    </div>
                )}
                </div>
                <Link to={'/EmployeeLeave/NewLeaveRequest'} ><button style={{width:'200px'}}>+ New Leave Request</button></Link>
            </div>
        </div>
        <div className="table-container" style={styles.tableContainer}>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th>Leave Type</th>
                        <th>Duration</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {leaveData.map((leave, index) => (
                        <tr key={index}>
                            <td>{leave.leaveType}</td>
                            <td>{leave.duration}</td>
                            <td>{leave.startDate}</td>
                            <td>{leave.endDate}</td>
                            <td>
                                <span style={{ ...styles.status, ...(leave.status === 'Approved' ? styles.approved : styles.rejected) }}>
                                    {leave.status}
                                </span>
                            </td>
                            <td>
                                <button style={styles.viewDetails} onClick={() => alert(`Viewing details for ${leave.leaveType}`)}>
                                    View Details
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        </div>
    </div>
</div>
  )
};

const styles = {
    tableContainer: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        margin: '20px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    status: {
        fontWeight: 'bold',
        padding: '4px 10px',
        borderRadius: '20px',
        color: '#fff',
        display: 'inline-block',
    },
    approved: {
        backgroundColor: '#28a745',
    },
    rejected: {
        backgroundColor: '#dc3545',
    },
    viewDetails: {
        backgroundColor: '#f8f8f8',
        border: '1px solid #ddd',
        padding: '5px 10px',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default EmployeeLeave
