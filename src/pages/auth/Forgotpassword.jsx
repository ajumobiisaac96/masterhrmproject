import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/custom.css';
import hrmLogo from '../../assets/hrm logo.JPG';

const Forgotpassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  const handleSendCode = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
  
    setLoading(true);
    setError('');
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
        navigate('/verifyemail');
      } else {
        // Handle API errors
        setError(data.message || 'Failed to send code. Please try again.');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div>
      <div className="logo">
        <img src={hrmLogo} alt="HRM Logo" />
        <h1>Proxima HR</h1>
      </div>
      <div className="container">
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
              className={error ? 'input-error' : ''}
            />
            {error && (
              <p style={{ color: 'red' }} aria-live="assertive">
                {error}
              </p>
            )}
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
  );
};

export default Forgotpassword;
