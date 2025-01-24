  import React, { useState } from 'react';
  import axios from 'axios';
  import '../../styles/custom.css';
  import hrmLogo from '../../assets/hrm logo.JPG';
  import { library } from '@fortawesome/fontawesome-svg-core';
  import { fas, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { Link } from 'react-router-dom';

  library.add(fas);

  const CompanyRegister = () => {
    const [companyData, setCompanyData] = useState({
      registration_number: '',
      name: '',
      email: '',
      industry: '',
      country: '',
      state: '',
      town: '',
    });
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Handle input change
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setCompanyData({
        ...companyData,
        [name]: value,
      });
      setErrorMessage('');
    };

    // Handle form submit
    const handleSubmit = (e) => {
      e.preventDefault();
    
      // Basic validation
      if (!companyData.registration_number || !companyData.name || !companyData.email) {
        setErrorMessage('Please fill in your details correctly.');
        return;
      }
    
      console.log('Submitting Data:', companyData); // Log the payload being sent
    
      axios.post('https://proximahr.onrender.com/company/register_company', companyData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          console.log('Full Response:', response.data);
    
          const { data } = response.data;
    
          if (data && data.length > 0) {
            const registration_number = data[0]?.registration_number;
    
            if (registration_number) {
              localStorage.removeItem('companyID');
              localStorage.setItem('company_id', registration_number);
              console.log('Company_id (from response):', registration_number);
            } else {
              console.error('No registration number received from the API!');
            }
          } else {
            console.error('No data array found or it\'s empty!');
          }
    
          setPopupMessage('A code has been sent to your email to create your admin account');
          console.log('Popup should now show');
          setShowPopup(true); // Verify this is being triggered
          
          setErrorMessage('');
        })
        .catch((error) => {
          if (error.response) {
            console.error('API Error Response:', error.response.data);
          } else if (error.request) {
            console.error('No Response Received:', error.request);
          } else {
            console.error('Request Setup Error:', error.message);
          }
          setErrorMessage('Error in registration. Please try again.');
        });
    };
    

    return (
      <div>
        {/* Logo Section */}
        <div className="logo">
          <img src={hrmLogo} alt="HRM Logo" />
          <h1>Proxima HR</h1>
        </div>

        {/* Form Container with conditional blur */}
        <div className={`container ${showPopup ? 'blur' : ''}`}>
          <div className="text">Register Company</div>
          <form onSubmit={handleSubmit}>
            <div className="inputs">
              <div className="input-1">
                <div className="left-input">
                  <label htmlFor="registration_number">Company ID</label>
                  <input
                    type="text"
                    name="registration_number"
                    value={companyData.registration_number}
                    onChange={handleInputChange}
                    placeholder="Enter company ID"
                  />
                </div>
                <div className="right-input">
                  <label htmlFor="name">Company Name</label>
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
                  <label htmlFor="industry">Industry</label>
                  <input
                    type="text"
                    name="industry"
                    value={companyData.industry}
                    onChange={handleInputChange}
                    placeholder="Enter Industry Name"
                  />
                </div>
                <div className="right-input">
                  <label htmlFor="country">Country</label>
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
                  <label htmlFor="state">State</label>
                  <input
                    type="text"
                    name="state"
                    value={companyData.state}
                    onChange={handleInputChange}
                    placeholder="Enter State Name"
                  />
                </div>
                <div className="right-input">
                  <label htmlFor="town">Town</label>
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
                <label htmlFor="email">Company Email</label>
                <input
                  type="email"
                  name="email"
                  value={companyData.email}
                  onChange={handleInputChange}
                  placeholder="Enter Company Email"
                />
              </div>
            </div>
            <button type="submit" className='btn-general' >Register Company</button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </form>
          
        </div>

        {/* Success Popup
        {showPopup && (
          <div className="container-2">
            <FontAwesomeIcon icon={faCircleCheck} className="check-icon" />
            <div className="pop-up-txt">
              <h1>Company Registration Sucessful</h1>
              <p>{popupMessage}</p>
              <Link to="/register">
                <h3>Create a Proxima HR account</h3>
              </Link>
            </div>
          </div>
        )} */}


{showPopup && (
  <>
    <div className="overlay"></div>
    <div className="container-2">
      <FontAwesomeIcon icon={faCircleCheck} className="check-icon" />
      <div className="pop-up-txt">
        <h1>Company Registration Successful</h1>
        <p>{popupMessage}</p>
        <Link to="/register">
          <h3>Create a Proxima HR account</h3>
        </Link>
      </div>
    </div>
  </>
)}

      </div>
    );
  };

  export default CompanyRegister;
