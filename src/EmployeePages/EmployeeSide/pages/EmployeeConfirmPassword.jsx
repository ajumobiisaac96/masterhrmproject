// import React, { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import '../../styles/custom.css';
// import hrmLogo from '../../assets/hrm logo.JPG';
// import Sideimage from '../../assets/SideImage2.png'; // Image for right-side layout
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Link } from 'react-router-dom';

// const ResetPassword = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Retrieve email from sessionStorage or query params
//   const queryParams = new URLSearchParams(location.search);
//   const email = queryParams.get('email') || sessionStorage.getItem('reset_email');

//   const [new_password, setNewPassword] = useState('');
//   const [confirm_password, setConfirmPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleResetPassword = async (e) => {
//     e.preventDefault();
  
//     // Form validation
//     if (!new_password || !confirm_password) {
//       toast.error('Both password fields are required.', {
//         autoClose: 15000,
//         position: 'top-right',
//         className: 'custom-toast-error',
//       });
//       return;
//     }
  
//     if (new_password.length < 8) {
//       toast.error('Password must be at least 8 characters long.', {
//         autoClose: 15000,
//         position: 'top-right',
//         className: 'custom-toast-error',
//       });
//       return;
//     }
  
//     // Password regex: At least one lowercase, one uppercase, and one number
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
//     if (!passwordRegex.test(new_password)) {
//       toast.error('Password must contain at least one lowercase letter, one uppercase letter, and one number.', {
//         autoClose: 15000,
//         position: 'top-right',
//         className: 'custom-toast-error',
//       });
//       return;
//     }
  
//     if (new_password !== confirm_password) {
//       toast.error('Passwords do not match.', {
//         autoClose: 15000,
//         position: 'top-right',
//         className: 'custom-toast-error',
//       });
//       return;
//     }
  
//     setLoading(true);
  
//     try {
//       const response = await fetch(`https://proximahr.onrender.com/company/reset-password?email=${encodeURIComponent(email)}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ new_password, confirm_password }),
//       });

//       const data = await response.json();
  
//       if (response.ok) {
//         toast.success('Password reset successfully! Redirecting to login page...', {
//           autoClose: 15000,
//           position: 'top-right',
//           className: 'custom-toast-success',
//         });
//         setTimeout(() => navigate('/login'), 2000); // Redirect after a short delay
//       } else {
//         toast.error(data.message || 'Failed to reset password. Please try again.', {
//           autoClose: 15000,
//           position: 'top-right',
//           className: 'custom-toast-error',
//         });
//       }
//     } catch (err) {
//       console.error('Error:', err);
//       toast.error('An error occurred. Please try again.', {
//         autoClose: 15000,
//         position: 'top-right',
//         className: 'custom-toast-error',
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
//       <ToastContainer />
//       <div className="left-side" style={{ flex: 1, padding: '20px' }}>
//         <div className="logo" style={{ marginBottom: '5px', textAlign: 'left', marginLeft: '-190px' }}>
//         <Link to={'/LandingPage'}><img src={hrmLogo} alt="HRM Logo" style={{ width: '25px', height: 'auto' }} /></Link>
//           <h1>Proxima HR</h1>
//         </div>

//         <div className="container" style={{ width: '100%', maxWidth: '400px', margin: 'auto' }}>
//           <div className="text">Reset Password</div>
//           <form onSubmit={handleResetPassword}>
//             <div className="input-2">
//               <label htmlFor="new-password">New Password</label>
//               <input
//                 type="password"
//                 id="new-password"
//                 placeholder="Enter New Password"
//                 value={new_password}
//                 onChange={(e) => setNewPassword(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="input-2">
//               <label htmlFor="confirm-password">Confirm Password</label>
//               <input
//                 type="password"
//                 id="confirm-password"
//                 placeholder="Confirm Password"
//                 value={confirm_password}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 required
//               />
//             </div>
//             <button className='btn-general' type="submit" disabled={loading}>
//               {loading ? 'Resetting...' : 'Reset Password'}
//             </button>
//           </form>
//         </div>
//       </div>

//       <div className="right-side" style={{ flex: 1 }}>
//         <img src={Sideimage} alt="Reset Password Side Image" style={{ width: '100%', height: '100vh', objectFit: 'cover' }} />
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;




















import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../../styles/custom.css';
import hrmLogo from '../../../assets/hrm logo.JPG';
import Sideimage from '../../../assets/SideImage2.png'; // Image for right-side layout
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesome
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // Eye icons

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve email from sessionStorage or query params
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email') || sessionStorage.getItem('reset_email');

  const [new_password, setNewPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility

  const handleResetPassword = async (e) => {
    e.preventDefault();
  
    // Form validation
    if (!new_password || !confirm_password) {
      toast.error('Both password fields are required.', {
        autoClose: 15000,
        position: 'top-right',
        className: 'custom-toast-error',
      });
      return;
    }
  
    if (new_password.length < 8) {
      toast.error('Password must be at least 8 characters long.', {
        autoClose: 15000,
        position: 'top-right',
        className: 'custom-toast-error',
      });
      return;
    }
  
    // Password regex: At least one lowercase, one uppercase, and one number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    if (!passwordRegex.test(new_password)) {
      toast.error('Password must contain at least one lowercase letter, one uppercase letter, and one number.', {
        autoClose: 15000,
        position: 'top-right',
        className: 'custom-toast-error',
      });
      return;
    }
  
    if (new_password !== confirm_password) {
      toast.error('Passwords do not match.', {
        autoClose: 15000,
        position: 'top-right',
        className: 'custom-toast-error',
      });
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await fetch(`https://proximahr.onrender.com/company/reset-password?email=${encodeURIComponent(email)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ new_password, confirm_password }),
      });

      const data = await response.json();
  
      if (response.ok) {
        toast.success('Password reset successfully! Redirecting to login page...', {
          autoClose: 15000,
          position: 'top-right',
          className: 'custom-toast-success',
        });
        setTimeout(() => navigate('/EmployeeLogin'), 2000); // Redirect after a short delay
      } else {
        toast.error(data.message || 'Failed to reset password. Please try again.', {
          autoClose: 15000,
          position: 'top-right',
          className: 'custom-toast-error',
        });
      }
    } catch (err) {
      console.error('Error:', err);
      toast.error('An error occurred. Please try again.', {
        autoClose: 15000,
        position: 'top-right',
        className: 'custom-toast-error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
      <ToastContainer />
      <div className="left-side" style={{ flex: 1, padding: '20px' }}>
        <div className="logo" style={{ marginBottom: '5px', textAlign: 'left', marginLeft: '-190px' }}>
          <Link to={'/LandingPage'}><img src={hrmLogo} alt="HRM Logo" style={{ width: '25px', height: 'auto' }} /></Link>
          <h1>Proxima HR</h1>
        </div>

        <div className="container" style={{ width: '100%', maxWidth: '400px', margin: 'auto' }}>
          <div className="text">Reset Password</div>
          <form onSubmit={handleResetPassword}>
            <div className="input-2">
              <label htmlFor="new-password">New Password</label>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type={passwordVisible ? 'text' : 'password'} // Toggle between text and password input
                  id="new-password"
                  placeholder="Enter New Password"
                  value={new_password}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  style={{ width: '100%' }}
                />
                <FontAwesomeIcon
                  icon={passwordVisible ? faEyeSlash : faEye} // Switch between eye and eye-slash icon
                  onClick={() => setPasswordVisible(!passwordVisible)} // Toggle password visibility
                  style={{ cursor: 'pointer', marginLeft: '10px' }}
                />
              </div>
            </div>
            <div className="input-2">
              <label htmlFor="confirm-password">Confirm Password</label>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type={passwordVisible ? 'text' : 'password'} // Toggle between text and password input
                  id="confirm-password"
                  placeholder="Confirm Password"
                  value={confirm_password}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  style={{ width: '100%' }}
                />
                <FontAwesomeIcon
                  icon={passwordVisible ? faEyeSlash : faEye} // Switch between eye and eye-slash icon
                  onClick={() => setPasswordVisible(!passwordVisible)} // Toggle password visibility
                  style={{ cursor: 'pointer', marginLeft: '10px' }}
                />
              </div>
            </div>
            <button className='btn-general' type="submit" disabled={loading}>
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        </div>
      </div>

      <div className="right-side" style={{ flex: 1 }}>
        <img src={Sideimage} alt="Reset Password Side Image" style={{ width: '100%', height: '100vh', objectFit: 'cover' }} />
      </div>
    </div>
  );
};

export default ResetPassword;
