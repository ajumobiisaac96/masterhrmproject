import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const HorizontalBarChart = ({ data }) => {
  const cumulativeData = data.reduce(
    (acc, item) => {
      acc.annualLeave += item.annualLeave;
      acc.sickLeave += item.sickLeave;
      acc.personalLeave += item.personalLeave;
      acc.parentalLeave += item.parentalLeave;
      return acc;
    },
    { annualLeave: 0, sickLeave: 0, personalLeave: 0, parentalLeave: 0 }
  );

  const chartData = {
    labels: ['Annual Leave', 'Sick Leave', 'Personal Leave', 'Parental Leave'],
    datasets: [
      {
        label: 'Number of People',
        data: [
          cumulativeData.annualLeave,
          cumulativeData.sickLeave,
          cumulativeData.personalLeave,
          cumulativeData.parentalLeave
        ],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0'
        ],
      }
    ]
  };

  const options = {
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Leave Types Distribution</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default HorizontalBarChart;