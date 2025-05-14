import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import EmployeeNavbar from '../components/EmployeeNavbar.jsx';
import { useTimer } from '../../../context/TimerContext.jsx'; // Importing the useTimer hook from TimerContext
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

  const [attendanceData, setAttendanceData] = useState([]); // Ensure it's initialized as an array
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'present', 'absent', etc.
  const [searchQuery, setSearchQuery] = useState("");
  const [attendanceBtnHover, setAttendanceBtnHover] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);

  const [startDate, setStartDate] = useState(() => {
    const today = new Date();
    return today.toISOString().slice(0, 10); // 'YYYY-MM-DD'
  });
  const [endDate, setEndDate] = useState(() => {
    const today = new Date();
    return today.toISOString().slice(0, 10); // 'YYYY-MM-DD'
  });

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Add this line to get formatTime and workingHours from useTimer
  const { workingHours, formatTime, isTimerRunning, stopTimer, startTimer } = useTimer();

  // Fetch token on mount
  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem('employeeAuthToken'));
    const fetchedToken = authData?.access_token;
    setToken(fetchedToken);
  }, []);

  // Fetch attendance summary and daily attendance details when year/month changes
  useEffect(() => {
    if (token) {
      const fetchAttendance = async () => {
        try {
          // Fetch the attendance summary
          const response = await fetch(
            `https://proximahr.onrender.com/api/v2/attendance/employee/attendance-totals?year=${selectedYear}&month=${selectedMonth}`,
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
            `https://proximahr.onrender.com/api/v2/attendance/employee/attendance-tracking?year=${selectedYear}&month=${selectedMonth}`,
            {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            }
          );
          const dailyData = await dailyResponse.json();
          console.log('Daily Attendance API Response:', dailyData); // Log the API response for daily attendance

          // Ensure dailyData is an array before setting it
          if (Array.isArray(dailyData)) {
            setAttendanceData(dailyData);
          } else {
            setAttendanceData([]); // Default to an empty array if the response is not an array
          }

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

  const handleDatePickerOpen = () => setShowDateModal(true);
  const handleDatePickerClose = () => setShowDateModal(false);

  const handleDateChange = (e, type) => {
    if (type === 'start') setStartDate(e.target.value);
    else setEndDate(e.target.value);
  };

  const handleApplyDate = () => {
    setShowDateModal(false);
    // Optionally trigger data fetch/filter here
  };

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

          {/* Employee Dashboard Info Section */}
          <div
            className="employee-dashboard-info"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '32px',
              width: '100%',
            }}
          >
            {/* Left: Dashboard Title and Date */}
            <div
              className="dashboard-details"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                flex: 1,
                minWidth: 0,
              }}
            >
              <h5 style={{ fontSize: '24px', fontWeight: 500, margin: 0, color: '#222' }}>
                Attendance & Tracking
              </h5>
              <h6 style={{ fontSize: '16px', fontWeight: 400, color: '#888', margin: '8px 0 0 0' }}>
                {`${new Date().getDate()} ${new Date().toLocaleString('en-US', { weekday: 'long' })} ${new Date().toLocaleString('default', { month: 'long' })} ${new Date().getFullYear()}`}
              </h6>
            </div>

            {/* Right: Working Hours */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                minWidth: 0,
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <span style={{ fontSize: '15px', color: '#888', marginBottom: '4px' }}>Working Hours</span>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <div
                    style={{
                      width: '140px',
                      height: '40px',
                      background: '#FAFAFA',
                      border: '1px solid #E5E5E5',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '22px',
                      fontWeight: 600,
                      color: '#222',
                      letterSpacing: '2px',
                      fontFamily: 'monospace',
                      boxSizing: 'border-box',
                    }}
                  >
                    {formatTime(workingHours)}
                  </div>
                  <button
                    style={{
                      flex: 1,
                      background: attendanceBtnHover ? '#fff' : '#007BFF',
                      color: attendanceBtnHover ? '#007BFF' : '#fff',
                      border: attendanceBtnHover ? '2px solid #007BFF' : 'none',
                      borderRadius: '6px',
                      fontWeight: 500,
                      fontSize: '16px',
                      height: '40px',
                      width: '140px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      transition: 'background 0.2s, color 0.2s, border 0.2s',
                      boxShadow: attendanceBtnHover ? '0 2px 8px rgba(0,123,255,0.10)' : 'none',
                    }}
                    onMouseEnter={() => setAttendanceBtnHover(true)}
                    onMouseLeave={() => setAttendanceBtnHover(false)}
                    onClick={isTimerRunning ? stopTimer : startTimer}
                  >
                    <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" />
                    {isTimerRunning ? 'Clock Out' : 'Clock In'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Attendance Cards */}
          <div className="dashboard-details-1" style={{ marginBottom: '30px' }}>
            <div className="first-grid">
              <FontAwesomeIcon icon="fa-solid fa-check-circle" className="dashboard-icon" style={{ color: '#22C55E' }} />
              <div>
                <h6>Present Days</h6>
                <h5 style={{fontSize:'20px'}}>{loading ? 'Loading...' : attendanceTotals.presentDays} Days</h5>
              </div>
            </div>

            <div className="first-grid">
              <FontAwesomeIcon icon="fa-solid fa-calendar-xmark" className="dashboard-icon" style={{ color: '#dc3545' }} />
              <div>
                <h6>Absent Days</h6>
                <h5 style={{fontSize:'20px'}}>{loading ? 'Loading...' : attendanceTotals.absentDays} Days</h5>
              </div>
            </div>

            <div className="first-grid">
              <FontAwesomeIcon icon="fa-solid fa-clock" className="dashboard-icon" style={{ color: '#6F42C1' }} />
              <div>
                <h6>Overtime Hours</h6>
                <h5 style={{fontSize:'20px'}}>{loading ? 'Loading...' : attendanceTotals.overtimeHours} Hours</h5>
              </div>
            </div>

            <div className="first-grid">
              <FontAwesomeIcon icon="fa-solid fa-hourglass-end" className="dashboard-icon" style={{ color: '#FFD700' }} />
              <div>
                <h6>Undertime Hours</h6>
                <h5 style={{fontSize:'20px'}}>{loading ? 'Loading...' : attendanceTotals.undertimeHours} Hours</h5>
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

          {/* Date Range Picker & Controls */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '18px',
            gap: '16px',
            flexWrap: 'wrap'
          }}>
            {/* Date Range Picker */}
            <div style={{ minWidth: 260 }}>
              {/* Replace with your preferred date range picker if available */}
              <input
                type="text"
                value={`${startDate} - ${endDate}`}
                readOnly
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  border: '1.5px solid #E5E5E5',
                  borderRadius: '8px',
                  fontSize: '15px',
                  background: '#fff',
                  color: '#222',
                  cursor: 'pointer'
                }}
                onClick={handleDatePickerOpen}
              />
              {/* Modal */}
              {showDateModal && (
                <div style={{
                  position: 'fixed',
                  top: 0, left: 0, right: 0, bottom: 0,
                  background: 'rgba(0,0,0,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 1000
                }}>
                  <div style={{
                    background: '#fff',
                    padding: '24px',
                    borderRadius: '12px',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
                    minWidth: '320px'
                  }}>
                    <h4 style={{marginBottom: '18px'}}>Select Date Range</h4>
                    <div style={{display: 'flex', gap: '16px', marginBottom: '18px'}}>
                      <div>
                        <label>Start Date</label>
                        <input
                          type="date"
                          value={startDate}
                          onChange={e => handleDateChange(e, 'start')}
                          style={{padding: '8px', borderRadius: '6px', border: '1px solid #E5E5E5'}}
                        />
                      </div>
                      <div>
                        <label>End Date</label>
                        <input
                          type="date"
                          value={endDate}
                          onChange={e => handleDateChange(e, 'end')}
                          style={{padding: '8px', borderRadius: '6px', border: '1px solid #E5E5E5'}}
                        />
                      </div>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'flex-end', gap: '10px'}}>
                      <button
                        style={{
                          background: '#fff',
                          color: '#007BFF',
                          border: '1.5px solid #007BFF',
                          borderRadius: '6px',
                          padding: '8px 18px',
                          cursor: 'pointer'
                        }}
                        onClick={handleDatePickerClose}
                      >Cancel</button>
                      <button
                        style={{
                          background: '#007BFF',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '8px 18px',
                          cursor: 'pointer'
                        }}
                        onClick={handleApplyDate}
                      >Apply</button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Search & Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, justifyContent: 'flex-end' }}>
              <input
                type="text"
                placeholder="Search by Date"
                value={searchQuery}
                onChange={handleSearchChange}
                style={{
                  padding: '9px 12px',
                  border: '1.5px solid #E5E5E5',
                  borderRadius: '8px',
                  fontSize: '15px',
                  background: '#fff',
                  color: '#222',
                  minWidth: '160px'
                }}
              />
              <select
                onChange={(e) => handleFilterChange(e.target.value)}
                value={filter}
                style={{
                  padding: '9px 12px',
                  border: '1.5px solid #E5E5E5',
                  borderRadius: '8px',
                  fontSize: '15px',
                  background: '#fff',
                  color: '#222',
                  minWidth: '120px'
                }}
              >
                <option value="all">All</option>
                <option value="present">Present</option>
                <option value="absent">Absent</option>
              </select>
            </div>
          </div>

          {/* Attendance Table */}
          <div style={{
            background: '#fff',
            border: '1.5px solid #E5E5E5',
            borderRadius: '14px',
            padding: '0 0 10px 0',
            marginBottom: '18px'
          }}>
            <AttendanceTable filteredData={paginatedData} />
          </div>

          {/* Pagination */}
          <Pagination
            totalEntries={filteredData.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeAttendance;
