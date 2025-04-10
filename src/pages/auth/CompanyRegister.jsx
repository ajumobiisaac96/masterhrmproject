// import React, { useState } from 'react';
// import axios from 'axios';
// import '../../styles/custom.css';
// import hrmLogo from '../../assets/hrm logo.JPG';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fas, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Link } from 'react-router-dom';

// library.add(fas);

// const CompanyRegister = () => {
//   const [companyData, setCompanyData] = useState({
//     registration_number: '',
//     name: '',
//     email: '',
//     industry: '',
//     country: '',
//     state: '',
//     town: '',
//   });
//   const [showPopup, setShowPopup] = useState(false);
//   const [popupMessage, setPopupMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false); // State for button disabled and text

//   // Handle input change
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setCompanyData({
//       ...companyData,
//       [name]: value,
//     });
//     setErrorMessage('');
//   };

//   // Handle form submit
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Basic validation
//     if (!companyData.registration_number || !companyData.name || !companyData.email) {
//       setErrorMessage('Please fill in your details correctly.');
//       return;
//     }

//     console.log('Submitting Data:', companyData); // Log the payload being sent

//     setIsSubmitting(true); // Disable the button and change text

//     axios.post('https://proximahr.onrender.com/api/v2/company/register_company', companyData, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((response) => {
//         console.log('Full Response:', response.data);

//         const { data } = response.data;

//         if (data && data.length > 0) {
//           const registration_number = data[0]?.registration_number;

//           if (registration_number) {
//             localStorage.removeItem('companyID');
//             localStorage.setItem('company_id', registration_number);
//             console.log('Company_id (from response):', registration_number);
//           } else {
//             console.error('No registration number received from the API!');
//           }
//         } else {
//           console.error('No data array found or it\'s empty!');
//         }

//         setPopupMessage('A code has been sent to your email to create your admin account');
//         console.log('Popup should now show');
//         setShowPopup(true); // Verify this is being triggered

//         setErrorMessage('');
//       })
//       .catch((error) => {
//         if (error.response) {
//           console.error('API Error Response:', error.response.data);
//         } else if (error.request) {
//           console.error('No Response Received:', error.request);
//         } else {
//           console.error('Request Setup Error:', error.message);
//         }
//         setErrorMessage('Error in registration. Please try again.');
//       })
//       .finally(() => {
//         setIsSubmitting(false); // Re-enable the button and reset text
//       });
//   };

//   return (
//     <div>
//       {/* Logo Section */}
//       <div className="logo">
//         <img src={hrmLogo} alt="HRM Logo" />
//         <h1>Proxima HR</h1>
//       </div>

//       {/* Form Container with conditional blur */}
//       <div className={`container ${showPopup ? 'blur' : ''}`}>
//         <div className="text">Register Company</div>
//         <form onSubmit={handleSubmit}>
//           <div className="inputs">
//             <div className="input-1">
//               <div className="left-input">
//                 <label htmlFor="registration_number">Company ID</label>
//                 <input
//                   type="text"
//                   name="registration_number"
//                   value={companyData.registration_number}
//                   onChange={handleInputChange}
//                   placeholder="Enter company ID"
//                 />
//               </div>
//               <div className="right-input">
//                 <label htmlFor="name">Company Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={companyData.name}
//                   onChange={handleInputChange}
//                   placeholder="Enter company Name"
//                 />
//               </div>
//             </div>
//             <div className="input-1">
//               <div className="left-input">
//                 <label htmlFor="industry">Industry</label>
//                 <input
//                   type="text"
//                   name="industry"
//                   value={companyData.industry}
//                   onChange={handleInputChange}
//                   placeholder="Enter Industry Name"
//                 />
//               </div>
//               <div className="right-input">
//                 <label htmlFor="country">Country</label>
//                 <input
//                   type="text"
//                   name="country"
//                   value={companyData.country}
//                   onChange={handleInputChange}
//                   placeholder="Enter Country Name"
//                 />
//               </div>
//             </div>
//             <div className="input-1">
//               <div className="left-input">
//                 <label htmlFor="state">State</label>
//                 <input
//                   type="text"
//                   name="state"
//                   value={companyData.state}
//                   onChange={handleInputChange}
//                   placeholder="Enter State Name"
//                 />
//               </div>
//               <div className="right-input">
//                 <label htmlFor="town">Town</label>
//                 <input
//                   type="text"
//                   name="town"
//                   value={companyData.town}
//                   onChange={handleInputChange}
//                   placeholder="Enter Town Name"
//                 />
//               </div>
//             </div>
//             <div className="input-2">
//               <label htmlFor="email">Company Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={companyData.email}
//                 onChange={handleInputChange}
//                 placeholder="Enter Company Email"
//               />
//             </div>
//           </div>
//           <button type="submit" className='btn-general' disabled={isSubmitting}>
//             {isSubmitting ? 'Registering...' : 'Register Company'}
//           </button>
//           <div className="login">
//           <h1>
//             Already have an account?
//             <Link to="/login">
//               <span> login</span>
//             </Link>
//           </h1>
//           </div>
//           {errorMessage && <p className="error-message">{errorMessage}</p>}
//         </form>
//       </div>

//       {showPopup && (
//         <>
//           <div className="container-2">
//             <FontAwesomeIcon icon={faCircleCheck} className="check-icon" />
//             <div className="pop-up-txt">
//               <h1>Company Registration Successful</h1>
//               <p>{popupMessage}</p>
//               <Link to="/register">
//                 <h3>Create a Proxima HR account</h3>
//               </Link>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default CompanyRegister;




















import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/custom.css';
import hrmLogo from '../../assets/hrm logo.JPG';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas, faCircleCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import Sideimage from '../../assets/Sideimage.png'; // Ensure image path is correct

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyData({ ...companyData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!companyData.registration_number || !companyData.name || !companyData.email) {
      toast.error('Please fill in all required fields.', {
        autoClose: 15000,
        position: 'top-right',
        className: 'custom-toast-error',
      });
      return;
    }

    setIsSubmitting(true);

    axios.post('https://proximahr.onrender.com/api/v2/company/register_company', companyData, {
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        const { data } = response.data;

        if (data && data.length > 0) {
          const registration_number = data[0]?.registration_number;
          if (registration_number) {
            localStorage.setItem('company_id', registration_number);
          }
        }

        setPopupMessage('A code has been sent to your email to create your admin account');
        setSuccessMessage('Company registered successfully!');
        setShowPopup(true);

        toast.success('Company registered successfully!', {
          autoClose: 15000,
          position: 'top-right',
          className: 'custom-toast-success',
        });
      })
      .catch((error) => {
        const backendMessage = error?.response?.data?.message || 'Registration failed.';
        toast.error(backendMessage, {
          autoClose: 15000,
          position: 'top-right',
          className: 'custom-toast-error',
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
      <div className="left-side" style={{ flex: 1, padding: '20px' }} >
      <ToastContainer />
      <div className="logo" style={{ marginBottom: '5px', textAlign: 'left', marginLeft: '-190px' }}>
          <img src={hrmLogo} alt="HRM Logo" style={{ width: '25px', height: 'auto' }} />
          <h1>Proxima HR</h1>
        </div>

      <div className={`container ${showPopup ? 'blur' : ''}`} style={{ width: '100%', maxWidth: '400px', margin: 'auto' }}>
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
              Already have an account?
              <Link to="/login"><span> login</span></Link>
            </h1>
          </div>
        </form>
      </div>
      </div>

      <div className='right-side' style={{ flex: 1 }}>
        <img src={Sideimage} alt="Login side image" style={{ width: '100%', height: '100vh', objectFit: 'cover' }} />
      </div>


      {showPopup && (
        <div className="container-2">
          <FontAwesomeIcon icon={faCircleCheck} className="check-icon" style={{ color: 'green' }} />
          <div className="pop-up-txt">
            <h1>Company Registration Successful</h1>
            <p>{popupMessage}</p>
            <Link to="/register"><h3>Create a Proxima HR account</h3></Link>
          </div>
        </div>
      )}

    </div>
  );
};

export default CompanyRegister;
