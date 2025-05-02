import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import './LeaveManagment.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import EmployerNavbar from "../components/EmployerNavbar";
import { toast } from 'react-toastify';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const LeaveManagment = () => {
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
  const [filter, setFilter] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [leaveStats, setLeaveStats] = useState({
    total: 0,
    pending: 0, 
    approved: 0,
    rejected: 0,
    leaveData: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaveData = async () => {
      setLoading(true);
      setError('');
      try {
        const storedAuthData = localStorage.getItem("authData");
        if (!storedAuthData) throw new Error("Authentication data is missing.");

        const authData = JSON.parse(storedAuthData);
        const token = authData?.access_token;
        if (!token) throw new Error("Authentication token is missing.");

        const apiUrl = `https://proximahr.onrender.com/api/v2/leave-management/?status=${filter}&limit=10&skip=0`;
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch leave data. Status: ${response.status}`);
        }

        const result = await response.json();
        setLeaveStats({
          total: result.leave_count || 0,
          pending: result.pending_leave_count || 0,
          approved: result.approved_leave_count || 0,
          rejected: result.rejected_leave_count || 0,
          leaveData: result.leave_data || [],
        });

        console.log(result.leave_data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveData();
  }, [filter]);

  const handleApprove = async (leaveId) => {
    console.log("Approving leave with ID:", leaveId);
    try {
      const storedAuthData = localStorage.getItem("authData");
      const token = storedAuthData ? JSON.parse(storedAuthData).access_token : null;

      if (!token) {
        throw new Error("Authentication token is missing.");
      }

      const response = await fetch(`https://proximahr.onrender.com/api/v2/leave-management/${leaveId}/approve`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to approve leave request.");
      }

      toast.success("Leave request approved successfully!");
      setFilter('pending'); // Refresh the table
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleReject = async (leaveId) => {
    console.log("Rejecting leave with ID:", leaveId);
    try {
      const storedAuthData = localStorage.getItem("authData");
      const token = storedAuthData ? JSON.parse(storedAuthData).access_token : null;

      if (!token) {
        throw new Error("Authentication token is missing.");
      }

      const response = await fetch(`https://proximahr.onrender.com/api/v2/leave-management/${leaveId}/reject`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to reject leave request.");
      }

      toast.success("Leave request rejected successfully!");
      setFilter('pending'); // Refresh the table
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Process data for CircularChart (Monthly Leave Distribution)
  const monthlyLeaveData = leaveStats.leaveData.reduce((acc, leave) => {
    const month = new Date(leave.start_date).toLocaleString('default', { month: 'long' });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  const circularChartData = Object.entries(monthlyLeaveData).map(([month, count]) => ({
    name: month,
    value: count,
  }));

  // Process data for HorizontalBarChart (Leave Type Distribution)
  const leaveTypeData = leaveStats.leaveData.reduce((acc, leave) => {
    const type = leave.leave_type || 'Unknown';
    acc[type] = (acc[type] || 0) + leave.duration;
    return acc;
  }, {});

  const horizontalBarChartData = Object.entries(leaveTypeData).map(([type, duration]) => ({
    name: type,
    value: duration,
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6464', '#22C55E'];

  return (
    <div>
      <div className="main-dashboard">
        <Sidebar />
        <div className="dashboard">
          <EmployerNavbar />
          <hr className="horizontal" />

          <div className="dashboard-details" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <h5 style={{ marginBottom: '15px' }}>Leave Management</h5>
            <h6>{new Date().toLocaleDateString('en-GB', { day: '2-digit', weekday: 'long', month: 'long', year: 'numeric' })}</h6>
          </div>


          {/* Charts Section */}
          <div className="leave-managment-charts" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', boxShadow:'none' }}>
            <div style={{ width: '48%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff' }}>
              <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>Monthly Leave Distribution</h3>
              {circularChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={circularChartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      label
                    >
                      {circularChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p style={{ textAlign: 'center' }}>No data available for Monthly Leave Distribution</p>
              )}
            </div>
            <div style={{ width: '48%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff' }}>
              <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>Leave Type Distribution</h3>
              {horizontalBarChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={horizontalBarChartData} layout="vertical">
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#82ca9d">
                      {horizontalBarChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p style={{ textAlign: 'center' }}>No data available for Leave Type Distribution</p>
              )}
            </div>
          </div>


          {/* Search and Filter Section */}
            <div className="number-of-employee" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div className="new-div-1" style={{ flex: 1, marginRight: '10px' }}>
              <FontAwesomeIcon icon={fas.faSearch} className="glass-icon" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: 'none' }}
              />
            </div>
            <div className="div-2" style={{ flex: 1 }}>
              <div className="btn" style={{ position: 'relative' }}>
                <button
                  onClick={() => setIsDepartmentOpen(!isDepartmentOpen)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    backgroundColor: '#f8f9fa',
                    cursor: 'pointer',
                  }}
                >
                  <FontAwesomeIcon icon={fas.faFilter} /> Filter
                </button>
                {isDepartmentOpen && (
                  <div
                    className="dropdownstyle department-dropdown"
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      width: '100%',
                      backgroundColor: '#fff',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      zIndex: 10,
                    }}
                  >
                    <p className='filter-drop' onClick={() => setFilter('pending')} style={{ padding: '10px', cursor: 'pointer' }}>
                      Pending Requests
                    </p>
                    <p className='filter-drop' onClick={() => setFilter('approved')} style={{ padding: '10px', cursor: 'pointer' }}>
                      Approved
                    </p>
                    <p className='filter-drop' onClick={() => setFilter('rejected')} style={{ padding: '10px', cursor: 'pointer' }}>
                      Rejected
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="filtered-results">
            <h2>{filter.charAt(0).toUpperCase() + filter.slice(1)} Leave Requests</h2>
            <table>
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Department</th>
                  <th>Leave Type</th>
                  <th>Duration</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                  {filter === 'pending' && <th>Action</th>}
                </tr>
              </thead>
              <tbody>
                {leaveStats.leaveData.length > 0 ? (
                  leaveStats.leaveData
                    .filter((leave) =>
                      leave.employee_details?.name.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((leave, index) => (
                      <tr key={index}>
                        <td>{leave.employee_details?.name || 'N/A'}</td>
                        <td>{leave.employee_details?.department || 'N/A'}</td>
                        <td>{leave.leave_type || 'N/A'}</td>
                        <td>{leave.duration || 'N/A'}</td>
                        <td>{new Date(leave.start_date).toLocaleDateString() || 'N/A'}</td>
                        <td>{new Date(leave.end_date).toLocaleDateString() || 'N/A'}</td>
                        <td
                          style={{
                            color: leave.status === 'approved' ? '#22C55E' : leave.status === 'rejected' ? '#FF6464' : 'inherit',
                            backgroundColor: leave.status === 'approved' ? '#E6F4EA' : leave.status === 'rejected' ? '#FFDFDF' : 'inherit',
                            padding: '5px',
                            borderRadius: '5px',
                          }}
                        >
                          {leave.status || 'N/A'}
                        </td>
                        {filter === 'pending' && (
                          <td>
                            <button
                              onClick={() => handleApprove(leave.leave_id)}
                              style={{
                                marginRight: '10px',
                                backgroundColor: 'green',
                                color: 'white',
                                border: 'none',
                                padding: '5px 10px',
                                cursor: 'pointer',
                              }}
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(leave.leave_id)}
                              style={{
                                backgroundColor: 'red',
                                color: 'white',
                                border: 'none',
                                padding: '5px 10px',
                                cursor: 'pointer',
                              }}
                            >
                              Reject
                            </button>
                          </td>
                        )}
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan="8">No leave requests found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveManagment;
