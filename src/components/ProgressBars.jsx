// import React from 'react';
// import './ProgressBars.css';

// const ProgressBars = ({ data }) => {
//   return (
//     <div className="progress-bars">
//       <h3>Top Monthly Attendance by Department</h3>
//       {data.map((item, index) => (
//         <div key={index} className="progress-bar-container">
//           <span>{item.department}</span>
//           <div className="progress-bar">
//             <div className="progress" style={{ width: `${item.percentage}%` }}>
//               {item.percentage}%
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ProgressBars;







import React from 'react';
import './ProgressBars.css';  // Add any custom styles if needed

const ProgressBars = ({ data, type }) => {
  if (!Array.isArray(data)) {
    if (data.message) {
      return <div>{data.message}</div>; // Show the error message
    }
    console.error("ProgressBars: Expected an array, but received:", data);
    return <div>No data available</div>;
  }

  // If type is "attendance", render department attendance percentages
  if (type === "attendance") {
    return (
      <div>
        <h3>Top Monthly Attendance by Department</h3>
        {data.map((item, index) => (
          <div key={index}>
            <h4>{item.department}</h4>
            <div style={{ width: `${item.percentage}%`, backgroundColor: 'green', height: '20px' }}>
              {item.percentage}%
            </div>
          </div>
        ))}
      </div>
    );
  }

  // If type is "overtime", render overtime progress bars
  if (type === "overtime") {
    return (
      <div>
        <h3>Top Overtime Hours by Department</h3>
        {data.map((item, index) => (
          <div key={index}>
            <h4>{item.department}</h4>
            <div style={{ width: `${item.hours}%`, backgroundColor: 'blue', height: '20px' }}>
              {item.hours} hours
            </div>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default ProgressBars;
