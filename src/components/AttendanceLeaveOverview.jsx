import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ColorLegend from './ColorLegend'; // Assuming you have a ColorLegend component

const AttendanceLeaveOverview = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [employeeData, setEmployeeData] = useState(null);
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Default to current month
  const [employeeName, setEmployeeName] = useState('');

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
    const fetchData = async () => {
      if (!selectedEmployeeId || !accessToken) {
        console.error('Missing required authentication details:', { selectedEmployeeId, accessToken });
        setError('Missing required authentication details');
        setLoading(false);
        return;
      }

      try {
        // Fetch employee data (Personal, Compensation, etc.)
        const employeeResponse = await axios.get(
          `https://proximahr.onrender.com/api/v2/employee-management/${selectedEmployeeId}/employee`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        console.log('Employee Data:', employeeResponse.data);
        setEmployeeData(employeeResponse.data.data);
        setEmployeeName(employeeResponse.data.data.account_name);

        // Fetch attendance data
        const attendanceResponse = await axios.get(
          `https://proximahr.onrender.com/api/v2/attendance-management/attendance`,
          {
            params: { employee_id: selectedEmployeeId },
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        console.log('Attendance Data:', attendanceResponse.data);
        setAttendanceData(attendanceResponse.data.attendance_summary);

        setLoading(false);
      } catch (err) {
        console.error('API request failed:', err.response ? err.response.data : err.message);
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedEmployeeId, accessToken]);

  useEffect(() => {
    const fetchLeaveHistory = async () => {
      if (!accessToken) return;
      try {
        const leaveResponse = await axios.get(
          `https://proximahr.onrender.com/api/v2/employee-management/employee/${selectedEmployeeId}/leave-history`,
          {
            params: { employee_id: selectedEmployeeId },
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        console.log('Leave Management API Response:', leaveResponse.data);
        console.log('Leave Data:', leaveResponse.data.leave_history);
        setLeaveHistory(Array.isArray(leaveResponse.data.leave_history) ? leaveResponse.data.leave_history : []);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch leave history');
        setLoading(false);
      }
    };
    fetchLeaveHistory();
  }, [accessToken]);

  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value));
  };

  // Filter attendance data for the selected month
  const filteredAttendance = attendanceData.filter((item) => {
    const month = new Date(item.date).getMonth() + 1;
    return month === selectedMonth;
  });

  // Calculate counts for each status in the filtered month
  const statusCounts = {
    present: filteredAttendance.filter(item => item.attendance_status === 'present').length,
    absent: filteredAttendance.filter(item => item.attendance_status === 'absent').length,
    on_leave: filteredAttendance.filter(item => item.attendance_status === 'on_leave').length,
    undertime: filteredAttendance.filter(item => item.attendance_status === 'undertime').length,
  };

  return (
    <div>
      {loading ? (
        <p>Loading attendance data...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div style={{ margin: '20px', border: '1px solid #ddd', borderRadius: '8px', padding: '20px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Attendance & Leave Overview</h2>

          {/* Month Dropdown */}
          <div style={{ marginBottom: '20px', textAlign: 'center' }}>
            <label htmlFor="month-select" style={{ fontSize: '16px', marginRight: '10px' }}>Select Month: </label>
            <select id="month-select" value={selectedMonth} onChange={handleMonthChange} style={{ padding: '8px', fontSize: '14px' }}>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i + 1}>{new Date(0, i).toLocaleString('en', { month: 'long' })}</option>
              ))}
            </select>
          </div>

          {/* Flex Container for Calendar and Leave Overview */}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* Left Section: Calendar */}
            <div style={{ width: '65%', borderRight: '2px solid #ddd', paddingRight: '20px', display: 'flex', flexDirection: 'column', minHeight: 500 }}>
              <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Monthly Attendance</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px' }}>
                {filteredAttendance.length > 0 ? (
                  filteredAttendance.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        backgroundColor:
                          item.attendance_status === 'present'
                            ? '#A2FAC3'
                            : item.attendance_status === 'absent'
                            ? '#FD9292'
                            : item.attendance_status === 'on_leave'
                            ? '#FAFC8B'
                            : item.attendance_status === 'undertime'
                            ? '#7EB1FF'
                            : '#ccc',
                        color: 'white',
                        padding: '10px',
                        textAlign: 'center',
                        borderRadius: '5px',
                      }}
                    >
                      <p>{new Date(item.date).getDate()}</p>
                    </div>
                  ))
                ) : (
                  <p style={{ textAlign: 'center' }}>No attendance data available for this employee in {new Date(0, selectedMonth - 1).toLocaleString('en', { month: 'long' })}.</p>
                )}
              </div>
              <div style={{ marginTop: 'auto', alignSelf: 'flex-start' }}>
                <ColorLegend statusCounts={statusCounts} />
              </div>
            </div>

            {/* Right Section: Leave Overview and Recent Leave History */}
            <div style={{ width: '30%', paddingLeft: '20px' }}>
              <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Leave Overview</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                <div>
                  <p style={{ fontWeight: 'bold' }}>Total Vacation Days</p>
                  <p style={{ fontWeight: 'bold', color: 'green' }}>{employeeData?.annual_leave_days}</p>
                </div>
                <div>
                  <p style={{ fontWeight: 'bold' }}>Used Leave Days</p>
                  <p style={{ fontWeight: 'bold', color: 'red' }}>{employeeData?.used_leave_days}</p>
                </div>
                <div>
                  <p style={{ fontWeight: 'bold' }}>Remaining Leave Days</p>
                  <p style={{ fontWeight: 'bold', color: 'green' }}>
                    {employeeData?.annual_leave_days - employeeData?.used_leave_days}
                  </p>
                </div>
                <div>
                  <p style={{ fontWeight: 'bold' }}>Pending Leave Requests</p>
                  <p style={{ fontWeight: 'bold', color: 'orange' }}>1</p>
                </div>
              </div>

              {/* Recent Leave History */}
              <h3 style={{ textAlign: 'center', marginTop: '30px', marginBottom: '20px' }}>Recent Leave History</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {Array.isArray(leaveHistory) && leaveHistory.length > 0 ? (
                  leaveHistory.map((leave, index) => (
                    <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>{leave.leave_type}</p>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '5px 10px',
                          borderRadius: '15px',
                          backgroundColor:
                            leave.status === 'approved'
                              ? '#E6F4EA'
                              : leave.status === 'rejected'
                              ? '#FFDFDF'
                              : '#FFF8E5',
                          color:
                            leave.status === 'approved'
                              ? '#22C55E'
                              : leave.status === 'rejected'
                              ? '#FF6464'
                              : '#F59E0B',
                          fontWeight: 'bold',
                          fontSize: '12px',
                          marginBottom: '5px',
                        }}
                      >
                        {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                      </span>
                      <p style={{ fontSize: '14px', color: '#6c757d' }}>
                        {new Date(leave.start_date).toLocaleDateString('en-GB')} -{' '}
                        {new Date(leave.end_date).toLocaleDateString('en-GB')}
                      </p>
                    </div>
                  ))
                ) : (
                  <p style={{ textAlign: 'center' }}>No leave history available.</p>
                )}

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceLeaveOverview;








