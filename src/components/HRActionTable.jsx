import React from 'react';
import './HRActionTable.css'; // Optional: Add CSS file for styling

const HRActionTable = () => {
  const tableData = [
    { action: 'Added new employee', timestamp: '2025-01-09 09:00 AM', status: 'Successful' },
    { action: 'Updated salary details', timestamp: '2025-01-08 02:30 PM', status: 'Completed' },
    { action: 'Approved leave request', timestamp: '2025-01-07 11:00 AM', status: 'Successful' },
    { action: 'Changed department', timestamp: '2025-01-06 04:15 PM', status: 'Completed' },
    { action: 'Generated payroll', timestamp: '2025-01-05 01:45 PM', status: 'Successful' },
    { action: 'Deactivated account', timestamp: '2025-01-04 10:20 AM', status: 'Completed' },
  ];

  return (
    <div className="hr-action-table">
    
    <p style={{fontSize: '16px', color: '#6E6E6E', padding:'8px', fontWeight: '600'}} >Recent System Activity</p>

      <table>
        <thead>
          <tr>
            <th>Action</th>
            <th>Timestamp</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{row.action}</td>
              <td>{row.timestamp}</td>
              <td>{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HRActionTable;
