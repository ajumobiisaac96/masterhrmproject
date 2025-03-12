// import React, { useState } from 'react';
// import NotificationDropdown from '../components/NotificationDropdown'; // Ensure this path is correct
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBell } from '@fortawesome/free-solid-svg-icons';
// import test from '../assets/test.png'; // Update with the correct path to your image

// const UserNavbar = () => {
//   const [showDropdown, setShowDropdown] = useState(false);

//   const toggleDropdown = () => {
//     setShowDropdown(!showDropdown);
//   };

//   return (
//     <div>
//       <div className="slide-one-1" style={{width:'1000px' }}>
//         <div className="slide-one-1">
//           <div className="name">
//             <h5>Joseph Dooley</h5>
//             <h6>Good Morning</h6>
//           </div>
//         </div>
//         <div className="slide-one-2-1" style={{marginTop:'-5px'}}>
//           <div className="notification" onClick={toggleDropdown} style={{ position: 'relative', cursor: 'pointer', marginRight:'10px'}}>
//             <FontAwesomeIcon icon={faBell} />
//             <h6>6</h6>
//             {showDropdown && (
//               <div style={{ position: 'absolute', top: '100%', right: 0, zIndex: 1000 }}>
//                 <NotificationDropdown />
//               </div>
//             )}
//           </div>

//           <div
//                 className="user-profile"
//                 style={{
//                     display: 'flex',
//                     width: '280px',
//                     alignItems: 'center',
//                     position: 'relative', // Added relative positioning
//                 }}
//                 >
//                 <img
//                     src={test}
//                     alt="My profile"
//                     className="My-profile"
//                     style={{
//                     position: 'absolute', // Make the image absolute
//                     zIndex: 2, // Ensure the image is above
//                     width: '50px', // Adjust width as needed
//                     height: '50px', // Adjust height as needed
//                     borderRadius: '50%', // Optional: make it circular
//                     marginLeft:'0px'
//                     }}
//                 />
//                 </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserNavbar;

import React, { useState, useEffect } from 'react';
import NotificationDropdown from '../components/NotificationDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import test from '../assets/test.png'; 
import axios from 'axios';

const UserNavbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [adminData, setAdminData] = useState(null);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Function to determine greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  // Fetch Admin Data from API
  useEffect(() => {
    const fetchAdminData = async () => {
      const companyId = localStorage.getItem('company_id');
      let accessToken = null;

      try {
        const authData = JSON.parse(localStorage.getItem('authData'));
        if (authData && authData.token) {
          accessToken = authData.token;
        }
      } catch (err) {
        console.error('Error parsing authData from local storage', err);
      }

      if (!companyId || !accessToken) {
        console.error('❌ Missing authentication details:', { companyId, accessToken });
        return;
      }

      try {
        const response = await axios.get(`https://proximahr.onrender.com/admin/profile`, {
          params: { company_id: companyId },
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
          // boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          marginTop: '-20px',
        }}
      >
        {/* 🔹 Admin Name & Greeting */}
        <div>
          <h5 style={{ margin: 0, fontSize: '24px', fontWeight: '600' }}>
            {adminData ? `${adminData.first_name} ${adminData.last_name}` : "Loading..."}
          </h5>
          <h6 style={{ margin: 0, color: "#6C757D", fontSize: "14px" }}>
            {getGreeting()}
          </h6>
        </div>

        {/* 🔹 Notification Bell & Profile Image */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Notification Bell */}
          <div 
            className="notification" 
            onClick={toggleDropdown} 
            style={{ 
              position: 'relative', 
              cursor: 'pointer', 
              marginRight: '15px', 
              display: 'flex', 
              alignItems: 'center' 
            }}
          >
            <FontAwesomeIcon icon={faBell} style={{ fontSize: "20px", color: "#007BFF" }} />
            <h6 
              style={{
                position: "absolute", 
                top: "-5px", 
                right: "-5px", 
                backgroundColor: "red", 
                color: "#fff", 
                borderRadius: "50%", 
                width: "16px", 
                height: "16px", 
                fontSize: "10px", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center"
              }}
            >
              6
            </h6>
            {showDropdown && (
              <div style={{ position: 'absolute', top: '100%', right: 0, zIndex: 1000 }}>
                <NotificationDropdown />
              </div>
            )}
          </div>

          {/* User Profile Image */}
          <div
            className="user-profile"
            style={{
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
              width: '50px',
              height: '50px'
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
                border: '2px solid #ddd'
              }}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserNavbar;
