import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './MonthlyAttendanceTrends.css';

const MonthlyAttendanceTrends = ({ data }) => {
  const months = Object.keys(data);
  const attendancePercentages = months.map((month) => data[month]);

  const chartData = {
    labels: months,
    datasets: [
      {
        label: 'Monthly Attendance Percentage',
        data: attendancePercentages,
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const month = context.label;
            const percentage = context.raw;
            return `${month}: ${percentage}%`;
          },
        },
      },
    },
  };

  return (
    <div className="monthly-attendance-trends-container">
      <h3>Monthly Attendance Trends</h3>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default MonthlyAttendanceTrends;