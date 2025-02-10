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


import { React, useState } from 'react';
import Sidebar from '../components/Sidebar';
import '../pages/AddDepartment.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import UserNavbar from '../components/UserNavbar';

library.add(fas);

const AddDepartment = () => {
    const [departmentName, setDepartmentName] = useState("");
    const [description, setDescription] = useState("");
    const [departmentHead, setDepartmentHead] = useState("");
    const [employees, setEmployees] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleAddDepartment = async () => {
        setLoading(true);
        setError("");
        try {
            const companyId = localStorage.getItem("company_id");
            if (!companyId) throw new Error("Company ID is missing. Please log in again.");
    
            const storedAuthData = localStorage.getItem("authData");
            if (!storedAuthData) throw new Error("Authentication data is missing. Please log in.");
    
            const authData = JSON.parse(storedAuthData);
            const token = authData?.token;
            if (!token) throw new Error("Authentication token is missing. Please log in.");
    
            // ✅ Ensure correct data format
            const payload = { name: departmentName.trim() };
    
            if (description.trim()) payload.description = description.trim();
            if (departmentHead.trim()) payload.hod = departmentHead.trim();
            if (employees.trim()) payload.staffs = employees.split(",").map(emp => emp.trim());
    
            // ✅ Debugging: Print payload before sending
            console.log("Payload to API:", JSON.stringify(payload, null, 2));
    
            if (!payload.name) throw new Error("Department name is required.");
    
            const response = await fetch(`https://proximahr.onrender.com/departments/create-department?company_id=${companyId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });
    
            // ✅ Debugging: Print raw response status
            console.log("Response Status:", response.status);
    
            if (!response.ok) {
                const errorData = await response.json();
                console.log("API Response Error:", errorData);  // 🔍 Debugging the error details
                throw new Error(errorData.detail || "Failed to create department");
            }
    
            alert("Department Created Successfully!");
            navigate("/department");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div>
            <div className="main-dashboard">
                <Sidebar />
                <div className="dashboard">
                    <UserNavbar />
                    <hr className="horizontal" />
                    <div className="dashboard-details">
                        <Link to={'/department'}>
                            <h5><FontAwesomeIcon icon="fa-solid fa-arrow-left" className="left-arrow" />Add New Department</h5>
                        </Link>
                        <h6>{new Date().toDateString()}</h6>
                    </div>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <div className="add-department">
                        <div className="add-department-feilds">
                            <label htmlFor="">Department Name</label>
                            <input type="text" placeholder='Enter Department' value={departmentName} onChange={(e) => setDepartmentName(e.target.value)} />
                        </div>

                        <div className="add-department-feilds">
                            <label htmlFor="">Add Employees (Optional, Comma-Separated IDs)</label>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <input  style={{ width:"800px"}} type="text" placeholder='Enter Employee IDs' value={employees} onChange={(e) => setEmployees(e.target.value)} />
                                <Link to={"/search-employee"}><button style={{ padding: '5px 10px' }}>Add Employee</button></Link>
                            </div>
                        </div>

                        <div className="add-department-feilds">
                            <label htmlFor="">Department Head (Optional)</label>
                            <input type="text" placeholder='Select Department Head' value={departmentHead} onChange={(e) => setDepartmentHead(e.target.value)} />
                        </div>

                        <div className="add-department-feilds">
                            <label htmlFor="">Department Description</label>
                            <textarea placeholder='Provide a brief description of the department function (Optional).' value={description} onChange={(e) => setDescription(e.target.value)} />
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
