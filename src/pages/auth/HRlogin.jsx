import React, { useState } from 'react';
import '../../styles/custom.css';
import hrmLogo from '../../assets/hrm logo.JPG';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sideimage from '../../assets/SideImage2.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesome
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // Eye icons

const HRlogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
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
          grant_type: 'password', // Ensure the API is expecting this
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
        <div className="logo" style={{ marginBottom: '20px', textAlign: 'left', marginLeft: '-190px' }}>
          <Link to={'/LandingPage'}>
            <img src={hrmLogo} alt="HRM Logo" style={{ width: '25px', height: 'auto' }} />
          </Link>
          <h1>Proxima HR</h1>
        </div>

        {/* Toggle Buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#4E4E4E',
          borderRadius: '10px',
          padding: '5px',
          marginBottom: '20px',
          marginTop: '40px',
          width: 'fit-content',
          margin: '0 auto',
        }}>
          <Link
            to="/login"
            style={{
              padding: '10px 20px',
              borderRadius: '5px 0 0 5px',
              textDecoration: 'none',
              fontWeight: 'bold',
              backgroundColor: window.location.pathname === '/login' ? '#007BFF' : 'transparent',
              color: window.location.pathname === '/login' ? 'white' : '#C0C0C0',
              transition: 'all 0.3s ease',
            }}
          >
            Admin Login
          </Link>
          <Link
            to="/EmployeeLogin"
            style={{
              padding: '10px 20px',
              borderRadius: '0 5px 5px 0',
              textDecoration: 'none',
              fontWeight: 'bold',
              backgroundColor: window.location.pathname === '/EmployeeLogin' ? '#007BFF' : 'transparent',
              color: window.location.pathname === '/EmployeeLogin' ? 'white' : '#C0C0C0',
              transition: 'all 0.3s ease',
            }}
          >
            Employee Login
          </Link>
        </div>

        <div className="container" style={{ width: '100%', maxWidth: '400px', margin: 'auto' }}>
          <div className="text" style={{ marginBottom: '20px', fontSize: '24px', textAlign: 'left' }}>
            Login to Your Dashboard
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
                  <Link to="/EmployeeForgotpassword" style={{ fontSize: '14px', color: '#007bff' }}>
                    <p>Forgot Password?</p>
                  </Link>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type={passwordVisible ? 'text' : 'password'} // Toggle between text and password input
                    id="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ width: '100%', border: '1px solid #ccc' }}
                  />
                  <FontAwesomeIcon
                    icon={passwordVisible ? faEyeSlash : faEye} // Switch between eye and eye-slash icon
                    onClick={() => setPasswordVisible(!passwordVisible)} // Toggle password visibility
                    style={{ cursor: 'pointer', marginLeft: '10px' }}
                  />
                </div>
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