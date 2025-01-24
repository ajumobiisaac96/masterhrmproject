import React from "react";
import "@fortawesome/fontawesome-free/css/all.css";

const RejectedRequestCard = () => {
  return (
    <div style={styles.cardContainer}>
      <div style={styles.iconContainer}>
        <i className="fas fa-times-circle" style={styles.icon}></i>
      </div>
      <h2 style={styles.cardTitle}>Rejected Request</h2>
      <div style={styles.info}>
        <p style={styles.infoTitle}>Leave Type</p>
        <p style={styles.infoContent}>Annual Leave</p>
      </div>
      <div style={styles.info}>
        <p style={styles.infoTitle}>Start Date</p>
        <p style={styles.infoContent}>2024-12-06</p>
      </div>
      <div style={styles.info}>
        <p style={styles.infoTitle}>End Date</p>
        <p style={styles.infoContent}>2024-12-17</p>
      </div>
      <div style={styles.info}>
        <p style={styles.infoTitle}>Reason</p>
        <p style={styles.infoContent}>This is my annual vacation for the year</p>
      </div>
    </div>
  );
};

const styles = {
  cardContainer: {
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    textAlign: "center",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    fontFamily: "Arial, sans-serif",
  },
  iconContainer: {
    marginBottom: "15px",
  },
  icon: {
    fontSize: "48px",
    color: "red",
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  info: {
    marginBottom: "10px",
  },
  infoTitle: {
    fontSize: "14px",
    color: "#555",
    fontWeight: "bold",
    margin: 0,
  },
  infoContent: {
    fontSize: "14px",
    color: "#555",
    margin: 0,
  },
};

export default RejectedRequestCard;
