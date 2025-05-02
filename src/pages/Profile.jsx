import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import test from '../assets/test.png';
import '../pages/profile.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import AttendanceLeaveOverview from '../components/AttendanceLeaveOverview';
import axios from 'axios';
import EmployerNavbar from '../components/EmployerNavbar';

library.add(fas);

const Profile = () => {
  const [activeSection, setActiveSection] = useState('personalInfo');
  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const selectedEmployeeId = localStorage.getItem('selectedEmployee_id');

  let accessToken = null;
  try {
    const authData = JSON.parse(localStorage.getItem('authData'));
    if (authData && authData.access_token) {
      accessToken = authData.access_token;
    }
  } catch (err) {
    console.error('Error parsing authData from local storage', err);
  }

  useEffect(() => {
    const fetchEmployeeData = async () => {
      if (!selectedEmployeeId || !accessToken) {
        console.error('Missing required authentication details:', { selectedEmployeeId, accessToken });
        setError('Missing required authentication details');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `https://proximahr.onrender.com/api/v2/employee-management/${selectedEmployeeId}/employee`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        console.log('API Response:', response.data);
        setEmployeeData(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error('API request failed:', err.response ? err.response.data : err.message);
        setError('Failed to fetch employee details');
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, [selectedEmployeeId, accessToken]);

  return (
    <div>
      <div className="main-dashboard">
        <Sidebar />
        <div className="dashboard">
          <EmployerNavbar />
          <hr className="horizontal" />
          <div className="dashboard-details" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Link to={'/employee-managment'}>
              <h5 className="employee-profile" style={{ textDecoration: 'none', marginBottom: '15px' }}>
                <FontAwesomeIcon icon="fa-solid fa-arrow-left" className="left-arrow" />
                Employee Profile
              </h5>
            </Link>
            <h6>{new Date().toLocaleDateString('en-GB', { day: '2-digit', weekday: 'long', month: 'long', year: 'numeric' })}</h6>
          </div>

          {loading ? (
            <p>Loading employee details...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : (
            <>
              <div className="number-of-employee" style={{ marginTop: '40px', width: '1000px'}}>
                <div className="div-one" style={{ width: '2000px', display:'flex', justifyContent:'space-between'  }}>
                  <div className="div1-1">
                    <img src={employeeData?.profile_image || test} alt="Profile" className="My-profile" />
                  </div>
                  <div className="div1-2" style={{ marginLeft: '10px' }}>
                    <h1>{employeeData?.first_name} {employeeData?.last_name}</h1>
                    <h2>{employeeData?.job_title}</h2>
                  </div>
                  <div className="div1-3">
                    <div className="btn-4">
                      <button style={{ border: '1px solid', width: '50px', fontSize:'12px', textAlign: 'center' }}>{employeeData?.employment_status}</button>
                    </div>
                  </div>

                  <div>
                  <Link to={`/edit-employee`}>
                    <button className='btn-2' style={{ font: 'Inter', fontWeight: '500', fontSize: '14px', padding: '2px', marginLeft: '450px', width: '100px', height: '30px' }}>
                      <FontAwesomeIcon icon="fa-solid fa-plus" style={{ marginRight: '2px' }} />Edit
                    </button></Link>
                  </div>
                </div>
              </div>

              <h2 style={{ font: 'Inter', fontWeight: '500', fontSize: '16px', color: '#2E2E2E', marginBottom: '10px', marginLeft: '10px' }}>
                <FontAwesomeIcon icon="fa-solid fa-envelope" style={{ marginRight: '10px' }} />{employeeData?.email}
              </h2>
              <h2 style={{ font: 'Inter', fontWeight: '500', fontSize: '16px', color: '#2E2E2E', marginBottom: '10px', marginLeft: '10px' }}>
                <FontAwesomeIcon icon="fa-solid fa-phone" style={{ marginRight: '10px' }} />{employeeData?.phone_number}
              </h2>
              <h2 style={{ font: 'Inter', fontWeight: '500', fontSize: '16px', color: '#2E2E2E', marginBottom: '10px', marginLeft: '10px' }}>
                <FontAwesomeIcon icon="fa-solid fa-location-dot" style={{ marginRight: '10px' }} />{employeeData?.home_address}
              </h2>

              <div className="employee-profile-info" style={{ marginTop: '40px', marginLeft: '10px' }}>
                {/* Personal Information Button */}
                <button 
                  onClick={() => setActiveSection('personalInfo')}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: activeSection === 'personalInfo' ? '#0275d8' : '#f8f9fa',
                    color: activeSection === 'personalInfo' ? '#fff' : '#0275d8',
                    border: activeSection === 'personalInfo' ? '1px solid #0275d8' : '1px solid #ccc',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s, color 0.3s, border 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#E0ECFE'; // Hover background color
                    e.target.style.color = '#0275d8'; // Change text color to white on hover
                  }}  // Hover effect
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = activeSection === 'personalInfo' ? '#0275d8' : '#f8f9fa';  // Reset background color
                    e.target.style.color = activeSection === 'personalInfo' ? '#fff' : '#0275d8'; // Reset text color
                  }}  // Reset on hover out
                >
                  Personal Information
                </button>

                {/* Compensation Button */}
                <button 
                  onClick={() => setActiveSection('compensation')}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: activeSection === 'compensation' ? '#0275d8' : '#f8f9fa',
                    color: activeSection === 'compensation' ? '#fff' : '#0275d8',
                    border: activeSection === 'compensation' ? '1px solid #0275d8' : '1px solid #ccc',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s, color 0.3s, border 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#E0ECFE'; // Hover background color
                    e.target.style.color = '#0275d8'; // Change text color to white on hover
                  }}  // Hover effect
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = activeSection === 'compensation' ? '#0275d8' : '#f8f9fa'; // Reset background color
                    e.target.style.color = activeSection === 'compensation' ? '#fff' : '#0275d8'; // Reset text color
                  }}  // Reset on hover out
                >
                  Compensation
                </button>

                {/* Employment Details Button */}
                <button 
                  onClick={() => setActiveSection('employeeDetails')}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: activeSection === 'employeeDetails' ? '#0275d8' : '#f8f9fa',
                    color: activeSection === 'employeeDetails' ? '#fff' : '#0275d8',
                    border: activeSection === 'employeeDetails' ? '1px solid #0275d8' : '1px solid #ccc',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s, color 0.3s, border 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#E0ECFE'; // Hover background color
                    e.target.style.color = '#0275d8'; // Change text color to white on hover
                  }}  // Hover effect
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = activeSection === 'employeeDetails' ? '#0275d8' : '#f8f9fa'; // Reset background color
                    e.target.style.color = activeSection === 'employeeDetails' ? '#fff' : '#0275d8'; // Reset text color
                  }}  // Reset on hover out
                >
                  Employment Details
                </button>

                {/* Performance Metrics Button */}
                <button 
                  onClick={() => setActiveSection('performanceMetrics')}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: activeSection === 'performanceMetrics' ? '#0275d8' : '#f8f9fa',
                    color: activeSection === 'performanceMetrics' ? '#fff' : '#0275d8',
                    border: activeSection === 'performanceMetrics' ? '1px solid #0275d8' : '1px solid #ccc',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s, color 0.3s, border 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#E0ECFE'; // Hover background color
                    e.target.style.color = '#0275d8'; // Change text color to white on hover
                  }}  // Hover effect
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = activeSection === 'performanceMetrics' ? '#0275d8' : '#f8f9fa'; // Reset background color
                    e.target.style.color = activeSection === 'performanceMetrics' ? '#fff' : '#0275d8'; // Reset text color
                  }}  // Reset on hover out
                >
                  Performance Metrics
                </button>

                {/* Attendance & Leave Button */}
                <button 
                  onClick={() => setActiveSection('attendanceLeave')}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: activeSection === 'attendanceLeave' ? '#0275d8' : '#f8f9fa',
                    color: activeSection === 'attendanceLeave' ? '#fff' : '#0275d8',
                    border: activeSection === 'attendanceLeave' ? '1px solid #0275d8' : '1px solid #ccc',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s, color 0.3s, border 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#E0ECFE'; // Hover background color
                    e.target.style.color = '#0275d8'; // Change text color to white on hover
                  }}  // Hover effect
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = activeSection === 'attendanceLeave' ? '#0275d8' : '#f8f9fa'; // Reset background color
                    e.target.style.color = activeSection === 'attendanceLeave' ? '#fff' : '#0275d8'; // Reset text color
                  }}  // Reset on hover out
                >
                  Attendance & Leave
                </button>
              </div>



              {activeSection === 'personalInfo' && (
                <div style={{ marginTop: '30px', marginLeft: '10px', border: '1px solid #E0E0E0', borderRadius: '10px', padding: '20px', width: '1000px' }}>
                  <h1 style={{ font: 'inter', weight: '500', fontSize: '16px' }}>Personal Information</h1>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginTop: '20px' }}>
                    <p>Full Name <br /> <span style={{ fontWeight: 'bold' }}>{employeeData?.first_name} {employeeData?.last_name}</span></p>
                    <p>
                      Date of Birth: <br />
                      <span style={{ fontWeight: 'bold' }}>
                        {employeeData?.date_of_birth ? new Date(employeeData.date_of_birth).toLocaleDateString('en-GB') : 'N/A'}
                      </span>
                    </p>

                    <p>Gender <br /> <span style={{ fontWeight: 'bold' }}>{employeeData?.gender}</span></p>
                    <p>Phone <br /> <span style={{ fontWeight: 'bold' }}>{employeeData?.phone_number}</span></p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginTop: '20px' }} >
                    <p>Email <br /> <span style={{ fontWeight: 'bold' }}>{employeeData?.email}</span></p>
                    <p>Address <br /><span style={{ fontWeight: 'bold' }}>{employeeData?.home_address}</span></p>
                    <p>Emergency Contact <br /> <span style={{ fontWeight: 'bold' }}>{employeeData?.emergency_contact}</span></p>
                    <p>Relationship to Employee <br /> </p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginTop: '20px' }}  >
                    <p>Spouse Number: <br /> </p>
                  </div>
                </div>
              )}

                {activeSection === 'compensation' && (
                  <div style={{ marginTop: '30px', marginLeft: '10px', border: '1px solid #E0E0E0', borderRadius: '10px', padding: '20px', width: '1000px' }}>
                    <h1 style={{ font: 'inter', weight: '500', fontSize: '16px' }}>Compensation</h1>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', marginTop: '20px' }}>
                      {/* Basic Salary */}
                      <div>
                        <p style={{ fontWeight: 'bold' }}>Basic Salary</p>
                        <p style={{ fontWeight: 'bold', color: 'green' }}>{employeeData?.base_salary}</p>
                      </div>
                      {/* Overtime Hours Allowance */}
                      <div>
                        <p style={{ fontWeight: 'bold' }}>Overtime Hours Allowance</p>
                        <p style={{ fontWeight: 'bold', color: 'green' }}>{employeeData?.overtime_hours_allowance}</p>
                      </div>
                      {/* Allowances */}
                      <div>
                        <p style={{ fontWeight: 'bold' }}>Allowances</p>
                        <p>Housing: <span style={{ fontWeight: 'bold', color: 'green' }}>{employeeData?.housing_allowance}</span></p>
                        <p>Medical: <span style={{ fontWeight: 'bold', color: 'green' }}>{employeeData?.medical_allowance}</span></p>
                        <p>Transport: <span style={{ fontWeight: 'bold', color: 'green' }}>{employeeData?.transport_allowance}</span></p>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', marginTop: '20px' }}>
                      {/* Deductions */}
                      <div>
                        <p style={{ fontWeight: 'bold' }}>Deductions</p>
                        <p style={{ fontWeight: 'bold', color: 'red' }}>{employeeData?.paye_deduction}</p>
                      </div>
                      {/* Pension Plan Contribution */}
                      <div>
                        <p style={{ fontWeight: 'bold' }}>Pension Plan Contribution</p>
                        <p style={{ fontWeight: 'bold' }}>{employeeData?.employee_contribution}</p>
                      </div>
                      {/* Net Pay */}
                      <div>
                        <p style={{ fontWeight: 'bold' }}>Net Pay</p>
                        <p style={{ fontWeight: 'bold' }}>{employeeData?.net_pay}/month</p>
                      </div>
                    </div>
                  </div>
                )}


                {activeSection === 'employeeDetails' && (
                  <div style={{ marginTop: '30px', marginLeft: '10px', border: '1px solid #E0E0E0', borderRadius: '10px', padding: '20px', width: '1000px' }}>
                    <h1 style={{ font: 'inter', weight: '500', fontSize: '16px' }}>Employee Details</h1>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', marginTop: '20px' }}>
                      {/* Job Title */}
                      <div>
                        <p>Job Title</p>
                        <p style={{ fontWeight: 'bold' }}>{employeeData?.job_title}</p>
                      </div>
                      {/* Employee ID */}
                      <div>
                        <p>Employee ID</p>
                        <p style={{ fontWeight: 'bold' }}>{employeeData?.employee_id}</p>
                      </div>
                      {/* Employment Date */}
                      <div>
                        <p>Employment Date</p>
                        <p style={{ fontWeight: 'bold' }}>{employeeData?.employment_date ? new Date(employeeData.employment_date).toLocaleDateString('en-GB') : 'N/A'}</p>
                        
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', marginTop: '20px' }}>
                      {/* Department */}
                      <div>
                        <p>Department</p>
                        <p style={{ fontWeight: 'bold' }}>{employeeData?.department}</p>
                      </div>
                      {/* H.O.D */}
                      <div>
                        <p>H.O.D</p>
                        <p style={{ fontWeight: 'bold' }}>{employeeData?.hod}</p>
                      </div>
                      {/* Work Mode */}
                      <div>
                        <p>Work Mode</p>
                        <p style={{ fontWeight: 'bold' }}>{employeeData?.work_mode}</p>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', marginTop: '20px' }}>
                      {/* Work Location */}
                      <div>
                        <p>Work Location</p>
                        <p style={{ fontWeight: 'bold' }}>{employeeData?.work_location}</p>
                      </div>
                      {/* Role */}
                      <div>
                        <p>Role</p>
                        <p style={{ fontWeight: 'bold' }}>{employeeData?.role}</p>
                      </div>
                      {/* Working Hours */}
                      <div>
                        <p>Working Hours</p>
                        <p style={{ fontWeight: 'bold' }}>{employeeData?.working_hours}</p>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', marginTop: '20px' }}>
                      {/* Vacation Days */}
                      <div>
                        <p>Vacation Days</p>
                        <p style={{ fontWeight: 'bold' }}>{employeeData?.annual_leave_days}</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'performanceMetrics' && (
                  <div style={{ marginTop: '30px', marginLeft: '10px', border: '1px solid #E0E0E0', borderRadius: '10px', padding: '20px', width: '1000px' }}>
                    <h1 style={{ font: 'inter', fontWeight: '500', fontSize: '16px' }}>Performance Metrics</h1>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', marginTop: '20px' }}>
                      {/* Attendance Rate */}
                      <div>
                        <p>Attendance Rate</p>
                        {/* Map over the attendance array and display the relevant data */}
                        <p style={{ fontWeight: 'bold' }}>Monthly Attendance: {employeeData?.attendance.filter(att => att.attendance_status === 'present').length}</p>
                        <p style={{ fontWeight: 'bold' }}>Year-To-Date Attendance: {employeeData?.attendance.length}</p>
                      </div>

                      {/* Leave Balance */}
                      <div>
                        <p>Leave Balance</p>
                        <p style={{ fontWeight: 'bold' }}>Remaining Leave Days: {employeeData?.used_leave_days}</p>
                      </div>

                      {/* Late Check-ins */}
                      <div>
                        <p style={{ fontWeight: 'bold' }}>Late Check-ins</p>
                        {/* Map over the attendance array and find late check-ins */}
                        <p style={{ fontWeight: 'bold' }}>This Month: {employeeData?.attendance.filter(att => att.hours_worked < 0.05).length}</p>
                        <p style={{ fontWeight: 'bold' }}>Year-To-Date: {employeeData?.attendance.filter(att => att.hours_worked < 0.05).length}</p>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', marginTop: '20px' }}>
                      {/* Overtime Hours */}
                      <div>
                        <p>Overtime Hours</p>
                        <p style={{ fontWeight: 'bold' }}>This Month: {employeeData?.overtime_hours_allowance}</p>
                        <p style={{ fontWeight: 'bold' }}>Year-To-Date: {employeeData?.overtime_hours_allowance}</p>
                      </div>

                      {/* Partial Attendance */}
                      <div>
                        <p>Partial Attendance</p>
                        <p style={{ fontWeight: 'bold' }}>This Month: {employeeData?.attendance.filter(att => att.overtime_hours > 0).length}</p>
                        <p style={{ fontWeight: 'bold' }}>Year-To-Date: {employeeData?.attendance.filter(att => att.overtime_hours > 0).length}</p>
                      </div>
                    </div>
                  </div>
                )}

              {activeSection === 'attendanceLeave' && <AttendanceLeaveOverview />}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
