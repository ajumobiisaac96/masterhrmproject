// import React, { useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import 'chart.js/auto';
// import './LineGraph.css';

// const LineGraph = ({ data }) => {
//   const [selectedMonth, setSelectedMonth] = useState('January');

//   const handleMonthChange = (event) => {
//     setSelectedMonth(event.target.value);
//   };

//   const months = Object.keys(data);
//   const departments = data[selectedMonth].map((item) => item.department);
//   const overtimeHours = data[selectedMonth].map((item) => item.hours);

//   const chartData = {
//     labels: departments,
//     datasets: [
//       {
//         label: `Overtime Hours for ${selectedMonth}`,
//         data: overtimeHours,
//         backgroundColor: 'rgba(75, 192, 192, 0.6)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//         fill: false,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       tooltip: {
//         callbacks: {
//           label: function (context) {
//             const department = context.label;
//             const hours = context.raw;
//             return `${department}: ${hours} hours`;
//           },
//         },
//       },
//     },
//   };

//   return (
//     <div className="line-graph-container">
//       <h3>Top Overtime Hours by Department</h3>
//       <select value={selectedMonth} onChange={handleMonthChange}>
//         {months.map((month) => (
//           <option key={month} value={month}>
//             {month}
//           </option>
//         ))}
//       </select>
//       <Line data={chartData} options={options} />
//     </div>
//   );
// };

// export default LineGraph;
















import React from 'react';
import './LineGraph.css';  // Add any custom styles if needed

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
          return <div key={month}>Invalid data for {month}</div>;
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
