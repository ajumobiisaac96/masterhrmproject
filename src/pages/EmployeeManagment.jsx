
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
//   // Determine status styles
//   const isActive = employee.employment_status === "active";
//   const isSuspended = employee.employment_status === "suspended";
//   const statusStyles = {
//     color: isActive ? "#5cb85c" : isSuspended ? "#d9534f" : "#d9534f",  // Red for suspended, green for active
//     backgroundColor: isActive ? "#dff0d8" : isSuspended ? "#f2dede" : "#f2dede",  // Red for suspended, green for active
//     padding: "5px 10px",
//     borderRadius: "15px",
//     fontSize: "12px",
//     fontWeight: "500",
//   };

//   return (
//     <div
//       onClick={() => onCardClick(employee)}
//       style={{
//         backgroundColor: "#fff",
//         borderRadius: "12px",
//         boxShadow: "0 4px 8px rgba(0,0,0,0.1), 0 -4px 8px rgba(0,0,0,0.05), 4px 0 8px rgba(0,0,0,0.05), -4px 0 8px rgba(0,0,0,0.05)",
//         padding: "15px",
//         maxWidth: "250px",
//         margin: "5px",
//         position: "relative",
//         transition: "transform 0.3s ease-in-out",
//         cursor: "pointer",
//         height: "auto",
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//         <img
//           src={employee.profile_image || test}  // Use employee's image or fallback to test.png
//           alt="Profile"
//           style={{
//             width: "50px",
//             height: "50px",
//             borderRadius: "50%",
//             objectFit: "cover",
//             border: "2px solid #ddd",
//           }}
//         />
//         <p onClick={(e) => { e.stopPropagation(); onToggleDropdown(employee.employee_id); }}>
//           <FontAwesomeIcon icon="fa-solid fa-ellipsis-vertical" style={{ fontSize: "18px", color: "#333" }} />
//         </p>

//         {isDropdownOpen && (
//           <div style={{
//             position: "absolute", right: "20px", top: "60px",
//             backgroundColor: "#fff", borderRadius: "8px",
//             boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)", zIndex: "1000", minWidth: "150px",
//             padding: "10px 0"
//           }}>
//             <Link to="/employee-managment/suspend-employee">
//               <button className='employee-btn' style={{ width: "100%", padding: "10px", border: "none", color: "#2e2e2e", borderRadius: "5px", cursor: "pointer" }}>Suspend Employee</button>
//             </Link>
//             <Link to="/employee-managment/deactivate-employee">
//               <button className='employee-btn' style={{ width: "100%", padding: "10px", border: "none", color: "#2e2e2e", borderRadius: "5px", cursor: "pointer" }}>Deactivate Employee</button>
//             </Link>
//           </div>
//         )}
//       </div>

//       <h1 style={{ fontSize: "16px", fontWeight: "600", color: "#333", marginTop: "15px", marginBottom: "5px" }}>{employee.name || "No Name"}</h1>
//       <h2 style={{ fontSize: "12px", fontWeight: "400", color: "#777", marginBottom: "10px" }}>{employee.job_title || "Not Assigned"}</h2>
//       <hr style={{ margin: "10px 0", border: "none", borderTop: "1px solid #ddd" }} />

//       <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#555", marginTop: '-30px' }}>
//         <div>
//           <h3 style={{ fontSize: "10px", fontWeight: "600", marginBottom: "5px" }}>Department</h3>
//           <h4 style={{fontSize:'16px'}}>{employee.department || 'N/A'}</h4>
//         </div>
//         <div>
//           <h3 style={{ fontSize: "10px", fontWeight: "600", marginBottom: "5px" }}>ID Number</h3>
//           <h4 style={{fontSize:'16px'}}>{employee.employee_id}</h4>
//         </div>
//       </div>

//       <h3 style={{ fontSize: "10px", fontWeight: "600", marginBottom: "5px", marginLeft:'10px' }}>Status</h3>

//       <div style={{ display: "flex", justifyContent: "space-between", marginTop: "-15px" , alignItems:'center'}}>
//         <div>
//           <h4 style={statusStyles}>{employee.employment_status || "Active"}</h4>
//         </div>
//         <Link
//           to={`/employee-managment/view-profile`}
//           onClick={(e) => {
//             e.stopPropagation();
//             localStorage.setItem("selectedEmployee_id", employee.employee_id);
//           }}
//         >
//           <button className='viewprofile-btn' style={{
//             padding: "8px 15px",
//             backgroundColor: "#0275d8",
//             color: "#fff",
//             border: "none",
//             borderRadius: "5px",
//             cursor: "pointer"
//           }}>
//             View Profile
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// const EmployeeManagement = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const [employees, setEmployees] = useState([]);
//   const [filteredEmployees, setFilteredEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [departments, setDepartments] = useState([]);
//   const [selectedFilter, setSelectedFilter] = useState("All");

//   useEffect(() => {
//     const fetchEmployeesAndDepartments = async () => {
//       setLoading(true);
//       try {
//         const storedAuthData = localStorage.getItem("authData");
//         if (!storedAuthData) throw new Error("Authentication data is missing.");
  
//         const authData = JSON.parse(storedAuthData);
//         const token = authData?.access_token;
//         if (!token) throw new Error("Authentication token is missing.");
  
//         const apiUrlEmployees = `https://proximahr.onrender.com/api/v2/employee-management/all-employees`;
//         const apiUrlDepartments = `https://proximahr.onrender.com/api/v2/departments`;
  
//         const responseEmployees = await fetch(apiUrlEmployees, {
//           method: "GET",
//           headers: {
//             "Authorization": `Bearer ${token}`,
//             "Content-Type": "application/json"
//           }
//         });
//         const responseDepartments = await fetch(apiUrlDepartments, {
//           method: "GET",
//           headers: {
//             "Authorization": `Bearer ${token}`,
//             "Content-Type": "application/json"
//           }
//         });
  
//         const employeesData = await responseEmployees.json();
//         const departmentsData = await responseDepartments.json();
  
//         if (!responseEmployees.ok) throw new Error("Failed to fetch employees");
//         if (!responseDepartments.ok) throw new Error("Failed to fetch departments");
  
//         // Remove employees with placeholder or invalid data
//         const realEmployees = employeesData.data.filter(employee => employee.name && employee.employee_id);
  
//         setEmployees(realEmployees || []);
//         setDepartments(departmentsData.departments || []);
//         setFilteredEmployees(realEmployees || []);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchEmployeesAndDepartments();
//   }, []);
  

//   const toggleDropdown = (id) => {
//     setActiveDropdown((prev) => (prev === id ? null : id));
//   };

//   const handleFilter = (departmentName) => {
//     setSelectedFilter(departmentName);
//     if (departmentName === "All") {
//       setFilteredEmployees(employees); // Show all employees
//     } else {
//       setFilteredEmployees(employees.filter(emp => emp.department === departmentName)); // Show employees in selected department
//     }
//     setIsOpen(false); // Close the dropdown
//   };

//   const handleCardClick = (employee) => {
//     localStorage.setItem("selectedEmployee", JSON.stringify(employee)); // Stores selected employee
//   };

//   return (
//     <div>
//       <div className="main-dashboard">
//         <Sidebar />
//         <div className="dashboard">
//           <EmployerNavbar />
//           <hr className="horizontal" />
//           <div className="dashboard-details" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
//             <h5 style={{ marginBottom: '15px' }}>Employee Management</h5>
//             <h6>{new Date().toLocaleDateString('en-GB', { day: '2-digit', weekday: 'long', month: 'long', year: 'numeric' })}</h6>
//           </div>
//           <div className="number-of-employee" style={{ marginLeft: "0px", width: 'auto' , marginTop: '20px', marginBottom: '40px' }}>
//             <div className="div-1">
//               <h2>{filteredEmployees.length} Total Employees</h2>
//             </div>
//             <div className="div-3">
//               <div className="btn-8">
//                 <button onClick={() => setIsOpen(!isOpen)}>
//                   <FontAwesomeIcon icon="fa-solid fa-filter" /> Filter
//                 </button>
//               </div>
//               {isOpen && (
//                 <div className="dropdownstyle">
//                   <p onClick={() => handleFilter("All")}>All</p>
//                   {departments.map((dept, index) => (
//                     <p key={index} onClick={() => handleFilter(dept.name)}>{dept.name}</p>
//                   ))}
//                 </div>
//               )}
//               <div className="btn">
//                 <Link to="/employee-managment/add-employee">
//                   <button style={{ border: 'none', backgroundColor: '#0275d8', color: '#fff', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
//                     <FontAwesomeIcon icon="fa-solid fa-plus" style={{fontSize:'18px', marginRight:'10px', marginBottom:'-2px'}} /> Add New Employee
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//           {loading ? (
//             <p>Loading employees...</p>
//           ) : error ? (
//             <p style={{ color: "red" }}>Error: {error}</p>
//           ) : (
//             <div className="dashboard-details-2" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
//               {filteredEmployees.map((employee) => (
//                 <EmployeeCard
//                   key={employee.employee_id}
//                   employee={employee}
//                   isDropdownOpen={activeDropdown === employee.employee_id}
//                   onToggleDropdown={toggleDropdown}
//                   onCardClick={handleCardClick}
//                 />
//               ))}
//             </div>
//           )}
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
  // Determine status styles
  const isActive = employee.employment_status === "active";
  const isSuspended = employee.employment_status === "suspended";
  const statusStyles = {
    color: isActive ? "#5cb85c" : isSuspended ? "#d9534f" : "#d9534f",  // Red for suspended, green for active
    backgroundColor: isActive ? "#dff0d8" : isSuspended ? "#f2dede" : "#f2dede",  // Red for suspended, green for active
    padding: "5px 10px",
    borderRadius: "15px",
    fontSize: "12px",
    fontWeight: "500",
  };

  return (
    <div
      onClick={() => onCardClick(employee)}
      style={{
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1), 0 -4px 8px rgba(0,0,0,0.05), 4px 0 8px rgba(0,0,0,0.05), -4px 0 8px rgba(0,0,0,0.05)",
        padding: "15px",
        maxWidth: "250px",
        margin: "5px",
        position: "relative",
        transition: "transform 0.3s ease-in-out",
        cursor: "pointer",
        height: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <img
          src={employee.profile_image || test}  // Use employee's image or fallback to test.png
          alt="Profile"
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid #ddd",
          }}
        />
        <p onClick={(e) => { e.stopPropagation(); onToggleDropdown(employee.employee_id); }}>
          <FontAwesomeIcon icon="fa-solid fa-ellipsis-vertical" style={{ fontSize: "18px", color: "#333" }} />
        </p>

        {isDropdownOpen && (
          <div style={{
            position: "absolute", right: "20px", top: "60px",
            backgroundColor: "#fff", borderRadius: "8px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)", zIndex: "1000", minWidth: "150px",
            padding: "10px 0"
          }}>
            <Link to="/employee-managment/suspend-employee">
              <button className='employee-btn' style={{ width: "100%", padding: "10px", border: "none", color: "#2e2e2e", borderRadius: "5px", cursor: "pointer" }}>Suspend Employee</button>
            </Link>
            <Link to="/employee-managment/deactivate-employee">
              <button className='employee-btn' style={{ width: "100%", padding: "10px", border: "none", color: "#2e2e2e", borderRadius: "5px", cursor: "pointer" }}>Deactivate Employee</button>
            </Link>
          </div>
        )}
      </div>

      <h1 style={{ fontSize: "16px", fontWeight: "600", color: "#333", marginTop: "15px", marginBottom: "5px" }}>{employee.name || "No Name"}</h1>
      <h2 style={{ fontSize: "12px", fontWeight: "400", color: "#777", marginBottom: "10px" }}>{employee.job_title || "Not Assigned"}</h2>
      <hr style={{ margin: "10px 0", border: "none", borderTop: "1px solid #ddd" }} />

      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#555", marginTop: '-30px' }}>
        <div>
          <h3 style={{ fontSize: "10px", fontWeight: "600", marginBottom: "5px" }}>Department</h3>
          <h4 style={{fontSize:'16px'}}>{employee.department || 'N/A'}</h4>
        </div>
        <div>
          <h3 style={{ fontSize: "10px", fontWeight: "600", marginBottom: "5px" }}>ID Number</h3>
          <h4 style={{fontSize:'16px'}}>{employee.employee_id}</h4>
        </div>
      </div>

      <h3 style={{ fontSize: "10px", fontWeight: "600", marginBottom: "5px", marginLeft:'10px' }}>Status</h3>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "-15px" , alignItems:'center'}}>
        <div>
          <h4 style={statusStyles}>{employee.employment_status || "Active"}</h4>
        </div>
        <Link
          to={`/employee-managment/view-profile`}
          onClick={(e) => {
            e.stopPropagation();
            localStorage.setItem("selectedEmployee_id", employee.employee_id);
          }}
        >
          <button className='viewprofile-btn' style={{
            padding: "8px 15px",
            backgroundColor: "#0275d8",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}>
            View Profile
          </button>
        </Link>
      </div>
    </div>
  );
};

const EmployeeManagement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [employees, setEmployees] = useState([]);
  // const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [departments, setDepartments] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchName, setSearchName] = useState(''); // For the search input
  const [departmentName, setDepartmentName] = useState('All'); // Your current filter state
  const [totalEmployees, setTotalEmployees] = useState(0); // Total employees count from API
  const totalPages = Math.ceil(totalEmployees / pageSize);



useEffect(() => {
  const fetchEmployeesAndDepartments = async () => {
    setLoading(true);
    try {
      const storedAuthData = localStorage.getItem("authData");
      if (!storedAuthData) throw new Error("Authentication data is missing.");

      const authData = JSON.parse(storedAuthData);
      const token = authData?.access_token;
      if (!token) throw new Error("Authentication token is missing.");

      const params = new URLSearchParams();
      params.append('page', page);
      params.append('page_size', pageSize);
      if (departmentName && departmentName !== 'All') {
        params.append('department_name', departmentName);
      }
      if (searchName.trim() !== '') {
        params.append('name', searchName.trim());
      }

      const apiUrlEmployees = `https://proximahr.onrender.com/api/v2/employee-management/all-employees?${params.toString()}`;
      const apiUrlDepartments = `https://proximahr.onrender.com/api/v2/departments`;

      const [responseEmployees, responseDepartments] = await Promise.all([
        fetch(apiUrlEmployees, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }),
        fetch(apiUrlDepartments, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }),
      ]);

      if (!responseEmployees.ok) throw new Error("Failed to fetch employees");
      if (!responseDepartments.ok) throw new Error("Failed to fetch departments");

      const employeesData = await responseEmployees.json();
      const departmentsData = await responseDepartments.json();

        const validEmployees = employeesData.data.filter(emp => emp.name && emp.employee_id);
        console.log('Employees fetched:', validEmployees);
        console.log('Total employees count from API:', employeesData.staff_size);
        setEmployees(validEmployees || []);
        setDepartments(departmentsData.departments || []);
        setTotalEmployees(employeesData.staff_size || 0);


    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchEmployeesAndDepartments();
}, [page, pageSize, departmentName, searchName]);

  

  const toggleDropdown = (id) => {
    setActiveDropdown((prev) => (prev === id ? null : id));
  };

      const handleFilter = (deptName) => {
        console.log('Filtering department:', deptName);
        setDepartmentName(deptName);
        setPage(1);
        setIsOpen(false);
      };



  const handleCardClick = (employee) => {
    localStorage.setItem("selectedEmployee", JSON.stringify(employee)); // Stores selected employee
  };

  return (
    <div>
      <div className="main-dashboard">
        <Sidebar />
        <div className="dashboard">
          <EmployerNavbar />
          <hr className="horizontal" />
          <div className="dashboard-details" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <h5 style={{ marginBottom: '15px' }}>Employee Management</h5>
            <h6>{new Date().toLocaleDateString('en-GB', { day: '2-digit', weekday: 'long', month: 'long', year: 'numeric' })}</h6>
          </div>
          <div className="number-of-employee" style={{ marginLeft: "0px", width: 'auto' , marginTop: '20px', marginBottom: '40px' }}>
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
                      <p onClick={() => handleFilter("All")}>All</p>
                      {departments.length > 0 ? (
                        departments.map((dept, index) => (
                          <p key={index} onClick={() => handleFilter(dept.name)}>{dept.name}</p>
                        ))
                      ) : (
                        <p>No departments found</p>
                      )}
                    </div>
                  )}
              <div className="btn">
                <Link to="/employee-managment/add-employee">
                  <button style={{ border: 'none', backgroundColor: '#0275d8', color: '#fff', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
                    <FontAwesomeIcon icon="fa-solid fa-plus" style={{fontSize:'18px', marginRight:'10px', marginBottom:'-2px'}} /> Add New Employee
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
                  onCardClick={handleCardClick}
                />
              ))}
            </div>
          )}
            <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center', gap: 10 }}>
              <button onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1}>
                Previous
              </button>
                <span>Page {page} of {totalPages}</span>
              <button
                onClick={() => setPage(p => (p * pageSize >= totalEmployees ? p : p + 1))}
                disabled={page * pageSize >= totalEmployees}
              >
                Next
              </button>
            </div>


        </div>
      </div>
    </div>
  );
};

export default EmployeeManagement;
