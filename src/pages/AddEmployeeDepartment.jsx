// import { React, useState, useEffect } from 'react';
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
//     const [departmentDetails, setDepartmentDetails] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [employees, setEmployees] = useState([]);
//     const [visibleEmployees, setVisibleEmployees] = useState([]); // Manage visible employees
//     const [searchDepartment, setSearchDepartment] = useState(''); // Department filter state
//     const [filteredDepartments, setFilteredDepartments] = useState([]); // Store department list

//     const departmentId = localStorage.getItem('department_id'); // Get department_id from localStorage

//     // Fetch Departments (to populate department filter)
//     const fetchDepartments = async () => {
//         try {
//             const token = JSON.parse(localStorage.getItem('authData'))?.access_token;
//             if (!token) throw new Error('Authentication token is missing.');

//             const companyId = localStorage.getItem('company_id');
//             const apiUrl = `https://proximahr.onrender.com/api/v2/departments/`;
//             const response = await fetch(apiUrl, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${token}`,
//                 },
//             });

//             if (!response.ok) throw new Error('Failed to fetch departments.');
//             const data = await response.json();
//             setFilteredDepartments(data.departments || []); // Save the departments
//         } catch (err) {
//             console.error('Error fetching departments:', err);
//             setError(err.message);
//         } finally {
//             setLoading(false); // Set loading to false after data is fetched or an error occurs
//         }
//     };

//     // Fetch Department Details and Employees Based on the Filtered Department
//     const fetchEmployees = async (departmentId, departmentName) => {
//         try {
//             const token = JSON.parse(localStorage.getItem('authData'))?.access_token;
//             if (!token) throw new Error('Authentication token is missing.');

//             // const companyId = localStorage.getItem('company_id');
//             // if (!companyId) throw new Error('Company ID is missing or invalid.');

//             let q = '';
//             if (departmentName) {
//                 q = `q=${departmentName}`;
//             }

//             const apiUrl = `https://proximahr.onrender.com/api/v2/departments/${departmentId}/department-details?${q}`;

//             const response = await fetch(apiUrl, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${token}`,
//                 },
//             });

//             if (!response.ok) throw new Error(`Failed to fetch employees: ${response.status} ${response.statusText}`);

//             const data = await response.json();

//             console.log('API Response:', data); // Log the API response to check the structure

//             // Check if the staff_members exists and is an array
//             if (Array.isArray(data.data.staff_members)) {
//                 setEmployees(data.data.staff_members || []); // Store employees data
//                 setVisibleEmployees(data.data.staff_members.slice(0, 5)); // Initially show only 5 employees
//                 setDepartmentDetails(data.data); // Set department details
//             } else {
//                 console.error('Error: staff_members is not an array:', data);
//                 setError('Employees data is not in the expected format.');
//             }
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false); // Set loading to false after data is fetched or an error occurs
//         }
//     };

//     // Trigger fetching of employees when department changes
//     useEffect(() => {
//         fetchDepartments(); // Fetch departments to populate the department dropdown
//     }, []);

//     // Modify the effect to handle the selection
//     useEffect(() => {
//         if (searchDepartment) {
//             const departmentId = searchDepartment; // Get the selected department ID
//             fetchEmployees(departmentId); // Fetch employees using the selected department ID
//         }
//     }, [searchDepartment]); // This effect will run when the department ID changes

//     if (loading) {
//         return <div>Loading department details...</div>;
//     }

//     if (error) {
//         return <div style={{ color: 'red' }}>{error}</div>;
//     }

//     const handleViewMore = () => {
//         setVisibleEmployees(employees.slice(0, visibleEmployees.length + 5)); // Expand employee list
//     };

//     // Extracting department details
//     const { hod_details, department_name, description } = departmentDetails || {};
//     const { first_name, last_name, email, phone_number, work_location } = hod_details || {};

//     return (
//         <div>
//             <div className="main-dashboard">
//                 <Sidebar />
//                 <div className="dashboard">

//                     <EmployerNavbar />

//                     <hr className="horizontal" />
//                     <div className="dashboard-details">
//                         <Link to={'/department'}>
//                             <h5>
//                                 <FontAwesomeIcon icon="fa-solid fa-arrow-left" className="left-arrow" />
//                                 Department: {department_name} {/* Display the selected department name */}
//                             </h5>
//                         </Link>
//                         <h6>{new Date().toDateString()}</h6>
//                     </div>

//                     {/* Department Info */}
//                     <div className="dashboard-details-1">
//                         <div className="number-of-employee">
//                             <div className="div-1">
//                                 <div className="div1-1">
//                                     <img src={test} alt="Department Head" className="My-profile" />
//                                 </div>
//                                 <div className="div1-2" style={{ marginTop: '10px' }}>
//                                     <h2>{first_name} {last_name}</h2>
//                                     <h3><FontAwesomeIcon icon="fa-envelope" /> {email || "No email available"}</h3>
//                                     <h3><FontAwesomeIcon icon="fa-phone" /> {phone_number || "No phone available"}</h3>
//                                     <h3><FontAwesomeIcon icon="fa-map-marker-alt" /> {work_location || "No location available"}</h3>
//                                 </div>
//                             </div>
//                             <div className="div-2" style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
//                                 <div className="btn" style={{ width: '520px', display: 'flex', justifyContent: 'space-between' }}>
//                                     <button className="grey-btn">Deactivate Department</button>
//                                     <Link to="/department/edit-department">
//                                         <button disabled={!departmentId} style={{border:'none', backgroundColor:'#007BFF', cursor:'pointer', color:'white'}}> {/* Disable if no department selected */}
//                                             <FontAwesomeIcon icon="fa-solid fa-pen-to-square" /> Edit Profile
//                                         </button>
//                                     </Link>
//                                 </div>

//                                 <div className="employee-info-description">
//                                     <h1>Description</h1>
//                                     <h5 style={{fontSize:'18px', fontWeight:'400'}}>{description || 'No description available'}</h5>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Department Filter (Dropdown or Input) */}
//                     <select   onChange={(e) => {
//                             const selectedId = e.target.value;
//                             setSearchDepartment(selectedId);
//                             localStorage.setItem('department_id', selectedId); // ✅ Save to localStorage
//                         }} style={{marginTop: '30px', width: '1000px', padding: '10px', borderRadius: '10px'}}>
//                         <option value="">Select Department</option>
//                         {filteredDepartments.map(department => (
//                             <option key={department.id} value={department.id}>
//                                 {department.name} {/* Show department name and ID */}
//                             </option>
//                         ))}
//                     </select>

//                     {/* Employees in the selected department */}
//                     <h3>Employees in {department_name || 'the selected department'}</h3>
//                     <div className="employee-department-section">
//                         <div className="row-one">
//                             <p>Full Name</p>
//                             <p>Job Title</p>
//                             <p>Employee ID</p>
//                             <p>Status</p>
//                             <p>Work Mode</p>
//                             <p>Position</p>
//                         </div>

//                         <hr />

//                         {visibleEmployees.length === 0 ? (
//                             <p style={{ textAlign: "center", fontSize: "16px", color: "red", fontWeight: "bold" }}>
//                                 No employees found
//                             </p>
//                         ) : (
//                             visibleEmployees.map((employee, index) => (
//                                 <div className="row-two" key={index}>
//                                     <div>
//                                         <img src={test} alt="Employee" className="My-profile" />
//                                         <p>{employee.name}</p>
//                                     </div>
//                                     <p>{employee.job_title}</p>
//                                     <p>{employee.employee_id}</p>
//                                     <p className="active-btn">{employee.employment_status}</p>
//                                     <p>{employee.work_mode}</p>
//                                     <p>{employee.position}</p>
//                                 </div>
//                             ))
//                         )}
//                     </div>

//                     <div className="button-div">
//                         <button onClick={handleViewMore}>View more</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AddEmployeeDepartment;






















import { React, useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import test from '../assets/test.png';
import '../pages/AddEmployeeDepartment.css';
import '../pages/profile.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams, Link } from 'react-router-dom';
import EmployerNavbar from '../components/EmployerNavbar';

library.add(fas);

const AddEmployeeDepartment = () => {
    const { departmentId } = useParams(); // Get departmentId from the URL
    const [departmentDetails, setDepartmentDetails] = useState(null);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [visibleEmployees, setVisibleEmployees] = useState([]);

    useEffect(() => {
        const fetchDepartmentDetails = async () => {
            try {
                const token = JSON.parse(localStorage.getItem('authData'))?.access_token;
                if (!token) throw new Error('Authentication token is missing.');

                const apiUrl = `https://proximahr.onrender.com/api/v2/departments/${departmentId}/department-details`;

                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) throw new Error('Failed to fetch department details.');

                const data = await response.json();
                setDepartmentDetails(data.data);  // Save department details
                setEmployees(data.data.staff_members || []);
                setVisibleEmployees(data.data.staff_members.slice(0, 5)); // Show only the first 5 employees initially
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDepartmentDetails(); // Call the fetch function when the component mounts
    }, [departmentId]); // Re-run when the departmentId changes

    if (loading) return <div>Loading department details...</div>;
    if (error) return <div>{error}</div>;

    // Log the department name in the render method to check if it's available
    console.log('Department Name:', departmentDetails?.department_name);  // Updated to use department_name

    return (
        <div>
            <div className="main-dashboard">
                <Sidebar />
                <div className="dashboard">
                    <EmployerNavbar />
                    <hr className="horizontal" />
                    <div className="dashboard-details">
                        <Link to="/department">
                            <h5>
                                <FontAwesomeIcon icon="fa-solid fa-arrow-left" className="left-arrow" />
                                Department: {departmentDetails?.department_name} {/* Updated to display department_name */}
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
                                    <h2>{departmentDetails?.hod_details?.first_name} {departmentDetails?.hod_details?.last_name}</h2>
                                    <h3><FontAwesomeIcon icon="fa-envelope" /> {departmentDetails?.hod_details?.email || "No email available"}</h3>
                                    <h3><FontAwesomeIcon icon="fa-phone" /> {departmentDetails?.hod_details?.phone_number || "No phone available"}</h3>
                                    <h3><FontAwesomeIcon icon="fa-map-marker-alt" /> {departmentDetails?.hod_details?.work_location || "No location available"}</h3>
                                </div>
                            </div>
                            <div className="div-2" style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
                                <div className="btn" style={{ width: '520px', display: 'flex', justifyContent: 'space-between' }}>
                                    <button className="grey-btn">Deactivate Department</button>
                                    <Link to={`/department/edit-department/${departmentId}`}>
                                        <button disabled={!departmentId} style={{border:'none', backgroundColor:'#007BFF', cursor:'pointer', color:'white'}}>
                                            <FontAwesomeIcon icon="fa-solid fa-pen-to-square" /> Edit Profile
                                        </button>
                                    </Link>
                                </div>

                                <div className="employee-info-description">
                                    <h1>Description</h1>
                                    <h5 style={{fontSize:'18px', fontWeight:'400'}}>{departmentDetails?.description || 'No description available'}</h5>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Employees in the selected department */}
                    <h3>Employees in {departmentDetails?.department_name || 'the selected department'}</h3>
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
                        <button onClick={() => setVisibleEmployees(employees.slice(0, visibleEmployees.length + 5))}>View more</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddEmployeeDepartment;
