// import React from 'react';
// import './TopAttendanceAchievers.css';

// const TopAttendanceAchievers = ({ achievers }) => {
//   return (
//     <div className="top-attendance">
//       <h3>Top Attendance Achievers</h3>
//       <ul>
//         {achievers.map((employee, index) => (
//           <li key={index}>{employee}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TopAttendanceAchievers;




// src/components/TopAttendanceAchievers.jsx









import React from 'react';
import './TopAttendanceAchievers.css';

const TopAttendanceAchievers = ({ achievers }) => {
  if (!Array.isArray(achievers) || achievers.length === 0) {
    return <div>No top attendance achievers available.</div>;
  }

  return (
    <div>
      <h3>Top Attendance Achievers</h3>
      {achievers.map((achiever, index) => (
        <div key={index}>
          <h4>{achiever.name}</h4>
          <p>{achiever.job_title}</p>
          <p>{achiever.rating} ⭐</p>
        </div>
      ))}
    </div>
  );
};

export default TopAttendanceAchievers;
