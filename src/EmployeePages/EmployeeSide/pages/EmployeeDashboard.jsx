import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import EmployeeNavbar from '../components/EmployeeNavbar.jsx';
import { useTimer } from '../../../context/TimerContext.jsx'; // Importing the useTimer hook from TimerContext
import './EmployeeDashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const EmployeeDashboard = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const [attendanceStats, setAttendanceStats] = useState({
    attendance_percentage: 0,
    annual_leave_balance: 0,
    net_pay: 0,
    total_overtime_hours: 0,
  });

  const [leaveStats, setLeaveStats] = useState({
    pending_leave_requests: 0,
    remaining_leave_days: 0,
    approved_leave_requests: 0,
  });

  const [attendanceSummary, setAttendanceSummary] = useState({
    attendance_percentage: 0,
    days_worked: 0,
    days_absent: 0,
    undertime_hours: 0,
    overtime_hours: 0,
  });

  const [compensationData, setCompensationData] = useState({
    payment_status: 'Unpaid',
    last_salary: 0,
    next_salary_date: '',
  }); // Define the compensationData state

  const [loading, setLoading] = useState(true);  // Define loading state to track data loading

  // Add these to your component's state
  const [breakStartTime, setBreakStartTime] = useState(null);
  const [breakEndTime, setBreakEndTime] = useState(null);

  // Accessing the global timer context
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

  const [attendanceBtnHover, setAttendanceBtnHover] = useState(false);
  const [leaveBtnHover, setLeaveBtnHover] = useState(false);
  const [compBtnHover, setCompBtnHover] = useState(false);
  const [breakBtnHover, setBreakBtnHover] = useState(false);

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem('employeeAuthToken'));
    const token = authData?.access_token;
    console.log("Token:", token);
    if (!token) {
      console.error('No token found. Redirecting to login.');
      window.location.href = '/login'; 
      return;
    }

    // Fetch Monthly Stats (Attendance, Leave Balance, etc.)
    const fetchMonthlyStats = async () => {
      try {
        const response = await fetch(`https://proximahr.onrender.com/api/v2/attendance/employee/monthly-stats?month=${currentMonth}&year=${currentYear}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log('Employee Monthly Stats Response:', data);
        setAttendanceStats({
          attendance_percentage: data.attendance_percentage || 0,
          annual_leave_balance: data.annual_leave_balance || 0,
          net_pay: data.net_pay || 0,
          total_overtime_hours: data.total_overtime_hours || 0,
        });
        setLoading(false);  // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching employee stats:', error);
        setLoading(false);  // Set loading to false even if an error occurs
      }
    };

    // Fetch Leave Statistics (Pending, Remaining, Approved Leave Requests)
    const fetchLeaveStats = async () => {
      try {
        const response = await fetch('https://proximahr.onrender.com/api/v2/employee/leave-statistics', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log('Leave Statistics:', data);
        setLeaveStats({
          pending_leave_requests: data.pending_leave_requests || 0,
          remaining_leave_days: data.remaining_leave_days || 0,
          approved_leave_requests: data.approved_leave_requests || 0,
        });
      } catch (error) {
        console.error('Error fetching leave stats:', error);
      }
    };

    // Fetch Attendance Summary
    const fetchAttendanceSummary = async () => {
      try {
        const response = await fetch('https://proximahr.onrender.com/api/v2/attendance/employee/attendance-summary', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log('Attendance Summary:', data);
        setAttendanceSummary({
          attendance_percentage: data.attendance_percentage || 0,
          days_worked: data.days_worked || 0,
          days_absent: data.absences || 0,
          undertime_hours: data.undertime_hours || 0,
          overtime_hours: data.total_overtime_hours || 0,
        });
      } catch (error) {
        console.error('Error fetching attendance summary:', error);
      }
    };

    // Fetch Compensation Data
    const fetchCompensationData = async () => {
      try {
        const response = await fetch('https://proximahr.onrender.com/api/v2/employee/compensation', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log('Compensation Data:', data);
        setCompensationData({
          payment_status: data.payment_status || 'Unpaid',
          last_salary: data.last_salary || 0,
          next_salary_date: data.next_salary_date || '',
        });
      } catch (error) {
        console.error('Error fetching compensation data:', error);
      }
    };

    fetchMonthlyStats();
    fetchLeaveStats();
    fetchAttendanceSummary();
    fetchCompensationData();  // Fetch compensation data as well
  }, [currentMonth, currentYear]);

  useEffect(() => {
    const paymentStatus = attendanceStats.net_pay ? 'Paid' : 'Unpaid';
    const nextSalaryDate = new Date(currentYear, currentMonth, 0).toLocaleDateString(); // Last day of the current month

    setCompensationData({
      payment_status: paymentStatus,
      last_salary: attendanceStats.net_pay || 0,
      next_salary_date: nextSalaryDate,
    });
  }, [attendanceStats]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
  };

  // When starting break
  const handleStartBreak = () => {
    setBreakStartTime(new Date());
    setBreakEndTime(null);
    startBreak();
  };

  // When ending break
  const handleEndBreak = () => {
    setBreakEndTime(new Date());
    endBreak();
  };

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
                Personal Dashboard
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

          {/* First Four Cards */}
          <div className="dashboard-details-1" style={{ marginBottom: '30px' }}>
            <div className="first-grid">
              <FontAwesomeIcon icon="fa-solid fa-check-circle" className="dashboard-icon" style={{ color: '#22C55E' }} />
              <div>
                <h6>Attendance Percentage</h6>
                <h5 style={{fontSize:'20px'}}>{loading ? 'Loading...' : `${attendanceStats.attendance_percentage}%`}</h5>
              </div>
            </div>

            <div className="first-grid">
              <FontAwesomeIcon icon="fa-solid fa-calendar" className="dashboard-icon" />
              <div>
                <h6>Leave Balance</h6>
                <h5 style={{fontSize:'20px'}}>{loading ? 'Loading...' : `${attendanceStats.annual_leave_balance} Days`}</h5>
              </div>
            </div>
            <div className="first-grid">
              <FontAwesomeIcon icon="fa-solid fa-dollar-sign" className="dashboard-icon" style={{ color: '#6F42C1' }} />
              <div>
                <h6>Net Pay</h6>
                <h5 style={{fontSize:'20px'}}>{loading ? 'Loading...' : `₦${attendanceStats.net_pay}`}</h5>
              </div>
            </div>

            <div className="first-grid">
              <FontAwesomeIcon icon="fa-solid fa-clock" className="dashboard-icon" style={{ color: '#FFD700' }} />
              <div>
                <h6>Overtime Hours</h6>
                <h5 style={{fontSize:'20px'}}>{loading ? 'Loading...' : `${attendanceStats.total_overtime_hours} Hours`}</h5>
              </div>
            </div>
          </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {/* First Row: Clock In/Clock Out and Leave Requests */}
          <div style={{ width: '48%' }}>
                {/* Clock In / Clock Out Section */}
                <div
                className="grid"
                style={{
                  background: '#fff',
                  border: '2.5px solid #E5E5E5',
                  borderRadius: '14px',
                  padding: '18px 20px 20px 20px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                  minWidth: '320px',
                  maxWidth: '420px',
                  margin: '0 auto',
                  height: '100%',
    }}
  >
    <h1 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '10px', color: '#222' }}>
      Clock In / Clock Out
    </h1>
    <hr style={{ margin: '0 0 18px 0px', marginLeft:'-20px', width:'420px', border: 'none', borderTop: '1px solid #E5E5E5' }} />
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', gap: '18px' }}>
      {/* Clock In */}
      <div style={{ flex: 1 }}>
        <div style={{ marginBottom: '10px' }}>
          <span style={{ fontSize: '14px', color: '#888' }}>Clock In</span>
          <div
            style={{
              marginTop: '4px',
              background: '#F5F5F5',
              borderRadius: '8px',
              padding: '6px 0',
              textAlign: 'center',
              fontFamily: 'monospace',
              fontSize: '18px',
              fontWeight: 600,
              color: '#222',
              letterSpacing: '2px',
            }}
          >
            {clockInTime ? clockInTime.toLocaleTimeString() : '00 : 00 : 00'}
          </div>
        </div>
        <div>
          <span style={{ fontSize: '14px', color: '#888' }}>Lunch Break</span>
          <div
            style={{
              marginTop: '4px',
              background: '#F5F5F5',
              borderRadius: '8px',
              padding: '6px 0',
              textAlign: 'center',
              fontFamily: 'monospace',
              fontSize: '16px',
              color: '#222',
              fontWeight: 500,
              letterSpacing: '1px',
            }}
          >
            {breakStartTime && breakEndTime
              ? `${breakStartTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${breakEndTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
              : 'No Break'}
          </div>
        </div>
      </div>
      {/* Clock Out */}
      <div style={{ flex: 1 }}>
        <div style={{ marginBottom: '10px' }}>
          <span style={{ fontSize: '14px', color: '#888' }}>Clock Out</span>
          <div
            style={{
              marginTop: '4px',
              background: '#F5F5F5',
              borderRadius: '8px',
              padding: '6px 0',
              textAlign: 'center',
              fontFamily: 'monospace',
              fontSize: '18px',
              fontWeight: 600,
              color: '#222',
              letterSpacing: '2px',
            }}
          >
            {clockOutTime ? clockOutTime.toLocaleTimeString() : '00 : 00 : 00'}
          </div>
        </div>
        <div>
          <span style={{ fontSize: '14px', color: '#888' }}>Break Time</span>
          <div
            style={{
              marginTop: '4px',
              background: '#F5F5F5',
              borderRadius: '8px',
              padding: '6px 0',
              textAlign: 'center',
              fontFamily: 'monospace',
              fontSize: '16px',
              color: '#222',
              fontWeight: 500,
              letterSpacing: '1px',
            }}
          >
            {formatTime(breakTime)}
          </div>
        </div>
      </div>
    </div>
    {/* Working Hours Row */}
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '18px', gap: '18px' }}>
      <div style={{ flex: 1 }}>
        <span style={{ fontSize: '14px', color: '#888' }}>Working Hours</span>
        <div
          style={{
            marginTop: '4px',
            background: '#F5F5F5',
            borderRadius: '8px',
            padding: '6px 0',
            textAlign: 'center',
            fontFamily: 'monospace',
            fontSize: '16px',
            color: '#222',
            fontWeight: 500,
            letterSpacing: '1px',
          }}
        >
          {formatTime(workingHours)}
        </div>
      </div>
      <div style={{ flex: 1 }} />
    </div>
    {/* Buttons */}
    <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
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
      <button
        style={{
          flex: 1,
          background: breakBtnHover ? '#007BFF' : '#fff',
          color: breakBtnHover ? '#fff' : '#222',
          border: '1px solid #D9D9D9',
          borderRadius: '6px',
          fontWeight: 500,
          fontSize: '16px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          cursor: 'pointer',
          transition: 'background 0.2s, color 0.2s',
        }}
        onMouseEnter={() => setBreakBtnHover(true)}
        onMouseLeave={() => setBreakBtnHover(false)}
        onClick={isBreakActive ? handleEndBreak : handleStartBreak}
      >
        <FontAwesomeIcon icon="fa-solid fa-mug-hot" />
        {isBreakActive ? 'End Break' : 'Start Break'}
      </button>
    </div>
  </div>
</div>

    {/* Leave Requests Section */}
    <div style={{ width: '48%' }}>
  <div
    className="grid"
    style={{
      background: '#fff',
      border: '1px solid #E5E5E5',
      borderRadius: '14px',
      padding: '18px 20px 20px 20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
      minWidth: '320px',
      maxWidth: '420px',
      margin: '0 auto',
      height: '100%',
    }}
  >
    <h1 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '10px', color: '#222' }}>
      Leave Requests
    </h1>
    <hr style={{ margin: '0 0 18px 0px', marginLeft:'-20px', width:'420px', border: 'none', borderTop: '1px solid #E5E5E5' }} />

    <div style={{ marginBottom: '16px' }}>
      <h5 style={{ fontSize: '15px', color: '#888', fontWeight: 500, margin: 0 }}>
        Number of pending leave requests
      </h5>
      <div
        style={{
          marginTop: '6px',
          background: '#F5F5F5',
          borderRadius: '8px',
          padding: '7px 0',
          textAlign: 'center',
          fontSize: '16px',
          color: '#222',
          fontWeight: 600,
          width: '100%',
        }}
      >
        {leaveStats.pending_leave_requests} Pending Requests
      </div>
    </div>

    <div style={{ marginBottom: '16px' }}>
      <h5 style={{ fontSize: '15px', color: '#888', fontWeight: 500, margin: 0 }}>
        Number of available remaining
      </h5>
      <div
        style={{
          marginTop: '6px',
          background: '#F5F5F5',
          borderRadius: '8px',
          padding: '7px 0',
          textAlign: 'center',
          fontSize: '16px',
          color: '#222',
          fontWeight: 600,
          width: '100%',
        }}
      >
        {leaveStats.remaining_leave_days} Days
      </div>
    </div>

    <div style={{ marginBottom: '22px' }}>
      <h5 style={{ fontSize: '15px', color: '#888', fontWeight: 500, margin: 0 }}>
        Number of approved leaves
      </h5>
      <div
        style={{
          marginTop: '6px',
          background: '#F5F5F5',
          borderRadius: '8px',
          padding: '7px 0',
          textAlign: 'center',
          fontSize: '16px',
          color: '#222',
          fontWeight: 600,
          width: '100%',
        }}
      >
        {leaveStats.approved_leave_requests} Approved Leave
      </div>
    </div>

    <div>
      <Link to={'/EmployeeLeave'}>
        <button
          style={{
            width: '100%',
            background: leaveBtnHover ? '#fff' : '#007BFF',
            color: leaveBtnHover ? '#007BFF' : '#fff',
            border: leaveBtnHover ? '2px solid #007BFF' : 'none',
            borderRadius: '6px',
            fontWeight: 500,
            fontSize: '16px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer',
            transition: 'background 0.2s, color 0.2s, border 0.2s',
            boxShadow: leaveBtnHover ? '0 2px 8px rgba(0,123,255,0.10)' : 'none',
          }}
          onMouseEnter={() => setLeaveBtnHover(true)}
          onMouseLeave={() => setLeaveBtnHover(false)}
        >
          <FontAwesomeIcon icon="fa-solid fa-calendar" />
          Request Leave
        </button>
      </Link>
    </div>
  </div>
</div>


</div>

  {/* Second Row: Attendance Summary and Compensation */}
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
    <div style={{ width: '48%' }}>
    {/* Attendance Summary Card */}
    <div
    className="grid"
    style={{
      background: '#fff',
      border: '1px solid #E5E5E5',
      borderRadius: '14px',
      padding: '18px 20px 20px 20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
      minWidth: '320px',
      maxWidth: '420px',
      margin: '0 auto',
      height: '100%',
    }}
  >
    <h1 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '10px', color: '#222' }}>
      Attendance Summary
    </h1>
    <hr style={{ margin: '0 0 18px 0px', marginLeft:'-20px', width:'420px', border: 'none', borderTop: '1px solid #E5E5E5' }} />

    {/* Attendance Percentage */}
    <div style={{ marginBottom: '16px' }}>
      <h5 style={{ fontSize: '15px', color: '#888', fontWeight: 500, margin: 0 }}>
        Total attendance percentage
      </h5>
      <div
        style={{
          marginTop: '6px',
          display: 'inline-block',
          background: '#F5F5F5',
          borderRadius: '8px',
          padding: '6px 16px',
          fontSize: '16px',
          color: attendanceSummary.attendance_percentage >= 75 ? '#22C55E' : '#FF6464',
          fontWeight: 600,
        }}
      >
        {attendanceSummary.attendance_percentage < 10
          ? `0${attendanceSummary.attendance_percentage}%`
          : `${attendanceSummary.attendance_percentage}%`}
      </div>
    </div>

    {/* Days Worked, Absent, Undertime */}
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', gap: '8px' }}>
      <div style={{ flex: 1 }}>
        <h5 style={{ fontSize: '15px', color: '#888', fontWeight: 500, margin: 0 }}>Days Worked</h5>
        <div
          style={{
            marginTop: '6px',
            background: '#F5F5F5',
            borderRadius: '8px',
            padding: '6px 0',
            textAlign: 'center',
            fontSize: '16px',
            color: '#222',
            fontWeight: 600,
          }}
        >
          {attendanceSummary.days_worked < 10
            ? `0${attendanceSummary.days_worked} days`
            : `${attendanceSummary.days_worked} days`}
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <h5 style={{ fontSize: '15px', color: '#888', fontWeight: 500, margin: 0 }}>Days Absent</h5>
        <div
          style={{
            marginTop: '6px',
            background: '#F5F5F5',
            borderRadius: '8px',
            padding: '6px 0',
            textAlign: 'center',
            fontSize: '16px',
            color: '#FF6464',
            fontWeight: 600,
          }}
        >
          {attendanceSummary.days_absent < 10
            ? `0${attendanceSummary.days_absent} days`
            : `${attendanceSummary.days_absent} days`}
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <h5 style={{ fontSize: '15px', color: '#888', fontWeight: 500, margin: 0 }}>Undertime Hours</h5>
        <div
          style={{
            marginTop: '6px',
            background: '#F5F5F5',
            borderRadius: '8px',
            padding: '6px 0',
            textAlign: 'center',
            fontSize: '16px',
            color: '#FF6464',
            fontWeight: 600,
          }}
        >
          {attendanceSummary.undertime_hours < 10
            ? `0${attendanceSummary.undertime_hours} hrs`
            : `${attendanceSummary.undertime_hours} hrs`}
        </div>
      </div>
    </div>

    {/* Overtime Hours */}
    <div style={{ marginBottom: '22px' }}>
      <h5 style={{ fontSize: '15px', color: '#888', fontWeight: 500, margin: 0 }}>Overtime Hours</h5>
      <div
        style={{
          marginTop: '6px',
          background: '#F5F5F5',
          borderRadius: '8px',
          padding: '6px 0',
          textAlign: 'center',
          fontSize: '16px',
          color: '#222',
          fontWeight: 600,
          width: '100%',
        }}
      >
        {attendanceSummary.overtime_hours < 10
          ? `0${attendanceSummary.overtime_hours} hrs`
          : `${attendanceSummary.overtime_hours} hrs`}
      </div>
    </div>

    <div>
      <Link to={'/EmployeeAttendance'}>
        <button
          style={{
            width: '100%',
            background: attendanceBtnHover ? '#fff' : '#007BFF',
            color: attendanceBtnHover ? '#007BFF' : '#fff',
            border: attendanceBtnHover ? '2px solid #007BFF' : 'none',
            borderRadius: '6px',
            fontWeight: 500,
            fontSize: '16px',
            height: '40px',
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
        >
          <FontAwesomeIcon icon="fa-solid fa-clock" />
          View Attendance
        </button>
      </Link>
    </div>
  </div>
</div>

    <div style={{ width: '48%' }}>
  {/* Compensation Card */}
  <div
    className="grid"
    style={{
      background: '#fff',
      border: '1px solid #E5E5E5',
      borderRadius: '14px',
      padding: '24px 20px 20px 20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
      minWidth: '320px',
      maxWidth: '420px',
      margin: '0 auto',
      height: '100%',
    }}
  >
    <h1 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '10px', color: '#222' }}>
      Compensation
    </h1>
    <hr style={{ margin: '0 0 18px 0px', marginLeft:'-20px', width:'420px', border: 'none', borderTop: '1px solid #E5E5E5' }} />

    {/* Payment Status */}
    <div style={{ marginBottom: '16px' }}>
      <h5 style={{ fontSize: '15px', color: '#888', fontWeight: 500, margin: 0 }}>Payment Status</h5>
      <div
        style={{
          marginTop: '6px',
          display: 'inline-block',
          background: compensationData.payment_status === 'Paid' ? '#ECFDF3' : '#FFF1F1',
          border: `1.5px solid ${compensationData.payment_status === 'Paid' ? '#22C55E' : '#FF6464'}`,
          borderRadius: '16px',
          padding: '4px 16px',
          fontSize: '16px',
          color: compensationData.payment_status === 'Paid' ? '#22C55E' : '#FF6464',
          fontWeight: 600,
        }}
      >
        {compensationData.payment_status}
      </div>
    </div>

    {/* Last Salary */}
    <div style={{ marginBottom: '16px' }}>
      <h5 style={{ fontSize: '15px', color: '#888', fontWeight: 500, margin: 0 }}>Last Salary</h5>
      <div
        style={{
          marginTop: '6px',
          display: 'inline-block',
          background: '#F5F5F5',
          borderRadius: '16px',
          padding: '4px 16px',
          fontSize: '16px',
          color: '#222',
          fontWeight: 600,
        }}
      >
        {compensationData.last_salary
          ? `Paid: ${formatCurrency(compensationData.last_salary)} on ${compensationData.next_salary_date
              ? new Date(compensationData.next_salary_date).toLocaleString('en-US', { month: 'short', day: '2-digit' })
              : ''}`
          : 'Not Paid'}
      </div>
    </div>

    {/* Next Salary */}
    <div style={{ marginBottom: '22px' }}>
      <h5 style={{ fontSize: '15px', color: '#888', fontWeight: 500, margin: 0 }}>Next Salary</h5>
      <div
        style={{
          marginTop: '6px',
          display: 'inline-block',
          background: '#F5F5F5',
          borderRadius: '16px',
          padding: '4px 16px',
          fontSize: '16px',
          color: '#222',
          fontWeight: 600,
        }}
      >
        Due: {compensationData.next_salary_date
          ? new Date(compensationData.next_salary_date).toLocaleString('en-US', { month: 'short', day: '2-digit' })
          : ''}
      </div>
    </div>

    <div>
      <button
        style={{
          width: '100%',
          background: compBtnHover ? '#fff' : '#007BFF',
          color: compBtnHover ? '#007BFF' : '#fff',
          border: compBtnHover ? '2px solid #007BFF' : 'none',
          borderRadius: '6px',
          fontWeight: 500,
          fontSize: '16px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          cursor: 'pointer',
          transition: 'background 0.2s, color 0.2s, border 0.2s',
          boxShadow: compBtnHover ? '0 2px 8px rgba(0,123,255,0.10)' : 'none',
        }}
        onMouseEnter={() => setCompBtnHover(true)}
        onMouseLeave={() => setCompBtnHover(false)}
      >
        <FontAwesomeIcon icon="fa-solid fa-money-bill-wave" />
        Compensation
      </button>
    </div>
  </div>
</div>

        </div>


        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
