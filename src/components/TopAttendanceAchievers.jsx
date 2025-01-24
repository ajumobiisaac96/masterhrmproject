import React from 'react';
import './TopAttendanceAchievers.css';

const TopAttendanceAchievers = ({ achievers }) => {
  return (
    <div className="top-attendance">
      <h3>Top Attendance Achievers</h3>
      <ul>
        {achievers.map((employee, index) => (
          <li key={index}>{employee}</li>
        ))}
      </ul>
    </div>
  );
};

export default TopAttendanceAchievers;