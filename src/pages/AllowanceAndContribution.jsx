import React, { useState } from 'react';
// import Sidebar from '../components/Sidebar';
import test from '../assets/test.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import './AllowanceAndContribution.css';

const AllowanceAndContribution = ({ payrollData, onBack }) => {
  const [selectedMonth, setSelectedMonth] = useState('January'); // State to keep track of the selected month
  const [selectedDepartment, setSelectedDepartment] = useState('All'); // State to keep track of the selected department

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };

  const filteredPayrolls = payrollData.filter((payroll) => {
    if (selectedDepartment === 'All') return true;
    return payroll.department === selectedDepartment;
  });

  return (
    <div className="main-dashboard">
      <div className="dashboard centered-content">
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
          <Link to="#" onClick={onBack} className="back-link">
            <FontAwesomeIcon icon="fa-solid fa-arrow-left" className="left-arrow" /><h5>Payroll Management</h5> 
          </Link>
          <h6>24 Thursday October 2024</h6>
        </div>
        <div className="number-of-employee">
          <div className="new-div-1">
            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" className="glass-icon" />
            <input type="text" placeholder="Search" />
          </div>
          <div className="filters">
            <select className="filter-select" value={selectedMonth} onChange={handleMonthChange}>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
            <select className="filter-select" value={selectedDepartment} onChange={handleDepartmentChange}>
              <option value="All">All</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Finance">Finance</option>
              <option value="IT">IT</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
            </select>
          </div>
        </div>
        <div className="allowance-contribution">
          <table className="allowance-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Overtime Allowance</th>
                <th>Housing Allowance</th>
                <th>Medical Allowance</th>
                <th>Transportation Allowance</th>
                <th>Company Match (5%)</th>
                <th>Employee Contributions (8%)</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayrolls.map((payroll, index) => (
                <tr key={index}>
                  <td>{payroll.employee}</td>
                  <td>{payroll.department}</td>
                  <td>₦{(payroll.amount * 0.1).toFixed(2)}</td>
                  <td>₦{(payroll.amount * 0.15).toFixed(2)}</td>
                  <td>₦{(payroll.amount * 0.05).toFixed(2)}</td>
                  <td>₦{(payroll.amount * 0.1).toFixed(2)}</td>
                  <td>₦{(payroll.amount * 0.05).toFixed(2)}</td>
                  <td>₦{(payroll.amount * 0.08).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllowanceAndContribution;