import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import "./NotificationDropdown.css"; // Ensure the CSS file is properly linked

const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Today's Birthdays", message: "Happy Birthday to Sarah Chen (Design) and Mike Ross (Engineering)!", time: "2 hours ago" },
    { id: 2, title: "Anniversary", message: "Happy two year anniversary to Mrs. Gomez", time: "2 hours ago" },
    { id: 3, title: "Leave Request", message: "Olusola James has requested for 6 days Sick leave", time: "7 hours ago" },
    { id: 4, title: "Payroll Processing", message: "Monthly payroll has been processed and paid", time: "3 hours ago" },
    { id: 5, title: "Team Meeting", message: "Weekly team meeting scheduled for tomorrow at 10 AM", time: "1 day ago" },
    { id: 6, title: "Policy Update", message: "New company policy on remote work has been updated", time: "2 days ago" }
  ]);

  const deleteNotification = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  return (
    <div className="notification-dropdown">
      <div className="notification-header">
        <FontAwesomeIcon icon={faBell} className="notification-bell-icon" />
        <h2>Notification</h2>
      </div>
      <div
        className="notification-list"
        style={{ maxHeight: '200px', overflowY: 'auto', overflowX: 'hidden' }}
      >
        {notifications.map((notification) => (
          <div key={notification.id} className="notification-item">
            <div className="notification-content">
              <h3>{notification.title}</h3>
              <p>{notification.message}</p>
              <span className="notification-time">{notification.time}</span>
            </div>
            <button
              className="delete-button"
              onClick={() => deleteNotification(notification.id)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationDropdown;
