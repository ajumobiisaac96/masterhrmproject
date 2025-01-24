import React from "react";

const ConfirmLeaveRequestModal = () => {
  return (
    <div style={styles.modalContainer}>
      <h2 style={styles.modalTitle}>Confirm Leave Request</h2>
      <p style={styles.modalDescription}>
        Please review your leave request details before submission.
      </p>
      <div style={styles.detailsContainer}>
        <div style={styles.detailRow}>
          <p style={styles.detailTitle}>Leave Type</p>
          <p style={styles.detailContent}>Annual Leave</p>
        </div>
        <div style={styles.detailRow}>
          <p style={styles.detailTitle}>Start Date</p>
          <p style={styles.detailContent}>2024-12-06</p>
        </div>
        <div style={styles.detailRow}>
          <p style={styles.detailTitle}>End Date</p>
          <p style={styles.detailContent}>2024-12-17</p>
        </div>
        <div style={styles.detailRow}>
          <p style={styles.detailTitle}>Reason</p>
          <p style={styles.detailContent}>
            This is my annual vacation for the year
          </p>
        </div>
      </div>
      <div style={styles.buttonContainer}>
        <button style={styles.cancelButton}>Cancel</button>
        <button style={styles.confirmButton}>Confirm Request</button>
      </div>
    </div>
  );
};

const styles = {
  modalContainer: {
    maxWidth: "500px",
    margin: "20px auto",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
    textAlign: "left",
  },
  modalTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  modalDescription: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "20px",
  },
  detailsContainer: {
    marginBottom: "20px",
  },
  detailRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  detailTitle: {
    fontSize: "14px",
    color: "#555",
    fontWeight: "bold",
  },
  detailContent: {
    fontSize: "14px",
    color: "#555",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  },
  cancelButton: {
    padding: "8px 16px",
    fontSize: "14px",
    color: "#555",
    backgroundColor: "#f5f5f5",
    border: "1px solid #e0e0e0",
    borderRadius: "4px",
    cursor: "pointer",
  },
  confirmButton: {
    padding: "8px 16px",
    fontSize: "14px",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default ConfirmLeaveRequestModal;
