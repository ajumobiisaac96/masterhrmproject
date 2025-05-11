import React, { useState } from 'react';
import hrmLogo from '../assets/hrm logo.JPG';
import './sidebar.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation, useNavigate } from 'react-router-dom';

library.add(fas);

const Sidebar = () => {
  const location = useLocation(); // Get the current path
  const navigate = useNavigate(); // To navigate after logout

  // State to control modal visibility
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: "fa-house", to: "/EmployeeDashboard" },
    { name: "Attendance & Tracking", icon: "fa-clipboard-user", to: "/EmployeeAttendance" },
    { name: "Leave Request", icon: "fa-calendar", to: "/EmployeeLeave" },
    { name: "Profile", icon: "fa-user", to: "/ProfileDashboard" },
    { name: "Logout", icon: "fa-right-from-bracket", to: "#", className: "logout" },
  ];

  // Handle showing the logout confirmation modal
  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  // Handle logout confirmation
  const handleLogoutConfirm = () => {
    // Remove token from localStorage
    localStorage.removeItem('authData');

    // Close the modal
    setShowLogoutModal(false);

    // Navigate to the employee admin page
    navigate('/EmployeeLogin');
  };

  // Handle logout cancellation
  const handleLogoutCancel = () => {
    setShowLogoutModal(false); // Close the modal
  };

  const backdropStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Transparent black background
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000, // Ensure it's above other content
  };

  const modalContentStyle = {
    backgroundColor: "#fff", // White background for the modal
    padding: "30px",
    borderRadius: "10px",
    textAlign: "center",
    width: "400px",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)", // Shadow for the modal
  };

  return (
    <div>
      <div className="sidebar">
        <div className="side-logo">
          <img src={hrmLogo} alt="HRM Logo" />
          <h1>Proxima HR</h1>
        </div>
        <hr />
        <div className="sidebar-icons">
          {menuItems.map((item) => (
            <Link
              to={item.to === "#" ? "#" : item.to} // Prevent navigation for logout
              key={item.name}
              className={`side-bar ${item.className || ""} ${
                location.pathname.startsWith(item.to) ? "active" : ""
              }`}
              onClick={item.name === "Logout" ? handleLogoutClick : null} // Show modal on logout click
              style={{
                display: "flex",
                alignItems: "center",
                padding: "7px 15px",
                marginBottom: "10px",
                borderRadius: "5px",
                textDecoration: "none",
                fontSize: "16px", // Adjust font size for better user experience
                fontWeight: "500",
                color: location.pathname.startsWith(item.to) ? "#007BFF" : "#2E2E2E", // Active text color
                backgroundColor: location.pathname.startsWith(item.to) ? "#E0ECFE" : "transparent", // Active background color
                transition: "all 0.3s ease", // Smooth transition for hover
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = location.pathname.startsWith(item.to)
                  ? "#D6E4FC" // Slightly lighter for active hover
                  : "#f0f0f0"; // Lighter background for hover
                e.target.style.color = location.pathname.startsWith(item.to)
                  ? "#007BFF" // Keep blue for active hover
                  : "#007BFF"; // Lighter text color for hover
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = location.pathname.startsWith(item.to)
                  ? "#E0ECFE" // Reset to active background
                  : "transparent"; // Reset to default background
                e.target.style.color = location.pathname.startsWith(item.to)
                  ? "#007BFF" // Reset to active text color
                  : "#2E2E2E"; // Reset to default text color
              }}
            >
              <FontAwesomeIcon icon={item.icon} className="icon" style={{ marginRight: "10px" }} />
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div style={backdropStyle}>
          <div style={modalContentStyle}>
            <h3 style={{ marginBottom: "20px" }}>Are you sure you want to log out?</h3>
            <p style={{ font: 'Inter', weight: '400', fontSize: '14px', textAlign: 'center' }}>
              You’ll be signed out from Proxima. Save all changes before logging out.
            </p>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "30px" }}>
              <button
                onClick={handleLogoutCancel}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#D9D9D9",
                  border: "1px solid #D9D9D9",
                  color: "#2E2E2E",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
              >
                No
              </button>
              <button
                onClick={handleLogoutConfirm}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "red",
                  border: "1px solid",
                  color: "white",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;