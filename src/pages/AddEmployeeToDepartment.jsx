import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import test from '../assets/test.png';
import '../pages/AddEmployeeToDepartment.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import EmployerNavbar from '../components/EmployerNavbar';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

library.add(fas);

const AddEmployeeToDepartment = () => {
  const navigate = useNavigate();
  const oauthToken = JSON.parse(localStorage.getItem('authData'))?.access_token;
  const [departmentName, setDepartmentName] = useState('');
  const [hod, setHod] = useState('');
  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false); // Modal state

  const { departmentId } = useParams();

  // Fetch department details
  useEffect(() => {
    const fetchDepartmentData = async () => {
      try {
        const companyId = localStorage.getItem('company_id');
        const apiUrl = `https://proximahr.onrender.com/departments/${departmentId}/department-details?company_id=${companyId}`;
        
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${oauthToken}`,
          },
        });

        const data = await response.json();
        setDepartmentName(data.data.department_name);
        setHod(data.data.hod_details?.employee_id || '');
      } catch (err) {
        setError('Failed to fetch department details.');
      }
    };

    fetchDepartmentData();
  }, [departmentId, oauthToken]);

  // Fetch employees in the system
  const fetchEmployees = async () => {
    try {
      const apiUrl = `https://proximahr.onrender.com/api/v2/employee-management/all-employees?page=1&page_size=100&name=${searchTerm}`;
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${oauthToken}`,
        },
      });

      const data = await response.json();
      setEmployees(data.data);
    } catch (err) {
      setError('Failed to fetch employees.');
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [searchTerm]);

  // Handle selecting employees
  const handleEmployeeSelect = (employeeId) => {
    if (selectedEmployees.includes(employeeId)) {
      setSelectedEmployees(selectedEmployees.filter(id => id !== employeeId));
    } else {
      setSelectedEmployees([...selectedEmployees, employeeId]);
    }
  };

  // Handle approval of employees
  const handleApprove = async () => {
    if (selectedEmployees.length === 0) {
      toast.error("Please select at least one employee to approve.", {
        autoClose: 3000,
      });
      return;
    }
  
    try {
      const apiUrl = `https://proximahr.onrender.com/api/v2/departments/${departmentId}/edit-department`;
  
      const requestBody = {
        name: departmentName,
        hod: hod || null,
        staffs: selectedEmployees,
        description: "Updated department details",
      };
  
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${oauthToken}`,
        },
        body: JSON.stringify(requestBody),
      });
  
      if (response.ok) {
        const data = await response.json();
        setSelectedEmployees([]); // Clear the selected employees
        setShowModal(true); // Show the success modal
      } else {
        const errorData = await response.json();
        toast.error(errorData.detail || "Failed to update the department.", {
          autoClose: 3000,
        });
      }
    } catch (err) {
      toast.error("An error occurred while updating the department.", {
        autoClose: 3000,
      });
    }
  };

  return (
    <div>
      <div className="main-dashboard">
        <Sidebar />
        <div className="dashboard">
          <EmployerNavbar />
          <hr className="horizontal" />

          <div className="dashboard-details" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Link to="/department/first-edit-department">
              <h5 style={{ marginBottom: '15px' }}>
                <FontAwesomeIcon icon="fa-solid fa-arrow-left" className="left-arrow" style={{ marginRight: '20px' }} />
                Edit Department
              </h5>
            </Link>
            <h6>{new Date().toLocaleDateString('en-GB', { day: '2-digit', weekday: 'long', month: 'long', year: 'numeric' })}</h6>
          </div>

          <div className="Department-info">
            <div className="department-info-1">
              <div className="div-1">
                <label htmlFor="">Department Name</label>
                <input type="text" placeholder="Engineering Department" value={departmentName} readOnly />
              </div>
              <div className="div-2">
                <label htmlFor="">Department Head</label>
                <select value={hod} onChange={(e) => setHod(e.target.value)}>
                  <option value="">Select Department Head</option>
                  {employees.map(emp => (
                    <option key={emp.employee_id} value={emp.employee_id}>
                      {emp.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <h3>Select Employees</h3>
            <div className="employee-department-section">
              <div className="row-one">
                <p>Full Name</p>
                <p>Job Title</p>
                <p>Employee ID</p>
                <p>Select</p>
              </div>
              <hr />
              {employees.map(employee => (
                <div key={employee.employee_id} className="row-two">
                  <div>
                    <img src={test} alt="My profile" className="My-profile" />
                    <p>{employee.name}</p>
                  </div>
                  <p>{employee.job_title}</p>
                  <p>{employee.employee_id}</p>
                  <input
                    type="checkbox"
                    checked={selectedEmployees.includes(employee.employee_id)}
                    onChange={() => handleEmployeeSelect(employee.employee_id)}
                  />
                </div>
              ))}
            </div>
            <button className="btn-2" onClick={handleApprove}>Approve</button>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            textAlign: 'center',
            width: '300px',
          }}>
            <h3>Success!</h3>
            <p>Employees have been successfully added to the department.</p>
            <button
              onClick={() => navigate('/department')}
              style={{
                marginTop: '20px',
                padding: '10px 20px',
                backgroundColor: '#007BFF',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddEmployeeToDepartment;
