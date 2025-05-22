import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import test from '../assets/test.png';
import '../pages/EmployeeManagment.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import EmployerNavbar from '../components/EmployerNavbar';

library.add(fas);

const EmployeeCard = ({ employee, onToggleDropdown, isDropdownOpen, onCardClick }) => {
  const isActive = employee.employment_status === "active";
  const isSuspended = employee.employment_status === "suspended";
  const statusStyles = {
    color: isActive ? "#5cb85c" : isSuspended ? "#d9534f" : "#d9534f",
    backgroundColor: isActive ? "#dff0d8" : isSuspended ? "#f2dede" : "#f2dede",
    padding: "5px 10px",
    borderRadius: "15px",
    fontSize: "12px",
    fontWeight: "500",
  };

  return (
    <div
      onClick={() => onCardClick(employee)}
      style={{
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1), 0 -4px 8px rgba(0,0,0,0.05), 4px 0 8px rgba(0,0,0,0.05), -4px 0 8px rgba(0,0,0,0.05)",
        padding: "15px",
        maxWidth: "250px",
        margin: "5px",
        position: "relative",
        transition: "transform 0.3s ease-in-out",
        cursor: "pointer",
        height: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <img
          src={employee.profile_image || test}
          alt="Profile"
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid #ddd",
          }}
        />
        <p onClick={(e) => { e.stopPropagation(); onToggleDropdown(employee.employee_id); }}>
          <FontAwesomeIcon icon="fa-solid fa-ellipsis-vertical" style={{ fontSize: "18px", color: "#333" }} />
        </p>
        {isDropdownOpen && (
          <div style={{
            position: "absolute", right: "20px", top: "60px",
            backgroundColor: "#fff", borderRadius: "8px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)", zIndex: "1000", minWidth: "150px",
            padding: "10px 0"
          }}>
            <Link to="/employee-managment/suspend-employee">
              <button className='employee-btn' style={{ width: "100%", padding: "10px", border: "none", color: "#2e2e2e", borderRadius: "5px", cursor: "pointer" }}>Suspend Employee</button>
            </Link>
            <Link to="/employee-managment/deactivate-employee">
              <button className='employee-btn' style={{ width: "100%", padding: "10px", border: "none", color: "#2e2e2e", borderRadius: "5px", cursor: "pointer" }}>Deactivate Employee</button>
            </Link>
          </div>
        )}
      </div>
      <h1 style={{ fontSize: "16px", fontWeight: "600", color: "#333", marginTop: "15px", marginBottom: "5px" }}>{employee.name || "No Name"}</h1>
      <h2 style={{ fontSize: "12px", fontWeight: "400", color: "#777", marginBottom: "10px" }}>{employee.job_title || "Not Assigned"}</h2>
      <hr style={{ margin: "10px 0", border: "none", borderTop: "1px solid #ddd" }} />
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#555", marginTop: '-30px' }}>
        <div>
          <h3 style={{ fontSize: "10px", fontWeight: "600", marginBottom: "5px" }}>Department</h3>
          <h4 style={{ fontSize: '16px' }}>{employee.department || 'N/A'}</h4>
        </div>
        <div>
          <h3 style={{ fontSize: "10px", fontWeight: "600", marginBottom: "5px" }}>ID Number</h3>
          <h4 style={{ fontSize: '16px' }}>{employee.employee_id}</h4>
        </div>
      </div>
      <h3 style={{ fontSize: "10px", fontWeight: "600", marginBottom: "5px", marginLeft: '10px' }}>Status</h3>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "-15px", alignItems: 'center' }}>
        <div>
          <h4 style={statusStyles}>{employee.employment_status || "Active"}</h4>
        </div>
        <Link
          to={`/employee-managment/view-profile`}
          onClick={(e) => {
            e.stopPropagation();
            localStorage.setItem("selectedEmployee_id", employee.employee_id);
          }}
        >
          <button className='viewprofile-btn' style={{
            padding: "8px 15px",
            backgroundColor: "#0275d8",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}>
            View Profile
          </button>
        </Link>
      </div>
      
    </div>
  );
};

const EmployeeManagement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [departmentName, setDepartmentName] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);

  // Fetch all employees and departments on mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const storedAuthData = localStorage.getItem("authData");
        if (!storedAuthData) throw new Error("Authentication data is missing.");
        const authData = JSON.parse(storedAuthData);
        const token = authData?.access_token;
        if (!token) throw new Error("Authentication token is missing.");

        const [employeesRes, departmentsRes] = await Promise.all([
          fetch("https://proximahr.onrender.com/api/v2/employee-management/all-employees", {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          }),
          fetch("https://proximahr.onrender.com/api/v2/departments", {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          }),
        ]);
        if (!employeesRes.ok) throw new Error("Failed to fetch employees");
        if (!departmentsRes.ok) throw new Error("Failed to fetch departments");

        const employeesData = await employeesRes.json();
        const departmentsData = await departmentsRes.json();

        // Only keep employees with a name
        setEmployees((employeesData.data || []).filter(emp => emp.name));
        setDepartments(departmentsData.departments || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleDropdown = (id) => {
    setActiveDropdown((prev) => (prev === id ? null : id));
  };

  const handleFilter = (deptName) => {
    setDepartmentName(deptName);
    setPage(1);
    setIsOpen(false);
  };

  const handleCardClick = (employee) => {
    localStorage.setItem("selectedEmployee", JSON.stringify(employee));
  };

  // Filter employees client-side
  const filteredEmployees = departmentName === "All"
    ? employees
    : employees.filter(emp => emp.department === departmentName);

  // Pagination logic
  const totalEmployees = filteredEmployees.length;
  const totalPages = Math.ceil(totalEmployees / pageSize);
  const startEntry = totalEmployees === 0 ? 0 : (page - 1) * pageSize + 1;
  const endEntry = Math.min(page * pageSize, totalEmployees);
  const paginatedEmployees = filteredEmployees.slice((page - 1) * pageSize, page * pageSize);

  // Pagination UI (strictly as in your image)
  const getPageNumbers = () => {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div>
      <div className="main-dashboard">
        <Sidebar />
        <div className="dashboard">
          <EmployerNavbar />
          <hr className="horizontal" />
          <div className="dashboard-details" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <h5 style={{ marginBottom: '15px' }}>Employee Management</h5>
            <h6>{new Date().toLocaleDateString('en-GB', { day: '2-digit', weekday: 'long', month: 'long', year: 'numeric' })}</h6>
          </div>
          <div className="number-of-employee" style={{ marginLeft: "0px", width: 'auto', marginTop: '20px', marginBottom: '40px' }}>
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
                  <p onClick={() => handleFilter("All")}>All</p>
                  {departments.length > 0 ? (
                    departments.map((dept, index) => (
                      <p key={index} onClick={() => handleFilter(dept.name)}>{dept.name}</p>
                    ))
                  ) : (
                    <p>No departments found</p>
                  )}
                </div>
              )}
              <div className="btn">
                <Link to="/employee-managment/add-employee">
                  <button style={{ border: 'none', backgroundColor: '#0275d8', color: '#fff', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
                    <FontAwesomeIcon icon="fa-solid fa-plus" style={{ fontSize: '18px', marginRight: '10px', marginBottom: '-2px' }} /> Add New Employee
                  </button>
                </Link>
              </div>
            </div>
          </div>
          {loading ? (
            <p>Loading employees...</p>
          ) : error ? (
            <p style={{ color: "red" }}>Error: {error}</p>
          ) : (
            <>
              <div style={{ marginBottom: 10, marginLeft: 10, fontSize: 15 }}>
                Showing {startEntry} to {endEntry} of {totalEmployees} entries
              </div>
              <div className="dashboard-details-2" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
                {paginatedEmployees.map((employee) => (
                  <EmployeeCard
                    key={employee.employee_id}
                    employee={employee}
                    isDropdownOpen={activeDropdown === employee.employee_id}
                    onToggleDropdown={toggleDropdown}
                    onCardClick={handleCardClick}
                  />
                ))}
              </div>
              {/* Pagination strictly as in your image, below the cards */}
              {totalPages > 1 && (
                <div
                  style={{
                    marginTop: 32,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 24, // wider gap for UX match
                    width: '100%',
                  }}
                >
                  {getPageNumbers().map((num) => (
                    <button
                      key={num}
                      onClick={() => setPage(num)}
                      style={{
                        border: num === page ? '1.5px solid #bdbdbd' : 'none',
                        background: num === page ? '#fff' : 'transparent',
                        color: '#757575',
                        borderRadius: '8px',
                        width: 44,
                        height: 44,
                        fontWeight: 500,
                        fontSize: 18,
                        outline: 'none',
                        boxShadow: num === page ? '0 2px 4px rgba(0,0,0,0.04)' : 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        padding: 0,
                      }}
                    >
                      {num.toString().padStart(2, '0')}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeManagement;
