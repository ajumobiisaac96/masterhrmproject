import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import './LeaveManagment.css';
import CircularChart from '../components/CircularChart';
import test from '../assets/test.png';
import HorizontalBarChart from '../components/HorizontalBarChart';
import leaveData from '../data/leaveData';
import pendingLeaveRequests from '../data/pendingLeaveRequests';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LeaveManagment = () => {
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
  const [filter, setFilter] = useState('pending'); // State to keep track of the filter criteria

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

  const filteredRequests = pendingLeaveRequests.filter((request) => {
    if (filter === 'all') return true;
    return request.status === filter;
  }).slice(0, 7); // Display only the first 7 filtered requests

  const getHeading = () => {
    switch (filter) {
      case 'pending':
        return 'Pending Leave Requests';
      case 'approved':
        return 'Approved Leave Requests';
      case 'rejected':
        return 'Rejected Leave Requests';
      default:
        return 'Filtered Leave Requests';
    }
  };

  const getStatusStyle = (status) => {
    return {
      color: status === 'approved' ? 'green' : status === 'rejected' ? 'red' : 'black',
    };
  };

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
          <div className="dashboard-details">
            <h5>Leave Management</h5>
            <h6>24 Thursday October 2024</h6>
          </div>
          <div className="dashboard-details-1">
            <div className="first-grid">
              <FontAwesomeIcon icon="fa-circle-check" className="dashboard-icon-1" style={{ color: '#22C55E' }} />
              <div>
                <h6>Total Request</h6>
                <h5>28</h5>
              </div>
            </div>
            <div className="first-grid">
              <FontAwesomeIcon icon="fa-solid fa-calendar" className="dashboard-icon-2" style={{ color: '#007BFF' }} />
              <div>
                <h6>Pending</h6>
                <h5>10</h5>
              </div>
            </div>
            <div className="first-grid">
              <FontAwesomeIcon icon="fa-clock" className="dashboard-icon-3" style={{ color: '#6F42C1' }} />
              <div>
                <h6>Approved</h6>
                <h5>12</h5>
              </div>
            </div>
            <div className="first-grid">
              <FontAwesomeIcon icon="fa-solid fa-triangle-exclamation" className="dashboard-icon-4" style={{ color: '#FF6464' }} />
              <div>
                <h6>Rejected</h6>
                <h5>6</h5>
              </div>
            </div>
          </div>
          <div className="leave-managment-charts">
            <CircularChart
              data={leaveData}
              style={{
                backgroundColor: '#FFFFFF',
                width: '496px',
                height: '248px',
                padding: '16px 68px 28px 16px',
                borderRadius: '16px',
                border: '1px solid #D9D9D9',
              }}
            />
            <HorizontalBarChart
              data={leaveData}
              style={{
                backgroundColor: '#FFFFFF',
                width: '496px',
                height: '248px',
                padding: '16px 68px 28px 16px',
                borderRadius: '16px',
                border: '1px solid #D9D9D9',
              }}
            />
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
            </div>
          </div>
          <div className="filtered-results">
            <h2>{getHeading()}</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={tableHeaderStyle}>Employee</th>
                  <th style={tableHeaderStyle}>Department</th>
                  <th style={tableHeaderStyle}>Leave Type</th>
                  <th style={tableHeaderStyle}>Duration</th>
                  <th style={tableHeaderStyle}>Start Date</th>
                  <th style={tableHeaderStyle}>End Date</th>
                  <th style={tableHeaderStyle}>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((request, index) => (
                  <tr key={index} style={tableRowStyle}>
                    <td style={tableCellStyle}>{request.employee}</td>
                    <td style={tableCellStyle}>{request.department}</td>
                    <td style={tableCellStyle}>{request.leaveType}</td>
                    <td style={tableCellStyle}>{request.duration}</td>
                    <td style={tableCellStyle}>{request.startDate}</td>
                    <td style={tableCellStyle}>{request.endDate}</td>
                    <td style={{ ...tableCellStyle, ...getStatusStyle(request.status) }}>
                      {filter === 'pending' ? (
                        <>
                          <button style={acceptButtonStyle}>Accept</button>
                          <button style={rejectButtonStyle}>Reject</button>
                        </>
                      ) : (
                        request.status
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button onClick={toggleMonthDropdown} style={{display:'none'}}  >Select Month</button>


          </div>
        </div>
      </div>
    </div>
  );
};

// Styling
const tableHeaderStyle = {
  border: '1px solid #ddd',
  padding: '12px',
  textAlign: 'left',
  backgroundColor: '#f4f4f4',
  fontWeight: 'bold',
};

const tableRowStyle = {
  borderBottom: '1px solid #ddd',
};

const tableCellStyle = {
  padding: '12px',
  border: '1px solid #ddd',
};

const buttonStyle = {
  display: 'inline-block',
  padding: '8px 12px',
  textDecoration: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  textAlign: 'center',
  fontWeight: 'bold',
  border: '1px solid #ddd',
  marginRight: '8px',
  width: '80px',
};

const acceptButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#007BFF',
  color: '#fff',
};

const rejectButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#F8F8F8',
  color: '#2E2E2E',
};



export default LeaveManagment;