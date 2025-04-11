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

library.add(fas);

const Profile = () => {
  const [activeSection, setActiveSection] = useState('personalInfo');
  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const selectedEmployeeId = localStorage.getItem('selectedEmployee_id');
  const companyId = localStorage.getItem('company_id');

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
      if (!selectedEmployeeId || !companyId || !accessToken) {
        console.error('Missing required authentication details:', { selectedEmployeeId, companyId, accessToken });
        setError('Missing required authentication details');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `https://proximahr.onrender.com/api/v2/employee-management/${selectedEmployeeId}/employee`,
          {
            params: { company_id: companyId },
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
  }, [selectedEmployeeId, companyId, accessToken]);

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
          </div>
          <hr className="horizontal" />
          <div className="dashboard-detail-1">
            <Link to={"/employee-managment"}>
              <h1 className="employee-profile">
                <FontAwesomeIcon icon="fa-solid fa-arrow-left" className="left-arrow" /> Employee Profile
              </h1>
            </Link>
            <h6>{new Date().toDateString()}</h6>
          </div>

          {loading ? (
            <p>Loading employee details...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : (
            <>
              <div className="number-of-employee">
                <div className="div-one">
                  <div className="div1-1">
                    <img src={employeeData?.profile_image || test} alt="Profile" className="My-profile" />
                  </div>
                  <div className="div1-2">
                    <h1>{employeeData?.first_name} {employeeData?.last_name}</h1>
                    <h2>{employeeData?.job_title}</h2>
                    <h2>{employeeData?.email}</h2>
                    <h2>{employeeData?.phone_number}</h2>
                    <h2>{employeeData?.home_address}</h2>
                  </div>
                  <div className="div1-3">
                    <div className="btn-4">
                      <button>{employeeData?.employment_status}</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="employee-profile-info">
                <button onClick={() => setActiveSection('personalInfo')}>Personal Information</button>
                <button onClick={() => setActiveSection('compensation')}>Compensation</button>
                <button onClick={() => setActiveSection('employeeDetails')}>Employment Details</button>
                <button onClick={() => setActiveSection('performanceMetrics')}>Performance Metrics</button>
                <button onClick={() => setActiveSection('attendanceLeave')}>Attendance & Leave</button>
              </div>

              {activeSection === 'personalInfo' && (
                <div>
                  <h1>Personal Information</h1>
                  <p>Full Name: {employeeData?.first_name} {employeeData?.last_name}</p>
                  <p>Date of Birth: {employeeData?.date_of_birth}</p>
                  <p>Gender: {employeeData?.gender}</p>
                  <p>Phone: {employeeData?.phone_number}</p>
                  <p>Address: {employeeData?.home_address}</p>
                </div>
              )}

              {activeSection === 'compensation' && (
                <div>
                  <h1>Compensation</h1>
                  <p>Base Salary: {employeeData?.base_salary}</p>
                  <p>Bonuses: {employeeData?.bonuses}</p>
                  <p>Allowances: {employeeData?.allowances}</p>
                  <p>Deductions: {employeeData?.deductions}</p>
                </div>
              )}

              {activeSection === 'employeeDetails' && (
                <div>
                  <h1>Employee Details</h1>
                  <p>Employee ID: {employeeData?.employee_id}</p>
                  <p>Department: {employeeData?.department}</p>
                  <p>Employment Date: {employeeData?.employment_date}</p>
                  <p>Work Mode: {employeeData?.work_mode}</p>
                </div>
              )}

              {activeSection === 'performanceMetrics' && (
                <div>
                  <h1>Performance Metrics</h1>
                  <p>Attendance Rate: {employeeData?.attendance_rate}</p>
                  <p>Overtime Hours: {employeeData?.overtime_hours}</p>
                  <p>Late Check-ins: {employeeData?.late_checkins}</p>
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


// import React, { useState, useEffect } from 'react';
// import Sidebar from '../components/Sidebar';
// import test from '../assets/test.png';
// import '../pages/profile.css';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fas } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Link } from 'react-router-dom';
// import AttendanceLeaveOverview from '../components/AttendanceLeaveOverview';
// import axios from 'axios';

// library.add(fas);

// const Profile = () => {
//   const [activeSection, setActiveSection] = useState('personalInfo');
//   const [employeeData, setEmployeeData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const selectedEmployeeId = localStorage.getItem('selectedEmployee_id');
//   const companyId = localStorage.getItem('company_id');

//   let accessToken = null;
//   try {
//     const authData = JSON.parse(localStorage.getItem('authData'));
//     if (authData && authData.token) {
//       accessToken = authData.token;
//     }
//   } catch (err) {
//     console.error('Error parsing authData from local storage', err);
//   }

//   useEffect(() => {
//     const fetchEmployeeData = async () => {
//       if (!selectedEmployeeId || !companyId || !accessToken) {
//         console.error('Missing required authentication details:', { selectedEmployeeId, companyId, accessToken });
//         setError('Missing required authentication details');
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await axios.get(
//           `https://proximahr.onrender.com/employee-management/${selectedEmployeeId}/employee`,
//           {
//             params: { company_id: companyId },
//             headers: { Authorization: `Bearer ${accessToken}` },
//           }
//         );
//         console.log('API Response:', response.data);
//         setEmployeeData(response.data.data);
//         setLoading(false);
//       } catch (err) {
//         console.error('API request failed:', err.response ? err.response.data : err.message);
//         setError('Failed to fetch employee details');
//         setLoading(false);
//       }
//     };

//     fetchEmployeeData();
//   }, [selectedEmployeeId, companyId, accessToken]);

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
//           </div>
//           <hr className="horizontal" />
//           <div className="dashboard-detail-1">
//             <Link to={"/employee-managment"}>
//               <h1 className="employee-profile">
//                 <FontAwesomeIcon icon="fa-solid fa-arrow-left" className="left-arrow" /> Employee Profile
//               </h1>
//             </Link>
//             <h6>{new Date().toDateString()}</h6>
//           </div>

//           {loading ? (
//             <p>Loading employee details...</p>
//           ) : error ? (
//             <p className="error-message">{error}</p>
//           ) : (
//             <>
//               <div className="number-of-employee">
//                 <div className="div-one">
//                   <div className="div1-1">
//                     <img src={employeeData?.profile_image || test} alt="Profile" className="My-profile" />
//                   </div>
//                   <div className="div1-2">
//                     <h1>{employeeData?.first_name} {employeeData?.last_name}</h1>
//                     <h2>{employeeData?.job_title}</h2>
//                     <h3>{employeeData?.email}</h3>
//                     <h3>{employeeData?.phone_number}</h3>
//                     <h3>{employeeData?.home_address}</h3>
//                   </div>
//                   <div className="div1-3">
//                     <div className="btn-4">
//                       <button>{employeeData?.employment_status}</button>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="employee-profile-info">
//                 <button onClick={() => setActiveSection('personalInfo')}>Personal Information</button>
//                 <button onClick={() => setActiveSection('compensation')}>Compensation</button>
//                 <button onClick={() => setActiveSection('employeeDetails')}>Employment Details</button>
//                 <button onClick={() => setActiveSection('performanceMetrics')}>Performance Metrics</button>
//                 <button onClick={() => setActiveSection('attendanceLeave')}>Attendance & Leave</button>
//               </div>

//               {activeSection === 'personalInfo' && (
//                 <div>
//                   <h1>Personal Information</h1>
//                   <p>Full Name: {employeeData?.first_name} {employeeData?.last_name}</p>
//                   <p>Date of Birth: {employeeData?.date_of_birth}</p>
//                   <p>Gender: {employeeData?.gender}</p>
//                   <p>Phone: {employeeData?.phone_number}</p>
//                   <p>Address: {employeeData?.home_address}</p>
//                 </div>
//               )}

//               {activeSection === 'attendanceLeave' && <AttendanceLeaveOverview />}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
