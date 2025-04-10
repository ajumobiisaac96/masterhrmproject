// import React from 'react';
// import hrmLogo from '../assets/hrm logo.JPG';
// import '../components/sidebar.css';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fas } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Link, useLocation } from 'react-router-dom';
// import {Logout} from '../utils/Logout'


// library.add(fas);

// const Sidebar = () => {
//   const location = useLocation(); // Get the current path

//   const menuItems = [
//     { name: "Dashboard", icon: "fa-house", to: "/Dashboard" },
//     { name: "Department", icon: "fa-building", to: "/Department" },
//     { name: "Employee Management", icon: "fa-users", to: "/employee-managment" },
//     { name: "Attendance & Tracking", icon: "fa-clipboard-user", to: "/attendance-and-tracking" },
//     { name: "Leave Management", icon: "fa-calendar", to: "/LeaveManagment" },
//     { name: "Payroll Management", icon: "fa-money-bill-1", to: "/PayrollManagement" },
//     { name: "Report & Analysis", icon: "fa-chart-line", to: "/ReportAndAnalysis" },
//     // { name: "Task Management", icon: "fa-list-check", to: "/TaskManagement" },
//     { name: "Notification", icon: "fa-bell", to: "/Notification" },
//     { name: "Profile", icon: "fa-user", to: "/Profile" },
//     { name: "Logout", icon: "fa-right-from-bracket", to: "/login", className :"logout"},
//   ];

//   return (
//     <div>
//       <div className="sidebar">
//         <div className="side-logo">
//           <img src={hrmLogo} alt="HRM Logo" />
//           <h1>Proxima HR</h1>
//         </div>
//         <hr />
//         <div className="sidebar-icons">
//           {menuItems.map((item) => (
//             <Link
//               to={item.to}
//               key={item.name}
//               className={`side-bar ${item.className || ""} ${
//                 location.pathname.startsWith(item.to) ? "active" : ""
//               }`}
//             >
//               <FontAwesomeIcon icon={item.icon} className="icon" /> {item.name}
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

















import React, { useState } from 'react';
import hrmLogo from '../assets/hrm logo.JPG';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../utils/Logout'; // Import the logout function

library.add(fas);

const Sidebar = () => {
  const location = useLocation(); // Get the current path
  const navigate = useNavigate(); // To navigate after logout

  // State to control modal visibility
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: "fa-house", to: "/Dashboard" },
    { name: "Department", icon: "fa-building", to: "/Department" },
    { name: "Employee Management", icon: "fa-users", to: "/employee-managment" },
    { name: "Attendance & Tracking", icon: "fa-clipboard-user", to: "/attendance-and-tracking" },
    { name: "Leave Management", icon: "fa-calendar", to: "/LeaveManagment" },
    { name: "Payroll Management", icon: "fa-money-bill-1", to: "/PayrollManagement" },
    { name: "Report & Analysis", icon: "fa-chart-line", to: "/ReportAndAnalysis" },
    { name: "Notification", icon: "fa-bell", to: "/Notification" },
    { name: "Profile", icon: "fa-user", to: "/Profile" },
    { name: "Logout", icon: "fa-right-from-bracket", to: "#", className: "logout" },
  ];

  // Handle showing the logout confirmation modal
  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  // Handle logout confirmation
  const handleLogoutConfirm = () => {
    logout(navigate); // Call the logout function
    setShowLogoutModal(false); // Close the modal
  };

  // Handle logout cancellation
  const handleLogoutCancel = () => {
    setShowLogoutModal(false); // Close the modal
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
              to={item.to === "#" ? "#" : item.to}  // Prevent navigation for logout
              key={item.name}
              className={`side-bar ${item.className || ""} ${
                location.pathname.startsWith(item.to) ? "active" : ""
              }`}
              onClick={item.name === "Logout" ? handleLogoutClick : null}  // Show modal on logout click
            >
              <FontAwesomeIcon icon={item.icon} className="icon" /> {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.5)', /* Transparent black background */
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000, /* Ensure the modal is on top */
        }}>
          <div style={{
            background: '#fff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
            width: '300px',
          }}>
            <h3 style={{ marginBottom: '20px', fontSize: '18px' }}>Are you sure you want to log out?</h3>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}>
              <button 
                onClick={handleLogoutConfirm} 
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#007bff',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  borderRadius: '5px',
                }}
              >
                Yes
              </button>
              <button 
                onClick={handleLogoutCancel} 
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#dc3545',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  borderRadius: '5px',
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
