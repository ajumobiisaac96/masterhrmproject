  // import React, { useState, useEffect } from "react";
  // import Sidebar from "../components/Sidebar";
  // import test from "../assets/test.png";
  // import "../pages/SuspendEmployee.css";
  // import ToggleButton from "../components/ToggleButton";
  // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  // import { Link, useNavigate } from "react-router-dom";
  // import EmployerNavbar from "../components/EmployerNavbar";
  // import { toast } from "react-toastify";
  // import "react-toastify/dist/ReactToastify.css";

  // const DeactivateEmployee = () => {
  //   const navigate = useNavigate();
  //   const [employee, setEmployee] = useState(null);
  //   const [reason, setReason] = useState("");
  //   const [additionalNotes, setAdditionalNotes] = useState("");
  //   const [error, setError] = useState("");
  //   const [loading, setLoading] = useState(false);
  //   const [success, setSuccess] = useState("");
  //   const [showPopup, setShowPopup] = useState(false);

  //   // Error states for form fields
  //   const [reasonError, setReasonError] = useState("");
  //   const [additionalNotesError, setAdditionalNotesError] = useState("");

  //   useEffect(() => {
  //     try {
  //       const storedEmployee = localStorage.getItem("selectedEmployee");
  //       if (!storedEmployee) throw new Error("No employee data found.");
  //       setEmployee(JSON.parse(storedEmployee));
  //     } catch (err) {
  //       setError(err.message);
  //     }
  //   }, []);

  //   // Form validation function
  //   const validateForm = () => {
  //     let valid = true;

  //     // Reset error messages
  //     setReasonError("");
  //     setAdditionalNotesError("");

  //     // Field validation
  //     if (!reason) {
  //       setReasonError("Reason for deactivation is required.");
  //       valid = false;
  //     }

  //     if (!additionalNotes) {
  //       setAdditionalNotesError("Additional notes are required.");
  //       valid = false;
  //     }

  //     return valid;
  //   };

  //   const deactivateEmployee = async () => {
  //     // Validate form fields
  //     if (!validateForm()) {
  //       toast.error("Please fill in all required fields.");
  //       return;
  //     }

  //     // const companyId = localStorage.getItem("company_id");
  //     const authData = JSON.parse(localStorage.getItem("authData"));
  //     const token = authData?.access_token;

  //     if (!token) {
  //       setError("Authentication required.");
  //       toast.error("Authentication required.");
  //       return;
  //     }

  //     setLoading(true);
  //     setError("");
  //     setSuccess("");

  //     try {
  //       const response = await fetch(`https://proximahr.onrender.com/api/v2/employee-management/${employee.employee_id}/deactivate-employee`, {
  //         method: "POST",
  //         headers: {
  //           "Authorization": `Bearer ${token}`,
  //           "Content-Type": "application/json"
  //         },
  //         body: JSON.stringify({
  //           reason: reason,
  //           additional_notes: additionalNotes
  //         })
  //       });

  //       if (!response.ok) {
  //         throw new Error("Failed to deactivate employee.");
  //       }

  //       // Update employee status to "Suspended" instead of deleting them
  //       const updatedEmployee = { ...employee, employment_status: "Suspended" };
  //       localStorage.setItem("selectedEmployee", JSON.stringify(updatedEmployee));
  //       setEmployee(updatedEmployee);

  //       setSuccess("Employee successfully deactivated.");
  //       setShowPopup(true); // Show the pop-up message
  //       toast.success("Employee successfully deactivated."); // Show success toast

  //       // Delay redirection for 3 seconds
  //       setTimeout(() => {
  //         navigate("/employee-managment"); // Redirect after showing success toast
  //       }, 3000); // 3 seconds delay

  //     } catch (error) {
  //       setError(error.message);
  //       toast.error(error.message); // Show error toast

  //       // Delay redirection after error message
  //       setTimeout(() => {
  //         navigate("/employee-managment"); // Redirect after showing error toast
  //       }, 3000); // 3 seconds delay
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   return (
  //     <div>
  //       <div className="main-dashboard">
  //         <Sidebar />
  //         <div className="dashboard">
  //           <EmployerNavbar style={{ width: "100%", display: "flex", justifyContent: "space-between" }} />
  //           <hr className="horizontal" />

  //           <div className="dashboard-details" style={{display:'flex', flexDirection:'column', alignItems:'flex-start', marginBottom:'20px'}} >
  //             <Link to={"/employee-managment"}>
  //               <h5 style={{marginBottom:'15px'}}><FontAwesomeIcon icon="fa-solid fa-arrow-left" className="left-arrow" />Deactivate Employee</h5>
  //             </Link>
  //             <h6>{new Date().toLocaleDateString('en-GB', { day: '2-digit', weekday: 'long', month: 'long', year: 'numeric' })}</h6>
  //           </div>

  //           <div className="number-of-employee">
  //             <div className="div-one">
  //               <div className="div1-1">
  //                 <img src={test} alt="My profile" className="My-profile" />
  //               </div>
  //               <div className="div1-2" style={{marginLeft:'10px', marginTop:'-10px'}}>
  //                 <h1>{employee?.name || "No Employee Selected"}</h1>
  //                 <h2>{employee?.job_title || "No Job Title"}</h2>
  //                 <div className="btn-4" style={{marginTop:'10px', marginLeft:'100px'}}>
  //                   <button style={{border:'1px solid' , width: "150px", textAlign:"center"}}>{employee?.employment_status || "Unknown Status"}</button>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>

  //           <div className="suspend-employee-form">
  //             {error && <div className="error-message">{error}</div>}
  //             {success && <div className="success-message">{success}</div>}

  //             <div className="second-row">
  //               <label htmlFor="reason">Reason for Deactivation</label>
  //               <select value={reason} onChange={(e) => setReason(e.target.value)}>
  //                 <option value="">Select Reason</option>
  //                 <option value="Company Restructuring">Company Restructuring</option>
  //                 <option value="Performance Issues">Performance Issues</option>
  //                 <option value="Policy Violation">Policy Violation</option>
  //                 <option value="Temporary Leave">Temporary Leave</option>
  //                 <option value="Other">Other</option>
  //               </select>
  //               {reasonError && <div className="field-error" style={{color:"red"}}>{reasonError}</div>} {/* Display error message */}
  //             </div>

  //             <div className="another-row">
  //               <p>System Access Revocation</p>
  //               <div className="another-row-dropDown">
  //                 <div className="another-row-content"><label>Email Account</label><ToggleButton /></div>
  //                 <div className="another-row-content"><label>Building Access</label><ToggleButton /></div>
  //                 <div className="another-row-content"><label>Company Resources</label><ToggleButton /></div>
  //                 <div className="another-row-content"><label>Project Management Tools</label><ToggleButton /></div>
  //               </div>
  //             </div>

  //             <div className="third-row">
  //               <label>Additional Notes</label>
  //               <input type="text" placeholder='Enter any additional details about the deactivation' value={additionalNotes} onChange={(e) => setAdditionalNotes(e.target.value)} />
  //               {additionalNotesError && <div className="field-error" style={{color:"red"}}>{additionalNotesError}</div>} {/* Display error message */}
  //             </div>

  //             <div className="fourth-row" style={{background:"#FFDFDF", color: "#720000" , border:'1px solid '}}>
  //               <p>Deactivation will permanently remove the employee's access to all company systems. This action cannot be easily reversed.</p>
  //             </div>

  //             <div className="submit-suspend-form" style={{display:'flex', justifyContent:'space-between', marginTop:'20px', marginLeft:'715px', width:'250px'}}>
  //               <button className='btn-6' onClick={() => navigate("/employee-managment")}>Cancel</button>
  //               <button className='btn-7' onClick={deactivateEmployee} disabled={loading} style={{border:'1px'}}>{loading ? "Processing..." : "Deactivate Employee"}</button>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  // export default DeactivateEmployee;






















  import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import test from "../assets/test.png";
import "../pages/SuspendEmployee.css";
import ToggleButton from "../components/ToggleButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import EmployerNavbar from "../components/EmployerNavbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeactivateEmployee = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [reason, setReason] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  // Error states for form fields
  const [reasonError, setReasonError] = useState("");
  const [additionalNotesError, setAdditionalNotesError] = useState("");

  useEffect(() => {
    try {
      const storedEmployee = localStorage.getItem("selectedEmployee");
      if (!storedEmployee) throw new Error("No employee data found.");
      setEmployee(JSON.parse(storedEmployee));
    } catch (err) {
      setError(err.message);
    }
  }, []);

  // Form validation function
  const validateForm = () => {
    let valid = true;

    // Reset error messages
    setReasonError("");
    setAdditionalNotesError("");

    // Field validation
    if (!reason) {
      setReasonError("Reason for deactivation is required.");
      valid = false;
    }

    if (!additionalNotes) {
      setAdditionalNotesError("Additional notes are required.");
      valid = false;
    }

    return valid;
  };

  const deactivateEmployee = async () => {
    // Validate form fields
    if (!validateForm()) {
      toast.error("Please fill in all required fields.", {
        autoClose: 15000,
        position: "top-right",
        className: "custom-toast-error",
      });
      return;
    }

    const authData = JSON.parse(localStorage.getItem("authData"));
    const token = authData?.access_token;

    if (!token) {
      setError("Authentication required.");
      toast.error("Authentication required.", {
        autoClose: 15000,
        position: "top-right",
        className: "custom-toast-error",
      });
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`https://proximahr.onrender.com/api/v2/employee-management/${employee.employee_id}/deactivate-employee`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reason: reason,
          additional_notes: additionalNotes,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to deactivate employee.");
      }

      // Update employee status to "Suspended"
      const updatedEmployee = { ...employee, employment_status: "Suspended" };
      localStorage.setItem("selectedEmployee", JSON.stringify(updatedEmployee));
      setEmployee(updatedEmployee);

      setSuccess("Employee successfully deactivated.");
      setShowPopup(true); // Show the pop-up message
      toast.success("Employee successfully deactivated.", {
        autoClose: 15000,
        position: "top-right",
        className: "custom-toast-success",
      });

      // Delay redirection for 3 seconds
      setTimeout(() => {
        navigate("/employee-managment"); // Redirect after showing success toast
      }, 3000); // 3 seconds delay

    } catch (error) {
      setError(error.message);
      toast.error(error.message, {
        autoClose: 15000,
        position: "top-right",
        className: "custom-toast-error",
      });

      // Delay redirection after error message
      setTimeout(() => {
        navigate("/employee-managment"); // Redirect after showing error toast
      }, 3000); // 3 seconds delay
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="main-dashboard">
        <Sidebar />
        <div className="dashboard">
          <EmployerNavbar style={{ width: "100%", display: "flex", justifyContent: "space-between" }} />
          <hr className="horizontal" />
          <div className="dashboard-details" style={{display:'flex', flexDirection:'column', alignItems:'flex-start', marginBottom:'20px'}} >
            <Link to={"/employee-managment"}>
              <h5 style={{marginBottom:'15px'}}><FontAwesomeIcon icon="fa-solid fa-arrow-left" className="left-arrow" />Deactivate Employee</h5>
            </Link>
            <h6>{new Date().toLocaleDateString('en-GB', { day: '2-digit', weekday: 'long', month: 'long', year: 'numeric' })}</h6>
          </div>

          <div className="number-of-employee">
            <div className="div-one">
              <div className="div1-1">
                <img src={test} alt="My profile" className="My-profile" />
              </div>
              <div className="div1-2" style={{marginLeft:'10px', marginTop:'-10px'}}>
                <h1>{employee?.name || "No Employee Selected"}</h1>
                <h2>{employee?.job_title || "No Job Title"}</h2>
                <div className="btn-4" style={{marginTop:'10px', marginLeft:'100px'}}>
                  <button style={{border:'1px solid' , width: "150px", textAlign:"center"}}>{employee?.employment_status || "Unknown Status"}</button>
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
              {reasonError && <div className="field-error" style={{color:"red"}}>{reasonError}</div>}
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
              {additionalNotesError && <div className="field-error" style={{color:"red"}}>{additionalNotesError}</div>}
            </div>

            <div className="fourth-row" style={{background:"#FFDFDF", color: "#720000" , border:'1px solid '}}>
              <p>Deactivation will permanently remove the employee's access to all company systems. This action cannot be easily reversed.</p>
            </div>

            <div className="submit-suspend-form" style={{display:'flex', justifyContent:'space-between', marginTop:'20px', marginLeft:'715px', width:'250px'}}>
              <button className='btn-6' onClick={() => navigate("/employee-managment")}>Cancel</button>
              <button className='btn-7' onClick={deactivateEmployee} disabled={loading} style={{border:'1px'}}>{loading ? "Processing..." : "Deactivate Employee"}</button>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default DeactivateEmployee;
