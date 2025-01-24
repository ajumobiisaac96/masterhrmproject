import React from 'react';
import './ProgressBars.css';

const ProgressBars = ({ data }) => {
  return (
    <div className="progress-bars">
      <h3>Top Monthly Attendance by Department</h3>
      {data.map((item, index) => (
        <div key={index} className="progress-bar-container">
          <span>{item.department}</span>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${item.percentage}%` }}>
              {item.percentage}%
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProgressBars;