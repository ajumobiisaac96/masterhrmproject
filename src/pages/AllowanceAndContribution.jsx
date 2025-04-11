import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import test from '../assets/test.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './AllowanceAndContribution.css';

const AllowanceAndContribution = () => {
  const [allowanceData, setAllowanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [departments, setDepartments] = useState(['All']);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);

  useEffect(() => {
    const fetchPayrollData = async () => {
      setLoading(true);
      setError("");
      try {
        // const companyId = localStorage.getItem("company_id");
        // if (!companyId) throw new Error("Company ID is missing.");

        const storedAuthData = localStorage.getItem("authData");
        if (!storedAuthData) throw new Error("Authentication data is missing.");

        const authData = JSON.parse(storedAuthData);
        const token = authData?.access_token;
        if (!token) throw new Error("Authentication token is missing.");

        const queryParams = new URLSearchParams({
          page: page,
          page_size: pageSize,
          year: selectedYear,
          department: selectedDepartment !== 'All' ? selectedDepartment : '',
          status: selectedStatus !== 'All' ? selectedStatus : '',
          name: searchTerm,
          allowance: true,  // ✅ Fetch Allowance Data
        });

        const response = await fetch(
          `https://proximahr.onrender.com/payroll-management/employees?${queryParams}`,
          {
            headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch payroll data.");

        const data = await response.json();

        console.log("Allowance API Response:", data); // ✅ Log Response

        // ✅ Store data
        setAllowanceData(data?.employees_data || []);
        setDepartments(['All', ...new Set(data?.employees_data.map(emp => emp.department))]);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPayrollData();
  }, [selectedYear, selectedDepartment, selectedStatus, searchTerm, page]); // ✅ Trigger API call when filters change

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="main-dashboard">
      <Sidebar />
      <div className="dashboard centered-content">
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
          <Link to="/payrollManagement" className="back-link">
            <FontAwesomeIcon icon="fa-solid fa-arrow-left" className="left-arrow" /><h5>Payroll Management</h5>
          </Link>
          <h6>{new Date().toDateString()}</h6>
        </div>

        {/* 🔍 Filters */}
        <div className="number-of-employee">
          <div className="new-div-1">
            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" className="glass-icon" />
            <input 
              type="text" 
              placeholder="Search by name, employee ID, or info" 
              value={searchTerm} 
              onChange={handleSearchChange} 
            />
          </div>
          <div className="filters">
            <select className="filter-select" value={selectedYear} onChange={handleYearChange}>
              {[...Array(10).keys()].map((i) => (
                <option key={i} value={new Date().getFullYear() - i}>{new Date().getFullYear() - i}</option>
              ))}
            </select>
            <select className="filter-select" value={selectedDepartment} onChange={handleDepartmentChange}>
              {departments.map((dept, index) => (
                <option key={index} value={dept}>{dept}</option>
              ))}
            </select>
            <select className="filter-select" value={selectedStatus} onChange={handleStatusChange}>
              <option value="All">All</option>
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
            </select>
          </div>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : allowanceData.length === 0 ? (
          <p style={{ textAlign: 'center', fontSize: '16px', color: 'red', marginTop: '20px' }}>
            No records found for {selectedYear}.
          </p>
        ) : (
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
                {allowanceData.map((payroll, index) => (
                  <tr key={index}>
                    <td>{payroll.name}</td>
                    <td>{payroll.department}</td>
                    <td>₦{payroll.overtime_allowance?.toLocaleString()}</td>
                    <td>₦{payroll.housing_allowance?.toLocaleString()}</td>
                    <td>₦{payroll.medical_allowance?.toLocaleString()}</td>
                    <td>₦{payroll.transportation_allowance?.toLocaleString()}</td>
                    <td>₦{payroll.company_match?.toLocaleString()}</td>
                    <td>₦{payroll.employee_contributions?.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllowanceAndContribution;
