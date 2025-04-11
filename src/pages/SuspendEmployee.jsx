// import React from 'react';
// import Sidebar from '../components/Sidebar';
// import test from '../assets/test.png';
// import '../pages/DeactivateEmployee.css';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fas } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {Link} from 'react-router-dom'

// library.add(fas)

// const SuspendEmployee = () => {
//     // const [activeSection, setActiveSection] = useState('personalInfo');

//     return (
//       <div>
//         <div className="main-dashboard">
//           <Sidebar />
//           <div className="dashboard">
//           <div className="slide-one-1">
//             <div className="slide-one-1">
//               <div className="name">
//                 <h5>Joseph Dooley</h5>
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
  
//             <hr className="horizontal" />
  
//             <div className="dashboard-detail-1">
//               <Link to={"/employee-managment"} ><h1 className="employee-profile"><FontAwesomeIcon icon="fa-solid fa-arrow-left" className = "left-arrow" />Suspend Employee</h1></Link>
//               <h6>24 Thursday October 2024</h6>
//             </div>
  
//             <div className="number-of-employee">
//               <div className="div-one">
//                 <div className="div1-1">
//                   <img src={test} alt="My profile" className ="My-profile" />
//                 </div>
//                 <div className="div1-2">
//                   <h1>Michael Chen</h1>
//                   <h2>Product Designer</h2>
//                 </div>
//                 <div className="div1-3">
//                   <div className="btn-4">
//                     <button>Active</button>
//                   </div>
//                 </div>
//             </div>
//             </div>

//             <div className="suspend-employee-form">
//                 <div className="first-row">
//                     <div className="first-col">
//                         <label htmlFor="">Start Date</label>
//                         <input type="date" id="start-date" name="start-date" />
//                     </div>
//                     <div className="second-col">
//                         <label htmlFor="">End Date</label>
//                         <input type="date" id="start-date" name="start-date" />
//                     </div>
//                 </div>
//                 <div className="second-row">
//                     <label htmlFor="">Reason for Suspension</label>
//                     <select name="" id="">
//                         <option value="">Company Restructuring </option>
//                         <option value="">Performance Issues</option>
//                         <option value="">Policy Violation</option>
//                         <option value="">Temporary Leave  </option>
//                         <option value="">Other</option>
//                     </select>
//                 </div>
//                 <div className="third-row">
//                     <label htmlFor="">Additional Notes</label>
//                     <input type="text" placeholder='Enter any additional details about the suspension' />
//                 </div>
//                 <div className="fourth-row">
//                     <p>During suspension, the employee will have limited access to company resources and 
//                     systems.</p>
//                 </div>
                
//             <div className="submit-suspend-form">
//                 <button className='btn-6'>Cancel</button>
//                 <button className='btn-7'>Suspend Employee</button>
//             </div>
//             </div>

  
//           </div>
//         </div>
//       </div>
//     );
// }

// export default SuspendEmployee



import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import test from "../assets/test.png";
import "../pages/DeactivateEmployee.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";

library.add(fas);

const SuspendEmployee = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    try {
      const storedEmployee = localStorage.getItem("selectedEmployee");
      if (!storedEmployee) throw new Error("No employee data found.");
      setEmployee(JSON.parse(storedEmployee));
    } catch (err) {
      setError(err.message);
    }
  }, []);

  const suspendEmployee = async () => {
    if (!employee || !startDate || !endDate || !reason) {
      setError("All fields are required.");
      return;
    }

    const companyId = localStorage.getItem("company_id");
    const authData = JSON.parse(localStorage.getItem("authData"));
    const token = authData?.access_token;

    if (!token) {
      setError("Authentication required.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`https://proximahr.onrender.com/api/v2/employee-management/${employee.employee_id}/suspend-employee?company_id=${companyId}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          start_date: startDate,
          end_date: endDate,
          reason: reason,
          additional_notes: additionalNotes
        })
      });

      if (!response.ok) {
        throw new Error("Failed to suspend employee.");
      }

      setSuccess("Employee suspended successfully.");
      navigate("/employee-managment");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="main-dashboard">
        <Sidebar />
        <div className="dashboard">
          <div className="slide-one-1">
            <div className="name">
              <h5>Joseph Dooley</h5>
              <h6>Good Morning</h6>
            </div>
          </div>

          <hr className="horizontal" />

          <div className="dashboard-detail-1">
            <Link to={"/employee-managment"}>
              <h1 className="employee-profile">
                <FontAwesomeIcon icon="fa-solid fa-arrow-left" className="left-arrow" /> Suspend Employee
              </h1>
            </Link>
            <h6>{new Date().toDateString()}</h6>
          </div>

          <div className="number-of-employee">
            <div className="div-one">
              <div className="div1-1">
                <img src={test} alt="My profile" className="My-profile" />
              </div>
              <div className="div1-2">
                <h1>{employee?.name || "No Employee Selected"}</h1>
                <h2>{employee?.job_title || "No Job Title"}</h2>
              </div>
              <div className="div1-3">
                <div className="btn-4">
                  <button>{employee?.employment_status || "Unknown Status"}</button>
                </div>
              </div>
            </div>
          </div>

          <div className="suspend-employee-form">
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <div className="first-row">
              <div className="first-col">
                <label htmlFor="start-date">Start Date</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              </div>
              <div className="second-col">
                <label htmlFor="end-date">End Date</label>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              </div>
            </div>

            <div className="second-row">
              <label htmlFor="reason">Reason for Suspension</label>
              <select value={reason} onChange={(e) => setReason(e.target.value)}>
                <option value="">Select Reason</option>
                <option value="Company Restructuring">Company Restructuring</option>
                <option value="Performance Issues">Performance Issues</option>
                <option value="Policy Violation">Policy Violation</option>
                <option value="Temporary Leave">Temporary Leave</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="third-row">
              <label htmlFor="notes">Additional Notes</label>
              <input type="text" placeholder="Enter any additional details" value={additionalNotes} onChange={(e) => setAdditionalNotes(e.target.value)} />
            </div>

            <div className="submit-suspend-form">
              <button className="btn-6" onClick={() => navigate("/employee-managment")}>Cancel</button>
              <button className="btn-7" onClick={suspendEmployee} disabled={loading}>
                {loading ? "Processing..." : "Suspend Employee"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuspendEmployee;
