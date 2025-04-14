import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import './NotificationDropdown.css'; // Ensure the CSS file is properly linked

const NotificationDropdown = ({ setUnreadCount }) => {  // Accept setUnreadCount as prop
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch unread notifications from the API
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const storedAuthData = localStorage.getItem('employeeAuthToken');
        const token = storedAuthData ? JSON.parse(storedAuthData).access_token : null;

        if (!token) {
          console.error('❌ Error: Authentication token is missing.');
          throw new Error('Authentication token is missing.');
        }

        const response = await fetch('https://proximahr.onrender.com/api/v2/notifications/', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch notifications');
        }

        const data = await response.json();
        setNotifications(data); // Set the notifications from the API
        setLoading(false); // Stop loading once data is fetched

        // Update unread count in the parent component
        const unreadCount = data.filter((notification) => !notification.is_read).length;
        setUnreadCount(unreadCount);  // Set unread notifications count
      } catch (err) {
        setError('Failed to load notifications');
        console.error(err);
        setLoading(false);
      }
    };

    fetchNotifications(); // Call the fetch function to get notifications
  }, [setUnreadCount]); // Add setUnreadCount to the dependency array to re-run effect when it's updated

  // Handle marking a notification as read
  const handleMarkAsRead = async (notificationId) => {
    try {
      const storedAuthData = localStorage.getItem('employeeAuthToken');
      const token = storedAuthData ? JSON.parse(storedAuthData).access_token : null;

      if (!token) {
        setError('Authentication token is missing.');
        return;
      }

      const response = await fetch(`https://proximahr.onrender.com/api/v2/notifications/{notification_id}/read`, {
        method: 'PUT', // PUT request to mark notification as read
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to mark notification as read');
      }

      // Mark notification as read in the UI
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === notificationId ? { ...notification, is_read: true } : notification
        )
      );

      // Recalculate unread count and update parent component
      const unreadCount = notifications.filter((notification) => !notification.is_read).length;
      setUnreadCount(unreadCount);
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
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