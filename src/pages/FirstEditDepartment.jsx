import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import test from '../assets/test.png';
import '../pages/EditDepartment.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import EmployerNavbar from '../components/EmployerNavbar';

library.add(fas);

const EditDepartment = () => {
  const navigate = useNavigate();
  const [departmentName, setDepartmentName] = useState('');
  const [departmentDescription, setDepartmentDescription] = useState('');
  const [employees, setEmployees] = useState([]);  // List of employees in the department
  const [hod, setHod] = useState('');  // Department Head (HOD) ID
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // User-friendly error messages
  const [errorDetails, setErrorDetails] = useState(''); // Detailed error message

  const departmentId = localStorage.getItem('department_id');
  console.log("Department ID:", departmentId);
  const oauthToken = JSON.parse(localStorage.getItem('authData'))?.token;

  // Fetch department details and employees when component mounts
  useEffect(() => {
    const fetchDepartmentData = async () => {
      if (!departmentId || !oauthToken) {
        setErrorMessage('Department ID or auth token missing.');
        return;
      }

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

        if (!response.ok) throw new Error('Failed to fetch department details.');

        const data = await response.json();

        // Set department details in state
        setDepartmentName(data.data.department_name || '');
        setDepartmentDescription(data.data.description || '');
        setEmployees(data.data.staff_members || []);
        
        // Set HOD using the employee ID
        setHod(data.data.hod_details?.employee_id || ''); // Use employee_id for HOD

      } catch (err) {
        setErrorMessage('Error fetching department data.');
        console.error(err);
      }
    };

    fetchDepartmentData();
  }, [departmentId, oauthToken]);

  const handleSaveChanges = async () => {
    setIsSaving(true);
  
    const companyId = localStorage.getItem('company_id');
    const updatedDepartment = {
      id: departmentId,  // Add the department ID here
      name: departmentName || null,
      hod: hod || null,
      description: departmentDescription || null,
      staffs: employees.map((emp) => emp.employee_id),
      remove_staffs: []  // If you’re removing anyone, push them here
    };
  
    const apiUrl = `https://proximahr.onrender.com/departments/${departmentId}/edit-department?company_id=${companyId}`;
  
    // Log the data being sent to the backend
    console.log("🛠 Data being sent to backend:", updatedDepartment);
    console.log("➡️ API Endpoint:", apiUrl);
  
    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${oauthToken}`,
        },
        body: JSON.stringify(updatedDepartment),
      });
  
      const responseData = await response.json();
      console.log("📥 Response from backend:", responseData);
  
      if (response.ok) {
        console.log('✅ Department updated successfully');
        setIsSaving(false);
  
        // Wait for a moment before navigating
        setTimeout(() => {
          navigate('/department', {
            state: { refetch: true },
            replace: true
          });
        }, 2000);  // 2-second delay to allow backend to update
      } else {
        setIsSaving(false);
        setErrorMessage(`Failed to update department: ${responseData.detail || 'Unknown error.'}`);
      }
    } catch (error) {
      setIsSaving(false);
      setErrorMessage('An error occurred while saving changes.');
      console.error('Error saving department:', error);
    }
  };
  
  
  
  

  const handleRemoveEmployee = async (employeeId) => {
    try {
      console.log(`Removing employee with ID: ${employeeId}`);

      // Remove the specific employee from the state (UI) immediately
      const updatedEmployees = employees.filter((employee) => employee.employee_id !== employeeId);
      setEmployees(updatedEmployees);  // Update the UI immediately

      const companyId = localStorage.getItem('company_id');
      const apiUrl = `https://proximahr.onrender.com/departments/${departmentId}/edit-department?company_id=${companyId}`;

      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${oauthToken}`,
        },
        body: JSON.stringify({
          remove_staffs: [employeeId],  // Only send the ID of the employee being removed
        }),
      });

      if (response.ok) {
        console.log('✅ Employee removed successfully');
      } else {
        const errorData = await response.json();
        console.error('❌ Error removing employee:', errorData);
        setErrorMessage('Failed to remove employee.');
      }
    } catch (error) {
      console.error('🚨 Error removing employee:', error);
      setErrorMessage('An error occurred while removing the employee.');
    }
  };

  return (
    <div>
      <div className="main-dashboard">
        <Sidebar />
        <div className="dashboard">
          <EmployerNavbar />
          <hr className="horizontal" />

          {errorMessage && (
            <div className="error-message" style={{ padding: '10px', color: 'white', backgroundColor: 'red' }}>
              <p>{errorMessage}</p>
              {errorDetails && <p>{errorDetails}</p>}  {/* Display detailed error */}
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
                <input 
                  type="text" 
                  value={departmentName} 
                  onChange={(e) => setDepartmentName(e.target.value)} 
                /> {/* Editable input field */}
              </div>
              <div className="div-2">
                <label>Department Head</label>
                <select value={hod} onChange={(e) => setHod(e.target.value)}>
                  {employees.length > 0 ? (
                    employees.map((employee) => {
                      const fullName = `${employee.first_name} ${employee.last_name}`;
                      return (
                        <option key={employee.employee_id} value={employee.employee_id}>
                          {fullName} {/* Display full name */}
                        </option>
                      );
                    })
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
                      <p>{employee.first_name} {employee.last_name}</p>
                    </div>
                    <p>{employee.job_title}</p>
                    <p>{employee.employee_id}</p>
                    <p className="grey-btn" onClick={() => handleRemoveEmployee(employee.employee_id)}>
                      Remove Employee
                    </p>
                  </div>
                ))
              ) : (
                <p>No employees found</p>
              )}
            </div>

            <Link to={'/add-employee-to-department'}><button>Add Employee</button></Link>

            <div className="department-description">
              <label htmlFor="departmentDescription">Department Description</label>
              <textarea
                id="departmentDescription"
                value={departmentDescription}
                onChange={(e) => setDepartmentDescription(e.target.value)}
                placeholder="Enter department description"
              />
            </div>

            <button 
              className="btn-2" 
              onClick={handleSaveChanges} 
              disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDepartment;