import React, { useState, useEffect } from 'react';
import NotificationDropdown from '../components/NotificationDropdown'; // Ensure this path is correct
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import test from '../assets/test.png'; // Update with the correct path to your image

const UserNavbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [employeeData, setEmployeeData] = useState(null); // To store employee data
  const [greeting, setGreeting] = useState(""); // For greeting message based on time
  const [unreadCount, setUnreadCount] = useState(0); // Example unread notification count

  useEffect(() => {
    // Fetch employee profile data when the component mounts
    const fetchEmployeeProfile = async () => {
      const storedToken = localStorage.getItem('employeeAuthToken');
      
      if (!storedToken) {
        return;
      }

      const token = JSON.parse(storedToken).access_token;
      if (!token) {
        return;
      }

      try {
        const response = await fetch('https://proximahr.onrender.com/api/v2/employee/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setEmployeeData(data.data); // Update the state with the employee profile data
        } else {
          console.error('Failed to fetch employee data');
        }
      } catch (err) {
        console.error('Error fetching profile data:', err);
      }
    };

    // Fetch unread notifications count
    const fetchUnreadCount = async () => {
      const storedToken = localStorage.getItem('employeeAuthToken');
      if (!storedToken) return;
      const token = JSON.parse(storedToken).access_token;
      if (!token) return;

      try {
        const response = await fetch('https://proximahr.onrender.com/api/v2/employee/notifications/', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log('Unread count on navbar load:', data); // <-- Add this
          setUnreadCount(data.count); // Adjust this if your API returns a different key
        }
      } catch (err) {
        console.error('Error fetching unread count:', err);
      }
    };

    fetchEmployeeProfile();
    fetchUnreadCount();

    // Set greeting based on the time of day
    const hours = new Date().getHours();
    if (hours < 12) {
      setGreeting("Good Morning");
    } else if (hours >= 12 && hours < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: '-20px', marginLeft:'-10px'}}>
      {/* Left Side: User's Name and Greeting */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ marginLeft: '20px' }}>
          <h5 style={{ marginBottom: '0', fontSize: '24px', fontWeight: '600', color: '#333' }}>
            {employeeData ? `${employeeData.first_name} ${employeeData.last_name}` : ''}
          </h5>
          <h6 style={{ marginTop: '5px', color: '#6c757d', fontSize: '16px' }}>
            {greeting || 'Good Morning'}
          </h6>
        </div>
      </div>

      {/* Right Side: Notification and User Profile */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* Notification Icon */}
        <div
            className="notification"
            onClick={toggleDropdown}
            style={{
              position: 'relative',
              cursor: 'pointer',
              marginRight: '15px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <FontAwesomeIcon icon={faBell} style={{ fontSize: '20px', color: '' }} />
            <h6
              style={{
                position: 'absolute',
                top: '',
                right: '10px',
                backgroundColor: '#007BFF',
                color: '#fff',
                borderRadius: '50%',
                width: '16px',
                height: '16px',
                fontSize: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {unreadCount}
            </h6>
            {showDropdown && (
              <div style={{ position: 'absolute', top: '100%', right: 0, zIndex: 1000 }}>
                <NotificationDropdown setUnreadCount={setUnreadCount} /> {/* Pass setUnreadCount */}
              </div>
            )}
          </div>

        {/* User Profile Section */}
        <div
          className="user-profile"
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            backgroundColor: '#f1f1f1',
            borderRadius: '20px',
            padding: '5px 10px',
            border: '1px solid #ddd',
            width: 'fit-content',
          }}
        >
          {/* Profile Image */}
          <img
            src={employeeData ? employeeData.profile_image : test} // Fallback to 'test' image if profile image is not available
            alt="Profile"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              marginRight: '10px',
            }}
          />
          <span style={{ fontSize: '14px', fontWeight: '500', color: '#333' }}>
            {employeeData ? `${employeeData.first_name} ${employeeData.last_name}` : ''}
          </span>
          <FontAwesomeIcon icon={faCaretDown} style={{ marginLeft: '10px', color: '#333' }} />
        </div>
      </div>
    </div>
  );
};

export default UserNavbar;
