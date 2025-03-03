// import React, { useState, useEffect } from 'react';
// import Sidebar from '../components/Sidebar';
// import test from '../assets/test.png';
// import '../pages/EmployeeManagment.css';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fas } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Link } from 'react-router-dom';
// import EmployerNavbar from '../components/EmployerNavbar';

// library.add(fas);

// const EmployeeCard = ({ employee, onToggleDropdown, isDropdownOpen, onCardClick }) => {

//   const handleCardClick = (employee) => {
//     localStorage.setItem("selectedEmployee", JSON.stringify(employee));
//   };
  
  
//   return (
//   <div
//    onClick={() => handleCardClick(employee)}
//    style={{
//      backgroundColor: "#fff",
//      borderRadius: "12px",
//      boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)", // Adds shadow to the card
//      padding: "20px",
//      maxWidth: "300px",
//      margin: "10px",
//      position: "relative",
//      transition: "transform 0.3s ease-in-out",
//      cursor: "pointer", // Optional: to indicate clickability
//    }}
// >

//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//         }}
//       >
//         <img
//           src={test} // Replace with dynamic image if available
//           alt="Profile"
//           style={{
//             width: "60px",
//             height: "60px",
//             borderRadius: "50%", // Circular image
//             objectFit: "cover",
//             border: "2px solid #ddd", // Light border for the image
//           }}
//         />
//         <p onClick={() => onToggleDropdown(employee.employee_id)}>
//           <FontAwesomeIcon
//             icon="fa-solid fa-ellipsis-vertical"
//             style={{
//               fontSize: "20px",
//               color: "#333",
//               cursor: "pointer",
//             }}
//           />
//         </p>

//         {isDropdownOpen && (
//           <div
//             style={{
//               position: "absolute",
//               right: "20px",
//               top: "60px", // Adjusted the position to be under the icon
//               backgroundColor: "#fff",
//               borderRadius: "8px",
//               boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
//               zIndex: "1000",
//               minWidth: "150px", // Ensures the buttons are wide enough
//               padding: "10px 0",
//             }}
//           >
//             <Link to="/employee-managment/suspend-employee">
//               <button
//                 style={{
//                   width: "100%",
//                   padding: "10px",
//                   backgroundColor: "#fff",
//                   border: "none",
//                   color: "#2e2e2e",
//                   borderRadius: "5px",
//                   cursor: "pointer",
//                   textAlign: "center", // Aligns the text in the button
//                   marginBottom: "5px", // Adds space between buttons
//                   transition: "background-color 0.3s ease", // Smooth hover effect
//                 }}
//               >
//                 Suspend Employee
//               </button>
//             </Link>
//             <Link to="/employee-managment/deactivate-employee">
//               <button
//                 style={{
//                   width: "100%",
//                   padding: "10px",
//                   backgroundColor: "#fff",
//                   border: "none",
//                   color: "#2e2e2e",
//                   borderRadius: "5px",
//                   cursor: "pointer",
//                   textAlign: "center", // Aligns the text in the button
//                   transition: "background-color 0.3s ease", // Smooth hover effect
//                 }}
//               >
//                 Deactivate Employee
//               </button>
//             </Link>
//           </div>
//         )}
//       </div>
//       <h1
//         style={{
//           fontSize: "18px",
//           fontWeight: "600",
//           color: "#333",
//           marginTop: "15px",
//           marginBottom: "5px",
//         }}
//       >
//         {employee.name || "No Name"}
//       </h1>
//       <h2
//         style={{
//           fontSize: "14px",
//           fontWeight: "400",
//           color: "#777",
//           marginBottom: "10px",
//         }}
//       >
//         {employee.job_title || "Not Assigned"}
//       </h2>
//       <hr
//         style={{
//           margin: "10px 0",
//           border: "none",
//           borderTop: "1px solid #ddd",
//         }}
//       />
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           fontSize: "14px",
//           color: "#555",
//         }}
//       >
//         <div>
//           <h3
//             style={{
//               fontSize: "12px",
//               fontWeight: "600",
//               marginBottom: "5px",
//             }}
//           >
//             Department
//           </h3>
//           <h4>{employee.department || 'N/A'}</h4>
//         </div>
//         <div>
//           <h3
//             style={{
//               fontSize: "12px",
//               fontWeight: "600",
//               marginBottom: "5px",
//             }}
//           >
//             ID Number
//           </h3>
//           <h4>{employee.employee_id}</h4>
//         </div>
//       </div>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           fontSize: "14px",
//           color: "#555",
//           marginTop: "15px",
//         }}
//       >
//         <div>
//           <h3
//             style={{
//               fontSize: "12px",
//               fontWeight: "600",
//               marginBottom: "5px",
//             }}
//           >
//             Status
//           </h3>
//           <h4
//             style={{
//               fontSize: "14px",
//               fontWeight: "500",
//               color: employee.employment_status === "Active" ? "#5cb85c" : "#d9534f",
//               backgroundColor: employee.employment_status === "Active" ? "#dff0d8" : "#f2dede",
//               padding: "5px 10px",
//               borderRadius: "15px",
//             }}
//           >
//             {employee.employment_status || "Active"}
//           </h4>
//         </div>
//         <div>
//           <Link to={`/employee-managment/view-profile?employee_id=${employee.employee_id}`}>
//             <button
//               style={{
//                 padding: "8px 15px",
//                 backgroundColor: "#0275d8",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: "5px",
//                 cursor: "pointer",
//               }}
//             >
//               View Profile
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// const EmployeeManagement = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       setLoading(true);
//       try {
//         const companyId = localStorage.getItem("company_id");
//         if (!companyId) throw new Error("Company ID is missing.");

//         const storedAuthData = localStorage.getItem("authData");
//         if (!storedAuthData) throw new Error("Authentication data is missing.");

//         const authData = JSON.parse(storedAuthData);
//         const token = authData?.token;
//         if (!token) throw new Error("Authentication token is missing.");

//         const apiUrl = `https://proximahr.onrender.com/employee-management/all-employees?company_id=${companyId}&page=1&page_size=10`;

//         console.log("Fetching from:", apiUrl);

//         const response = await fetch(apiUrl, {
//           method: "GET",
//           headers: {
//             "Authorization": `Bearer ${token}`,
//             "Content-Type": "application/json"
//           }
//         });

//         const result = await response.json();
//         console.log("API Response:", result);

//         if (!response.ok) {
//           throw new Error(result.detail || `Error: ${response.status}`);
//         }

//         setEmployees(result.data || []); // ✅ Corrected to store employees properly
//       } catch (err) {
//         console.error("Error fetching employee details:", err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEmployees();
//   }, []);

//   const toggleDropdown = (id) => {
//     setActiveDropdown((prev) => (prev === id ? null : id));
//   };
  

//   return (
//     <div>
//       <div className="main-dashboard">
//         <Sidebar />
//         <div className="dashboard">

//           <div className="slide-one-1">
//             <EmployerNavbar />
//           </div>
      
//           <hr className="horizontal" />
//           <div className="dashboard-details">
//             <h5>Employee Management</h5>
//             <h6>{new Date().toDateString()}</h6>
//           </div>
//           <div className="number-of-employee">
//             <div className="div-1">
//               <h2>{employees.length} Total Employees</h2>
//             </div>
//             <div className="div-3">
//               <div className="btn-8">
//                 <button onClick={() => setIsOpen(!isOpen)}>
//                   <FontAwesomeIcon icon="fa-solid fa-filter" /> Filter
//                 </button>
//               </div>
//               {isOpen && (
//                 <div className="dropdownstyle">
//                   <p>All</p>
//                   <p>Engineering</p>
//                   <p>Design</p>
//                   <p>Marketing</p>
//                   <p>Sales</p>
//                   <p>Data Science</p>
//                   <p>Operations</p>
//                 </div>
//               )}
//               <div className="btn">
//                 <Link to="/employee-managment/add-employee">
//                   <button>
//                     <FontAwesomeIcon icon="fa-solid fa-plus" /> Add New Employee
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           </div>

//           {loading ? (
//                 <p>Loading employees...</p>
//               ) : error ? (
//                 <div className="error-box">
//                   <p style={{ color: "red", whiteSpace: "pre-wrap" }}>Error: {error}</p>
//                 </div>
//               ) : employees.length > 0 ? (
//                 <div 
//                   className="dashboard-details-2"
//                   style={{
//                     display: "grid",
//                     gridTemplateColumns: "repeat(4, 1fr)", // ✅ 4-column grid
//                     gap: "20px", // ✅ Adds spacing between cards
//                   }}
//                 >
//                 {employees.map((employee) => (
//                   <EmployeeCard
//                     key={employee.employee_id}
//                     employee={employee}
//                     isDropdownOpen={activeDropdown === employee.employee_id}
//                     onToggleDropdown={toggleDropdown}
//                     onCardClick={handleCardClick} // ✅ Pass function as a prop
//                   />
//                 ))}

//                 </div>
//               ) : (
//                 <p>No employees found</p>
//               )}

//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeManagement;

import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import test from '../assets/test.png';
import '../pages/EmployeeManagment.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import EmployerNavbar from '../components/EmployerNavbar';

library.add(fas);

const EmployeeCard = ({ employee, onToggleDropdown, isDropdownOpen, onCardClick }) => {
  return (
    <div
      onClick={() => onCardClick(employee)} // ✅ Stores employee info in local storage when clicked
      style={{
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
        padding: "20px",
        maxWidth: "300px",
        margin: "10px",
        position: "relative",
        transition: "transform 0.3s ease-in-out",
        cursor: "pointer", // ✅ Indicates it's clickable
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <img
          src={test}
          alt="Profile"
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid #ddd",
          }}
        />
        <p onClick={(e) => { e.stopPropagation(); onToggleDropdown(employee.employee_id); }}>
          <FontAwesomeIcon
            icon="fa-solid fa-ellipsis-vertical"
            style={{ fontSize: "20px", color: "#333", cursor: "pointer" }}
          />
        </p>

        {isDropdownOpen && (
          <div style={{
            position: "absolute", right: "20px", top: "60px",
            backgroundColor: "#fff", borderRadius: "8px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)", zIndex: "1000", minWidth: "150px",
            padding: "10px 0"
          }}>
            <Link to="/employee-managment/suspend-employee">
              <button style={{ width: "100%", padding: "10px", border: "none", color: "#2e2e2e", borderRadius: "5px", cursor: "pointer" }}>Suspend Employee</button>
            </Link>
            <Link to="/employee-managment/deactivate-employee">
              <button style={{ width: "100%", padding: "10px", border: "none", color: "#2e2e2e", borderRadius: "5px", cursor: "pointer" }}>Deactivate Employee</button>
            </Link>
          </div>
        )}
      </div>
      <h1 style={{ fontSize: "18px", fontWeight: "600", color: "#333", marginTop: "15px", marginBottom: "5px" }}>{employee.name || "No Name"}</h1>
      <h2 style={{ fontSize: "14px", fontWeight: "400", color: "#777", marginBottom: "10px" }}>{employee.job_title || "Not Assigned"}</h2>
      <hr style={{ margin: "10px 0", border: "none", borderTop: "1px solid #ddd" }} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "14px",
          color: "#555",
        }}
      >
        <div>
          <h3
            style={{
              fontSize: "12px",
              fontWeight: "600",
              marginBottom: "5px",
            }}
          >
            Department
          </h3>
          <h4>{employee.department || 'N/A'}</h4>
        </div>
        <div>
          <h3
            style={{
              fontSize: "12px",
              fontWeight: "600",
              marginBottom: "5px",
            }}
          >
            ID Number
          </h3>
          <h4>{employee.employee_id}</h4>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "14px",
          color: "#555",
          marginTop: "15px",
        }}
      >
        <div>
          <h3
            style={{
              fontSize: "12px",
              fontWeight: "600",
              marginBottom: "5px",
            }}
          >
            Status
          </h3>
          <h4
            style={{
              fontSize: "14px",
              fontWeight: "500",
              color: employee.employment_status === "Active" ? "#5cb85c" : "#d9534f",
              backgroundColor: employee.employment_status === "Active" ? "#dff0d8" : "#f2dede",
              padding: "5px 10px",
              borderRadius: "15px",
            }}
          >
            {employee.employment_status || "Active"}
          </h4>
        </div>
        <div>
          <Link to={`/employee-managment/view-profile?employee_id=${employee.employee_id}`}>
            <button
              style={{
                padding: "8px 15px",
                backgroundColor: "#0275d8",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              View Profile
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const EmployeeManagement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const companyId = localStorage.getItem("company_id");
        if (!companyId) throw new Error("Company ID is missing.");

        const storedAuthData = localStorage.getItem("authData");
        if (!storedAuthData) throw new Error("Authentication data is missing.");

        const authData = JSON.parse(storedAuthData);
        const token = authData?.token;
        if (!token) throw new Error("Authentication token is missing.");

        const apiUrl = `https://proximahr.onrender.com/employee-management/all-employees?company_id=${companyId}&page=1&page_size=10`;

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.detail || `Error: ${response.status}`);
        }

        setEmployees(result.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const toggleDropdown = (id) => {
    setActiveDropdown((prev) => (prev === id ? null : id));
  };

  // ✅ Function to store employee details in local storage
  const handleCardClick = (employee) => {
    localStorage.setItem("selectedEmployee", JSON.stringify(employee));
  };

  return (
    <div>
      <div className="main-dashboard">
        <Sidebar />
        <div className="dashboard">
          <div className="slide-one-1">
            <EmployerNavbar />
          </div>
          <hr className="horizontal" />
          <div className="dashboard-details">
            <h5>Employee Management</h5>
            <h6>{new Date().toDateString()}</h6>
          </div>
          <div className="number-of-employee">
             <div className="div-1">
               <h2>{employees.length} Total Employees</h2>
             </div>
             <div className="div-3">
               <div className="btn-8">
                 <button onClick={() => setIsOpen(!isOpen)}>
                   <FontAwesomeIcon icon="fa-solid fa-filter" /> Filter
                 </button>
               </div>
              {isOpen && (
                <div className="dropdownstyle">
                  <p>All</p>
                  <p>Engineering</p>
                  <p>Design</p>
                  <p>Marketing</p>
                  <p>Sales</p>
                  <p>Data Science</p>
                  <p>Operations</p>
                </div>
              )}
              <div className="btn">
                <Link to="/employee-managment/add-employee">
                  <button>
                    <FontAwesomeIcon icon="fa-solid fa-plus" /> Add New Employee
                  </button>
                </Link>
              </div>
            </div>
          </div>
          {loading ? (
            <p>Loading employees...</p>
          ) : error ? (
            <p style={{ color: "red" }}>Error: {error}</p>
          ) : (
            <div className="dashboard-details-2" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
              {employees.map((employee) => (
                <EmployeeCard
                  key={employee.employee_id}
                  employee={employee}
                  isDropdownOpen={activeDropdown === employee.employee_id}
                  onToggleDropdown={toggleDropdown}
                  onCardClick={handleCardClick} // ✅ Pass function to EmployeeCard
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeManagement;
