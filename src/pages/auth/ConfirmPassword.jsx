import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/custom.css';
import hrmLogo from '../../assets/hrm logo.JPG';

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve email from sessionStorage or query params
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email') || sessionStorage.getItem('reset_email');

  const [new_password, setNewPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
  
    if (!new_password || !confirm_password) {
      setError('Both password fields are required.');
      return;
    }
  
    if (new_password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
  
    // Validate password contains at least one lowercase, one uppercase letter, and one number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    if (!passwordRegex.test(new_password)) {
      setError('Password must contain at least one lowercase letter, one uppercase letter, and one number.');
      return;
    }
  
    if (new_password !== confirm_password) {
      setError('Passwords do not match.');
      return;
    }
  
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`https://proximahr.onrender.com/company/reset-password?email=${encodeURIComponent(email)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ new_password, confirm_password }),
      });
  
      const data = await response.json();
      console.log('Backend Response:', response);
      console.log('Backend Response Data:', data);
  
      if (response.ok) {
        navigate('/login');
      } else {
        setError(data.message || 'Failed to reset password. Please try again.');
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
        <div className="text">Reset Password</div>
        <form onSubmit={handleResetPassword}>
          <div className="input-2">
            <label htmlFor="new-password">New Password</label>
            <input
              type="password"
              id="new-password"
              placeholder="Enter New Password"
              value={new_password}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-2">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              placeholder="Confirm Password"
              value={confirm_password}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <p className= 'setError' p style={{ color: 'red'}} aria-live="assertive">
              {error}
            </p>
          )}
          <button className='btn-general' type="submit" disabled={loading}>
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
