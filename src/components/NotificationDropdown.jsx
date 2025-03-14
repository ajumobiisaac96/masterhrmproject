// import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBell } from '@fortawesome/free-solid-svg-icons';
// import "./NotificationDropdown.css"; // Ensure the CSS file is properly linked

// const NotificationDropdown = () => {
//   const [notifications, setNotifications] = useState([
//     { id: 1, title: "Today's Birthdays", message: "Happy Birthday to Sarah Chen (Design) and Mike Ross (Engineering)!", time: "2 hours ago" },
//     { id: 2, title: "Anniversary", message: "Happy two year anniversary to Mrs. Gomez", time: "2 hours ago" },
//     { id: 3, title: "Leave Request", message: "Olusola James has requested for 6 days Sick leave", time: "7 hours ago" },
//     { id: 4, title: "Payroll Processing", message: "Monthly payroll has been processed and paid", time: "3 hours ago" },
//     { id: 5, title: "Team Meeting", message: "Weekly team meeting scheduled for tomorrow at 10 AM", time: "1 day ago" },
//     { id: 6, title: "Policy Update", message: "New company policy on remote work has been updated", time: "2 days ago" }
//   ]);

//   const deleteNotification = (id) => {
//     setNotifications(notifications.filter((notification) => notification.id !== id));
//   };

//   return (
//     <div className="notification-dropdown">
//       <div className="notification-header">
//         <FontAwesomeIcon icon={faBell} className="notification-bell-icon" />
//         <h2>Notification</h2>
//       </div>
//       <div
//         className="notification-list"
//         style={{ maxHeight: '200px', overflowY: 'auto', overflowX: 'hidden' }}
//       >
//         {notifications.map((notification) => (
//           <div key={notification.id} className="notification-item">
//             <div className="notification-content">
//               <h3>{notification.title}</h3>
//               <p>{notification.message}</p>
//               <span className="notification-time">{notification.time}</span>
//             </div>
//             <button
//               className="delete-button"
//               onClick={() => deleteNotification(notification.id)}
//             >
//               &times;
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default NotificationDropdown;



import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import "./NotificationDropdown.css"; // Ensure the CSS file is properly linked

const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Fetch unread notifications from the API
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const storedAuthData = localStorage.getItem("authData");
        const token = storedAuthData ? JSON.parse(storedAuthData).token : null;
        
        if (!token) {
          console.error("❌ Error: Authentication token is missing.");
          throw new Error("Authentication token is missing.");
        }

        const response = await fetch("https://proximahr.onrender.com/notifications/", {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch notifications");
        }

        const data = await response.json();
        setNotifications(data); // Set the notifications from the API
        setLoading(false); // Stop loading once data is fetched
      } catch (err) {
        setError("Failed to load notifications");
        console.error(err);
        setLoading(false);
      }
    };

    fetchNotifications(); // Call the fetch function to get notifications
  }, []); // Only run on component mount

  // Handle marking a notification as read
  const handleMarkAsRead = async (notificationId) => {
    try {
      const storedAuthData = localStorage.getItem("authData");
      const token = storedAuthData ? JSON.parse(storedAuthData).token : null;

      if (!token) {
        setError("Authentication token is missing.");
        return;
      }

      const response = await fetch(`https://proximahr.onrender.com/notifications/${notificationId}/read`, {
        method: "PUT", // PUT request to mark notification as read
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to mark notification as read");
      }

      // Mark notification as read in the UI
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === notificationId ? { ...notification, is_read: true } : notification
        )
      );
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  // Handle deleting a notification
  const deleteNotification = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  return (
    <div className="notification-dropdown">
      <div className="notification-header">
        <FontAwesomeIcon icon={faBell} className="notification-bell-icon" />
        <h2>Notifications</h2>
      </div>
      <div
        className="notification-list"
        style={{ maxHeight: '200px', overflowY: 'auto', overflowX: 'hidden' }}
      >
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`notification-item ${notification.is_read ? 'read' : 'unread'}`}
              >
                <div className="notification-content">
                  <h3>{notification.title}</h3>
                  <p>{notification.message}</p>
                  <span className="notification-time">{notification.created_at}</span>
                </div>
                <div className="notification-actions">
                  {!notification.is_read && (
                    <button
                      className="mark-as-read-button"
                      onClick={() => handleMarkAsRead(notification.id)}
                    >
                      Mark as Read
                    </button>
                  )}
                  <button
                    className="delete-button"
                    onClick={() => deleteNotification(notification.id)}
                  >
                    &times;
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No new notifications</p>
          )
        )}
      </div>
    </div>
  );
};

export default NotificationDropdown;
