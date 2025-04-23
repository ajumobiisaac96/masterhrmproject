import React, { useState } from 'react';
import './custom.css'; // Keep your custom styles
import hrmLogo from '../assets/hrm logo.png'; // Ensure logo path is correct
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import axios from 'axios';
import Sideimage from '../assets/Sideimage.png'; // Ensure image path is correct
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Ensure the toast CSS is imported

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
        'https://proximahr.onrender.com/api/v2/company/login', // Ensure this is the correct endpoint for login
        new URLSearchParams({
          username,
          password,
          grant_type: 'password',  // Ensure the API is expecting this
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
  
      const { access_token, token_type } = response.data;
  
      if (access_token && token_type) {
        // Store access token in localStorage for employee
        localStorage.setItem('employeeAuthToken', JSON.stringify({ access_token, token_type }));
  
        // Show success message
        toast.success('Login successful! Redirecting to your dashboard...', {
          autoClose: 15000,
          position: 'top-right',
          className: 'custom-toast-success',
        });
  
        // Redirect after success
        setTimeout(() => {
          navigate('/EmployeeDashboard'); // Ensure the correct path for the dashboard
        }, 2000); // Delay for toast to show
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
      <div style={{ flex: 1, padding: '20px' }}>
        <div className="logo" style={{ marginBottom: '5px', textAlign: 'left', marginLeft: '-190px' }}>
          <Link to={'/LandingPage'}><img src={hrmLogo} alt="HRM Logo" style={{ width: '25px', height: 'auto' }} /></Link>
          <h1>Proxima HR</h1>
        </div>

        <div className="container" style={{ width: '100%', maxWidth: '400px', margin: 'auto' }}>
          <div className="text" style={{ marginBottom: '20px', fontSize: '24px', textAlign: 'left' }}>
            Access Your Employee Portal
          </div>
          <form onSubmit={handleSubmit}>
            <div className="inputs">
              <div className="input-2" style={{ marginBottom: '10px' }}>
                <label htmlFor="username">Enter Email</label>
                <input
                  type="text"
                  id="username"
                  placeholder="Enter Email"
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
              className="btn-general"
              type="submit"
              style={{
                width: '90%',
                padding: '12px',
                backgroundColor: '#007bff',
                color: '#fff',
                borderRadius: '5px',
                border: 'none',
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </form>
{/* 
          <div className="login" style={{ textAlign: 'center', marginTop: '20px' }}>
            <h1>
              Don't have an account?
              <Link to="/companyregister" style={{ color: '#007bff' }}>
                <span> Signup</span>
              </Link>
            </h1>
          </div> */}
        </div>
      </div>

      <div style={{ flex: 1 }}>
        <img src={Sideimage} alt="Login side image" style={{ width: '100%', height: '100vh', objectFit: 'cover' }} />
      </div>

      <ToastContainer /> {/* ToastContainer added to the component tree */}
    </div>
  );
};

export default HRlogin;

















// import React, { useState } from 'react';
// import './custom.css'; // Keep your custom styles
// import hrmLogo from '../assets/hrm logo.png'; // Ensure logo path is correct
// import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
// import axios from 'axios';
// import Sideimage from '../assets/Sideimage.png'; // Ensure image path is correct
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'; // Ensure the toast CSS is imported

// const HRlogin = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!username || !password) {
//       toast.error('Both username and password are required.', {
//         autoClose: 15000,
//         position: 'top-right',
//         className: 'custom-toast-error',
//       });
//       return;
//     }

//     try {
//       setIsSubmitting(true);

//       // Sending login request with required parameters
//       const response = await axios.post(
//         'https://proximahr.onrender.com/api/v2/company/login',
//         new URLSearchParams({
//           username,
//           password,
//           grant_type: 'password',
//         }),
//         {
//           headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//           },
//         }
//       );

//       const { access_token, token_type } = response.data;

//       if (access_token && token_type) {
//         // Store access token in localStorage
//         localStorage.setItem('employeeAuthToken', JSON.stringify({ access_token, token_type }));

//         // Show success message and navigate to dashboard
//         toast.success('Login successful! Redirecting to your dashboard...', {
//           autoClose: 15000,
//           position: 'top-right',
//           className: 'custom-toast-success',
//         });

//         // Delay for toast to show before redirecting
//         setTimeout(() => {
//           navigate('/EmployeeDashboard'); // Redirect to dashboard after success
//         }, 2000); // 2-second delay to allow backend to update
//       } else {
//         toast.error('No token received. Please contact support.', {
//           autoClose: 15000,
//           position: 'top-right',
//           className: 'custom-toast-error',
//         });
//       }
//     } catch (error) {
//       console.error('Login error:', error.response ? error.response.data : error.message);
//       toast.error('Incorrect username or password. Please try again.', {
//         autoClose: 15000,
//         position: 'top-right',
//         className: 'custom-toast-error',
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
//       <ToastContainer />
//       <div className="left-side" style={{ flex: 1, padding: '20px' }}>
//         <div className="logo" style={{ marginBottom: '5px', textAlign: 'left', marginLeft: '-190px' }}>
//           <Link to={'/LandingPage'}><img src={hrmLogo} alt="HRM Logo" style={{ width: '25px', height: 'auto' }} /></Link>
//           <h1>Proxima HR</h1>
//         </div>

//         <div className="container" style={{ width: '100%', maxWidth: '400px', margin: 'auto' }}>
//           <div className="text">Access Your Employee Portal</div>
//           <form onSubmit={handleSubmit}>
//             <div className="inputs">
//               <div className="input-2">
//                 <label htmlFor="username">Email</label>
//                 <input
//                   type="text"
//                   id="username"
//                   placeholder="Enter Email"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="input-2">
//                 <div className="forgotpassword">
//                   <label htmlFor="password">Password</label>
//                   <Link to="/forgotpassword">
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
//                 />
//               </div>
//             </div>
//             <button className="btn-general" type="submit" disabled={isSubmitting}>
//               {isSubmitting ? 'Logging in...' : 'Login'}
//             </button>
//           </form>

//           <div className="login">
//             <h1>
//               Don't have an account?
//               <Link to="/companyregister">
//                 <span> Signup</span>
//               </Link>
//             </h1>
//           </div>
//         </div>
//       </div>

//       <div className="right-side" style={{ flex: 1 }}>
//         <img src={Sideimage} alt="Login side image" style={{ width: '100%', height: '100vh', objectFit: 'cover' }} />
//       </div>
//     </div>
//   );
// };

// export default HRlogin;
