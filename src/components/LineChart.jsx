import React, { useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend);

const LineChart = ({ title, data, style }) => {
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
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Payroll Cost',
        data: [3000, 3200, 3100, 3300, 3400, 3500, 3600, 3700, 3800, 3900, 4000, 4100],
        fill: false,
        borderColor: '#36A2EB',
        borderDash: [5, 5],
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || '';
            const value = context.raw || 0;
            return `${label}: ₦${value}`;
          },
        },
      },
    },
  };

  return (
    <div style={style}>
      <h3>{title}</h3>
      <Line ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default LineChart;