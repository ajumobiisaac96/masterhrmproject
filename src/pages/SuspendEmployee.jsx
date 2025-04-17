// import React, { useState, useEffect } from "react";
// import Sidebar from "../components/Sidebar";
// import test from "../assets/test.png";
// import "../pages/DeactivateEmployee.css";
// import { library } from "@fortawesome/fontawesome-svg-core";
// import { fas } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Link, useNavigate } from "react-router-dom";
// import EmployerNavbar from "../components/EmployerNavbar";

// library.add(fas);

// const SuspendEmployee = () => {
//   const navigate = useNavigate();
//   const [employee, setEmployee] = useState(null);
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [reason, setReason] = useState("");
//   const [additionalNotes, setAdditionalNotes] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState("");

//   useEffect(() => {
//     try {
//       const storedEmployee = localStorage.getItem("selectedEmployee");
//       if (!storedEmployee) throw new Error("No employee data found.");
//       setEmployee(JSON.parse(storedEmployee));
//     } catch (err) {
//       setError(err.message);
//     }
//   }, []);

//   const suspendEmployee = async () => {
//     if (!employee || !startDate || !endDate || !reason) {
//       setError("All fields are required.");
//       return;
//     }

//     const authData = JSON.parse(localStorage.getItem("authData"));
//     const token = authData?.access_token;

//     if (!token) {
//       setError("Authentication required.");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setSuccess("");

//     try {
//       const response = await fetch(`https://proximahr.onrender.com/api/v2/employee-management/${employee.employee_id}/suspend-employee`, {
//         method: "POST",
//         headers: {
//           "Authorization": `Bearer ${token}`,
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           start_date: startDate,
//           end_date: endDate,
//           reason: reason,
//           additional_notes: additionalNotes
//         })
//       });

//       if (!response.ok) {
//         throw new Error("Failed to suspend employee.");
//       }

//       setSuccess("Employee suspended successfully.");
//       navigate("/employee-managment");
//     } catch (error) {
//       setError(error.message);
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
//           <Link to={"/employee-managment"}>
//             <h5 style={{marginBottom:'15px'}} ><FontAwesomeIcon icon="fa-solid fa-arrow-left" className="left-arrow" />Suspend Employee</h5>
//           </Link>
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
//               </div>
//               <div className="div1-3">
//                 <div className="btn-4" style={{marginTop:'-10px', marginLeft:'-50px'}}>
//                   <button style={{border:'1px solid' , width: "150px", textAlign:"center"}}>{employee?.employment_status || "Unknown Status"}</button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="suspend-employee-form">
//             {error && <div className="error-message">{error}</div>}
//             {success && <div className="success-message">{success}</div>}

//             <div className="first-row">
//               <div className="first-col">
//                 <label htmlFor="start-date">Start Date</label>
//                 <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
//               </div>
//               <div className="second-col">
//                 <label htmlFor="end-date">End Date</label>
//                 <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
//               </div>
//             </div>

//             <div className="second-row">
//               <label htmlFor="reason">Reason for Suspension</label>
//               <select value={reason} onChange={(e) => setReason(e.target.value)}>
//                 <option value="">Select Reason</option>
//                 <option value="Company Restructuring">Company Restructuring</option>
//                 <option value="Performance Issues">Performance Issues</option>
//                 <option value="Policy Violation">Policy Violation</option>
//                 <option value="Temporary Leave">Temporary Leave</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>

//             <div className="third-row">
//               <label htmlFor="notes">Additional Notes</label>
//               <input type="text" placeholder="Enter any additional details" value={additionalNotes} onChange={(e) => setAdditionalNotes(e.target.value)} />
//             </div>

//             <p style={{margin:'10px 0', fontSize:'14px', color:'#2E2E2E' , fontFamily:'inter', border:'2px solid #D9D9D9' , padding:'20px', width:"965px", height:'90px', borderRadius:'5px', marginTop: '20px'}}>
//             During suspension, the employee will have limited access to company resources and  <br />
//             systems.
//             </p>

//             <div className="submit-suspend-form" style={{display:'flex', justifyContent:'space-between', marginTop:'20px', marginLeft:'715px', width:'250px'}}>
//               <button className="btn-6" onClick={() => navigate("/employee-managment")}>Cancel</button>
//               <button className="btn-7" onClick={suspendEmployee} disabled={loading} style={{border:'1px'}}>
//                 {loading ? "Processing..." : "Suspend Employee"}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SuspendEmployee;









import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import test from "../assets/test.png";
import "../pages/DeactivateEmployee.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import EmployerNavbar from "../components/EmployerNavbar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  // Error states for form fields
  const [startDateError, setStartDateError] = useState("");
  const [endDateError, setEndDateError] = useState("");
  const [reasonError, setReasonError] = useState("");

  useEffect(() => {
    try {
      const storedEmployee = localStorage.getItem("selectedEmployee");
      if (!storedEmployee) throw new Error("No employee data found.");
      setEmployee(JSON.parse(storedEmployee));
    } catch (err) {
      setError(err.message);
    }
  }, []);

  const validateForm = () => {
    let valid = true;

    // Resetting error messages
    setStartDateError("");
    setEndDateError("");
    setReasonError("");

    // Field validation
    if (!startDate) {
      setStartDateError("Start date is required.");
      valid = false;
    }

    if (!endDate) {
      setEndDateError("End date is required.");
      valid = false;
    }

    if (!reason) {
      setReasonError("Reason for suspension is required.");
      valid = false;
    }

    return valid;
  };

  const suspendEmployee = async () => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields.");
      return;
    }
  
    const authData = JSON.parse(localStorage.getItem("authData"));
    const token = authData?.access_token;
  
    if (!token) {
      setError("Authentication required.");
      toast.error("Authentication required.");
      return;
    }
  
    setLoading(true);
    setError("");
    setSuccess("");
  
    try {
      const response = await fetch(`https://proximahr.onrender.com/api/v2/employee-management/${employee.employee_id}/suspend-employee`, {
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
      toast.success("Employee suspended successfully."); // Show success notification
  
      // Delay the redirection using setTimeout (3 seconds delay)
      setTimeout(() => {
        navigate("/employee-managment"); // Redirect after showing success toast
      }, 3000); // 3000 ms delay
  
    } catch (error) {
      setError(error.message);
      toast.error(error.message); // Show error notification
  
      // Delay the redirection if an error occurs (to give time to view error message)
      setTimeout(() => {
        navigate("/employee-managment"); // Redirect after showing error toast
      }, 3000); // 3000 ms delay
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
              <h5 style={{marginBottom:'15px'}}><FontAwesomeIcon icon="fa-solid fa-arrow-left" className="left-arrow" />Suspend Employee</h5>
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

            <div className="first-row">
              <div className="first-col">
                <label htmlFor="start-date">Start Date</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                {startDateError && <div className="field-error" style={{color:"red"}}>{startDateError}</div>}
              </div>
              <div className="second-col">
                <label htmlFor="end-date">End Date</label>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                {endDateError && <div className="field-error" style={{color:"red"}}>{endDateError}</div>}
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
              {reasonError && <div className="field-error" style={{color:"red"}}>{reasonError}</div>}
            </div>

            <div className="third-row">
              <label htmlFor="notes">Additional Notes</label>
              <input type="text" placeholder="Enter any additional details" value={additionalNotes} onChange={(e) => setAdditionalNotes(e.target.value)} />
            </div>

            <p style={{margin:'10px 0', fontSize:'14px', color:'#2E2E2E' , fontFamily:'inter', border:'2px solid #D9D9D9' , padding:'20px', width:"965px", height:'90px', borderRadius:'5px', marginTop: '20px'}}>
            During suspension, the employee will have limited access to company resources and  <br />
            systems.
            </p>

            <div className="submit-suspend-form" style={{display:'flex', justifyContent:'space-between', marginTop:'20px', marginLeft:'715px', width:'250px'}}>
              <button className="btn-6" onClick={() => navigate("/employee-managment")}>Cancel</button>
              <button className="btn-7" onClick={suspendEmployee} disabled={loading} style={{border:'1px'}}>
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

