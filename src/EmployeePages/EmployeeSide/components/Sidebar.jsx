import React from 'react';
import hrmLogo from '../assets/hrm logo.JPG';
import './sidebar.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';


library.add(fas);

const Sidebar = () => {
  const location = useLocation(); // Get the current path

  const menuItems = [
    { name: "Dashboard", icon: "fa-house", to: "/EmployeeDashboard" },
    { name: "Attendance & Tracking", icon: "fa-clipboard-user", to: "/EmployeeAttendance" },
    { name: "Leave Request", icon: "fa-calendar", to: "/EmployeeLeave" },
    { name: "Profile", icon: "fa-user", to: "/ProfileDashboard" },
    { name: "Logout", icon: "fa-right-from-bracket", to: "/login", className :"logout"},
  ];

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
              to={item.to}
              key={item.name}
              className={`side-bar ${item.className || ""} ${
                location.pathname.startsWith(item.to) ? "active" : ""
              }`}
            >
              <FontAwesomeIcon icon={item.icon} className="icon" /> {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;