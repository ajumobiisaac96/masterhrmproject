import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/custom.css';
import hrmLogo from '../../assets/hrm logo.JPG';
import Sideimage from '../../assets/SideImage2.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

const Forgotpassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
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
      const response = await fetch('https://proximahr.onrender.com/company/send-verification-code-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        sessionStorage.setItem('reset_email', email);
        navigate('/verifyemail');
        toast.success('Verification code sent! Please check your email.', {
          autoClose: 15000,
          position: 'top-right',
          className: 'custom-toast-success',
        });
      } else {
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
    <motion.div
      style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <ToastContainer />
      <motion.div className="left-side" style={{ flex: 1, padding: '20px' }} {...fadeInLeft}>
        <div className="logo" style={{ marginBottom: '5px', textAlign: 'left', marginLeft: '-190px' }}>
          <Link to={'/LandingPage'}>
            <img src={hrmLogo} alt="HRM Logo" style={{ width: '25px', height: 'auto' }} />
          </Link>
          <h1>Proxima HR</h1>
        </div>

        <motion.div className="container" style={{ width: '100%', maxWidth: '400px', margin: 'auto' }} {...fadeInUp}>
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
            <motion.button
              className='btn-general'
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ width: '100%', marginTop: '20px' }}
            >
              {loading ? 'Sending...' : 'Send Code'}
            </motion.button>
          </form>

          <div className="login">
            <h1>
              Remember your Password?{' '}
              <Link to="/login">
                <span>Login</span>
              </Link>
            </h1>
          </div>
        </motion.div>
      </motion.div>

      <motion.div className="right-side" style={{ flex: 1 }} {...fadeInRight}>
        <img src={Sideimage} alt="Forgot Password Side Image" style={{ width: '100%', height: '100vh', objectFit: 'cover' }} />
      </motion.div>
    </motion.div>
  );
};

export default Forgotpassword;
