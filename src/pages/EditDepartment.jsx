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






















// import React, { useState, useEffect } from 'react';
// import Sidebar from '../components/Sidebar';
// import test from '../assets/test.png';
// import '../pages/EditDepartment.css';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fas } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Link, useNavigate } from 'react-router-dom';
// import EmployerNavbar from '../components/EmployerNavbar';

// library.add(fas);

// const EditDepartment = () => {
//   const navigate = useNavigate();
//   const [departmentName, setDepartmentName] = useState('');
//   const [departmentDescription, setDepartmentDescription] = useState('');
//   const [employees, setEmployees] = useState([]);  // List of employees in the department
//   const [hod, setHod] = useState('');  // Department Head (HOD) ID
//   const [isSaving, setIsSaving] = useState(false);
//   const [errorMessage, setErrorMessage] = useState(''); // User-friendly error messages
//   const [errorDetails, setErrorDetails] = useState(''); // Detailed error message

//   const departmentId = localStorage.getItem('department_id');
//   const oauthToken = JSON.parse(localStorage.getItem('authData'))?.token;

//   // Fetch department details and employees when component mounts
//   useEffect(() => {
//     const fetchDepartmentData = async () => {
//       if (!departmentId || !oauthToken) {
//         setErrorMessage('Department ID or auth token missing.');
//         return;
//       }

//       try {
//         const companyId = localStorage.getItem('company_id');
//         const apiUrl = `https://proximahr.onrender.com/departments/${departmentId}/department-details?company_id=${companyId}`;

//         const response = await fetch(apiUrl, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${oauthToken}`,
//           },
//         });

//         if (!response.ok) throw new Error('Failed to fetch department details.');

//         const data = await response.json();

//         // Set department details in state
//         setDepartmentName(data.data.department_name || '');
//         setDepartmentDescription(data.data.description || '');
//         setEmployees(data.data.staff_members || []);
        
//         // Set HOD using the employee ID
//         setHod(data.data.hod_details?.employee_id || ''); // Use employee_id for HOD

//       } catch (err) {
//         setErrorMessage('Error fetching department data.');
//         console.error(err);
//       }
//     };

//     fetchDepartmentData();
//   }, [departmentId, oauthToken]);

//   const handleSaveChanges = async () => {
//     setIsSaving(true);

//     // Ensure required fields are populated
//     if (!departmentName || !hod || !departmentDescription) {
//       console.log("Missing fields:", {
//         departmentName,
//         departmentDescription,
//         hod
//       });
//       setErrorMessage('Failed to update department: Missing required fields.');
//       setIsSaving(false);
//       return;
//     }

//     const updatedDepartment = {
//       name: departmentName,
//       hod: hod, // Send employee_id for HOD
//       description: departmentDescription,
//       staffs: employees.map((emp) => emp.employee_id), // All employee IDs
//       remove_staffs: [] // Optionally remove staff
//     };

//     console.log("🔁 Data being sent to the API:", updatedDepartment);

//     const companyId = localStorage.getItem('company_id');
//     const apiUrl = `https://proximahr.onrender.com/departments/${departmentId}/edit-department?company_id=${companyId}`;

//     try {
//       const response = await fetch(apiUrl, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${oauthToken}`, // Authentication token
//         },
//         body: JSON.stringify(updatedDepartment),
//       });

//       if (response.ok) {
//         console.log('✅ Department updated successfully');
//         setIsSaving(false);
//         navigate('/department'); // Navigate to department page after success
//       } else {
//         const errorData = await response.json();
//         setIsSaving(false);
//         setErrorMessage(`Failed to update department: ${errorData.detail || 'Unknown error.'}`);
//       }
//     } catch (error) {
//       setIsSaving(false);
//       setErrorMessage('An error occurred while saving changes.');
//       console.error('Error saving department:', error);
//     }
//   };

//   const handleRemoveEmployee = async (employeeId) => {
//     try {
//       console.log(`Removing employee with ID: ${employeeId}`);

//       // Remove the specific employee from the state (UI) immediately
//       const updatedEmployees = employees.filter((employee) => employee.employee_id !== employeeId);
//       setEmployees(updatedEmployees);  // Update the UI immediately

//       const companyId = localStorage.getItem('company_id');
//       const apiUrl = `https://proximahr.onrender.com/departments/${departmentId}/edit-department?company_id=${companyId}`;

//       const response = await fetch(apiUrl, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${oauthToken}`,
//         },
//         body: JSON.stringify({
//           remove_staffs: [employeeId],  // Only send the ID of the employee being removed
//         }),
//       });

//       if (response.ok) {
//         console.log('✅ Employee removed successfully');
//       } else {
//         const errorData = await response.json();
//         console.error('❌ Error removing employee:', errorData);
//         setErrorMessage('Failed to remove employee.');
//       }
//     } catch (error) {
//       console.error('🚨 Error removing employee:', error);
//       setErrorMessage('An error occurred while removing the employee.');
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
//               {errorDetails && <p>{errorDetails}</p>}  {/* Display detailed error */}
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
//                 <input 
//                   type="text" 
//                   value={departmentName} 
//                   onChange={(e) => setDepartmentName(e.target.value)} 
//                 /> {/* Editable input field */}
//               </div>
//               <div className="div-2">
//                 <label>Department Head</label>
//                 <select value={hod} onChange={(e) => setHod(e.target.value)}>
//                   {employees.length > 0 ? (
//                     employees.map((employee) => {
//                       const fullName = `${employee.first_name} ${employee.last_name}`;
//                       return (
//                         <option key={employee.employee_id} value={employee.employee_id}>
//                           {fullName} {/* Display full name */}
//                         </option>
//                       );
//                     })
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
//                       <p>{employee.first_name} {employee.last_name}</p>
//                     </div>
//                     <p>{employee.job_title}</p>
//                     <p>{employee.employee_id}</p>
//                     <p className="grey-btn" onClick={() => handleRemoveEmployee(employee.employee_id)}>
//                       Remove Employee
//                     </p>
//                   </div>
//                 ))
//               ) : (
//                 <p>No employees found</p>
//               )}
//             </div>

//             <Link to={'/add-employee-to-department'}><button>Add Employee</button></Link>

//             <div className="department-description">
//               <label htmlFor="departmentDescription">Department Description</label>
//               <textarea
//                 id="departmentDescription"
//                 value={departmentDescription}
//                 onChange={(e) => setDepartmentDescription(e.target.value)}
//                 placeholder="Enter department description"
//               />
//             </div>

//             <button 
//               className="btn-2" 
//               onClick={handleSaveChanges} 
//               disabled={isSaving}>
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






















// import React, { useState, useEffect } from 'react';
// import Sidebar from '../components/Sidebar';
// import test from '../assets/test.png';
// import '../pages/EditDepartment.css';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fas } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import EmployerNavbar from '../components/EmployerNavbar';

// library.add(fas);

// const EditDepartment = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const departmentId = location.state?.departmentId;
//   const departmentData = location.state?.departmentData;
//   const staffData = location.state?.staffData || [];

//   const [departmentName, setDepartmentName] = useState(departmentData?.name || '');
//   const [departmentDescription, setDepartmentDescription] = useState(departmentData?.description || '');
//   const [employees, setEmployees] = useState(staffData);
//   const [hod, setHod] = useState(departmentData?.hod?.employee_id || '');
//   const [isSaving, setIsSaving] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');

//   const oauthToken = JSON.parse(localStorage.getItem('authData'))?.token;

//   const handleSaveChanges = async () => {
//     setIsSaving(true);

//     const companyId = localStorage.getItem('company_id');
//     const updatedDepartment = {
//       name: departmentName || null,
//       hod: hod || null,
//       description: departmentDescription || null,
//       staffs: employees.map((emp) => emp.employee_id),
//       remove_staffs: [] // Optional if any staff is being removed
//     };

//     const apiUrl = `https://proximahr.onrender.com/departments/${departmentId}/edit-department?company_id=${companyId}`;

//     // Log the data being sent to the backend
//     console.log("🛠 Data being sent to backend:", updatedDepartment);
//     console.log("➡️ API Endpoint:", apiUrl);

//     try {
//       const response = await fetch(apiUrl, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${oauthToken}`,
//         },
//         body: JSON.stringify(updatedDepartment),
//       });

//       if (response.ok) {
//         console.log('✅ Department updated successfully');
//         setIsSaving(false);

//         // Wait for a moment before navigating
//         setTimeout(() => {
//           navigate('/department', {
//             state: { refetch: true },
//             replace: true
//           });
//         }, 1000);
//       } else {
//         const errorData = await response.json();
//         setIsSaving(false);
//         setErrorMessage(`Failed to update department: ${errorData.detail || 'Unknown error.'}`);
//       }
//     } catch (error) {
//       setIsSaving(false);
//       setErrorMessage('An error occurred while saving changes.');
//       console.error('Error saving department:', error);
//     }
//   };

//   const handleRemoveEmployee = async (employeeId) => {
//     try {
//       console.log(`Removing employee with ID: ${employeeId}`);

//       // Remove the specific employee from the state (UI) immediately
//       const updatedEmployees = employees.filter((employee) => employee.employee_id !== employeeId);
//       setEmployees(updatedEmployees);  // Update the UI immediately

//       const companyId = localStorage.getItem('company_id');
//       const apiUrl = `https://proximahr.onrender.com/departments/${departmentId}/edit-department?company_id=${companyId}`;

//       const response = await fetch(apiUrl, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${oauthToken}`,
//         },
//         body: JSON.stringify({
//           remove_staffs: [employeeId],  // Only send the ID of the employee being removed
//         }),
//       });

//       if (response.ok) {
//         console.log('✅ Employee removed successfully');
//       } else {
//         const errorData = await response.json();
//         console.error('❌ Error removing employee:', errorData);
//         setErrorMessage('Failed to remove employee.');
//       }
//     } catch (error) {
//       console.error('🚨 Error removing employee:', error);
//       setErrorMessage('An error occurred while removing the employee.');
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
//                 <input
//                   type="text"
//                   value={departmentName}
//                   onChange={(e) => setDepartmentName(e.target.value)}
//                 />
//               </div>
//               <div className="div-2">
//                 <label>Department Head</label>
//                 <select value={hod} onChange={(e) => setHod(e.target.value)}>
//                   {employees.length > 0 ? (
//                     employees.map((employee) => {
//                       const fullName = `${employee.first_name} ${employee.last_name}`;
//                       return (
//                         <option key={employee.employee_id} value={employee.employee_id}>
//                           {fullName}
//                         </option>
//                       );
//                     })
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
//                       <p>{employee.first_name} {employee.last_name}</p>
//                     </div>
//                     <p>{employee.job_title}</p>
//                     <p>{employee.employee_id}</p>
//                     <p className="grey-btn" onClick={() => handleRemoveEmployee(employee.employee_id)}>
//                       Remove Employee
//                     </p>
//                   </div>
//                 ))
//               ) : (
//                 <p>No employees found</p>
//               )}
//             </div>

//             <Link to={'/add-employee-to-department'}>
//               <button>Add Employee</button>
//             </Link>

//             <div className="department-description">
//               <label htmlFor="departmentDescription">Department Description</label>
//               <textarea
//                 id="departmentDescription"
//                 value={departmentDescription}
//                 onChange={(e) => setDepartmentDescription(e.target.value)}
//                 placeholder="Enter department description"
//               />
//             </div>

//             <button
//               className="btn-2"
//               onClick={handleSaveChanges}
//               disabled={isSaving}
//             >
//               {isSaving ? 'Saving...' : 'Save Changes'}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditDepartment;
