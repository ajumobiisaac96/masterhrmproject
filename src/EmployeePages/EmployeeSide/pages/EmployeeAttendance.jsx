// import React from 'react';
// import Sidebar from '../components/Sidebar'
// import EmployeeNavbar from '../components/EmployeeNavbar.jsx'
// import './EmployeeDashboard.css'
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fas} from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import AttendanceTable from '../components/AttendanceTable.jsx';
// import Pagination from '../components/Pagination.jsx';

// library.add(fas);

// const EmployeeAttendance = () => {
//   return (
//     <div>
//             <div className="main-dashboard">
//                 <Sidebar/>
//                 <div className="dashboard">
                
//                 <EmployeeNavbar/>

//                 <hr className="horizontal" />

//                 <div className="employee-dashboard-info" style={{display:'flex'}}>
//                     <div className="dashboard-details" style={{flexDirection:'column', alignItems:'flex-start', height:'40px'}}>
//                     <h5>Attendance & Tracking</h5>
//                     <h6>24 Thursday October 2024</h6>
//                     </div>
//                     <div className="employee-dashboard-info" style={{display:'flex', flexDirection:'column'}}>
//                     <h1>Working Hours</h1>
//                     <div className="clock" style={{display:'flex', alignItems:'center', marginTop:'-20px'}} >
//                         <div className="timer" 
//                         style={{
//                         width: '100px',
//                             height: '38px',
//                             padding: '8px',
//                             marginTop:'10px',
//                             borderRadius: '4px',
//                             border: '1px solid #F8F8F8',
//                             background:'#D9D9D9'
//                         }}>00:00:00</div>
//                         <button style={{width:'100px'}}> <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" />Clock Out</button>
//                     </div>
//                     </div>
//                 </div>


//                 <div className="dashboard-details-1" style={{marginBottom:'30px'}}>
//                     <div className="first-grid">
//                     <FontAwesomeIcon icon="fa-solid fa-clock" className="dashboard-icon"/>
//                     <div>
//                         <h6>Present Days</h6>
//                         <h5>30 Days</h5>
//                     </div>
//                     </div>

//                     <div className="first-grid">
//                     <FontAwesomeIcon icon="fa-solid fa-calendar" className="dashboard-icon" />
//                     <div>
//                         <h6>Absent Days</h6>
//                         <h5>1 Day</h5>
//                     </div>
//                     </div>

//                     <div className="first-grid">
//                     <FontAwesomeIcon icon="fa-solid fa-calendar" className="dashboard-icon" />
//                     <div>
//                         <h6>Overtime Hours</h6>
//                         <h5>15 Hours</h5>
//                     </div>
//                     </div>

//                     <div className="first-grid">
//                     <FontAwesomeIcon icon="fa-solid fa-users" className="dashboard-icon" />
//                     <div>
//                         <h6>Undertime Hours</h6>
//                         <h5>02 Hours</h5>
//                     </div>
//                     </div>
//                 </div>

//                 <AttendanceTable/>

//                 <Pagination/>


//             </div>



//             </div>
//     </div>
//   )
// }

// export default EmployeeAttendance















// import React, { useState, useEffect } from 'react';
// import Sidebar from '../components/Sidebar';
// import EmployeeNavbar from '../components/EmployeeNavbar.jsx';
// import './EmployeeDashboard.css';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fas } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import AttendanceTable from '../components/AttendanceTable.jsx';
// import Pagination from '../components/Pagination.jsx';

// library.add(fas);

// const EmployeeAttendance = () => {
//   const currentYear = new Date().getFullYear();
//   const currentMonth = new Date().getMonth() + 1;

//   const [selectedYear, setSelectedYear] = useState(currentYear);
//   const [selectedMonth, setSelectedMonth] = useState(currentMonth);
//   const [token, setToken] = useState(null);
//   const [attendanceTotals, setAttendanceTotals] = useState({
//     presentDays: 0,
//     absentDays: 0,
//     overtimeHours: 0,
//     undertimeHours: 0,
//   });

//   const [attendanceData, setAttendanceData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch token on mount
//   useEffect(() => {
//     const authData = JSON.parse(localStorage.getItem('employeeAuthToken'));
//     const fetchedToken = authData?.token;
//     setToken(fetchedToken);
//   }, []);

//   // Fetch attendance summary and daily attendance details when year/month changes
//   useEffect(() => {
//     if (token) {
//       const fetchAttendance = async () => {
//         try {
//           // Fetch the attendance summary
//           const response = await fetch(
//             `https://proximahr.onrender.com/attendance/employee/attendance-totals?year=${selectedYear}&month=${selectedMonth}`,
//             {
//               headers: {
//                 'Authorization': `Bearer ${token}`,
//               },
//             }
//           );
//           const data = await response.json();
//           setAttendanceTotals({
//             presentDays: data.presentDays,
//             absentDays: data.absentDays,
//             overtimeHours: data.overtimeHours,
//             undertimeHours: data.undertimeHours,
//           });

//           // Fetch the daily attendance records
//           const dailyResponse = await fetch(
//             `https://proximahr.onrender.com/attendance/employee/attendance-tracking?year=${selectedYear}&month=${selectedMonth}`,
//             {
//               headers: {
//                 'Authorization': `Bearer ${token}`,
//               },
//             }
//           );
//           const dailyData = await dailyResponse.json();
//           setAttendanceData(dailyData);

//           setLoading(false);
//         } catch (error) {
//           console.error('Error fetching data:', error);
//           setLoading(false);
//         }
//       };

//       fetchAttendance();
//     }
//   }, [selectedYear, selectedMonth, token]);

//   const handleYearChange = (event) => setSelectedYear(event.target.value);
//   const handleMonthChange = (event) => setSelectedMonth(event.target.value);

//   if (!token) {
//     return <div>Loading...</div>; // Show loading message if token is not available
//   }

//   return (
//     <div>
//       <div className="main-dashboard">
//         <Sidebar />
//         <div className="dashboard">
//           <EmployeeNavbar />
//           <hr className="horizontal" />

//           {/* Attendance Header */}
//           <div className="employee-dashboard-info" style={{ display: 'flex' }}>
//             <div className="dashboard-details" style={{ flexDirection: 'column', alignItems: 'flex-start', height: '40px' }}>
//               <h5>Attendance & Tracking</h5>
//               <h6>{`${new Date().getDate()} ${new Date().toLocaleString('default', { month: 'long' })} ${new Date().getFullYear()}`}</h6>
//             </div>
//           </div>

//           {/* Attendance Cards */}
//           <div className="dashboard-details-1" style={{ marginBottom: '30px' }}>
//             <div className="first-grid">
//               <FontAwesomeIcon icon="fa-solid fa-check-circle" className="dashboard-icon" style={{ color: '#22C55E' }} />
//               <div>
//                 <h6>Present Days</h6>
//                 <h5>{loading ? 'Loading...' : attendanceTotals.presentDays} Days</h5>
//               </div>
//             </div>

//             <div className="first-grid">
//               <FontAwesomeIcon icon="fa-solid fa-calendar-xmark" className="dashboard-icon" style={{ color: '#dc3545' }} />
//               <div>
//                 <h6>Absent Days</h6>
//                 <h5>{loading ? 'Loading...' : attendanceTotals.absentDays} Day</h5>
//               </div>
//             </div>

//             <div className="first-grid">
//               <FontAwesomeIcon icon="fa-solid fa-clock" className="dashboard-icon" style={{ color: '#6F42C1' }} />
//               <div>
//                 <h6>Overtime Hours</h6>
//                 <h5>{loading ? 'Loading...' : attendanceTotals.overtimeHours} Hours</h5>
//               </div>
//             </div>

//             <div className="first-grid">
//               <FontAwesomeIcon icon="fa-solid fa-hourglass-end" className="dashboard-icon" style={{ color: '#FFD700' }} />
//               <div>
//                 <h6>Undertime Hours</h6>
//                 <h5>{loading ? 'Loading...' : attendanceTotals.undertimeHours} Hours</h5>
//               </div>
//             </div>
//           </div>

//           {/* Date Picker */}
//           <div style={{ display: 'flex', marginBottom: '20px' }}>
//             <div>
//               <label htmlFor="year">Year:</label>
//               <select id="year" value={selectedYear} onChange={handleYearChange}>
//                 <option value={currentYear - 1}>{currentYear - 1}</option>
//                 <option value={currentYear}>{currentYear}</option>
//                 <option value={currentYear + 1}>{currentYear + 1}</option>
//               </select>
//             </div>
//             <div>
//               <label htmlFor="month">Month:</label>
//               <select id="month" value={selectedMonth} onChange={handleMonthChange}>
//                 {Array.from({ length: 12 }, (_, index) => (
//                   <option key={index} value={index + 1}>
//                     {new Date(0, index).toLocaleString('default', { month: 'long' })}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* Attendance Table */}
//           <AttendanceTable year={selectedYear} month={selectedMonth} token={token} />

//           <Pagination />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeAttendance;
























// import React, { useState, useEffect } from 'react';
// import Sidebar from '../components/Sidebar';
// import EmployeeNavbar from '../components/EmployeeNavbar.jsx';
// import './EmployeeDashboard.css';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fas } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import AttendanceTable from '../components/AttendanceTable.jsx';
// import Pagination from '../components/Pagination.jsx';

// library.add(fas);

// const EmployeeAttendance = () => {
//   const currentYear = new Date().getFullYear();
//   const currentMonth = new Date().getMonth() + 1;

//   const [selectedYear, setSelectedYear] = useState(currentYear);
//   const [selectedMonth, setSelectedMonth] = useState(currentMonth);
//   const [token, setToken] = useState(null);
//   const [attendanceTotals, setAttendanceTotals] = useState({
//     presentDays: 0,
//     absentDays: 0,
//     overtimeHours: 0,
//     undertimeHours: 0,
//   });

//   const [attendanceData, setAttendanceData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState('all'); // 'all', 'present', 'absent', etc.
//   const [searchQuery, setSearchQuery] = useState("");

//   // Fetch token on mount
//   useEffect(() => {
//     const authData = JSON.parse(localStorage.getItem('employeeAuthToken'));
//     const fetchedToken = authData?.token;
//     setToken(fetchedToken);
//   }, []);

//   // Fetch attendance summary and daily attendance details when year/month changes
//   useEffect(() => {
//     if (token) {
//       const fetchAttendance = async () => {
//         try {
//           // Fetch the attendance summary
//           const response = await fetch(
//             `https://proximahr.onrender.com/attendance/employee/attendance-totals?year=${selectedYear}&month=${selectedMonth}`,
//             {
//               headers: {
//                 'Authorization': `Bearer ${token}`,
//               },
//             }
//           );
//           const data = await response.json();
//           console.log('Attendance Summary API Response:', data); // Log the API response for attendance summary
//           setAttendanceTotals({
//             presentDays: data.total_present_days,
//             absentDays: data.total_absent_days,
//             overtimeHours: data.total_overtime_hours,
//             undertimeHours: data.total_undertime_hours,
//           });

//           // Fetch the daily attendance records
//           const dailyResponse = await fetch(
//             `https://proximahr.onrender.com/attendance/employee/attendance-tracking?year=${selectedYear}&month=${selectedMonth}`,
//             {
//               headers: {
//                 'Authorization': `Bearer ${token}`,
//               },
//             }
//           );
//           const dailyData = await dailyResponse.json();
//           console.log('Daily Attendance API Response:', dailyData); // Log the API response for daily attendance
//           setAttendanceData(dailyData);

//           setLoading(false);
//         } catch (error) {
//           console.error('Error fetching data:', error);
//           setLoading(false);
//         }
//       };

//       fetchAttendance();
//     }
//   }, [selectedYear, selectedMonth, token]);

//   const handleYearChange = (event) => setSelectedYear(event.target.value);
//   const handleMonthChange = (event) => setSelectedMonth(event.target.value);

//   const handleSearchChange = (e) => setSearchQuery(e.target.value.toLowerCase());

//   const handleFilterChange = (status) => setFilter(status);

//   const filteredData = attendanceData.filter((record) => {
//     const matchesFilter = filter === 'all' || record.status === filter;
//     const matchesSearch = record.date.toLowerCase().includes(searchQuery);
//     return matchesFilter && matchesSearch;
//   });

//   if (!token) {
//     return <div>Loading...</div>; // Show loading message if token is not available
//   }

//   return (
//     <div>
//       <div className="main-dashboard">
//         <Sidebar />
//         <div className="dashboard">
//           <EmployeeNavbar />
//           <hr className="horizontal" />

//           {/* Attendance Header */}
//           <div className="employee-dashboard-info" style={{ display: 'flex' }}>
//             <div className="dashboard-details" style={{ flexDirection: 'column', alignItems: 'flex-start', height: '40px' }}>
//               <h5>Attendance & Tracking</h5>
//               <h6>{`${new Date().getDate()} ${new Date().toLocaleString('default', { month: 'long' })} ${new Date().getFullYear()}`}</h6>
//             </div>
//           </div>

//           {/* Attendance Cards */}
//           <div className="dashboard-details-1" style={{ marginBottom: '30px' }}>
//             <div className="first-grid">
//               <FontAwesomeIcon icon="fa-solid fa-check-circle" className="dashboard-icon" style={{ color: '#22C55E' }} />
//               <div>
//                 <h6>Present Days</h6>
//                 <h5>{loading ? 'Loading...' : attendanceTotals.presentDays} Days</h5>
//               </div>
//             </div>

//             <div className="first-grid">
//               <FontAwesomeIcon icon="fa-solid fa-calendar-xmark" className="dashboard-icon" style={{ color: '#dc3545' }} />
//               <div>
//                 <h6>Absent Days</h6>
//                 <h5>{loading ? 'Loading...' : attendanceTotals.absentDays} Days</h5>
//               </div>
//             </div>

//             <div className="first-grid">
//               <FontAwesomeIcon icon="fa-solid fa-clock" className="dashboard-icon" style={{ color: '#6F42C1' }} />
//               <div>
//                 <h6>Overtime Hours</h6>
//                 <h5>{loading ? 'Loading...' : attendanceTotals.overtimeHours} Hours</h5>
//               </div>
//             </div>

//             <div className="first-grid">
//               <FontAwesomeIcon icon="fa-solid fa-hourglass-end" className="dashboard-icon" style={{ color: '#FFD700' }} />
//               <div>
//                 <h6>Undertime Hours</h6>
//                 <h5>{loading ? 'Loading...' : attendanceTotals.undertimeHours} Hours</h5>
//               </div>
//             </div>
//           </div>

//           {/* Date Picker */}
//           <div style={{ display: 'flex', marginBottom: '20px' }}>
//             <div>
//               <label htmlFor="year">Year:</label>
//               <select id="year" value={selectedYear} onChange={handleYearChange}>
//                 <option value={currentYear - 1}>{currentYear - 1}</option>
//                 <option value={currentYear}>{currentYear}</option>
//                 <option value={currentYear + 1}>{currentYear + 1}</option>
//               </select>
//             </div>
//             <div>
//               <label htmlFor="month">Month:</label>
//               <select id="month" value={selectedMonth} onChange={handleMonthChange}>
//                 {Array.from({ length: 12 }, (_, index) => (
//                   <option key={index} value={index + 1}>
//                     {new Date(0, index).toLocaleString('default', { month: 'long' })}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* Search & Filter */}
//           <div style={{ display: 'flex', marginBottom: '20px' }}>
//             <div style={{ marginRight: '10px' }}>
//               <input
//                 type="text"
//                 placeholder="Search by Date"
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//               />
//             </div>
//             <div>
//               <select onChange={(e) => handleFilterChange(e.target.value)} value={filter}>
//                 <option value="all">All</option>
//                 <option value="present">Present</option>
//                 <option value="absent">Absent</option>
//               </select>
//             </div>
//           </div>

//           {/* Attendance Table */}
//           <AttendanceTable year={selectedYear} month={selectedMonth} token={token} filteredData={filteredData} />

//           <Pagination />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeAttendance;
















import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import EmployeeNavbar from '../components/EmployeeNavbar.jsx';
import './EmployeeDashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import AttendanceTable from '../components/AttendanceTable.jsx';
import Pagination from '../components/Pagination.jsx';

const EmployeeAttendance = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [token, setToken] = useState(null);
  const [attendanceTotals, setAttendanceTotals] = useState({
    presentDays: 0,
    absentDays: 0,
    overtimeHours: 0,
    undertimeHours: 0,
  });

  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'present', 'absent', etc.
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch token on mount
  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem('employeeAuthToken'));
    const fetchedToken = authData?.token;
    setToken(fetchedToken);
  }, []);

  // Fetch attendance summary and daily attendance details when year/month changes
  useEffect(() => {
    if (token) {
      const fetchAttendance = async () => {
        try {
          // Fetch the attendance summary
          const response = await fetch(
            `https://proximahr.onrender.com/attendance/employee/attendance-totals?year=${selectedYear}&month=${selectedMonth}`,
            {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            }
          );
          const data = await response.json();
          console.log('Attendance Summary API Response:', data); // Log the API response for attendance summary
          setAttendanceTotals({
            presentDays: data.total_present_days,
            absentDays: data.total_absent_days,
            overtimeHours: data.total_overtime_hours,
            undertimeHours: data.total_undertime_hours,
          });

          // Fetch the daily attendance records
          const dailyResponse = await fetch(
            `https://proximahr.onrender.com/attendance/employee/attendance-tracking?year=${selectedYear}&month=${selectedMonth}`,
            {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            }
          );
          const dailyData = await dailyResponse.json();
          console.log('Daily Attendance API Response:', dailyData); // Log the API response for daily attendance
          setAttendanceData(dailyData);

          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      };

      fetchAttendance();
    }
  }, [selectedYear, selectedMonth, token]);

  const handleYearChange = (event) => setSelectedYear(event.target.value);
  const handleMonthChange = (event) => setSelectedMonth(event.target.value);

  const handleSearchChange = (e) => setSearchQuery(e.target.value.toLowerCase());

  const handleFilterChange = (status) => setFilter(status);

  useEffect(() => {
    const filtered = attendanceData.filter((record) => {
      const matchesFilter = filter === 'all' || record.attendance_status.toLowerCase() === filter;
      const matchesSearch = record.date.toLowerCase().includes(searchQuery);
      return matchesFilter && matchesSearch;
    });
    setFilteredData(filtered);
  }, [attendanceData, filter, searchQuery]);

  if (!token) {
    return <div>Loading...</div>; // Show loading message if token is not available
  }

  return (
    <div>
      <div className="main-dashboard">
        <Sidebar />
        <div className="dashboard">
          <EmployeeNavbar />
          <hr className="horizontal" />

          {/* Attendance Header */}
          <div className="employee-dashboard-info" style={{ display: 'flex' }}>
            <div className="dashboard-details" style={{ flexDirection: 'column', alignItems: 'flex-start', height: '40px' }}>
              <h5>Attendance & Tracking</h5>
              <h6>{`${new Date().getDate()} ${new Date().toLocaleString('default', { month: 'long' })} ${new Date().getFullYear()}`}</h6>
            </div>
          </div>

          {/* Attendance Cards */}
          <div className="dashboard-details-1" style={{ marginBottom: '30px' }}>
            <div className="first-grid">
              <FontAwesomeIcon icon="fa-solid fa-check-circle" className="dashboard-icon" style={{ color: '#22C55E' }} />
              <div>
                <h6>Present Days</h6>
                <h5>{loading ? 'Loading...' : attendanceTotals.presentDays} Days</h5>
              </div>
            </div>

            <div className="first-grid">
              <FontAwesomeIcon icon="fa-solid fa-calendar-xmark" className="dashboard-icon" style={{ color: '#dc3545' }} />
              <div>
                <h6>Absent Days</h6>
                <h5>{loading ? 'Loading...' : attendanceTotals.absentDays} Days</h5>
              </div>
            </div>

            <div className="first-grid">
              <FontAwesomeIcon icon="fa-solid fa-clock" className="dashboard-icon" style={{ color: '#6F42C1' }} />
              <div>
                <h6>Overtime Hours</h6>
                <h5>{loading ? 'Loading...' : attendanceTotals.overtimeHours} Hours</h5>
              </div>
            </div>

            <div className="first-grid">
              <FontAwesomeIcon icon="fa-solid fa-hourglass-end" className="dashboard-icon" style={{ color: '#FFD700' }} />
              <div>
                <h6>Undertime Hours</h6>
                <h5>{loading ? 'Loading...' : attendanceTotals.undertimeHours} Hours</h5>
              </div>
            </div>
          </div>

          {/* Date Picker */}
          <div style={{ display: 'flex', marginBottom: '20px' }}>
            <div>
              <label htmlFor="year">Year:</label>
              <select id="year" value={selectedYear} onChange={handleYearChange}>
                <option value={currentYear - 1}>{currentYear - 1}</option>
                <option value={currentYear}>{currentYear}</option>
                <option value={currentYear + 1}>{currentYear + 1}</option>
              </select>
            </div>
            <div>
              <label htmlFor="month">Month:</label>
              <select id="month" value={selectedMonth} onChange={handleMonthChange}>
                {Array.from({ length: 12 }, (_, index) => (
                  <option key={index} value={index + 1}>
                    {new Date(0, index).toLocaleString('default', { month: 'long' })}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search & Filter */}
          <div style={{ display: 'flex', marginBottom: '20px' }}>
            <div style={{ marginRight: '10px' }}>
              <input
                type="text"
                placeholder="Search by Date"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <div>
              <select onChange={(e) => handleFilterChange(e.target.value)} value={filter}>
                <option value="all">All</option>
                <option value="present">Present</option>
                <option value="absent">Absent</option>
              </select>
            </div>
          </div>

          {/* Attendance Table */}
          <AttendanceTable filteredData={filteredData} />

          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default EmployeeAttendance;
