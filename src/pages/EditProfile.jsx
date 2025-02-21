// import React, { useState } from 'react';
// import Sidebar from '../components/Sidebar';
// import test from '../assets/test.png';
// import '../pages/AddEmployee.css';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fas, faCircleCheck} from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Link } from 'react-router-dom';

// library.add(fas);

// const AddEmployee = () => {
//   const [activeSection, setActiveSection] = useState('Basic Information'); // Tracks the active section

//   return (
//     <div>
//       <div>
//         <div className="main-dashboard">
//           <Sidebar />
//           <div className="dashboard">
//           <div className="slide-one-1">
//             <div className="slide-one-1">
//               <div className="name">
//                 <h5>Joseph Dooley</h5>
//                 <h6>Good Morning</h6>
//               </div> 
//             </div>
//             <div className="slide-one-2-1">
//               <div className="notification">
//                 <FontAwesomeIcon icon="fa-solid fa-bell" />
//                 <h6>6</h6>
//               </div>

//               <div className="user-profile">
//                 <img src={test} alt="My profile" className="My-profile" />
//               </div>
//             </div> 
//           </div>

//             <hr className="horizontal" />

//             <div className="dashboard-details">
//               <Link to={'/employee-managment'}>
//                 <h1 className="employee-profile">
//                   <FontAwesomeIcon
//                     icon="fa-solid fa-arrow-left"
//                     className="left-arrow"
//                   />
//                   Add New Employee
//                 </h1>
//               </Link>
//               <h6>24 Thursday October 2024</h6>
//             </div>

//             <div className="dashboard-details-1">
//               <p
//                 className={activeSection === 'Basic Information' ? 'active' : ''}
//                 onClick={() => setActiveSection('Basic Information')}
//               >
//                 Basic Information
//               </p>
//               <p
//                 className={activeSection === 'Employment Details' ? 'active' : ''}
//                 onClick={() => setActiveSection('Employment Details')}
//               >
//                 Employment Details
//               </p>
//               <p
//                 className={activeSection === 'Compensation Details' ? 'active' : ''}
//                 onClick={() => setActiveSection('Compensation Details')}
//               >
//                 Compensation Details
//               </p>
//             </div>

//             <div className="add-employee-form">
//               {activeSection === 'Basic Information' && (
//                 <div>
//                   <div className="splited-row">
//                     <div className="left-hand-side-col">
//                       <label htmlFor="">First Name <span>(Required)</span></label>
//                       <input type="text" placeholder="Enter First Name" />
//                     </div>

//                     <div className="right-hand-side-col">
//                       <label htmlFor="">Last Name <span>(Required)</span></label>
//                       <input type="text" placeholder="Enter Last Name" />
//                     </div>
//                   </div>

//                   <div className="single-row">
//                     <label htmlFor="Email">Email <span>(Required)</span></label>
//                     <input type="text" placeholder="Enter Email" />
//                   </div>

//                   <div className="splited-row">
//                     <div className="left-hand-side-col">
//                       <label htmlFor="">Employee ID <span>(Required)</span></label>
//                       <input type="text" placeholder="Enter Employee ID" />
//                     </div>

//                     <div className="right-hand-side-col">
//                       <label htmlFor="">Phone Number <span>(Required)</span></label>
//                       <input type="text" placeholder="Enter Phone Number" />
//                     </div>
//                   </div>

//                   <div className="splited-row">
//                 <div className="left-hand-side-col">
//                   <label htmlFor="">Date of Birth <span>(Required)</span></label>
//                   <input type="text" placeholder='DD/MM/YY' />
//                 </div>

//                 <div className="right-hand-side-col">
//                   <label htmlFor="">Gender <span>(Required)</span></label>
//                   <select name="" id="">
//                     <option value="">Male</option>
//                     <option value="">Female</option>
//                   </select>
//                 </div>
//             </div>

//             <div className="splited-row">
//                 <div className="left-hand-side-col">
//                   <label htmlFor="">Home Address <span>(Required)</span></label>
//                   <input type="text" placeholder='Enter Home Address' />
//                 </div>

//                 <div className="right-hand-side-col">
//                   <label htmlFor="">Country <span>(Required)</span></label>
//                   <input type="text" placeholder='Enter country' />
//                 </div>
//             </div>

//             <div className='add-employee-btn'>
//               <button className='btn-2'> Next</button>
//             </div>
//                 </div>
//               )}

//               {activeSection === 'Employment Details' && (
//                 <div>
//                 <div className="splited-row">
//                   <div className="left-hand-side-col">
//                     <label htmlFor="">Job Title <span>(Required)</span></label>
//                     <input type="text" placeholder="Enter Job Title" />
//                   </div>

//                   <div className="right-hand-side-col">
//                     <label htmlFor="">Department <span>(Required)</span></label>
//                     <input type="text" placeholder="choose Department" />
//                   </div>
//                 </div>

//                 <div className="splited-row">
//                   <div className="left-hand-side-col">
//                     <label htmlFor="">Role <span>(Required)</span></label>
//                     <input type="text" placeholder="Choose Role" />
//                   </div>

//                   <div className="right-hand-side-col">
//                     <label htmlFor="">Employment Date <span>(Required)</span></label>
//                     <input type="text" placeholder="Employment Date" />
//                   </div>
//                 </div>

//                 <div className="splited-row">
//                   <div className="left-hand-side-col">
//                     <label htmlFor="">Work Mode <span>(Required)</span></label>
//                     <input type="text" placeholder="choose Work mode" />
//                   </div>

//                   <div className="right-hand-side-col">
//                     <label htmlFor="">Work Location <span>(Required)</span></label>
//                     <input type="text" placeholder="Enter Location" />
//                   </div>
//                 </div>

//                 <div className="splited-row">
//                   <div className="left-hand-side-col">
//                     <label htmlFor="">Working Hours<span>(Required)</span></label>
//                     <input type="text" placeholder="choose working Hours" />
//                   </div>

//                   <div className="right-hand-side-col">
//                     <label htmlFor="">Vacation Days <span>(Required)</span></label>
//                     <input type="text" placeholder="Enter Phone Number" />
//                   </div>
//                 </div>

//                 <div className="single-row">
//                   <label htmlFor="Email">Weekly work days <span>(Required)</span></label>
//                   <input type="text" placeholder="choose the Amount of work days" />
//                 </div>

//                 <div className='add-employee-btn'>
//               <button className='btn-2'> Next</button>
//             </div>

//               </div>
//               )}

//               {activeSection === 'Compensation Details' && (
//                 <div>
//                 <div className="splited-row">
//                   <div className="left-hand-side-col">
//                     <label htmlFor="">Base salary <span>(Required)</span></label>
//                     <input type="text" placeholder="Enter salary" />
//                   </div>

//                   <div className="right-hand-side-col">
//                     <label htmlFor="">Payment frequency <span>(Required)</span></label>
//                     <select name="" id="" placeholder="choose payment Frequency">
//                       <option value="">Monthly</option>
//                       <option value="">Weekly</option>
//                       <option value="">Bi-weekly</option>
//                     </select>
//                   </div>
//                 </div>

//                 <div className="splited-row">
//                   <div className="left-hand-side-col">
//                     <label htmlFor="">Account Name <span>(Required)</span></label>
//                     <input type="text" placeholder="Enter Account Name" />
//                   </div>

//                   <div className="right-hand-side-col">
//                     <label htmlFor="">Account Number<span>(Required)</span></label>
//                     <input type="text" placeholder="Employment Date" />
//                   </div>
//                 </div>

//                 <div className="single-row">
//                   <label htmlFor="Email">Bank Name <span>(Required)</span></label>
//                   <input type="text" placeholder="choose the Amount of work days" />
//                 </div>

//                 <div className="splited-row">
//                   <div className="left-hand-side-col">
//                     <label htmlFor="">Overtime Hours Allowance <span>(Required)</span></label>
//                     <input type="text" placeholder="Enter Hour Allowance" />
//                   </div>

//                   <div className="right-hand-side-col">
//                     <label htmlFor="">Housing Allowance <span>(Required)</span></label>
//                     <input type="text" placeholder="Enter Location" />
//                   </div>
//                 </div>

//                 <div className="splited-row">
//                   <div className="left-hand-side-col">
//                     <label htmlFor="">Medical Allowance<span>(Required)</span></label>
//                     <input type="text" placeholder="Enter Medical Allowance" />
//                   </div>

//                   <div className="right-hand-side-col">
//                     <label htmlFor="">Transport Allowance <span>(Required)</span></label>
//                     <input type="text" placeholder="Enter Transport Allowance" />
//                   </div>
//                 </div>

//                 <div className="splited-row">
//                   <div className="left-hand-side-col">
//                     <label htmlFor="">Employee contribution (pension)<span>(Required)</span></label>
//                     <input type="text" placeholder="choose working Hours" />
//                   </div>

//                   <div className="right-hand-side-col">
//                     <label htmlFor="">company Match (pension) <span>(Required)</span></label>
//                     <input type="text" placeholder="Enter Phone Number" />
//                   </div>
//                 </div>

//                 <div className="single-row">
//                   <label htmlFor="Email">PAYE Deduction <span>(Required)</span></label>
//                   <input type="text" placeholder="Enter percentage of PAYE deduction" />
//                 </div>

//                 <div className="splited-row">
//                   <div className="left-hand-side-col">
//                     <label htmlFor="">Insurance provider<span>(Required)</span></label>
//                     <select name="" id="">
//                       <option value="">Leadway Assurance</option>
//                       <option value="">AXA Mansaard Insurance</option>
//                       <option value="">custodian and Allied Insurance</option>
//                       <option value="">cornerstone Insurance</option>
//                       <option value="">FBN Insurance</option>
//                       <option value="">African Alliance Insurance</option>
//                     </select>
//                   </div>

//                   <div className="right-hand-side-col">
//                     <label htmlFor="">Lead Way Health Insurance <span>(Required)</span></label>
//                     <select name="" id="">
//                       <option value="">Group Life Assurance</option>
//                       <option value="">Employee compensation Insurance</option>
//                       <option value="">Health Insurance Plans</option>
//                       <option value="">Personal Accident Insurance</option>
//                       <option value="">Travel Insurance</option>
//                     </select>
//                   </div>
//                 </div>

//                 <div className='add-employee-btn'>
//               <button className='btn-2'> Add Employee</button>
//             </div>

//           <div className="container-3">
//         <FontAwesomeIcon icon={faCircleCheck} className="check-icon" />
//         <div className="pop-up-txt">
//           <h1>Employee Added Sucessful</h1>
//           <p>The new employee profile has been created successfully and is now part of the company database.</p>
//           <Link to="/employee-managment">
//             <h3>Employee Managment</h3>
//           </Link>
//         </div>
//       </div>

//               </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddEmployee;

// import React, { useState } from 'react';
// import Sidebar from '../components/Sidebar';
// import test from '../assets/test.png';
// import '../pages/AddEmployee.css';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fas, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Link, useNavigate } from 'react-router-dom';

// library.add(fas);

// const AddEmployee = () => {
//   const [activeSection, setActiveSection] = useState('Basic Information');
//   const [formData, setFormData] = useState({
//     employee_id: '',
//     first_name: '',
//     last_name: '',
//     email: '',
//     phone_number: '',
//     date_of_birth: '',
//     gender: '',
//     home_address: '',
//     country: '',
//     job_title: '',
//     department: '',
//     role: '',
//     employment_date: '',
//     work_mode: '',
//     work_location: '',
//     working_hours: '',
//     weekly_workdays: '',
//     base_salary: '',
//     payment_frequency: '',
//     account_name: '',
//     account_number: '',
//     bank_name: '',
//     overtime_hours_allowance: '',
//     housing_allowance: '',
//     transport_allowance: '',
//     medical_allowance: '',
//     employee_contribution: '',
//     company_match: '',
//     paye_deduction: '',
//     insurance_provider: '',
//     leadway_insurance: '',
//     annual_leave_days: '',
//   });
  
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(false);
//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleAddEmployee = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const companyId = localStorage.getItem('company_id');
//       if (!companyId) throw new Error('Company ID is missing. Please log in again.');
  
//       const storedAuthData = localStorage.getItem('authData');
//       if (!storedAuthData) throw new Error('Authentication data is missing. Please log in.');
  
//       const authData = JSON.parse(storedAuthData);
//       const token = authData?.token;
//       if (!token) throw new Error('Authentication token is missing. Please log in.');
  
//       const payload = {
//         ...formData,
//         base_salary: Number(formData.base_salary) || 0,
//         paye_deduction: Number(formData.paye_deduction) || 0,
//         employee_contribution: Number(formData.employee_contribution) || 0,
//         company_match: Number(formData.company_match) || 0,
//       };
  
//       const response = await fetch(`https://proximahr.onrender.com/employee-management/create-employee-profile?company_id=${companyId}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//       });
  
//       const result = await response.json();
//       console.log('API Response:', result);
  
//       if (!response.ok) {
//         throw new Error(result.detail || 'Failed to create employee');
//       }
  
//       // ✅ Save Employee ID to LocalStorage
//       localStorage.setItem('employee_id', result.data.employee_id);
  
//       setSuccess(true);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   return (
//     <div>
//       <div className="main-dashboard">
//         <Sidebar />
//         <div className="dashboard">
//           <div className="slide-one-1">
//             <div className="name">
//               <h5>Joseph Dooley</h5>
//               <h6>Good Morning</h6>
//             </div>
//             <div className="slide-one-2-1">
//               <div className="notification">
//                 <FontAwesomeIcon icon="fa-solid fa-bell" />
//                 <h6>6</h6>
//               </div>
//               <div className="user-profile">
//                 <img src={test} alt="My profile" className="My-profile" />
//               </div>
//             </div>
//           </div>

//           <hr className="horizontal" />

//           <div className="dashboard-details ">
//             <Link to={'/employee-managment'}>
//               <h1 className="employee-profile">
//                 <FontAwesomeIcon icon="fa-solid fa-arrow-left" className="left-arrow" />
//                 Add New Employee
//               </h1>
//             </Link>
//             <h6>{new Date().toDateString()}</h6>
//           </div>

//           {error && <p style={{ color: 'red' }}>{error}</p>}
//           {success && (
//             <div className="container-3">
//               <FontAwesomeIcon icon={faCircleCheck} className="check-icon" />
//               <div className="pop-up-txt">
//                 <h1>Employee Added Successfully</h1>
//                 <p>The new employee profile has been created successfully and is now part of the company database.</p>
//                 <Link to="/employee-managment">
//                   <h3>Employee Management</h3>
//                 </Link>
//               </div>
//             </div>
//           )}

//           {!success && (
//             <>
//               <div className="dashboard-details-1">
//                 <p className={activeSection === 'Basic Information' ? 'active' : ''} onClick={() => setActiveSection('Basic Information')}>Basic Information</p>
//                 <p className={activeSection === 'Employment Details' ? 'active' : ''} onClick={() => setActiveSection('Employment Details')}>Employment Details</p>
//                 <p className={activeSection === 'Compensation Details' ? 'active' : ''} onClick={() => setActiveSection('Compensation Details')}>Compensation Details</p>
//               </div>

//               <div className="add-employee-form">
//                 {Object.entries(formData).map(([key, value]) => (
//                   (activeSection === 'Basic Information' && ['employee_id', 'first_name', 'last_name', 'email', 'phone_number', 'date_of_birth', 'gender', 'home_address', 'country'].includes(key)) ||
//                   (activeSection === 'Employment Details' && ['job_title', 'department', 'role', 'employment_date', 'work_mode', 'work_location', 'working_hours', 'weekly_workdays'].includes(key)) ||
//                   (activeSection === 'Compensation Details' && ['base_salary', 'payment_frequency', 'account_name', 'account_number', 'bank_name', 'overtime_hours_allowance', 'housing_allowance', 'transport_allowance', 'medical_allowance', 'employee_contribution', 'company_match', 'paye_deduction', 'insurance_provider', 'leadway_insurance', 'annual_leave_days'].includes(key)) ? (
//                     <div key={key}>
//                       <label>{key.replace(/_/g, ' ')}</label>
//                       <input type="text" name={key} value={value} onChange={handleInputChange} placeholder={`Enter ${key.replace(/_/g, ' ')}`} />
//                     </div>
//                   ) : null
//                 ))}
//               </div>

//               <div className='add-employee-btn'>
//                 <button className='btn-2' onClick={handleAddEmployee} disabled={loading}>{loading ? 'Adding...' : 'Add Employee'}</button>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddEmployee;



import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import test from '../assets/test.png';
import '../pages/AddEmployee.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';

library.add(fas);

const AddEmployee = () => {
  const [activeSection, setActiveSection] = useState('Basic Information');
  const [formData, setFormData] = useState({
    Employee_Id: '',
    First_Name: '',
    Last_Name: '',
    Email: '',
    Phone_Number: '',
    Date_of_Birth: '',
    Gender: '',
    Home_Address: '',
    Country: '',
    job_title: '',
    department: '',
    role: '',
    employment_date: '',
    work_mode: '',
    work_location: '',
    working_hours: '',
    weekly_workdays: '',
    base_salary: '',
    payment_frequency: '',
    account_name: '',
    account_number: '',
    bank_name: '',
    overtime_hours_allowance: '',
    housing_allowance: '',
    transport_allowance: '',
    medical_allowance: '',
    employee_contribution: '',
    company_match: '',
    paye_deduction: '',
    insurance_provider: '',
    leadway_insurance: '',
    annual_leave_days: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Define required fields and date fields
  const requiredFields = [
    'First_Name', 'Employee_Id', 'Last_Name', 'Email', 'Phone_Number', 'Date_of_Birth', 
    'Gender', 'Country', 'job_title', 'department', 'role', 'employment_date'
  ];

  const dateFields = ['Date_of_Birth', 'employment_date']; // Fields where date input is required

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    // Check for required fields
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = `${field.replace(/_/g, ' ')} is required.`;
      }
    });

    // Example: Email validation
    if (formData.Email && !/\S+@\S+\.\S+/.test(formData.Email)) {
      newErrors.Email = 'Please enter a valid email address.';
    }

    // Example: Phone validation
    if (formData.Phone_Number && !/^\+?[0-9]{10,15}$/.test(formData.Phone_Number)) {
      newErrors.Phone_Number = 'Please enter a valid phone number.';
    }

    return newErrors;
  };

  const handleAddEmployee = async () => {
    setLoading(true);
    setError({});
    try {
      // Validate the form before submitting
      const formErrors = validateForm();
      if (Object.keys(formErrors).length > 0) {
        setError(formErrors);
        setLoading(false);
        return;
      }

      const companyId = localStorage.getItem('company_id');
      if (!companyId) throw new Error('Company ID is missing. Please log in again.');

      const storedAuthData = localStorage.getItem('authData');
      if (!storedAuthData) throw new Error('Authentication data is missing. Please log in.');

      const authData = JSON.parse(storedAuthData);
      const token = authData?.token;
      if (!token) throw new Error('Authentication token is missing. Please log in.');

      const payload = {
        ...formData,
        base_salary: Number(formData.base_salary) || 0,
        paye_deduction: Number(formData.paye_deduction) || 0,
        employee_contribution: Number(formData.employee_contribution) || 0,
        company_match: Number(formData.company_match) || 0,
      };

      const response = await fetch(`https://proximahr.onrender.com/employee-management/create-employee-profile?company_id=${companyId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.detail || 'Failed to create employee');
      }

      localStorage.setItem('employee_id', result.data.employee_id);
      setSuccess(true);
    } catch (err) {
      setError({ general: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="main-dashboard">
        <Sidebar />
        <div className="dashboard">
          <div className="slide-one-1">
            <div className="name">
              <h5>Joseph Dooley</h5>
              <h6>Good Morning</h6>
            </div>
            <div className="slide-one-2-1">
              <div className="notification">
                <FontAwesomeIcon icon="fa-solid fa-bell" />
                <h6>6</h6>
              </div>
              <div className="user-profile">
                <img src={test} alt="My profile" className="My-profile" />
              </div>
            </div>
          </div>

          <hr className="horizontal" />

          <div className="dashboard-details">
            <Link to={'/employee-managment'}>
              <h1 className="employee-profile">
                <FontAwesomeIcon icon="fa-solid fa-arrow-left" className="left-arrow" />
                Add New Employee
              </h1>
            </Link>
            <h6>{new Date().toDateString()}</h6>
          </div>

          {/* Display general errors */}
          {error.general && <div className="error-box"><p>{error.general}</p></div>}

          {success && (
            <div className="container-3">
              <FontAwesomeIcon icon={faCircleCheck} className="check-icon" />
              <div className="pop-up-txt">
                <h1>Employee Added Successfully</h1>
                <p>The new employee profile has been created successfully and is now part of the company database.</p>
                <Link to="/employee-managment">
                  <h3>Employee Management</h3>
                </Link>
              </div>
            </div>
          )}

          {!success && (
            <>
              <div className="dashboard-details-1">
                <p className={activeSection === 'Basic Information' ? 'active' : ''} onClick={() => setActiveSection('Basic Information')}>Basic Information</p>
                <p className={activeSection === 'Employment Details' ? 'active' : ''} onClick={() => setActiveSection('Employment Details')}>Employment Details</p>
                <p className={activeSection === 'Compensation Details' ? 'active' : ''} onClick={() => setActiveSection('Compensation Details')}>Compensation Details</p>
              </div>

              <div className="add-employee-form" style={{ padding: 20 }}>
                {Object.entries(formData).map(([key, value]) => (
                  (activeSection === 'Basic Information' && ['Employee_Id', 'First_Name', 'Last_Name', 'Email', 'Phone_Number', 'Date_of_Birth', 'Gender', 'Home_Address', 'Country'].includes(key)) ||
                  (activeSection === 'Employment Details' && ['job_title', 'department', 'role', 'employment_date', 'work_mode', 'work_location', 'working_hours', 'weekly_workdays'].includes(key)) ||
                  (activeSection === 'Compensation Details' && ['base_salary', 'payment_frequency', 'account_name', 'account_number', 'bank_name', 'overtime_hours_allowance', 'housing_allowance', 'transport_allowance', 'medical_allowance', 'employee_contribution', 'company_match', 'paye_deduction', 'insurance_provider', 'leadway_insurance', 'annual_leave_days'].includes(key)) ? (
                    <div key={key} style={{ marginBottom: "10px" }}>
                      <label className='formLabel'>
                        {key.replace(/_/g, ' ')} 
                        {requiredFields.includes(key) && <span style={{ color: 'red' }}>*</span>}
                      </label> 
                      <br />
                      {key === 'Gender' && (
                        <select name={key} value={value} onChange={handleInputChange} className="formInput">
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      )}
                      {key === 'Country' && (
                        <select name={key} value={value} onChange={handleInputChange} className="formInput">
                          <option value="">Select Country</option>
                          <option value="USA">USA</option>
                          <option value="UK">UK</option>
                          {/* Populate with more countries or use an API */}
                        </select>
                      )}
                      {key === 'department' && (
                        <select name={key} value={value} onChange={handleInputChange} className="formInput">
                          <option value="">Select Department</option>
                          <option value="HR">HR</option>
                          <option value="Engineering">Engineering</option>
                          {/* Populate with real departments */}
                        </select>
                      )}
                      {dateFields.includes(key) ? (
                        <input type="date" name={key} value={value} onChange={handleInputChange} className="formInput" />
                      ) : (
                        <input type="text" name={key} value={value} onChange={handleInputChange} placeholder={`Enter ${key.replace(/_/g, ' ')}`} className="formInput" />
                      )}
                      {error[key] && <div className="error-message">{error[key]}</div>}
                    </div>
                  ) : null
                ))}
              </div>

             <div className='add-employee-btn'>
                <button className='btn-2' onClick={handleAddEmployee} disabled={loading}>{loading ? 'Adding...' : 'Add Employee'}</button>
            </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
