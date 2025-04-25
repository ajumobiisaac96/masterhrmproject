import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import EmployerNavbar from '../components/EmployerNavbar';
import Select from 'react-select';
import '../pages/AddEmployee.css';

const countries = ["Nigeria", "Ghana", "Kenya", "South Africa", "United States", "United Kingdom", "Canada", "Germany", "France", "India"];
const insuranceProviders = [
  "Leadway Assurance", "AIICO Insurance", "AXA Mansard Insurance",
  "Custodian and Allied Insurance", "Cornerstone Insurance", "FBN Insurance",
  "African Alliance Insurance", "Industrial and General Insurance", "Mutual Benefits Assurance",
  "NEM Insurance", "Royal Exchange Insurance", "Standard Alliance Insurance"
];

const EditEmployee = () => {
  const navigate = useNavigate();
  const selectedEmployeeId = localStorage.getItem('selectedEmployeeId');
  const [formData, setFormData] = useState({});
  const [departments, setDepartments] = useState([]);
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('authData'))?.access_token;

    const fetchData = async () => {
      console.log('Selected Employee ID:', selectedEmployeeId);
      try {
        const empRes = await fetch(`https://proximahr.onrender.com/api/v2/employee-management/${selectedEmployeeId}/employee`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const empData = await empRes.json();
        console.log('Fetched Employee Data:', empData);
        setFormData({
          Phone_Number: empData.phone_number || '',
          First_Name: empData.first_name || '',
          Last_Name: empData.last_name || '',
          Email: empData.email || '',
          Date_of_Birth: empData.date_of_birth || '',
          Gender: empData.gender || '',
          Home_Address: empData.home_address || '',
          Nationality: empData.country || '',
          Job_Title: empData.job_title || '',
          Department: empData.department || '',
          Role: empData.role || '',
          Employment_Date: empData.employment_date || '',
          Work_Mode: empData.work_mode || '',
          Work_Location: empData.work_location || '',
          Working_Hours: empData.working_hours?.toString() || '',
          Weekly_Workdays: empData.weekly_workdays?.toString() || '',
          Base_Salary: empData.base_salary?.toString() || '',
          Payment_Frequency: empData.payment_frequency || '',
          Account_Name: empData.account_name || '',
          Account_Number: empData.account_number || '',
          Bank_Name: empData.bank_name || '',
          Overtime_Hours_Allowance: empData.overtime_hours_allowance?.toString() || '',
          Housing_Allowance: empData.housing_allowance?.toString() || '',
          Transport_Allowance: empData.transport_allowance?.toString() || '',
          Medical_Allowance: empData.medical_allowance?.toString() || '',
          Employee_Contribution: empData.employee_contribution?.toString() || '',
          Company_Match: empData.company_match?.toString() || '',
          Paye_Deduction: empData.paye_deduction?.toString() || '',
          Insurance_Provider: empData.insurance_provider || '',
          LeadWay_Health_Insurance: empData.leadway_insurance || '',
          Annual_Leave_Days: empData.annual_leave_days?.toString() || ''
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
    const token = JSON.parse(localStorage.getItem('authData'))?.access_token;
    try {
      const response = await fetch(`https://proximahr.onrender.com/api/v2/employee-management/${selectedEmployeeId}/employee`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Update failed');
      alert('Employee updated successfully!');
      navigate('/employee-managment');
    } catch (err) {
      alert(err.message);
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
          <h5>Edit Employee</h5>
        </div>

        <form className="add-employee-form" onSubmit={handleSubmit}>
          <h3>Basic Information</h3>
          <input name="First_Name" placeholder="First Name" value={formData.First_Name || ''} onChange={handleChange} />
          <input name="Last_Name" placeholder="Last Name" value={formData.Last_Name || ''} onChange={handleChange} />
          <input name="Email" placeholder="Email" value={formData.Email || ''} onChange={handleChange} />
          <input name="Phone_Number" placeholder="Phone Number" value={formData.Phone_Number || ''} onChange={handleChange} />
          <input name="Date_of_Birth" type="date" value={formData.Date_of_Birth || ''} onChange={handleChange} />
          <select name="Gender" value={formData.Gender || ''} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input name="Home_Address" placeholder="Home Address" value={formData.Home_Address || ''} onChange={handleChange} />
          <select name="Nationality" value={formData.Nationality || ''} onChange={handleChange}>
            <option value="">Select Nationality</option>
            {countries.map((c, i) => <option key={i} value={c}>{c}</option>)}
          </select>

          <h3>Employment Details</h3>
          <input name="Job_Title" placeholder="Job Title" value={formData.Job_Title || ''} onChange={handleChange} />
          <select name="Department" value={formData.Department || ''} onChange={handleChange}>
            <option value="">Select Department</option>
            {departments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
          </select>
          <select name="Role" value={formData.Role || ''} onChange={handleChange}>
            <option value="">Select Role</option>
            <option value="Employee">Employee</option>
            <option value="Manager">Manager</option>
          </select>
          <input name="Employment_Date" type="date" value={formData.Employment_Date || ''} onChange={handleChange} />
          <select name="Work_Mode" value={formData.Work_Mode || ''} onChange={handleChange}>
            <option value="">Select Work Mode</option>
            <option value="Onsite">Onsite</option>
            <option value="Remote">Remote</option>
          </select>
          <input name="Work_Location" placeholder="Work Location" value={formData.Work_Location || ''} onChange={handleChange} />
          <input name="Working_Hours" placeholder="Working Hours" value={formData.Working_Hours || ''} onChange={handleChange} />
          <input name="Weekly_Workdays" placeholder="Weekly Workdays" value={formData.Weekly_Workdays || ''} onChange={handleChange} />

          <h3>Compensation Details</h3>
          <input name="Base_Salary" placeholder="Base Salary" type="number" value={formData.Base_Salary || ''} onChange={handleChange} />
          <select name="Payment_Frequency" value={formData.Payment_Frequency || ''} onChange={handleChange}>
            <option value="">Select Payment Frequency</option>
            <option value="Monthly">Monthly</option>
            <option value="Weekly">Weekly</option>
            <option value="Bi-Weekly">Bi-Weekly</option>
          </select>
          <Select
            placeholder="Select Bank"
            options={banks}
            value={banks.find(b => b.value === formData.Bank_Name) || null}
            onChange={(opt) => handleSelectChange('Bank_Name', opt)}
          />
          <input name="Account_Name" placeholder="Account Name" value={formData.Account_Name || ''} onChange={handleChange} />
          <input name="Account_Number" placeholder="Account Number" value={formData.Account_Number || ''} onChange={handleChange} />
          <input name="Overtime_Hours_Allowance" placeholder="Overtime Hours Allowance" type="number" value={formData.Overtime_Hours_Allowance || ''} onChange={handleChange} />
          <input name="Housing_Allowance" placeholder="Housing Allowance" type="number" value={formData.Housing_Allowance || ''} onChange={handleChange} />
          <input name="Transport_Allowance" placeholder="Transport Allowance" type="number" value={formData.Transport_Allowance || ''} onChange={handleChange} />
          <input name="Medical_Allowance" placeholder="Medical Allowance" type="number" value={formData.Medical_Allowance || ''} onChange={handleChange} />
          <input name="Employee_Contribution" placeholder="Employee Contribution %" type="number" value={formData.Employee_Contribution || ''} onChange={handleChange} />
          <input name="Company_Match" placeholder="Company Match %" type="number" value={formData.Company_Match || ''} onChange={handleChange} />
          <input name="Paye_Deduction" placeholder="PAYE Deduction %" type="number" value={formData.Paye_Deduction || ''} onChange={handleChange} />
          <select name="Insurance_Provider" value={formData.Insurance_Provider || ''} onChange={handleChange}>
            <option value="">Select Insurance Provider</option>
            {insuranceProviders.map((p, i) => <option key={i} value={p}>{p}</option>)}
          </select>
          <select name="LeadWay_Health_Insurance" value={formData.LeadWay_Health_Insurance || ''} onChange={handleChange}>
            <option value="">Select LeadWay Health Insurance</option>
            <option value="Group Life Assurance">Group Life Assurance</option>
            <option value="Employee Compensation Insurance">Employee Compensation Insurance</option>
            <option value="Health Insurance Plans">Health Insurance Plans</option>
            <option value="Personal Accident Insurance">Personal Accident Insurance</option>
            <option value="Travel Insurance">Travel Insurance</option>
          </select>
          <input name="Annual_Leave_Days" placeholder="Annual Leave Days" type="number" value={formData.Annual_Leave_Days || ''} onChange={handleChange} />

          <button type="submit" className="submit-btn">Update Employee</button>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
