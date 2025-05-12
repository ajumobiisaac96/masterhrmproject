import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/custom.css';
import hrmLogo from '../../assets/hrm logo.JPG';
import { toast, ToastContainer } from 'react-toastify';
import Sideimage from '../../assets/SideImage2.png';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
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

const Verifyemail = () => {
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);

  // Retrieve email from sessionStorage
  const email = sessionStorage.getItem('reset_email');

  useEffect(() => {
    if (!email) {
      navigate('/forgotpassword');
    }
  }, [email, navigate]);

  const handleVerifyCode = async (e) => {
    e.preventDefault();

    if (!verificationCode) {
      toast.error('Please enter the verification code.', {
        autoClose: 15000,
        position: 'top-right',
        className: 'custom-toast-error',
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`https://proximahr.onrender.com/company/verify-password-reset-verification-code?email=${email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: verificationCode }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Verification successful! Redirecting to reset password.', {
          autoClose: 15000,
          position: 'top-right',
          className: 'custom-toast-success',
        });
        navigate('/ConfirmPassword');
      } else {
        toast.error(data.message || 'Failed to verify code. Please try again.', {
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
          <div className="text">Verify your email</div>
          <div className="info">
            <p>
              We sent you a six-digit confirmation code to <span>{email || 'your email'}</span>. Please enter it below to confirm your email address.
            </p>
          </div>
          <form onSubmit={handleVerifyCode}>
            <div className="input-2">
              <input
                type="number"
                placeholder="Enter 6-digit code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
              />
            </div>
            <motion.button
              type="submit"
              disabled={loading}
              className='btn-general'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ width: '100%', marginTop: '20px' }}
            >
              {loading ? 'Verifying...' : 'Verify Code'}
            </motion.button>
          </form>
          <div className="login">
            <h1>
              Didn't receive a code? <span>Resend code</span>
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

export default Verifyemail;
