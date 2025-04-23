// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import '../../styles/custom.css';
// import hrmLogo from '../../assets/hrm logo.JPG';

// const Forgotpassword = () => {
//   const [email, setEmail] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false); // Loading state
//   const navigate = useNavigate();

//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   }
//   const handleSendCode = async (e) => {
//     e.preventDefault();
//     if (!validateEmail(email)) {
//       setError('Please enter a valid email address.');
//       return;
//     }
  
//     setLoading(true);
//     setError('');
//     try {
//       // Call your API endpoint
//       const response = await fetch('https://proximahr.onrender.com/company/send-verification-code-email', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email }), // Send the email as a JSON object
//       });
  
//       const data = await response.json(); // Parse the response
  
//       console.log('Backend Response:', data); // Log the response for debugging
  
//       if (response.ok) {
//         // Success: Navigate to the VerifyEmail page and store email
//         sessionStorage.setItem('reset_email', email);
//         navigate('/verifyemail');
//       } else {
//         // Handle API errors
//         setError(data.message || 'Failed to send code. Please try again.');
//       }
//     } catch (err) {
//       console.error('Error:', err);
//       setError('An error occurred. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   return (
//     <div>
//       <div className="logo">
//         <img src={hrmLogo} alt="HRM Logo" />
//         <h1>Proxima HR</h1>
//       </div>
//       <div className="container">
//         <div className="text">Forgot Your Password?</div>
//         <div className="info">
//           <p>Enter your email address below and we'll send you a code to log in and reset your password.</p>
//         </div>
//         <form onSubmit={handleSendCode}>
//           <div className="input-2">
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               placeholder="Enter Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className={error ? 'input-error' : ''}
//             />
//             {error && (
//               <p style={{ color: 'red' }} aria-live="assertive">
//                 {error}
//               </p>
//             )}
//           </div>
//           <button className='btn-general' type="submit" disabled={loading}>
//             {loading ? 'Sending...' : 'Send Code'}
//           </button>
//         </form>
//         <div className="login">
//           <h1>
//             Remember your Password?{' '}
//             <Link to="/login">
//               <span>Login</span>
//             </Link>
//           </h1>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Forgotpassword;


















import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../../styles/custom.css';
import hrmLogo from '../../../assets/hrm logo.JPG';
import Sideimage from '../../../assets/SideImage2.png'; // Image for right-side layout
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Forgotpassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendCode = async (e) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address.', {
        autoClose: 15000,
        position: 'top-right',
        className: 'custom-toast-error',
      });
      return;
    }

    setLoading(true);
    try {
      // Call your API endpoint
      const response = await fetch('https://proximahr.onrender.com/company/send-verification-code-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }), // Send the email as a JSON object
      });

      const data = await response.json(); // Parse the response

      console.log('Backend Response:', data); // Log the response for debugging

      if (response.ok) {
        // Success: Navigate to the VerifyEmail page and store email
        sessionStorage.setItem('reset_email', email);
        navigate('/EmployeeVerifyemail');

        toast.success('Verification code sent! Please check your email.', {
          autoClose: 15000,
          position: 'top-right',
          className: 'custom-toast-success',
        });
      } else {
        // Handle API errors
        toast.error(data.message || 'Failed to send code. Please try again.', {
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
          <div className="text">Forgot Your Password?</div>
          <div className="info">
            <p>Enter your email address below and we'll send you a code to log in and reset your password.</p>
          </div>
          <form onSubmit={handleSendCode}>
            <div className="input-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button className='btn-general' type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send Code'}
            </button>
          </form>

          <div className="login">
            <h1>
              Remember your Password?{' '}
              <Link to="/login">
                <span>Login</span>
              </Link>
            </h1>
          </div>
        </div>
      </div>

      <div className="right-side" style={{ flex: 1 }}>
        <img src={Sideimage} alt="Forgot Password Side Image" style={{ width: '100%', height: '100vh', objectFit: 'cover' }} />
      </div>
    </div>
  );
};

export default Forgotpassword;
