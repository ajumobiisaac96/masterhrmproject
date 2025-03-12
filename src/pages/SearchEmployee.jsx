// import {React} from 'react';
// import Sidebar from '../components/Sidebar'
// import test from '../assets/test.png'
// import '../pages/SearchEmployee.css'
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fas} from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {Link} from 'react-router-dom';

// library.add(fas);

// const SearchEmployee = () => {

//  return (
//         <div>
//           <div className="main-dashboard">
//             <Sidebar/>
//             <div className="dashboard">
//               <div className="slide-one-1">
//                 <div className="slide-one-1">
//                   <div className="name">
//                     <h5>Joseph Dooley</h5>
//                     <h6>Good Morning</h6>
//                   </div> 
//                 </div>
//                 <div className="slide-one-2-1">
//                   {/* <div className="search">
//                     <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" className="glass-icon" /><input type="text" placeholder='Search' />
//                   </div> */}
    
//                   <div className="notification">
//                     <FontAwesomeIcon icon="fa-solid fa-bell" />
//                     <h6>6</h6>
//                   </div>
    
//                   <div className="user-profile">
//                   <img src={test} alt="My profile" className ="My-profile" />
//                   </div>
//                 </div> 
//               </div>
    
//               <hr className="horizontal" />
    
//               <div className="dashboard-details">
//               <Link to={"/department/add-new-department"}><h5><FontAwesomeIcon icon="fa-solid fa-arrow-left" className = "left-arrow"></FontAwesomeIcon>Add Employees</h5></Link>
//                 <h6>24 Thursday October 2024</h6>
//               </div>
    

//               <div className="number-of-employee">
//                 <div className="new-div-1">
//                     <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" className="glass-icon" /><input type="text" placeholder='Search Department' />
//                 </div>
//                 <div className="btn">
//                       <Link to={"/add-employee-to-department"}><button><FontAwesomeIcon icon="fa-solid fa-plus" />Add To Department</button></Link>
//                   </div>
//               </div>

//               <div className="employee-department-section">
  
//                     <div className="row-one">
//                         <p>Full Name</p>
//                         <p>Job Title</p>
//                         <p>Employee ID</p>
//                     </div>

//                   <hr />

//                   <div className="row-two">
//                       <div>
//                           <img src={test} alt="My profile" className="My-profile" /> 
//                           <p>Sarah Johnson</p>
//                       </div>
//                       <p>Software - Engineer</p>
//                       <p>0876</p>

//                   </div>

//                   <hr />

//                   <div className="row-two">
//                       <div>
//                           <img src={test} alt="My profile" className="My-profile" /> 
//                           <p>Sarah Johnson</p>
//                       </div>
//                       <p>Software - Engineer</p>
//                       <p>0876</p>

//                   </div>

//                   <hr />

//                   <div className="row-two">
//                       <div>
//                           <img src={test} alt="My profile" className="My-profile" /> 
//                           <p>Sarah Johnson</p>
//                       </div>
//                       <p>Software - Engineer</p>
//                       <p>0876</p>

//                   </div>

//                   <hr />

//                   <div className="row-two">
//                       <div>
//                           <img src={test} alt="My profile" className="My-profile" /> 
//                           <p>Sarah Johnson</p>
//                       </div>
//                       <p>Software - Engineer</p>
//                       <p>0876</p>

//                   </div>

//                   <hr />

//                   <div className="row-two">
//                       <div>
//                           <img src={test} alt="My profile" className="My-profile" /> 
//                           <p>Sarah Johnson</p>
//                       </div>
//                       <p>Software - Engineer</p>
//                       <p>0876</p>

//                   </div>

//                   <hr />

//                   <div className="row-two">
//                       <div>
//                           <img src={test} alt="My profile" className="My-profile" /> 
//                           <p>Sarah Johnson</p>
//                       </div>
//                       <p>Software - Engineer</p>
//                       <p>0876</p>

//                   </div>

//                   <hr />

//                   <div className="row-two">
//                       <div>
//                           <img src={test} alt="My profile" className="My-profile" /> 
//                           <p>Sarah Johnson</p>
//                       </div>
//                       <p>Software - Engineer</p>
//                       <p>0876</p>

//                   </div>

//                   <hr />

//                   <div className="row-two">
//                       <div>
//                           <img src={test} alt="My profile" className="My-profile" /> 
//                           <p>Sarah Johnson</p>
//                       </div>
//                       <p>Software - Engineer</p>
//                       <p>0876</p>

//                   </div>

//                 </div>

//               <div className="showing-entries">
//                 <div className="number-div">
//                     <p>showing <span>1</span>to <span>10</span>of <span>40 entries</span></p>
//                 </div>
//                 <div className="pagination">
//                   <p className='active-1'>01</p>
//                   <p>02</p>
//                   <p>03</p>
//                   <p>04</p>
//                   <p>05</p>
//                   <p>06</p>
//                   <p>07</p>
//                 </div>
//               </div>

    
//             </div>
    
//           </div>
//         </div>
//       )

// }

// export default SearchEmployee


// import React, { useState, useEffect } from 'react';
// import Sidebar from '../components/Sidebar';
// import test from '../assets/test.png';
// import '../pages/SearchEmployee.css';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fas } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Link } from 'react-router-dom';

// library.add(fas);

// const SearchEmployee = () => {
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const pageSize = 10;

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       setLoading(true);
//       setError('');
//       try {
//         const companyId = localStorage.getItem("company_id");
//         if (!companyId) throw new Error("Company ID is missing.");

//         const storedAuthData = localStorage.getItem("authData");
//         if (!storedAuthData) throw new Error("Authentication data is missing.");

//         const authData = JSON.parse(storedAuthData);
//         const token = authData?.token;
//         if (!token) throw new Error("Authentication token is missing.");

//         const apiUrl = `https://proximahr.onrender.com/employee-management/all-employees?company_id=${companyId}&page=${currentPage}&page_size=${pageSize}&name=${searchTerm}`;
//         const response = await fetch(apiUrl, {
//           method: "GET",
//           headers: {
//             "Authorization": `Bearer ${token}`,
//             "Content-Type": "application/json"
//           }
//         });

//         const result = await response.json();
//         if (!response.ok) {
//           throw new Error(result.detail || `Error: ${response.status}`);
//         }

//         setEmployees(result.data || []);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEmployees();
//   }, [currentPage, searchTerm]);

//   const handleEmployeeSelect = (employee) => {
//     localStorage.setItem("selected_employee_id", employee.employee_id);
//   };

//   return (
//     <div>
//       <div className="main-dashboard">
//         <Sidebar />
//         <div className="dashboard">
//           <div className="slide-one-1">
//             <div className="name">
//               <h5>Joseph Dooley</h5>
//               <h6>Good Morning</h6>
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
//           <div className="dashboard-details">
//             <Link to={"/department/add-new-department"}>
//               <h5>
//                 <FontAwesomeIcon icon="fa-solid fa-arrow-left" className="left-arrow" /> Add Employees
//               </h5>
//             </Link>
//             <h6>{new Date().toDateString()}</h6>
//           </div>

//           <div className="number-of-employee">
//             <div className="new-div-1">
//               <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" className="glass-icon" />
//               <input 
//                 type="text" 
//                 placeholder='Search Employee' 
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//             <div className="btn">
//               <Link to={"/add-employee-to-department"}>
//                 <button><FontAwesomeIcon icon="fa-solid fa-plus" /> Add To Department</button>
//               </Link>
//             </div>
//           </div>

//           {loading ? (
//             <p>Loading employees...</p>
//           ) : error ? (
//             <p style={{ color: "red" }}>Error: {error}</p>
//           ) : (
//             <div className="employee-department-section">
//               <div className="row-one">
//                 <p>Full Name</p>
//                 <p>Job Title</p>
//                 <p>Employee ID</p>
//               </div>
//               <hr />
//               {employees.length > 0 ? employees.map((employee) => (
//                 <React.Fragment key={employee.employee_id}>
//                   <div className="row-two" onClick={() => handleEmployeeSelect(employee)}>
//                     <div>
//                       <img src={employee.profile_image || test} alt="Profile" className="My-profile" />
//                       <p>{employee.name}</p>
//                     </div>
//                     <p>{employee.job_title || 'Not Assigned'}</p>
//                     <p>{employee.employee_id}</p>
//                   </div>
//                   <hr />
//                 </React.Fragment>
//               )) : <p>No employees found</p>}
//             </div>
//           )}

//           <div className="showing-entries">
//             <div className="number-div">
//               <p>Showing <span>{(currentPage - 1) * pageSize + 1}</span> to <span>{Math.min(currentPage * pageSize, employees.length)}</span> of <span>{employees.length} entries</span></p>
//             </div>
//             <div className="pagination">
//               <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Prev</button>
//               <span>Page {currentPage}</span>
//               <button onClick={() => setCurrentPage(prev => prev + 1)}>Next</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SearchEmployee;

import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import test from '../assets/test.png';
import '../pages/SearchEmployee.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import EmployerNavbar from '../components/EmployerNavbar';

library.add(fas);

const SearchEmployee = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const pageSize = 10;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployees = async () => {
            setLoading(true);
            setError('');
            try {
                const companyId = localStorage.getItem("company_id");
                if (!companyId) throw new Error("Company ID is missing.");

                const storedAuthData = localStorage.getItem("authData");
                if (!storedAuthData) throw new Error("Authentication data is missing.");

                const authData = JSON.parse(storedAuthData);
                const token = authData?.token;
                if (!token) throw new Error("Authentication token is missing.");

                const apiUrl = `https://proximahr.onrender.com/employee-management/all-employees?company_id=${companyId}&page=${currentPage}&page_size=${pageSize}&name=${searchTerm}`;
                const response = await fetch(apiUrl, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                const result = await response.json();
                if (!response.ok) {
                    throw new Error(result.detail || `Error: ${response.status}`);
                }

                setEmployees(result.data || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, [currentPage, searchTerm]);

    const toggleEmployeeSelection = (employee) => {
        setSelectedEmployees(prev =>
            prev.some(emp => emp.employee_id === employee.employee_id)
                ? prev.filter(emp => emp.employee_id !== employee.employee_id)
                : [...prev, employee]
        );
    };

    const handleAddToDepartment = () => {
        localStorage.setItem("selectedEmployees", JSON.stringify(selectedEmployees));
        navigate("/department/add-new-department");
    };

    return (
        <div>
            <div className="main-dashboard">
                <Sidebar />
                <div className="dashboard">
                    <EmployerNavbar />
                    <hr className="horizontal" />
                    <div className="dashboard-details" style={{ marginBottom: "1rem" }}>
                        <Link to={"/department/add-new-department"}>
                            <h5>
                                <FontAwesomeIcon icon="fa-solid fa-arrow-left" className="left-arrow" /> Add Employees
                            </h5>
                        </Link>
                        <h6>{new Date().toDateString()}</h6>
                    </div>

                    <div className="number-of-employee">
                        <div className="new-div-1">
                            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" className="glass-icon" />
                            <input 
                                type="text" 
                                placeholder='Search Employee' 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="btn">

                                <button onClick={handleAddToDepartment} disabled={selectedEmployees.length === 0}><FontAwesomeIcon icon="fa-solid fa-plus" /> Add To Department</button>

                        </div>
                    </div>

                    {loading ? (
                        <p>Loading employees...</p>
                    ) : error ? (
                        <p style={{ color: "red" }}>Error: {error}</p>
                    ) : (
                        <div className="employee-department-section">
                            <div className="row-one">
                                <p>Select</p>
                                <p>Full Name</p>
                                <p>Job Title</p>
                                <p>Employee ID</p>
                            </div>
                            <hr />
                            {employees.length > 0 ? employees.map((employee) => (
                                <React.Fragment key={employee.employee_id}>
                                    <div className="row-two">
                                        <input 
                                            type="checkbox" 
                                            checked={selectedEmployees.some(emp => emp.employee_id === employee.employee_id)} 
                                            onChange={() => toggleEmployeeSelection(employee)} 
                                        />
                                        <div>
                                            <img src={employee.profile_image || test} alt="Profile" className="My-profile" />
                                            <p>{employee.name}</p>
                                        </div>
                                        <p>{employee.job_title || 'Not Assigned'}</p>
                                        <p>{employee.employee_id}</p>
                                    </div>
                                    <hr />
                                </React.Fragment>
                            )) : <p>No employees found</p>}
                        </div>
                    )}

                    <div className="showing-entries">
                        <div className="number-div">
                            <p>Showing <span>{(currentPage - 1) * pageSize + 1}</span> to <span>{Math.min(currentPage * pageSize, employees.length)}</span> of <span>{employees.length} entries</span></p>
                        </div>
                        <div className="pagination">
                            <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Prev</button>
                            <span>Page {currentPage}</span>
                            <button onClick={() => setCurrentPage(prev => prev + 1)}>Next</button>
                        </div>
                    </div>

                    <div className="department-button">
                        <button onClick={handleAddToDepartment} disabled={selectedEmployees.length === 0}>
                            Add Selected Employees
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchEmployee;
