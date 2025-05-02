import React from 'react';
import './LineGraph.css'; // Add any custom styles if needed

const LineGraph = ({ data, type }) => {
  if (!data || Object.keys(data).length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div>
      {Object.keys(data).map((month) => {
        const monthData = data[month];

        // Check if the monthData is an array before using .map()
        if (!Array.isArray(monthData)) {
          return (
            <div key={month} className="error-message">
              <p style={{marginTop:'80px', fontFamily:'Inter', fontWeight:'500', fontSize:'18px', lineHeight:'20px'}}>Data for {month} is unavailable or improperly formatted. Please check back later.</p>
            </div>
          );
        }

        return (
          <div key={month}>
            <h4>{month}</h4>
            <ul>
              {monthData.map((item, index) => (
                <li key={index}>{`${item.department}: ${item.hours || item.attendance} hours`}</li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default LineGraph;
