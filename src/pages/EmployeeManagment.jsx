import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import test from '../assets/test.png';
import '../pages/EmployeeManagment.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

library.add(fas);

const EmployeeCard = ({ employee, onToggleDropdown, isDropdownOpen }) => {
  return (
    <div className="card">
      <div className="div-1">
        <img src={test} alt="Profile" className="My-profile" />
        <p onClick={() => onToggleDropdown(employee.employee_id)}>
          <FontAwesomeIcon icon="fa-solid fa-ellipsis-vertical" className="three-dots" />
        </p>

        {isDropdownOpen && (
          <div className="suspend-menu">
            <Link to="/employee-managment/suspend-employee">
              <button className="btn-4">Suspend</button>
            </Link>
            <Link to="/employee-managment/deactivate-employee">
              <button className="btn-5">Deactivate</button>
            </Link>
          </div>
        )}
      </div>
      <h1>{employee.name || "No Name"}</h1>
      <h2>{employee.job_title || "Not Assigned"}</h2>
      <hr style={{marginLeft:"-17px"}} />
      <div className="div-2">
        <div className="department">
          <h1>Department</h1>
          <h2>{employee.department || 'N/A'}</h2>
        </div>
        <div className="Id-number">
          <h1>ID number</h1>
          <h2>{employee.employee_id}</h2>
        </div>
      </div>
      <div className="div-3">
        <div className="status">
          <h1>Status</h1>
          <h2>{employee.employment_status || "Active"}</h2>
        </div>
        <div className="btn-2">
          <Link to={`/employee-managment/view-profile?employee_id=${employee.employee_id}`}>
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
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const companyId = localStorage.getItem("company_id");
        if (!companyId) throw new Error("Company ID is missing.");

        const storedAuthData = localStorage.getItem("authData");
        if (!storedAuthData) throw new Error("Authentication data is missing.");

        const authData = JSON.parse(storedAuthData);
        const token = authData?.token;
        if (!token) throw new Error("Authentication token is missing.");

        const apiUrl = `https://proximahr.onrender.com/employee-management/all-employees?company_id=${companyId}&page=1&page_size=10`;

        console.log("Fetching from:", apiUrl);

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        const result = await response.json();
        console.log("API Response:", result);

        if (!response.ok) {
          throw new Error(result.detail || `Error: ${response.status}`);
        }

        setEmployees(result.data || []); // ✅ Corrected to store employees properly
      } catch (err) {
        console.error("Error fetching employee details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const toggleDropdown = (id) => {
    setActiveDropdown((prev) => (prev === id ? null : id));
  };

  return (
    <div>
      <div className="main-dashboard">
        <Sidebar />
        <div className="dashboard">
          <div className="slide-one-1">
            <div className="name">
              <h5>Joseph Dooley</h5>
              <h6>Good Morning</h6>
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
            <h6>{new Date().toDateString()}</h6>
          </div>
          <div className="number-of-employee">
            <div className="div-1">
              <h2>{employees.length} Total Employees</h2>
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

          {loading ? (
                <p>Loading employees...</p>
              ) : error ? (
                <div className="error-box">
                  <p style={{ color: "red", whiteSpace: "pre-wrap" }}>Error: {error}</p>
                </div>
              ) : employees.length > 0 ? (
                <div 
                  className="dashboard-details-2"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)", // ✅ 4-column grid
                    gap: "20px", // ✅ Adds spacing between cards
                  }}
                >
                  {employees.map((employee) => (
                    <EmployeeCard
                      key={employee.employee_id}
                      employee={employee}
                      isDropdownOpen={activeDropdown === employee.employee_id}
                      onToggleDropdown={toggleDropdown}
                    />
                  ))}
                </div>
              ) : (
                <p>No employees found</p>
              )}

        </div>
      </div>
    </div>
  );
};

export default EmployeeManagement;
