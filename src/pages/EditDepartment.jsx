// import React, { useState, useEffect } from 'react';
// import Sidebar from '../components/Sidebar';
// import test from '../assets/test.png';
// import '../pages/EditDepartment.css';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fas } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Link, useNavigate } from 'react-router-dom';
// import EmployerNavbar from '../components/EmployerNavbar';
// import { toast } from 'react-toastify';

// library.add(fas);

// const EditDepartment = () => {
//   const navigate = useNavigate();
//   const [departmentName, setDepartmentName] = useState('');
//   const [departmentDescription, setDepartmentDescription] = useState('');
//   const [employees, setEmployees] = useState([]);  // List of employees in the department
//   const [hod, setHod] = useState('');  // Department Head (HOD) ID
//   const [isSaving, setIsSaving] = useState(false);
//   const [errorMessage, setErrorMessage] = useState(''); // User-friendly error messages

//   const departmentId = localStorage.getItem('department_id');
//   const oauthToken = JSON.parse(localStorage.getItem('authData'))?.access_token;

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

//     const companyId = localStorage.getItem('company_id');
//     const updatedDepartment = {
//       id: departmentId,  // Add the department ID here
//       name: departmentName || null,
//       hod: hod || null,  // Ensure that the HOD ID is passed
//       description: departmentDescription || null,
//       staffs: employees.map((emp) => emp.employee_id),
//       remove_staffs: []  // If you’re removing anyone, push them here
//     };

//     const apiUrl = `https://proximahr.onrender.com/departments/${departmentId}/edit-department?company_id=${companyId}`;

//     try {
//       const response = await fetch(apiUrl, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${oauthToken}`,
//         },
//         body: JSON.stringify(updatedDepartment),
//       });

//       const responseData = await response.json();

//       if (response.ok) {
//         toast.success('Department updated successfully!');
//         setIsSaving(false);

//         setTimeout(() => {
//           navigate('/department', {
//             state: { refetch: true },
//             replace: true
//           });
//         }, 2000);  // 2-second delay to allow backend to update
//       } else {
//         toast.error(`Failed to update department: ${responseData.detail || 'Unknown error.'}`);
//         setIsSaving(false);
//       }
//     } catch (error) {
//       toast.error('An error occurred while saving changes.');
//       setIsSaving(false);
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
//         toast.success('Employee removed successfully');
//       } else {
//         const errorData = await response.json();
//         console.error('❌ Error removing employee:', errorData);
//         toast.error('Failed to remove employee.');
//       }
//     } catch (error) {
//       console.error('🚨 Error removing employee:', error);
//       toast.error('An error occurred while removing the employee.');
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
//               <h1 className="employee-profile" style={{ marginTop: '20px', fontSize:'28px' }}>
//                 <FontAwesomeIcon icon="fa-solid fa-arrow-left" className="left-arrow"  style={{marginRight:'20px'}}/>
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
//                     <p className="grey-btn" onClick={() => handleRemoveEmployee(employee.employee_id)} style={{ cursor: 'pointer', height:'25px', marginTop:'-4px'}}>
//                       Remove Employee
//                     </p>
//                   </div>
//                 ))
//               ) : (
//                 <p>No employees found</p>
//               )}
//             </div>
            
//             <div style={{ marginLeft: '800px', }}>
//                <Link to={'/add-employee-to-department'}><button style={{backgroundColor:'#007BFF', height:'30px', width:'150px', borderRadius:'5px', marginTop:'20px', border:'none',color:'white', padding:'5px',  }} >Add Employee</button></Link>
//             </div>
            

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
//               disabled={isSaving} style={{marginBottom:"20px"}}  >
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
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { toast } from 'react-toastify';
import EmployerNavbar from '../components/EmployerNavbar';
import test from '../assets/test.png';

library.add(fas);

const EditDepartment = () => {
    const navigate = useNavigate();
    const { departmentId } = useParams(); // Get departmentId from the URL
    const [departmentDetails, setDepartmentDetails] = useState(null);
    const [departmentName, setDepartmentName] = useState('');
    const [departmentDescription, setDepartmentDescription] = useState('');
    const [employees, setEmployees] = useState([]);
    const [hod, setHod] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const oauthToken = JSON.parse(localStorage.getItem('authData'))?.access_token;

    // Fetch department details and employees when component mounts
    useEffect(() => {
        const fetchDepartmentData = async () => {
            if (!departmentId || !oauthToken) {
                setErrorMessage('Department ID or auth token missing.');
                return;
            }

            try {
                const companyId = localStorage.getItem('company_id');
                const apiUrl = `https://proximahr.onrender.com/api/v2/departments/${departmentId}/department-details`;

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
                setDepartmentDetails(data.data);
                setDepartmentName(data.data.department_name || '');
                setDepartmentDescription(data.data.description || '');
                setEmployees(data.data.staff_members || []);
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
            id: departmentId,
            name: departmentName || null,
            hod: hod || null,
            description: departmentDescription || null,
            staffs: employees.map((emp) => emp.employee_id),
            remove_staffs: [],
        };

        const apiUrl = `https://proximahr.onrender.com/api/v2/departments/${departmentId}/edit-department`;

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

            if (response.ok) {
                toast.success('Department updated successfully!');
                setIsSaving(false);

                setTimeout(() => {
                    navigate('/department', {
                        state: { refetch: true },
                        replace: true,
                    });
                }, 2000);
            } else {
                toast.error(`Failed to update department: ${responseData.detail || 'Unknown error.'}`);
                setIsSaving(false);
            }
        } catch (error) {
            toast.error('An error occurred while saving changes.');
            setIsSaving(false);
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
            const apiUrl = `https://proximahr.onrender.com/api/v2/departments/${departmentId}/edit-department`;

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
                toast.success('Employee removed successfully');
            } else {
                const errorData = await response.json();
                console.error('❌ Error removing employee:', errorData);
                toast.error('Failed to remove employee.');
            }
        } catch (error) {
            console.error('🚨 Error removing employee:', error);
            toast.error('An error occurred while removing the employee.');
        }
    };

    if (!departmentDetails) return <div>Loading...</div>;

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
                        <Link to={`/department/add-employee-department/${departmentId}`}>
                            <h1 className="employee-profile" disabled={!departmentId} style={{ marginTop: '20px', fontSize: '28px' }}>
                                <FontAwesomeIcon icon="fa-solid fa-arrow-left" className="left-arrow" style={{ marginRight: '20px' }} />
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
                                />
                            </div>
                            <div className="div-2">
                                <label>Department Head</label>
                                <select value={hod} onChange={(e) => setHod(e.target.value)}>
                                    {employees.length > 0 ? (
                                        employees.map((employee) => {
                                            const fullName = `${employee.first_name} ${employee.last_name}`;
                                            return (
                                                <option key={employee.employee_id} value={employee.employee_id}>
                                                    {fullName}
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
                                        <p className="grey-btn" onClick={() => handleRemoveEmployee(employee.employee_id)} style={{ cursor: 'pointer', height: '25px', marginTop: '-4px' }}>
                                            Remove Employee
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p>No employees found</p>
                            )}
                        </div>

                        <div style={{ marginLeft: '800px' }}>
                        <Link to={`/add-employee-to-department/${departmentId}`}>
                                <button style={{ backgroundColor: '#007BFF', height: '30px', width: '150px', borderRadius: '5px', marginTop: '20px', border: 'none', color: 'white', padding: '5px' }}>Add Employee</button>
                            </Link>
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

                        <button className="btn-2" onClick={handleSaveChanges} disabled={isSaving} style={{ marginBottom: "20px" }}>
                            {isSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditDepartment;
