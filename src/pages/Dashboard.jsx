import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import '../pages/Dashboard.css';
import { Link } from "react-router-dom";
import EmployerNavbar from "../components/EmployerNavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faBuilding, faCalendar } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  
  // ✅ State variables for Company Data  
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [newDepartmentCount, setnewDepartmentCount] = useState(0);
  const [pendingLeaveCount, setPendingLeaveCount] = useState(0);
  const [attendancePercentage, setAttendancePercentage] = useState(0);

  // ✅ State variables for Department Overview
  const [departmentCount, setDepartmentCount] = useState(0);
  const [attendanceRate, setAttendanceRate] = useState(0);
  const [approvedLeaveCount, setApprovedLeaveCount] = useState(0);
  const [activeLeaveCount, setActiveLeaveCount] = useState(0);
  const [averageHoursWorked, setAverageHoursWorked] = useState(0);
  
  // ✅ State variables for Leave Overview
  const [pendingLeaves, setPendingLeaves] = useState(0);
  const [monthlyApprovedLeaves, setMonthlyApprovedLeaves] = useState(0);
  const [leaveApprovalRate, setLeaveApprovalRate] = useState(0);

  // ✅ State variables for payroll status
  const [totalPayrollCost, setTotalPayrollCost] = useState(0);
  const [paidPercentage, setPaidPercentage] = useState(0);
  const [paidEmployees, setPaidEmployees] = useState(0);
  const [nextPayrollDate, setNextPayrollDate] = useState("");

  // ✅ State variables for Events Overview
  const [birthdayCount, setBirthdayCount] = useState(0);
  const [birthdays, setBirthdays] = useState([]);
  const [anniversaryCount, setAnniversaryCount] = useState(0);
  const [anniversaries, setAnniversaries] = useState([]);
  const [totalEventCount, setTotalEventCount] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // ✅ Retrieve `company_id`
        const companyId = localStorage.getItem("company_id");
        if (!companyId) {
          throw new Error("Company ID is missing. Please log in again.");
        }
        console.log("Company ID:", companyId);

        // ✅ Retrieve and Validate `authData`
        const storedAuthData = localStorage.getItem("authData");
        if (!storedAuthData) {
          throw new Error("Authentication data is missing. Please log in.");
        }

        let authData;
        try {
          authData = JSON.parse(storedAuthData);
        } catch (error) {
          throw new Error("Invalid authentication data format. Please log in again.");
        }

        const token = authData?.token;
        if (!token) {
          throw new Error("Authentication token is missing. Please log in.");
        }
        console.log("Authentication Token:", token);

        // ✅ API URLs
        const apiUrl = `https://proximahr.onrender.com/dashboard/company-overview?company_id=${companyId}`;
        const departmentApiUrl = `https://proximahr.onrender.com/dashboard/department-overview?company_id=${companyId}`;
        const leaveApiUrl = `https://proximahr.onrender.com/dashboard/leave-overview?company_id=${companyId}`;
        const payrollApiUrl = `https://proximahr.onrender.com/dashboard/payroll-overview?company_id=${companyId}`;
        const eventsApiUrl = `https://proximahr.onrender.com/dashboard/events?company_id=${companyId}`;

        // ✅ Fetch company data
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("API Error Response:", errorData);
          throw new Error(`Failed to fetch company data: ${errorData.detail || response.status}`);
        }

        // ✅ Fetch Department Overview & Leave Overview in Parallel
        const [deptResponse, leaveResponse, eventsResponse] = await Promise.all([
          fetch(departmentApiUrl, {
            method: "GET",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          }),
          fetch(leaveApiUrl, {
            method: "GET",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          }),
          fetch(eventsApiUrl, {
            method: "GET",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          }),
        ]);

        if (!deptResponse.ok) {
          const deptErrorData = await deptResponse.json();
          console.error("Department API Error Response:", deptErrorData);
          throw new Error(`Failed to fetch department overview: ${deptErrorData.detail || deptResponse.status}`);
        }
        if (!leaveResponse.ok) {
          const leaveErrorData = await leaveResponse.json();
          console.error("Leave API Error Response:", leaveErrorData);
          throw new Error(`Failed to fetch leave overview: ${leaveErrorData.detail || leaveResponse.status}`);
        }
        if (!eventsResponse.ok) {
          const eventsErrorData = await eventsResponse.json();
          console.error("Events API Error Response:", eventsErrorData);
          throw new Error(`Failed to fetch events overview: ${eventsErrorData.detail || eventsResponse.status}`);
        }

        // ✅ Fetch payroll data
        const payrollResponse = await fetch(payrollApiUrl, {
          method: "GET",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        });
    
        if (!payrollResponse.ok) {
          const payrollErrorData = await payrollResponse.json();
          console.error("Payroll API Error Response:", payrollErrorData);
          throw new Error(`Failed to fetch payroll overview: ${payrollErrorData.detail || payrollResponse.status}`);
        }

        // ✅ Parse Response Data
        const data = await response.json();
        const deptData = await deptResponse.json();
        const leaveData = await leaveResponse.json();
        const payrollData = await payrollResponse.json();
        const eventsData = await eventsResponse.json();

        // ✅ Update company data State
        setTotalEmployees(data.total_employees);
        setnewDepartmentCount(data.department_count);
        setPendingLeaveCount(data.pending_leave_count);
        setAttendancePercentage(data.attendance_percentage);

        // ✅ Update Department Overview State
        setDepartmentCount(deptData.department_count || 0);
        setAttendanceRate(deptData.attendance_rate || 0);
        setApprovedLeaveCount(deptData.approved_leave_count || 0);
        setActiveLeaveCount(deptData.active_leave_count || 0);
        setAverageHoursWorked(deptData.average_hours_worked || 0);

        // ✅ Update Leave Overview State
        setPendingLeaves(leaveData.pending_leaves || 0);
        setMonthlyApprovedLeaves(leaveData.monthly_approved_leaves || 0);
        setLeaveApprovalRate(leaveData.leave_approval_rate || 0);

        // ✅ Update Payroll Overview State
        setTotalPayrollCost(payrollData.total_payroll_cost || 0);
        setPaidPercentage(payrollData.paid_percentage || 0);
        setPaidEmployees(payrollData.paid_employees || 0);
        setNextPayrollDate(payrollData.next_payroll_date || "N/A");

        // ✅ Update Events Overview State
        setBirthdayCount(eventsData.birthday_count || 0);
        setBirthdays(eventsData.birthdays || []);
        setAnniversaryCount(eventsData.anniversary_count || 0);
        setAnniversaries(eventsData.anniversaries || []);
        setTotalEventCount(eventsData.total_event_count || 0);

      } catch (err) {
        console.error("Error Fetching Data:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div>
      <div className="main-dashboard">
        <Sidebar />
        <div className="dashboard">

            <EmployerNavbar style={{ width: "100%", display: "flex", justifyContent: "space-between" }} />


          <hr className="horizontal" />

          <div className="dashboard-details">
            <h5>Dashboard</h5>
            <h6>{new Date().toDateString()}</h6>
          </div>

           {/* ✅ Dashboard Summary */}
            <div className="dashboard-details-1" style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "space-between" }}>
            <div className="first-grid">
            <FontAwesomeIcon icon={faUsers} className="dashboard-icon" />
            <div>
            <h6>Total Employees</h6>
            <h5>{totalEmployees}</h5>
            </div>
            </div>

            <div className="first-grid">
            <FontAwesomeIcon icon={faBuilding} className="dashboard-icon" />
            <div>
            <h6>Departments</h6>
            <h5>{newDepartmentCount}</h5>
            </div>
            </div>

            <div className="first-grid">
            <FontAwesomeIcon icon={faCalendar} className="dashboard-icon" />
            <div>
            <h6>Pending Leave Requests</h6>
            <h5>{pendingLeaveCount}</h5>
            </div>
            </div>

            <div className="first-grid">
            <FontAwesomeIcon icon={faUsers} className="dashboard-icon" />
            <div>
            <h6>Attendance Overview</h6>
            <h5>{attendancePercentage}%</h5>
            </div>
            </div>
            </div>

          {/* ✅ 2x2 Grid Layout With Adjustable Height */}
          <div className="dashboard-details-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            
            {/* ✅ Department Overview */}
            <div className="grid" style={{ minHeight: "420px"}}>
              <h1>Department Overview</h1>
              <hr />
              <h5>Number of Departments</h5>
              <h6>{departmentCount} Department(s)</h6>
              <div className="priority">
                <h5>Total Approved Leaves</h5>
                <div>
                  <h6>{approvedLeaveCount} Approved Leaves</h6>
                </div>
              </div>
              <div className="priority">
                <h5>Active Leaves</h5>
                <div>
                  <h6>{activeLeaveCount} Active Leaves</h6>
                </div>
              </div>
              <div className="TaskProgress">
                <h5>Attendance Rate</h5>
                <div className="progress-bar">
                  <div style={{ width: `${attendanceRate}%`, backgroundColor: "#4caf50", transition: "width 0.3s ease-in-out" }}></div>
                </div>
                <p>{attendanceRate}% Attendance</p>
              </div>

              <div className="last-div">
                <div className="lastdiv-1">
                  <FontAwesomeIcon icon={faCalendar} />
                  <div>
                    <h6>Average Work Hours</h6>
                    <h5>{averageHoursWorked} Hours/Day</h5>
                  </div>
                </div>
                <Link to="/department"><button style={{ width: '170px', backgroundColor: "#007BFF", color: "#fff"}}>Manage Department</button></Link>
              </div>
            </div>

            {/* ✅ Leave Requests */}
            <div className="grid" style={{ minHeight: "420px"}}>
              <h1>Leave Requests</h1>
              <hr />
              <h5>Pending Leaves</h5>
              <h6>{pendingLeaves} Pending</h6>
              <div className="priority">
                <h5>Leave Type</h5>
                <div>
                  <h4>{pendingLeaves} pending</h4>
                  <h3>{monthlyApprovedLeaves} Approved</h3>
                </div>
              </div>
              <div className="TaskProgress">
                <h5>Approval Status</h5>
                <div className="progress-bar">
                  <div style={{ width: `${leaveApprovalRate}%`, backgroundColor: "#2196F3", transition: "width 0.3s ease-in-out" }}></div>
                </div>
                <p>{leaveApprovalRate}% Approved</p>
              </div>

              <div className="last-div" style={{ marginTop: "65px"}}>
                <div className="lastdiv-1">
                  <FontAwesomeIcon icon={faCalendar} />
                  <div>
                    <h6>Monthly Approved Leaves</h6>
                    <h5>{monthlyApprovedLeaves}</h5>
                  </div>
                </div>
                <Link to={'/LeaveManagment'} ><button style={{ width: '170px', backgroundColor: "#007BFF", color: "#fff"}}>Manage Leaves</button></Link>
              </div>
            </div>

            <div className="grid" style={{ minHeight: "420px", marginBottom: "110px"}}>
                  <h1>Payroll Status</h1>
                  <hr />
                  <h5>Total Payroll Cost</h5>
                  <h6>${totalPayrollCost.toFixed(2)}</h6>

                  <div className="TaskProgress-3">
                    <h5>Employees Paid</h5>
                    <div
                      style={{
                        width: "100%",
                        height: "10px",
                        backgroundColor: "#e0e0e0",
                        borderRadius: "5px",
                        overflow: "hidden",
                        padding: "0 5px",
                      }}
                    >
                      <div
                        style={{
                          width: `${paidPercentage}%`,
                          height: "100%",
                          backgroundColor: "#4caf50",
                          transition: "width 0.3s ease-in-out",
                        }}
                      ></div>
                    </div>
                    <p>{paidPercentage}% completed</p>
                  </div>

                  <div className="last-div-3">
                    <div className="lastdiv-1-3">
                      <div><FontAwesomeIcon icon={faCalendar} /></div>
                      <div >
                        <h6>Next Payroll Date</h6>
                        <h5>{nextPayrollDate}</h5>
                      </div>
                    </div>
                    <Link to={'/PayrollManagement'} ><button style={{ width: '170px', backgroundColor: "#007BFF", color: "#fff"}} >Manage Payroll</button></Link>
                  </div>
                </div>  

            <div className="grid" style={{ minHeight: "420px" , marginBottom: "110px"}}>
              <h1>Birthdays & Anniversaries</h1>
              <hr />
              <h5>Total Upcoming Events</h5>
              <h6>{totalEventCount} events</h6>

              <div className="priority">
                <h5>Upcoming Birthdays</h5>
                {birthdays.length > 0 ? (
                  birthdays.map((birthday, index) => (
                    <h6 key={index}>
                      {birthday.first_name} {birthday.last_name} - {birthday.this_year_birthday}
                    </h6>
                  ))
                ) : (
                  <h6 style={{width: "300px"}} >No upcoming birthdays</h6>
                )}
              </div>

              <div className="priority">
                <h5>Upcoming Anniversaries</h5>
                {anniversaries.length > 0 ? (
                  anniversaries.map((anniversary, index) => (
                    <h6 key={index}>
                      {anniversary.first_name} {anniversary.last_name} - {anniversary.this_year_anniversary}
                    </h6>
                  ))
                ) : (
                  <h6 style={{width: "300px"}}>No upcoming anniversaries</h6>
                )}
              </div>

              <div className="last-div">
                <div className="lastdiv-1">
                  <FontAwesomeIcon icon={faCalendar} />
                  <div>
                    <h6>Manage Events</h6>
                  </div>
                </div>
                {/* <button style={{ width: '170px' }}>Manage Events</button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
