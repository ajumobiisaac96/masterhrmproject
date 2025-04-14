// // import {React,useState} from 'react'
// // import Sidebar from '../components/Sidebar'
// // import EmployeeNavbar from '../components/EmployeeNavbar.jsx'
// // import './EmployeeDashboard.css'
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import Test from '../assets/test.png' 

// // const ProfileDashboard = () => {

// //   const [activeSection, setActiveSection] = useState('personalInfo');

// //   return (
// //       <div>
// //         <div>
// //         <div className="main-dashboard">
// //           <Sidebar/>
// //           <div className="dashboard">
          
// //           <EmployeeNavbar/>

// //             <hr className="horizontal" />

// //             <div className="employee-dashboard-info" style={{display:'flex', justifyContent:'space-between', width: '1000px'}}>
              
// //               <div className="profile-info" style={{display:'flex', }}>
// //                 <div className="profile-image">
// //                   <img src={Test} alt="" style={{ width: '100px' , height: '100px' }} />
// //                 </div>
// //                 <div className="dashboard-details" style={{flexDirection:'column', alignItems:'flex-start', height:'40px'}}>
// //                   <h5>David Kim</h5>
// //                   <h6>HRMS Admnistrator</h6>
// //                   <h6>davidkim@proxima.com</h6>
// //                 </div>
// //               </div>
              
// //               <div className="employee-dashboard-info" style={{display:'flex', flexDirection:'column', marginLeft:'-200px'}}>
// //                 <h1>Working Hours</h1>
// //                 <div className="clock" style={{display:'flex', alignItems:'center', marginTop:'-20px'}} >
// //                   <div className="timer" 
// //                   style={{
// //                     width: '100px',
// //                       height: '38px',
// //                       padding: '8px',
// //                       marginTop:'10px',
// //                       borderRadius: '4px',
// //                       border: '1px solid #F8F8F8',
// //                       background:'#D9D9D9'
// //                   }}>00:00:00</div>
// //                   <button style={{width:'100px'}}> <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" />Clock Out</button>
// //                 </div>
// //               </div>

// //             </div>
            
// //             <div className="dashboard-details-1">
// //               <div className="first-grid">
// //               <FontAwesomeIcon icon="fa-solid fa-clock" className="dashboard-icon"/>
// //                 <div>
// //                   <h6>Attendance</h6>
// //                   <h5>90%</h5>
// //                 </div>
// //               </div>
  
// //               <div className="first-grid">
// //               <FontAwesomeIcon icon="fa-solid fa-calendar" className="dashboard-icon" />
// //                 <div>
// //                   <h6>Leave Balance</h6>
// //                   <h5>0 Days</h5>
// //                 </div>
// //               </div>
  
// //               <div className="first-grid">
// //               <FontAwesomeIcon icon="fa-solid fa-calendar" className="dashboard-icon" />
// //                 <div>
// //                   <h6>Net Pay</h6>
// //                   <h5>Salary :Dec 25</h5>
// //                 </div>
// //               </div>
  
// //               <div className="first-grid">
// //               <FontAwesomeIcon icon="fa-solid fa-users" className="dashboard-icon" />
// //                 <div>
// //                   <h6>Overtime Hours</h6>
// //                   <h5>15 Hours</h5>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Subnav Buttons */}
// //       <div className="employee-profile-info">
// //                   <div>
// //                     <button
// //                       onClick={() => setActiveSection('personalInfo')}
// //                       className={activeSection === 'personalInfo' ? 'active' : ''}
// //                     >
// //                       <FontAwesomeIcon icon="fa-building" className="icon" />
// //                       Account Setting
// //                     </button>
// //                   </div>
// //                   <div>
// //                     <button
// //                       onClick={() => setActiveSection('compensation')}
// //                       className={activeSection === 'compensation' ? 'active' : ''}
// //                     >
// //                       <FontAwesomeIcon icon="fa-solid fa-money-bill" className="icon" />
// //                       Pesonal Information
// //                     </button>
// //                   </div>
// //                   <div>
// //                     <button
// //                       onClick={() => setActiveSection('employeeDetails')}
// //                       className={activeSection === 'employeeDetails' ? 'active' : ''}
// //                     >
// //                       <FontAwesomeIcon icon="fa-solid fa-list-check" className="icon" />
// //                       Employment Details
// //                     </button>
// //                   </div>
// //                   <div>
// //                     <button
// //                       onClick={() => setActiveSection('performanceMetrics')}
// //                       className={activeSection === 'performanceMetrics' ? 'active' : ''}
// //                     >
// //                       <FontAwesomeIcon icon="fa-solid fa-chart-simple" className="icon" />
// //                       Compensation
// //                     </button>
// //                   </div>
// //                 </div>

// //                 {/* Account Section */}
// //                 <div
// //                   style={{ display: activeSection === 'personalInfo' ? 'block' : 'none' }}
// //                 >
// //                   <div className="dashboard-detail">
// //                     <div className="header">
// //                       <h1>Account Setting</h1>
// //                     </div>
// //                     <div className="dashboard-details-2-1">
// //                       <div className="row-1" style={{flexDirection:'column'}} >
// //                         <div style={{marginTop:'10px', marginBottom:'30px'}}>
// //                           <label htmlFor="">Email</label>
// //                           <div className="input-div" style={{display:'flex',  width:'950px', border:'2px solid #D9D9D9', alignItems:'center', borderRadius:'8px', marginBottom:'20px'}} >
// //                             <input type="text" placeholder='Michael Chen@robotec.com'  style={{width:'900px', height:'40px', outline:'none', padding:'20px'}}/>
// //                             <h3>Edit</h3>
// //                           </div>
// //                         </div> 
// //                         <div style={{marginTop:'30px', marginBottom:'30px'}}>
// //                           <label htmlFor="">Emergency contact Name</label>
// //                           <div className="input-div" style={{display:'flex',  width:'950px', border:'2px solid #D9D9D9', alignItems:'center', borderRadius:'8px', marginBottom:'20px'}} >
// //                             <input type="text" placeholder='Sarah Owen'  style={{width:'900px', height:'40px', outline:'none', padding:'20px'}}/>
// //                             <h3>Edit</h3>
// //                           </div>
// //                         </div>
// //                         <div style={{marginTop:'30px', marginBottom:'30px', width:'300px'}}>
// //                           <label htmlFor="">Choose Relationship to Employee</label>
// //                           <div className="input-div" style={{display:'flex',  width:'950px', border:'2px solid #D9D9D9', alignItems:'center', borderRadius:'8px', marginBottom:'20px'}} >
// //                             <input type="text" placeholder=''  style={{width:'900px', height:'40px', outline:'none', padding:'20px'}}/>
// //                             <h3>Edit</h3>
// //                           </div>
// //                         </div>   
// //                         <div style={{marginTop:'30px', marginBottom:'30px', width:'300px'}}>
// //                           <label htmlFor="">Emergency contact Phone Number </label>
// //                           <div className="input-div" style={{display:'flex',  width:'950px', border:'2px solid #D9D9D9', alignItems:'center', borderRadius:'8px', marginBottom:'20px'}} >
// //                             <input type="text" placeholder='903-406-8577'  style={{width:'900px', height:'40px', outline:'none', padding:'20px'}}/>
// //                             <h3>Edit</h3>
// //                           </div>
// //                         </div>
// //                         <div style={{marginTop:'30px', marginBottom:'30px'}}>
// //                           <label htmlFor="">Password</label>
// //                           <div className="input-div" style={{display:'flex',  width:'950px', border:'2px solid #D9D9D9', alignItems:'center', borderRadius:'8px', marginBottom:'20px'}} >
// //                             <input type="password"  style={{width:'900px', height:'40px', outline:'none', padding:'20px'}}/>
// //                             <h3>Edit</h3>
// //                           </div>
// //                         </div>              
                                                                    
 
// //                       </div>

// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Peresonal Information Section */}
// //                 <div
// //                   style={{ display: activeSection === 'compensation' ? 'block' : 'none' }}
// //                 >
// //                   <div className="dashboard-detail">
// //                     <div className="header">
// //                       <h1>Personal Details</h1>
// //                     </div>
// //                     <div className="dashboard-details-2-1">
// //                       <div className="row-1">
// //                         <div>
// //                           <h2>Name</h2>
// //                           <h3>David Kim</h3>
// //                         </div>
// //                         <div>
// //                           <h2>Job Title</h2>
// //                           <h3>Software Engineer</h3>
// //                         </div>
// //                         <div>
// //                           <h2>Email</h2>
// //                           <h3>davidkim@proxima.com</h3>
// //                         </div>
// //                         <div>
// //                           <h2>Department</h2>
// //                           <h3>Engineering</h3>
// //                         </div>
// //                       </div>
// //                       <div className="row-1">
// //                       <div>
// //                         <h2>Address</h2>
// //                         <h3>No 34 Adamu Michaels Street</h3>
// //                       </div>
// //                       {/* <div>
// //                         <h2>Work Mode</h2>
// //                         <h3>On site</h3>
// //                       </div>
// //                       <div>
// //                         <h2>Work Location</h2>
// //                         <h3>Kaduna Office Floor 5v</h3>
// //                       </div>
// //                       <div>
// //                         <h2>Role</h2>
// //                         <h3>Full Time</h3>
// //                       </div> */}
// //                     </div>

// //                     </div>
// //                   </div>
// //                 </div>

// //                           {/* Employee Details */}
// //                           <div
// //                   style={{ display: activeSection === 'employeeDetails' ? 'block' : 'none' }}
// //                 >
// //                   <div className="dashboard-detail">
// //                     <div className="header">
// //                       <h1>Employee Details</h1>
// //                     </div>
// //                     <div className="dashboard-details-2-1">
// //                       <div className="row-1">
// //                         <div>
// //                           <h2>Job Title</h2>
// //                           <h3>Michael Chen</h3>
// //                         </div>
// //                         <div>
// //                           <h2>Employee ID</h2>
// //                           <h3>Tue Nov 12 1998</h3>
// //                         </div>
// //                         <div>
// //                           <h2>Employment Date</h2>
// //                           <h3>March 15, 2021</h3>
// //                         </div>
// //                         <div>
// //                           <h2>Department</h2>
// //                           <h3>Design</h3>
// //                         </div>
// //                       </div>
// //                       <div className="row-1">
// //                       <div>
// //                         <h2>Head of Department</h2>
// //                         <h3>David Wilson</h3>
// //                       </div>
// //                       <div>
// //                         <h2>Work Mode</h2>
// //                         <h3>On site</h3>
// //                       </div>
// //                       <div>
// //                         <h2>Work Location</h2>
// //                         <h3>Kaduna Office Floor 5v</h3>
// //                       </div>
// //                       <div>
// //                         <h2>Role</h2>
// //                         <h3>Full Time</h3>
// //                       </div>
// //                     </div>

// //                     <div className="row-1">
// //                       <div>
// //                         <h2>working Hours</h2>
// //                         <h3>8 Hours</h3>
// //                       </div>
// //                       <div>
// //                         <h2>Vacation Days</h2>
// //                         <h3>30 Days</h3>
// //                       </div>
// //                       <div>
// //                         {/* <h2>Employee Date</h2>
// //                         <h3>March 15,2021</h3> */}
// //                       </div>
// //                       <div>
// //                         {/* <h2>Department</h2>
// //                         <h3>Design</h3> */}
// //                       </div>
// //                     </div>

// //                     </div>
// //                   </div>
// //                 </div>

// //                         {/* Compensation */}
// //                           <div
// //                   style={{ display: activeSection === 'performanceMetrics' ? 'block' : 'none' }}
// //                 >
// // <div className="dashboard-detail">
// //               <div className="header">
// //                 <h1>Compensation</h1>
// //               </div>
// //               <div className="dashboard-details-2-2">
// //                 <div className="row-1">
// //                   <div>
// //                     <h2>Basic Salary</h2>
// //                     <h3 className="green">750,000/month</h3>
// //                   </div>
// //                   <div>
// //                     <h2>Bonuses</h2>
// //                     <h3>Status: <span className="green">Eligible</span></h3>
// //                     <h3>Performance Bonus: <span className="green">150,000/year</span></h3>
// //                   </div>
// //                   <div>
// //                     <h2>Allowances</h2>
// //                     <h3>Housing: <span className="green">N60,000</span></h3>
// //                     <h3>Medical: <span className="green">40,000</span></h3>
// //                     <h3>Transport: <span className="green">N30,000</span></h3>
// //                   </div>
// //                   <div>
// //                     <h2>Deductions</h2>
// //                     <h3>Tax: <div className="red">N45,000</div></h3>
// //                     <h3>Retirement Fund: <div className="red">N22,500</div></h3>
// //                   </div>
// //                 </div>
// //                 <div className="row-1">
// //                   <div>
// //                     <h2>Pension Plan</h2>
// //                     <h3>Employee: <span className="green">5%</span></h3>
// //                     <h3>Employer: <span className="green">7.5%</span></h3>
// //                     <h3>Annual Contribution: <span className="green">N720,000</span></h3>
// //                   </div>
// //                   <div>
// //                     <h2>Health Insurance</h2>
// //                     <h3>Coverage: Comprehensive (Employee + spouse and child)</h3>
// //                     <h3>Provider: LeadWay Health Insurance</h3>
// //                   </div>
// //                   <div>
// //                     <h2>Net Pay</h2>
// //                     <h3>N822,500/month <span>(after allowances and deductions)</span></h3>
// //                   </div>
// //                   <div className="empty-div"></div>
// //                 </div>
// //               </div>
// //             </div>
                  
// //                 </div>
// //           </div>
// //         </div>
// //         </div>
// //     </div>
// //   )
// // }

// // export default ProfileDashboard

// import React, { useState, useEffect } from 'react';
// import Sidebar from '../components/Sidebar';
// import EmployeeNavbar from '../components/EmployeeNavbar.jsx';
// import './EmployeeDashboard.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Test from '../assets/test.png'; // Placeholder image

// const ProfileDashboard = () => {
//   const [activeSection, setActiveSection] = useState('personalInfo');
//   const [employeeData, setEmployeeData] = useState(null); // To store employee data
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch employee profile data from the API
//   useEffect(() => {
//     const fetchEmployeeProfile = async () => {
//       const storedToken = localStorage.getItem('employeeAuthToken'); // Retrieve token from localStorage as 'employeeAuthToken'
      
//       if (!storedToken) {
//         setError('Authentication required');
//         setLoading(false);
//         return;
//       }

//       const token = JSON.parse(storedToken).token; // Parse the stored token object to get the actual token
//       if (!token) {
//         setError('Token not found');
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await fetch('https://proximahr.onrender.com/employee/profile', {
//           headers: {
//             'Authorization': `Bearer ${token}`, // Send token in the Authorization header
//           },
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch employee data');
//         }

//         const data = await response.json();
//         console.log("API Response:", data); // Log the API response in the console

//         // Ensure data is under response.data, and set the employee data
//         setEmployeeData(data.data); // Update here to access the correct 'data' object from the API response
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEmployeeProfile();
//   }, []); // Empty dependency array ensures this runs only once on component mount

//   return (
//     <div>
//       <div className="main-dashboard">
//         <Sidebar />
//         <div className="dashboard">
//           <EmployeeNavbar />

//           <hr className="horizontal" />

//           {/* Employee Profile Section */}
//           <div className="employee-dashboard-info" style={{ display: 'flex', justifyContent: 'space-between', width: '1000px' }}>
//             <div className="profile-info" style={{ display: 'flex' }}>
//               <div className="profile-image">
//                 <img src={employeeData && employeeData.profile_image ? employeeData.profile_image : Test} alt="Profile" style={{ width: '100px', height: '100px' }} />
//               </div>
//               <div className="dashboard-details" style={{ flexDirection: 'column', alignItems: 'flex-start', height: '40px' }}>
//                 <h5>{employeeData ? `${employeeData.first_name} ${employeeData.last_name}` : 'Loading...'}</h5>
//                 <h6>{employeeData ? employeeData.job_title : 'Loading...'}</h6>
//                 <h6>{employeeData ? employeeData.email : 'Loading...'}</h6>
//               </div>
//             </div>

//             <div className="employee-dashboard-info" style={{ display: 'flex', flexDirection: 'column', marginLeft: '-200px' }}>
//               <h1>Working Hours</h1>
//               <div className="clock" style={{ display: 'flex', alignItems: 'center', marginTop: '-20px' }}>
//                 <div className="timer" style={{ width: '100px', height: '38px', padding: '8px', marginTop: '10px', borderRadius: '4px', border: '1px solid #F8F8F8', background: '#D9D9D9' }}>
//                   {employeeData ? employeeData.working_hours : 0}
//                 </div>
//                 <button style={{ width: '100px' }}> <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" /> Clock Out</button>
//               </div>
//             </div>
//           </div>

//           {/* Dashboard Summary */}
//           <div className="dashboard-details-1">
//             <div className="first-grid">
//               <FontAwesomeIcon icon="fa-solid fa-clock" className="dashboard-icon" />
//               <div>
//                 <h6>Attendance</h6>
//                 <h5>{employeeData ? `${employeeData.attendance || 0}%` : 0}%</h5>
//               </div>
//             </div>

//             <div className="first-grid">
//               <FontAwesomeIcon icon="fa-solid fa-calendar" className="dashboard-icon" />
//               <div>
//                 <h6>Leave Balance</h6>
//                 <h5>{employeeData ? `${employeeData.leave_balance || 0} Days` : 0} Days</h5>
//               </div>
//             </div>

//             <div className="first-grid">
//               <FontAwesomeIcon icon="fa-solid fa-calendar" className="dashboard-icon" />
//               <div>
//                 <h6>Net Pay</h6>
//                 <h5>{employeeData ? `Salary: ${employeeData.net_pay || 0}` : 0}</h5>
//               </div>
//             </div>

//             <div className="first-grid">
//               <FontAwesomeIcon icon="fa-solid fa-users" className="dashboard-icon" />
//               <div>
//                 <h6>Overtime Hours</h6>
//                 <h5>{employeeData ? `${employeeData.overtime_hours || 0} Hours` : 0} Hours</h5>
//               </div>
//             </div>
//           </div>

//           {/* Subnav Buttons */}
//           <div className="employee-profile-info">
//             <div>
//               <button
//                 onClick={() => setActiveSection('personalInfo')}
//                 className={activeSection === 'personalInfo' ? 'active' : ''}
//               >
//                 <FontAwesomeIcon icon="fa-building" className="icon" />
//                 Account Setting
//               </button>
//             </div>
//             <div>
//               <button
//                 onClick={() => setActiveSection('compensation')}
//                 className={activeSection === 'compensation' ? 'active' : ''}
//               >
//                 <FontAwesomeIcon icon="fa-solid fa-money-bill" className="icon" />
//                 Personal Information
//               </button>
//             </div>
//             <div>
//               <button
//                 onClick={() => setActiveSection('employeeDetails')}
//                 className={activeSection === 'employeeDetails' ? 'active' : ''}
//               >
//                 <FontAwesomeIcon icon="fa-solid fa-list-check" className="icon" />
//                 Employment Details
//               </button>
//             </div>
//             <div>
//               <button
//                 onClick={() => setActiveSection('performanceMetrics')}
//                 className={activeSection === 'performanceMetrics' ? 'active' : ''}
//               >
//                 <FontAwesomeIcon icon="fa-solid fa-chart-simple" className="icon" />
//                 Compensation
//               </button>
//             </div>
//           </div>

//           {/* Account Setting Section */}
//           <div style={{ display: activeSection === 'personalInfo' ? 'block' : 'none' }}>
//             <div className="dashboard-detail">
//               <div className="header">
//                 <h1>Account Setting</h1>
//               </div>
//               <div className="dashboard-details-2-1">
//                 <div className="row-1" style={{ flexDirection: 'column' }}>
//                   <div style={{ marginTop: '10px', marginBottom: '30px' }}>
//                     <label>Email</label>
//                     <div className="input-div" style={{ display: 'flex', width: '950px', border: '2px solid #D9D9D9', alignItems: 'center', borderRadius: '8px', marginBottom: '20px' }} >
//                       <input type="text" placeholder={employeeData ? employeeData.email : 'Loading...'} style={{ width: '900px', height: '40px', outline: 'none', padding: '20px' }} />
//                       <h3>Edit</h3>
//                     </div>
//                   </div>
//                   {/* More input fields like Emergency Contact, Address, etc. */}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Personal Information Section */}
//           <div style={{ display: activeSection === 'compensation' ? 'block' : 'none' }}>
//             <div className="dashboard-detail">
//               <div className="header">
//                 <h1>Personal Details</h1>
//               </div>
//               <div className="dashboard-details-2-1">
//                 <div className="row-1">
//                   <div>
//                     <h2>Name</h2>
//                     <h3>{employeeData ? `${employeeData.first_name} ${employeeData.last_name}` : 'Loading...'}</h3>
//                   </div>
//                   <div>
//                     <h2>Job Title</h2>
//                     <h3>{employeeData ? employeeData.job_title : 'Loading...'}</h3>
//                   </div>
//                   <div>
//                     <h2>Email</h2>
//                     <h3>{employeeData ? employeeData.email : 'Loading...'}</h3>
//                   </div>
//                   <div>
//                     <h2>Department</h2>
//                     <h3>{employeeData ? employeeData.department : 'Loading...'}</h3>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Employee Details Section */}
//           <div style={{ display: activeSection === 'employeeDetails' ? 'block' : 'none' }}>
//             <div className="dashboard-detail">
//               <div className="header">
//                 <h1>Employee Details</h1>
//               </div>
//               <div className="dashboard-details-2-1">
//                 <div className="row-1">
//                   <div>
//                     <h2>Employee ID</h2>
//                     <h3>{employeeData ? employeeData.employee_id : 'Loading...'}</h3>
//                   </div>
//                   <div>
//                     <h2>Work Mode</h2>
//                     <h3>{employeeData ? employeeData.work_mode : 'Loading...'}</h3>
//                   </div>
//                   <div>
//                     <h2>Work Location</h2>
//                     <h3>{employeeData ? employeeData.work_location : 'Loading...'}</h3>
//                   </div>
//                   <div>
//                     <h2>Employment Date</h2>
//                     <h3>{employeeData ? new Date(employeeData.employment_date).toDateString() : 'Loading...'}</h3>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Compensation Section */}
//           <div style={{ display: activeSection === 'performanceMetrics' ? 'block' : 'none' }}>
//             <div className="dashboard-detail">
//               <div className="header">
//                 <h1>Compensation</h1>
//               </div>
//               <div className="dashboard-details-2-1">
//                 <div className="row-1">
//                   <div>
//                     <h2>Basic Salary</h2>
//                     <h3>{employeeData ? `₦${employeeData.base_salary}` : 'Loading...'}</h3>
//                   </div>
//                   <div>
//                     <h2>Overtime Hours Allowance</h2>
//                     <h3>{employeeData ? `₦${employeeData.overtime_hours_allowance}/Hour` : 'Loading...'}</h3>
//                   </div>
//                   <div>
//                     <h2>Deductions</h2>
//                     <h3>{employeeData ? `PAYE: ₦${employeeData.paye_deduction}` : 'Loading...'}</h3>
//                   </div>
//                 </div>
//                 <div className="row-1">
//                   <div>
//                     <h2>Net Pay</h2>
//                     <h3>{employeeData ? `₦${employeeData.net_pay}/month` : 'Loading...'}</h3>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileDashboard;

// import React, { useState, useEffect } from 'react';
// import Sidebar from '../components/Sidebar';
// import EmployeeNavbar from '../components/EmployeeNavbar.jsx';
// import './EmployeeDashboard.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Test from '../assets/test.png'; // Placeholder image

// const ProfileDashboard = () => {
//   const [activeSection, setActiveSection] = useState('personalInfo');
//   const [employeeData, setEmployeeData] = useState(null); // To store employee data
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [updatedData, setUpdatedData] = useState({
//     email: '',
//     emergencyContactName: '',
//     emergencyContactPhone: '',
//     relationshipToEmployee: '',
//   });
//   const [profileUpdated, setProfileUpdated] = useState(false);

//   // Fetch employee profile data from the API
//   useEffect(() => {
//     const fetchEmployeeProfile = async () => {
//       const storedToken = localStorage.getItem('employeeAuthToken');
      
//       if (!storedToken) {
//         setError('Authentication required');
//         setLoading(false);
//         return;
//       }
  
//       const token = JSON.parse(storedToken).token;
//       if (!token) {
//         setError('Token not found');
//         setLoading(false);
//         return;
//       }
  
//       try {
//         const response = await fetch('https://proximahr.onrender.com/employee/profile', {
//           headers: { 'Authorization': `Bearer ${token}` },
//         });
  
//         if (!response.ok) {
//           throw new Error('Failed to fetch employee data');
//         }
  
//         const data = await response.json();
//         console.log("API Response:", data);
  
//         setEmployeeData(data.data); // Store fetched employee data
//         setUpdatedData({
//           email: data.data.email,
//           emergencyContactName: data.data.emergency_contact_name,
//           emergencyContactPhone: data.data.emergency_contact_phone,
//           relationshipToEmployee: data.data.relationship_to_employee,
//         });
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchEmployeeProfile();
//   }, [profileUpdated]); // Re-fetch when profileUpdated changes
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const storedToken = localStorage.getItem('employeeAuthToken');
//     const token = JSON.parse(storedToken).token;
  
//     if (!token) {
//       setError('Token not found');
//       return;
//     }
  
//     try {
//       const response = await fetch('https://proximahr.onrender.com/employee/update-profile', {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email: updatedData.email,
//           emergency_contact: {
//             name: updatedData.emergencyContactName,
//             phone: updatedData.emergencyContactPhone,
//             relationship: updatedData.relationshipToEmployee,
//           },
//         }),
//       });
  
//       if (!response.ok) {
//         throw new Error('Failed to update profile');
//       }
  
//       const result = await response.json();
//       console.log('Profile updated:', result);
//       alert('Profile updated successfully!');
      
//       // Trigger re-fetch by updating the state
//       setProfileUpdated(!profileUpdated);
//     } catch (error) {
//       console.error('Error submitting profile update:', error.message);
//       setError('Error updating profile. Please try again.');
//     }
//   };
  

//   return (
//     <div>
//       <div className="main-dashboard">
//         <Sidebar />
//         <div className="dashboard">
//           <EmployeeNavbar />

//           <hr className="horizontal" />

//           {/* Employee Profile Section */}
//           <div className="employee-dashboard-info" style={{ display: 'flex', justifyContent: 'space-between', width: '1000px' }}>
//             <div className="profile-info" style={{ display: 'flex' }}>
//               <div className="profile-image">
//                 <img src={employeeData && employeeData.profile_image ? employeeData.profile_image : Test} alt="Profile" style={{ width: '100px', height: '100px' }} />
//               </div>
//               <div className="dashboard-details" style={{ flexDirection: 'column', alignItems: 'flex-start', height: '40px' }}>
//                 <h5>{employeeData ? `${employeeData.first_name} ${employeeData.last_name}` : 'Loading...'}</h5>
//                 <h6>{employeeData ? employeeData.job_title : 'Loading...'}</h6>
//                 <h6>{employeeData ? employeeData.email : 'Loading...'}</h6>
//               </div>
//             </div>

//             <div className="employee-dashboard-info" style={{ display: 'flex', flexDirection: 'column', marginLeft: '-200px' }}>
//               <h1>Working Hours</h1>
//               <div className="clock" style={{ display: 'flex', alignItems: 'center', marginTop: '-20px' }}>
//                 <div className="timer" style={{ width: '100px', height: '38px', padding: '8px', marginTop: '10px', borderRadius: '4px', border: '1px solid #F8F8F8', background: '#D9D9D9' }}>
//                   {employeeData ? employeeData.working_hours : 0}
//                 </div>
//                 <button style={{ width: '100px' }}> <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" /> Clock Out</button>
//               </div>
//             </div>
//           </div>

//           {/* Dashboard Summary */}
//           <div className="dashboard-details-1">
//             <div className="first-grid">
//               <FontAwesomeIcon icon="fa-solid fa-clock" className="dashboard-icon" />
//               <div>
//                 <h6>Attendance</h6>
//                 <h5>{employeeData ? `${employeeData.attendance || 0}%` : 0}%</h5>
//               </div>
//             </div>

//             <div className="first-grid">
//               <FontAwesomeIcon icon="fa-solid fa-calendar" className="dashboard-icon" />
//               <div>
//                 <h6>Leave Balance</h6>
//                 <h5>{employeeData ? `${employeeData.leave_balance || 0} Days` : 0} Days</h5>
//               </div>
//             </div>

//             <div className="first-grid">
//               <FontAwesomeIcon icon="fa-solid fa-calendar" className="dashboard-icon" />
//               <div>
//                 <h6>Net Pay</h6>
//                 <h5>{employeeData ? `Salary: ${employeeData.net_pay || 0}` : 0}</h5>
//               </div>
//             </div>

//             <div className="first-grid">
//               <FontAwesomeIcon icon="fa-solid fa-users" className="dashboard-icon" />
//               <div>
//                 <h6>Overtime Hours</h6>
//                 <h5>{employeeData ? `${employeeData.overtime_hours || 0} Hours` : 0} Hours</h5>
//               </div>
//             </div>
//           </div>

//           {/* Subnav Buttons */}
//           <div className="employee-profile-info">
//             <div>
//               <button
//                 onClick={() => setActiveSection('personalInfo')}
//                 className={activeSection === 'personalInfo' ? 'active' : ''}
//               >
//                 <FontAwesomeIcon icon="fa-building" className="icon" />
//                 Account Setting
//               </button>
//             </div>
//             <div>
//               <button
//                 onClick={() => setActiveSection('compensation')}
//                 className={activeSection === 'compensation' ? 'active' : ''}
//               >
//                 <FontAwesomeIcon icon="fa-solid fa-money-bill" className="icon" />
//                 Personal Information
//               </button>
//             </div>
//             <div>
//               <button
//                 onClick={() => setActiveSection('employeeDetails')}
//                 className={activeSection === 'employeeDetails' ? 'active' : ''}
//               >
//                 <FontAwesomeIcon icon="fa-solid fa-list-check" className="icon" />
//                 Employment Details
//               </button>
//             </div>
//             <div>
//               <button
//                 onClick={() => setActiveSection('performanceMetrics')}
//                 className={activeSection === 'performanceMetrics' ? 'active' : ''}
//               >
//                 <FontAwesomeIcon icon="fa-solid fa-chart-simple" className="icon" />
//                 Compensation
//               </button>
//             </div>
//           </div>

//           {/* Account Setting Section */}
//           <div style={{ display: activeSection === 'personalInfo' ? 'block' : 'none' }}>
//             <div className="dashboard-detail">
//               <div className="header">
//                 <h1>Account Setting</h1>
//               </div>
//               <div className="dashboard-details-2-1">
//                 <div className="row-1" style={{ flexDirection: 'column' }}>
//                   <div style={{ marginTop: '10px', marginBottom: '30px' }}>
//                     <label>Email</label>
//                     <div className="input-div" style={{ display: 'flex', width: '950px', border: '2px solid #D9D9D9', alignItems: 'center', borderRadius: '8px', marginBottom: '20px' }} >
//                       <input type="text" placeholder={employeeData ? employeeData.email : 'Loading...'} value={updatedData.email} name="email" onChange={handleChange} style={{ width: '900px', height: '40px', outline: 'none', padding: '20px' }} />
//                       <h3>Edit</h3>
//                     </div>
//                   </div>
//                   <div style={{ marginTop: '30px', marginBottom: '30px' }}>
//                     <label>Emergency Contact Name</label>
//                     <div className="input-div" style={{ display: 'flex', width: '950px', border: '2px solid #D9D9D9', alignItems: 'center', borderRadius: '8px', marginBottom: '20px' }} >
//                       <input type="text" placeholder={employeeData ? employeeData.emergency_contact_name : 'Loading...'} value={updatedData.emergencyContactName} name="emergencyContactName" onChange={handleChange} style={{ width: '900px', height: '40px', outline: 'none', padding: '20px' }} />
//                       <h3>Edit</h3>
//                     </div>
//                   </div>
//                   <div style={{ marginTop: '30px', marginBottom: '30px' }}>
//                     <label>Emergency Contact Phone Number</label>
//                     <div className="input-div" style={{ display: 'flex', width: '950px', border: '2px solid #D9D9D9', alignItems: 'center', borderRadius: '8px', marginBottom: '20px' }} >
//                       <input type="text" placeholder={employeeData ? employeeData.emergency_contact_phone : 'Loading...'} value={updatedData.emergencyContactPhone} name="emergencyContactPhone" onChange={handleChange} style={{ width: '900px', height: '40px', outline: 'none', padding: '20px' }} />
//                       <h3>Edit</h3>
//                     </div>
//                   </div>
//                   <div style={{ marginTop: '30px', marginBottom: '30px' }}>
//                     <label>Relationship to Employee</label>
//                     <div className="input-div" style={{ display: 'flex', width: '950px', border: '2px solid #D9D9D9', alignItems: 'center', borderRadius: '8px', marginBottom: '20px' }} >
//                       <input type="text" placeholder={employeeData ? employeeData.relationship_to_employee : 'Loading...'} value={updatedData.relationshipToEmployee} name="relationshipToEmployee" onChange={handleChange} style={{ width: '900px', height: '40px', outline: 'none', padding: '20px' }} />
//                       <h3>Edit</h3>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <button onClick={handleSubmit} style={{ marginTop: '20px' }}>Save Changes</button>
//           </div>

//           {/* Personal Information Section */}
//           <div style={{ display: activeSection === 'compensation' ? 'block' : 'none' }}>
//             <div className="dashboard-detail">
//               <div className="header">
//                 <h1>Personal Details</h1>
//               </div>
//               <div className="dashboard-details-2-1">
//                 <div className="row-1">
//                   <div>
//                     <h2>Name</h2>
//                     <h3>{employeeData ? `${employeeData.first_name} ${employeeData.last_name}` : 'Loading...'}</h3>
//                   </div>
//                   <div>
//                     <h2>Job Title</h2>
//                     <h3>{employeeData ? employeeData.job_title : 'Loading...'}</h3>
//                   </div>
//                   <div>
//                     <h2>Email</h2>
//                     <h3>{employeeData ? employeeData.email : 'Loading...'}</h3>
//                   </div>
//                   <div>
//                     <h2>Department</h2>
//                     <h3>{employeeData ? employeeData.department : 'Loading...'}</h3>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Employee Details Section */}
//           <div style={{ display: activeSection === 'employeeDetails' ? 'block' : 'none' }}>
//             <div className="dashboard-detail">
//               <div className="header">
//                 <h1>Employee Details</h1>
//               </div>
//               <div className="dashboard-details-2-1">
//                 <div className="row-1">
//                   <div>
//                     <h2>Employee ID</h2>
//                     <h3>{employeeData ? employeeData.employee_id : 'Loading...'}</h3>
//                   </div>
//                   <div>
//                     <h2>Work Mode</h2>
//                     <h3>{employeeData ? employeeData.work_mode : 'Loading...'}</h3>
//                   </div>
//                   <div>
//                     <h2>Work Location</h2>
//                     <h3>{employeeData ? employeeData.work_location : 'Loading...'}</h3>
//                   </div>
//                   <div>
//                     <h2>Employment Date</h2>
//                     <h3>{employeeData ? new Date(employeeData.employment_date).toDateString() : 'Loading...'}</h3>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Compensation Section */}
//           <div style={{ display: activeSection === 'performanceMetrics' ? 'block' : 'none' }}>
//             <div className="dashboard-detail">
//               <div className="header">
//                 <h1>Compensation</h1>
//               </div>
//               <div className="dashboard-details-2-1">
//                 <div className="row-1">
//                   <div>
//                     <h2>Basic Salary</h2>
//                     <h3>{employeeData ? `₦${employeeData.base_salary}` : 'Loading...'}</h3>
//                   </div>
//                   <div>
//                     <h2>Overtime Hours Allowance</h2>
//                     <h3>{employeeData ? `₦${employeeData.overtime_hours_allowance}/Hour` : 'Loading...'}</h3>
//                   </div>
//                   <div>
//                     <h2>Deductions</h2>
//                     <h3>{employeeData ? `PAYE: ₦${employeeData.paye_deduction}` : 'Loading...'}</h3>
//                   </div>
//                 </div>
//                 <div className="row-1">
//                   <div>
//                     <h2>Net Pay</h2>
//                     <h3>{employeeData ? `₦${employeeData.net_pay}/month` : 'Loading...'}</h3>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileDashboard;


// import React, { useState, useEffect } from 'react';
// import Sidebar from '../components/Sidebar';
// import EmployeeNavbar from '../components/EmployeeNavbar.jsx';
// import './EmployeeDashboard.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Test from '../assets/test.png'; // Placeholder image

// const ProfileDashboard = () => {
//   const [activeSection, setActiveSection] = useState('personalInfo');
//   const [employeeData, setEmployeeData] = useState(null); // To store employee data
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [updatedData, setUpdatedData] = useState({
//     email: '',
//     emergencyContactName: '',
//     emergencyContactPhone: '',
//     relationshipToEmployee: '',
//   });

//   // Fetch employee profile data from the API
//   useEffect(() => {
//     const fetchEmployeeProfile = async () => {
//       const storedToken = localStorage.getItem('employeeAuthToken'); // Retrieve token from localStorage as 'employeeAuthToken'
      
//       if (!storedToken) {
//         setError('Authentication required');
//         setLoading(false);
//         return;
//       }

//       const token = JSON.parse(storedToken).token; // Parse the stored token object to get the actual token
//       if (!token) {
//         setError('Token not found');
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await fetch('https://proximahr.onrender.com/employee/profile', {
//           headers: {
//             'Authorization': `Bearer ${token}`, // Send token in the Authorization header
//           },
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch employee data');
//         }

//         const data = await response.json();
//         console.log("API Response:", data); // Log the API response in the console

//         // Ensure data is under response.data, and set the employee data
//         setEmployeeData(data.data); // Update here to access the correct 'data' object from the API response
//         setUpdatedData({
//           email: data.data.email,
//           emergencyContactName: data.data.emergency_contact_name,
//           emergencyContactPhone: data.data.emergency_contact_phone,
//           relationshipToEmployee: data.data.relationship_to_employee,
//         });
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEmployeeProfile();
//   }, []); // Empty dependency array ensures this runs only once on component mount

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedData({
//       ...updatedData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const storedToken = localStorage.getItem('employeeAuthToken');
//     const token = JSON.parse(storedToken).token;

//     if (!token) {
//       setError('Token not found');
//       return;
//     }

//     try {
//       const response = await fetch('https://proximahr.onrender.com/employee/update-profile', {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email: updatedData.email,
//           emergency_contact: {
//             name: updatedData.emergencyContactName,
//             phone: updatedData.emergencyContactPhone,
//             relationship: updatedData.relationshipToEmployee,
//           },
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update profile');
//       }

//       const result = await response.json();
//       console.log('Profile updated:', result);
//       alert('Profile updated successfully!');
//     } catch (error) {
//       console.error('Error submitting profile update:', error.message);
//       setError('Error updating profile. Please try again.');
//     }
//   };

//   return (
//     <div>
//       <div className="main-dashboard">
//         <Sidebar />
//         <div className="dashboard">
//           <EmployeeNavbar />

//           <hr className="horizontal" />

//           {/* Employee Profile Section */}
//           <div className="employee-dashboard-info" style={{ display: 'flex', justifyContent: 'space-between', width: '1000px' }}>
//             <div className="profile-info" style={{ display: 'flex' }}>
//               <div className="profile-image">
//                 <img src={employeeData && employeeData.profile_image ? employeeData.profile_image : Test} alt="Profile" style={{ width: '100px', height: '100px' }} />
//               </div>
//               <div className="dashboard-details" style={{ flexDirection: 'column', alignItems: 'flex-start', height: '40px' }}>
//                 <h5>{employeeData ? `${employeeData.first_name} ${employeeData.last_name}` : 'Loading...'}</h5>
//                 <h6>{employeeData ? employeeData.job_title : 'Loading...'}</h6>
//                 <h6>{employeeData ? employeeData.email : 'Loading...'}</h6>
//               </div>
//             </div>

//             <div className="employee-dashboard-info" style={{ display: 'flex', flexDirection: 'column', marginLeft: '-200px' }}>
//               <h1>Working Hours</h1>
//               <div className="clock" style={{ display: 'flex', alignItems: 'center', marginTop: '-20px' }}>
//                 <div className="timer" style={{ width: '100px', height: '38px', padding: '8px', marginTop: '10px', borderRadius: '4px', border: '1px solid #F8F8F8', background: '#D9D9D9' }}>
//                   {employeeData ? employeeData.working_hours : 0}
//                 </div>
//                 <button style={{ width: '100px' }}> <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" /> Clock Out</button>
//               </div>
//             </div>
//           </div>

//           {/* Dashboard Summary */}
//           <div className="dashboard-details-1">
//             <div className="first-grid">
//               <FontAwesomeIcon icon="fa-solid fa-clock" className="dashboard-icon" />
//               <div>
//                 <h6>Attendance</h6>
//                 <h5>{employeeData ? `${employeeData.attendance || 0}%` : 0}%</h5>
//               </div>
//             </div>

//             <div className="first-grid">
//               <FontAwesomeIcon icon="fa-solid fa-calendar" className="dashboard-icon" />
//               <div>
//                 <h6>Leave Balance</h6>
//                 <h5>{employeeData ? `${employeeData.leave_balance || 0} Days` : 0} Days</h5>
//               </div>
//             </div>

//             <div className="first-grid">
//               <FontAwesomeIcon icon="fa-solid fa-calendar" className="dashboard-icon" />
//               <div>
//                 <h6>Net Pay</h6>
//                 <h5>{employeeData ? `Salary: ${employeeData.net_pay || 0}` : 0}</h5>
//               </div>
//             </div>

//             <div className="first-grid">
//               <FontAwesomeIcon icon="fa-solid fa-users" className="dashboard-icon" />
//               <div>
//                 <h6>Overtime Hours</h6>
//                 <h5>{employeeData ? `${employeeData.overtime_hours || 0} Hours` : 0} Hours</h5>
//               </div>
//             </div>
//           </div>

//           {/* Subnav Buttons */}
//           <div className="employee-profile-info">
//             <div>
//               <button
//                 onClick={() => setActiveSection('personalInfo')}
//                 className={activeSection === 'personalInfo' ? 'active' : ''}
//               >
//                 <FontAwesomeIcon icon="fa-building" className="icon" />
//                 Account Setting
//               </button>
//             </div>
//             <div>
//               <button
//                 onClick={() => setActiveSection('compensation')}
//                 className={activeSection === 'compensation' ? 'active' : ''}
//               >
//                 <FontAwesomeIcon icon="fa-solid fa-money-bill" className="icon" />
//                 Personal Information
//               </button>
//             </div>
//             <div>
//               <button
//                 onClick={() => setActiveSection('employeeDetails')}
//                 className={activeSection === 'employeeDetails' ? 'active' : ''}
//               >
//                 <FontAwesomeIcon icon="fa-solid fa-list-check" className="icon" />
//                 Employment Details
//               </button>
//             </div>
//             <div>
//               <button
//                 onClick={() => setActiveSection('performanceMetrics')}
//                 className={activeSection === 'performanceMetrics' ? 'active' : ''}
//               >
//                 <FontAwesomeIcon icon="fa-solid fa-chart-simple" className="icon" />
//                 Compensation
//               </button>
//             </div>
//           </div>

//           {/* Account Setting Section */}
//           <div style={{ display: activeSection === 'personalInfo' ? 'block' : 'none' }}>
//             <div className="dashboard-detail">
//               <div className="header">
//                 <h1>Account Setting</h1>
//               </div>
//               <div className="dashboard-details-2-1">
//                 <div className="row-1" style={{ flexDirection: 'column' }}>
//                   <div style={{ marginTop: '10px', marginBottom: '30px' }}>
//                     <label>Email</label>
//                     <div className="input-div" style={{ display: 'flex', width: '950px', border: '2px solid #D9D9D9', alignItems: 'center', borderRadius: '8px', marginBottom: '20px' }} >
//                       <input type="text" placeholder={employeeData ? employeeData.email : 'Loading...'} value={updatedData.email} name="email" onChange={handleChange} style={{ width: '900px', height: '40px', outline: 'none', padding: '20px' }} />
//                       <h3>Edit</h3>
//                     </div>
//                   </div>
//                   <div style={{ marginTop: '30px', marginBottom: '30px' }}>
//                     <label>Emergency Contact Name</label>
//                     <div className="input-div" style={{ display: 'flex', width: '950px', border: '2px solid #D9D9D9', alignItems: 'center', borderRadius: '8px', marginBottom: '20px' }} >
//                       <input type="text" placeholder={employeeData ? employeeData.emergency_contact_name : 'Loading...'} value={updatedData.emergencyContactName} name="emergencyContactName" onChange={handleChange} style={{ width: '900px', height: '40px', outline: 'none', padding: '20px' }} />
//                       <h3>Edit</h3>
//                     </div>
//                   </div>
//                   <div style={{ marginTop: '30px', marginBottom: '30px' }}>
//                     <label>Emergency Contact Phone Number</label>
//                     <div className="input-div" style={{ display: 'flex', width: '950px', border: '2px solid #D9D9D9', alignItems: 'center', borderRadius: '8px', marginBottom: '20px' }} >
//                       <input type="text" placeholder={employeeData ? employeeData.emergency_contact_phone : 'Loading...'} value={updatedData.emergencyContactPhone} name="emergencyContactPhone" onChange={handleChange} style={{ width: '900px', height: '40px', outline: 'none', padding: '20px' }} />
//                       <h3>Edit</h3>
//                     </div>
//                   </div>
//                   <div style={{ marginTop: '30px', marginBottom: '30px' }}>
//                     <label>Relationship to Employee</label>
//                     <div className="input-div" style={{ display: 'flex', width: '950px', border: '2px solid #D9D9D9', alignItems: 'center', borderRadius: '8px', marginBottom: '20px' }} >
//                       <input type="text" placeholder={employeeData ? employeeData.relationship_to_employee : 'Loading...'} value={updatedData.relationshipToEmployee} name="relationshipToEmployee" onChange={handleChange} style={{ width: '900px', height: '40px', outline: 'none', padding: '20px' }} />
//                       <h3>Edit</h3>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <button onClick={handleSubmit} style={{ marginTop: '20px' }}>Save Changes</button>
//           </div>

//           {/* Personal Information Section */}
//           <div style={{ display: activeSection === 'compensation' ? 'block' : 'none' }}>
//             <div className="dashboard-detail">
//               <div className="header">
//                 <h1>Personal Details</h1>
//               </div>
//               <div className="dashboard-details-2-1">
//                 <div className="row-1">
//                   <div>
//                     <h2>Name</h2>
//                     <h3>{employeeData ? `${employeeData.first_name} ${employeeData.last_name}` : 'Loading...'}</h3>
//                   </div>
//                   <div>
//                     <h2>Job Title</h2>
//                     <h3>{employeeData ? employeeData.job_title : 'Loading...'}</h3>
//                   </div>
//                   <div>
//                     <h2>Email</h2>
//                     <h3>{employeeData ? employeeData.email : 'Loading...'}</h3>
//                   </div>
//                   <div>
//                     <h2>Department</h2>
//                     <h3>{employeeData ? employeeData.department : 'Loading...'}</h3>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Employee Details Section */}
//           <div style={{ display: activeSection === 'employeeDetails' ? 'block' : 'none' }}>
//             <div className="dashboard-detail">
//               <div className="header">
//                 <h1>Employee Details</h1>
//               </div>
//               <div className="dashboard-details-2-1">
//                 <div className="row-1">
//                   <div>
//                     <h2>Employee ID</h2>
//                     <h3>{employeeData ? employeeData.employee_id : 'Loading...'}</h3>
//                   </div>
//                   <div>
//                     <h2>Work Mode</h2>
//                     <h3>{employeeData ? employeeData.work_mode : 'Loading...'}</h3>
//                   </div>
//                   <div>
//                     <h2>Work Location</h2>
//                     <h3>{employeeData ? employeeData.work_location : 'Loading...'}</h3>
//                   </div>
//                   <div>
//                     <h2>Employment Date</h2>
//                     <h3>{employeeData ? new Date(employeeData.employment_date).toDateString() : 'Loading...'}</h3>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Compensation Section */}
//           <div style={{ display: activeSection === 'performanceMetrics' ? 'block' : 'none' }}>
//             <div className="dashboard-detail">
//               <div className="header">
//                 <h1>Compensation</h1>
//               </div>
//               <div className="dashboard-details-2-1">
//                 <div className="row-1">
//                   <div>
//                     <h2>Basic Salary</h2>
//                     <h3>{employeeData ? `₦${employeeData.base_salary}` : 'Loading...'}</h3>
//                   </div>
//                   <div>
//                     <h2>Overtime Hours Allowance</h2>
//                     <h3>{employeeData ? `₦${employeeData.overtime_hours_allowance}/Hour` : 'Loading...'}</h3>
//                   </div>
//                   <div>
//                     <h2>Deductions</h2>
//                     <h3>{employeeData ? `PAYE: ₦${employeeData.paye_deduction}` : 'Loading...'}</h3>
//                   </div>
//                 </div>
//                 <div className="row-1">
//                   <div>
//                     <h2>Net Pay</h2>
//                     <h3>{employeeData ? `₦${employeeData.net_pay}/month` : 'Loading...'}</h3>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileDashboard;












import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import EmployeeNavbar from '../components/EmployeeNavbar.jsx';
import './EmployeeDashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Test from '../assets/test.png'; // Placeholder image
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


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
      
      

  return (
    <div>
      <div className="main-dashboard">
        <Sidebar />
        <div className="dashboard">
          <EmployeeNavbar />

          <hr className="horizontal" />

          {/* Employee Profile Section */}
          <div className="employee-dashboard-info" style={{ display: 'flex', justifyContent: 'space-between', width: '1000px' }}>
            <div className="profile-info" style={{ display: 'flex', position: 'relative' }}>
            <div className="profile-image" style={{ position: 'relative' }}>
              <img 
                src={employeeData && employeeData.profile_image ? employeeData.profile_image : profileImage || Test} 
                alt="Profile" 
                style={{ width: '100px', height: '100px', borderRadius: '50%' }} 
              />
              <FontAwesomeIcon 
                icon={faCamera} 
                style={{
                  position: 'absolute', 
                  bottom: '5px', 
                  right: '5px', 
                  backgroundColor: 'white', 
                  borderRadius: '50%', 
                  fontSize: '20px', 
                  padding: '5px', 
                  cursor: 'pointer',
                  border: '2px solid #007BFF',
                }} 
                onClick={() => setIsModalOpen(true)} 
              />
            </div>

              <div className="dashboard-details" style={{ flexDirection: 'column', alignItems: 'flex-start', height: '40px' }}>
                <h5>{employeeData ? `${employeeData.first_name} ${employeeData.last_name}` : 'Loading...'}</h5>
                <h6>{employeeData ? employeeData.job_title : 'Loading...'}</h6>
                <h6>{employeeData ? employeeData.email : 'Loading...'}</h6>
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
        }}
      >
        <input 
          type="file" 
          onChange={handleProfileImageChange} 
          style={{ display: 'none' }} 
          id="profileImageInput" 
          accept="image/*"
        />
        <label 
          htmlFor="profileImageInput"
          style={{ cursor: 'pointer', color: '#007BFF', fontSize: '16px' }}
        >
          Drag and drop or browse files
        </label>
        <p style={{ fontSize: '12px', color: '#6C757D' }}>
          Max 5MB, JPEG, PNG
        </p>
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
          disabled={isSaving} // Disable the button while saving
        >
          {isSaving ? 'Saving...' : 'Save Photo'} {/* Show 'Saving...' while uploading */}
        </button>

      </div>
    </div>
  </div>
)}




            <div className="employee-dashboard-info" style={{ display: 'flex', flexDirection: 'column', marginLeft: '-200px' }}>
              <h1>Working Hours</h1>
              <div className="clock" style={{ display: 'flex', alignItems: 'center', marginTop: '-20px' }}>
                <div className="timer" style={{ width: '100px', height: '38px', padding: '8px', marginTop: '10px', borderRadius: '4px', border: '1px solid #F8F8F8', background: '#D9D9D9' }}>
                  {employeeData ? employeeData.working_hours : 0}
                </div>
                <button style={{ width: '100px' }}> <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" /> Clock Out</button>
              </div>
            </div>
          </div>

          {/* Dashboard Summary */}
          <div className="dashboard-details-1">
            <div className="first-grid">
              <FontAwesomeIcon icon="fa-solid fa-clock" className="dashboard-icon" />
              <div>
                <h6>Attendance</h6>
                <h5>{employeeData ? `${employeeData.attendance || 0}%` : 0}</h5>
              </div>
            </div>

            <div className="first-grid">
              <FontAwesomeIcon icon="fa-solid fa-calendar" className="dashboard-icon" />
              <div>
                <h6>Leave Balance</h6>
                <h5>{employeeData ? `${employeeData.leave_balance || 0} Days` : 0} </h5>
              </div>
            </div>

            <div className="first-grid">
              <FontAwesomeIcon icon="fa-solid fa-calendar" className="dashboard-icon" />
              <div>
                <h6>Net Pay</h6>
                <h5>{employeeData ? `Salary: ${employeeData.net_pay || 0}` : 0}</h5>
              </div>
            </div>

            <div className="first-grid">
              <FontAwesomeIcon icon="fa-solid fa-users" className="dashboard-icon" />
              <div>
                <h6>Overtime Hours</h6>
                <h5>{employeeData ? `${employeeData.overtime_hours || 0} Hours` : 0} </h5>
              </div>
            </div>
          </div>

          {/* Subnav Buttons */}
          <div className="employee-profile-info">
            <div>
              <button
                onClick={() => setActiveSection('personalInfo')}
                className={activeSection === 'personalInfo' ? 'active' : ''}
              >
                <FontAwesomeIcon icon="fa-building" className="icon" />
                Account Setting
              </button>
            </div>
            <div>
              <button
                onClick={() => setActiveSection('compensation')}
                className={activeSection === 'compensation' ? 'active' : ''}
              >
                <FontAwesomeIcon icon="fa-solid fa-money-bill" className="icon" />
                Personal Information
              </button>
            </div>
            <div>
              <button
                onClick={() => setActiveSection('employeeDetails')}
                className={activeSection === 'employeeDetails' ? 'active' : ''}
              >
                <FontAwesomeIcon icon="fa-solid fa-list-check" className="icon" />
                Employment Details
              </button>
            </div>
            <div>
              <button
                onClick={() => setActiveSection('performanceMetrics')}
                className={activeSection === 'performanceMetrics' ? 'active' : ''}
              >
                <FontAwesomeIcon icon="fa-solid fa-chart-simple" className="icon" />
                Compensation
              </button>
            </div>
          </div>

          <div style={{ display: activeSection === 'personalInfo' ? 'block' : 'none' }}>
    <div className="dashboard-detail">
      <div className="header">
        <h1>Account Settings</h1>
      </div>
      <div className="dashboard-details-2-1">
        {/* Email Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ width: '45%' }}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={!editableFields.email} // Make input editable or not
              style={inputStyle}
            />
          </div>
          <div style={{ width: '45%' }}>
            {!editableFields.email ? (
              <button style={editButtonStyle} onClick={() => handleEditClick('email')}>
                Edit
              </button>
            ) : (
              <button style={saveButtonStyle} onClick={handleSaveChanges} disabled={submitting}>
                {submitting ? 'Saving...' : 'Save Changes'}
              </button>
            )}
          </div>
        </div>

        {/* Emergency Contact Name */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ width: '45%' }}>
            <label htmlFor="emergencyContactName">Emergency Contact Name</label>
            <input
              type="text"
              id="emergencyContactName"
              name="emergencyContactName"
              value={formData.emergencyContactName}
              onChange={handleInputChange}
              disabled={!editableFields.emergencyContactName}
              style={inputStyle}
            />
          </div>
          <div style={{ width: '45%' }}>
            {!editableFields.emergencyContactName ? (
              <button style={editButtonStyle} onClick={() => handleEditClick('emergencyContactName')}>
                Edit
              </button>
            ) : (
              <button style={saveButtonStyle} onClick={handleSaveChanges} disabled={submitting}>
                {submitting ? 'Saving...' : 'Save Changes'}
              </button>
            )}
          </div>
        </div>

        {/* Relationship to Employee */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ width: '45%' }}>
            <label htmlFor="relationshipToEmployee">Relationship to Employee</label>
            <input
              type="text"
              id="relationshipToEmployee"
              name="relationshipToEmployee"
              value={formData.relationshipToEmployee}
              onChange={handleInputChange}
              disabled={!editableFields.relationshipToEmployee}
              style={inputStyle}
            />
          </div>
          <div style={{ width: '45%' }}>
            {!editableFields.relationshipToEmployee ? (
              <button style={editButtonStyle} onClick={() => handleEditClick('relationshipToEmployee')}>
                Edit
              </button>
            ) : (
              <button style={saveButtonStyle} onClick={handleSaveChanges} disabled={submitting}>
                {submitting ? 'Saving...' : 'Save Changes'}
              </button>
            )}
          </div>
        </div>

        {/* Emergency Contact Phone Number */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ width: '45%' }}>
            <label htmlFor="emergencyContactPhone">Emergency Contact Phone Number</label>
            <input
              type="text"
              id="emergencyContactPhone"
              name="emergencyContactPhone"
              value={formData.emergencyContactPhone}
              onChange={handleInputChange}
              disabled={!editableFields.emergencyContactPhone}
              style={inputStyle}
            />
          </div>
          <div style={{ width: '45%' }}>
            {!editableFields.emergencyContactPhone ? (
              <button style={editButtonStyle} onClick={() => handleEditClick('emergencyContactPhone')}>
                Edit
              </button>
            ) : (
              <button style={saveButtonStyle} onClick={handleSaveChanges} disabled={submitting}>
                {submitting ? 'Saving...' : 'Save Changes'}
              </button>
            )}
          </div>
        </div>

        {/* Password */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ width: '45%' }}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              disabled={!editableFields.password}
              style={inputStyle}
            />
          </div>
          <div style={{ width: '45%' }}>
            {!editableFields.password ? (
              <button style={editButtonStyle} onClick={() => handleEditClick('password')}>
                Edit
              </button>
            ) : (
              <button style={saveButtonStyle} onClick={handleSaveChanges} disabled={submitting}>
                {submitting ? 'Saving...' : 'Save Changes'}
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  </div>







          {/* Personal Information Section */}
          <div style={{ display: activeSection === 'compensation' ? 'block' : 'none' }}>
            <div className="dashboard-detail">
              <div className="header">
                <h1>Personal Details</h1>
              </div>
              <div className="dashboard-details-2-1">
                <div className="row-1">
                  <div>
                    <h2>Name</h2>
                    <h3>{employeeData ? `${employeeData.first_name} ${employeeData.last_name}` : 'Loading...'}</h3>
                  </div>
                  <div>
                    <h2>Job Title</h2>
                    <h3>{employeeData ? employeeData.job_title : 'Loading...'}</h3>
                  </div>
                  <div>
                    <h2>Email</h2>
                    <h3>{employeeData ? employeeData.email : 'Loading...'}</h3>
                  </div>
                  <div>
                    <h2>Department</h2>
                    <h3>{employeeData ? employeeData.department : 'Loading...'}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Employee Details Section */}
          <div style={{ display: activeSection === 'employeeDetails' ? 'block' : 'none' }}>
            <div className="dashboard-detail">
              <div className="header">
                <h1>Employee Details</h1>
              </div>
              <div className="dashboard-details-2-1">
                <div className="row-1">
                  <div>
                    <h2>Employee ID</h2>
                    <h3>{employeeData ? employeeData.employee_id : 'Loading...'}</h3>
                  </div>
                  <div>
                    <h2>Work Mode</h2>
                    <h3>{employeeData ? employeeData.work_mode : 'Loading...'}</h3>
                  </div>
                  <div>
                    <h2>Work Location</h2>
                    <h3>{employeeData ? employeeData.work_location : 'Loading...'}</h3>
                  </div>
                  <div>
                    <h2>Employment Date</h2>
                    <h3>{employeeData ? new Date(employeeData.employment_date).toDateString() : 'Loading...'}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Compensation Section */}
          <div style={{ display: activeSection === 'performanceMetrics' ? 'block' : 'none' }}>
            <div className="dashboard-detail">
              <div className="header">
                <h1>Compensation</h1>
              </div>
              <div className="dashboard-details-2-1">
                <div className="row-1">
                  <div>
                    <h2>Basic Salary</h2>
                    <h3>{employeeData ? `₦${employeeData.base_salary}` : 'Loading...'}</h3>
                  </div>
                  <div>
                    <h2>Overtime Hours Allowance</h2>
                    <h3>{employeeData ? `₦${employeeData.overtime_hours_allowance}/Hour` : 'Loading...'}</h3>
                  </div>
                  <div>
                    <h2>Deductions</h2>
                    <h3>{employeeData ? `PAYE: ₦${employeeData.paye_deduction}` : 'Loading...'}</h3>
                  </div>
                </div>
                <div className="row-1">
                  <div>
                    <h2>Net Pay</h2>
                    <h3>{employeeData ? `₦${employeeData.net_pay}/month` : 'Loading...'}</h3>
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













// import React, { useState, useEffect } from 'react';
// import Sidebar from '../components/Sidebar';
// import EmployeeNavbar from '../components/EmployeeNavbar.jsx';
// import './EmployeeDashboard.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Test from '../assets/test.png'; // Placeholder image
// import { faCamera } from '@fortawesome/free-solid-svg-icons';
// import axios from 'axios';




// const ProfileDashboard = () => {
//   const [activeSection, setActiveSection] = useState('personalInfo');
//   const [employeeData, setEmployeeData] = useState(null); // To store employee data
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [profileImage, setProfileImage] = useState(null); // For storing selected image preview
//   const [file, setFile] = useState(null); // To store the selected file
//   const [isModalOpen, setIsModalOpen] = useState(false); // To manage modal visibility
//   const [isSaving, setIsSaving] = useState(false); // To track if the image is being uploaded
//   const [submitting, setSubmitting] = useState(false);  // Add this line to manage the submitting state

//   // Fetch employee profile data from the API
//   const fetchEmployeeProfile = async () => {
//     const storedToken = localStorage.getItem('employeeAuthToken');
//     if (!storedToken) {
//       setError('Authentication required');
//       setLoading(false);
//       return;
//     }
  
//     const token = JSON.parse(storedToken).token;
//     if (!token) {
//       setError('Token not found');
//       setLoading(false);
//       return;
//     }
  
//     console.log('Sending request to fetch profile with token:', token);  // Log the token and request details
  
//     try {
//       const response = await fetch('https://proximahr.onrender.com/employee/profile', {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });
  
//       if (!response.ok) {
//         const errorData = await response.json();  // Log the error response
//         console.error('Error fetching employee profile:', errorData);
//         throw new Error(errorData.message || 'Failed to fetch employee data');
//       }
  
//       const data = await response.json();
//       setEmployeeData(data.data);
//     } catch (err) {
//       console.error('Error fetching employee profile:', err.message);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };
  
  

//   // Call fetchEmployeeProfile when component mounts
//   useEffect(() => {
//     fetchEmployeeProfile();
//   }, []); // Empty dependency array ensures this runs only once on component mount

//   const handleProfileImageChange = (event) => {
//     const selectedFile = event.target.files[0];
//     if (selectedFile) {
//       setFile(selectedFile); // Store the selected file
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setProfileImage(reader.result); // Display the selected image in the UI
//       };
//       reader.readAsDataURL(selectedFile);
//     }
//   };

//   const handleImageUpload = async () => {
//     if (!file) {
//       console.error("❌ No file selected");
//       return;
//     }

//     // Validate the file type and size before submitting
//     const validTypes = ['image/jpeg', 'image/png'];
//     if (!validTypes.includes(file.type)) {
//       setError('Invalid file type. Only JPEG and PNG are allowed.');
//       return;
//     }

//     const maxSize = 5 * 1024 * 1024; // 5MB max file size
//     if (file.size > maxSize) {
//       setError('File size exceeds the 5MB limit.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('image_file', file); // Append the selected file to form data

//     setIsSaving(true); // Set the saving state to true to show "Saving..."

//     try {
//       const storedToken = localStorage.getItem('employeeAuthToken');
//       const token = JSON.parse(storedToken).token;
//       const companyId = localStorage.getItem('company_id'); // Get company ID from localStorage or context
      
//       if (!token) {
//         setError('Token not found');
//         return;
//       }

//       if (!companyId) {
//         setError('Company ID not found');
//         return;
//       }

//       const response = await axios.post(`https://proximahr.onrender.com/employee/profile-image-upload?company_id=${companyId}`, formData, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       console.log('✅ Image uploaded successfully:', response.data);

//       setEmployeeData((prevData) => ({
//         ...prevData,
//         profile_image: response.data.profile_image, // Update profile image in the UI
//       }));

//       setIsSaving(false); // Stop saving after upload
//       setIsModalOpen(false); // Close modal after upload
//     } catch (err) {
//       console.error('❌ Error uploading profile image:', err.message);
//       setError('Failed to upload image');
//       setIsSaving(false); // Stop saving if an error occurs
//     }
//   };

//   const handleSaveChanges = async () => {
//     setSubmitting(true);
    
//     const updatedData = {
//       email: formData.email || null,
//       emergency_contact_name: formData.emergencyContactName || null,
//       relationship_to_employee: formData.relationshipToEmployee || null,
//       emergency_contact_phone: formData.emergencyContactPhone || null,
//       password: formData.password || null,
//     };
  
//     try {
//       const storedToken = localStorage.getItem('employeeAuthToken');
//       const token = JSON.parse(storedToken).token;
//       const companyId = localStorage.getItem('company_id');
  
//       if (!token || !companyId) {
//         setError('Missing authentication or company information');
//         return;
//       }
  
//       // Send update request
//       const response = await axios.put(
//         `https://proximahr.onrender.com/employee/update-profile?company_id=${companyId}`,
//         updatedData,
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );
  
//       console.log('Profile updated successfully:', response.data);
  
//       // Add a delay before fetching the updated profile data
//       setTimeout(() => {
//         fetchEmployeeProfile();
//       }, 1000);  // Wait for 1 second before fetching the profile again
  
//       alert('Changes saved successfully!');
//     } catch (error) {
//       console.error('Error updating profile:', error.message);
//       setError('Failed to update profile');
//       setSubmitting(false);
//     }
//   };
  
  
  

//   const [formData, setFormData] = useState({
//     email: employeeData?.email || '',
//     emergencyContactName: employeeData?.emergency_contact_name || '',
//     relationshipToEmployee: employeeData?.relationship_to_employee || '',
//     emergencyContactPhone: employeeData?.emergency_contact_phone || '',
//     password: '',  // Initially empty, can be filled when needed
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,  // Update the specific field in formData
//     }));
//   };

//     const [editableFields, setEditableFields] = useState({
//         email: false,
//         emergencyContactName: false,
//         relationshipToEmployee: false,
//         emergencyContactPhone: false,
//         password: false,
//       });

//     const handleEditClick = (field) => {
//         setEditableFields((prevState) => ({
//           ...prevState,
//           [field]: true,  // Enable editing for the specific field
//         }));
//       };
      
      

//   return (
//     <div>
//       <div className="main-dashboard">
//         <Sidebar />
//         <div className="dashboard">
//           <EmployeeNavbar />

//           <hr className="horizontal" />

//           {/* Employee Profile Section */}
//           <div className="employee-dashboard-info" style={{ display: 'flex', justifyContent: 'space-between', width: '1000px' }}>
//             <div className="profile-info" style={{ display: 'flex', position: 'relative' }}>
//             <div className="profile-image" style={{ position: 'relative' }}>
//               <img 
//                 src={employeeData && employeeData.profile_image ? employeeData.profile_image : profileImage || Test} 
//                 alt="Profile" 
//                 style={{ width: '100px', height: '100px', borderRadius: '50%' }} 
//               />
//               <FontAwesomeIcon 
//                 icon={faCamera} 
//                 style={{
//                   position: 'absolute', 
//                   bottom: '5px', 
//                   right: '5px', 
//                   backgroundColor: 'white', 
//                   borderRadius: '50%', 
//                   fontSize: '20px', 
//                   padding: '5px', 
//                   cursor: 'pointer',
//                   border: '2px solid #007BFF',
//                 }} 
//                 onClick={() => setIsModalOpen(true)} 
//               />
//             </div>

//               <div className="dashboard-details" style={{ flexDirection: 'column', alignItems: 'flex-start', height: '40px' }}>
//                 <h5>{employeeData ? `${employeeData.first_name} ${employeeData.last_name}` : 'Loading...'}</h5>
//                 <h6>{employeeData ? employeeData.job_title : 'Loading...'}</h6>
//                 <h6>{employeeData ? employeeData.email : 'Loading...'}</h6>
//               </div>
//             </div>

//             {isModalOpen && (
//   <div 
//     style={{
//       position: 'fixed',
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       backgroundColor: 'rgba(0, 0, 0, 0.6)',
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       zIndex: 1000,
//     }}
//   >
//     <div 
//       style={{
//         backgroundColor: '#fff',
//         padding: '30px',
//         borderRadius: '10px',
//         textAlign: 'center',
//         width: '400px',
//         boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
//       }}
//     >
//       <h3>Change Profile Photo</h3>
//       <div 
//         style={{
//           border: '2px dashed #D0D0D0',
//           borderRadius: '10px',
//           padding: '30px',
//           marginBottom: '20px',
//           color: '#6C757D',
//         }}
//       >
//         <input 
//           type="file" 
//           onChange={handleProfileImageChange} 
//           style={{ display: 'none' }} 
//           id="profileImageInput" 
//           accept="image/*"
//         />
//         <label 
//           htmlFor="profileImageInput"
//           style={{ cursor: 'pointer', color: '#007BFF', fontSize: '16px' }}
//         >
//           Drag and drop or browse files
//         </label>
//         <p style={{ fontSize: '12px', color: '#6C757D' }}>
//           Max 5MB, JPEG, PNG
//         </p>
//       </div>
//       <div>
//         <button 
//           onClick={() => setIsModalOpen(false)} 
//           style={{
//             backgroundColor: 'gray',
//             color: '#fff',
//             padding: '10px 20px',
//             borderRadius: '5px',
//             marginRight: '10px',
//           }}
//         >
//           Cancel
//         </button>
//         <button 
//           onClick={handleImageUpload} 
//           style={{
//             backgroundColor: '#007BFF', 
//             color: 'white', 
//             padding: '8px 12px', 
//             border: 'none', 
//             borderRadius: '4px', 
//             cursor: 'pointer', 
//             marginLeft: '10px'
//           }}
//           disabled={isSaving} // Disable the button while saving
//         >
//           {isSaving ? 'Saving...' : 'Save Photo'} {/* Show 'Saving...' while uploading */}
//         </button>

//       </div>
//     </div>
//   </div>
// )}




//             <div className="employee-dashboard-info" style={{ display: 'flex', flexDirection: 'column', marginLeft: '-200px' }}>
//               <h1>Working Hours</h1>
//               <div className="clock" style={{ display: 'flex', alignItems: 'center', marginTop: '-20px' }}>
//                 <div className="timer" style={{ width: '100px', height: '38px', padding: '8px', marginTop: '10px', borderRadius: '4px', border: '1px solid #F8F8F8', background: '#D9D9D9' }}>
//                   {employeeData ? employeeData.working_hours : 0}
//                 </div>
//                 <button style={{ width: '100px' }}> <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" /> Clock Out</button>
//               </div>
//             </div>
//           </div>

//           {/* Dashboard Summary */}
//           <div className="dashboard-details-1">
//             <div className="first-grid">
//               <FontAwesomeIcon icon="fa-solid fa-clock" className="dashboard-icon" />
//               <div>
//                 <h6>Attendance</h6>
//                 <h5>{employeeData ? `${employeeData.attendance || 0}%` : 0}</h5>
//               </div>
//             </div>

//             <div className="first-grid">
//               <FontAwesomeIcon icon="fa-solid fa-calendar" className="dashboard-icon" />
//               <div>
//                 <h6>Leave Balance</h6>
//                 <h5>{employeeData ? `${employeeData.leave_balance || 0} Days` : 0} </h5>
//               </div>
//             </div>

//             <div className="first-grid">
//               <FontAwesomeIcon icon="fa-solid fa-calendar" className="dashboard-icon" />
//               <div>
//                 <h6>Net Pay</h6>
//                 <h5>{employeeData ? `Salary: ${employeeData.net_pay || 0}` : 0}</h5>
//               </div>
//             </div>

//             <div className="first-grid">
//               <FontAwesomeIcon icon="fa-solid fa-users" className="dashboard-icon" />
//               <div>
//                 <h6>Overtime Hours</h6>
//                 <h5>{employeeData ? `${employeeData.overtime_hours || 0} Hours` : 0} </h5>
//               </div>
//             </div>
//           </div>

//           {/* Subnav Buttons */}
//           <div className="employee-profile-info">
//             <div>
//               <button
//                 onClick={() => setActiveSection('personalInfo')}
//                 className={activeSection === 'personalInfo' ? 'active' : ''}
//               >
//                 <FontAwesomeIcon icon="fa-building" className="icon" />
//                 Account Setting
//               </button>
//             </div>
//             <div>
//               <button
//                 onClick={() => setActiveSection('compensation')}
//                 className={activeSection === 'compensation' ? 'active' : ''}
//               >
//                 <FontAwesomeIcon icon="fa-solid fa-money-bill" className="icon" />
//                 Personal Information
//               </button>
//             </div>
//             <div>
//               <button
//                 onClick={() => setActiveSection('employeeDetails')}
//                 className={activeSection === 'employeeDetails' ? 'active' : ''}
//               >
//                 <FontAwesomeIcon icon="fa-solid fa-list-check" className="icon" />
//                 Employment Details
//               </button>
//             </div>
//             <div>
//               <button
//                 onClick={() => setActiveSection('performanceMetrics')}
//                 className={activeSection === 'performanceMetrics' ? 'active' : ''}
//               >
//                 <FontAwesomeIcon icon="fa-solid fa-chart-simple" className="icon" />
//                 Compensation
//               </button>
//             </div>
//           </div>

//           <div style={{ display: activeSection === 'personalInfo' ? 'block' : 'none' }}>
//     <div className="dashboard-detail">
//       <div className="header">
//         <h1>Account Settings</h1>
//       </div>
//       <div className="dashboard-details-2-1">
//         {/* Email Section */}
//         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
//           <div style={{ width: '45%' }}>
//             <label htmlFor="email">Email</label>
//             <input
//               type="text"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               disabled={!editableFields.email} // Make input editable or not
//               style={inputStyle}
//             />
//           </div>
//           <div style={{ width: '45%' }}>
//             {!editableFields.email ? (
//               <button style={editButtonStyle} onClick={() => handleEditClick('email')}>
//                 Edit
//               </button>
//             ) : (
//               <button style={saveButtonStyle} onClick={handleSaveChanges} disabled={submitting}>
//                 {submitting ? 'Saving...' : 'Save Changes'}
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Emergency Contact Name */}
//         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
//           <div style={{ width: '45%' }}>
//             <label htmlFor="emergencyContactName">Emergency Contact Name</label>
//             <input
//               type="text"
//               id="emergencyContactName"
//               name="emergencyContactName"
//               value={formData.emergencyContactName}
//               onChange={handleInputChange}
//               disabled={!editableFields.emergencyContactName}
//               style={inputStyle}
//             />
//           </div>
//           <div style={{ width: '45%' }}>
//             {!editableFields.emergencyContactName ? (
//               <button style={editButtonStyle} onClick={() => handleEditClick('emergencyContactName')}>
//                 Edit
//               </button>
//             ) : (
//               <button style={saveButtonStyle} onClick={handleSaveChanges} disabled={submitting}>
//                 {submitting ? 'Saving...' : 'Save Changes'}
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Relationship to Employee */}
//         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
//           <div style={{ width: '45%' }}>
//             <label htmlFor="relationshipToEmployee">Relationship to Employee</label>
//             <input
//               type="text"
//               id="relationshipToEmployee"
//               name="relationshipToEmployee"
//               value={formData.relationshipToEmployee}
//               onChange={handleInputChange}
//               disabled={!editableFields.relationshipToEmployee}
//               style={inputStyle}
//             />
//           </div>
//           <div style={{ width: '45%' }}>
//             {!editableFields.relationshipToEmployee ? (
//               <button style={editButtonStyle} onClick={() => handleEditClick('relationshipToEmployee')}>
//                 Edit
//               </button>
//             ) : (
//               <button style={saveButtonStyle} onClick={handleSaveChanges} disabled={submitting}>
//                 {submitting ? 'Saving...' : 'Save Changes'}
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Emergency Contact Phone Number */}
//         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
//           <div style={{ width: '45%' }}>
//             <label htmlFor="emergencyContactPhone">Emergency Contact Phone Number</label>
//             <input
//               type="text"
//               id="emergencyContactPhone"
//               name="emergencyContactPhone"
//               value={formData.emergencyContactPhone}
//               onChange={handleInputChange}
//               disabled={!editableFields.emergencyContactPhone}
//               style={inputStyle}
//             />
//           </div>
//           <div style={{ width: '45%' }}>
//             {!editableFields.emergencyContactPhone ? (
//               <button style={editButtonStyle} onClick={() => handleEditClick('emergencyContactPhone')}>
//                 Edit
//               </button>
//             ) : (
//               <button style={saveButtonStyle} onClick={handleSaveChanges} disabled={submitting}>
//                 {submitting ? 'Saving...' : 'Save Changes'}
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Password */}
//         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
//           <div style={{ width: '45%' }}>
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleInputChange}
//               disabled={!editableFields.password}
//               style={inputStyle}
//             />
//           </div>
//           <div style={{ width: '45%' }}>
//             {!editableFields.password ? (
//               <button style={editButtonStyle} onClick={() => handleEditClick('password')}>
//                 Edit
//               </button>
//             ) : (
//               <button style={saveButtonStyle} onClick={handleSaveChanges} disabled={submitting}>
//                 {submitting ? 'Saving...' : 'Save Changes'}
//               </button>
//             )}
//           </div>
//         </div>

//       </div>
//     </div>
//   </div>







//           {/* Personal Information Section */}
//           <div style={{ display: activeSection === 'compensation' ? 'block' : 'none' }}>
//             <div className="dashboard-detail">
//               <div className="header">
//                 <h1>Personal Details</h1>
//               </div>
//               <div className="dashboard-details-2-1">
//                 <div className="row-1">
//                   <div>
//                     <h2>Name</h2>
//                     <h3>{employeeData ? `${employeeData.first_name} ${employeeData.last_name}` : 'Loading...'}</h3>
//                   </div>
//                   <div>
//                     <h2>Job Title</h2>
//                     <h3>{employeeData ? employeeData.job_title : 'Loading...'}</h3>
//                   </div>
//                   <div>
//                     <h2>Email</h2>
//                     <h3>{employeeData ? employeeData.email : 'Loading...'}</h3>
//                   </div>
//                   <div>
//                     <h2>Department</h2>
//                     <h3>{employeeData ? employeeData.department : 'Loading...'}</h3>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Employee Details Section */}
//           <div style={{ display: activeSection === 'employeeDetails' ? 'block' : 'none' }}>
//             <div className="dashboard-detail">
//               <div className="header">
//                 <h1>Employee Details</h1>
//               </div>
//               <div className="dashboard-details-2-1">
//                 <div className="row-1">
//                   <div>
//                     <h2>Employee ID</h2>
//                     <h3>{employeeData ? employeeData.employee_id : 'Loading...'}</h3>
//                   </div>
//                   <div>
//                     <h2>Work Mode</h2>
//                     <h3>{employeeData ? employeeData.work_mode : 'Loading...'}</h3>
//                   </div>
//                   <div>
//                     <h2>Work Location</h2>
//                     <h3>{employeeData ? employeeData.work_location : 'Loading...'}</h3>
//                   </div>
//                   <div>
//                     <h2>Employment Date</h2>
//                     <h3>{employeeData ? new Date(employeeData.employment_date).toDateString() : 'Loading...'}</h3>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Compensation Section */}
//           <div style={{ display: activeSection === 'performanceMetrics' ? 'block' : 'none' }}>
//             <div className="dashboard-detail">
//               <div className="header">
//                 <h1>Compensation</h1>
//               </div>
//               <div className="dashboard-details-2-1">
//                 <div className="row-1">
//                   <div>
//                     <h2>Basic Salary</h2>
//                     <h3>{employeeData ? `₦${employeeData.base_salary}` : 'Loading...'}</h3>
//                   </div>
//                   <div>
//                     <h2>Overtime Hours Allowance</h2>
//                     <h3>{employeeData ? `₦${employeeData.overtime_hours_allowance}/Hour` : 'Loading...'}</h3>
//                   </div>
//                   <div>
//                     <h2>Deductions</h2>
//                     <h3>{employeeData ? `PAYE: ₦${employeeData.paye_deduction}` : 'Loading...'}</h3>
//                   </div>
//                 </div>
//                 <div className="row-1">
//                   <div>
//                     <h2>Net Pay</h2>
//                     <h3>{employeeData ? `₦${employeeData.net_pay}/month` : 'Loading...'}</h3>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileDashboard;

// // Styles
// const inputStyle = {
//   width: '100%',
//   padding: '10px',
//   borderRadius: '8px',
//   border: '1px solid #D9D9D9',
//   backgroundColor: '#f8f8f8',
//   fontSize: '14px',
// };

// const editButtonStyle = {
//   backgroundColor: '#007bff',
//   color: '#fff',
//   border: 'none',
//   padding: '8px 15px',
//   borderRadius: '4px',
//   cursor: 'pointer',
//   fontSize: '14px',
//   marginTop: '20px'
// };

// const saveButtonStyle = {
//   backgroundColor: '#28a745', // Green color for save button
//   color: '#fff',
//   border: 'none',
//   padding: '8px 15px',
//   borderRadius: '4px',
//   cursor: 'pointer',
//   fontSize: '14px',
//   marginTop: '20px',
// };
