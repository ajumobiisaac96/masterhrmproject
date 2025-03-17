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
//       <div className="slide-one-1" style={{width:'920px' }}>
//         <div className="slide-one-1">
//           <div className="name">
//             <h5>Joseph Dooley</h5>
//             <h6>Good Morning</h6>
//           </div>
//         </div>
//         <div className="slide-one-2-1" style={{marginTop:'-5px'}}>
//           <div className="notification" onClick={toggleDropdown} style={{ position: 'relative', cursor: 'pointer', marginRight:'30px'}}>
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
//                     width: '180px',
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
//                     marginLeft:'-25px'
//                     }}
//                 />
//                 <p
//                     style={{
//                     width: '300px',
//                     borderRadius: '12px',
//                     border: '1px solid #D9D9D9',
//                     textAlign: 'center',
//                     marginLeft: '-10px',
//                     zIndex: 1, // Ensure it's below the image
//                     paddingLeft: '20px', // Add padding to avoid overlapping text
//                     position: 'relative', // Keep relative positioning for stacking context
//                     }}
//                 >
//                     Joseph Dooley <FontAwesomeIcon icon="fa-solid fa-caret-down" />
//                 </p>
//                 </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserNavbar;



import React, { useState, useEffect } from 'react';
import NotificationDropdown from '../components/NotificationDropdown'; // Ensure this path is correct
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; // If needed for routing
import test from '../assets/test.png'; // Update with the correct path to your image

const UserNavbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [employeeData, setEmployeeData] = useState(null); // To store employee data
  const [greeting, setGreeting] = useState(""); // For greeting message based on time

  useEffect(() => {
    // Fetch employee profile data when the component mounts
    const fetchEmployeeProfile = async () => {
      const storedToken = localStorage.getItem('employeeAuthToken');
      
      if (!storedToken) {
        return;
      }

      const token = JSON.parse(storedToken).token;
      if (!token) {
        return;
      }

      try {
        const response = await fetch('https://proximahr.onrender.com/employee/profile', {
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

    fetchEmployeeProfile();

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
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
      {/* Left Side: User's Name and Greeting */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ marginLeft: '20px' }}>
          <h5 style={{ marginBottom: '0', fontSize: '28px' , marginLeft:'-10px'}}>
            {employeeData ? `${employeeData.first_name} ${employeeData.last_name}` : 'Loading...'}
          </h5>
          <h6 style={{ marginTop: '5px', color: '#6c757d', marginLeft:'-10px', fontSize: '18px' }}>
            {greeting}
          </h6>
        </div>
      </div>

      {/* Right Side: Notification and User Profile */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div
          className="notification"
          onClick={toggleDropdown}
          style={{
            position: 'relative', 
            cursor: 'pointer', 
            marginRight: '20px', 
            display: 'flex', 
            alignItems: 'center'
          }}
        >
          <FontAwesomeIcon icon={faBell} style={{ fontSize: '18px', color: '#007bff' }} />
          <span
            style={{
              fontSize: '12px', 
              marginLeft: '5px', 
              color: '#007bff', 
              fontWeight: 'bold'
            }}
          >
            6
          </span>
          {showDropdown && (
            <div style={{ position: 'absolute', top: '100%', right: 0, zIndex: 1000 }}>
              <NotificationDropdown />
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
            position: 'relative',
            marginRight: '20px'
          }}
        >
          <img
            src={employeeData ? employeeData.profile_image : 'default-profile.png'} // Add a fallback image
            alt="Profile"
            style={{
              width: '50px', 
              height: '50px', 
              borderRadius: '50%', 
              marginRight: '10px'
            }}
          />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: '#f1f1f1',
              borderRadius: '12px',
              padding: '5px 10px',
              border: '1px solid #ddd',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            <span>{employeeData ? `${employeeData.first_name} ${employeeData.last_name}` : 'Loading...'}</span>
            <FontAwesomeIcon icon="fa-solid fa-caret-down" style={{ marginLeft: '10px' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNavbar;
