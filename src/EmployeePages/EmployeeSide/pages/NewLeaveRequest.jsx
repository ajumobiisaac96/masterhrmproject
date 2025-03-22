






// import React, { useState } from "react";
// import Sidebar from "../components/Sidebar";
// import EmployeeNavbar from "../components/EmployeeNavbar.jsx";
// import "./EmployeeDashboard.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Link } from "react-router-dom";

// const LeaveRequestForm = () => {
//   const [formData, setFormData] = useState({
//     leaveType: "",
//     startDate: "",
//     endDate: "",
//     additionalNotes: "",
//   });

//   const [showModal, setShowModal] = useState(false);
//   const [showLeaveRequestCard, setShowLeaveRequestCard] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [submitting, setSubmitting] = useState(false); // Track submission state
//   const [availableLeaveDays, setAvailableLeaveDays] = useState(0); // Track available leave days

//   // Function to fetch available leave days for the employee (mock value used here)
//   const fetchAvailableLeaveDays = () => {
//     // Fetch available leave days from an API or mock it here
//     // For now, let's assume the employee has 10 leave days left
//     setAvailableLeaveDays(10); // Mock value; replace with an actual API call if available
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const formatDate = (date) => {
//     if (!date) return "";
//     return new Date(date).toISOString().split("T")[0]; // Ensure YYYY-MM-DD format
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setShowModal(true);
//     await handleConfirmRequest();
//   };

//   const handleConfirmRequest = async () => {
//     try {
//       setShowModal(false);
//       setSubmitting(true);

//       const companyId = localStorage.getItem("company_id");
//       const employeeId = localStorage.getItem("employee_id");
//       const storedAuthData = localStorage.getItem("employeeAuthToken");

//       if (!companyId) throw new Error("Company ID is missing from localStorage.");
//       if (!employeeId) throw new Error("Employee ID is missing from localStorage.");
//       if (!storedAuthData) throw new Error("Authentication data is missing.");

//       const authData = JSON.parse(storedAuthData);
//       const token = authData?.token;

//       // Fetch available leave days before submitting the leave request
//       fetchAvailableLeaveDays(); // Fetch available leave days (replace with an actual API call)

//       console.log("Sending Leave Request to Backend:", {
//         employee_id: employeeId,
//         leave_type: formData.leaveType,
//         start_date: formatDate(formData.startDate),
//         end_date: formatDate(formData.endDate),
//         additional_notes: formData.additionalNotes,
//       });

//       const apiUrl = `https://proximahr.onrender.com/employee/leave/create?company_id=${companyId}`;

//       const response = await fetch(apiUrl, {
//         method: "POST",
//         headers: {
//           "Authorization": `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           employee_id: employeeId,
//           leave_type: formData.leaveType,
//           start_date: formatDate(formData.startDate),
//           end_date: formatDate(formData.endDate),
//           additional_notes: formData.additionalNotes,
//         }),
//       });

//       const result = await response.json();
//       console.log("Backend Response:", result); // ✅ Logs full response

//       if (!response.ok) {
//         // Display error from backend if leave request fails
//         throw new Error(result.detail || "Leave request failed.");
//       }

//       setShowLeaveRequestCard(true);
//     } catch (error) {
//       console.error("Error Submitting Leave Request:", error.message);
//       // Show user-friendly error message with available leave days
//       setErrorMessage(`Error: ${error.message}. Available leave days: ${availableLeaveDays}`);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="main-dashboard">
//       <Sidebar />
//       <div className="dashboard">
//         <EmployeeNavbar />
//         <hr className="horizontal" />

//         <div className="employee-dashboard-info" style={{ display: "flex" }}>
//           <div className="dashboard-details" style={{ flexDirection: "column", alignItems: "flex-start", height: "40px" }}>
//             <Link to={"/EmployeeLeave"}>
//               <h5>
//                 <FontAwesomeIcon icon="fa-solid fa-arrow-left-long" style={{ marginRight: "10px" }} />
//                 Leave Request
//               </h5>
//             </Link>
//             <h6>{new Date().toDateString()}</h6>
//           </div>
//           <div className="employee-dashboard-info" style={{ display: "flex", flexDirection: "column" }}>
//             <h1>Working Hours</h1>
//             <div className="clock" style={{ display: "flex", alignItems: "center", marginTop: "-20px" }}>
//               <div className="timer" style={{ width: "100px", height: "38px", padding: "8px", marginTop: "10px", borderRadius: "4px", border: "1px solid #F8F8F8", background: "#D9D9D9" }}>00:00:00</div>
//               <button style={{ width: "100px" }}><FontAwesomeIcon icon="fa-solid fa-right-from-bracket" /> Clock Out</button>
//             </div>
//           </div>
//         </div>

//         <div style={styles.formContainer}>
//           {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
//           <form style={styles.form} onSubmit={handleSubmit}>
//             <div style={styles.formGroup}>
//               <label> Leave Type</label>
//               <select name="leaveType" value={formData.leaveType} onChange={handleInputChange} style={styles.input}>
//                 <option value="">Select Leave Type</option>
//                 <option value="Sick Leave">Sick Leave</option>
//                 <option value="Personal Leave">Personal Leave</option>
//                 <option value="Parental Leave">Parental Leave</option>
//               </select>
//             </div>
//             <div style={styles.formRow}>
//               <div style={styles.formGroup}>
//                 <label>Start Date</label>
//                 <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} style={styles.input} />
//               </div>
//               <div style={styles.formGroup}>
//                 <label>End Date</label>
//                 <input type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} style={styles.input} />
//               </div>
//             </div>
//             <div style={styles.formGroup}>
//               <label>Additional Notes</label>
//               <textarea name="additionalNotes" value={formData.additionalNotes} onChange={handleInputChange} style={styles.textarea} placeholder="Enter any additional details about the leave request"></textarea>
//             </div>
//             <div style={styles.buttonGroup}>
//               <button type="button" style={styles.cancelButton} onClick={() => setFormData({ leaveType: "", startDate: "", endDate: "", additionalNotes: "" })}>
//                 Cancel
//               </button>
//               <button type="button" style={styles.submitButton} onClick={handleConfirmRequest} disabled={submitting}>
//                 {submitting ? "Submitting..." : "Submit Request"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   formContainer: { margin: "20px" },
//   form: { padding: "20px", border: "1px solid #ddd", borderRadius: "8px" },
//   formGroup: { marginBottom: "15px" },
//   formRow: { display: "flex", gap: "20px" },
//   input: { width: "100%", padding: "8px", border: "1px solid #ddd" },
//   textarea: { width: "100%", minHeight: "100px", padding: "8px" },
//   buttonGroup: { display: "flex", justifyContent: "flex-end", gap: "10px" },
//   cancelButton: { backgroundColor: "#f8f8f8", color: "#2E2E2E", border: "1px solid #ddd", padding: "8px 15px", borderRadius: "4px" },
//   submitButton: { backgroundColor: "#007bff", color: "#fff", border: "none", padding: "8px 15px", borderRadius: "4px", cursor: "pointer" },
// };

// export default LeaveRequestForm;








import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import EmployeeNavbar from "../components/EmployeeNavbar.jsx";
import "./EmployeeDashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const LeaveRequestForm = () => {
  const [formData, setFormData] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    additionalNotes: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleConfirmRequest();
  };

  const handleConfirmRequest = async () => {
    try {
      setSubmitting(true);
      const companyId = localStorage.getItem("company_id");
      const employeeId = localStorage.getItem("employee_id");
      const storedAuthData = localStorage.getItem("employeeAuthToken");

      if (!companyId || !employeeId || !storedAuthData) {
        throw new Error("Missing authentication data.");
      }

      const authData = JSON.parse(storedAuthData);
      const token = authData?.token;

      const apiUrl = `https://proximahr.onrender.com/employee/leave/create?company_id=${companyId}`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employee_id: employeeId,
          leave_type: formData.leaveType,
          start_date: formData.startDate,
          end_date: formData.endDate,
          additional_notes: formData.additionalNotes,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setShowModal(true); // Show modal on successful leave creation
      } else {
        throw new Error(result.detail || "Leave request failed.");
      }
    } catch (error) {
      console.error("Error submitting leave request:", error.message);
      setErrorMessage(`Error: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="main-dashboard">
      <Sidebar />
      <div className="dashboard">
        <EmployeeNavbar />
        <hr className="horizontal" />
        <div style={styles.formContainer}>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <form style={styles.form} onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label>Leave Type</label>
              <select name="leaveType" value={formData.leaveType} onChange={(e) => setFormData({ ...formData, leaveType: e.target.value })} style={styles.input}>
                <option value="">Select Leave Type</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Personal Leave">Personal Leave</option>
                <option value="Parental Leave">Parental Leave</option>
              </select>
            </div>
            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label>Start Date</label>
                <input type="date" name="startDate" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} style={styles.input} />
              </div>
              <div style={styles.formGroup}>
                <label>End Date</label>
                <input type="date" name="endDate" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} style={styles.input} />
              </div>
            </div>
            <div style={styles.formGroup}>
              <label>Additional Notes</label>
              <textarea name="additionalNotes" value={formData.additionalNotes} onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })} style={styles.textarea}></textarea>
            </div>
            <div style={styles.buttonGroup}>
              <button type="button" style={styles.cancelButton} onClick={() => setFormData({ leaveType: "", startDate: "", endDate: "", additionalNotes: "" })}>Cancel</button>
              <button type="submit" style={styles.submitButton} disabled={submitting}>{submitting ? "Submitting..." : "Submit Request"}</button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" style={styles.overlay}>
          <div className="modal-content" style={styles.modalContent}>
            <div style={styles.checkCircle}>
              <FontAwesomeIcon icon="fa-solid fa-check" style={styles.checkIcon} />
            </div>
            <h2>Leave Request Submitted</h2>
            <p>Your leave request has been successfully submitted for review. You will be notified once it is approved.</p>
            <Link to="/EmployeeLeave" style={styles.linkButton}>Leave Dashboard</Link>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  formContainer: { margin: "20px" },
  form: { padding: "20px", border: "1px solid #ddd", borderRadius: "8px" },
  formGroup: { marginBottom: "15px" },
  formRow: { display: "flex", gap: "20px" },
  input: { width: "100%", padding: "8px", border: "1px solid #ddd" },
  textarea: { width: "100%", minHeight: "100px", padding: "8px" },
  buttonGroup: { display: "flex", justifyContent: "flex-end", gap: "10px" },
  cancelButton: { backgroundColor: "#f8f8f8", color: "#2E2E2E", border: "1px solid #ddd", padding: "8px 15px", borderRadius: "4px" },
  submitButton: { backgroundColor: "#007bff", color: "#fff", border: "none", padding: "8px 15px", borderRadius: "4px", cursor: "pointer" },

  // Modal styles
  overlay: { 
    position: "fixed", 
    top: 0, 
    left: 0, 
    width: "100%", 
    height: "100%", 
    backgroundColor: "rgba(0, 0, 0, 0.5)", 
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center" 
  },
  modalContent: { 
    backgroundColor: "white", 
    padding: "20px", 
    borderRadius: "8px", 
    textAlign: "center", 
    maxWidth: "400px", 
    width: "100%" 
  },
  checkCircle: { 
    backgroundColor: "green", 
    width: "60px", 
    height: "60px", 
    borderRadius: "50%", 
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center", 
    margin: "0 auto 20px" 
  },
  checkIcon: { color: "white", fontSize: "30px" },
  linkButton: { 
    display: "inline-block", 
    marginTop: "20px", 
    padding: "10px 20px", 
    backgroundColor: "#007bff", 
    color: "#fff", 
    textDecoration: "none", 
    borderRadius: "4px" 
  }
};

export default LeaveRequestForm;
