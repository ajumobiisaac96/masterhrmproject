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



import React, { useState, useEffect } from 'react';
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
    Nationality: '',
    Job_Title: '',
    Department: '',
    Role: '',
    Employment_Date: '',
    Work_Mode: '',
    Work_Location: '',
    Working_Hours: '',
    Weekly_Workdays: '',
    Base_Salary: '',
    Payment_Frequency: '',
    Account_Name: '',
    Account_Number: '',
    Bank_Name: '',
    Overtime_Hours_Allowance: '',
    Housing_Allowance: '',
    Transport_Allowance: '',
    Medical_Allowance: '',
    Employee_Contribution: '',
    Company_Match: '',
    Paye_Deduction: '',
    Insurance_Provider: '',
    LeadWay_Health_Insurance: '',
    Annual_Leave_Days: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]); // ✅ Store fetched departments

  useEffect(() => {
      const fetchDepartments = async () => {
          try {
              const companyId = localStorage.getItem('company_id');
              const storedAuthData = localStorage.getItem('authData');
              const token = storedAuthData ? JSON.parse(storedAuthData).token : null;

              if (!companyId || !token) return;
              
              const response = await fetch(`https://proximahr.onrender.com/departments?company_id=${companyId}`, {
                  headers: { Authorization: `Bearer ${token}` }
              });

              const data = await response.json();
              setDepartments(data.departments || []);
          } catch (error) {
              console.error("Failed to fetch departments:", error);
          }
      };
      fetchDepartments();
  }, []);

  // Define required fields and date fields
  const requiredFields = [
    'First_Name', 'Employee_Id', 'Last_Name', 'Email', 'Phone_Number', 'Date_of_Birth', 
    'Gender', 'Nationality', 'Job_Title', 'Department', 'Role', 'Employment_Date'
  ];

  const dateFields = ['Date_of_Birth', 'Employment_Date']; // Fields where date input is required

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
        // ✅ Validate form before sending
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setError(formErrors);
            setLoading(false);
            return;
        }

        console.log("Form Data Before Submission:", formData); // ✅ Log form data

        const companyId = localStorage.getItem('company_id');
        if (!companyId) throw new Error('Company ID is missing. Please log in again.');

        const storedAuthData = localStorage.getItem('authData');
        if (!storedAuthData) throw new Error('Authentication data is missing. Please log in.');

        const authData = JSON.parse(storedAuthData);
        const token = authData?.token;
        if (!token) throw new Error('Authentication token is missing. Please log in.');

        // ✅ Ensure Correct Data Formatting
        const payload = {
            employee_id: formData.Employee_Id.trim(),
            first_name: formData.First_Name.trim(),
            last_name: formData.Last_Name.trim(),
            email: formData.Email.trim(),
            phone_number: formData.Phone_Number.trim(),
            date_of_birth: formData.Date_of_Birth ? new Date(formData.Date_of_Birth).toISOString().split("T")[0] : null,
            gender: formData.Gender.trim(),
            home_address: formData.Home_Address.trim(),
            country: formData.Nationality.trim(),
            job_title: formData.Job_Title.trim(),
            department: formData.Department.trim(),
            role: formData.Role.trim(),
            employment_date: formData.Employment_Date ? new Date(formData.Employment_Date).toISOString().split("T")[0] : null,
            work_mode: formData.Work_Mode.trim(),
            work_location: formData.Work_Location.trim(),
            working_hours: Number(formData.Working_Hours) || 0,
            weekly_workdays: Number(formData.Weekly_Workdays) || 0,
            base_salary: Number(formData.Base_Salary) || 0,
            payment_frequency: formData.Payment_Frequency.trim(),
            account_name: formData.Account_Name.trim(),
            account_number: formData.Account_Number.trim(),
            bank_name: formData.Bank_Name.trim(),
            overtime_hours_allowance: Number(formData.Overtime_Hours_Allowance) || 0,
            housing_allowance: Number(formData.Housing_Allowance) || 0,
            transport_allowance: Number(formData.Transport_Allowance) || 0,
            medical_allowance: Number(formData.Medical_Allowance) || 0,
            employee_contribution: Number(formData.Employee_Contribution) || 0,
            company_match: Number(formData.Company_Match) || 0,
            paye_deduction: Number(formData.Paye_Deduction) || 0,
            insurance_provider: formData.Insurance_Provider.trim(),
            leadway_insurance: formData.LeadWay_Health_Insurance.trim(),
            annual_leave_days: Number(formData.Annual_Leave_Days) || 0,
        };

        console.log("Formatted Payload:", payload); // ✅ Log formatted payload before sending API request

        // ✅ Send API request
        const response = await fetch(`https://proximahr.onrender.com/employee-management/create-employee-profile?company_id=${companyId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        });

        const result = await response.json();
        console.log("API Response:", result); // ✅ Log API response

        if (!response.ok) {
            console.error("API Error Response:", result);
            throw new Error(result.detail ? JSON.stringify(result.detail, null, 2) : 'Failed to create employee');
        }

        localStorage.setItem('employee_id', result.data.employee_id);
        setSuccess(true);
    } catch (err) {
        console.error("Error:", err.message); // ✅ Log errors
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
              <h1 className="employee-profile" style={{
                    fontFamily: "Inter",
                    fontSize: "24px",
                    fontWeight: "500",
                    lineHeight: "29.05px",
                    textAlign: "left",
                    textUnderlinePosition: "from-font",
                    textDecorationSkipInk: "none",
                    color:" #2E2E2E",
                    textDecoration: "none",
              }}>
                <FontAwesomeIcon icon="fa-solid fa-arrow-left" className="left-arrow" />
                Add New Employee
              </h1>
            </Link>
            <h6>{new Date().toDateString()}</h6>
          </div>

          {/* Display general errors */}
          {error.general && <div className="error-box"><p>{error.general}</p></div>}

          {success && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "70vh",
                width: "100%",
                backgroundColor: "#f8f9fa", // Light background for contrast
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  padding: "30px",
                  borderRadius: "12px",
                  backgroundColor: "#fff",
                  boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.15)", // 🔥 Improved shadow
                  maxWidth: "400px",
                  width: "90%",
                  transition: "all 0.3s ease-in-out", // Smooth hover effect
                }}
              >
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  style={{
                    fontSize: "50px",
                    color: "green",
                    marginBottom: "15px",
                    animation: "pop 0.5s ease-in-out",
                  }}
                />
                <h1 style={{ fontSize: "20px", color: "#333", marginBottom: "10px" }}>
                  Employee Added Successfully
                </h1>
                <p style={{ fontSize: "14px", color: "#666", marginBottom: "15px" }}>
                  The new employee profile has been created successfully and is now part of
                  the company database.
                </p>
                <Link
                  to="/employee-managment"
                  style={{
                    fontSize: "16px",
                    color: "#007bff",
                    textDecoration: "none",
                    fontWeight: "bold",
                  }}
                >
                  Employee Management
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


                {/* 🔵 Basic Information Section */}
                {activeSection === 'Basic Information' && (
                  <div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>First Name <span style={{ color: 'red' }}>(Required)</span></label>
                        <input type="text" name="First_Name" value={formData.First_Name} onChange={handleInputChange} className="formInput" placeholder="Enter First Name" />
                        {error.First_Name && <div className="error-message">{error.First_Name}</div>}
                      </div>
                      <div className="form-group">
                        <label>Last Name <span style={{ color: 'red' }}>(Required)</span></label>
                        <input type="text" name="Last_Name" value={formData.Last_Name} onChange={handleInputChange} className="formInput" placeholder="Enter Last Name" />
                        {error.Last_Name && <div className="error-message">{error.Last_Name}</div>}
                      </div>
                    </div>

                    <div className="form-group">
                        <label>Email <span style={{ color: 'red' }}>(Required)</span></label>
                        <input type="email" name="Email" value={formData.Email} onChange={handleInputChange} className="formInput" placeholder="Enter Email" />
                        {error.Email && <div className="error-message">{error.Email}</div>}
                    </div>

                    <div className="form-row">
                    <div className="form-group">
                        <label>Employee ID <span style={{ color: 'red' }}>(Required)</span></label>
                        <input type="email" name="Employee_Id" value={formData.Employee_Id} onChange={handleInputChange} className="formInput" placeholder="Enter Employee ID" />
                        {error.Employee_Id && <div className="error-message">{error.Employee_Id}</div>}
                      </div>
                      <div className="form-group">
                        <label>Phone Number <span style={{ color: 'red' }}>(Required)</span></label>
                        <input type="text" name="Phone_Number" value={formData.Phone_Number} onChange={handleInputChange} className="formInput" placeholder="Enter Phone Number" />
                        {error.Phone_Number && <div className="error-message">{error.Phone_Number}</div>}
                      </div>
                    </div>

                    <div className="form-row">
                    <div className="form-group">
                        <label>Date of Birth <span style={{ color: 'red' }}>(Required)</span></label>
                        <input type="Date" name="Date_of_Birth" value={formData.Date_of_Birth} onChange={handleInputChange} className="formInput" />
                        {error.Date_of_Birth && <div className="error-message">{error.Date_of_Birth}</div>}
                      </div>
                      <div className="form-group">
                      <label>Gender <span style={{ color: 'red' }}>(Required)</span></label>
                      <select name="Gender" value={formData.Gender} onChange={handleInputChange} className="formInput">
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                      {error.Gender && <div className="error-message">{error.Gender}</div>}
                    </div>
                    </div>

                    <div className="form-row">
                    <div className="form-group">
                        <label>Home Address <span style={{ color: 'red' }}>(Required)</span></label>
                        <input type="email" name="Home_Address" value={formData.Home_Address} onChange={handleInputChange} className="formInput" placeholder="Enter Home Address" />
                        {error.Home_Address && <div className="error-message">{error.Home_Address}</div>}
                      </div>
                      <div className="form-group">
                        <label>Nationality <span style={{ color: 'red' }}>(Required)</span></label>
                        <input type="text" name="Nationality" value={formData.Nationality} onChange={handleInputChange} className="formInput" placeholder="Enter Country" />
                        {error.Phone_Number && <div className="error-message">{error.Nationality}</div>}
                      </div>
                    </div>


                    {/* Move to Next Section */}
                    <button style={{marginLeft:"450px"}} className="next-btn" onClick={() => setActiveSection('Employment Details')}>Next</button>
                  </div>
                )}

                {/* 🟠 Employment Details Section */}
                {activeSection === 'Employment Details' && (
                  <div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Job Title <span style={{ color: 'red' }}>(Required)</span></label>
                        <input type="text" name="Job_Title" value={formData.Job_Title} onChange={handleInputChange} className="formInput" placeholder="Enter Job Title" />
                        {error.Job_Title && <div className="error-message">{error.Job_Title}</div>}
                      </div>
                      <div className="form-group">
                        <label>Department <span style={{ color: 'red' }}>(Required)</span></label>
                        <select name="Department" value={formData.Department} onChange={handleInputChange} className="formInput">
                          <option value="">Select Department</option>
                          {departments.map(dept => (
                            <option key={dept.id} value={dept.name}>{dept.name}</option>
                          ))}
                        </select>
                        {error.Department && <div className="error-message">{error.Department}</div>}
                      </div>
                    </div>

                    <div className="form-row">
                    <div className="form-group">
                        <label>Role <span style={{ color: 'red' }}>(Required)</span></label>
                        <select name="Role" value={formData.Role} onChange={handleInputChange} className="formInput">
                          <option value="">Select Role</option>
                          <option value="employee">employee</option>
                          <option value="Manager">Manager</option>
                        </select>
                        {error.Department && <div className="error-message">{error.Department}</div>}
                      </div>
                      <div className="form-group">
                        <label>Employment Date <span style={{ color: 'red' }}>(Required)</span></label>
                        <input type="Date" name="Employment_Date" value={formData.Employment_Date} onChange={handleInputChange} className="formInput"/>
                        {error.Employment_Date && <div className="error-message">{error.Employment_Date}</div>}
                      </div>
                    </div>

                    <div className="form-row">
                    <div className="form-group">
                        <label>Work Mode <span style={{ color: 'red' }}>(Required)</span></label>
                        <select name="Work_Mode" value={formData.Work_Mode} onChange={handleInputChange} className="formInput">
                          <option value="">Select Work Mode</option>
                          <option value="Onsite">Onsite</option>
                          <option value="Remote">Remote</option>
                        </select>
                        {error.Work_Mode && <div className="error-message">{error.Work_Mode}</div>}
                      </div>
                      <div className="form-group">
                        <label>Work Location<span style={{ color: 'red' }}>(Required)</span></label>
                        <input type="text" name="Work_Location" value={formData.Work_Location} onChange={handleInputChange} className="formInput" placeholder="Enter Work Location"/>
                        {error.Work_Location && <div className="error-message">{error.Work_Location}</div>}
                      </div>
                    </div>

                    <div className="form-row">
                    <div className="form-group">
                        <label>Working Hours <span style={{ color: 'red' }}>(Required)</span></label>
                        <select name="Working_Hours" value={formData.Working_Hours} onChange={handleInputChange} className="formInput">
                          <option value="">Choose Working Hours</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                        </select>
                        {error.Working_Hours && <div className="error-message">{error.Working_Hours}</div>}
                      </div>
                      <div className="form-group">
                        <label>Vacation Days<span style={{ color: 'red' }}>(Required)</span></label>
                        <input type="text" name="Vacation_Days" value={formData.Vacation_Days} onChange={handleInputChange} className="formInput" placeholder="Enter Amount of Vacation Days"/>
                        {error.Vacation_Days && <div className="error-message">{error.Vacation_Days}</div>}
                      </div>
                    </div>
                    <div className="form-group">
                        <label>Weekly Workdays <span style={{ color: 'red' }}>(Required)</span></label>
                        <select name="Weekly_Workdays" value={formData.Weekly_Workdays} onChange={handleInputChange} className="formInput">
                          <option value="">Choose the Amount of Weekly workdays</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                        {error.Weekly_Workdays && <div className="error-message">{error.Weekly_Workdays}</div>}
                      </div>


                    {/* Navigation Buttons */}
                    <div className="newest-button-div" >
                      <button className="prev-btn" onClick={() => setActiveSection('Basic Information')}>Previous</button>
                      <button className="next-btn" onClick={() => setActiveSection('Compensation Details')}>Next</button>
                    </div>
                  </div>
                )}

                {/* 🟢 Compensation Details Section */}
                {activeSection === 'Compensation Details' && (
                  <div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Base Salary <span style={{ color: 'red' }}>*</span></label>
                        <input type="number" name="Base_Salary" value={formData.Base_Salary} onChange={handleInputChange} className="formInput" placeholder="Enter Salary" />
                        {error.Base_Salary && <div className="error-message">{error.Base_Salary}</div>}
                      </div>
                      <div className="form-group">
                        <label>Payment Frequency <span style={{ color: 'red' }}>*</span></label>
                        <select name="Payment_Frequency" value={formData.Payment_Frequency} onChange={handleInputChange} className="formInput">
                          <option value="">Choose Payment Frequency</option>
                          <option value="Monthly">Monthly</option>
                          <option value="Weekly">Weekly</option>
                          <option value="Bi-Weekly">Bi-Weekly</option>
                        </select>
                        {error.Payment_Frequency && <div className="error-message">{error.Payment_Frequency}</div>}
                      </div>
                    </div>
                    <div className="form-row">
                    <div className="form-group">
                        <label>Overtime Hours Allowance <span style={{ color: 'red' }}>(Required)</span></label>
                        <input type="number" name="Overtime_Hours_Allowance" value={formData.Overtime_Hours_Allowance} onChange={handleInputChange} className="formInput" placeholder="Enter Overtime Hours Allowance" />
                        {error.Overtime_Hours_Allowance && <div className="error-message">{error.Overtime_Hours_Allowance}</div>}
                      </div>
                      <div className="form-group">
                        <label>Housing Allowance <span style={{ color: 'red' }}>(Required)</span></label>
                        <input type="text" name="Housing_Allowance" value={formData.Housing_Allowance} onChange={handleInputChange} className="formInput" placeholder="Enter Housing Allowance" />
                        {error.Housing_Allowance && <div className="error-message">{error.Housing_Allowance}</div>}
                      </div>
                    </div>
                    <div className="form-row">
                    <div className="form-group">
                        <label>Account Name <span style={{ color: 'red' }}>(Required)</span></label>
                        <input type="text" name="Account_Name" value={formData.Account_Name} onChange={handleInputChange} className="formInput" placeholder="Enter Account Name" />
                        {error.Account_Name && <div className="error-message">{error.OAccount_Name}</div>}
                      </div>
                      <div className="form-group">
                        <label>Account Number <span style={{ color: 'red' }}>(Required)</span></label>
                        <input type="text" name="Account_Number" value={formData.Account_Number} onChange={handleInputChange} className="formInput" placeholder="Enter Account Number" />
                        {error.Account_Number && <div className="error-message">{error.Account_Number}</div>}
                      </div>
                    </div>
                    <div className="form-group">
                        <label>Bank Name<span style={{ color: 'red' }}>(Required)</span></label>
                        <select name="Bank_Name" value={formData.Bank_Name} onChange={handleInputChange} className="formInput">
                          <option value="">Choose Bank</option>
                          <option value="FCMB">FCMB</option>
                          <option value="GTB">GTB</option>
                          <option value="FIrst Bank">First Bank</option>
                          <option value="Zenith Bank">Zenith Bank</option>
                          <option value="Jaiz Bank">Jaiz Bank</option>
                          <option value="Unity Bank">Unity Bank</option>
                          <option value="Access Bank">Access Bank</option>
                        </select>
                        {error.Bank_Name && <div className="error-message">{error.Bank_Name}</div>}
                      </div>

                      <div className="form-row">
                      <div className="form-group">
                          <label>Medical Allowance<span style={{ color: 'red' }}></span></label>
                          <input type="text" name="Medical_Allowance" value={formData.Medical_Allowance} onChange={handleInputChange} className="formInput" placeholder="Enter Medical Allowance" />
                          {error.Medical_Allowance && <div className="error-message">{error.Medical_Allowance}</div>}
                        </div>
                        <div className="form-group">
                          <label>Transport Allowance <span style={{ color: 'red' }}></span></label>
                          <input type="text" name="Transport_Allowance" value={formData.Transport_Allowance} onChange={handleInputChange} className="formInput" placeholder="Enter Housing Allowance" />
                          {error.Transport_Allowance && <div className="error-message">{error.Transport_Allowance}</div>}
                        </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                          <label>Employee Contribution<span style={{ color: 'red' }}></span></label>
                          <input type="number" name="Employee_Contribution" value={formData.Employee_Contribution} onChange={handleInputChange} className="formInput" placeholder="Enter Employee Contribution" />
                          {error.Employee_Contribution && <div className="error-message">{error.Employee_Contribution}</div>}
                        </div>
                        <div className="form-group">
                          <label>Company Match<span style={{ color: 'red' }}></span></label>
                          <input type="text" name="Company_Match" value={formData.Company_Match} onChange={handleInputChange} className="formInput" placeholder="Enter percentage of Company Match" />
                          {error.Company_Match && <div className="error-message">{error.Company_Match}</div>}
                        </div>
                    </div>

                    <div className="form-group">
                      <label>PAYE Deductions<span style={{ color: 'red' }}>(Required)</span></label>
                          <input type="number" name="Paye_Deduction" value={formData.Paye_Deduction} onChange={handleInputChange} className="formInput" placeholder="Enter percentage of PAYE Deduction" />
                          {error.Paye_Deduction && <div className="error-message">{error.Paye_Deduction}</div>}
                    </div>
                    <div className="form-row">
                    <div className="form-group">
                        <label>Insurance Provider <span style={{ color: 'red' }}>*</span></label>
                        <select name="Insurance_Provider" value={formData.Insurance_Provider} onChange={handleInputChange} className="formInput">
                          <option value="">Choose Insurance Provider</option>
                          <option value="Leadway Assurance">Leadway Assurance</option>
                          <option value="AXA MansaardInsurance">AXA MansaardInsurance </option>
                          <option value="Custodian and Allied Insurance">Custodian and Allied Insurance </option>
                          <option value="Cornerstone Insurance">Cornerstone Insurance </option>
                          <option value="FBN Insurance ">FBN Insurance </option>
                          <option value="African Alliance Insurance">African Alliance Insurance </option>
                        </select>
                        {error.Payment_Frequency && <div className="error-message">{error.Payment_Frequency}</div>}
                      </div>
                      <div className="form-group">
                        <label>Leadway Assurance <span style={{ color: 'red' }}>*</span></label>
                        <select name="Leadway_Assurance" value={formData.Leadway_Assurance} onChange={handleInputChange} className="formInput">
                          <option value="">Choose The Type Of Leadway Health Insurance</option>
                          <option value="Group Life Assurance">Group Life Assurance</option>
                          <option value="Employee Compensation Insurance">Employee Compensation Insurance</option>
                          <option value="Health Insurance Plans">Health Insurance Plans</option>
                          <option value="Personal Accident Insurance">Personal Accident Insurance</option>
                          <option value="Travel Insurance">Travel Insurance</option>
                        </select>
                        {error.Payment_Frequency && <div className="error-message">{error.Payment_Frequency}</div>}
                      </div>
                    </div>



                    {/* Navigation Buttons & Submit */}
                    <div className="newest-button-div-2">
                      <div><button className="prev-btn" onClick={() => setActiveSection('Employment Details')}>Previous</button></div>
                      <div>
                        <button className="submit-btn" onClick={handleAddEmployee} disabled={loading}>
                            {loading ? 'Adding...' : 'Add Employee'}
                        </button>
                      </div>
                        
                    </div>

                  </div>
                )}
              </div>

             {/* <div className='add-employee-btn'>
                <button className='btn-2' onClick={handleAddEmployee} disabled={loading}>{loading ? 'Adding...' : 'Add Employee'}</button>
            </div> */}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
