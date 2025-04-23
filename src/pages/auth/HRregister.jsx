// import React, { useState } from 'react';
// import axios from 'axios';
// import '../../styles/custom.css';
// import hrmLogo from '../../assets/hrm logo.JPG';
// import { Link, useNavigate } from 'react-router-dom';
// import Sideimage from '../../assets/Sideimage.png';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const HRregister = () => {
//   const [formData, setFormData] = useState({
//     first_name: '',
//     last_name: '',
//     email: '',
//     password: '',
//     admin_code: '',
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const { first_name, last_name, email, password, admin_code } = formData;
//     if (!first_name || !last_name || !email || !password || !admin_code) {
//       toast.error('All fields are required.', {
//         autoClose: 15000,
//         position: 'top-right',
//         className: 'custom-toast-error',
//       });
//       return;
//     }

//     const company_id = localStorage.getItem('company_id')?.trim();

//     try {
//       setIsSubmitting(true);

//       const response = await axios.post(
//         `https://proximahr.onrender.com/admin/create-admin?company_id=${company_id}`,
//         formData
//       );

//       toast.success('Team created successfully! Redirecting to login...', {
//         autoClose: 15000,
//         position: 'top-right',
//         className: 'custom-toast-success',
//       });

//       setTimeout(() => {
//         navigate('/login');
//       }, 2000);

//       setFormData({
//         first_name: '',
//         last_name: '',
//         email: '',
//         password: '',
//         admin_code: '',
//       });

//     } catch (error) {
//       const backendMessage = error?.response?.data?.message || 'An error occurred. Please try again.';
//       toast.error(backendMessage, {
//         autoClose: 15000,
//         position: 'top-right',
//         className: 'custom-toast-error',
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
//       <ToastContainer />
//       <div className="left-side" style={{ flex: 1, padding: '20px' }}>
//         <div className="logo" style={{ marginBottom: '5px', textAlign: 'left', marginLeft: '-190px' }}>
//         <Link to={'/LandingPage'}><img src={hrmLogo} alt="HRM Logo" style={{ width: '25px', height: 'auto' }} /></Link>
//           <h1>Proxima HR</h1>
//         </div>

//         <div className="container" style={{ width: '100%', maxWidth: '400px', margin: 'auto' }}>
//           <div className="text">Build Your Team with Ease</div>
//           <form onSubmit={handleSubmit}>
//             <div className="inputs">
//               <div className="input-1">
//                 <div className="left-input">
//                   <label htmlFor="first_name">First Name</label>
//                   <input
//                     type="text"
//                     name="first_name"
//                     value={formData.first_name}
//                     onChange={handleInputChange}
//                     placeholder="Enter First Name"
//                   />
//                 </div>
//                 <div className="right-input">
//                   <label htmlFor="last_name">Last Name</label>
//                   <input
//                     type="text"
//                     name="last_name"
//                     value={formData.last_name}
//                     onChange={handleInputChange}
//                     placeholder="Enter Last Name"
//                   />
//                 </div>
//               </div>

//               <div className="input-2">
//                 <label htmlFor="email">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   placeholder="Enter Email"
//                 />
//               </div>
//               <div className="input-2">
//                 <label htmlFor="password">Password</label>
//                 <input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleInputChange}
//                   placeholder="Enter Password"
//                 />
//               </div>
//               <div className="input-2">
//                 <label htmlFor="admin_code">Company Verification Code</label>
//                 <input
//                   type="text"
//                   name="admin_code"
//                   value={formData.admin_code}
//                   onChange={handleInputChange}
//                   placeholder="Enter Company Verification Code"
//                 />
//               </div>
//             </div>
//             <button className='btn-general' type="submit" disabled={isSubmitting}>
//               {isSubmitting ? 'Creating an account...' : 'Create an Account'}
//             </button>
//           </form>

//           <div className="login">
//             <h1>
//               Already have an account? <Link to="/login"><span>Log in</span></Link>
//             </h1>
//           </div>
//         </div>
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesome
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // Eye icons

const HRregister = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    admin_code: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility
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
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type={passwordVisible ? 'text' : 'password'} // Toggle between text and password input
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter Password"
                    style={{width:' 100%'}} 
                  />
                  <FontAwesomeIcon
                    icon={passwordVisible ? faEyeSlash : faEye} // Switch between eye and eye-slash icon
                    onClick={() => setPasswordVisible(!passwordVisible)} // Toggle password visibility
                    style={{ cursor: 'pointer', marginLeft: '10px' }}
                  />
                </div>
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
