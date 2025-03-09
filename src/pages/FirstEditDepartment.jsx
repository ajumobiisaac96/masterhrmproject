import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import test from '../assets/test.png';
import '../pages/EditDepartment.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import EmployerNavbar from '../components/EmployerNavbar';

library.add(fas);

const EditDepartment = () => {
  const [departmentData, setDepartmentData] = useState(null);
  const [employees, setEmployees] = useState([]);  // List of employees in the department
  const [hod, setHod] = useState('');  // Department Head
  const [departmentName, setDepartmentName] = useState('');
  const [departmentDescription, setDepartmentDescription] = useState('');
  const [isSaving, setIsSaving] = useState(false); // Track saving state
  const [errorMessage, setErrorMessage] = useState(''); // Track error messages

  const departmentId = localStorage.getItem('department_id');
  const oauthToken = localStorage.getItem('authData');

  // Use useEffect to fetch data from localStorage when the page loads
  useEffect(() => {
    const fetchDepartmentData = () => {
      const departmentData = JSON.parse(localStorage.getItem('department_data'));
      const staffData = JSON.parse(localStorage.getItem('staff_data')) || [];

      if (departmentData) {
        setDepartmentData(departmentData);
        setDepartmentName(departmentData.name || '');
        setDepartmentDescription(departmentData.description || '');
        setHod(departmentData.hod || ''); // Set department head
        setEmployees(staffData); // Set the list of employees
      } else {
        console.error('Department data is missing');
      }
    };

    fetchDepartmentData();
  }, []);

  // Handle removing an employee
  const handleRemoveEmployee = async (employeeId) => {
    try {
      console.log(`Removing employee with ID: ${employeeId}`);
      const response = await fetch(
        `https://proximahr.onrender.com/departments/${departmentId}/edit-department`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${oauthToken}`,
          },
          body: JSON.stringify({
            remove_staffs: [employeeId],
          }),
        }
      );

      if (response.ok) {
        setEmployees((prevEmployees) => prevEmployees.filter((emp) => emp.id !== employeeId));
      } else {
        console.error('Failed to remove employee');
      }
    } catch (error) {
      console.error('Error removing employee:', error);
    }
  };

  return (
    <div>
      <div className="main-dashboard">
        <Sidebar />
        <div className="dashboard">
          <EmployerNavbar />
          <hr className="horizontal" />
          
          {/* Display error message if there's any */}
          {errorMessage && (
            <div className="error-message" style={{ padding: '10px', color: 'white', backgroundColor: 'red' }}>
              <p>{errorMessage}</p>
            </div>
          )}

          <div className="dashboard-detail-1">
            <Link to="/department">
              <h1 className="employee-profile">
                <FontAwesomeIcon icon="fa-solid fa-arrow-left" className="left-arrow" />
                Edit Department
              </h1>
            </Link>
          </div>

          <div className="Department-info">
            <div className="department-info-2">
              <div className="div-1">
                <label>Department Name</label>
                <input type="text" value={departmentName} onChange={(e) => setDepartmentName(e.target.value)} />
              </div>
              <div className="div-2">
                <label>Department Head</label>
                <select value={hod} onChange={(e) => setHod(e.target.value)}>
                  {employees.length > 0 ? (
                    employees.map((employee) => (
                      <option key={employee.id} value={employee.name}>
                        {employee.name}
                      </option>
                    ))
                  ) : (
                    <option>No employees found</option>
                  )}
                </select>
              </div>
            </div>

            <h3>Add Members/Remove Members</h3>

            <div className="employee-department-section">
              <div className="row-one">
                <p>Full Name</p>
                <p>Job Title</p>
                <p>Employee ID</p>
                <p>Edit</p>
              </div>
              <hr />
              {employees.length > 0 ? (
                employees.map((employee) => (
                  <div key={employee.id} className="row-two">
                    <div>
                      <img src={test} alt="Profile" className="My-profile" />
                      <p>{employee.name}</p>
                    </div>
                    <p>{employee.job_title}</p>
                    <p>{employee.employee_id}</p>
                    <p className="grey-btn" onClick={() => handleRemoveEmployee(employee.id)}>Remove Employee</p>
                  </div>
                ))
              ) : (
                <p>No employees found</p>
              )}
            </div>

            <Link to={'/add-employee-to-department'} ><button>Add Employee</button></Link>

            <div className="department-description">
              <label htmlFor="departmentDescription">Department Description</label>
              <textarea
                id="departmentDescription"
                value={departmentDescription}
                onChange={(e) => setDepartmentDescription(e.target.value)}
                placeholder="Enter department description"
              />
            </div>

            <button className="btn-2">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDepartment;
