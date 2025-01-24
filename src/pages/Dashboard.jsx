// import React from 'react';
// import Sidebar from '../components/Sidebar'
// import test from '../assets/test.png'
// import '../pages/Dashboard.css'
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fas} from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// library.add(fas);

// const dashboard = () => {
  
//   return (
//     <div>
//       <div className="main-dashboard">
//         <Sidebar/>
//         <div className="dashboard">
//         <div className="slide-one-1">
//             <div className="slide-one-1">
//               <div className="name">
//                 <h5>Joseph Dooley</h5>
//                 <h6>Good Morning</h6>
//               </div> 
//             </div>
//             <div className="slide-one-2-1">
//               <div className="notification">
//                 <FontAwesomeIcon icon="fa-solid fa-bell" />
//                 <h6>6</h6>
//               </div>

//               <div className="user-profile">
//                 <img src={test} alt="My profile" className="My-profile" />
//               </div>
//             </div> 
//           </div>

//           <hr className="horizontal" />

//           <div className="dashboard-details">
//             <h5>Department</h5>
//             <h6>24 Thursday October 2024</h6>
//           </div>

//           <div className="dashboard-details-1">
//             <div className="first-grid">
//               <FontAwesomeIcon icon="fa-solid fa-users" className="dashboard-icon"/>
//               <div>
//                 <h6>Total employees</h6>
//                 <h5>40</h5>
//               </div>
//             </div>

//             <div className="first-grid">
//             <FontAwesomeIcon icon="fa-solid fa-building"  className="dashboard-icon"/>
//               <div>
//                 <h6>Department</h6>
//                 <h5>13</h5>
//               </div>
//             </div>

//             <div className="first-grid">
//             <FontAwesomeIcon icon="fa-solid fa-calendar" className="dashboard-icon" />
//               <div>
//                 <h6>Leave requests</h6>
//                 <h5>2</h5>
//               </div>
//             </div>

//             <div className="first-grid">
//             <FontAwesomeIcon icon="fa-solid fa-users" className="dashboard-icon" />
//               <div>
//                 <h6>Attendance Overview</h6>
//                 <h5>92%</h5>
//               </div>
//             </div>
//           </div>

//           <div className="dashboard-details-2">
//             <div className="grid">
//               <h1>Department Overview</h1>
//               <hr />
//               <h5>Number of Department</h5>
//               <h6>13 Department</h6>

//               <div className = "priority">
//               <h5>Total Leaves</h5>
//                 <div>
//                   <h6>32 Total leaves</h6>
//                 </div>
//               </div>

//               <div className="TaskProgress">
//                 <h5>Attendance Rate</h5>
//                 <p>94% compeleted</p>
//                 <h1></h1>
//               </div>

//               <div className="last-div">
//                 <div className="lastdiv-1">
//                     <div><FontAwesomeIcon icon="fa-calendar" /></div>
//                     <div>
//                       <h6>Average Work Hours</h6>
//                       <h5>07:20:03</h5>
//                     </div>
//                 </div>
//                 <button>Manage Task</button>
//               </div>
//             </div>

//             <div className="grid">
//               <h1>Leave Requests</h1>
//               <hr />
//               <h5>Number of pending tasks</h5>
//               <h6>2 pending Tasks</h6>

//               <div className = "priority">
//               <h5>Leave Type</h5>
//                 <div>
//                   <h4>2 pending</h4>
//                   <h3>1 Approved</h3>
//                 </div>
//               </div>

//               <div className="TaskProgress">
//                 <h5>Approval status</h5>
//                 <p>40% Approved</p>
//                 <p></p>
//               </div>

//               <div className="last-div">
//                 <div className="lastdiv-1">
//                     <div><FontAwesomeIcon icon="fa-calendar" /></div>
//                     <div>
//                       <h6>Upcoming Leave Dates</h6>
//                       <h5>oct 20, 2024</h5>
//                     </div>
//                 </div>
//                 <button>Manage Leave</button>
//               </div>
//             </div>
//           </div>

//           <div className="dashboard-details-2">
//             <div className="grid-3">
//               <h1>Payroll Status</h1>
//               <hr />
//               <h5>The current payroll status</h5>
//               <h6>5 pending Tasks</h6>

//               <div className = "priority-3">
//                 <div>
//                   <h4>processing</h4>
//                 </div>
//               </div>

//               <div className="TaskProgress-3">
//                 <h5>Total Payroll</h5>
//                 <p>$200,000</p>
//                 <p></p>
//               </div>

//               <div className="TaskProgress-3">
//                 <h5>Employees Paid</h5>
//                 <p>96% compeleted</p>
//                 <h2>120 of 125 Employees Paid</h2>
//               </div>

//               <div className="last-div-3">
//                 <div className="lastdiv-1-3">
//                     <div><FontAwesomeIcon icon="fa-calendar" /></div>
//                     <div>
//                       <h6>Next Payroll Date</h6>
//                       <h5>oct 31, 2024</h5>
//                     </div>
//                 </div>
//                 <button>Manage Payroll</button>
//               </div>
//             </div>

//             <div className="grid">
//               <h1>Birthdays & Anniversaries</h1>
//               <hr />
//               <h5>Total count of birthdays and annivasaries</h5>
//               <h6>4 upcoming</h6>

//               <div className = "priority">
//               <h5>Events</h5>
//                 <div>
//                   <h6>2 Birthdays</h6>
//                   <h4>2 Annivasaries</h4>
//                 </div>
//               </div>

//               <div className="last-div">
//                 <div className="lastdiv-1">
//                     <div><FontAwesomeIcon icon="fa-calendar" /></div>
//                     <div>
//                       <h6>Birthday</h6>
//                       <h5>John Doe</h5>
//                     </div>
//                 </div>
//                 <div className="lastdiv-1">
//                     <div><FontAwesomeIcon icon="fa-calendar" /></div>
//                     <div>
//                       <h6>One Year Anniversary</h6>
//                       <h5>Emma Clark</h5>
//                     </div>
//                 </div>

//                 {/* <button>Manage Task</button> */}
//               </div>
//             </div>

//           </div>

//         </div>

//       </div>
//     </div>
//   )
// }

// export default dashboard

import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import test from '../assets/test.png';
import '../pages/Dashboard.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EmployerNavbar from '../components/EmployerNavbar';

library.add(fas);

const Dashboard = () => {
  const [attendanceProgress, setAttendanceProgress] = useState(0);
  const [approvalProgress, setApprovalProgress] = useState(0);
  const [employeesPaidProgress, setEmployeesPaidProgress] = useState(0);

  // Simulate fetching data from backend
  useEffect(() => {
    // Replace this with actual API calls
    const fetchData = async () => {
      const backendData = {
        attendanceRate: 94,
        approvalRate: 40,
        employeesPaidRate: 96,
      };
      setAttendanceProgress(backendData.attendanceRate);
      setApprovalProgress(backendData.approvalRate);
      setEmployeesPaidProgress(backendData.employeesPaidRate);
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="main-dashboard">
        <Sidebar />
        <div className="dashboard">
          <div className="slide-one-1">
            <EmployerNavbar/>
          </div>

          <hr className="horizontal" />

          <div className="dashboard-details">
            <h5>Department</h5>
            <h6>24 Thursday October 2024</h6>
          </div>

          <div className="dashboard-details-1">
            <div className="first-grid">
              <FontAwesomeIcon icon="fa-solid fa-users" className="dashboard-icon" />
              <div>
                <h6>Total employees</h6>
                <h5>40</h5>
              </div>
            </div>

            <div className="first-grid">
              <FontAwesomeIcon icon="fa-solid fa-building" className="dashboard-icon" />
              <div>
                <h6>Department</h6>
                <h5>13</h5>
              </div>
            </div>

            <div className="first-grid">
              <FontAwesomeIcon icon="fa-solid fa-calendar" className="dashboard-icon" />
              <div>
                <h6>Leave requests</h6>
                <h5>2</h5>
              </div>
            </div>

            <div className="first-grid">
              <FontAwesomeIcon icon="fa-solid fa-users" className="dashboard-icon" />
              <div>
                <h6>Attendance Overview</h6>
                <h5>92%</h5>
              </div>
            </div>
          </div>

          <div className="dashboard-details-2">
            <div className="grid">
              <h1>Department Overview</h1>
              <hr />
              <h5>Number of Department</h5>
              <h6>13 Department</h6>

              <div className="priority">
                <h5>Total Leaves</h5>
                <div>
                  <h6>32 Total leaves</h6>
                </div>
              </div>

              <div className="TaskProgress">
                <h5>Attendance Rate</h5>
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
                      width: `${attendanceProgress}%`,
                      height: "100%",
                      backgroundColor: "#4caf50",
                      transition: "width 0.3s ease-in-out",
                    }}
                  ></div>
                </div>
                <p>{attendanceProgress}% completed</p>
              </div>

              <div className="last-div">
                <div className="lastdiv-1">
                  <div><FontAwesomeIcon icon="fa-calendar" /></div>
                  <div>
                    <h6>Average Work Hours</h6>
                    <h5>07:20:03</h5>
                  </div>
                </div>
                <button>Manage Task</button>
              </div>
            </div>

            <div className="grid">
              <h1>Leave Requests</h1>
              <hr />
              <h5>Number of pending tasks</h5>
              <h6>2 pending Tasks</h6>

              <div className="priority">
                <h5>Leave Type</h5>
                <div>
                  <h4>2 pending</h4>
                  <h3>1 Approved</h3>
                </div>
              </div>

              <div className="TaskProgress">
                <h5>Approval Status</h5>
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
                      width: `${approvalProgress}%`,
                      height: "100%",
                      backgroundColor: "#2196F3",
                      transition: "width 0.3s ease-in-out",
                    }}
                  ></div>
                </div>
                <p>{approvalProgress}% Approved</p>
              </div>

              <div className="last-div">
                <div className="lastdiv-1">
                  <div><FontAwesomeIcon icon="fa-calendar" /></div>
                  <div>
                    <h6>Upcoming Leave Dates</h6>
                    <h5>Oct 20, 2024</h5>
                  </div>
                </div>
                <button>Manage Leave</button>
              </div>
            </div>
          </div>

          <div className="dashboard-details-2">
            <div className="grid-3">
              <h1>Payroll Status</h1>
              <hr />
              <h5>The current payroll status</h5>
              <h6>5 pending Tasks</h6>

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
                      width: `${employeesPaidProgress}%`,
                      height: "100%",
                      backgroundColor: "#4caf50",
                      transition: "width 0.3s ease-in-out",
                    }}
                  ></div>
                </div>
                <p>{employeesPaidProgress}% completed</p>
              </div>

              <div className="last-div-3">
                <div className="lastdiv-1-3">
                  <div><FontAwesomeIcon icon="fa-calendar" /></div>
                  <div>
                    <h6>Next Payroll Date</h6>
                    <h5>Oct 31, 2024</h5>
                  </div>
                </div>
                <button>Manage Payroll</button>
              </div>
            </div>

            <div className="grid">
              <h1>Birthdays & Anniversaries</h1>
              <hr />
              <h5>Total count of birthdays and anniversaries</h5>
              <h6>4 upcoming</h6>

              <div className="priority">
                <h5>Events</h5>
                <div>
                  <h6>2 Birthdays</h6>
                  <h4>2 Anniversaries</h4>
                </div>
              </div>

              <div className="last-div">
                <div className="lastdiv-1">
                  <div><FontAwesomeIcon icon="fa-calendar" /></div>
                  <div>
                    <h6>Birthday</h6>
                    <h5>John Doe</h5>
                  </div>
                </div>
                <div className="lastdiv-1">
                  <div><FontAwesomeIcon icon="fa-calendar" /></div>
                  <div>
                    <h6>One Year Anniversary</h6>
                    <h5>Emma Clark</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

