import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import EmployerNavbar from '../components/EmployerNavbar';
import Select from 'react-select';
import '../pages/AddEmployee.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas, faCircleCheck } from '@fortawesome/free-solid-svg-icons';


const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", 
  "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", 
  "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", 
  "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", 
  "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", 
  "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", 
  "Cyprus", "Czech Republic", "Democratic Republic of the Congo", "Denmark", "Djibouti", 
  "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", 
  "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", 
  "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", 
  "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", 
  "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", 
  "Korea (North)", "Korea (South)", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", 
  "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", 
  "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", 
  "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", 
  "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", 
  "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", 
  "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", 
  "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", 
  "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", 
  "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", 
  "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", 
  "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", 
  "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", 
  "Zimbabwe"
];
const insuranceProviders = [
  "Leadway Assurance", "AIICO Insurance", "AXA Mansard Insurance",
  "Custodian and Allied Insurance", "Cornerstone Insurance", "FBN Insurance",
  "African Alliance Insurance", "Industrial and General Insurance", "Mutual Benefits Assurance",
  "NEM Insurance", "Royal Exchange Insurance", "Standard Alliance Insurance"
];

const EditEmployee = () => {
  const navigate = useNavigate();
  const selectedEmployeeId = localStorage.getItem('selectedEmployee_id');
  const [formData, setFormData] = useState({});
  const [departments, setDepartments] = useState([]); 
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState('Basic Information')
  const [success, setSuccess] = useState(false); // State to control modal visibility

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('authData'))?.access_token;
    console.log('Token:', token);
    const fetchData = async () => {
      const selectedEmployeeId = localStorage.getItem('selectedEmployee_id');
      console.log('Selected Employee ID:', selectedEmployeeId);
      try {
        const empRes = await fetch(`https://proximahr.onrender.com/api/v2/employee-management/${selectedEmployeeId}/employee`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const empData = await empRes.json();
        console.log('Fetched Employee Data:', empData);
        console.log('Phone_Number:', empData.data.phone_number);

        const formatDate = (dateString) => {
          const date = new Date(dateString);
          return date.toISOString().split('T')[0]; // Converts to yyyy-MM-dd
        };

        setFormData({
          Phone_Number: empData.data.phone_number || '',
          First_Name: empData.data.first_name || '',
          Last_Name: empData.data.last_name || '',
          Email: empData.data.email || '',
          Date_of_Birth: empData.data.date_of_birth ? formatDate(empData.data.date_of_birth) : '',
          Gender: empData.data.gender  || '',
          Home_Address: empData.data.home_address || '',
          Nationality: empData.data.country || '',
          Job_Title: empData.data.job_title || '',
          Department: empData.data.department || '',
          Role: empData.data.role || '',
          Employment_Date: empData.data.employment_date ? formatDate(empData.data.employment_date) : '',
          Work_Mode: empData.data.work_mode || '',
          Work_Location: empData.data.work_location || '',
          Working_Hours: empData.data.working_hours?.toString() || '',
          Weekly_Workdays: empData.data.weekly_workdays?.toString() || '',
          Base_Salary: empData.data.base_salary?.toString() || '',
          Payment_Frequency: empData.data.payment_frequency || '',
          Account_Name: empData.data.account_name || '',
          Account_Number: empData.data.account_number || '',
          Bank_Name: empData.data.bank_name || '',
          Overtime_Hours_Allowance: empData.data.overtime_hours_allowance?.toString() || '',
          Housing_Allowance: empData.data.housing_allowance?.toString() || '',
          Transport_Allowance: empData.data.transport_allowance?.toString() || '',
          Medical_Allowance: empData.data.medical_allowance?.toString() || '',
          Employee_Contribution: empData.data.employee_contribution?.toString() || '',
          Company_Match: empData.data.company_match?.toString() || '',
          Paye_Deduction: empData.data.paye_deduction?.toString() || '',
          Insurance_Provider: empData.data.insurance_provider || '',
          LeadWay_Health_Insurance: empData.data.leadway_insurance || '',
          Annual_Leave_Days: empData.data.annual_leave_days?.toString() || ''
        });
      } catch (err) {
        setError('Failed to fetch employee data.');
      } finally {
        setLoading(false);
      }
    };


    const fetchDepartments = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('authData'))?.access_token;
        const res = await fetch('https://proximahr.onrender.com/departments', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        setDepartments(data.departments || []);
      } catch (err) {
        console.error('Error fetching departments:', err);
      }
    };

    const fetchBanks = async () => {
      try {
        const res = await fetch("https://api.paystack.co/bank?currency=NGN", {
          headers: {
            Authorization: "Bearer sk_test_4962f99088af5dcaae9328c194b71d68c4d896a9",
          },
        });
        const data = await res.json();
        if (data.status) {
          const bankOptions = data.data.map(bank => ({ label: bank.name, value: bank.name }));
          setBanks(bankOptions);
        }
      } catch (err) {
        console.error("Failed to fetch banks:", err);
      }
    };

    fetchData();
    fetchDepartments();
    fetchBanks();
  }, [selectedEmployeeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (field, selectedOption) => {
    setFormData(prev => ({ ...prev, [field]: selectedOption ? selectedOption.value : '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation check before sending data
    if (!formData.First_Name || !formData.Last_Name || !formData.Email || !formData.Phone_Number) {
      toast.error("Please fill in all required fields."); // Display error if required fields are missing
      return; // Stop the submission if validation fails
    }

    // Create the formatted data object matching the API documentation
    const formattedData = {
      first_name: formData.First_Name || null,
      last_name: formData.Last_Name || null,
      email: formData.Email || null,
      phone_number: formData.Phone_Number || null,
      date_of_birth: formData.Date_of_Birth || null,
      gender: formData.Gender || null,
      home_address: formData.Home_Address || null,
      country: formData.Nationality || null,
      job_title: formData.Job_Title || null,
      role: formData.Role || null,
      employment_date: formData.Employment_Date || null,
      work_mode: formData.Work_Mode || null,
      work_location: formData.Work_Location || null,
      working_hours: formData.Working_Hours ? parseInt(formData.Working_Hours) : null,
      weekly_workdays: formData.Weekly_Workdays ? parseInt(formData.Weekly_Workdays) : null,
      base_salary: formData.Base_Salary ? parseInt(formData.Base_Salary) : null,
      payment_frequency: formData.Payment_Frequency || null,
      account_name: formData.Account_Name || null,
      account_number: formData.Account_Number || null,
      bank_name: formData.Bank_Name || null,
      overtime_hours_allowance: formData.Overtime_Hours_Allowance ? parseInt(formData.Overtime_Hours_Allowance) : null,
      housing_allowance: formData.Housing_Allowance ? parseInt(formData.Housing_Allowance) : null,
      transport_allowance: formData.Transport_Allowance ? parseInt(formData.Transport_Allowance) : null,
      medical_allowance: formData.Medical_Allowance ? parseInt(formData.Medical_Allowance) : null,
      employee_contribution: formData.Employee_Contribution ? parseInt(formData.Employee_Contribution) : null,
      company_match: formData.Company_Match ? parseInt(formData.Company_Match) : null,
      paye_deduction: formData.Paye_Deduction ? parseInt(formData.Paye_Deduction) : null,
      insurance_provider: formData.Insurance_Provider || null,
      leadway_insurance: formData.LeadWay_Health_Insurance || null,
      annual_leave_days: formData.Annual_Leave_Days ? parseInt(formData.Annual_Leave_Days) : null,
    };

    const token = JSON.parse(localStorage.getItem('authData'))?.access_token;
    try {
      const response = await fetch(`https://proximahr.onrender.com/api/v2/employee-management/${selectedEmployeeId}/edit-employee`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) throw new Error('Update failed');

      // Show success message
      toast.success("Employee updated successfully!");

      // Delay navigation to allow the toast to display
      setTimeout(() => {
        navigate('/employee-managment/view-profile');
      }, 2000); // 2-second delay
    } catch (err) {
      toast.error("Failed to update employee. Please try again.");
    }
  };


  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-box">{error}</div>;

  return (
        
    <div className="main-dashboard">
      <Sidebar />
      <div className="dashboard">
        <EmployerNavbar />
        <hr className="horizontal" />
        <div className="dashboard-details">
        <Link to={'/employee-managment/view-profile'} style={{textDecoration: "none"}}>
            <h5 className="employee-profile" style={{textDecoration: "none", marginBottom:'15px'}} >
              <FontAwesomeIcon icon="fa-solid fa-arrow-left" className="left-arrow" />
              Edit Employee
            </h5>
          </Link>
        </div>

        <div className="dashboard-details-1">
          <p
            className={activeSection === 'Basic Information' ? 'active' : ''}
            onClick={() => setActiveSection('Basic Information')}
          >
            Basic Information
          </p>
          <p
            className={activeSection === 'Employment Details' ? 'active' : ''}
            onClick={() => setActiveSection('Employment Details')}
          >
            Employment Details
          </p>
          <p
            className={activeSection === 'Compensation Details' ? 'active' : ''}
            onClick={() => setActiveSection('Compensation Details')}
          >
            Compensation Details
          </p>
        </div>


        <form className="add-employee-form" onSubmit={handleSubmit} style ={{width: '100%', marginTop: '20px', padding: '20px'}}>
        <div style={{ display: activeSection === 'Basic Information' ? 'block' : 'none' }}>
        <div className="form-row">
            <div className="form-group">
            <label htmlFor="" style={{fontFamily:'Inter'}}>First Name</label> 
            <input name="First_Name" placeholder="First Name" value={formData.First_Name || ''} onChange={handleChange} className="formInput" />
            </div>

            <div className="form-group">
            <label htmlFor="" style={{fontFamily:'Inter'}}>Last Name</label> 
            <input name="Last_Name" placeholder="Last Name" value={formData.Last_Name || ''} onChange={handleChange} className="formInput"/>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
            <label htmlFor="" style={{fontFamily:'Inter'}}>Email</label> 
            <input name="Email" placeholder="Email" value={formData.Email || ''} onChange={handleChange} className="formInput" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
            <label htmlFor="" style={{fontFamily:'Inter'}}>Phone Number</label> 
          <input name="Phone_Number" placeholder="Phone Number" value={formData.Phone_Number || ''} onChange={handleChange} className="formInput" />
          </div>
          <div className="form-group">
          <label htmlFor="" style={{fontFamily:'Inter'}}>Date of Birth</label> 
          <input name="Date_of_Birth" type="date" value={formData.Date_of_Birth || ''} onChange={handleChange} className="formInput"/>
          </div>
          </div>

          <div className="form-row">
          <div className="form-group">
          <label htmlFor="" style={{fontFamily:'Inter'}}>Gender</label> 
          <select name="Gender" value={formData.Gender || ''} onChange={handleChange} className="formInput">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          </div>
          <div className="form-group">
        <label htmlFor="" style={{fontFamily:'Inter'}}>Address</label> 
          <input name="Home_Address" placeholder="Home Address" value={formData.Home_Address || ''} onChange={handleChange} className="formInput" />
          </div>
          </div>

          <div className="form-row">
            <div className='form-group' >
            <label htmlFor="" style={{fontFamily:'Inter'}}>Country</label> 
                <select name="Nationality" value={formData.Nationality || ''} onChange={handleChange} className="formInput">
                  <option value="">Select Nationality</option>
                  {countries.map((c, i) => <option key={i} value={c}>{c}</option>)}
                </select>
            </div>
          </div>
          <button style={{marginLeft:"450px"}} className="next-btn" type="button" onClick={() => setActiveSection('Employment Details')}>
            Next
          </button>
        </div>

        <div style={{ display: activeSection === 'Employment Details' ? 'block' : 'none' }}>
          <div className="form-row">
            <div className="form-group" >
              <label htmlFor="" style={{fontFamily:'Inter'}}>Job Title</label>
            <input name="Job_Title" placeholder="Job Title" value={formData.Job_Title || ''} onChange={handleChange} className="formInput" />
            </div>
            

            <div className="form-group"  >
              <label htmlFor="" style={{fontFamily:'Inter'}}> Department</label>
            <select name="Department" value={formData.Department || ''} onChange={handleChange} className="formInput"> 
              <option value="">Select Department</option>
              {departments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
            </select>
            </div>
            </div>

          <div className="form-row" >
            <div className="form-group" >
              <label htmlFor="" style={{ fontFamily: 'Inter' }}>Role</label>
            <select name="Role" value={formData.Role || ''} onChange={handleChange} className="formInput">
              <option value="">Select Role</option>
              <option value="Employee">Employee</option>
              <option value="Manager">Manager</option>
            </select>
            </div>
            <div className="form-group">
              <label htmlFor="" style={{ fontFamily: 'Inter' }}>Employment Date</label>
              <input name="Employment_Date" type="date" value={formData.Employment_Date || ''} onChange={handleChange} className="formInput" />
            </div>
            </div>

              <div className="form-row">
              <div className="form-group">
                <label htmlFor="" style={{ fontFamily: 'Inter' }}>Work Mode</label>
                <select name="Work_Mode" value={formData.Work_Mode || ''} onChange={handleChange} className="formInput">
                <option value="">Select Work Mode</option>
                <option value="Onsite">Onsite</option>
                <option value="Remote">Remote</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="" style={{ fontFamily: 'Inter' }}>Work Location</label>
                <input name="Work_Location" placeholder="Work Location" value={formData.Work_Location || ''} onChange={handleChange} className="formInput" />
              </div>
              </div>

              <div className="form-row">
              <div className="form-group">
                <label htmlFor="" style={{ fontFamily: 'Inter' }}>Working Hours</label>
                <input name="Working_Hours" placeholder="Working Hours" type="number" value={formData.Working_Hours || ''} onChange={handleChange} className="formInput" />
              </div>
              <div className="form-group">
                <label htmlFor="" style={{ fontFamily: 'Inter' }}>Weekly Workdays</label>
                <input name="Weekly_Workdays" placeholder="Weekly Workdays" type="number" value={formData.Weekly_Workdays || ''} onChange={handleChange} className="formInput" />
              </div>
              </div>
              <div className="newest-button-div" >
                
              <button className="prev-btn"  type="button" onClick={() => setActiveSection('Basic Information')}>
                  Previous
                </button>
                <button className="next-btn" type="button" onClick={() => setActiveSection('Compensation Details')}>
                  Next
                </button>

              </div>

        </div>

        <div style={{ display: activeSection === 'Compensation Details' ? 'block' : 'none' }}>
          <div className="form-row">
                <div className="form-group">
                  <label htmlFor="" style={{ fontFamily: 'Inter' }}>Base Salary</label>
                  <input name="Base_Salary" placeholder="Base Salary" type="number" value={formData.Base_Salary || ''} onChange={handleChange} className="formInput" />
                </div>
                <div className="form-group">
                  <label htmlFor="" style={{ fontFamily: 'Inter' }}>Payment Frequency</label>
                  <select name="Payment_Frequency" value={formData.Payment_Frequency || ''} onChange={handleChange} className="formInput">
                    <option value="">Select Payment Frequency</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Bi-Weekly">Bi-Weekly</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="" style={{ fontFamily: 'Inter' }}>Bank Name</label>
                  <Select
                    placeholder="Select Bank"
                    options={banks}
                    value={banks.find(b => b.value === formData.Bank_Name) || null}
                    onChange={(opt) => handleSelectChange('Bank_Name', opt)}
                    className="formInput"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="" style={{ fontFamily: 'Inter' }}>Account Name</label>
                  <input name="Account_Name" placeholder="Account Name" value={formData.Account_Name || ''} onChange={handleChange} className="formInput" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="" style={{ fontFamily: 'Inter' }}>Account Number</label>
                  <input name="Account_Number" placeholder="Account Number" value={formData.Account_Number || ''} onChange={handleChange} className="formInput" />
                </div>
                <div className="form-group">
                  <label htmlFor="" style={{ fontFamily: 'Inter' }}>Overtime Hours Allowance</label>
                  <input name="Overtime_Hours_Allowance" placeholder="Overtime Hours Allowance" type="number" value={formData.Overtime_Hours_Allowance || ''} onChange={handleChange} className="formInput" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="" style={{ fontFamily: 'Inter' }}>Housing Allowance</label>
                  <input name="Housing_Allowance" placeholder="Housing Allowance" type="number" value={formData.Housing_Allowance || ''} onChange={handleChange} className="formInput" />
                </div>
                <div className="form-group">
                  <label htmlFor="" style={{ fontFamily: 'Inter' }}>Transport Allowance</label>
                  <input name="Transport_Allowance" placeholder="Transport Allowance" type="number" value={formData.Transport_Allowance || ''} onChange={handleChange} className="formInput" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="" style={{ fontFamily: 'Inter' }}>Medical Allowance</label>
                  <input name="Medical_Allowance" placeholder="Medical Allowance" type="number" value={formData.Medical_Allowance || ''} onChange={handleChange} className="formInput" />
                </div>
                <div className="form-group">
                  <label htmlFor="" style={{ fontFamily: 'Inter' }}>Employee Contribution (%)</label>
                  <input name="Employee_Contribution" placeholder="Employee Contribution %" type="number" value={formData.Employee_Contribution || ''} onChange={handleChange} className="formInput" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="" style={{ fontFamily: 'Inter' }}>Company Match (%)</label>
                  <input name="Company_Match" placeholder="Company Match %" type="number" value={formData.Company_Match || ''} onChange={handleChange} className="formInput" />
                </div>
                <div className="form-group">
                  <label htmlFor="" style={{ fontFamily: 'Inter' }}>PAYE Deduction (%)</label>
                  <input name="Paye_Deduction" placeholder="PAYE Deduction %" type="number" value={formData.Paye_Deduction || ''} onChange={handleChange} className="formInput" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="" style={{ fontFamily: 'Inter' }}>Insurance Provider</label>
                  <select name="Insurance_Provider" value={formData.Insurance_Provider || ''} onChange={handleChange} className="formInput">
                    <option value="">Select Insurance Provider</option>
                    {insuranceProviders.map((p, i) => <option key={i} value={p}>{p}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="" style={{ fontFamily: 'Inter' }}>LeadWay Health Insurance</label>
                  <select name="LeadWay_Health_Insurance" value={formData.LeadWay_Health_Insurance || ''} onChange={handleChange} className="formInput">
                    <option value="">Select LeadWay Health Insurance</option>
                    <option value="Group Life Assurance">Group Life Assurance</option>
                    <option value="Employee Compensation Insurance">Employee Compensation Insurance</option>
                    <option value="Health Insurance Plans">Health Insurance Plans</option>
                    <option value="Personal Accident Insurance">Personal Accident Insurance</option>
                    <option value="Travel Insurance">Travel Insurance</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="" style={{ fontFamily: 'Inter' }}>Annual Leave Days</label>
                  <input name="Annual_Leave_Days" placeholder="Annual Leave Days" type="number" value={formData.Annual_Leave_Days || ''} onChange={handleChange} className="formInput" />
                </div>
              </div>

              <div className="newest-button-div-2">
                <button type="button" className="prev-btn" onClick={() => setActiveSection('Employment Details')}>
                  Previous
                </button>
                <button type="submit" className="submit-btn">Update Employee</button>
            </div>
            </div>
        </form>

        {/* {success && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "70vh",
            width: "100%",
            backgroundColor: "#f8f9fa",
          }}
        >
          <div
            style={{
              textAlign: "center",
              padding: "30px",
              borderRadius: "12px",
              backgroundColor: "#fff",
              boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.15)",
              maxWidth: "400px",
              width: "90%",
              transition: "all 0.3s ease-in-out",
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
              Employee Updated Successfully
            </h1>
            <p style={{ fontSize: "14px", color: "#666", marginBottom: "15px" }}>
              The employee profile has been updated successfully and is now part of
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
      )} */}
      </div>


      <ToastContainer />

    </div>
  );
    
};




export default EditEmployee;









