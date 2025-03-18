// import React, { useState } from 'react';
// import '/Users/USER/Desktop/masterhrmproject/src/styles/custom.css'; // Keep your custom styles
// import hrmLogo from '../assets/hrm logo.JPG'; // Ensure logo path is correct
// import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
// import axios from 'axios';
// import SideImage from '../assets/SideImage.jpg'; // Ensure image path is correct

// const HRlogin = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate(); // Initialize the navigate function

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent form reload

//     // Retrieve company_id from local storage
//     const companyId = localStorage.getItem('company_id');
//     if (!companyId) {
//       setError('Company ID not found. Please log in again.');
//       return;
//     }

//     const userType = 'employee'; // Set user type

//     try {
//       // Create a URLSearchParams object to format the body
//       const body = new URLSearchParams();
//       body.append('username', username);
//       body.append('password', password);

//       // Make API request
//       const response = await axios.post(
//         `https://proximahr.onrender.com/company/login?company_id=${companyId}&user_type=${userType}`,
//         body, 
//         {
//           headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//           },
//         }
//       );

//       console.log('Login successful:', response.data); // ✅ Debugging log

//       // Ensure the API response contains the correct access token
//       const token = response.data.access_token; 
//       if (token) {
//         localStorage.setItem('authData', JSON.stringify({ token })); // Store token
//         console.log("Stored authData:", localStorage.getItem("authData")); // ✅ Debugging log
//         navigate('/EmployeeDashboard'); // Redirect to dashboard
//       } else {
//         setError("No token received. Please contact support.");
//       }

//     } catch (error) {
//       console.error('Login error:', error.response ? error.response.data : error.message);
//       setError('Incorrect email or password. Please try again.');
//     }
//   };

//   return (
//     <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
//       <div style={{ flex: 1, padding: '20px' }}>
//         <div className="logo" style={{ marginBottom: '5px', textAlign: 'left', marginLeft: '-190px' }}>
//           <img src={hrmLogo} alt="HRM Logo" style={{ width: '25px', height: 'auto' }} />
//           <h1>Proxima HR</h1>
//         </div>

//         <div className="container" style={{ width: '100%', maxWidth: '400px', margin: 'auto' }}>
//           <div className="text" style={{ marginBottom: '20px', fontSize: '24px', textAlign: 'left' }}>
//             Access Your Employee Portal
//           </div>
//           <form onSubmit={handleSubmit}>
//             <div className="inputs">
//               <div className="input-2" style={{ marginBottom: '10px' }}>
//                 <label htmlFor="username">Employee ID</label>
//                 <input
//                   type="text"
//                   id="username"
//                   placeholder="Enter Employee ID"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   required
//                   style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
//                 />
//               </div>

//               <div className="input-2" style={{ marginBottom: '20px' }}>
//                 <div className="forgotpassword" style={{ display: 'flex', justifyContent: 'space-between' }}>
//                   <label htmlFor="password">Password</label>
//                   <Link to="/forgotpassword" style={{ fontSize: '14px', color: '#007bff' }}>
//                     <p>Forgot Password?</p>
//                   </Link>
//                 </div>
//                 <input
//                   type="password"
//                   id="password"
//                   placeholder="Enter Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
//                 />
//               </div>
//             </div>
//             <button className='btn-general' type="submit" style={{ width: '90%', padding: '12px', backgroundColor: '#007bff', color: '#fff', borderRadius: '5px', border: 'none' }}>
//               Login
//             </button>
//           </form>

//           {error && <div className="setError" style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>{error}</div>} {/* Show error message if exists */}

//           <div className="login" style={{ textAlign: 'center', marginTop: '20px' }}>
//             <h1>
//               Don't have an account?
//               <Link to="/companyregister" style={{ color: '#007bff' }}>
//                 <span> Signup</span>
//               </Link>
//             </h1>
//           </div>
//         </div>
//       </div>

//       <div style={{ flex: 1 }}>
//         <img src={SideImage} alt="Login side image" style={{ width: '100%', height: '100vh', objectFit: 'cover' }} />
//       </div>
//     </div>
//   );
// };

// export default HRlogin;


import React, { useState } from 'react';
import './custom.css'; // Keep your custom styles
import hrmLogo from '../assets/hrm logo.png'; // Ensure logo path is correct
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import axios from 'axios';
import Sideimage from '../assets/Sideimage.png'; // Ensure image path is correct

const HRlogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false); // State to track button state
  const navigate = useNavigate(); // Initialize the navigate function

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form reload

    // Retrieve company_id from local storage
    const companyId = localStorage.getItem('company_id');
    if (!companyId) {
      setError('Company ID not found. Please log in again.');
      return;
    }

    const userType = 'employee'; // Set user type

    try {
      setIsLoggingIn(true); // Set logging in state to true

      // Create a URLSearchParams object to format the body
      const body = new URLSearchParams();
      body.append('username', username);
      body.append('password', password);

      // Make API request
      const response = await axios.post(
        `https://proximahr.onrender.com/company/login?company_id=${companyId}&user_type=${userType}`,
        body, 
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      console.log('Login successful:', response.data); // ✅ Debugging log

      // Ensure the API response contains the correct access token
      const token = response.data.access_token; 
      if (token) {
        localStorage.setItem('employeeAuthToken', JSON.stringify({ token })); // Store token as 'employeeAuthToken'
        console.log("Stored employeeAuthToken:", localStorage.getItem("employeeAuthToken")); // ✅ Debugging log
        navigate('/EmployeeDashboard'); // Redirect to dashboard
      } else {
        setError("No token received. Please contact support.");
      }
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      setError('Incorrect email or password. Please try again.');
    } finally {
      setIsLoggingIn(false); // Reset logging in state to false
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
      <div style={{ flex: 1, padding: '20px' }}>
        <div className="logo" style={{ marginBottom: '5px', textAlign: 'left', marginLeft: '-190px' }}>
          <img src={hrmLogo} alt="HRM Logo" style={{ width: '25px', height: 'auto' }} />
          <h1>Proxima HR</h1>
        </div>

        <div className="container" style={{ width: '100%', maxWidth: '400px', margin: 'auto' }}>
          <div className="text" style={{ marginBottom: '20px', fontSize: '24px', textAlign: 'left' }}>
            Access Your Employee Portal
          </div>
          <form onSubmit={handleSubmit}>
            <div className="inputs">
              <div className="input-2" style={{ marginBottom: '10px' }}>
                <label htmlFor="username">Employee ID</label>
                <input
                  type="text"
                  id="username"
                  placeholder="Enter Employee ID"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
              </div>

              <div className="input-2" style={{ marginBottom: '20px' }}>
                <div className="forgotpassword" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <label htmlFor="password">Password</label>
                  <Link to="/forgotpassword" style={{ fontSize: '14px', color: '#007bff' }}>
                    <p>Forgot Password?</p>
                  </Link>
                </div>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
              </div>
            </div>
            <button
              className='btn-general'
              type="submit"
              style={{
                width: '90%',
                padding: '12px',
                backgroundColor: '#007bff',
                color: '#fff',
                borderRadius: '5px',
                border: 'none'
              }}
              disabled={isLoggingIn} // Disable button while logging in
            >
              {isLoggingIn ? 'Logging in...' : 'Login'} {/* Show "Logging in..." if submitting */}
            </button>
          </form>

          {error && <div className="setError" style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>{error}</div>} {/* Show error message if exists */}

          <div className="login" style={{ textAlign: 'center', marginTop: '20px' }}>
            <h1>
              Don't have an account?
              <Link to="/companyregister" style={{ color: '#007bff' }}>
                <span> Signup</span>
              </Link>
            </h1>
          </div>
        </div>
      </div>

      <div style={{ flex: 1 }}>
        <img src={Sideimage} alt="Login side image" style={{ width: '100%', height: '100vh', objectFit: 'cover' }} />
      </div>
    </div>
  );
};

export default HRlogin;
