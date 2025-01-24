import React from 'react';

const AttendancePerformanceTable = () => {
  // Placeholder data for table rows
  const tableData = [
    {
      department: 'HR',
      totalWorkingDays: 30,
      presentDays: 28,
      absentDays: 1,
      leaveDays: 1,
      undertime: 2,
      attendanceRate: 95,
    },
    {
      department: 'Finance',
      totalWorkingDays: 30,
      presentDays: 27,
      absentDays: 2,
      leaveDays: 1,
      undertime: 3,
      attendanceRate: 90,
    },
    {
      department: 'IT',
      totalWorkingDays: 30,
      presentDays: 26,
      absentDays: 3,
      leaveDays: 1,
      undertime: 4,
      attendanceRate: 85,
    },
    {
      department: 'Marketing',
      totalWorkingDays: 30,
      presentDays: 24,
      absentDays: 4,
      leaveDays: 2,
      undertime: 5,
      attendanceRate: 80,
    },
    {
      department: 'Sales',
      totalWorkingDays: 30,
      presentDays: 23,
      absentDays: 5,
      leaveDays: 2,
      undertime: 6,
      attendanceRate: 75,
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1>Attendance Performance Report</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2', textAlign: 'left' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Department</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Total Working Days</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Present Days</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Absent Days</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Leave Days</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Undertime</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Attendance Rate (%)</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{row.department}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{row.totalWorkingDays}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{row.presentDays}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{row.absentDays}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{row.leaveDays}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{row.undertime}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{row.attendanceRate}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendancePerformanceTable;
