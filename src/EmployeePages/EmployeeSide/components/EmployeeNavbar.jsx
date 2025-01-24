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
      <div className="slide-one-1" style={{width:'920px' }}>
        <div className="slide-one-1">
          <div className="name">
            <h5>Joseph Dooley</h5>
            <h6>Good Morning</h6>
          </div>
        </div>
        <div className="slide-one-2-1" style={{marginTop:'-5px'}}>
          <div className="notification" onClick={toggleDropdown} style={{ position: 'relative', cursor: 'pointer', marginRight:'30px'}}>
            <FontAwesomeIcon icon={faBell} />
            <h6>6</h6>
            {showDropdown && (
              <div style={{ position: 'absolute', top: '100%', right: 0, zIndex: 1000 }}>
                <NotificationDropdown />
              </div>
            )}
          </div>

          <div
                className="user-profile"
                style={{
                    display: 'flex',
                    width: '180px',
                    alignItems: 'center',
                    position: 'relative', // Added relative positioning
                }}
                >
                <img
                    src={test}
                    alt="My profile"
                    className="My-profile"
                    style={{
                    position: 'absolute', // Make the image absolute
                    zIndex: 2, // Ensure the image is above
                    width: '50px', // Adjust width as needed
                    height: '50px', // Adjust height as needed
                    borderRadius: '50%', // Optional: make it circular
                    marginLeft:'-25px'
                    }}
                />
                <p
                    style={{
                    width: '300px',
                    borderRadius: '12px',
                    border: '1px solid #D9D9D9',
                    textAlign: 'center',
                    marginLeft: '-10px',
                    zIndex: 1, // Ensure it's below the image
                    paddingLeft: '20px', // Add padding to avoid overlapping text
                    position: 'relative', // Keep relative positioning for stacking context
                    }}
                >
                    Joseph Dooley <FontAwesomeIcon icon="fa-solid fa-caret-down" />
                </p>
                </div>

        </div>
      </div>
    </div>
  );
};

export default UserNavbar;
