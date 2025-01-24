import React from 'react';
import Sidebar from '../components/Sidebar';
import test from '../assets/test.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LineGraph from '../components/LineGraph';
import TopAttendanceAchievers from '../components/TopAttendanceAchievers';
import ProgressBars from '../components/ProgressBars';
import MonthlyAttendanceTrends from '../components/MonthlyAttendanceTrends';
import './ReportAndAnalysis.css';
import { Link } from 'react-router-dom';

// Placeholder data for the line graph
const overtimeData = {
  January: [
    { department: 'HR', hours: 120 },
    { department: 'Finance', hours: 150 },
    { department: 'IT', hours: 180 },
    { department: 'Marketing', hours: 100 },
    { department: 'Sales', hours: 90 },
  ],
  February: [
    { department: 'HR', hours: 110 },
    { department: 'Finance', hours: 140 },
    { department: 'IT', hours: 170 },
    { department: 'Marketing', hours: 90 },
    { department: 'Sales', hours: 80 },
  ],
  // Add more months as needed
};

const topAttendanceAchievers = ['Employee 1', 'Employee 2', 'Employee 3', 'Employee 4', 'Employee 5'];

const progressBarData = [
  { department: 'HR', percentage: 95 },
  { department: 'Finance', percentage: 90 },
  { department: 'IT', percentage: 85 },
  { department: 'Marketing', percentage: 80 },
  { department: 'Sales', percentage: 75 },
];

// Placeholder data for the monthly attendance trends graph
const monthlyAttendanceData = {
  January: 95,
  February: 90,
  March: 85,
  April: 80,
  May: 75,
  June: 70,
  July: 65,
  August: 60,
  September: 55,
  October: 50,
  November: 45,
  December: 40,
};

const ReportAndAnalysis = () => {
  return (
      <div className="main-dashboard">
        <Sidebar />
        <div className="dashboard">
        <div className="slide-one-1">
            <div className="slide-one-1">
              <div className="name">
                <h5>Joseph Dooley</h5>
                <h6>Good Morning</h6>
              </div> 
            </div>
            <div className="slide-one-2-1">
              <div className="notification">
                <FontAwesomeIcon icon="fa-solid fa-bell" />
                <h6>6</h6>
              </div>

              <div className="user-profile">
                <img src={test} alt="My profile" className="My-profile" />
              </div>
            </div> 
          </div>
          <hr className="horizontal" />
          <div className="dashboard-details">
            <h5>Report and Analysis</h5>
            <h6>24 Thursday October 2024</h6>
          </div>
          <div className="dashboard-details-1">
            <div className="first-grid">
              <FontAwesomeIcon icon="fa-circle-check" className="dashboard-icon-1" style={{ color: '#22C55E' }} />
              <div>
                <h6>Total work force</h6>
                <h5>28</h5>
              </div>
            </div>
            <div className="first-grid">
              <FontAwesomeIcon icon="fa-solid fa-calendar" className="dashboard-icon-2" style={{ color: '#007BFF' }} />
              <div>
                <h6>Attendance Rate</h6>
                <h5>92.5%</h5>
              </div>
            </div>
            <div className="first-grid">
              <FontAwesomeIcon icon="fa-clock" className="dashboard-icon-3" style={{ color: '#6F42C1' }} />
              <div>
                <h6>Leave Utilization</h6>
                <h5>65%</h5>
              </div>
            </div>
            <div className="first-grid">
              <FontAwesomeIcon icon="fa-solid fa-triangle-exclamation" className="dashboard-icon-4" style={{ color: '#FF6464' }} />
              <div>
                <h6>Payroll cost</h6>
                <h5>N15,300,000</h5>
              </div>
            </div>
          </div>

          <div className="first-graph">
          <div className="graph-container">
            <LineGraph data={overtimeData} />
          </div>
          <TopAttendanceAchievers achievers={topAttendanceAchievers} />
        </div>

        <Link to={'/ReportAndAnalysis/OvertimeHours'} ><button className="view-button" style={{background:'transparent', color:'#2E2E2E', border:'1px solid #D9D9D9', marginLeft:'600px'}} >View Department Overtime Hours</button></Link>
        
        <div className="attendance-trends">
          <div>
            <MonthlyAttendanceTrends data={monthlyAttendanceData} />
          </div>
          <div>
             <ProgressBars data={progressBarData} /> 
          </div>
        </div>

        <Link to={'/ReportAndAnalysis/AttendancePerformanceTable'} ><button className="view-button" style={{background:'transparent', color:'#2E2E2E', border:'1px solid #D9D9D9', marginLeft:'600px'}} >View Attendance Performance</button></Link>

        </div>
        

      </div>
  );
};

export default ReportAndAnalysis;

