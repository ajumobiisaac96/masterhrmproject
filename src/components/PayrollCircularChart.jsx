import React, { useEffect, useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PayrollCircularChart = ({ title, data, style }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartInstance = chartRef.current;

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []);

  const chartData = {
    labels: ['Net Pay', 'Deductions', 'Allowances'],
    datasets: [
      {
        data: [60, 25, 15], // Percentages
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: ${value}%`;
          },
        },
      },
      legend: {
        display: true,
        position: 'right',
        labels: {
          generateLabels: function (chart) {
            const data = chart.data;
            return data.labels.map((label, index) => ({
              text: `${label}: ${data.datasets[0].data[index]}%`,
              fillStyle: data.datasets[0].backgroundColor[index],
              fontSize: 10, // Reduce font size
            }));
          },
        },
      },
    },
  };

  return (
    <div style={style}>
      <h3>{title}</h3>
      <Doughnut ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default PayrollCircularChart;