// import React, { useState } from 'react';
// import '../../styles/custom.css'; // Keep your custom styles
// import hrmLogo from '../../assets/hrm logo.JPG'; // Ensure logo path is correct
// import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
// import axios from 'axios';

// const HRlogin = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate(); // Initialize the navigate function

//   const handleSubmit = async (e) => {
//   e.preventDefault(); // Prevent form reload

//   const companyId = localStorage.getItem('company_id'); // Retrieve company_id from local storage
//   if (!companyId) {
//     setError('Company ID not found. Please log in again.');
//     return;
//   }

//   const userType = 'admin'; // Set user type

//   try {
//     // Create a URLSearchParams object to format the body
//     const body = new URLSearchParams();
//     body.append('username', username);
//     body.append('password', password);

//     // Include query parameters in the URL
//     const response = await axios.post(
//       `https://proximahr.onrender.com/company/login?company_id=${companyId}&user_type=${userType}`, // Add query params here
//       body, // Pass the body
//       {
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded', // Ensure proper Content-Type
//         },
//       }
//     );

//     console.log('Login successful:', response.data);
//     navigate('/dashboard'); // Redirect to the dashboard on success
//   } catch (error) {
//     if (error.response) {
//       console.error('Backend responded with error:', error.response.data);
//       setError('Incorrect email or password. Please try again.');
//     } else {
//       console.error('Request failed:', error);
//       setError('Incorrect email or password. Please try again.');
//     }
//   }
// };

  
// return (
//     <div>
//       <div className="logo">
//         <img src={hrmLogo} alt="HRM Logo" />
//         <h1>Proxima HR</h1>
//       </div>

//       <div className="container">
//         <div className="text">Login to Your Dashboard</div>
//         <form onSubmit={handleSubmit}>
//           <div className="inputs">
//             <div className="input-2">
//               <label htmlFor="username">Email</label>
//               <input
//                 type="text"
//                 id="username"
//                 placeholder="Enter Email"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//               />
//             </div>

//             <div className="input-2">
//               <div className="forgotpassword">
//                 <label htmlFor="password">Password</label>
//                 <Link to="/forgotpassword">
//                   <p>Forgot Password?</p>
//                 </Link>
//               </div>
//               <input
//                 type="password"
//                 id="password"
//                 placeholder="Enter Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//           </div>
//           <button className='btn-general' type="submit">Login</button>
//         </form>

//         <div className="setError">{error}</div>

//         <div className="login">
//           <h1>
//             Don't have an account?
//             <Link to="/register">
//               <span>Signup</span>
//             </Link>
//           </h1>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HRlogin;

















// import React, { useState } from 'react';
// import '../../styles/custom.css'; // Keep your custom styles
// import hrmLogo from '../../assets/hrm logo.JPG'; // Ensure logo path is correct
// import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
// import axios from 'axios';

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

//     const userType = 'admin'; // Set user type

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
//         navigate('/dashboard'); // Redirect to dashboard
//       } else {
//         setError("No token received. Please contact support.");
//       }

//     } catch (error) {
//       console.error('Login error:', error.response ? error.response.data : error.message);
//       setError('Incorrect email or password. Please try again.');
//     }
//   };

//   return (
//     <div>
//       <div className="logo">
//         <img src={hrmLogo} alt="HRM Logo" />
//         <h1>Proxima HR</h1>
//       </div>

//       <div className="container">
//         <div className="text">Login to Your Dashboard</div>
//         <form onSubmit={handleSubmit}>
//           <div className="inputs">
//             <div className="input-2">
//               <label htmlFor="username">Email</label>
//               <input
//                 type="text"
//                 id="username"
//                 placeholder="Enter Email"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="input-2">
//               <div className="forgotpassword">
//                 <label htmlFor="password">Password</label>
//                 <Link to="/forgotpassword">
//                   <p>Forgot Password?</p>
//                 </Link>
//               </div>
//               <input
//                 type="password"
//                 id="password"
//                 placeholder="Enter Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>
//           </div>
//           <button className='btn-general' type="submit">Login</button>
//         </form>

//         {error && <div className="setError">{error}</div>} {/* Show error message if exists */}

//         <div className="login">
//           <h1>
//             Don't have an account?
//             <Link to="/companyregister">
//               <span> Signup</span>
//             </Link>
//           </h1>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HRlogin;
















import React, { useState } from 'react';
import '../../styles/custom.css';
import hrmLogo from '../../assets/hrm logo.JPG';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sideimage from '../../assets/SideImage2.png'; // Image for right-side layout
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HRlogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation: Ensure both fields are filled
    if (!username || !password) {
      toast.error('Both username and password are required.', {
        autoClose: 15000,
        position: 'top-right',
        className: 'custom-toast-error',
      });
      return;
    }

    try {
      setIsSubmitting(true);

      // Sending login request with required parameters
      const response = await axios.post(
        'https://proximahr.onrender.com/api/v2/company/login',
        new URLSearchParams({
          username,
          password,
          grant_type: 'password',  // Grant type required for the request
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      const { access_token, token_type } = response.data;

      if (access_token && token_type) {
        // Store access token in localStorage
        localStorage.setItem('authData', JSON.stringify({ access_token, token_type }));

        // Show success message and navigate to dashboard
        toast.success('Login successful! Redirecting to your dashboard...', {
          autoClose: 15000,
          position: 'top-right',
          className: 'custom-toast-success',
        });

        setTimeout(() => {
          navigate('/dashboard'); // Redirect after success
        }, 2000); // Delay the redirect so the success toast can show

      } else {
        toast.error('No token received. Please contact support.', {
          autoClose: 15000,
          position: 'top-right',
          className: 'custom-toast-error',
        });
      }
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      toast.error('Incorrect username or password. Please try again.', {
        autoClose: 15000,
        position: 'top-right',
        className: 'custom-toast-error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
      <ToastContainer />
      <div className="left-side" style={{ flex: 1, padding: '20px' }}>
        <div className="logo" style={{ marginBottom: '5px', textAlign: 'left', marginLeft: '-190px' }}>
          <img src={hrmLogo} alt="HRM Logo" style={{ width: '25px', height: 'auto' }} />
          <h1>Proxima HR</h1>
        </div>

        <div className="container" style={{ width: '100%', maxWidth: '400px', margin: 'auto' }}>
          <div className="text">Login to Your Dashboard</div>
          <form onSubmit={handleSubmit}>
            <div className="inputs">
              <div className="input-2">
                <label htmlFor="username">Email</label>
                <input
                  type="text"
                  id="username"
                  placeholder="Enter Email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="input-2">
                <div className="forgotpassword">
                  <label htmlFor="password">Password</label>
                  <Link to="/forgotpassword">
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
                />
              </div>
            </div>
            <button className='btn-general' type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="login">
            <h1>
              Don't have an account?
              <Link to="/companyregister">
                <span> Signup</span>
              </Link>
            </h1>
          </div>
        </div>
      </div>

      <div className="right-side" style={{ flex: 1 }}>
        <img src={Sideimage} alt="Login side image" style={{ width: '100%', height: '100vh', objectFit: 'cover' }} />
      </div>
    </div>
  );
};

export default HRlogin;

