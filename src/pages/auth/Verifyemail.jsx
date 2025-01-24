import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/custom.css';
import hrmLogo from '../../assets/hrm logo.JPG';

const Verifyemail = () => {
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Retrieve email from sessionStorage
  const email = sessionStorage.getItem('reset_email');
  
  // If email is not found, you may want to redirect to the forgot password page
  useEffect(() => {
    if (!email) {
      navigate('/forgotpassword'); // Redirect if email is missing
    }
  }, [email, navigate]);

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    if (!verificationCode) {
      setError('Please enter the verification code.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      // Send email as query parameter and verification code in the body
      const response = await fetch(`https://proximahr.onrender.com/company/verify-password-reset-verification-code?email=${email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: verificationCode }), // Send only the verification code
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/ConfirmPassword'); // Redirect to confirm password page
      } else {
        setError(data.message || 'Failed to verify code. Please try again.');
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
              className={error ? 'input-error' : ''}
            />
            {error && (
              <p style={{ color: 'red' }} aria-live="assertive">
                {error}
              </p>
            )}
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Verifying...' : 'Verify Code'}
          </button>
        </form>
        <div className="login">
          <h1>
            Didn't receive a code? <span>Resend code</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Verifyemail;
