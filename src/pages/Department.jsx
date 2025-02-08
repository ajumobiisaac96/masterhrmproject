// import {React, useState} from 'react';
// import Sidebar from '../components/Sidebar'
// import test from '../assets/test.png'
// import '../pages/Department.css'
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fas} from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {Link} from 'react-router-dom';
// import EmployerNavbar from '../components/EmployerNavbar'


// library.add(fas);

// const Department = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     return (
//         <div>
//           <div className="main-dashboard">
//             <Sidebar/>
//             <div className="dashboard">
//               <div className="slide-one-1">
//                 <EmployerNavbar/>
//             </div>
    
//               <hr className="horizontal" />
    
//               <div className="dashboard-details">
//                 <h5>Department</h5>
//                 <h6>24 Thursday October 2024</h6>
//               </div>
    

//               <div className="number-of-employee">
//                 <div className="new-div-1">
//                     <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" className="glass-icon" /><input type="text" placeholder='Search Department' />
//                 </div>
//                 <div className="div-2">
//                   <div className="btn-1">
//                   <button onClick={() => setIsOpen(!isOpen)}>
//                     <FontAwesomeIcon icon="fa-solid fa-filter" /> filter
//                   </button>
//                 </div>
//                 {isOpen && (
//                   <div className = "dropdownstyle" >
//                     <p>All</p>
//                     <p>Engineering</p>
//                     <p>Design</p>
//                     <p>Marketing</p>
//                     <p>sales</p>
//                     <p>Data science</p>
//                     <p>operations</p>
//                   </div>
//                 )}
//                   <div className="btn">
//                       <Link to={"/department/add-new-department"}><button><FontAwesomeIcon icon="fa-solid fa-plus" />Add New Department</button></Link>
//                   </div>
//                 </div>
//               </div>

    
//               <div className="dashboard-details-2-1-1">
//                 <div className="card-3">
//                 <div className="one-div">
//                     <div><h1>Engineering</h1></div>
//                     <div className = "special-div">
//                         <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
//                         <FontAwesomeIcon icon="fa-solid fa-trash-can" />
//                     </div>
//                 </div>
//                 <hr className = "new-hr"/>
//                 <div className="two-div">
//                     <div>
//                         <img src={test} alt="My profile" className ="My-profile" />
//                     </div>
//                     <div>
//                         <p>Department Head</p>
//                         <h2>Sarah Johnson</h2>
//                     </div>
//                 </div>
//                 <div className="three-div">
//                     <div  className = "new-div" >
//                         <div><FontAwesomeIcon icon="fa-solid fa-users" className = "new-div-icon" /></div>
//                         <div  >
//                             <p>Team Members</p>
//                             <h2>65</h2>
//                         </div>
//                     </div>
//                     <div className = "new-div-2">
//                         <div><FontAwesomeIcon icon="fa-solid fa-clock" className = "new-div-icon" /></div>
//                         <div>
//                             <p>Attendance</p>
//                             <h2>98%</h2>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="four-div">
//                   <div className="div-1-1">
//                     <img src={test} alt="My profile" className ="My-four-div-profile" />
//                     <h2>60+</h2>
//                   </div>
//                   <div className="div-2-2">
//                     <p>Description</p>
//                     <h1>Develops and maintains technical systems and software</h1>
//                   </div>
//                 </div>
//                 <div className="five-div">
//                   <Link to={"/department/add-employee-department"}><button>view Department</button></Link>
//                 </div>
//                 </div>


//                 <div className="card-3">
//                 <div className="one-div">
//                     <div><h1>Engineering</h1></div>
//                     <div className = "special-div">
//                         <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
//                         <FontAwesomeIcon icon="fa-solid fa-trash-can" />
//                     </div>
//                 </div>
//                 <hr className = "new-hr"/>
//                 <div className="two-div">
//                     <div>
//                         <img src={test} alt="My profile" className ="My-profile" />
//                     </div>
//                     <div>
//                         <p>Department Head</p>
//                         <h2>Sarah Johnson</h2>
//                     </div>
//                 </div>
//                 <div className="three-div">
//                     <div  className = "new-div" >
//                         <div><FontAwesomeIcon icon="fa-solid fa-users" className = "new-div-icon" /></div>
//                         <div  >
//                             <p>Team Members</p>
//                             <h2>65</h2>
//                         </div>
//                     </div>
//                     <div className = "new-div-2">
//                         <div><FontAwesomeIcon icon="fa-solid fa-clock" className = "new-div-icon" /></div>
//                         <div>
//                             <p>Attendance</p>
//                             <h2>98%</h2>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="four-div">
//                   <div className="div-1-1">
//                     <img src={test} alt="My profile" className ="My-four-div-profile" />
//                     <h2>60+</h2>
//                   </div>
//                   <div className="div-2-2">
//                     <p>Description</p>
//                     <h1>Develops and maintains technical systems and software</h1>
//                   </div>
//                 </div>
//                 <div className="five-div">
//                 <Link to={"/department/add-employee-department"}><button className='general-btn' >view Department</button></Link>
//                 </div>
//                 </div>

//               </div>

//               <div className="dashboard-details-2-1-1">
//                 <div className="card-3">
//                 <div className="one-div">
//                     <div><h1>Engineering</h1></div>
//                     <div className = "special-div">
//                         <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
//                         <FontAwesomeIcon icon="fa-solid fa-trash-can" />
//                     </div>
//                 </div>
//                 <hr className = "new-hr"/>
//                 <div className="two-div">
//                     <div>
//                         <img src={test} alt="My profile" className ="My-profile" />
//                     </div>
//                     <div>
//                         <p>Department Head</p>
//                         <h2>Sarah Johnson</h2>
//                     </div>
//                 </div>
//                 <div className="three-div">
//                     <div  className = "new-div" >
//                         <div><FontAwesomeIcon icon="fa-solid fa-users" className = "new-div-icon" /></div>
//                         <div  >
//                             <p>Team Members</p>
//                             <h2>65</h2>
//                         </div>
//                     </div>
//                     <div className = "new-div-2">
//                         <div><FontAwesomeIcon icon="fa-solid fa-clock" className = "new-div-icon" /></div>
//                         <div>
//                             <p>Attendance</p>
//                             <h2>98%</h2>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="four-div">
//                   <div className="div-1-1">
//                     <img src={test} alt="My profile" className ="My-four-div-profile" />
//                     <h2>60+</h2>
//                   </div>
//                   <div className="div-2-2">
//                     <p>Description</p>
//                     <h1>Develops and maintains technical systems and software</h1>
//                   </div>
//                 </div>
//                 <div className="five-div">
//                 <Link to={"/department/add-employee-department"}><button>view Department</button></Link>
//                 </div>
//                 </div>


//                 <div className="card-3">
//                 <div className="one-div">
//                     <div><h1>Engineering</h1></div>
//                     <div className = "special-div">
//                         <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
//                         <FontAwesomeIcon icon="fa-solid fa-trash-can" />
//                     </div>
//                 </div>
//                 <hr className = "new-hr"/>
//                 <div className="two-div">
//                     <div>
//                         <img src={test} alt="My profile" className ="My-profile" />
//                     </div>
//                     <div>
//                         <p>Department Head</p>
//                         <h2>Sarah Johnson</h2>
//                     </div>
//                 </div>
//                 <div className="three-div">
//                     <div  className = "new-div" >
//                         <div><FontAwesomeIcon icon="fa-solid fa-users" className = "new-div-icon" /></div>
//                         <div  >
//                             <p>Team Members</p>
//                             <h2>65</h2>
//                         </div>
//                     </div>
//                     <div className = "new-div-2">
//                         <div><FontAwesomeIcon icon="fa-solid fa-clock" className = "new-div-icon" /></div>
//                         <div>
//                             <p>Attendance</p>
//                             <h2>98%</h2>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="four-div">
//                   <div className="div-1-1">
//                     <img src={test} alt="My profile" className ="My-four-div-profile" />
//                     <h2>60+</h2>
//                   </div>
//                   <div className="div-2-2">
//                     <p>Description</p>
//                     <h1>Develops and maintains technical systems and software</h1>
//                   </div>
//                 </div>
//                 <div className="five-div">
//                 <Link to={"/department/add-employee-department"}><button>view Department</button></Link>
//                 </div>
//                 </div>

//               </div>

//               <div className="dashboard-details-2-1-1">
//                 <div className="card-3">
//                 <div className="one-div">
//                     <div><h1>Engineering</h1></div>
//                     <div className = "special-div">
//                         <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
//                         <FontAwesomeIcon icon="fa-solid fa-trash-can" />
//                     </div>
//                 </div>
//                 <hr className = "new-hr"/>
//                 <div className="two-div">
//                     <div>
//                         <img src={test} alt="My profile" className ="My-profile" />
//                     </div>
//                     <div>
//                         <p>Department Head</p>
//                         <h2>Sarah Johnson</h2>
//                     </div>
//                 </div>
//                 <div className="three-div">
//                     <div  className = "new-div" >
//                         <div><FontAwesomeIcon icon="fa-solid fa-users" className = "new-div-icon" /></div>
//                         <div  >
//                             <p>Team Members</p>
//                             <h2>65</h2>
//                         </div>
//                     </div>
//                     <div className = "new-div-2">
//                         <div><FontAwesomeIcon icon="fa-solid fa-clock" className = "new-div-icon" /></div>
//                         <div>
//                             <p>Attendance</p>
//                             <h2>98%</h2>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="four-div">
//                   <div className="div-1-1">
//                     <img src={test} alt="My profile" className ="My-four-div-profile" />
//                     <h2>60+</h2>
//                   </div>
//                   <div className="div-2-2">
//                     <p>Description</p>
//                     <h1>Develops and maintains technical systems and software</h1>
//                   </div>
//                 </div>
//                 <div className="five-div">
//                 <Link to={"/department/add-employee-department"}><button>view Department</button></Link>
//                 </div>
//                 </div>


//                 <div className="card-3">
//                 <div className="one-div">
//                     <div><h1>Engineering</h1></div>
//                     <div className = "special-div">
//                         <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
//                         <FontAwesomeIcon icon="fa-solid fa-trash-can" />
//                     </div>
//                 </div>
//                 <hr className = "new-hr"/>
//                 <div className="two-div">
//                     <div>
//                         <img src={test} alt="My profile" className ="My-profile" />
//                     </div>
//                     <div>
//                         <p>Department Head</p>
//                         <h2>Sarah Johnson</h2>
//                     </div>
//                 </div>
//                 <div className="three-div">
//                     <div  className = "new-div" >
//                         <div><FontAwesomeIcon icon="fa-solid fa-users" className = "new-div-icon" /></div>
//                         <div  >
//                             <p>Team Members</p>
//                             <h2>65</h2>
//                         </div>
//                     </div>
//                     <div className = "new-div-2">
//                         <div><FontAwesomeIcon icon="fa-solid fa-clock" className = "new-div-icon" /></div>
//                         <div>
//                             <p>Attendance</p>
//                             <h2>98%</h2>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="four-div">
//                   <div className="div-1-1">
//                     <img src={test} alt="My profile" className ="My-four-div-profile" />
//                     <h2>60+</h2>
//                   </div>
//                   <div className="div-2-2">
//                     <p>Description</p>
//                     <h1>Develops and maintains technical systems and software</h1>
//                   </div>
//                 </div>
//                 <div className="five-div">
//                 <Link to={"/department/add-employee-department"}><button>view Department</button></Link>
//                 </div>
//                 </div>

//               </div>
//               <div className="dashboard-details-2-1-1">
//                 <div className="card-3">
//                 <div className="one-div">
//                     <div><h1>Engineering</h1></div>
//                     <div className = "special-div">
//                         <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
//                         <FontAwesomeIcon icon="fa-solid fa-trash-can" />
//                     </div>
//                 </div>
//                 <hr className = "new-hr"/>
//                 <div className="two-div">
//                     <div>
//                         <img src={test} alt="My profile" className ="My-profile" />
//                     </div>
//                     <div>
//                         <p>Department Head</p>
//                         <h2>Sarah Johnson</h2>
//                     </div>
//                 </div>
//                 <div className="three-div">
//                     <div  className = "new-div" >
//                         <div><FontAwesomeIcon icon="fa-solid fa-users" className = "new-div-icon" /></div>
//                         <div  >
//                             <p>Team Members</p>
//                             <h2>65</h2>
//                         </div>
//                     </div>
//                     <div className = "new-div-2">
//                         <div><FontAwesomeIcon icon="fa-solid fa-clock" className = "new-div-icon" /></div>
//                         <div>
//                             <p>Attendance</p>
//                             <h2>98%</h2>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="four-div">
//                   <div className="div-1-1">
//                     <img src={test} alt="My profile" className ="My-four-div-profile" />
//                     <h2>60+</h2>
//                   </div>
//                   <div className="div-2-2">
//                     <p>Description</p>
//                     <h1>Develops and maintains technical systems and software</h1>
//                   </div>
//                 </div>
//                 <div className="five-div">
//                 <Link to={"/department/add-employee-department"}><button>view Department</button></Link>
//                 </div>
//                 </div>


//                 <div className="card-3">
//                 <div className="one-div">
//                     <div><h1>Engineering</h1></div>
//                     <div className = "special-div">
//                         <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
//                         <FontAwesomeIcon icon="fa-solid fa-trash-can" />
//                     </div>
//                 </div>
//                 <hr className = "new-hr"/>
//                 <div className="two-div">
//                     <div>
//                         <img src={test} alt="My profile" className ="My-profile" />
//                     </div>
//                     <div>
//                         <p>Department Head</p>
//                         <h2>Sarah Johnson</h2>
//                     </div>
//                 </div>
//                 <div className="three-div">
//                     <div  className = "new-div" >
//                         <div><FontAwesomeIcon icon="fa-solid fa-users" className = "new-div-icon" /></div>
//                         <div  >
//                             <p>Team Members</p>
//                             <h2>65</h2>
//                         </div>
//                     </div>
//                     <div className = "new-div-2">
//                         <div><FontAwesomeIcon icon="fa-solid fa-clock" className = "new-div-icon" /></div>
//                         <div>
//                             <p>Attendance</p>
//                             <h2>98%</h2>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="four-div">
//                   <div className="div-1-1">
//                     <img src={test} alt="My profile" className ="My-four-div-profile" />
//                     <h2>60+</h2>
//                   </div>
//                   <div className="div-2-2">
//                     <p>Description</p>
//                     <h1>Develops and maintains technical systems and software</h1>
//                   </div>
//                 </div>
//                 <div className="five-div">
//                 <Link to={"/department/add-employee-department"}><button>view Department</button></Link>
//                 </div>
//                 </div>

//               </div>

    
//             </div>
    
//           </div>
//         </div>
//       )
//     }
    

// export default Department


import { React, useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import test from '../assets/test.png';
import '../pages/Department.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import EmployerNavbar from '../components/EmployerNavbar';

library.add(fas);

const Department = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                setLoading(true);
                const companyId = localStorage.getItem("company_id");
                if (!companyId) {
                    throw new Error("Company ID is missing. Please log in again.");
                }

                const storedAuthData = localStorage.getItem("authData");
                if (!storedAuthData) {
                    throw new Error("Authentication data is missing. Please log in.");
                }

                let authData;
                try {
                    authData = JSON.parse(storedAuthData);
                } catch (error) {
                    throw new Error("Invalid authentication data format. Please log in again.");
                }

                const token = authData?.token;
                if (!token) {
                    throw new Error("Authentication token is missing. Please log in.");
                }

                const apiUrl = `https://proximahr.onrender.com/departments/?company_id=${companyId}`;
                const response = await fetch(apiUrl, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch department list.");
                }

                const data = await response.json();
                setDepartments(data.departments || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDepartments();
    }, []);

    return (
        <div>
            <div className="main-dashboard">
                <Sidebar />
                <div className="dashboard">
                    <div className="slide-one-1">
                        <EmployerNavbar />
                    </div>
                    <hr className="horizontal" />
                    <div className="dashboard-details">
                        <h5>Department</h5>
                        <h6>{new Date().toDateString()}</h6>
                    </div>

                    <div className="number-of-employee">
                        <div className="new-div-1">
                            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" className="glass-icon" />
                            <input type="text" placeholder='Search Department' />
                        </div>
                        <div className="div-2">
                            <div className="btn-1">
                                <button onClick={() => setIsOpen(!isOpen)}>
                                    <FontAwesomeIcon icon="fa-solid fa-filter" /> filter
                                </button>
                            </div>
                            {isOpen && (
                                <div className="dropdownstyle">
                                    <p>All</p>
                                    <p>Engineering</p>
                                    <p>Design</p>
                                    <p>Marketing</p>
                                    <p>Sales</p>
                                    <p>Data Science</p>
                                    <p>Operations</p>
                                </div>
                            )}
                            <div className="btn">
                                <Link to={"/department/add-new-department"}>
                                    <button><FontAwesomeIcon icon="fa-solid fa-plus" />Add New Department</button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <p>Loading departments...</p>
                    ) : error ? (
                        <p style={{ color: 'red' }}>{error}</p>
                    ) : (
                        <div className="dashboard-details-2-1-1">
                            {departments.length === 0 ? (
                                <p>No departments found.</p>
                            ) : (
                                departments.map((dept, index) => (
                                    <div className="card-3" key={index}>
                                        <div className="one-div">
                                            <div><h1>{dept.name}</h1></div>
                                            <div className="special-div">
                                                <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                                                <FontAwesomeIcon icon="fa-solid fa-trash-can" />
                                            </div>
                                        </div>
                                        <hr className="new-hr" />
                                        <div className="two-div">
                                            <div>
                                                <img src={test} alt="Department Head" className="My-profile" />
                                            </div>
                                            <div>
                                                <p>Department Head</p>
                                                <h2>{dept.hod ? `${dept.hod.first_name} ${dept.hod.last_name}` : 'Not Assigned'}</h2>
                                            </div>
                                        </div>
                                        <div className="three-div">
                                            <div className="new-div">
                                                <div><FontAwesomeIcon icon="fa-solid fa-users" className="new-div-icon" /></div>
                                                <div>
                                                    <p>Team Members</p>
                                                    <h2>{dept.staff_size}</h2>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="four-div">
                                            <div className="div-2-2">
                                                <p>Description</p>
                                                <h1>{dept.description || 'No description available'}</h1>
                                            </div>
                                        </div>
                                        <div className="five-div">
                                            <Link to={"/department/add-employee-department"}>
                                                <button>View Department</button>
                                            </Link>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Department;
