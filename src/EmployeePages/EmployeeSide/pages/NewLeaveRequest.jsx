// import React, { useState } from "react";
// import Sidebar from "../components/Sidebar";
// import EmployeeNavbar from "../components/EmployeeNavbar.jsx";
// import "./EmployeeDashboard.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Link } from "react-router-dom";
// import LeaveRequestCard from "../components/LeaveRequestCard.jsx";

// const LeaveRequestForm = () => {
//   const [formData, setFormData] = useState({
//     leaveType: "",
//     startDate: "",
//     endDate: "",
//     additionalNotes: "",
//   });

//   const [showModal, setShowModal] = useState(false);
//   const [showLeaveRequestCard, setShowLeaveRequestCard] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setShowModal(true); // Show modal on form submission
//   };

//   const handleModalClose = () => {
//     setShowModal(false); // Close modal
//   };

//   const handleConfirmRequest = () => {
//     setShowModal(false); // Close modal
//     setShowLeaveRequestCard(true); // Show LeaveRequestCard
//   };

//   return (
//     <div className="main-dashboard">
//       <Sidebar />
//       <div className="dashboard">
//         <EmployeeNavbar />
//         <hr className="horizontal" />

//         {/* Form and other content */}
//         <div
//           className="content-container"
//           style={{
//             filter: showModal || showLeaveRequestCard ? "blur(5px)" : "none", // Blur content when modal or card is visible
//           }}
//         >
//           <div className="employee-dashboard-info" style={{ display: "flex" }}>
//             <div
//               className="dashboard-details"
//               style={{
//                 flexDirection: "column",
//                 alignItems: "flex-start",
//                 height: "40px",
//               }}
//             >
//               <Link to={"/EmployeeLeave"}>
//                 <h5>
//                   <FontAwesomeIcon
//                     icon="fa-solid fa-arrow-left-long"
//                     style={{ marginRight: "10px" }}
//                   />
//                   Leave Request
//                 </h5>
//               </Link>
//               <h6>24 Thursday October 2024</h6>
//             </div>
//             <div
//               className="employee-dashboard-info"
//               style={{ display: "flex", flexDirection: "column" }}
//             >
//               <h1>Working Hours</h1>
//               <div
//                 className="clock"
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   marginTop: "-20px",
//                 }}
//               >
//                 <div
//                   className="timer"
//                   style={{
//                     width: "100px",
//                     height: "38px",
//                     padding: "8px",
//                     marginTop: "10px",
//                     borderRadius: "4px",
//                     border: "1px solid #F8F8F8",
//                     background: "#D9D9D9",
//                   }}
//                 >
//                   00:00:00
//                 </div>
//                 <button style={{ width: "100px" }}>
//                   <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" />
//                   Clock Out
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Form Section */}
//           <div style={styles.formContainer}>
//             <form style={styles.form} onSubmit={handleSubmit}>
//               <div style={styles.formGroup}>
//                 <label> Leave Type</label>
//                 <select
//                   name="leaveType"
//                   value={formData.leaveType}
//                   onChange={handleInputChange}
//                   style={styles.input}
//                 >
//                   <option value="">Select Leave Type</option>
//                   <option value="Sick Leave">Sick Leave</option>
//                   <option value="Personal Leave">Personal Leave</option>
//                   <option value="Parental Leave">Parental Leave</option>
//                 </select>
//               </div>
//               <div style={styles.formRow}>
//                 <div style={styles.formGroup}>
//                   <label>Start Date</label>
//                   <input
//                     type="date"
//                     name="startDate"
//                     value={formData.startDate}
//                     onChange={handleInputChange}
//                     style={styles.input}
//                   />
//                 </div>
//                 <div style={styles.formGroup}>
//                   <label>End Date</label>
//                   <input
//                     type="date"
//                     name="endDate"
//                     value={formData.endDate}
//                     onChange={handleInputChange}
//                     style={styles.input}
//                   />
//                 </div>
//               </div>
//               <div style={styles.formGroup}>
//                 <label>Additional Notes</label>
//                 <textarea
//                   name="additionalNotes"
//                   value={formData.additionalNotes}
//                   onChange={handleInputChange}
//                   style={styles.textarea}
//                   placeholder="Enter any additional details about the leave request"
//                 ></textarea>
//               </div>
//               <div style={styles.buttonGroup}>
//                 <button
//                   type="button"
//                   style={{
//                     color: "#2E2E2E",
//                     backgroundColor: "#f8f8f8",
//                     border: "1px solid #ddd",
//                     padding: "8px 15px",
//                     borderRadius: "4px",
//                     cursor: "pointer",
//                   }}
//                   onClick={() =>
//                     setFormData({
//                       leaveType: "",
//                       startDate: "",
//                       endDate: "",
//                       additionalNotes: "",
//                     })
//                   }
//                 >
//                   Cancel
//                 </button>
//                 <button type="submit" style={styles.submitButton}>
//                   Submit Request
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>

//         {/* Modal */}
//         {showModal && (
//           <>
//             <div style={modalStyles.overlay}></div>
//             <div style={modalStyles.modalContainer}>
//               <h2 style={modalStyles.modalTitle}>Confirm Leave Request</h2>
//               <p style={modalStyles.modalDescription}>
//                 Please review your leave request details before submission.
//               </p>
//               <div style={modalStyles.detailsContainer}>
//                 <div style={modalStyles.detailRow}>
//                   <p style={modalStyles.detailTitle}>Leave Type</p>
//                   <p style={modalStyles.detailContent}>
//                     {formData.leaveType || "N/A"}
//                   </p>
//                 </div>
//                 <div style={modalStyles.detailRow}>
//                   <p style={modalStyles.detailTitle}>Start Date</p>
//                   <p style={modalStyles.detailContent}>
//                     {formData.startDate || "N/A"}
//                   </p>
//                 </div>
//                 <div style={modalStyles.detailRow}>
//                   <p style={modalStyles.detailTitle}>End Date</p>
//                   <p style={modalStyles.detailContent}>
//                     {formData.endDate || "N/A"}
//                   </p>
//                 </div>
//                 <div style={modalStyles.detailRow}>
//                   <p style={modalStyles.detailTitle}>Reason</p>
//                   <p style={modalStyles.detailContent}>
//                     {formData.additionalNotes || "N/A"}
//                   </p>
//                 </div>
//               </div>
//               <div style={modalStyles.buttonContainer}>
//                 <button
//                   style={{
//                     padding: "8px 16px",
//                     backgroundColor: "#f5f5f5",
//                     border: "1px solid #ddd",
//                     color: "#2E2E2E",
//                   }}
//                   onClick={handleModalClose}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   style={modalStyles.confirmButton}
//                   onClick={handleConfirmRequest}
//                 >
//                   Confirm Request
//                 </button>
//               </div>
//             </div>
//           </>
//         )}

//         {/* Leave Request Card */}
//         {showLeaveRequestCard && (
//           <>
//             <div style={modalStyles.overlay}></div>
//             <div style={modalStyles.modalContainer}>
//               <LeaveRequestCard />
//             </div>
//           </>
//         )}
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
//   submitButton: {
//     backgroundColor: "#007bff",
//     color: "#fff",
//     border: "none",
//     padding: "8px 15px",
//     borderRadius: "4px",
//   },
// };

// const modalStyles = {
//   overlay: {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     width: "100%",
//     height: "100%",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     zIndex: 1000,
//   },
//   modalContainer: {
//     position: "fixed",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     backgroundColor: "#fff",
//     padding: "20px",
//     borderRadius: "8px",
//     zIndex: 1001,
//     width: "500px",
//   },
//   modalTitle: { fontSize: "18px", fontWeight: "bold" },
//   modalDescription: { fontSize: "14px", marginBottom: "20px" },
//   detailRow: { display: "flex", justifyContent: "space-between" },
//   buttonContainer: { display: "flex", justifyContent: "flex-end", gap: "10px" },
//   confirmButton: {
//     padding: "8px 16px",
//     backgroundColor: "#007bff",
//     color: "#fff",
//     border: "none",
//   },
// };

// export default LeaveRequestForm;

import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import EmployeeNavbar from "../components/EmployeeNavbar.jsx";
import "./EmployeeDashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import LeaveRequestCard from "../components/LeaveRequestCard.jsx";

const LeaveRequestForm = () => {
  const [formData, setFormData] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    additionalNotes: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [showLeaveRequestCard, setShowLeaveRequestCard] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitting, setSubmitting] = useState(false); // Track submission state

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0]; // Ensure YYYY-MM-DD format
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleConfirmRequest = async () => {
    try {
        setShowModal(false);
        setSubmitting(true);

        const companyId = localStorage.getItem("company_id");
        const employeeId = localStorage.getItem("employee_id");
        const storedAuthData = localStorage.getItem("authData");

        if (!companyId) throw new Error("Company ID is missing from localStorage.");
        if (!employeeId) throw new Error("Employee ID is missing from localStorage.");
        if (!storedAuthData) throw new Error("Authentication data is missing.");

        const authData = JSON.parse(storedAuthData);
        const token = authData?.token;

        console.log("Company ID:", companyId);
        console.log("Employee ID:", employeeId);
        console.log("Sending Request to:", `https://proximahr.onrender.com/employee/leave/create?company_id=${companyId}`);

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
                start_date: formatDate(formData.startDate),
                end_date: formatDate(formData.endDate),
                additional_notes: formData.additionalNotes,
            }),
        });

        const result = await response.json();
        console.log("Backend Response:", result); // ✅ Logs full response

        if (!response.ok) throw new Error(result.detail || "Leave request failed.");

        setShowLeaveRequestCard(true);
    } catch (error) {
        console.error("Error Submitting Leave Request:", error.message);
        setErrorMessage(error.message);
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

        <div className="employee-dashboard-info" style={{ display: "flex" }}>
          <div className="dashboard-details" style={{ flexDirection: "column", alignItems: "flex-start", height: "40px" }}>
            <Link to={"/EmployeeLeave"}>
              <h5>
                <FontAwesomeIcon icon="fa-solid fa-arrow-left-long" style={{ marginRight: "10px" }} />
                Leave Request
              </h5>
            </Link>
            <h6>{new Date().toDateString()}</h6>
          </div>
          <div className="employee-dashboard-info" style={{ display: "flex", flexDirection: "column" }}>
            <h1>Working Hours</h1>
            <div className="clock" style={{ display: "flex", alignItems: "center", marginTop: "-20px" }}>
              <div className="timer" style={{ width: "100px", height: "38px", padding: "8px", marginTop: "10px", borderRadius: "4px", border: "1px solid #F8F8F8", background: "#D9D9D9" }}>00:00:00</div>
              <button style={{ width: "100px" }}>
                <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" />
                Clock Out
              </button>
            </div>
          </div>
        </div>

        <div style={styles.formContainer}>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <form style={styles.form} onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label> Leave Type</label>
              <select name="leaveType" value={formData.leaveType} onChange={handleInputChange} style={styles.input}>
                <option value="">Select Leave Type</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Personal Leave">Personal Leave</option>
                <option value="Parental Leave">Parental Leave</option>
              </select>
            </div>
            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label>Start Date</label>
                <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} style={styles.input} />
              </div>
              <div style={styles.formGroup}>
                <label>End Date</label>
                <input type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} style={styles.input} />
              </div>
            </div>
            <div style={styles.formGroup}>
              <label>Additional Notes</label>
              <textarea name="additionalNotes" value={formData.additionalNotes} onChange={handleInputChange} style={styles.textarea} placeholder="Enter any additional details about the leave request"></textarea>
            </div>
            <div style={styles.buttonGroup}>
              <button type="button" style={styles.cancelButton} onClick={() => setFormData({ leaveType: "", startDate: "", endDate: "", additionalNotes: "" })}>
                Cancel
              </button>
              <button type="button" style={styles.submitButton} onClick={handleConfirmRequest} disabled={submitting}>
                {submitting ? "Submitting..." : "Submit Request"}
              </button>
            </div>
          </form>
        </div>
      </div>
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
};

export default LeaveRequestForm;
