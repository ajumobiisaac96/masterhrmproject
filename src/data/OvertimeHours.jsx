import React from 'react';

const OvertimeHoursTable = ({ overtimeData }) => {
  // Calculate total hours, average hours, and top contributor for each department
  const calculateOvertimeStats = (data) => {
    if (!data || typeof data !== "object") {
      console.error("Invalid overtime data:", data);
      return []; // Return an empty array to avoid crashes
    }

    return Object.entries(data).flatMap(([month, departments]) => {
      if (!Array.isArray(departments)) {
        console.error(`Expected departments to be an array for month ${month}, but got:`, departments);
        return [];
      }

      return departments.map(({ department, hours }) => {
        // Calculate total overtime hours
        const totalOvertime = departments.reduce((sum, dept) => sum + (dept.hours || 0), 0);

        // Calculate average overtime hours by employee (assuming equal distribution)
        const averageOvertime = (hours / departments.length || 0).toFixed(2);

        // Assume the top contributor is the department with the highest hours in the month
        const topContributor = departments.reduce((prev, current) =>
          (prev.hours || 0) > (current.hours || 0) ? prev : current
        ).department;

        return {
          month,
          department,
          totalOvertime,
          averageOvertime,
          topContributor,
        };
      });
    });
  };

  const overtimeStats = calculateOvertimeStats(overtimeData);

  return (
    <div className="overtime-table-container">
      <h3>Overtime Hours Report</h3>
      <table border="1" className="overtime-table">
        <thead>
          <tr>
            <th>Month</th>
            <th>Department</th>
            <th>Total Overtime Hours</th>
            <th>Average Overtime per Employee</th>
            <th>Top Contributor</th>
          </tr>
        </thead>
        <tbody>
          {overtimeStats.map((stat, index) => (
            <tr key={index}>
              <td>{stat.month}</td>
              <td>{stat.department}</td>
              <td>{stat.totalOvertime}</td>
              <td>{stat.averageOvertime}</td>
              <td>{stat.topContributor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OvertimeHoursTable;
