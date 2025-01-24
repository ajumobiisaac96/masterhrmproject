import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import test from '../assets/test.png';
import '../pages/EmployeeManagment.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

library.add(fas);

// Reusable EmployeeCard Component
const EmployeeCard = ({ employee, onToggleDropdown, isDropdownOpen }) => {
  return (
    <div className="card">
      <div className="div-1">
        <img src={test} alt="Profile" className="My-profile" />
        <p onClick={() => onToggleDropdown(employee.id)}>
          <FontAwesomeIcon icon="fa-solid fa-ellipsis-vertical" className="three-dots" />
        </p>

        {isDropdownOpen && (
          <div className="suspend-menu">
            <Link to="/employee-managment/suspend-employee">
              <button className="btn-4">Suspend</button>
            </Link>
            <Link to={"/employee-managment/Deactivate-employee"}>
            <button className="btn-5">Deactivate</button>
            </Link>
          </div>
        )}
      </div>
      <h1>{employee.name}</h1>
      <h2>{employee.role}</h2>
      <hr />
      <div className="div-2">
        <div className="department">
          <h1>Department</h1>
          <h2>{employee.department}</h2>
        </div>
        <div className="Id-number">
          <h1>ID number</h1>
          <h2>{employee.id}</h2>
        </div>
      </div>
      <div className="div-3">
        <div className="status">
          <h1>Status</h1>
          <h2>{employee.status}</h2>
        </div>
        <div className="btn-2">
          <Link to="/employee-managment/view-profile">
            <button className="btn-5">View Profile</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const EmployeeManagement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (id) => {
    setActiveDropdown((prev) => (prev === id ? null : id));
  };

  const employees = [
    { id: '49201', name: 'Sarah Johnson', role: 'Software Engineer', department: 'Engineering', status: 'Active' },
    { id: '49202', name: 'John Doe', role: 'UI Designer', department: 'Design', status: 'Inactive' },
    { id: '49203', name: 'John Doe', role: 'UI Designer', department: 'Design', status: 'Inactive' },
    { id: '49204', name: 'Sarah Johnson', role: 'Software Engineer', department: 'Engineering', status: 'Active' },
    // Add more employees here
  ];

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
            <h5>Employee Management</h5>
            <h6>24 Thursday October 2024</h6>
          </div>
          <div className="number-of-employee">
            <div className="div-1">
              <h2>{employees.length} Total employees</h2>
            </div>
            <div className="div-3">
              <div className="btn-8">
                <button onClick={() => setIsOpen(!isOpen)}>
                  <FontAwesomeIcon icon="fa-solid fa-filter" /> Filter
                </button>
              </div>
              {isOpen && (
                <div className="dropdownstyle">
                  <p>All</p>
                  <p>Engineering</p>
                  <p>Design</p>
                  <p>Marketing</p>
                  <p>Sales</p>
                  <p>Data Science</p>
                  <p>Operations</p>
                </div>
              )}
              <div className="btn">
                <Link to="/employee-managment/add-employee">
                  <button>
                    <FontAwesomeIcon icon="fa-solid fa-plus" /> Add New Employee
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="dashboard-details-2">
            {employees.map((employee) => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                isDropdownOpen={activeDropdown === employee.id}
                onToggleDropdown={toggleDropdown}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeManagement;
