// import React, { useState, useEffect } from 'react';
// import Sidebar from '../components/Sidebar';
// import test from '../assets/test.png';
// import '../pages/EditDepartment.css';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fas } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Link } from 'react-router-dom';
// import EmployerNavbar from '../components/EmployerNavbar';

// library.add(fas);

// const EditDepartment = () => {
//   const [departmentData, setDepartmentData] = useState(null);
//   const [employees, setEmployees] = useState([]);
//   const [hod, setHod] = useState('');
//   const [departmentName, setDepartmentName] = useState('');
//   const [departmentDescription, setDepartmentDescription] = useState('');

//   const departmentId = localStorage.getItem('department_id');
//   const oauthToken = localStorage.getItem('authData');

//   useEffect(() => {
//     const fetchDepartmentData = () => {
//       if (!departmentId || !oauthToken) {
//         console.error('Department ID or OAuth Token is missing');
//         return;
//       }

//       // Retrieve department data from localStorage
//       const storedDepartmentData = localStorage.getItem('department_data');
//       console.log("Stored Department Data from LocalStorage:", storedDepartmentData); // Debugging log

//       if (storedDepartmentData) {
//         const department = JSON.parse(storedDepartmentData);
//         console.log("Fetched Department:", department); // Debugging log
//         setDepartmentData(department);
//         setHod(department.hod || '');
//         setDepartmentName(department.name || '');
//         setDepartmentDescription(department.description || '');

//         // Fetch the department employees
//         fetchEmployees(departmentId);
//       } else {
//         // Fetch department from total_departments in case data is not in department_data
//         const totalDepartments = JSON.parse(localStorage.getItem('total_departments')) || [];
//         const department = totalDepartments.find(dept => dept.id === departmentId);
//         console.log("Department found in total_departments:", department); // Debugging log
//         if (department) {
//           setDepartmentData(department);
//           setHod(department.hod || '');
//           setDepartmentName(department.name || '');
//           setDepartmentDescription(department.description || '');
//           fetchEmployees(departmentId);  // Fetch employees based on departmentId
//         } else {
//           console.error('Department not found');
//         }
//       }
//     };

//     fetchDepartmentData();
//   }, [departmentId, oauthToken]);

//   // Fetch Employees Based on Department ID
//   const fetchEmployees = async (departmentId) => {
//     try {
//       const token = JSON.parse(localStorage.getItem('authData'))?.token;
//       if (!token) throw new Error('Authentication token is missing.');

//       const companyId = localStorage.getItem('company_id');
//       const apiUrl = `https://proximahr.onrender.com/employee-management/all-employees?company_id=${companyId}`;
//       const response = await fetch(apiUrl, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) throw new Error('Failed to fetch employees.');

//       const data = await response.json();
//       console.log('Employees:', data);  // Debugging log

//       // Filter employees based on department_id
//       const filteredEmployees = data.data.filter(employee => employee.department_id === departmentId);

//       console.log('Filtered Employees for Department:', filteredEmployees);  // Debugging log
//       setEmployees(filteredEmployees);  // Set the employees in state
//     } catch (err) {
//       console.error('Error fetching employees:', err);
//     }
//   };

//   const handleSaveChanges = async () => {
//     try {
//       const updatedDepartment = {
//         name: departmentName,
//         hod: hod,  // HOD from the dropdown
//         description: departmentDescription,  // Description from textarea
//         staffs: employees.map(emp => emp.id),  // Map employee objects to their IDs
//         remove_staffs: [],  // You can dynamically set this if an employee is removed
//       };

//       console.log("Updating department with data:", updatedDepartment); // Debugging log

//       const response = await fetch(
//         `https://proximahr.onrender.com/departments/${departmentId}/edit-department?company_id=${companyId}`,
//         {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${oauthToken}`,
//           },
//           body: JSON.stringify(updatedDepartment),
//         }
//       );

//       if (response.ok) {
//         const data = await response.json();
//         console.log('Department updated successfully:', data);
//         // Optionally, update localStorage and UI after successful update
//       } else {
//         console.error('Failed to update department');
//       }
//     } catch (error) {
//       console.error('Error saving department changes:', error);
//     }
//   };

//   const handleRemoveEmployee = async (employeeId) => {
//     try {
//       console.log(`Removing employee with ID: ${employeeId}`); // Debugging log
//       const response = await fetch(
//         `https://proximahr.onrender.com/departments/${departmentId}/edit-department`,
//         {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${oauthToken}`,
//           },
//           body: JSON.stringify({
//             remove_staffs: [employeeId],
//           }),
//         }
//       );

//       if (response.ok) {
//         setEmployees((prevEmployees) => prevEmployees.filter((emp) => emp.id !== employeeId));
//       } else {
//         console.error('Failed to remove employee');
//       }
//     } catch (error) {
//       console.error('Error removing employee:', error);
//     }
//   };

//   return (
//     <div>
//       <div className="main-dashboard">
//         <Sidebar />
//         <div className="dashboard">
//           <EmployerNavbar />
//           <hr className="horizontal" />
//           <div className="dashboard-detail-1">
//             <Link to="/department">
//               <h1 className="employee-profile">
//                 <FontAwesomeIcon icon="fa-solid fa-arrow-left" className="left-arrow" />
//                 Edit Department
//               </h1>
//             </Link>
//           </div>

//           <div className="Department-info">
//             <div className="department-info-2">
//               <div className="div-1">
//                 <label>Department Name</label>
//                 <input type="text" value={departmentName} onChange={(e) => setDepartmentName(e.target.value)} />
//               </div>
//               <div className="div-2">
//                 <label>Department Head</label>

//                 <select value={hod} onChange={(e) => setHod(e.target.value)}>
//                   {employees.length > 0 ? (
//                     employees.map((employee) => (
//                       <option
//                         key={employee.id}
//                         value={employee.name}
//                         style={employee.name === hod ? { backgroundColor: 'blue', color: 'white' } : {}}
//                       >
//                         {employee.name}
//                       </option>
//                     ))
//                   ) : (
//                     <option>No employees found</option>
//                   )}
//                 </select>
//               </div>
//             </div>

//             <h3>Add Members/Remove Members</h3>

//             <div className="employee-department-section">
//               <div className="row-one">
//                 <p>Full Name</p>
//                 <p>Job Title</p>
//                 <p>Employee ID</p>
//                 <p>Edit</p>
//               </div>
//               <hr />
//               {employees.length > 0 ? (
//                 employees.map((employee) => (
//                   <div key={employee.id} className="row-two">
//                     <div>
//                       <img src={test} alt="Profile" className="My-profile" />
//                       <p>{employee.name}</p>
//                     </div>
//                     <p>{employee.jobTitle}</p>
//                     <p>{employee.employeeId}</p>
//                     <p className="grey-btn" onClick={() => handleRemoveEmployee(employee.id)}>Remove Employee</p>
//                   </div>
//                 ))
//               ) : (
//                 <p>No employees found</p>
//               )}
//             </div>


//               <Link to="/department/add-employee-department">
//               <button className="btn-2" style={{ marginTop: '20px'}}>
//                 Add Employee
//               </button>
//               </Link>


//             <div className="department-description">
//               <label htmlFor="departmentDescription">Department Description</label>
//               <textarea
//                 id="departmentDescription"
//                 value={departmentDescription}
//                 onChange={(e) => setDepartmentDescription(e.target.value)}
//                 placeholder="Enter department description"
//               />
//             </div>

//             <button className="btn-2" onClick={handleSaveChanges}>Save Changes</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditDepartment;


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
  const [hod, setHod] = useState('');
  const [departmentName, setDepartmentName] = useState('');
  const [departmentDescription, setDepartmentDescription] = useState('');
  const [isSaving, setIsSaving] = useState(false); // Track the saving state
  const [errorMessage, setErrorMessage] = useState(''); // Track error message

  const departmentId = localStorage.getItem('department_id');
  const oauthToken = localStorage.getItem('authData');

  useEffect(() => {
    const fetchDepartmentData = () => {
      const departmentId = localStorage.getItem('department_id'); // Get department ID from localStorage
      const departmentData = JSON.parse(localStorage.getItem('department_data')); // Get department data
      const staffData = JSON.parse(localStorage.getItem('staff_data')) || []; // Get staff data (defaults to empty array if not found)
  
      // If department data is available, populate the state
      if (departmentData) {
        setDepartmentData(departmentData);
        setHod(departmentData.hod || ''); // Set the HOD
        setDepartmentName(departmentData.name || '');
        setDepartmentDescription(departmentData.description || '');
        setEmployees(staffData); // Set the employees to the retrieved staff data
      } else {
        console.error('Department data is missing');
      }
    };
  
    fetchDepartmentData();
  }, []); // This useEffect runs once when the component mounts
  

  const handleSaveChanges = async () => {
    try {
      setIsSaving(true);  // Set saving state to true
      setErrorMessage(''); // Clear any previous error messages
  
      // Validation before sending data
      if (!departmentName.trim()) {
        setErrorMessage('Department name is required.');
        setIsSaving(false);
        return;
      }
  
      if (!hod) {
        setErrorMessage('Department head (HOD) is required.');
        setIsSaving(false);
        return;
      }
  
      if (employees.length === 0) {
        setErrorMessage('At least one employee must be assigned to the department.');
        setIsSaving(false);
        return;
      }
  
      // Ensure `staffs` is always an array, even if empty
      const updatedDepartment = {
        name: departmentName || "",  // Ensure department name is valid
        hod: hod || null,  // Ensure HOD is valid (if not, send null)
        description: departmentDescription || "",  // Ensure description is valid
        staffs: employees.length > 0 ? employees.map(emp => emp.id) : [],  // If no employees, send an empty array
        remove_staffs: [],  // This is where you can add employee IDs to be removed
      };
  
      console.log("Updating department with data:", updatedDepartment);
  
      const companyId = localStorage.getItem('company_id');
      if (!companyId) {
        setErrorMessage('Company ID is missing.');
        setIsSaving(false);
        return;
      }
  
      const token = JSON.parse(localStorage.getItem('authData'))?.token;
      if (!token) {
        setErrorMessage('Authentication token is missing.');
        setIsSaving(false);
        return;
      }
  
      const response = await fetch(
        `https://proximahr.onrender.com/departments/${departmentId}/edit-department?company_id=${companyId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(updatedDepartment),
        }
      );
  
      if (!response.ok) {
        // Read and log the error message for debugging
        const errorData = await response.json();
        console.error('Error response:', errorData);
  
        // Provide user-friendly error message
        if (errorData.detail) {
          setErrorMessage(`Failed to update department: ${errorData.detail}`);
        } else {
          setErrorMessage('Failed to update department: Unknown error occurred.');
        }
        return;
      }
  
      const data = await response.json();
      console.log('Department updated successfully:', data);
      setErrorMessage('');  // Clear any error message on success
      setIsSaving(false);  // Reset saving state to false
    } catch (error) {
      console.error('Error saving department changes:', error.message);
      setErrorMessage(`Error: ${error.message}`);  // Display the error message
      setIsSaving(false);  // Reset saving state to false
    }
  };

  
  
  const handleRemoveEmployee = async (employeeId) => {
    try {
      console.log(`Removing employee with ID: ${employeeId}`); // Debugging log
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
  
          {/* Display error message at the top */}
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
                      <option
                        key={employee.id}
                        value={employee.name}
                        style={employee.name === hod ? { backgroundColor: 'blue', color: 'white' } : {}}
                      >
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
                    <p>{employee.jobTitle}</p>
                    <p>{employee.employeeId}</p>
                    <p className="grey-btn" onClick={() => handleRemoveEmployee(employee.id)}>Remove Employee</p>
                  </div>
                ))
              ) : (
                <p>No employees found</p>
              )}
            </div>
  
            <div className="department-description">
              <label htmlFor="departmentDescription">Department Description</label>
              <textarea
                id="departmentDescription"
                value={departmentDescription}
                onChange={(e) => setDepartmentDescription(e.target.value)}
                placeholder="Enter department description"
              />
            </div>
  
            {/* Show the saving status */}
            <button className="btn-2" onClick={handleSaveChanges}>
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default EditDepartment;
