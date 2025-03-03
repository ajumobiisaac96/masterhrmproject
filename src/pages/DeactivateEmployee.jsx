// import React from 'react';
// import Sidebar from '../components/Sidebar';
// import test from '../assets/test.png';
// import '../pages/SuspendEmployee.css';
// import ToggleButton from '../components/ToggleButton';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {Link} from 'react-router-dom'

// const DeactivateEmployee = () => {


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
//               <Link to={"/employee-managment"} ><h1 className="employee-profile"><FontAwesomeIcon icon="fa-solid fa-arrow-left" className = "left-arrow" />Deactivate Employee</h1></Link>
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
//                 <div className="another-row">
//                     <p>System Access Revocation</p>
//                     <div className="another-row-dropDown">
//                         <div className="another-row-content">
//                             <label htmlFor="">Email Account</label>
//                             <ToggleButton/>
//                         </div>
//                         <div className="another-row-content">
//                             <label htmlFor="">Building Access</label>
//                             <ToggleButton/>
//                         </div>
//                         <div className="another-row-content">
//                             <label htmlFor="">Company Resources</label>
//                             <ToggleButton/>
//                         </div>
//                         <div className="another-row-content">
//                             <label htmlFor="">Project Managment Tools</label>
//                             <ToggleButton/>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="third-row">
//                     <label htmlFor="">Additional Notes</label>
//                     <input type="text" placeholder='Enter any additional details about the suspension' />
//                 </div>
//                 <div className="fourthh-row">
//                     <p>Deactivation will permanently remove the employee's access to all company systems. 
//                     This action cannot be easily reversed.</p>
//                 </div>
                
//             <div className="submit-suspend-form">
//                 <button className='btn-6'>Cancel</button>
//                 <button className='btn-7'>Deactivate Employee</button>
//             </div>
//             </div>

  
//           </div>
//         </div>
//       </div>
//     );
// }
// export default DeactivateEmployee



import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import test from '../assets/test.png';
import '../pages/SuspendEmployee.css';
import ToggleButton from '../components/ToggleButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';

const DeactivateEmployee = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [reason, setReason] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    try {
      const storedEmployee = localStorage.getItem("selectedEmployee");
      if (!storedEmployee) throw new Error("No employee data found.");
      setEmployee(JSON.parse(storedEmployee));
    } catch (err) {
      setError(err.message);
    }
  }, []);

  const deactivateEmployee = async () => {
    if (!employee || !reason) {
      setError("All fields are required.");
      return;
    }

    const companyId = localStorage.getItem("company_id");
    const authData = JSON.parse(localStorage.getItem("authData"));
    const token = authData?.token;

    if (!token) {
      setError("Authentication required.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`https://proximahr.onrender.com/employee-management/${employee.employee_id}/deactivate-employee?company_id=${companyId}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          reason: reason,
          additional_notes: additionalNotes
        })
      });

      if (!response.ok) {
        throw new Error("Failed to deactivate employee.");
      }

      // Update employee status to "Suspended" instead of deleting them
      const updatedEmployee = { ...employee, employment_status: "Suspended" };
      localStorage.setItem("selectedEmployee", JSON.stringify(updatedEmployee));
      setEmployee(updatedEmployee);

      setSuccess("Employee successfully deactivated.");
      setShowPopup(true); // Show the pop-up message
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
            <Link to={"/employee-managment"}><h1 className="employee-profile"><FontAwesomeIcon icon="fa-solid fa-arrow-left" className="left-arrow" />Deactivate Employee</h1></Link>
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

            <div className="second-row">
              <label htmlFor="reason">Reason for Deactivation</label>
              <select value={reason} onChange={(e) => setReason(e.target.value)}>
                <option value="">Select Reason</option>
                <option value="Company Restructuring">Company Restructuring</option>
                <option value="Performance Issues">Performance Issues</option>
                <option value="Policy Violation">Policy Violation</option>
                <option value="Temporary Leave">Temporary Leave</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="another-row">
              <p>System Access Revocation</p>
              <div className="another-row-dropDown">
                <div className="another-row-content"><label>Email Account</label><ToggleButton /></div>
                <div className="another-row-content"><label>Building Access</label><ToggleButton /></div>
                <div className="another-row-content"><label>Company Resources</label><ToggleButton /></div>
                <div className="another-row-content"><label>Project Management Tools</label><ToggleButton /></div>
              </div>
            </div>

            <div className="third-row">
              <label>Additional Notes</label>
              <input type="text" placeholder='Enter any additional details about the deactivation' value={additionalNotes} onChange={(e) => setAdditionalNotes(e.target.value)} />
            </div>

            <div className="fourth-row">
              <p>Deactivation will permanently remove the employee's access to all company systems. This action cannot be easily reversed.</p>
            </div>

            <div className="submit-suspend-form">
              <button className='btn-6' onClick={() => navigate("/employee-managment")}>Cancel</button>
              <button className='btn-7' onClick={deactivateEmployee} disabled={loading}>{loading ? "Processing..." : "Deactivate Employee"}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeactivateEmployee;
