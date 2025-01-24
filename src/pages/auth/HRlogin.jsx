import React, { useState } from 'react';
import '../../styles/custom.css'; // Keep your custom styles
import hrmLogo from '../../assets/hrm logo.JPG'; // Ensure logo path is correct
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import axios from 'axios';

const HRlogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize the navigate function

  const handleSubmit = async (e) => {
  e.preventDefault(); // Prevent form reload

  const companyId = localStorage.getItem('company_id'); // Retrieve company_id from local storage
  if (!companyId) {
    setError('Company ID not found. Please log in again.');
    return;
  }

  const userType = 'admin'; // Set user type

  try {
    // Create a URLSearchParams object to format the body
    const body = new URLSearchParams();
    body.append('username', username);
    body.append('password', password);

    // Include query parameters in the URL
    const response = await axios.post(
      `https://proximahr.onrender.com/company/login?company_id=${companyId}&user_type=${userType}`, // Add query params here
      body, // Pass the body
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // Ensure proper Content-Type
        },
      }
    );

    console.log('Login successful:', response.data);
    navigate('/dashboard'); // Redirect to the dashboard on success
  } catch (error) {
    if (error.response) {
      console.error('Backend responded with error:', error.response.data);
      setError('Incorrect email or password. Please try again.');
    } else {
      console.error('Request failed:', error);
      setError('Incorrect email or password. Please try again.');
    }
  }
};

  
return (
    <div>
      <div className="logo">
        <img src={hrmLogo} alt="HRM Logo" />
        <h1>Proxima HR</h1>
      </div>

      <div className="container">
        <div className="text">Login to Your Dashboard</div>
        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <div className="input-2">
              <label htmlFor="username">Email</label>
              <input
                type="text"
                id="username"
                placeholder="Enter Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="input-2">
              <div className="forgotpassword">
                <label htmlFor="password">Password</label>
                <Link to="/forgotpassword">
                  <p>Forgot Password?</p>
                </Link>
              </div>
              <input
                type="password"
                id="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button className='btn-general' type="submit">Login</button>
        </form>

        <div className="setError">{error}</div>

        <div className="login">
          <h1>
            Don't have an account?
            <Link to="/register">
              <span>Signup</span>
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default HRlogin;

