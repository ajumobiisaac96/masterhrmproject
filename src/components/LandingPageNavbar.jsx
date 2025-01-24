import React, { useState } from 'react';
import Attendance from '../assets/Attendance-LandingPage.jpg'; // Replace with your actual imports
import Department from '../assets/Department-LandingPage.jpg';
import Report from '../assets/Report-LandingPage.jpg';
import Employee from '../assets/EmployeeManagment.jpg';
import Payroll from '../assets/PayrollManagment.jpg';
import Leave from '../assets/LeaveManagment.jpg';
import '../components/LandingPageNavbar.css';

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState("attendance");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="LandingPage-Navbar">
        <ul>
          <li
            className={activeTab === "attendance" ? "active" : ""}
            onClick={() => handleTabClick("attendance")}
          >
            Attendance and Tracking
          </li>
          <li
            className={activeTab === "department" ? "active" : ""}
            onClick={() => handleTabClick("department")}
          >
            Department
          </li>
          <li
            className={activeTab === "reportAnalysis" ? "active" : ""}
            onClick={() => handleTabClick("reportAnalysis")}
          >
            Report and Analysis
          </li>
          <li
            className={activeTab === "employeeManagement" ? "active" : ""}
            onClick={() => handleTabClick("employeeManagement")}
          >
            Employee Management
          </li>
          <li
            className={activeTab === "payrollManagement" ? "active" : ""}
            onClick={() => handleTabClick("payrollManagement")}
          >
            Payroll Management
          </li>
          <li
            className={activeTab === "leaveManagement" ? "active" : ""}
            onClick={() => handleTabClick("leaveManagement")}
          >
            Leave Management
          </li>
        </ul>
      </nav>

      {/* Content */}
      <div className="display-nav-image">
        {activeTab === "attendance" && (
          <div className="attendance active-content">
            <div className="left">
              <h1>Attendance and Tracking</h1>
              <p>
                Monitor and record employee attendance seamlessly with precision.
                Clock-ins, track hours worked, and reduce manual errors, ensuring
                accurate and up-to-date attendance records. Perfect for managing
                in-office, remote, and hybrid employees with ease.
              </p>
            </div>
            <div className="right">
              <img src={Attendance} alt="Attendance" />
            </div>
          </div>
        )}

        {activeTab === "department" && (
          <div className="department active-content">
            <div className="left">
              <h1>Department</h1>
              <p>
                Organize and structure your workforce into manageable departments.
                Assign roles and track departmental attendance. A better-organized
                workforce leads to increased productivity and accountability.
              </p>
            </div>
            <div className="right">
              <img src={Department} alt="Department" />
            </div>
          </div>
        )}

        {activeTab === "reportAnalysis" && (
          <div className="ReportAnalysis active-content">
            <div className="left">
              <h1>Report and Analysis</h1>
              <p>
                Make data-driven decisions with robust reporting tools. Get detailed
                insights into workforce attendance patterns, payroll summaries, and
                leave trends. Tailor reports to your needs and export them with ease
                for further analysis.
              </p>
            </div>
            <div className="right">
              <img src={Report} alt="Report and Analysis" />
            </div>
          </div>
        )}

        {activeTab === "employeeManagement" && (
          <div className="EmployeeManagement active-content">
            <div className="left">
              <h1>Employee Management</h1>
              <p>
                Centralize all employee information in one secure platform. From
                personal details and employment data history to attendance records,
                access everything you need in just a few clicks. Keep your data
                organized, secure, and always up-to-date.
              </p>
            </div>
            <div className="right">
              <img src={Employee} alt="Employee Management" />
            </div>
          </div>
        )}

        {activeTab === "payrollManagement" && (
          <div className="PayrollManagement active-content">
            <div className="left">
              <h1>Payroll Management</h1>
              <p>
                Simplify the complexities of payroll with automated salary
                calculations. Handle taxes, deductions, and allowances effortlessly,
                while ensuring compliance with local regulations. Save time, minimize
                errors, and deliver accurate paychecks every time.
              </p>
            </div>
            <div className="right">
              <img src={Payroll} alt="Payroll Management" />
            </div>
          </div>
        )}

        {activeTab === "leaveManagement" && (
          <div className="LeaveManagement active-content">
            <div className="left">
              <h1>Leave Management</h1>
              <p>
                Empower your workforce with a smooth leave management system. Enable
                employees to submit leave requests, view balances, and check approvals
                instantly. Streamline leave scheduling to prevent conflicts and maintain
                productivity.
              </p>
            </div>
            <div className="right">
              <img src={Leave} alt="Leave Management" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;