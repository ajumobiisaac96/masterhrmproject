import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/custom.css';
import hrmLogo from '../../assets/hrm logo.JPG';
import { Link, useNavigate } from 'react-router-dom';
import Sideimage from '../../assets/Sideimage.png';
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

const HRregister = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    admin_code: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { first_name, last_name, email, password, admin_code } = formData;
    if (!first_name || !last_name || !email || !password || !admin_code) {
      toast.error('All fields are required.', {
        autoClose: 15000,
        position: 'top-right',
        className: 'custom-toast-error',
      });
      return;
    }

    const company_id = localStorage.getItem('company_id')?.trim();
    if (!company_id) {
      toast.error('Company ID is missing. Please try again.', {
        autoClose: 15000,
        position: 'top-right',
        className: 'custom-toast-error',
      });
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await axios.post(
        `https://proximahr.onrender.com/admin/create-admin?company_id=${company_id}`,
        formData
      );

      toast.success('Team created successfully! Redirecting to login...', {
        autoClose: 15000,
        position: 'top-right',
        className: 'custom-toast-success',
      });

      setTimeout(() => {
        navigate('/login');
      }, 2000);

      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        admin_code: '',
      });

    } catch (error) {
      console.error('Error response:', error.response?.data || error.message);
      const backendMessage = error?.response?.data?.message || 'An error occurred. Please try again.';
      toast.error(backendMessage, {
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
      <ToastContainer />
      <motion.div className="left-side" style={{ flex: 1, padding: '20px' }} {...fadeInLeft}>
        <div className="logo" style={{ marginBottom: '5px', textAlign: 'left', marginLeft: '-190px' }}>
          <Link to={'/LandingPage'}><img src={hrmLogo} alt="HRM Logo" style={{ width: '25px', height: 'auto' }} /></Link>
          <h1>Proxima HR</h1>
        </div>

        <motion.div className="container" style={{ width: '100%', maxWidth: '400px', margin: 'auto' }} {...fadeInUp}>
          <div className="text" >Build Your Team with Ease</div>
          {/* Progress Bar */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px', marginTop: '20px', width: '100%', maxWidth: '400px', margin: '0 auto' }}>
            {/* Step 1 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                backgroundColor: '#007BFF',
                color: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontWeight: 'bold',
              }}>
                1
              </div>
            </div>
            {/* Line */}
            <div style={{
              flex: 1,
              height: '5px',
              backgroundColor: '#007BFF',
              margin: '0 10px',
              borderRadius: '5px',
            }}></div>
            {/* Step 2 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                backgroundColor: '#007BFF',
                color: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontWeight: 'bold',
              }}>
                2
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px', marginTop: '20px' }}>
            <div className="inputs">
              <div className="input-1">
                <div className="left-input">
                  <label htmlFor="first_name">First Name</label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    placeholder="Enter First Name"
                  />
                </div>
                <div className="right-input">
                  <label htmlFor="last_name">Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    placeholder="Enter Last Name"
                  />
                </div>
              </div>

              <div className="input-2">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter Email"
                />
              </div>
              <div className="input-2">
                <label htmlFor="password">Password</label>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type={passwordVisible ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter Password"
                    style={{ width: '100%' }}
                  />
                  <FontAwesomeIcon
                    icon={passwordVisible ? faEyeSlash : faEye}
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    style={{ cursor: 'pointer', marginLeft: '10px' }}
                  />
                </div>
              </div>
              <div className="input-2">
                <label htmlFor="admin_code">Company Verification Code</label>
                <input
                  type="text"
                  name="admin_code"
                  value={formData.admin_code}
                  onChange={handleInputChange}
                  placeholder="Enter Company Verification Code"
                />
              </div>
            </div>
            <motion.button
              className='btn-general'
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ width: '100%', marginTop: '20px' }}
            >
              {isSubmitting ? 'Creating an account...' : 'Create an Account'}
            </motion.button>
          </form>

          <div className="login">
            <h1>
              Already have an account? <Link to="/login"><span>Log in</span></Link>
            </h1>
          </div>
        </motion.div>
      </motion.div>

      <motion.div className='right-side' style={{ flex: 1 }} {...fadeInRight}>
        <img src={Sideimage} alt="Login side image" style={{ width: '100%', height: '100vh', objectFit: 'cover' }} />
      </motion.div>
    </motion.div>
  );
};

export default HRregister;
