// import React, { useState } from 'react';
// import axios from 'axios';
// import '../../styles/custom.css';
// import hrmLogo from '../../assets/hrm logo.JPG';
// import { Link, useNavigate } from 'react-router-dom';
// import Sideimage from '../../assets/Sideimage.png'; // Ensure image path is correct

// const HRregister = () => {
//   const [formData, setFormData] = useState({
//     first_name: '',
//     last_name: '',
//     // role: '',
//     email: '',
//     password: '',
//     admin_code: '', // Company Verification Code
//   });

//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false); // State for button disabled and text
//   const navigate = useNavigate(); // Hook for navigation

//   // Handle input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//     setErrorMessage('');
//     setSuccessMessage('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Basic validation
//     const { first_name, last_name, email, password, admin_code } = formData;
//     if (!first_name || !last_name || !email || !password || !admin_code) {
//       setErrorMessage('All fields are required.');
//       return;
//     }

//     // Get company_id from local storage
//     const company_id = localStorage.getItem('company_id').trim(); // Remove any spaces
//     console.log(company_id);

//     // Submit form data with company_id as a query parameter
//     try {
//       setIsSubmitting(true); // Disable the button and change text
//       const response = await axios.post(
//         `https://proximahr.onrender.com/admin/create-admin?company_id=${company_id}`,
//         formData
//       );
//       console.log('Response from backend:', response); // Log the entire response object
//       console.log('Response data:', response.data); // Log just the response data

//       // Handle success response
//       setSuccessMessage('Team created successfully! You will be redirected to the login page.');
//       setErrorMessage('');

//       // Redirect to the login page after 2 seconds
//       setTimeout(() => {
//         navigate('/login');
//       }, 2000);

//       // Clear form data
//       setFormData({
//         first_name: '',
//         last_name: '',
//         // role: '',
//         email: '',
//         password: '',
//         admin_code: '',
//       });
//     } catch (error) {
//       console.error('Error during form submission:', error);
//       setErrorMessage('An error occurred. Please try again.');
//       setSuccessMessage('');
//     } finally {
//       setIsSubmitting(false); // Re-enable the button and reset text
//     }
//   };

//   return (
//     <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
//       <div className="left-side" style={{ flex: 1, padding: '20px' }} >
//       <div className="logo" style={{ marginBottom: '5px', textAlign: 'left', marginLeft: '-190px' }}>
//           <img src={hrmLogo} alt="HRM Logo" style={{ width: '25px', height: 'auto' }} />
//           <h1>Proxima HR</h1>
//         </div>

//       <div className="container" style={{ width: '100%', maxWidth: '400px', margin: 'auto' }}>
//         <div className="text">Build Your Team with Ease</div>
//         <form onSubmit={handleSubmit}>
//           <div className="inputs">
//             <div className="input-1">
//               <div className="left-input">
//                 <label htmlFor="first_name">First Name</label>
//                 <input
//                   type="text"
//                   name="first_name"
//                   value={formData.first_name}
//                   onChange={handleInputChange}
//                   placeholder="Enter First Name"
//                 />
//               </div>
//               <div className="right-input">
//                 <label htmlFor="last_name">Last Name</label>
//                 <input
//                   type="text"
//                   name="last_name"
//                   value={formData.last_name}
//                   onChange={handleInputChange}
//                   placeholder="Enter Last Name"
//                 />
//               </div>
//             </div>
//             {/* <div className="input-2">
//               <label htmlFor="role">Role</label>
//               <input
//                 type="text"
//                 name="role"
//                 value={formData.role}
//                 onChange={handleInputChange}
//                 placeholder="Enter Role"
//               />
//             </div> */}
//             <div className="input-2">
//               <label htmlFor="email">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 placeholder="Enter Email"
//               />
//             </div>
//             <div className="input-2">
//               <label htmlFor="password">Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 placeholder="Enter Password"
//               />
//             </div>
//             <div className="input-2">
//               <label htmlFor="admin_code">Company Verification Code</label>
//               <input
//                 type="text"
//                 name="admin_code"
//                 value={formData.admin_code}
//                 onChange={handleInputChange}
//                 placeholder="Enter Company Verification Code"
//               />
//             </div>
//           </div>
//           <button className='btn-general' type="submit" disabled={isSubmitting}>
//             {isSubmitting ? 'Creating an account...' : 'Create an Account'}
//           </button>
//         </form>

//         {errorMessage && <p className="error-message">{errorMessage}</p>}
//         {successMessage && <p className="success-message">{successMessage}</p>}

//         <div className="login">
//           <h1>
//             Already have an account? <Link to="/login"><span>Log in</span></Link>
//           </h1>
//         </div>
//       </div>

//       </div>

//       <div className='right-side' style={{ flex: 1 }}>
//         <img src={Sideimage} alt="Login side image" style={{ width: '100%', height: '100vh', objectFit: 'cover' }} />
//       </div>

//     </div>
//   );
// };

// export default HRregister;

















import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/custom.css';
import hrmLogo from '../../assets/hrm logo.JPG';
import { Link, useNavigate } from 'react-router-dom';
import Sideimage from '../../assets/Sideimage.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HRregister = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    admin_code: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { first_name, last_name, email, password, admin_code } = formData;
    if (!first_name || !last_name || !email || !password || !admin_code) {
      toast.error('All fields are required.', {
        autoClose: 15000,
        position: 'top-right',
        className: 'custom-toast-error',
      });
      return;
    }

    const company_id = localStorage.getItem('company_id')?.trim();

    try {
      setIsSubmitting(true);

      const response = await axios.post(
        `https://proximahr.onrender.com/admin/create-admin?company_id=${company_id}`,
        formData
      );

      toast.success('Team created successfully! Redirecting to login...', {
        autoClose: 15000,
        position: 'top-right',
        className: 'custom-toast-success',
      });

      setTimeout(() => {
        navigate('/login');
      }, 2000);

      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        admin_code: '',
      });

    } catch (error) {
      const backendMessage = error?.response?.data?.message || 'An error occurred. Please try again.';
      toast.error(backendMessage, {
        autoClose: 15000,
        position: 'top-right',
        className: 'custom-toast-error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
      <ToastContainer />
      <div className="left-side" style={{ flex: 1, padding: '20px' }}>
        <div className="logo" style={{ marginBottom: '5px', textAlign: 'left', marginLeft: '-190px' }}>
        <Link to={'/LandingPage'}><img src={hrmLogo} alt="HRM Logo" style={{ width: '25px', height: 'auto' }} /></Link>
          <h1>Proxima HR</h1>
        </div>

        <div className="container" style={{ width: '100%', maxWidth: '400px', margin: 'auto' }}>
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
            <button className='btn-general' type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating an account...' : 'Create an Account'}
            </button>
          </form>

          <div className="login">
            <h1>
              Already have an account? <Link to="/login"><span>Log in</span></Link>
            </h1>
          </div>
        </div>
      </div>

      <div className='right-side' style={{ flex: 1 }}>
        <img src={Sideimage} alt="Login side image" style={{ width: '100%', height: '100vh', objectFit: 'cover' }} />
      </div>
    </div>
  );
};

export default HRregister;
