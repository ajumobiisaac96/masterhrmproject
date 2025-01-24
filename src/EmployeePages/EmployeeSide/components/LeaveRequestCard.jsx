import React from "react";
import "@fortawesome/fontawesome-free/css/all.css";

const LeaveRequestCard = () => {
  return (
    <div style={styles.pageContainer}>
      <div style={styles.cardContainer}>
        <div style={styles.checkIcon}>
          <i className="fas fa-check-circle" style={styles.icon}></i>
        </div>
        <h2 style={styles.cardTitle}>Leave Request Submitted</h2>
        <p style={styles.cardMessage}>
          Your leave request has been successfully submitted for review. You
          will be notified once it is approved.
        </p>
        <a href="/EmployeeLeave" style={styles.cardLink}>
          Leave Dashboard
        </a>
      </div>
    </div>
  );
};

const styles = {
  cardContainer: {
    padding: "20px",
    textAlign: "center",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
  },
  checkIcon: {
    marginBottom: "15px",
  },
  icon: {
    fontSize: "48px",
    color: "green",
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  cardMessage: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "20px",
    lineHeight: "1.5",
  },
  cardLink: {
    display: "inline-block",
    fontSize: "14px",
    color: "#007bff",
    textDecoration: "none",
    borderBottom: "1px solid transparent",
    cursor: "pointer",
  },
  cardLinkHover: {
    borderBottom: "1px solid #007bff",
  },
};

export default LeaveRequestCard;
