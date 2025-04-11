// import {React} from 'react';
// import Sidebar from '../components/Sidebar'
// import test from '../assets/test.png'
// import '../pages/AddDepartment.css'
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fas} from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {Link} from 'react-router-dom';
// import UserNavbar from '../components/UserNavbar';

// library.add(fas);

// const AddDepartment = () => {
    
//     return (
//         <div>
//           <div className="main-dashboard">
//             <Sidebar/>
//             <div className="dashboard">
//               <UserNavbar/>
//               <hr className="horizontal" />
    
//               <div className="dashboard-details">
//                 <Link to={'/department'}><h5><FontAwesomeIcon icon="fa-solid fa-arrow-left" className = "left-arrow" />Add New Department</h5></Link>
//                 <h6>24 Thursday October 2024</h6>
//               </div>
                    
//             <div className="add-department">
//                 <div className="add-department-feilds">
//                     <label htmlFor="">Department Name</label>
//                     <input type="text" placeholder='Enter Department' />
//                 </div>
//                 <div className="add-department-feilds-1">
//                     <div>
//                         <label htmlFor="">Add Employee</label>
//                         <input type="text" placeholder='Select Employee' />
//                     </div>
//                     <Link to={"/search-employee"}><button>Add Employee</button></Link>                   
//                 </div>
//                 <div className="add-department-feilds">
//                     <label htmlFor="">Department Head</label>
//                     <input type="text" placeholder='select Department Head' />
//                 </div>
//                 <div className="add-department-feilds">
//                     <label htmlFor="">Department Name</label>
//                     <input type="text-area" placeholder='provide a brief description of the department function.' />
//                 </div>
//             </div>
            
//             <div className="department-button">
//                 <Link to={"/department/edit-department"}><button>Add New Department</button></Link>
//             </div>
              
//             </div>
    
//           </div>
//         </div>
//       )
// }

// export default AddDepartment


// import { React, useState } from 'react';
// import Sidebar from '../components/Sidebar';
// import '../pages/AddDepartment.css';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fas } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Link, useNavigate } from 'react-router-dom';
// import UserNavbar from '../components/UserNavbar';

// library.add(fas);

// const AddDepartment = () => {
//     const [departmentName, setDepartmentName] = useState("");
//     const [description, setDescription] = useState("");
//     const [departmentHead, setDepartmentHead] = useState("");
//     const [employees, setEmployees] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");
//     const navigate = useNavigate();

//     const handleAddDepartment = async () => {
//         setLoading(true);
//         setError("");
//         try {
//             const companyId = localStorage.getItem("company_id");
//             if (!companyId) throw new Error("Company ID is missing. Please log in again.");
    
//             const storedAuthData = localStorage.getItem("authData");
//             if (!storedAuthData) throw new Error("Authentication data is missing. Please log in.");
    
//             const authData = JSON.parse(storedAuthData);
//             const token = authData?.token;
//             if (!token) throw new Error("Authentication token is missing. Please log in.");
    
//             // ✅ Ensure correct data format
//             const payload = { name: departmentName.trim() };
    
//             if (description.trim()) payload.description = description.trim();
//             if (departmentHead.trim()) payload.hod = departmentHead.trim();
//             if (employees.trim()) payload.staffs = employees.split(",").map(emp => emp.trim());
    
//             // ✅ Debugging: Print payload before sending
//             console.log("Payload to API:", JSON.stringify(payload, null, 2));
    
//             if (!payload.name) throw new Error("Department name is required.");
    
//             const response = await fetch(`https://proximahr.onrender.com/departments/create-department?company_id=${companyId}`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${token}`,
//                 },
//                 body: JSON.stringify(payload),
//             });
    
//             // ✅ Debugging: Print raw response status
//             console.log("Response Status:", response.status);
    
//             if (!response.ok) {
//                 const errorData = await response.json();
//                 console.log("API Response Error:", errorData);  // 🔍 Debugging the error details
//                 throw new Error(errorData.detail || "Failed to create department");
//             }
    
//             alert("Department Created Successfully!");
//             navigate("/department");
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };
    

//     return (
//         <div>
//             <div className="main-dashboard">
//                 <Sidebar />
//                 <div className="dashboard">
//                     <UserNavbar />
//                     <hr className="horizontal" />
//                     <div className="dashboard-details">
//                         <Link to={'/department'}>
//                             <h5><FontAwesomeIcon icon="fa-solid fa-arrow-left" className="left-arrow" />Add New Department</h5>
//                         </Link>
//                         <h6>{new Date().toDateString()}</h6>
//                     </div>
//                     {error && <p style={{ color: "red" }}>{error}</p>}
//                     <div className="add-department">
//                         <div className="add-department-feilds">
//                             <label htmlFor="">Department Name</label>
//                             <input type="text" placeholder='Enter Department' value={departmentName} onChange={(e) => setDepartmentName(e.target.value)} />
//                         </div>

//                         <div className="add-department-feilds">
//                             <label htmlFor="">Add Employees (Optional, Comma-Separated IDs)</label>
//                             <div style={{ display: 'flex', gap: '10px' }}>
//                                 <input  style={{ width:"800px"}} type="text" placeholder='Enter Employee IDs' value={employees} onChange={(e) => setEmployees(e.target.value)} />
//                                 <Link to={"/search-employee"}><button style={{ padding: '5px 10px' }}>Add Employee</button></Link>
//                             </div>
//                         </div>

//                         <div className="add-department-feilds">
//                             <label htmlFor="">Department Head (Optional)</label>
//                             <input type="text" placeholder='Select Department Head' value={departmentHead} onChange={(e) => setDepartmentHead(e.target.value)} />
//                         </div>

//                         <div className="add-department-feilds">
//                             <label htmlFor="">Department Description</label>
//                             <textarea placeholder='Provide a brief description of the department function (Optional).' value={description} onChange={(e) => setDescription(e.target.value)} />
//                         </div>
//                     </div>
//                     <div className="department-button">
//                         <button onClick={handleAddDepartment} disabled={loading}>{loading ? "Adding..." : "Add New Department"}</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AddDepartment;

import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import '../pages/AddDepartment.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import EmployerNavbar from "../components/EmployerNavbar";

library.add(fas);

const AddDepartment = () => {
    const [departmentName, setDepartmentName] = useState("");
    const [departmentHead, setDepartmentHead] = useState("");
    const [staffs, setStaffs] = useState([]);
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [departmentDescription, setDepartmentDescription] = useState(""); // ✅ Add this



    useEffect(() => {
        // ✅ Retrieve selected employees from localStorage
        const storedEmployees = localStorage.getItem("selectedEmployees");
        if (storedEmployees) {
            setStaffs(JSON.parse(storedEmployees));
        }
    }, []);

    const handleDepartmentHeadChange = (e) => {
        setDepartmentHead(e.target.value);
    };

    const handleAddDepartment = async () => {
        try {
            setLoading(true);
    
            // ✅ Retrieve auth token
            const storedAuthData = localStorage.getItem("authData");
            if (!storedAuthData) throw new Error("Authentication data is missing. Please log in.");
    
            let authData;
            try {
                authData = JSON.parse(storedAuthData);
            } catch (error) {
                throw new Error("Invalid authentication data format. Please log in again.");
            }
    
            const token = authData?.access_token;
            if (!token) throw new Error("Authentication token is missing. Please log in.");
    
            // ✅ Get Company ID
            const companyId = localStorage.getItem("company_id");
            if (!companyId) throw new Error("Company ID is missing. Please log in again.");
    
            // ✅ Fix: Ensure `staffs` contains valid strings
            const validStaffs = Array.isArray(staffs) 
                ? staffs.filter(employee => employee?.employee_id).map(employee => String(employee.employee_id)) 
                : [];
    
            // ✅ Define request body
            const departmentData = {
                name: departmentName.trim(), // Ensure name is a valid string
                hod: departmentHead ? departmentHead.trim() : "", // HOD must be a string or empty
                staffs: validStaffs, // ✅ Ensure `staffs` is a clean array of strings
                description: departmentDescription.trim() || "", // Ensure description is valid
            };
    
            console.log("Sending Data:", departmentData);
    
            // ✅ Send API request
            const response = await fetch(`https://proximahr.onrender.com/api/v2/departments/create-department`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(departmentData),
            });
    
            const responseData = await response.json();
            console.log("API Response:", responseData); // ✅ Debugging step
    
            if (response.status === 201) {
                console.log("Department created successfully:", responseData);
                navigate("/department"); // ✅ Redirect on success
            } else {
                throw new Error(JSON.stringify(responseData, null, 2)); // Convert to readable format
            }
        } catch (error) {
            console.error("Error creating department:", error);
            setError(error.message); // ✅ Display error in UI
        } finally {
            setLoading(false);
        }
    };
    
    
    
    
    
    return (
        <div>
            <div className="main-dashboard">
                <Sidebar />
                <div className="dashboard">
                <EmployerNavbar />
                    <hr className="horizontal" />
                    <div className="dashboard-details" style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                        <Link to={'/department'}>
                            <h5 style={{textDecoration: "none", marginBottom:'15px'}} ><FontAwesomeIcon icon="fa-solid fa-arrow-left" className="left-arrow"  /> Add New Department</h5>
                        </Link>
                        <h6>{new Date().toLocaleDateString('en-GB', { day: '2-digit', weekday: 'long', month: 'long', year: 'numeric' })}</h6>
                    </div>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <div className="add-department">
                        <div className="add-department-feilds">
                            <label htmlFor="">Department Name <span style={{color:"red"}}>(Required)</span> </label>
                            <input type="text" placeholder='Enter Department' value={departmentName} onChange={(e) => setDepartmentName(e.target.value)} />
                        </div>
                        <div className="add-department-feilds">
                            <label htmlFor="">Department Head <span style={{color:'green'}} >(Optional)</span> </label>
                            <select value={departmentHead} onChange={handleDepartmentHeadChange}>
                                <option value="">Select Department Head</option>
                                {staffs.length > 0 && staffs.map((employee) => (
                                    <option key={employee.employee_id} value={employee.employee_id}>
                                        {employee.name} - {employee.employee_id}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="add-department-feilds-1">
                            <div className="staff-input" style={{ width: "100%", display: "flex", flexDirection: "column" }}>
                                <label htmlFor="">Staff Members <span style={{color:'green'}} >(Optional)</span> </label>
                                <select multiple >
                                    {staffs.length > 0 ? staffs.map((employee) => (
                                        <option key={employee.employee_id} value={employee.employee_id}>
                                            {employee.name} - {employee.employee_id}
                                        </option>
                                    )) : <option>No employees selected</option>}
                                </select>
                            </div>
                            {/* ✅ "Add Employee" Button Moved to the Right */}
                            <div className="staff-button">
                                <Link to={"/search-employee"}>
                                    <button className="add-employee-btn">
                                        <FontAwesomeIcon icon="fa-solid fa-plus" /> Add Employee
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div className="add-department-feilds"
                        value={departmentDescription}
                        >                            
                            <label htmlFor="">Department Description <span style={{color:'red'}} >(Required)</span></label>
                            <textarea 
                                placeholder='Provide a brief description of the department function.' 
                                value={departmentDescription} 
                                onChange={(e) => setDepartmentDescription(e.target.value)} />
                        </div>
                    </div>

                    <div className="department-button">
                        <button onClick={handleAddDepartment} disabled={loading}>{loading ? "Adding..." : "Add New Department"}</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddDepartment;
