import React, { useState } from 'react';
import NotificationDropdown from '../components/NotificationDropdown'; // Ensure this path is correct
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import test from '../assets/test.png'; // Update with the correct path to your image

const UserNavbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div>
      <div className="slide-one-1">
        <div className="slide-one-1">
          <div className="name">
            <h5>Joseph Dooley</h5>
            <h6>Good Morning</h6>
          </div>
        </div>
        <div className="slide-one-2-1">
          <div className="notification" onClick={toggleDropdown} style={{ position: 'relative', cursor: 'pointer' }}>
            <FontAwesomeIcon icon={faBell} />
            <h6>6</h6>
            {showDropdown && (
              <div style={{ position: 'absolute', top: '100%', right: 0, zIndex: 1000 }}>
                <NotificationDropdown />
              </div>
            )}
          </div>

          <div className="user-profile">
            <img src={test} alt="My profile" className="My-profile" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNavbar;
