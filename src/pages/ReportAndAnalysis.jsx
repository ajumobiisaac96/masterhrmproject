import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import test from '../assets/test.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LineGraph from '../components/LineGraph';
import TopAttendanceAchievers from '../components/TopAttendanceAchievers';
import ProgressBars from '../components/ProgressBars';
import MonthlyAttendanceTrends from '../components/MonthlyAttendanceTrends';
import './ReportAndAnalysis.css';
import EmployerNavbar from '../components/EmployerNavbar';
import { Link } from 'react-router-dom';
import {
  getOvertimeByDepartment,
  getTopAttendanceAchievers,
  getYearlyAttendanceTrend,
  getDepartmentAttendancePercentage,
  getWorkforceGrowth,
  getAttendanceRate,
  getLeaveUtilization,
  getPayrollCost,
} from '../utils/api';

const ReportAndAnalysis = () => {
  const [overtimeData, setOvertimeData] = useState({});
  const [attendanceRate, setAttendanceRate] = useState(null);
  const [topAttendanceAchievers, setTopAttendanceAchievers] = useState([]);
  const [workforceData, setWorkforceData] = useState(null);
  const [leaveUtilization, setLeaveUtilization] = useState(null);
  const [payrollCost, setPayrollCost] = useState(null);
  const [monthlyAttendanceData, setMonthlyAttendanceData] = useState({});
  const [progressBarData, setProgressBarData] = useState([]);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem('authData'));
    const token = authData?.access_token;
    if (token) {
      setToken(token);
    } else {
      setError('Token not found in localStorage.');
    }
  }, []);

  const fetchData = async () => {
    try {
      const year = 2024;

      // Fetch Overtime Data
      const overtimeResponse = await getOvertimeByDepartment(year, token);
      console.log('Overtime Data:', overtimeResponse);
      setOvertimeData(overtimeResponse.overtime_by_department);

      // Fetch Top Attendance Achievers
      const attendanceResponse = await getTopAttendanceAchievers(year, token);
      console.log('Top Attendance Achievers:', attendanceResponse);
      setTopAttendanceAchievers(attendanceResponse?.best_attendance_records || []);

      // Fetch Yearly Attendance Trend
      const attendanceTrendResponse = await getYearlyAttendanceTrend(year, token);
      console.log('Yearly Attendance Trend:', attendanceTrendResponse);
      setMonthlyAttendanceData(attendanceTrendResponse);

      // Fetch Department Attendance Percentage
      const departmentAttendanceResponse = await getDepartmentAttendancePercentage(token);
      console.log('Department Attendance Percentage:', departmentAttendanceResponse);
      setProgressBarData(departmentAttendanceResponse || []);

      // Fetch Workforce Growth
      const workforceResponse = await getWorkforceGrowth(year, token);
      console.log('Workforce Growth:', workforceResponse);
      setWorkforceData(workforceResponse);

      // Fetch Attendance Rate
      const rateResponse = await getAttendanceRate(token);
      console.log('Attendance Rate:', rateResponse);
      setAttendanceRate(rateResponse);

      // Fetch Leave Utilization
      const leaveUtilizationResponse = await getLeaveUtilization(token);
      console.log('Leave Utilization:', leaveUtilizationResponse);
      setLeaveUtilization(leaveUtilizationResponse);

      // Fetch Payroll Cost
      const payrollResponse = await getPayrollCost(year, token);
      console.log('Payroll Cost:', payrollResponse);
      setPayrollCost(payrollResponse);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data.');
    }
  };

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  const getTrendColor = (trend) => {
    if (trend <= 30) return 'red'; // Less than or equal to 30%
    if (trend > 30 && trend <= 50) return 'yellow'; // Between 30% and 50%
    return 'green'; // Anything greater than 50%
  };

  return (
    <div className="main-dashboard">
      <Sidebar />
      <div className="dashboard">
      <EmployerNavbar />
          <hr className="horizontal" />
          <div className="dashboard-details" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <h5 style={{ marginBottom: '15px' }}>Report and Analysis </h5>
              <h6>{new Date().toDateString()}</h6>
          </div>

        {/* Cards Layout */}
        <div className="dashboard-details-1">
          <div className="card-container">
            {/* Total Workforce */}
            <div className="card-item">
              <FontAwesomeIcon icon="fa-circle-check" className="dashboard-icon-1" style={{ color: '#22C55E' }} />
              <div>
                <h6>Total workforce</h6>
                <h5>{workforceData ? workforceData.current_workforce : 'No data available'}</h5>
                <h6 style={{ color: getTrendColor(workforceData?.trend) }}>
                  {workforceData?.trend !== undefined ? `${workforceData.trend}%` : 'No trend available'}
                </h6>
              </div>
            </div>

            {/* Attendance Rate */}
            <div className="card-item">
              <FontAwesomeIcon icon="fa-solid fa-calendar" className="dashboard-icon-2" style={{ color: '#007BFF' }} />
              <div>
                <h6>Attendance Rate</h6>
                <h5>{attendanceRate ? `${attendanceRate.current_month_attendance_rate}%` : 'No data available'}</h5>
                <h6 style={{ color: getTrendColor(attendanceRate?.attendance_trend) }}>
                  {attendanceRate?.attendance_trend !== undefined ? `${attendanceRate.attendance_trend}%` : 'No trend available'}
                </h6>
              </div>
            </div>

            {/* Leave Utilization */}
            <div className="card-item">
              <FontAwesomeIcon icon="fa-solid fa-leaf" className="dashboard-icon-3" style={{ color: '#6F42C1' }} />
              <div>
                <h6>Leave Utilization</h6>
                <h5>{leaveUtilization ? `${leaveUtilization.current_month_leave_utilization}%` : 'No data available'}</h5>
                <h6 style={{ color: getTrendColor(leaveUtilization?.leave_trend) }}>
                  {leaveUtilization?.leave_trend !== undefined ? `${leaveUtilization.leave_trend}%` : 'No trend available'}
                </h6>
              </div>
            </div>

            {/* Payroll Cost */}
            <div className="card-item">
              <FontAwesomeIcon icon="fa-solid fa-dollar-sign" className="dashboard-icon-4" style={{ color: '#FF6464' }} />
              <div>
                <h6>Payroll Cost</h6>
                <h5>{payrollCost ? `N${Number(payrollCost.payroll_cost).toLocaleString()}` : 'No data available'}</h5>
                <h6 style={{ color: getTrendColor(payrollCost?.trend) }}>
                  {payrollCost?.trend !== undefined ? `${payrollCost.trend}%` : 'No trend available'}
                </h6>
              </div>
            </div>
          </div>
        </div>

        {/* Graphs and Achievers */}
        <div className="graphs-container">
        {/* Top Overtime Hours by Department */}
        <div className="graph-item" style={{ width: '60%'}}>
          <h4>Top Overtime Hours by Department</h4>
          {overtimeData && Object.keys(overtimeData).length > 0 ? (
            <LineGraph data={overtimeData} type="overtime" />
          ) : (
            <div className="no-data-message">
              <p>No data available for overtime hours. Please check back later.</p>
            </div>
          )}
        </div>



        {/* Top Attendance Achievers */}
        <div className="graph-item"  style={{ width: '35%'}}>
          <h4>Top Attendance Achievers</h4>
          {topAttendanceAchievers && topAttendanceAchievers.length > 0 ? (
            <div>
              {topAttendanceAchievers.map((achiever, index) => (
                <div key={index} className="achiever-card">
                  <h5>{achiever.name}</h5>
                  <p>{achiever.job_title}</p>
                  <div className="rating">
                    <span>{'⭐'.repeat(achiever.rating)} </span>
                    <span>{achiever.rating}/5</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-data-message">
              <p>No top attendance achievers found. Please check back later.</p>
            </div>
          )}
        </div>
      </div>


        {/* Button */}
        <Link to={'/ReportAndAnalysis/OvertimeHours'}>
          <button className="view-button" style={{marginLeft:'750px'}}>View Department Overtime Hours</button>
        </Link>


      <div className="graphs-container" style={{ display:'flex', marginTop: '2rem', width: '100%' }}>
        {/* Top Monthly Attendance by Department */}
        <div className="graph-item" style={{ width: '60%'}}>
        <h4>Top Monthly Attendance by Department</h4>
        {monthlyAttendanceData && Object.keys(monthlyAttendanceData).length > 0 ? (
          <LineGraph data={monthlyAttendanceData} type="attendance" />
        ) : (
          <div className="no-data-message">
            <p>{monthlyAttendanceData?.message || 'No data available.'}</p>
          </div>
        )}
      </div>


        {/* Monthly Attendance Trends */}
          <div className="graph-item" style={{ width: '35%'}}>
          <h4>Monthly Attendance Trends</h4>
          {monthlyAttendanceData && Object.keys(monthlyAttendanceData).length > 0 ? (
            <LineGraph data={monthlyAttendanceData} type="attendance" />
          ) : (
            <div className="no-data-message">
              <p>No data available for monthly attendance trends. Please check back later.</p>
            </div>
          )}
        </div>


        
      </div>


        {/* Button */}
        <Link to={'/ReportAndAnalysis/AttendancePerformanceTable'}>
          <button className="view-button" style={{marginLeft:'750px'}}>View Attendance performance</button>
        </Link>
      </div>
    </div>
  );
};

export default ReportAndAnalysis;
