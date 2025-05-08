import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import '../pages/AddDepartment.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import EmployerNavbar from "../components/EmployerNavbar";
import { toast } from 'react-toastify';

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
            if (!storedAuthData) {
                toast.error("Authentication data is missing. Please log in.");
                return;
            }
    
            let authData;
            try {
                authData = JSON.parse(storedAuthData);
            } catch (error) {
                toast.error("Invalid authentication data format. Please log in again.");
                return;
            }
    
            const token = authData?.access_token;
            if (!token) {
                toast.error("Authentication token is missing. Please log in.");
                return;
            }
    
            // ✅ Fix: Ensure `staffs` contains valid strings
            const validStaffs = Array.isArray(staffs) 
                ? staffs.filter(employee => employee?.employee_id).map(employee => String(employee.employee_id)) 
                : [];
    
            // ✅ Define request body
            const departmentData = {
                name: departmentName.trim(), // Ensure name is a valid string
                hod: departmentHead ? departmentHead.trim() : "", // HOD must be a string or empty
                staffs: validStaffs, // Ensure `staffs` is a clean array of strings
                description: departmentDescription.trim() || "", // Ensure description is valid
            };
    
            // ✅ Validate required fields
            if (!departmentData.name) {
                toast.error("Department name is required.");
                return;
            }
            if (!departmentData.description) {
                toast.error("Department description is required.");
                return;
            }
    
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
            console.log("API Response:", responseData);
    
            if (response.status === 201) {
                toast.success("Department created successfully!");
                navigate("/department"); // Redirect on success
            } else {
                // Handle backend error messages
                const errorMessage = responseData.detail || "Failed to create department. Please try again.";
                toast.error(errorMessage);
            }
        } catch (error) {
            console.error("Error creating department:", error);
            toast.error("An unexpected error occurred. Please try again.");
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
