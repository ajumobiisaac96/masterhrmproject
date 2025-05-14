import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../components/Sidebar";
import EmployeeNavbar from "../components/EmployeeNavbar.jsx";
import "./EmployeeDashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [workingSeconds, setWorkingSeconds] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setWorkingSeconds((prev) => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isTimerRunning]);

  const formatTime = (secs) => {
    const h = String(Math.floor(secs / 3600)).padStart(2, "0");
    const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
    const s = String(secs % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const handleClock = () => setIsTimerRunning((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleConfirmRequest();
  };

  const handleConfirmRequest = async () => {
    try {
      setSubmitting(true);
      // const companyId = localStorage.getItem("company_id");
      // const employeeId = localStorage.getItem("employee_id");
      const storedAuthData = localStorage.getItem("employeeAuthToken");

      if (!storedAuthData) {
        throw new Error("Missing authentication data.");
      }

      const authData = JSON.parse(storedAuthData);
      const token = authData?.access_token;

      const apiUrl = `https://proximahr.onrender.com/api/v2/employee/leave/create`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // employee_id: employeeId,
          leave_type: formData.leaveType,
          start_date: formData.startDate,
          end_date: formData.endDate,
          additional_notes: formData.additionalNotes,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Leave request submitted successfully!");
        setShowModal(true);
      } else {
        throw new Error(result.detail || "Leave request failed.");
      }
    } catch (error) {
      console.error("Error submitting leave request:", error.message);
      toast.error(`Error: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={4000} />
      <div className="main-dashboard">
        <Sidebar />
        <div className="dashboard">
          <EmployeeNavbar />
          <hr className="horizontal" />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Link to="/EmployeeLeave" style={{ marginRight: 12, color: "#222", textDecoration: "none", fontSize: 22 }}>
                <FontAwesomeIcon icon="fa-solid fa-arrow-left-long" />
              </Link>
              <div>
                <div style={{ fontWeight: 600, fontSize: 22, color: "#222" }}>Leave Request</div>
                <div style={{ color: "#888", fontSize: 15 }}>
                  {new Date().getDate()} {new Date().toLocaleString('en-US', { weekday: 'long' })} {new Date().toLocaleString('default', { month: 'long' })} {new Date().getFullYear()}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                <span style={{ fontSize: 15, color: "#888", marginBottom: 4 }}>Working Hours</span>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <input
                    type="text"
                    value={formatTime(workingSeconds)}
                    readOnly
                    style={{
                      width: 110,
                      height: 36,
                      background: "#FAFAFA",
                      border: "1px solid #E5E5E5",
                      borderRadius: 6,
                      textAlign: "center",
                      fontSize: 18,
                      fontWeight: 600,
                      color: "#222",
                      fontFamily: "monospace",
                      letterSpacing: 2,
                      marginRight: 8
                    }}
                  />
                  <button
                    onClick={handleClock}
                    style={{
                      background: isTimerRunning ? "#fff" : "#007BFF",
                      color: isTimerRunning ? "#007BFF" : "#fff",
                      border: isTimerRunning ? "2px solid #007BFF" : "none",
                      borderRadius: 6,
                      fontWeight: 500,
                      fontSize: 16,
                      height: 36,
                      minWidth: 110,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      cursor: "pointer",
                      transition: "background 0.2s, color 0.2s, border 0.2s"
                    }}
                  >
                    <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" />
                    {isTimerRunning ? "Clock Out" : "Clock In"}
                  </button>
                </div>
              </div>
            </div>
          </div>
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
    </>
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
