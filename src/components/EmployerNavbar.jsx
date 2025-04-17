import React, { useState, useEffect } from 'react';
import NotificationDropdown from '../components/NotificationDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import test from '../assets/test.png';
import axios from 'axios';

const UserNavbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);  // State to hold unread notification count
  const [adminData, setAdminData] = useState(null);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  useEffect(() => {
    const fetchAdminData = async () => {
      // const companyId = localStorage.getItem('company_id');
      let accessToken = null;

      try {
        const authData = JSON.parse(localStorage.getItem('authData'));
        if (authData && authData.access_token) {
          accessToken = authData.access_token;
        }
      } catch (err) {
        console.error('Error parsing authData from local storage', err);
      }

      // if (!companyId || !accessToken) {
      //   console.error('❌ Missing authentication details:', { companyId, accessToken });
      //   return;
      // }

      try {
        const response = await axios.get(`https://proximahr.onrender.com/api/v2/admin/profile`, {
          // params: { company_id: companyId },
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        console.log('✅ API Response:', response.data);
        setAdminData(response.data);
      } catch (err) {
        console.error('❌ API request failed:', err.response ? err.response.data : err.message);
      }
    };

    fetchAdminData();
  }, []);

  return (
    <div>
      <div
        className="slide-one-1"
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0px 0px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          marginTop: '-20px',
        }}
      >
        <div>
          <h5 style={{ margin: 0, fontSize: '24px', fontWeight: '600' }}>
            {adminData ? `${adminData.first_name} ${adminData.last_name}` : 'Loading...'}
          </h5>
          <h6 style={{ margin: 0, color: '#6C757D', fontSize: '14px' }}>
            {getGreeting()}
          </h6>
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
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

          <div
            className="user-profile"
            style={{
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
              width: '50px',
              height: '50px',
            }}
          >
            <img
              src={adminData?.profile_image || test}
              alt="Admin Profile"
              className="My-profile"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '2px solid #ddd',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNavbar;
