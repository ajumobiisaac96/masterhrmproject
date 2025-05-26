import React from 'react';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import ChartDataLabels from 'chartjs-plugin-datalabels';
import zoomPlugin from 'chartjs-plugin-zoom';

// Register chart.js components and plugins
ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartDataLabels,
  zoomPlugin
);

const LineGraph = ({ data, type }) => {
  // You can customize title based on type
  const chartTitle = type === 'attendance' ? '' : 'Line Chart';

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows flexible container height
    animation: {
      duration: 1000,
      easing: 'easeOutQuart',
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: val => val + '%',
          stepSize: 10,
          color: '#555',
          font: {
            size: 12,
          },
        },
        grid: {
          color: '#e0e0e0',
          borderColor: '#ccc',
          lineWidth: 1,
        },
        title: {
          display: true,
          text: 'Attendance %',
          font: {
            size: 14,
            weight: 'bold',
          },
          color: '#333',
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#555',
          font: {
            size: 12,
          },
        },
        title: {
          display: true,
          text: 'Month',
          font: {
            size: 14,
            weight: 'bold',
          },
          color: '#333',
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: chartTitle,
        font: {
          size: 18,
          weight: 'bold',
        },
        color: '#222',
        padding: {
          top: 10,
          bottom: 20,
        },
      },
      tooltip: {
        enabled: true,
        mode: 'nearest',
        intersect: false,
        callbacks: {
          label: context => `${context.parsed.y.toFixed(2)}%`,
        },
      },
      datalabels: {
        color: '#22C55E',
        anchor: 'end',
        align: 'top',
        font: { weight: 'bold', size: 12 },
        formatter: value => `${value.toFixed(1)}%`,
      },
      // zoom: {
      //   pan: {
      //     enabled: true,
      //     mode: 'x',
      //     modifierKey: 'ctrl', // Pan only when ctrl key is pressed
      //   },
      //   zoom: {
      //     wheel: {
      //       enabled: true,
      //     },
      //     pinch: {
      //       enabled: true,
      //     },
      //     mode: 'x',
      //   },
      // },
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            size: 14,
            weight: 'bold',
          },
          color: '#333',
        },
      },
    },
    interaction: {
      mode: 'nearest',
      intersect: false,
    },
  };

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineGraph;
