import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import EmployeeNavbar from '../components/EmployeeNavbar.jsx';
import { useTimer } from '../../../context/TimerContext.jsx'; // Importing the useTimer hook from TimerContext
import './EmployeeDashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const EmployeeLeave = () => {
    const [isMonthOpen, setIsMonthOpen] = useState(false);
    const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
    const [filter, setFilter] = useState('pending');
    const [leaveData, setLeaveData] = useState([]);
    const [leaveSummary, setLeaveSummary] = useState({});
    const [searchQuery, setSearchQuery] = useState("");
    const [attendanceBtnHover, setAttendanceBtnHover] = useState(false); // Add this near your other useState hooks
    const [newLeaveBtnHover, setNewLeaveBtnHover] = useState(false);
    const [filterBtnHover, setFilterBtnHover] = useState(false);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [selectedLeave, setSelectedLeave] = useState(null);
    const [viewBtnHover, setViewBtnHover] = useState(null); // index of hovered button

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

    // Fetch leave summary data
    useEffect(() => {
        const authData = JSON.parse(localStorage.getItem('employeeAuthToken'));
        const token = authData?.access_token;
        console.log('JWT Token for leave summary:', token);  // Log the token to check its value
    
        fetch('https://proximahr.onrender.com/api/v2/employee/leave-summary', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log('Leave Summary API Response:', data); // Log the response to see what the API returns
                setLeaveSummary(data); // Update the state with the response data
            })
            .catch(error => console.error('Error fetching leave summary:', error));
    }, []);

    // Fetch leave history data
    useEffect(() => {
        const authData = JSON.parse(localStorage.getItem('employeeAuthToken'));
        const token = authData?.access_token;
        console.log('JWT Token for leave history:', token);  // Log the token to check its value

        if (!token) {
            console.error('No token found. Redirecting to login.');
            window.location.href = '/login'; // Redirect to login page if no token
            return;
        }

        fetch('https://proximahr.onrender.com/api/v2/employee/leaves', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}` // Pass the token in the Authorization header
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log('Leave Data:', data); // Log the leave data
                if (Array.isArray(data)) {
                    setLeaveData(data);
                } else {
                    console.error('Data is not an array:', data);
                }
            })
            .catch(error => console.error('Error fetching leave data:', error));
    }, []);

    const toggleMonthDropdown = () => {
        setIsMonthOpen(!isMonthOpen);
        setIsDepartmentOpen(false);
    };

    const toggleDepartmentDropdown = () => {
        setIsDepartmentOpen(!isDepartmentOpen);
        setIsMonthOpen(false);
    };

    const handleFilterChange = (status) => {
        setFilter(status);
        setIsDepartmentOpen(false); // Close the dropdown after selecting a filter
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);  // Format the date to a readable format
    };

    const filteredData = leaveData.filter(leave => {
        const matchesStatus = filter === 'all' || leave.status.toLowerCase() === filter.toLowerCase();
        const matchesSearch = leave.leave_type.toLowerCase().includes(searchQuery);
        return matchesStatus && matchesSearch;
    });

    return (
        <div>
            <div className="main-dashboard">
                <Sidebar />
                <div className="dashboard">
                    <EmployeeNavbar />
                    <hr className="horizontal" />

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
                          Leave Request
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

                    <div className="dashboard-details-1">
                        <div className="first-grid">
                            <FontAwesomeIcon icon="fa-solid fa-circle-check" className="dashboard-icon" style={{ color: '#22C55E' }} />
                            <div>
                                <h6>Annual Leave</h6>
                                <h5 style={{fontSize:'20px'}}>{leaveSummary.allocated_leave_days || 0} Days</h5>
                            </div>
                        </div>

                        <div className="first-grid">
                            <FontAwesomeIcon icon="fa-solid fa-clock" className="dashboard-icon" style={{ color: '#6F42C1' }} />
                            <div>
                                <h6>Used Leave</h6>
                                <h5 style={{fontSize:'20px'}}>{leaveSummary.used_leave_days || 0} Days</h5>
                            </div>
                        </div>

                        <div className="first-grid">
                            <FontAwesomeIcon icon="fa-solid fa-calendar" className="dashboard-icon" />
                            <div>
                                <h6>Remaining Leave</h6>
                                <h5 style={{fontSize:'20px'}}>{leaveSummary.remaining_leave_days || 0} Days</h5>
                            </div>
                        </div>

                        <div className="first-grid">
                            <FontAwesomeIcon icon="fa-solid fa-hourglass-start" className="dashboard-icon" style={{ color: '#FFD700' }} />
                            <div>
                                <h6>Pending Leaves</h6>
                                <h5 style={{fontSize:'20px'}}>{leaveSummary.pending_leaves || 0}</h5>
                            </div>
                        </div>
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      margin: '24px 0 18px 0',
                      gap: '16px',
                      flexWrap: 'wrap'
                    }}>
                      {/* Search */}
                      <div style={{ flex: 1, display: 'flex', alignItems: 'center', position: 'relative' }}>
                        <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" style={{ position: 'absolute', left: 16, color: '#B5B5B5', fontSize: 18 }} />
                        <input
                          type="text"
                          placeholder="Search Leave History"
                          value={searchQuery}
                          onChange={handleSearchChange}
                          style={{
                            width: '100%',
                            padding: '12px 16px 12px 44px',
                            border: '1.5px solid #E5E5E5',
                            borderRadius: '24px',
                            fontSize: '16px',
                            background: '#fff',
                            color: '#222',
                            outline: 'none'
                          }}
                        />
                      </div>
                      {/* Filter and New Leave Request */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ position: 'relative' }}>
                          <button
                            onClick={toggleDepartmentDropdown}
                            style={{
                              background: filterBtnHover ? '#fff' : '#007BFF',
                              color: filterBtnHover ? '#007BFF' : '#fff',
                              border: filterBtnHover ? '2px solid #007BFF' : 'none',
                              borderRadius: '8px',
                              padding: '10px 18px',
                              fontWeight: 500,
                              fontSize: '16px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              transition: 'background 0.2s, color 0.2s, border 0.2s',
                              boxShadow: filterBtnHover ? '0 2px 8px rgba(0,123,255,0.10)' : 'none'
                            }}
                            onMouseEnter={() => setFilterBtnHover(true)}
                            onMouseLeave={() => setFilterBtnHover(false)}
                          >
                            <FontAwesomeIcon icon="fa-filter" /> Filter
                          </button>
                          {isDepartmentOpen && (
                            <div style={{
                              position: 'absolute',
                              top: '110%',
                              right: 0,
                              background: '#fff',
                              border: '1.5px solid #E5E5E5',
                              borderRadius: '8px',
                              boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                              zIndex: 10,
                              minWidth: '180px'
                            }}>
                              {['pending', 'approved', 'rejected'].map((status, idx) => (
                                <p
                                  key={status}
                                  style={{
                                    margin: 0,
                                    padding: '10px 18px',
                                    cursor: 'pointer',
                                    color: filter === status ? '#007BFF' : '#222',
                                    background: filter === status ? '#F0F8FF' : '#fff',
                                    borderLeft: filter === status ? '3px solid #007BFF' : '3px solid transparent',
                                    transition: 'background 0.2s, color 0.2s, border 0.2s'
                                  }}
                                  onMouseEnter={e => {
                                    e.currentTarget.style.background = '#F0F8FF';
                                    e.currentTarget.style.color = '#007BFF';
                                    e.currentTarget.style.borderLeft = '3px solid #007BFF';
                                  }}
                                  onMouseLeave={e => {
                                    e.currentTarget.style.background = filter === status ? '#F0F8FF' : '#fff';
                                    e.currentTarget.style.color = filter === status ? '#007BFF' : '#222';
                                    e.currentTarget.style.borderLeft = filter === status ? '3px solid #007BFF' : '3px solid transparent';
                                  }}
                                  onClick={() => handleFilterChange(status)}
                                >
                                  {status.charAt(0).toUpperCase() + status.slice(1)} {status === 'pending' ? 'Requests' : ''}
                                </p>
                              ))}
                            </div>
                          )}
                        </div>
                        <Link to={'/EmployeeLeave/NewLeaveRequest'}>
                          <button
                            style={{
                              background: newLeaveBtnHover ? '#fff' : '#007BFF',
                              color: newLeaveBtnHover ? '#007BFF' : '#fff',
                              border: newLeaveBtnHover ? '2px solid #007BFF' : 'none',
                              borderRadius: '8px',
                              padding: '10px 22px',
                              fontWeight: 500,
                              fontSize: '16px',
                              cursor: 'pointer',
                              transition: 'background 0.2s, color 0.2s, border 0.2s',
                              boxShadow: newLeaveBtnHover ? '0 2px 8px rgba(0,123,255,0.10)' : 'none',
                              width: 'auto',
                              minWidth: '180px'
                            }}
                            onMouseEnter={() => setNewLeaveBtnHover(true)}
                            onMouseLeave={() => setNewLeaveBtnHover(false)}
                          >
                            + New Leave Request
                          </button>
                        </Link>
                      </div>
                    </div>

                    {/* Table Section */}
                    <div style={{
                      background: '#fff',
                      border: '1.5px solid #E5E5E5',
                      borderRadius: '14px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                      margin: '0 0 24px 0',
                      overflow: 'hidden'
                    }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
                        <thead>
                          <tr style={{ background: '#FAFAFA', color: '#888', fontWeight: 500 }}>
                            <th style={{ padding: '16px 0', fontWeight: 500 }}>Leave Type</th>
                            <th style={{ padding: '16px 0', fontWeight: 500 }}>Duration</th>
                            <th style={{ padding: '16px 0', fontWeight: 500 }}>Start Date</th>
                            <th style={{ padding: '16px 0', fontWeight: 500 }}>End Date</th>
                            <th style={{ padding: '16px 0', fontWeight: 500 }}>Status</th>
                            <th style={{ padding: '16px 0', fontWeight: 500 }}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredData.length > 0 ? (
                            filteredData.map((leave, index) => (
                              <tr key={index} style={{ borderBottom: '1px solid #F0F0F0' }}>
                                <td style={{ textAlign: 'center', padding: '14px 0' }}>{leave.leave_type}</td>
                                <td style={{ textAlign: 'center', padding: '14px 0' }}>{leave.duration} {leave.duration > 1 ? 'days' : 'day'}</td>
                                <td style={{ textAlign: 'center', padding: '14px 0' }}>{formatDate(leave.start_date)}</td>
                                <td style={{ textAlign: 'center', padding: '14px 0' }}>{formatDate(leave.end_date)}</td>
                                <td style={{ textAlign: 'center', padding: '14px 0' }}>
                                  <span style={{
                                    display: 'inline-block',
                                    padding: '4px 18px',
                                    borderRadius: '16px',
                                    fontWeight: 500,
                                    background:
                                      leave.status === 'Approved'
                                        ? '#E6FFF1'
                                        : leave.status === 'Rejected'
                                        ? '#FFE6E6'
                                        : '#FEFFC1',
                                    color:
                                      leave.status === 'Approved'
                                        ? '#22C55E'
                                        : leave.status === 'Rejected'
                                        ? '#FF6464'
                                        : '#FFD700',
                                    border: `1.5px solid ${
                                      leave.status === 'Approved'
                                        ? '#22C55E'
                                        : leave.status === 'Rejected'
                                        ? '#FF6464'
                                        : '#FFD700'
                                    }`,
                                    fontSize: '15px',
                                    minWidth: '90px',
                                    textAlign: 'center'
                                  }}>
                                    {leave.status}
                                  </span>
                                </td>
                                <td style={{ textAlign: 'center', padding: '14px 0' }}>
                                  <button
                                    style={{
                                      background: viewBtnHover === index ? '#fff' : '#007BFF',
                                      color: viewBtnHover === index ? '#007BFF' : '#fff',
                                      border: viewBtnHover === index ? '2px solid #007BFF' : 'none',
                                      borderRadius: '8px',
                                      padding: '7px 18px',
                                      fontWeight: 500,
                                      fontSize: '15px',
                                      cursor: 'pointer',
                                      transition: 'background 0.2s, color 0.2s, border 0.2s',
                                      boxShadow: viewBtnHover === index ? '0 2px 8px rgba(0,123,255,0.10)' : 'none'
                                    }}
                                    onMouseEnter={() => setViewBtnHover(index)}
                                    onMouseLeave={() => setViewBtnHover(null)}
                                    onClick={() => {
                                      setSelectedLeave(leave);
                                      setViewModalOpen(true);
                                    }}
                                  >
                                    View Details
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="6" style={{ textAlign: 'center', padding: '24px 0', color: '#888' }}>No data found</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    {viewModalOpen && selectedLeave && (
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
                          padding: '36px 32px 28px 32px',
                          borderRadius: '16px',
                          boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
                          minWidth: '320px',
                          maxWidth: '95vw',
                          textAlign: 'center'
                        }}>
                          <div style={{ marginBottom: 18 }}>
                            <FontAwesomeIcon
                              icon={
                                selectedLeave.status === 'Approved'
                                  ? 'fa-circle-check'
                                  : selectedLeave.status === 'Rejected'
                                  ? 'fa-circle-xmark'
                                  : 'fa-clock'
                              }
                              style={{
                                fontSize: 64,
                                color:
                                  selectedLeave.status === 'Approved'
                                    ? '#22C55E'
                                    : selectedLeave.status === 'Rejected'
                                    ? '#FF6464'
                                    : '#FFD700',
                                marginBottom: 10
                              }}
                            />
                          </div>
                          <h2 style={{
                            color:
                              selectedLeave.status === 'Approved'
                                ? '#22C55E'
                                : selectedLeave.status === 'Rejected'
                                ? '#FF6464'
                                : '#FFD700',
                            fontWeight: 700,
                            fontSize: 22,
                            margin: 0,
                            marginBottom: 8
                          }}>
                            {selectedLeave.status} Request
                          </h2>
                          <div style={{ color: '#222', fontWeight: 500, marginBottom: 8, fontSize: 18 }}>
                            {selectedLeave.leave_type}
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginBottom: 8 }}>
                            <div>
                              <div style={{ color: '#888', fontSize: 14 }}>Start Date</div>
                              <div style={{ fontWeight: 500 }}>{selectedLeave.start_date}</div>
                            </div>
                            <div>
                              <div style={{ color: '#888', fontSize: 14 }}>End Date</div>
                              <div style={{ fontWeight: 500 }}>{selectedLeave.end_date}</div>
                            </div>
                          </div>
                          <div style={{ color: '#888', fontSize: 14, marginBottom: 4 }}>Reason</div>
                          <div style={{ color: '#222', marginBottom: 18 }}>
                            {selectedLeave.reason || 'No reason provided.'}
                          </div>
                          <button
                            style={{
                              background: '#007BFF',
                              color: '#fff',
                              border: 'none',
                              borderRadius: '8px',
                              padding: '8px 22px',
                              fontWeight: 500,
                              fontSize: '16px',
                              cursor: 'pointer'
                            }}
                            onClick={() => setViewModalOpen(false)}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default EmployeeLeave;
