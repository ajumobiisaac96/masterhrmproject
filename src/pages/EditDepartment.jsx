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
//   const [employees, setEmployees] = useState([]);  // List of employees in the department
//   const [hod, setHod] = useState('');
//   const [departmentName, setDepartmentName] = useState('');
//   const [departmentDescription, setDepartmentDescription] = useState('');
//   const [isSaving, setIsSaving] = useState(false); // Track the saving state
//   const [errorMessage, setErrorMessage] = useState(''); // Track error message

//   const departmentId = localStorage.getItem('department_id');
//   const oauthToken = localStorage.getItem('authData');

//   useEffect(() => {
//     const fetchDepartmentData = () => {
//       const departmentId = localStorage.getItem('department_id'); 
//       const departmentData = JSON.parse(localStorage.getItem('department_data')); 
//       const staffData = JSON.parse(localStorage.getItem('staff_data')) || []; 

//       if (departmentData) {
//         setDepartmentData(departmentData);
//         setHod(departmentData.hod || '');
//         setDepartmentName(departmentData.name || '');
//         setDepartmentDescription(departmentData.description || '');
//         setEmployees(staffData);
//       } else {
//         console.error('Department data is missing');
//       }
//     };

//     // ✅ Fetch employees from local storage
//     const fetchFilteredEmployees = () => {
//       const storedEmployees = JSON.parse(localStorage.getItem('filteredEmployees')) || [];
//       if (storedEmployees.length > 0) {
//         setEmployees(storedEmployees);

//         // Set default HOD if it's empty
//         if (!hod) {
//           setHod(storedEmployees[0]?.name || '');
//         }
//       } else {
//         console.warn('No filtered employees found in local storage.');
//       }
//     };

//     fetchDepartmentData();
//     fetchFilteredEmployees();
//   }, []);
  
//   const handleSaveChanges = async () => {
//     setIsSaving(true); // Indicate that we are saving changes
//     try {
//       const updatedDepartment = {
//         name: departmentName,
//         hod: hod,
//         staffs: employees.map((emp) => emp.id),
//         description: departmentDescription,
//       };
  
//       const response = await fetch(
//         `https://proximahr.onrender.com/departments/${departmentId}/edit-department?company_id=your_company_id`,
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
//         console.log('Department updated successfully');
//         navigate('/department');  // Redirect after saving
//       } else {
//         const errorData = await response.json();
//         setErrorMessage(`Failed to update department: ${errorData.detail || 'Unknown error'}`);
//       }
//     } catch (error) {
//       console.error('Error saving department:', error);
//       setErrorMessage('An error occurred while saving changes.');
//     } finally {
//       setIsSaving(false); // End saving state
//     }
//   };

  
//   const handleRemoveEmployee = async (employeeId) => {
//     try {
//       console.log(`Removing employee with ID: ${employeeId}`);
//       const updatedEmployees = employees.filter(emp => emp.id !== employeeId);
//       setEmployees(updatedEmployees);  // Remove from UI immediately
  
//       const response = await fetch(
//         `https://proximahr.onrender.com/departments/${departmentId}/edit-department?company_id=your_company_id`,
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
  
//       if (!response.ok) {
//         throw new Error('Failed to remove employee');
//       }
  
//       console.log('Employee removed successfully');
//     } catch (error) {
//       console.error('Error removing employee:', error);
//       setErrorMessage('Failed to remove employee.');
//     }
//   };
  

//   return (
//     <div>
//       <div className="main-dashboard">
//         <Sidebar />
//         <div className="dashboard">
//           <EmployerNavbar />
//           <hr className="horizontal" />
  
//           {errorMessage && (
//             <div className="error-message" style={{ padding: '10px', color: 'white', backgroundColor: 'red' }}>
//               <p>{errorMessage}</p>
//             </div>
//           )}
  
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
//                       <option key={employee.id} value={employee.name}>
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
//                     <p>{employee.job_title}</p>
//                     <p>{employee.employee_id}</p>
//                     <p className="grey-btn" onClick={() => handleRemoveEmployee(employee.id)}>
//                       Remove Employee
//                     </p>

//                   </div>
//                 ))
//               ) : (
//                 <p>No employees found</p>
//               )}
//             </div>

//             <Link to={'/add-employee-to-department'} ><button>Add Employee</button></Link>
  
//             <div className="department-description">
//               <label htmlFor="departmentDescription">Department Description</label>
//               <textarea
//                 id="departmentDescription"
//                 value={departmentDescription}
//                 onChange={(e) => setDepartmentDescription(e.target.value)}
//                 placeholder="Enter department description"
//               />
//             </div>
  
//             <button className="btn-2" onClick={handleSaveChanges} disabled={isSaving}>
//               {isSaving ? 'Saving...' : 'Save Changes'}
//             </button>

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
import { Link, useNavigate } from 'react-router-dom';
import EmployerNavbar from '../components/EmployerNavbar';

library.add(fas);

const EditDepartment = () => {
  const navigate = useNavigate();
  const [departmentData, setDepartmentData] = useState(null);
  const [employees, setEmployees] = useState([]);  // List of employees in the department
  const [hod, setHod] = useState('');
  const [departmentName, setDepartmentName] = useState('');
  const [departmentDescription, setDepartmentDescription] = useState('');
  const [isSaving, setIsSaving] = useState(false); // Track the saving state
  const [errorMessage, setErrorMessage] = useState(''); // Track error message

  const departmentId = localStorage.getItem('department_id');
  const oauthToken = JSON.parse(localStorage.getItem('authData'))?.token; // Ensure correct retrieval of token

  useEffect(() => {
    const fetchDepartmentData = () => {
      const departmentData = JSON.parse(localStorage.getItem('department_data'));
      const staffData = JSON.parse(localStorage.getItem('staff_data')) || [];

      if (departmentData) {
        setDepartmentData(departmentData);
        setDepartmentName(departmentData.name || '');
        setDepartmentDescription(departmentData.description || '');
        setEmployees(staffData);
      } else {
        console.error('Department data is missing');
      }
    };

    const fetchFilteredEmployees = () => {
      const storedEmployees = JSON.parse(localStorage.getItem('filteredEmployees')) || [];
      if (storedEmployees.length > 0) {
        setEmployees(storedEmployees);
        // Set default HOD if it's empty
        if (!hod) {
          setHod(storedEmployees[0]?.name || ''); // Set HOD based on first employee
        }
      } else {
        console.warn('No filtered employees found in local storage.');
      }
    };

    fetchDepartmentData();
    fetchFilteredEmployees();
  }, []);  // Empty dependency array means this effect only runs once when the component mounts


  const handleSaveChanges = async () => {
    setIsSaving(true); // Indicate that we are saving changes
    console.log("Save button clicked"); // Debugging line to check if the function is called
    try {
      const updatedDepartment = {
        name: departmentName || '',
        hod: employees.find((employee) => employee.name === hod)?.employee_id || '', 
        staffs: employees.map((emp) => emp.id ? emp.id.toString() : null).filter(Boolean),
        description: departmentDescription || '',
      };

      console.log("Data sent to API:", JSON.stringify(updatedDepartment, null, 2)); // Log data before sending

      const response = await fetch(
        `https://proximahr.onrender.com/departments/${departmentId}/edit-department?company_id=${localStorage.getItem("company_id")}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${oauthToken}`,
          },
          body: JSON.stringify(updatedDepartment),
        }
      );

      const responseData = await response.json();
      console.log("Save Response:", responseData); // Check the full response

      if (response.ok) {
        console.log('Department updated successfully');
        setDepartmentDescription(updatedDepartment.description); // Update the description in the UI
        navigate('/department'); // Redirect after saving
      } else {
        setErrorMessage(`Failed to update department: ${responseData.detail || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error saving department:', error);
      setErrorMessage('An error occurred while saving changes.');
    } finally {
      setIsSaving(false); // End saving state
    }
};



  const handleRemoveEmployee = async (employeeId) => {
    try {
      console.log(`Removing employee with ID: ${employeeId}`);
      // Remove employee from the state (UI) immediately for better user experience
      const updatedEmployees = employees.filter((employee) => employee.id !== employeeId);
      setEmployees(updatedEmployees);  // Update the UI immediately to reflect the removal

      // Send the API request to remove the employee from the backend
      const response = await fetch(
        `https://proximahr.onrender.com/departments/${departmentId}/edit-department?company_id=${localStorage.getItem("company_id")}`,
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

      // Handle the response
      if (response.ok) {
        console.log('Employee removed successfully');
      } else {
        const errorData = await response.json();
        console.error('Error removing employee:', errorData);
        setErrorMessage('Failed to remove employee.');
      }
    } catch (error) {
      console.error('Error removing employee:', error);
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
                    <p className="grey-btn" onClick={() => handleRemoveEmployee(employee.id)}>
                      Remove Employee
                    </p>
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
