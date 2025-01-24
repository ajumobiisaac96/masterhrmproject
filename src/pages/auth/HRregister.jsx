import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/custom.css';
import hrmLogo from '../../assets/hrm logo.JPG';
import { Link, useNavigate } from 'react-router-dom';

const HRregister = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    role: '',
    email: '',
    password: '',
    admin_code: '', // Company Verification Code
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Basic validation
    const { first_name, last_name, role, email, password, admin_code } = formData;
    if (!first_name || !last_name || !role || !email || !password || !admin_code) {
      setErrorMessage('All fields are required.');
      return;
    }
  
    // Get company_id from local storage
    const company_id = localStorage.getItem('company_id').trim(); // Remove any spaces
    console.log(company_id);
  
    // Submit form data with company_id as a query parameter
    axios
      .post(`https://proximahr.onrender.com/admin/create-admin?company_id=${company_id}`, formData)
      .then((response) => {
        console.log('Response from backend:', response); // Log the entire response object
  
        // If you want to log just the response data, you can do this:
        console.log('Response data:', response.data);
  
        // Handle success response
        setSuccessMessage('Team created successfully! You will be redirected to the login page.');
  
        // Redirect to the login page after 2 seconds
        setTimeout(() => {
          navigate('/login');
        }, 2000);
  
        // Clear form data
        setFormData({
          first_name: '',
          last_name: '',
          role: '',
          email: '',
          password: '',
          admin_code: '',
        });
      })
      .catch((error) => {
        console.error('Error details:', error.response || error.message);
        setErrorMessage('Failed to connect to the server. Please try again later.');
      });
  };
  

  return (
    <div>
      <div className="logo">
        <img src={hrmLogo} alt="" />
        <h1>Proxima HR</h1>
      </div>

      <div className="container">
        <div className="text">Build Your Team with Ease</div>
        <form onSubmit={handleSubmit}>
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
              <label htmlFor="role">Role</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                placeholder="Enter Role"
              />
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
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter Password"
              />
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
          <button className='btn-general' type="submit">Create an Account</button>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <div className="login">
          <h1>
            Already have an account? <Link to="/login"><span>Log in</span></Link>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default HRregister;
