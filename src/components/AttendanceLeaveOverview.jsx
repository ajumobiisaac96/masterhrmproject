import React, { useState } from "react";
import "./AttendanceLeaveOverview.css";

const AttendanceLeaveOverview = () => {
  const [month, setMonth] = useState("November 2024");

  const handleMonthChange = (direction) => {
    // Logic for changing months
    console.log(direction);
  };

  return (
    <div className="attendance-container">
      <div className="attendance-grid">
        {/* Monthly Attendance */}
        <div className="card calendar-card">
          <h2>Monthly Attendance</h2>
          <div className="month-navigation">
            < p onClick={() => handleMonthChange("prev")}>&lt;</p>
            <span>{month}</span>
            <p onClick={() => handleMonthChange("next")}>&gt;</p>
          </div>
          <div className="calendar">
            {"Sun Mon Tue Wed Thu Fri Sat".split(" ").map((day) => (
              <div key={day} className="day-header">
                {day}
              </div>
            ))}
            {Array.from({ length: 30 }, (_, i) => i + 1).map((date) => (
              <div
                key={date}
                className={`date ${
                  date === 14 || date === 15
                    ? "absent"
                    : date === 6 || date === 28
                    ? "undertime"
                    : date === 3 || date === 24 || date === 5
                    ? "leave"
                    : "present"
                }`}
              >
                {date}
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Leave Overview and Recent Leave History */}
        <div className="right-side">
          <div className="card leave-overview-card">
            <h2>Leave Overview</h2>
            <div className="leave-overview">
              <p>Total Vacation Days: <span>30</span></p>
              <p>Used Leave Days: <span>20</span></p>
              <p>Remaining Leave Days: <span>10</span></p>
              <p>Pending Leave Requests: <span>1</span></p>
            </div>
          </div>

          <div className="card leave-history-card">
            <h2>Recent Leave History</h2>
            <div className="leave-history">
              <p>
                Parental Leave: <span className="pending">Pending</span>
                <br />
                Nov 15, 2024 - Nov 20, 2024
              </p>
              <p>
                Sick Leave: <span className="approved">Approved</span>
                <br />
                Jun 15, 2024 - Jul 21, 2024
              </p>
              <p>
                Sick Leave: <span className="approved">Approved</span>
                <br />
                Feb 12, 2024 - Feb 20, 2024
              </p>
              <p>
                Personal Leave: <span className="rejected">Rejected</span>
                <br />
                Jan 15, 2024 - Jan 26, 2024
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceLeaveOverview;
