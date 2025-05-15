import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import EmployeeNavbar from '../components/EmployeeNavbar.jsx';
import './EmployeeDashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Test from '../assets/test.png'; // Placeholder image
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useTimer } from '../../../context/TimerContext.jsx'; // Importing the useTimer hook from TimerContext
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // Add faEye and faEyeSlash here


const ProfileDashboard = () => {
  const [activeSection, setActiveSection] = useState('personalInfo');
  const [employeeData, setEmployeeData] = useState(null); // To store employee data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileImage, setProfileImage] = useState(null); // For storing selected image preview
  const [file, setFile] = useState(null); // To store the selected file
  const [isModalOpen, setIsModalOpen] = useState(false); // To manage modal visibility
  const [isSaving, setIsSaving] = useState(false); // To track if the image is being uploaded
  const [submitting, setSubmitting] = useState(false);  // Add this line to manage the submitting state
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false); // State for current password visibility
  const [showNewPassword, setShowNewPassword] = useState(false); // State for new password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordSubmitting, setPasswordSubmitting] = useState(false);
  const {
        workingHours,
        breakTime,
        isTimerRunning,
        isBreakActive,
        clockInTime,
        clockOutTime,
        startTimer,
        stopTimer,
        startBreak,
        endBreak,
        formatTime,
    } = useTimer(); // Using the global timer state and functions


  // Fetch employee profile data from the API
  useEffect(() => {
    const fetchEmployeeProfile = async () => {
      const storedToken = localStorage.getItem('employeeAuthToken'); // Retrieve token from localStorage as 'employeeAuthToken'
      
      if (!storedToken) {
        setError('Authentication required');
        setLoading(false);
        return;
      }

      const token = JSON.parse(storedToken).access_token; // Parse the stored token object to get the actual token
      if (!token) {
        setError('Token not found');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('https://proximahr.onrender.com/api/v2/employee/profile', {
          headers: {
            'Authorization': `Bearer ${token}`, // Send token in the Authorization header
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch employee data');
        }

        const data = await response.json();
        console.log("API Response:", data); // Log the API response in the console

        // Ensure data is under response.data, and set the employee data
        setEmployeeData(data.data); // Update here to access the correct 'data' object from the API response
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeProfile();
  }, []); // Empty dependency array ensures this runs only once on component mount

      const handleProfileImageChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
          setFile(selectedFile); // Store the selected file
          const reader = new FileReader();
          reader.onloadend = () => {
            setProfileImage(reader.result); // Display the selected image in the UI
          };
          reader.readAsDataURL(selectedFile);
        }
      };

      const handleImageUpload = async () => {
        if (!file) {
          console.error("❌ No file selected");
          return;
        }
      
        // Validate the file type and size before submitting
        const validTypes = ['image/jpeg', 'image/png'];
        if (!validTypes.includes(file.type)) {
          setError('Invalid file type. Only JPEG and PNG are allowed.');
          return;
        }
      
        const maxSize = 5 * 1024 * 1024; // 5MB max file size
        if (file.size > maxSize) {
          setError('File size exceeds the 5MB limit.');
          return;
        }
      
        const formData = new FormData();
        formData.append('image_file', file); // Append the selected file to form data
      
        setIsSaving(true); // Set the saving state to true to show "Saving..."
      
        try {
          const storedToken = localStorage.getItem('employeeAuthToken');
          const token = JSON.parse(storedToken).access_token;
          // const companyId = localStorage.getItem('company_id'); // Get company ID from localStorage or context
          
          if (!token) {
            setError('Token not found');
            return;
          }
      
          // if (!companyId) {
          //   setError('Company ID not found');
          //   return;
          // }
      
          const response = await axios.post(`https://proximahr.onrender.com/api/v2/employee/profile-image-upload`, formData, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          });
      
          console.log('✅ Image uploaded successfully:', response.data);
      
          setEmployeeData((prevData) => ({
            ...prevData,
            profile_image: response.data.profile_image, // Update profile image in the UI
          }));
      
          setIsSaving(false); // Stop saving after upload
          setIsModalOpen(false); // Close modal after upload
        } catch (err) {
          console.error('❌ Error uploading profile image:', err.message);
          setError('Failed to upload image');
          setIsSaving(false); // Stop saving if an error occurs
        }
      };
      
      

      const [editableFields, setEditableFields] = useState({
        email: false,
        emergencyContactName: false,
        relationshipToEmployee: false,
        emergencyContactPhone: false,
        password: false,
      });
      
      
      
      const handleEditClick = (field) => {
        setEditableFields((prevState) => ({
          ...prevState,
          [field]: true,  // Enable editing for the specific field
        }));
      };
      
      
      const handleSaveChanges = async () => {
        setSubmitting(true); // Set submitting to true when form submission starts
      
        // Only include the fields that have been updated in the request payload
        const updatedData = {};
      
        // Check which fields were edited and add them to the updatedData object
        if (formData.email !== employeeData.email) {
          updatedData.email = formData.email;
        }
        if (formData.emergencyContactName !== employeeData.emergency_contact_name) {
          updatedData.emergency_contact_name = formData.emergencyContactName;
        }
        if (formData.relationshipToEmployee !== employeeData.relationship_to_employee) {
          updatedData.relationship_to_employee = formData.relationshipToEmployee;
        }
        if (formData.emergencyContactPhone !== employeeData.emergency_contact_phone) {
          updatedData.emergency_contact_phone = formData.emergencyContactPhone;
        }
        if (formData.password) {
          updatedData.password = formData.password; // Only include password if it's not empty
        }
      
        // Log the data being sent to the API
        console.log("Sending data to the update API:", updatedData);
      
        try {
          const storedToken = localStorage.getItem('employeeAuthToken');
          const token = JSON.parse(storedToken).access_token;
          // const companyId = localStorage.getItem('company_id'); // Get company ID from localStorage or context
      
          if (!token) {
            setError('Token not found');
            return;
          }
      
          // if (!companyId) {
          //   setError('Company ID not found');
          //   return;
          // }
      
          // Send the request to update the employee profile
          const response = await axios.put(`https://proximahr.onrender.com/api/v2/employee/update-profile}`, updatedData, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
      
          // Log the response from the API
          console.log('✅ Profile updated successfully:', response.data);
      
          // Update the employee data with the new values
          setEmployeeData((prevData) => ({
            ...prevData,
            ...updatedData,  // Update only the changed fields
          }));
      
          // Disable editing after saving
          setEditableFields({
            email: false,
            emergencyContactName: false,
            relationshipToEmployee: false,
            emergencyContactPhone: false,
            password: false,
          });
      
          setSubmitting(false); // Stop showing the "Saving..." text
          alert('Changes saved successfully!');
        } catch (error) {
          console.error('❌ Error updating profile:', error.message);
          setError('Failed to update profile');
          setSubmitting(false); // Stop showing the "Saving..." text
        }
      };
      
       
      const [formData, setFormData] = useState({
        email: employeeData?.email || '',
        emergencyContactName: employeeData?.emergency_contact_name || '',
        relationshipToEmployee: employeeData?.relationship_to_employee || '',
        emergencyContactPhone: employeeData?.emergency_contact_phone || '',
        password: '',  // Initially empty, can be filled when needed
      });

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,  // Update the specific field in formData
        }));
      };

      // Password modal handlers
      const handlePasswordInputChange = (e) => {
        const { name, value } = e.target;
        setPasswordForm((prev) => ({
          ...prev,
          [name]: value,
        }));
      };

      const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
          toast.error('All fields are required');
          return;
        }
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
          toast.error('New passwords do not match');
          return;
        }
        setPasswordSubmitting(true);
        try {
          const storedToken = localStorage.getItem('employeeAuthToken');
          const token = JSON.parse(storedToken).access_token;
          await axios.post(
            'https://proximahr.onrender.com/api/v2/company/auth/change-password',
            {
              current_password: passwordForm.currentPassword,
              new_password: passwordForm.newPassword,
              confirm_password: passwordForm.confirmPassword,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            }
          );
          toast.success('Password changed successfully!');
          setShowPasswordModal(false);
          setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (err) {
          toast.error(
            err.response?.data?.message ||
            err.response?.data?.error ||
            'Failed to change password'
          );
        } finally {
          setPasswordSubmitting(false);
        }
      };
      
      

  return (
    <div>
      <ToastContainer />
      <div className="main-dashboard">
        <Sidebar />
        <div className="dashboard">
          <EmployeeNavbar />

          <hr className="horizontal" />

          {/* Employee Profile Section */}
          <div
  className="employee-dashboard-info"
  style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 32,
    marginTop: 8,
  }}
>
  {/* Profile Info */}
  <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
    <div style={{ position: 'relative', width: 100, height: 100 }}>
      <img
        src={employeeData && employeeData.profile_image ? employeeData.profile_image : profileImage || Test}
        alt="Profile"
        style={{
          width: 100,
          height: 100,
          borderRadius: '50%',
          objectFit: 'cover',
        }}
      />
      <FontAwesomeIcon
        icon={faCamera}
        style={{
          position: 'absolute',
          bottom: 6,
          right: 6,
          backgroundColor: '#fff',
          borderRadius: '50%',
          fontSize: 22,
          padding: 6,
          cursor: 'pointer',
          border: '2px solid #007BFF',
          color: '#007BFF',
        }}
        onClick={() => setIsModalOpen(true)}
      />
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <h5 style={{ fontSize: 22, fontWeight: 600, margin: 0, color: '#222' }}>
        {employeeData ? `${employeeData.first_name} ${employeeData.last_name}` : 'Loading...'}
      </h5>
      <h6 style={{ fontSize: 16, color: '#444', margin: '4px 0 0 0', fontWeight: 400 }}>
        {employeeData ? employeeData.job_title : 'Loading...'}
      </h6>
      <h6 style={{ fontSize: 15, color: '#888', margin: '2px 0 0 0', fontWeight: 400 }}>
        {employeeData ? employeeData.email : 'Loading...'}
      </h6>
    </div>
  </div>

  {/* Working Hours */}
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
    <span style={{ fontSize: 15, color: '#888', marginBottom: 4 }}>Working Hours</span>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <input
        type="text"
        value={formatTime(workingHours)}
        readOnly
        style={{
          width: 110,
          height: 36,
          background: "#FAFAFA",
          border: "1px solid #E5E5E5",
          borderRadius: 6,
          textAlign: "center",
          fontSize: 18,
          fontWeight: 600,
          color: "#222",
          fontFamily: "monospace",
          letterSpacing: 2,
          marginRight: 8
        }}
      />
      <button
        style={{
          background: isTimerRunning ? "#fff" : "#007BFF",
          color: isTimerRunning ? "#007BFF" : "#fff",
          border: isTimerRunning ? "2px solid #007BFF" : "none",
          borderRadius: 6,
          fontWeight: 500,
          fontSize: 16,
          height: 36,
          minWidth: 110,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          cursor: "pointer",
          transition: "background 0.2s, color 0.2s, border 0.2s"
        }}
        onClick={isTimerRunning ? stopTimer : startTimer}
      >
        <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" />
        {isTimerRunning ? "Clock Out" : "Clock In"}
      </button>
    </div>
  </div>
</div>

          {isModalOpen && (
  <div 
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    }}
  >
    <div 
      style={{
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '10px',
        textAlign: 'center',
        width: '400px',
        boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h3>Change Profile Photo</h3>
      <div 
        style={{
          border: '2px dashed #D0D0D0',
          borderRadius: '10px',
          padding: '30px',
          marginBottom: '20px',
          color: '#6C757D',
          position: 'relative',
          cursor: 'pointer'
        }}
        onDragOver={e => e.preventDefault()}
        onDrop={e => {
          e.preventDefault();
          const file = e.dataTransfer.files[0];
          if (file) handleProfileImageChange({ target: { files: [file] } });
        }}
        onClick={() => document.getElementById('profileImageInput').click()}
      >
        <input 
          type="file" 
          onChange={handleProfileImageChange} 
          style={{ display: 'none' }} 
          id="profileImageInput" 
          accept="image/*"
        />
        {!profileImage ? (
          <>
            <label 
              htmlFor="profileImageInput"
              style={{ cursor: 'pointer', color: '#007BFF', fontSize: '16px' }}
            >
              Drag and drop or browse files
            </label>
            <p style={{ fontSize: '12px', color: '#6C757D' }}>
              Max 5MB, JPEG, PNG
            </p>
          </>
        ) : (
          <div>
            <img
              src={profileImage}
              alt="Preview"
              style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', marginBottom: 8 }}
            />
            <div style={{ color: '#22C55E', fontWeight: 500, marginBottom: 4 }}>
              <FontAwesomeIcon icon="fa-solid fa-circle-check" style={{ color: '#22C55E', marginRight: 6 }} />
              Image selected
            </div>
            <div style={{ fontSize: 12, color: '#888' }}>
              Click to change image
            </div>
          </div>
        )}
      </div>
      <div>
        <button 
          onClick={() => setIsModalOpen(false)} 
          style={{
            backgroundColor: 'gray',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '5px',
            marginRight: '10px',
          }}
        >
          Cancel
        </button>
        <button 
          onClick={handleImageUpload} 
          style={{
            backgroundColor: '#007BFF', 
            color: 'white', 
            padding: '8px 12px', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer', 
            marginLeft: '10px'
          }}
          disabled={isSaving || !profileImage}
        >
          {isSaving ? 'Saving...' : 'Save Photo'}
        </button>
      </div>
    </div>
  </div>
)}




          {/* Dashboard Summary */}
          <div className="dashboard-details-1">
            <div className="first-grid">
              <FontAwesomeIcon icon="fa-solid fa-clock" className="dashboard-icon" />
              <div>
                <h6>Attendance</h6>
                <h5 style={{fontSize:'20px'}}>{employeeData ? `${employeeData.attendance || 0}%` : 0}</h5>
              </div>
            </div>

            <div className="first-grid">
              <FontAwesomeIcon icon="fa-solid fa-calendar" className="dashboard-icon" />
              <div>
                <h6>Leave Balance</h6>
                <h5 style={{fontSize:'20px'}}>{employeeData ? `${employeeData.leave_balance || 0} Days` : 0} </h5>
              </div>
            </div>

            <div className="first-grid">
              <FontAwesomeIcon icon="fa-solid fa-calendar" className="dashboard-icon" />
              <div>
                <h6>Net Pay</h6>
                <h5 style={{fontSize:'20px'}}>
                  {employeeData
                    ? `Salary: ₦${Number(employeeData.net_pay || 0).toLocaleString()}`
                    : 0}
                </h5>
              </div>
            </div>

            <div className="first-grid">
              <FontAwesomeIcon icon="fa-solid fa-users" className="dashboard-icon" />
              <div>
                <h6>Overtime Hours</h6>
                <h5 style={{fontSize:'20px'}}>{employeeData ? `${employeeData.overtime_hours || 0} Hours` : 0} </h5>
              </div>
            </div>
          </div>

          {/* Subnav Buttons */}
          <div className="employee-profile-info" style={{ display: 'flex', gap: 12, margin: '24px 0 18px 0' }}>
  <button
    onClick={() => setActiveSection('personalInfo')}
    className={activeSection === 'personalInfo' ? 'active' : ''}
    style={{
      background: activeSection === 'personalInfo' ? '#007BFF' : '#fff',
      color: activeSection === 'personalInfo' ? '#fff' : '#222',
      border: activeSection === 'personalInfo' ? '1.5px solid #007BFF' : '1.5px solid #E5E5E5',
      borderRadius: 8,
      padding: '8px 18px',
      fontWeight: 500,
      fontSize: 15,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      transition: 'background 0.2s, color 0.2s, border 0.2s'
    }}
  >
    <FontAwesomeIcon icon="fa-building" className="icon" />
    Account Setting
  </button>
  <button
    onClick={() => setActiveSection('compensation')}
    className={activeSection === 'compensation' ? 'active' : ''}
    style={{
      background: activeSection === 'compensation' ? '#007BFF' : '#fff',
      color: activeSection === 'compensation' ? '#fff' : '#222',
      border: activeSection === 'compensation' ? '1.5px solid #007BFF' : '1.5px solid #E5E5E5',
      borderRadius: 8,
      padding: '8px 18px',
      fontWeight: 500,
      fontSize: 15,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      transition: 'background 0.2s, color 0.2s, border 0.2s'
    }}
  >
    <FontAwesomeIcon icon="fa-solid fa-money-bill" className="icon" />
    Personal Information
  </button>
  <button
    onClick={() => setActiveSection('employeeDetails')}
    className={activeSection === 'employeeDetails' ? 'active' : ''}
    style={{
      background: activeSection === 'employeeDetails' ? '#007BFF' : '#fff',
      color: activeSection === 'employeeDetails' ? '#fff' : '#222',
      border: activeSection === 'employeeDetails' ? '1.5px solid #007BFF' : '1.5px solid #E5E5E5',
      borderRadius: 8,
      padding: '8px 18px',
      fontWeight: 500,
      fontSize: 15,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      transition: 'background 0.2s, color 0.2s, border 0.2s'
    }}
  >
    <FontAwesomeIcon icon="fa-solid fa-list-check" className="icon" />
    Employment Details
  </button>
  <button
    onClick={() => setActiveSection('performanceMetrics')}
    className={activeSection === 'performanceMetrics' ? 'active' : ''}
    style={{
      background: activeSection === 'performanceMetrics' ? '#007BFF' : '#fff',
      color: activeSection === 'performanceMetrics' ? '#fff' : '#222',
      border: activeSection === 'performanceMetrics' ? '1.5px solid #007BFF' : '1.5px solid #E5E5E5',
      borderRadius: 8,
      padding: '8px 18px',
      fontWeight: 500,
      fontSize: 15,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      transition: 'background 0.2s, color 0.2s, border 0.2s'
    }}
  >
    <FontAwesomeIcon icon="fa-solid fa-chart-simple" className="icon" />
    Compensation
  </button>
</div>

{/* Account Setting Card */}
{activeSection === 'personalInfo' && (
  <div
    style={{
      background: '#fff',
      border: '1.5px solid #E5E5E5',
      borderRadius: 16,
      boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
      padding: '32px 24px',
      marginTop: 12,
      width: '100%', // Make the card full width
      maxWidth: '100%' // Remove maxWidth limit
    }}
  >
    <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 24 }}>Account Setting</h2>
    {/* Email */}
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 18 }}>
      <div style={{ flex: 1 }}>
        <label htmlFor="email" style={{ fontSize: 14, color: '#888' }}>Email</label>
        <input
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          disabled={!editableFields.email}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: 8,
            border: '1.5px solid #E5E5E5',
            background: '#FAFAFA',
            fontSize: 15,
            marginTop: 4
          }}
        />
      </div>
      <div>
        {!editableFields.email ? (
          <button style={{
            background: '#fff',
            color: '#007BFF',
            border: '1.5px solid #E5E5E5',
            borderRadius: 8,
            padding: '8px 18px',
            fontWeight: 500,
            fontSize: 15,
            marginLeft: 18,
            cursor: 'pointer'
          }} onClick={() => handleEditClick('email')}>
            Edit
          </button>
        ) : (
          <button style={{
            background: '#22C55E',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '8px 18px',
            fontWeight: 500,
            fontSize: 15,
            marginLeft: 18,
            cursor: 'pointer'
          }} onClick={handleSaveChanges} disabled={submitting}>
            {submitting ? 'Saving...' : 'Save Changes'}
          </button>
        )}
      </div>
    </div>
    {/* Emergency Contact Name */}
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 18 }}>
      <div style={{ flex: 1 }}>
        <label htmlFor="emergencyContactName" style={{ fontSize: 14, color: '#888' }}>Emergency Contact Name</label>
        <input
          type="text"
          id="emergencyContactName"
          name="emergencyContactName"
          value={formData.emergencyContactName}
          onChange={handleInputChange}
          disabled={!editableFields.emergencyContactName}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: 8,
            border: '1.5px solid #E5E5E5',
            background: '#FAFAFA',
            fontSize: 15,
            marginTop: 4
          }}
        />
      </div>
      <div>
        {!editableFields.emergencyContactName ? (
          <button style={{
            background: '#fff',
            color: '#007BFF',
            border: '1.5px solid #E5E5E5',
            borderRadius: 8,
            padding: '8px 18px',
            fontWeight: 500,
            fontSize: 15,
            marginLeft: 18,
            cursor: 'pointer'
          }} onClick={() => handleEditClick('emergencyContactName')}>
            Edit
          </button>
        ) : (
          <button style={{
            background: '#22C55E',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '8px 18px',
            fontWeight: 500,
            fontSize: 15,
            marginLeft: 18,
            cursor: 'pointer'
          }} onClick={handleSaveChanges} disabled={submitting}>
            {submitting ? 'Saving...' : 'Save Changes'}
          </button>
        )}
      </div>
    </div>
    {/* Relationship to Employee */}
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 18 }}>
      <div style={{ flex: 1 }}>
        <label htmlFor="relationshipToEmployee" style={{ fontSize: 14, color: '#888' }}>Choose Relationship to Employee</label>
        {!editableFields.relationshipToEmployee ? (
          <input
            type="text"
            id="relationshipToEmployee"
            name="relationshipToEmployee"
            value={formData.relationshipToEmployee}
            onChange={handleInputChange}
            disabled
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: 8,
              border: '1.5px solid #E5E5E5',
              background: '#FAFAFA',
              fontSize: 15,
              marginTop: 4
            }}
          />
        ) : (
          <select
            id="relationshipToEmployee"
            name="relationshipToEmployee"
            value={formData.relationshipToEmployee}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: 8,
              border: '1.5px solid #E5E5E5',
              background: '#FAFAFA',
              fontSize: 15,
              marginTop: 4
            }}
          >
            <option value="">Select Relationship</option>
            <option value="Spouse">Spouse</option>
            <option value="Parent">Parent</option>
            <option value="Sibling">Sibling</option>
            <option value="Friend">Friend</option>
            <option value="Other">Other</option>
          </select>
        )}
      </div>
      <div>
        {!editableFields.relationshipToEmployee ? (
          <button style={{
            background: '#fff',
            color: '#007BFF',
            border: '1.5px solid #E5E5E5',
            borderRadius: 8,
            padding: '8px 18px',
            fontWeight: 500,
            fontSize: 15,
            marginLeft: 18,
            cursor: 'pointer'
          }} onClick={() => handleEditClick('relationshipToEmployee')}>
            Edit
          </button>
        ) : (
          <button style={{
            background: '#22C55E',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '8px 18px',
            fontWeight: 500,
            fontSize: 15,
            marginLeft: 18,
            cursor: 'pointer'
          }} onClick={handleSaveChanges} disabled={submitting}>
            {submitting ? 'Saving...' : 'Save Changes'}
          </button>
        )}
      </div>
    </div>
    {/* Emergency Contact Phone Number */}
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 18 }}>
      <div style={{ flex: 1 }}>
        <label htmlFor="emergencyContactPhone" style={{ fontSize: 14, color: '#888' }}>Emergency Contact Phone Number</label>
        <input
          type="text"
          id="emergencyContactPhone"
          name="emergencyContactPhone"
          value={formData.emergencyContactPhone}
          onChange={handleInputChange}
          disabled={!editableFields.emergencyContactPhone}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: 8,
            border: '1.5px solid #E5E5E5',
            background: '#FAFAFA',
            fontSize: 15,
            marginTop: 4
          }}
        />
      </div>
      <div>
        {!editableFields.emergencyContactPhone ? (
          <button style={{
            background: '#fff',
            color: '#007BFF',
            border: '1.5px solid #E5E5E5',
            borderRadius: 8,
            padding: '8px 18px',
            fontWeight: 500,
            fontSize: 15,
            marginLeft: 18,
            cursor: 'pointer'
          }} onClick={() => handleEditClick('emergencyContactPhone')}>
            Edit
          </button>
        ) : (
          <button style={{
            background: '#22C55E',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '8px 18px',
            fontWeight: 500,
            fontSize: 15,
            marginLeft: 18,
            cursor: 'pointer'
          }} onClick={handleSaveChanges} disabled={submitting}>
            {submitting ? 'Saving...' : 'Save Changes'}
          </button>
        )}
      </div>
    </div>
    {/* Password */}
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 0 }}>
      <div style={{ flex: 1 }}>
        <label htmlFor="password" style={{ fontSize: 14, color: '#888' }}>Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          disabled
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: 8,
            border: '1.5px solid #E5E5E5',
            background: '#FAFAFA',
            fontSize: 15,
            marginTop: 4
          }}
        />
      </div>
      <div>
        <button
          style={{
            background: '#fff',
            color: '#007BFF',
            border: '1.5px solid #E5E5E5',
            borderRadius: 8,
            padding: '8px 18px',
            fontWeight: 500,
            fontSize: 15,
            marginLeft: 18,
            cursor: 'pointer'
          }}
          onClick={() => setShowPasswordModal(true)}
        >
          Edit
        </button>
      </div>
    </div>
  </div>
)}

{/* Password Change Modal */}
{showPasswordModal && (
  <div
    style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 2000,
    }}
  >
    <form
      onSubmit={handlePasswordSubmit}
      style={{
        background: '#fff',
        borderRadius: 12,
        padding: 32,
        width: 420,
        boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
      }}
    >
      <div>
        <label style={{ fontWeight: 600, fontSize: 18, marginBottom: 6, display: 'block' }}>Current Password</label> {/* Updated label */}
        <div style={{ position: 'relative' }}> {/* Container for input and icon */}
          <input
            type={showCurrentPassword ? 'text' : 'password'} // Toggle type
            name="currentPassword"
            placeholder="Enter Current Password"
            value={passwordForm.currentPassword}
            onChange={handlePasswordInputChange}
            style={{
              width: '100%',
              padding: '12px',
              paddingRight: '40px', // Add padding for icon
              borderRadius: 8,
              border: '1.5px solid #E5E5E5',
              background: '#FAFAFA',
              fontSize: 15,
              marginTop: 6,
              marginBottom: 8,
            }}
          />
          <FontAwesomeIcon
            icon={showCurrentPassword ? faEyeSlash : faEye} // Toggle icon
            onClick={() => setShowCurrentPassword(!showCurrentPassword)} // Toggle state
            style={{
              position: 'absolute',
              right: '15px',
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
              color: '#888',
            }}
          />
        </div>
      </div>
      <div>
        <label style={{ fontWeight: 600, fontSize: 18, marginBottom: 6, display: 'block' }}>New Password</label>
         <div style={{ position: 'relative' }}> {/* Container for input and icon */}
          <input
            type={showNewPassword ? 'text' : 'password'} // Toggle type
            name="newPassword"
            placeholder="Enter New Password"
            value={passwordForm.newPassword}
            onChange={handlePasswordInputChange}
             style={{
              width: '100%',
              padding: '12px',
              paddingRight: '40px', // Add padding for icon
              borderRadius: 8,
              border: '1.5px solid #E5E5E5',
              background: '#FAFAFA',
              fontSize: 15,
              marginTop: 6,
              marginBottom: 8,
            }}
          />
           <FontAwesomeIcon
            icon={showNewPassword ? faEyeSlash : faEye} // Toggle icon
            onClick={() => setShowNewPassword(!showNewPassword)} // Toggle state
            style={{
              position: 'absolute',
              right: '15px',
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
              color: '#888',
            }}
          />
        </div>
      </div>
      <div>
        <label style={{ fontWeight: 600, fontSize: 18, marginBottom: 6, display: 'block' }}>Re-Enter New Password</label>
         <div style={{ position: 'relative' }}> {/* Container for input and icon */}
          <input
            type={showConfirmPassword ? 'text' : 'password'} // Toggle type
            name="confirmPassword"
            placeholder="Re-Enter New Password"
            value={passwordForm.confirmPassword}
            onChange={handlePasswordInputChange}
             style={{
              width: '100%',
              padding: '12px',
              paddingRight: '40px', // Add padding for icon
              borderRadius: 8,
              border: '1.5px solid #E5E5E5',
              background: '#FAFAFA',
              fontSize: 15,
              marginTop: 6,
              marginBottom: 8,
            }}
          />
           <FontAwesomeIcon
            icon={showConfirmPassword ? faEyeSlash : faEye} // Toggle icon
            onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle state
            style={{
              position: 'absolute',
              right: '15px',
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
              color: '#888',
            }}
          />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 8 }}>
        <button
          type="button"
          onClick={() => {
            setShowPasswordModal(false);
            setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
             // Reset visibility states when closing modal
            setShowCurrentPassword(false);
            setShowNewPassword(false);
            setShowConfirmPassword(false);
          }}
          style={{
            background: '#fff',
            color: '#222',
            border: '1.5px solid #E5E5E5',
            borderRadius: 6,
            padding: '8px 18px',
            fontWeight: 500,
            fontSize: 15,
            cursor: 'pointer'
          }}
          disabled={passwordSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          style={{
            background: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '8px 18px',
            fontWeight: 500,
            fontSize: 15,
            cursor: 'pointer'
          }}
          disabled={passwordSubmitting}
        >
          {passwordSubmitting ? 'Changing...' : 'Change Password'}
        </button>
      </div>
    </form>
  </div>
)}



          {/* Personal Information Section */}
          <div style={{ display: activeSection === 'compensation' ? 'block' : 'none' }}>
  <div
    style={{
      background: '#fff',
      border: '1.5px solid #E5E5E5',
      borderRadius: 16,
      boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
      padding: '32px 24px',
      marginTop: 12,
      width: '100%',
      maxWidth: '100%',
    }}
  >
    <div className="header" style={{ marginBottom: 16 }}>
      <h2 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>Personal Details</h2>
    </div>
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 0,
        marginBottom: 12,
      }}
    >
      <div style={{ flex: 1, minWidth: 180 }}>
        <div style={{ fontSize: 14, color: '#888' }}>Name</div>
        <div style={{ fontSize: 15, color: '#222', fontWeight: 500 }}>
          {employeeData ? `${employeeData.first_name} ${employeeData.last_name}` : 'Loading...'}
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 180 }}>
        <div style={{ fontSize: 14, color: '#888' }}>Job Title</div>
        <div style={{ fontSize: 15, color: '#222', fontWeight: 500 }}>
          {employeeData ? employeeData.job_title : 'Loading...'}
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 180 }}>
        <div style={{ fontSize: 14, color: '#888' }}>Email</div>
        <div style={{ fontSize: 15, color: '#222', fontWeight: 500 }}>
          {employeeData ? employeeData.email : 'Loading...'}
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 180 }}>
        <div style={{ fontSize: 14, color: '#888' }}>Department</div>
        <div style={{ fontSize: 15, color: '#222', fontWeight: 500 }}>
          {employeeData ? employeeData.department : 'Loading...'}
        </div>
      </div>
    </div>
    <div style={{ marginTop: 12 }}>
      <div style={{ fontSize: 14, color: '#888' }}>Address</div>
      <div style={{ fontSize: 15, color: '#222', fontWeight: 500 }}>
        {employeeData ? employeeData.home_address || 'N/A' : 'Loading...'}
      </div>
    </div>
  </div>
</div>

          {/* Employee Details Section */}
          <div style={{ display: activeSection === 'employeeDetails' ? 'block' : 'none' }}>
  <div
    style={{
      background: '#fff',
      border: '1.5px solid #E5E5E5',
      borderRadius: 16,
      boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
      padding: '32px 24px',
      marginTop: 12,
      width: '100%',
      maxWidth: '100%',
    }}
  >
    <div className="header" style={{ marginBottom: 16 }}>
      <h2 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>Employment Details</h2>
    </div>
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 0,
        marginBottom: 12,
      }}
    >
      <div style={{ flex: 1, minWidth: 180 }}>
        <div style={{ fontSize: 14, color: '#888' }}>Job Title</div>
        <div style={{ fontSize: 15, color: '#222', fontWeight: 500 }}>
          {employeeData ? employeeData.job_title : 'Loading...'}
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 180 }}>
        <div style={{ fontSize: 14, color: '#888' }}>Employee ID</div>
        <div style={{ fontSize: 15, color: '#222', fontWeight: 500 }}>
          {employeeData ? employeeData.employee_id : 'Loading...'}
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 180 }}>
        <div style={{ fontSize: 14, color: '#888' }}>Employment Date</div>
        <div style={{ fontSize: 15, color: '#222', fontWeight: 500 }}>
          {employeeData && employeeData.employment_date
            ? new Date(employeeData.employment_date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
            : 'Loading...'}
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 180 }}>
        <div style={{ fontSize: 14, color: '#888' }}>Department</div>
        <div style={{ fontSize: 15, color: '#222', fontWeight: 500 }}>
          {employeeData ? employeeData.department : 'Loading...'}
        </div>
      </div>
    </div>
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 0,
        marginBottom: 12,
      }}
    >
      <div style={{ flex: 1, minWidth: 180 }}>
        <div style={{ fontSize: 14, color: '#888' }}>Head of Department</div>
        <div style={{ fontSize: 15, color: '#222', fontWeight: 500 }}>
          {employeeData && employeeData.head_of_department
            ? employeeData.head_of_department
            : 'N/A'}
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 180 }}>
        <div style={{ fontSize: 14, color: '#888' }}>Work Mode</div>
        <div style={{ fontSize: 15, color: '#222', fontWeight: 500 }}>
          {employeeData ? employeeData.work_mode : 'Loading...'}
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 180 }}>
        <div style={{ fontSize: 14, color: '#888' }}>Work Location</div>
        <div style={{ fontSize: 15, color: '#222', fontWeight: 500 }}>
          {employeeData ? employeeData.work_location : 'Loading...'}
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 180 }}>
        <div style={{ fontSize: 14, color: '#888' }}>Role</div>
        <div style={{ fontSize: 15, color: '#222', fontWeight: 500 }}>
          {employeeData ? employeeData.role : 'Loading...'}
        </div>
      </div>
    </div>
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 0,
        marginBottom: 0,
      }}
    >
      <div style={{ flex: 1, minWidth: 180 }}>
        <div style={{ fontSize: 14, color: '#888' }}>Working Hours</div>
        <div style={{ fontSize: 15, color: '#222', fontWeight: 500 }}>
          {employeeData && employeeData.working_hours
            ? `${employeeData.working_hours} Hours`
            : 'N/A'}
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 180 }}>
        <div style={{ fontSize: 14, color: '#888' }}>Vacation Days</div>
        <div style={{ fontSize: 15, color: '#222', fontWeight: 500 }}>
          {employeeData && employeeData.annual_leave_days
            ? `${employeeData.annual_leave_days} Days`
            : 'N/A'}
        </div>
      </div>
    </div>
  </div>
</div>

          {/* Compensation Section */}
          <div style={{ display: activeSection === 'performanceMetrics' ? 'block' : 'none' }}>
  <div
    style={{
      background: '#fff',
      border: '1.5px solid #E5E5E5',
      borderRadius: 16,
      boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
      padding: '32px 24px',
      marginTop: 12,
      width: '100%',
      maxWidth: '100%',
    }}
  >
    <div className="header" style={{ marginBottom: 16 }}>
      <h2 style={{ fontSize: 22, fontWeight: 600, margin: 0 }}>Compensation</h2>
    </div>
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 0,
        marginBottom: 12,
      }}
    >
      {/* Basic Salary */}
      <div style={{ flex: 1, minWidth: 200, marginBottom: 18 }}>
        <div style={{ fontSize: 15, color: '#888' }}>Basic Salary</div>
        <div style={{ fontSize: 16, color: '#222', fontWeight: 500 }}>
          {employeeData ? `₦${Number(employeeData.base_salary || 0).toLocaleString()}/month` : 'Loading...'}
        </div>
      </div>
      {/* Overtime Hours Allowance */}
      <div style={{ flex: 1, minWidth: 200, marginBottom: 18 }}>
        <div style={{ fontSize: 15, color: '#888' }}>Overtime Hours Allowance</div>
        <div style={{ fontSize: 16, color: '#222', fontWeight: 500 }}>
          {employeeData ? `₦${Number(employeeData.overtime_hours_allowance || 0).toLocaleString()}/Hour` : 'Loading...'}
        </div>
      </div>
      {/* Deductions */}
      <div style={{ flex: 1, minWidth: 200, marginBottom: 18 }}>
        <div style={{ fontSize: 15, color: '#888' }}>Deductions</div>
        <div style={{ fontSize: 16, color: '#222', fontWeight: 500 }}>
          {employeeData ? `PAYE: ₦${Number(employeeData.paye_deduction || 0).toLocaleString()}` : 'Loading...'}
        </div>
      </div>
      {/* Allowances */}
      <div style={{ flex: 1, minWidth: 200, marginBottom: 18 }}>
        <div style={{ fontSize: 15, color: '#888' }}>Allowances</div>
        <div style={{ fontSize: 16, color: '#222', fontWeight: 500 }}>
          Housing: ₦{employeeData ? Number(employeeData.housing_allowance || 0).toLocaleString() : 'Loading...'}<br />
          Medical: ₦{employeeData ? Number(employeeData.medical_allowance || 0).toLocaleString() : 'Loading...'}<br />
          Transport: ₦{employeeData ? Number(employeeData.transport_allowance || 0).toLocaleString() : 'Loading...'}
        </div>
      </div>
    </div>
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 0,
        marginBottom: 12,
      }}
    >
      {/* Pension Plan */}
      <div style={{ flex: 1, minWidth: 200, marginBottom: 18 }}>
        <div style={{ fontSize: 15, color: '#888' }}>Pension Plan</div>
        <div style={{ fontSize: 16, color: '#222', fontWeight: 500 }}>
          Contribution<br />
          Employee Contribution : {employeeData ? `₦${Number(employeeData.employee_contribution || 0).toLocaleString()}` : 'Loading...'}<br />
          Company match : {employeeData ? `₦${Number(employeeData.company_match || 0).toLocaleString()}` : 'Loading...'}
        </div>
      </div>
      {/* Insurance */}
      <div style={{ flex: 1, minWidth: 200, marginBottom: 18 }}>
        <div style={{ fontSize: 15, color: '#888' }}>Insurance</div>
        <div style={{ fontSize: 16, color: '#222', fontWeight: 500 }}>
          Health Insurance Plans<br />
          Provider: {employeeData ? (employeeData.insurance_provider || 'N/A') : 'Loading...'}<br />
          Leadway Health Insurance: {employeeData ? (employeeData.leadway_insurance || 'N/A') : 'Loading...'}
        </div>
      </div>
      {/* Net Pay */}
      <div style={{ flex: 1, minWidth: 200, marginBottom: 18 }}>
        <div style={{ fontSize: 15, color: '#888' }}>Net Pay</div>
        <div style={{ fontSize: 16, color: '#222', fontWeight: 600 }}>
          {employeeData ? `₦${Number(employeeData.net_pay || 0).toLocaleString()}/month` : 'Loading...'}
        </div>
        <div style={{ fontSize: 13, color: '#888' }}>
          (after allowances and deductions)
        </div>
      </div>
      {/* Next Salary Date */}
      <div style={{ flex: 1, minWidth: 200, marginBottom: 18 }}>
        <div style={{ fontSize: 15, color: '#888' }}>Next Salary Date</div>
        <div style={{ fontSize: 16, color: '#222', fontWeight: 500 }}>
          {/* Replace with actual field if available */}
          {employeeData && employeeData.next_salary_date
            ? new Date(employeeData.next_salary_date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
            : '31,December 2024'}
        </div>
      </div>
    </div>
  </div>
</div>

        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;

// Styles
const inputStyle = {
  width: '100%',
  padding: '10px',
  borderRadius: '8px',
  border: '1px solid #D9D9D9',
  backgroundColor: '#f8f8f8',
  fontSize: '14px',
};

const editButtonStyle = {
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  padding: '8px 15px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px',
  marginTop: '20px'
};

const saveButtonStyle = {
  backgroundColor: '#28a745', // Green color for save button
  color: '#fff',
  border: 'none',
  padding: '8px 15px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px',
  marginTop: '20px',
};












