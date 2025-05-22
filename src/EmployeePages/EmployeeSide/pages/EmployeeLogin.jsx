import React, { useState } from 'react';
import './custom.css';
import hrmLogo from '../assets/hrm logo.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sideimage from '../assets/Sideimage.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

const fadeInLeft = {
  initial: { opacity: 0, x: -100 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: "easeOut" }
};

const fadeInRight = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: "easeOut" }
};

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" }
};

const HRlogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isEmployeeAuthenticated, setIsEmployeeAuthenticated] = useState(false);
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

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

      const response = await axios.post(
        'https://proximahr.onrender.com/api/v2/company/login',
        new URLSearchParams({
          username,
          password,
          grant_type: 'password',
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      const { access_token, token_type } = response.data;

      if (access_token && token_type) {
        localStorage.setItem('employeeAuthToken', JSON.stringify({ access_token, token_type }));
        setIsEmployeeAuthenticated(true);
        toast.success('Login successful! Redirecting to your dashboard...', {
          autoClose: 15000,
          position: 'top-right',
          className: 'custom-toast-success',
        });
        setTimeout(() => {
          navigate('/EmployeeDashboard');
        }, 2000);
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
    <motion.div
      style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div style={{ flex: 1, padding: '20px' }} {...fadeInLeft}>
        <div className="logo" style={{textAlign: 'left', marginLeft: '-190px', marginBottom: '20px' }}>
          <Link to={'/LandingPage'}><img src={hrmLogo} alt="HRM Logo" style={{ width: '25px', height: 'auto' }} /></Link>
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

        <motion.div className="container" style={{ width: '100%', maxWidth: '400px', margin: 'auto' }} {...fadeInUp}>
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
                  <Link to="/EmployeeForgotpassword" style={{ fontSize: '14px', color: '#007bff' }}>
                    <p>Forgot Password?</p>
                  </Link>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type={passwordVisible ? 'text' : 'password'}
                    id="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ width: '100%', border: '1px solid #ccc' }}
                  />
                  <FontAwesomeIcon
                    icon={passwordVisible ? faEyeSlash : faEye}
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    style={{ cursor: 'pointer', marginLeft: '10px' }}
                  />
                </div>
                {error.password && <div className="error-message">{error.password}</div>}
              </div>
            </div>
            <motion.button
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>

      <motion.div style={{ flex: 1 }} {...fadeInRight}>
        <img src={Sideimage} alt="Login side image" style={{ width: '100%', height: '100vh', objectFit: 'cover' }} />
      </motion.div>

      <ToastContainer />
    </motion.div>
  );
};

export default HRlogin;
