import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/custom.css';
import hrmLogo from '../../assets/hrm logo.JPG';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sideimage from '../../assets/Sideimage.png';

const CompanyRegister = () => {
  const navigate = useNavigate();
  const [companyData, setCompanyData] = useState({
    registration_number: '',
    name: '',
    email: '',
    industry: '',
    country: '',
    state: '',
    town: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyData({ ...companyData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!companyData.registration_number || !companyData.name || !companyData.email || !companyData.industry || !companyData.country || !companyData.state || !companyData.town) {
      toast.error('Please fill in all required fields.', {
        autoClose: 3000,
        position: 'top-right',
      });
      return;
    }

    setIsSubmitting(true);

    axios.post('https://proximahr.onrender.com/api/v2/company/register_company', companyData, {
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        // Extract the company ID from the response
        const companyId = response.data?.data?.registration_number || companyData.registration_number;

        // Log the company ID in the console
        console.log('Company ID:', companyId);

        // Store the company ID in localStorage
        localStorage.setItem('company_id', companyId);

        toast.success('Company registered successfully!', {
          autoClose: 3000,
          position: 'top-right',
        });

        // Navigate to HR Registration (Step 2)
        navigate('/register');
      })
      .catch((error) => {
        // Extract the error message from the backend response
        const backendMessage = error.response?.data?.message || 'Registration failed. Please try again.';

        // Log the error message in the console for debugging
        console.error('Error response:', error.response?.data || error.message);

        // Display the backend error message in the toast
        toast.error(backendMessage, {
          autoClose: 3000,
          position: 'top-right',
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
      <div className="left-side" style={{ flex: 1, padding: '20px' }}>
        <ToastContainer />
        <div className="logo" style={{textAlign: 'left', marginLeft: '-190px', marginBottom:'20px' }}>
          <Link to={'/LandingPage'}>
            <img src={hrmLogo} alt="HRM Logo" style={{ width: '25px', height: 'auto' }} />
          </Link>
          <h1>Proxima HR</h1>
        </div>

        {/* Progress Bar */}
        <div  style={{ display: 'flex', alignItems: 'center', marginBottom: '40px', marginTop: '50px', width: '100%', maxWidth: '380px', margin: '0 auto' }}>
          {/* Step 1 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              backgroundColor: '#007BFF', // Blue for active step
              color: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontWeight: 'bold',
            }}>
              1
            </div>
            {/* <p style={{ fontSize: '12px', marginTop: '5px', color: '#007BFF' }}>Step 1</p> */}
          </div>

          {/* Line */}
          <div style={{
            flex: 1,
            height: '5px',
            backgroundColor: '#E0ECFE', // Blue for active step
            margin: '0 10px',
            borderRadius: '5px',
          }}></div>

          {/* Step 2 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              backgroundColor: '#E0ECFE', // Light blue for inactive step
              color: '#6C757D',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontWeight: 'bold',
            }}>
              2
            </div>
            {/* <p style={{ fontSize: '12px', marginTop: '5px', color: '#6C757D' }}>Step 2</p> */}
          </div>
        </div>

        <div className="container" style={{ width: '100%', maxWidth: '400px', margin: 'auto' }}>
          <div className="text">Register Company</div>
          <form onSubmit={handleSubmit}>
            <div className="inputs">
              <div className="input-1">
                <div className="left-input">
                  <label>Company ID</label>
                  <input
                    type="text"
                    name="registration_number"
                    value={companyData.registration_number}
                    onChange={handleInputChange}
                    placeholder="Enter company ID"
                  />
                </div>
                <div className="right-input">
                  <label>Company Name</label>
                  <input
                    type="text"
                    name="name"
                    value={companyData.name}
                    onChange={handleInputChange}
                    placeholder="Enter company Name"
                  />
                </div>
              </div>
              <div className="input-1">
                <div className="left-input">
                  <label>Industry</label>
                  <input
                    type="text"
                    name="industry"
                    value={companyData.industry}
                    onChange={handleInputChange}
                    placeholder="Enter Industry Name"
                  />
                </div>
                <div className="right-input">
                  <label>Country</label>
                  <input
                    type="text"
                    name="country"
                    value={companyData.country}
                    onChange={handleInputChange}
                    placeholder="Enter Country Name"
                  />
                </div>
              </div>
              <div className="input-1">
                <div className="left-input">
                  <label>State</label>
                  <input
                    type="text"
                    name="state"
                    value={companyData.state}
                    onChange={handleInputChange}
                    placeholder="Enter State Name"
                  />
                </div>
                <div className="right-input">
                  <label>Town</label>
                  <input
                    type="text"
                    name="town"
                    value={companyData.town}
                    onChange={handleInputChange}
                    placeholder="Enter Town Name"
                  />
                </div>
              </div>
              <div className="input-2">
                <label>Company Email</label>
                <input
                  type="email"
                  name="email"
                  value={companyData.email}
                  onChange={handleInputChange}
                  placeholder="Enter Company Email"
                />
              </div>
            </div>
            <button type="submit" className="btn-general" disabled={isSubmitting}>
              {isSubmitting ? 'Registering...' : 'Register Company'}
            </button>
            
            <div className="login">
              <h1>
                Already have an account? <Link to="/login"><span>Log in</span></Link>
              </h1>
            </div>
          </form>
        </div>
      </div>

      <div className="right-side" style={{ flex: 1 }}>
        <img src={Sideimage} alt="Login side image" style={{ width: '100%', height: '100vh', objectFit: 'cover' }} />
      </div>
    </div>
  );
};

export default CompanyRegister;
