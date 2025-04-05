// import React, { useState, useEffect } from 'react';
// import Sidebar from '../components/Sidebar';
// import test from '../assets/test.png';
// import '../pages/AddEmployeeDepartment.css';
// import '../pages/profile.css';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fas } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// library.add(fas);

// const AddEmployeeDepartment = () => {
//   const [departmentDetails, setDepartmentDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch department details
//   useEffect(() => {
//     // Retrieve company_id and department_name from localStorage
//     const companyId = localStorage.getItem('company_id');
//     const departmentName = localStorage.getItem('department_name');

//     if (!companyId || !departmentName) {
//       setError('Company ID or Department Name is missing.');
//       setLoading(false);
//       return;
//     }

//     axios
//       .get(`https://proximahr.onrender.com/departments/department-details`, {
//         params: {
//           company_id: companyId,
//           department_name: departmentName,
//         },
//       })
//       .then((response) => {
//         setDepartmentDetails(response.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error loading department details! {error}</div>;
//   }

//   return (
//     <div>
//       <div className="main-dashboard">
//         <Sidebar />
//         <div className="dashboard">
//           <div className="slide-one-1">
//             <div className="slide-one-1">
//               <div className="name">
//                 <h5>{departmentDetails.head.first_name} {departmentDetails.head.last_name}</h5>
//                 <h6>Good Morning</h6>
//               </div>
//             </div>
//             <div className="slide-one-2-1">
//               <div className="notification">
//                 <FontAwesomeIcon icon="fa-solid fa-bell" />
//                 <h6>6</h6>
//               </div>
//               <div className="user-profile">
//                 <img src={test} alt="My profile" className="My-profile" />
//               </div>
//             </div>
//           </div>

//           <hr className="horizontal" />

//           <div className="dashboard-detail-1">
//             <Link to="/department">
//               <h1 className="employee-profile">
//                 <FontAwesomeIcon icon="fa-solid fa-arrow-left" className="left-arrow"></FontAwesomeIcon> {departmentDetails.name} Department
//               </h1>
//             </Link>
//             <h6>{departmentDetails.created_at}</h6>
//           </div>

//           <div className="dashboard-details-1">
//             <div className="number-of-employee">
//               <div className="div-1">
//                 <div className="div1-1">
//                   <img src={test} alt="My profile" className="My-profile" />
//                 </div>
//                 <div className="div1-2">
//                   <h1>{departmentDetails.head.first_name} {departmentDetails.head.last_name}</h1>
//                   <h2>{departmentDetails.head.job_title}</h2>
//                 </div>
//               </div>
//               <div className="div-2">
//                 <div className="btn">
//                   <button className="grey-btn">Deactivate Department</button>
//                   <Link to="/department/edit-department">
//                     <button><FontAwesomeIcon icon="fa-solid fa-pen-to-square" /> Edit Profile</button>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="employee-info">
//             <div>
//               <h2><FontAwesomeIcon icon="fa-envelope" className="icon" />{departmentDetails.head.email}</h2>
//               <h2><FontAwesomeIcon icon="fa-solid fa-phone" className="icon" />{departmentDetails.head.phone}</h2>
//               <h2><FontAwesomeIcon icon="fa-solid fa-location-dot" className="icon" />{departmentDetails.head.work_location}</h2>
//             </div>
//             <div className="employee-info-description">
//               <h1>Description</h1>
//               <p>{departmentDetails.head.description}</p>
//             </div>
//           </div>

//           <h3>Department Overview</h3>

//           <div className="search-input">
//             <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
//             <input type="text" placeholder="Search employee, Job title, employee Id, status and work mode" />
//           </div>

//           <div className="employee-department-section">
//             {departmentDetails.employees.map((employee) => (
//               <div key={employee.id} className="row-two">
//                 <div>
//                   <img src={test} alt="My profile" className="My-profile" />
//                   <p>{employee.name}</p>
//                 </div>
//                 <p>{employee.job_title}</p>
//                 <p>{employee.id}</p>
//                 <p className="active-btn">{employee.status}</p>
//                 <p>{employee.work_mode}</p>
//                 <p>{employee.position}</p>
//               </div>
//             ))}
//           </div>
//           <button className="grey-btn-1">View more</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddEmployeeDepartment;


// import React, { useState, useEffect } from 'react';
// import Sidebar from '../components/Sidebar';
// import test from '../assets/test.png';
// import '../pages/AddEmployeeDepartment.css';
// import '../pages/profile.css';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fas } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Link } from 'react-router-dom';
// import EmployerNavbar from '../components/EmployerNavbar';

// library.add(fas);

// const AddEmployeeDepartment = () => {
//   const [departmentDetails, setDepartmentDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [employees, setEmployees] = useState([]);

//   useEffect(() => {
//     const fetchDepartmentDetails = async () => {
//       const companyId = localStorage.getItem('company_id');
//       const departmentName = localStorage.getItem('department_name');

//       if (!companyId || !departmentName) {
//         setError('Company ID or Department Name is missing.');
//         setLoading(false);
//         return;
//       }

//       try {
//         const token = JSON.parse(localStorage.getItem('authData'))?.token;
//         if (!token) throw new Error('Authentication token is missing.');

//         // API call to fetch department details
//         const apiUrl = `https://proximahr.onrender.com/departments/department-details?company_id=${companyId}&department_name=${departmentName}`;
//         const response = await fetch(apiUrl, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) throw new Error('Failed to fetch department details.');

//         const data = await response.json();
//         console.log('Department Details:', data); // Log the API response

//         setDepartmentDetails(data?.data || {});
//         setEmployees(data?.data?.employees || []); // Assuming employees is part of the response
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchDepartmentDetails();
//   }, []);

//   if (loading) {
//     return <div>Loading department details...</div>;
//   }

//   if (error) {
//     return <div style={{ color: 'red' }}>{error}</div>;
//   }

//   // Access the correct nested properties
//   const { hod_details, department_name, description } = departmentDetails;
//   const { first_name, last_name, email, phone_number, work_location } = hod_details || {};

//   return (
//     <div>
//       <div className="main-dashboard">
//         <Sidebar />
//         <div className="dashboard">
//         <div className="slide-one-1">
//             <EmployerNavbar />
//         </div>
//           <hr className="horizontal" />

//         <div className="dashboard-details">
//           <Link to="/department" className="back-link">
//             <FontAwesomeIcon icon="fa-solid fa-arrow-left" className="left-arrow" /><h5>Department: {department_name}</h5>
//           </Link>
//           <h6>{new Date().toDateString()}</h6>
//         </div>

//           {/* Department Info */}
//           <div className="dashboard-details-1">
//             <div className="number-of-employee">
//               <div className="div-1">
//                 <div className="div1-1">
//                   <img src={test} alt="Department Head" className="My-profile" />
//                 </div>
//                 <div className="div1-2"  style={{marginTop:"10px"}} >
//                   {/* Replaced "Department Head" text with the HOD's first and last name */}
//                   <h1>{first_name} {last_name}</h1>  {/* HOD's Name */}
//                   <h2>Department Head</h2>  {/* Optionally keeping the "Department Head" label */}
//                 </div>
//               </div>
//               <div className="div-2">
//                 <div className="btn">
//                   <button className="grey-btn">Deactivate Department</button>
//                   <Link to="/department/edit-department">
//                     <button><FontAwesomeIcon icon="fa-solid fa-pen-to-square" /> Edit Profile</button>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Employee Info Section */}
//           <div className="employee-info">
//             <div>
//               <h2><FontAwesomeIcon icon="fa-envelope" className="icon" />{email}</h2>
//               <h2><FontAwesomeIcon icon="fa-solid fa-phone" className="icon" />{phone_number}</h2>
//               <h2><FontAwesomeIcon icon="fa-solid fa-location-dot" className="icon" />{work_location}</h2>
//             </div>
//             <div className="employee-info-description">
//               <h1>Description</h1>
//               <p>{description || 'No description available'}</p>
//             </div>
//           </div>

//           {/* Employees in Department */}
//           <h3>Employees in Department</h3>
//           <div className="employee-department-section">
//             <div className="row-one">
//               <p>Full Name</p>
//               <p>Job Title</p>
//               <p>Employee ID</p>
//               <p>Status</p>
//               <p>Work Mode</p>
//               <p>Position</p>
//             </div>

//             <hr />

//             {employees.length === 0 ? (
//               <p>No employees in this department.</p>
//             ) : (
//               employees.map((employee, index) => (
//                 <div className="row-two" key={index}>
//                   <div>
//                     <img src={test} alt="Employee" className="My-profile" />
//                     <p>{employee.name}</p>
//                   </div>
//                   <p>{employee.job_title}</p>
//                   <p>{employee.employee_id}</p>
//                   <p className="active-btn">{employee.status}</p>
//                   <p>{employee.work_mode}</p>
//                   <p>{employee.position}</p>
//                 </div>
//               ))
//             )}
//           </div>

//           <button className="grey-btn-1">View more</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddEmployeeDepartment;

// import React, { useState, useEffect } from 'react';
// import Sidebar from '../components/Sidebar';
// import test from '../assets/test.png';
// import '../pages/AddEmployeeDepartment.css';
// import '../pages/profile.css';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fas } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Link } from 'react-router-dom';
// import EmployerNavbar from '../components/EmployerNavbar';

// library.add(fas);

// const AddEmployeeDepartment = () => {
//   const [departmentDetails, setDepartmentDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [employees, setEmployees] = useState([]);

//   useEffect(() => {
//     const fetchDepartmentDetails = async () => {
//         const companyId = localStorage.getItem('company_id');
//         const departmentId = localStorage.getItem('department_id'); // ✅ Ensure correct department ID retrieval

//         console.log("Company ID:", companyId); // Debugging
//         console.log("Department ID:", departmentId); // Debugging

//         if (!companyId || !departmentId) {
//             setError('Company ID or Department ID is missing.');
//             setLoading(false);
//             return;
//         }

//         try {
//             const token = JSON.parse(localStorage.getItem('authData'))?.token;
//             if (!token) throw new Error('Authentication token is missing.');

//             const apiUrl = `https://proximahr.onrender.com/departments/${departmentId}/department-details?company_id=${companyId}`;
//             console.log("Fetching from API:", apiUrl); // Debugging API request

//             const response = await fetch(apiUrl, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${token}`,
//                 },
//             });

//             if (!response.ok) throw new Error(`Failed to fetch department details: ${response.status} ${response.statusText}`);

//             const data = await response.json();
//             console.log("Department Details Response:", data); // ✅ Log department response

//             setDepartmentDetails(data?.data || {});
//             setLoading(false);

//             // ✅ Fetch employees after department details are available
//             fetchEmployees();
//         } catch (err) {
//             setError(err.message);
//             setLoading(false);
//         }
//     };

//     fetchDepartmentDetails();
// }, []);


//   if (loading) {
//     return <div>Loading department details...</div>;
//   }

//   if (error) {
//     return <div style={{ color: 'red' }}>{error}</div>;
//   }

//   // Access the correct nested properties
//   const { hod_details, department_name, description } = departmentDetails;
//   const { first_name, last_name, email, phone_number, work_location } = hod_details || {};

//   return (
//     <div>
//       <div className="main-dashboard">
//         <Sidebar />
//         <div className="dashboard">
//           <div className="slide-one-1">
//             <EmployerNavbar />
//           </div>
//           <hr className="horizontal" />
//           <div className="dashboard-details">
//             <Link to={'/department'}>
//               <h5>
//                 <FontAwesomeIcon icon="fa-solid fa-arrow-left" className="left-arrow" />
//                 Department: {department_name}
//               </h5>
//             </Link>
//             <h6>{new Date().toDateString()}</h6>
//           </div>

//           {/* Department Info */}
//           <div className="dashboard-details-1">
//             <div className="number-of-employee">
//               <div className="div-1">
//                 <div className="div1-1">
//                   <img src={test} alt="Department Head" className="My-profile" />
//                 </div>
//                 <div className="div1-2" style={{ marginTop: '10px' }}>
//                   <h2>{first_name} {last_name}</h2> {/* HOD's Name */}
//                 </div>
//               </div>
//               <div className="div-2">
//                 <div className="btn">
//                   <button className="grey-btn">Deactivate Department</button>
//                   <Link to="/department/edit-department">
//                     <button>
//                       <FontAwesomeIcon icon="fa-solid fa-pen-to-square" /> Edit Profile
//                     </button>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Employee Info Section */}
//           <div className="employee-info">
//             <div>
//               <h2><FontAwesomeIcon icon="fa-envelope" className="icon" />{email}</h2>
//               <h2><FontAwesomeIcon icon="fa-solid fa-phone" className="icon" />{phone_number}</h2>
//               <h2><FontAwesomeIcon icon="fa-solid fa-location-dot" className="icon" />{work_location}</h2>
//             </div>
//             <div className="employee-info-description">
//               <h1>Description</h1>
//               <p>{description || 'No description available'}</p>
//             </div>
//           </div>

//           {/* Employees in Department */}
//           <h3>Employees in Department</h3>
//           <div className="employee-department-section">
//               <div className="row-one">
//                   <p>Full Name</p>
//                   <p>Job Title</p>
//                   <p>Employee ID</p>
//                   <p>Status</p>
//                   <p>Work Mode</p>
//                   <p>Position</p>
//               </div>

//               <hr />

//               {employees.length === 0 ? (
//                   <p style={{ textAlign: "center", fontSize: "16px", color: "red", fontWeight: "bold" }}>
//                       No employees found
//                   </p>
//               ) : (
//                   employees.map((employee, index) => (
//                       <div className="row-two" key={index}>
//                           <div>
//                               <img src={test} alt="Employee" className="My-profile" />
//                               <p>{employee.name}</p>
//                           </div>
//                           <p>{employee.job_title}</p>
//                           <p>{employee.employee_id}</p>
//                           <p className="active-btn">{employee.employment_status}</p>
//                           <p>{employee.work_mode}</p>
//                           <p>{employee.position}</p>
//                       </div>
//                   ))
//               )}
//           </div>

//           <button className="grey-btn-1">View more</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddEmployeeDepartment;


// 
















import { React, useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import test from '../assets/test.png';
import '../pages/AddEmployeeDepartment.css';
import '../pages/profile.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import EmployerNavbar from '../components/EmployerNavbar';

library.add(fas);

const AddEmployeeDepartment = () => {
    const [departmentDetails, setDepartmentDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [employees, setEmployees] = useState([]);
    const [visibleEmployees, setVisibleEmployees] = useState([]); // Manage visible employees
    const [searchDepartment, setSearchDepartment] = useState(''); // Department filter state
    const [filteredDepartments, setFilteredDepartments] = useState([]); // Store department list

    const departmentId = localStorage.getItem('department_id'); // Get department_id from localStorage

    // Fetch Departments (to populate department filter)
    const fetchDepartments = async () => {
        try {
            const token = JSON.parse(localStorage.getItem('authData'))?.token;
            if (!token) throw new Error('Authentication token is missing.');

            const companyId = localStorage.getItem('company_id');
            const apiUrl = `https://proximahr.onrender.com/departments/?company_id=${companyId}`;
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error('Failed to fetch departments.');
            const data = await response.json();
            setFilteredDepartments(data.departments || []); // Save the departments
        } catch (err) {
            console.error('Error fetching departments:', err);
            setError(err.message);
        } finally {
            setLoading(false); // Set loading to false after data is fetched or an error occurs
        }
    };

    // Fetch Department Details and Employees Based on the Filtered Department
    const fetchEmployees = async (departmentId, departmentName) => {
        try {
            const token = JSON.parse(localStorage.getItem('authData'))?.token;
            if (!token) throw new Error('Authentication token is missing.');

            const companyId = localStorage.getItem('company_id');
            if (!companyId) throw new Error('Company ID is missing or invalid.');

            let q = '';
            if (departmentName) {
                q = `q=${departmentName}`;
            }

            const apiUrl = `https://proximahr.onrender.com/departments/${departmentId}/department-details?company_id=${companyId}&${q}`;

            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error(`Failed to fetch employees: ${response.status} ${response.statusText}`);

            const data = await response.json();

            console.log('API Response:', data); // Log the API response to check the structure

            // Check if the staff_members exists and is an array
            if (Array.isArray(data.data.staff_members)) {
                setEmployees(data.data.staff_members || []); // Store employees data
                setVisibleEmployees(data.data.staff_members.slice(0, 5)); // Initially show only 5 employees
                setDepartmentDetails(data.data); // Set department details
            } else {
                console.error('Error: staff_members is not an array:', data);
                setError('Employees data is not in the expected format.');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false); // Set loading to false after data is fetched or an error occurs
        }
    };

    // Trigger fetching of employees when department changes
    useEffect(() => {
        fetchDepartments(); // Fetch departments to populate the department dropdown
    }, []);

    // Modify the effect to handle the selection
    useEffect(() => {
        if (searchDepartment) {
            const departmentId = searchDepartment; // Get the selected department ID
            fetchEmployees(departmentId); // Fetch employees using the selected department ID
        }
    }, [searchDepartment]); // This effect will run when the department ID changes

    if (loading) {
        return <div>Loading department details...</div>;
    }

    if (error) {
        return <div style={{ color: 'red' }}>{error}</div>;
    }

    const handleViewMore = () => {
        setVisibleEmployees(employees.slice(0, visibleEmployees.length + 5)); // Expand employee list
    };

    // Extracting department details
    const { hod_details, department_name, description } = departmentDetails || {};
    const { first_name, last_name, email, phone_number, work_location } = hod_details || {};

    return (
        <div>
            <div className="main-dashboard">
                <Sidebar />
                <div className="dashboard">

                    <EmployerNavbar />

                    <hr className="horizontal" />
                    <div className="dashboard-details">
                        <Link to={'/department'}>
                            <h5>
                                <FontAwesomeIcon icon="fa-solid fa-arrow-left" className="left-arrow" />
                                Department: {department_name} {/* Display the selected department name */}
                            </h5>
                        </Link>
                        <h6>{new Date().toDateString()}</h6>
                    </div>

                    {/* Department Info */}
                    <div className="dashboard-details-1">
                        <div className="number-of-employee">
                            <div className="div-1">
                                <div className="div1-1">
                                    <img src={test} alt="Department Head" className="My-profile" />
                                </div>
                                <div className="div1-2" style={{ marginTop: '10px' }}>
                                    <h2>{first_name} {last_name}</h2>
                                    <h3><FontAwesomeIcon icon="fa-envelope" /> {email || "No email available"}</h3>
                                    <h3><FontAwesomeIcon icon="fa-phone" /> {phone_number || "No phone available"}</h3>
                                    <h3><FontAwesomeIcon icon="fa-map-marker-alt" /> {work_location || "No location available"}</h3>
                                </div>
                            </div>
                            <div className="div-2" style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
                                <div className="btn" style={{ width: '520px', display: 'flex', justifyContent: 'space-between' }}>
                                    <button className="grey-btn">Deactivate Department</button>
                                    <Link to="/department/edit-department">
                                        <button disabled={!departmentId}> {/* Disable if no department selected */}
                                            <FontAwesomeIcon icon="fa-solid fa-pen-to-square" /> Edit Profile
                                        </button>
                                    </Link>
                                </div>

                                <div className="employee-info-description">
                                    <h1>Description</h1>
                                    <p>{description || 'No description available'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Department Filter (Dropdown or Input) */}
                    <select   onChange={(e) => {
                            const selectedId = e.target.value;
                            setSearchDepartment(selectedId);
                            localStorage.setItem('department_id', selectedId); // ✅ Save to localStorage
                        }} style={{marginTop: '30px', width: '1000px', padding: '10px', borderRadius: '10px'}}>
                        <option value="">Select Department</option>
                        {filteredDepartments.map(department => (
                            <option key={department.id} value={department.id}>
                                {department.name} {/* Show department name and ID */}
                            </option>
                        ))}
                    </select>

                    {/* Employees in the selected department */}
                    <h3>Employees in {department_name || 'the selected department'}</h3>
                    <div className="employee-department-section">
                        <div className="row-one">
                            <p>Full Name</p>
                            <p>Job Title</p>
                            <p>Employee ID</p>
                            <p>Status</p>
                            <p>Work Mode</p>
                            <p>Position</p>
                        </div>

                        <hr />

                        {visibleEmployees.length === 0 ? (
                            <p style={{ textAlign: "center", fontSize: "16px", color: "red", fontWeight: "bold" }}>
                                No employees found
                            </p>
                        ) : (
                            visibleEmployees.map((employee, index) => (
                                <div className="row-two" key={index}>
                                    <div>
                                        <img src={test} alt="Employee" className="My-profile" />
                                        <p>{employee.name}</p>
                                    </div>
                                    <p>{employee.job_title}</p>
                                    <p>{employee.employee_id}</p>
                                    <p className="active-btn">{employee.employment_status}</p>
                                    <p>{employee.work_mode}</p>
                                    <p>{employee.position}</p>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="button-div">
                        <button onClick={handleViewMore}>View more</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddEmployeeDepartment;
