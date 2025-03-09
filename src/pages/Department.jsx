// import { React, useState, useEffect } from 'react';
// import Sidebar from '../components/Sidebar';
// import test from '../assets/test.png';
// import '../pages/Department.css';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fas } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Link, useNavigate } from 'react-router-dom';
// import EmployerNavbar from '../components/EmployerNavbar';

// library.add(fas);

// const Department = () => {
//   const navigate = useNavigate(); // Using useNavigate for routing
//   const [isOpen, setIsOpen] = useState(false);
//   const [departments, setDepartments] = useState([]);
//   const [filteredDepartments, setFilteredDepartments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [selectedFilter, setSelectedFilter] = useState("All");
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     const fetchDepartments = async () => {
//       try {
//         setLoading(true);
//         const companyId = localStorage.getItem("company_id");
//         if (!companyId) throw new Error("Company ID is missing. Please log in again.");

//         const storedAuthData = localStorage.getItem("authData");
//         if (!storedAuthData) throw new Error("Authentication data is missing. Please log in.");

//         let authData;
//         try {
//           authData = JSON.parse(storedAuthData);
//         } catch (error) {
//           throw new Error("Invalid authentication data format. Please log in again.");
//         }

//         const token = authData?.token;
//         if (!token) throw new Error("Authentication token is missing. Please log in.");

//         const apiUrl = `https://proximahr.onrender.com/departments/?company_id=${companyId}`;
//         const response = await fetch(apiUrl, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) throw new Error("Failed to fetch department list.");

//         const data = await response.json();
//         setDepartments(data.departments || []);
//         setFilteredDepartments(data.departments || []);

//         // Store departments in localStorage
//         localStorage.setItem('total_departments', JSON.stringify(data.departments || []));
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDepartments();
//   }, []);

//   // 🔹 Handles Dropdown Filter
//   const handleFilter = (departmentName) => {
//     setSelectedFilter(departmentName);
//     setIsOpen(false);
//     if (departmentName === "All") {
//       setFilteredDepartments(departments);
//     } else {
//       setFilteredDepartments(departments.filter(dept => dept.name.toLowerCase() === departmentName.toLowerCase()));
//     }
//   };

//   const handleCardClick = (departmentId) => {
//     // Find the department data from the departments array
//     const department = departments.find(dept => dept.id === departmentId);
    
//     if (department) {
//       // Store the department information in localStorage
//       localStorage.setItem('department_data', JSON.stringify(department));
//     }
    
//     // Navigate to the Edit Department page
//     navigate(`/department/edit-department`); // Using navigate from react-router-dom v6+
//   };

//   // 🔹 Handle View Department Button Click
//   const handleViewDepartmentClick = (department) => {
//     // Store the department data dynamically
//     localStorage.setItem('department_data', JSON.stringify(department));
//     // Store department ID dynamically for navigation
//     localStorage.setItem('department_id', department.id);

//     // Navigate to the Edit Department page
//     navigate(`/department/add-employee-department`);
//   };

//   // 🔹 Handles Search Input Filtering
//   const handleSearch = (e) => {
//     const term = e.target.value.toLowerCase();
//     setSearchTerm(term);

//     if (term === "") {
//       setFilteredDepartments(departments);
//     } else {
//       setFilteredDepartments(departments.filter(dept => dept.name.toLowerCase().includes(term)));
//     }
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
//             <h5>Department</h5>
//             <h6>{new Date().toDateString()}</h6>
//           </div>

//           <div className="number-of-employee">
//             <div className="new-div-1">
//               <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" className="glass-icon" />
//               <input
//                 type="text"
//                 placeholder="Search Department"
//                 value={searchTerm}
//                 onChange={handleSearch} // ✅ Search Functionality
//               />
//             </div>
//             <div className="div-2">
//               <div className="btn-1">
//                 <button onClick={() => setIsOpen(!isOpen)}>
//                   <FontAwesomeIcon icon="fa-solid fa-filter" /> {selectedFilter}
//                 </button>
//               </div>
//               {isOpen && (
//                 <div className="dropdownstyle">
//                   <p onClick={() => handleFilter("All")}>All</p>
//                   {departments.map((dept, index) => (
//                     <p key={index} onClick={() => handleFilter(dept.name)}>
//                       {dept.name}
//                     </p>
//                   ))}
//                 </div>
//               )}
//               <div className="btn">
//                 <Link to={"/department/add-new-department"}>
//                   <button><FontAwesomeIcon icon="fa-solid fa-plus" />Add New Department</button>
//                 </Link>
//               </div>
//             </div>
//           </div>

//           {loading ? (
//             <p>Loading departments...</p>
//           ) : error ? (
//             <p style={{ color: 'red' }}>{error}</p>
//           ) : (
//             <div style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(2, 1fr)", // ✅ 2 Columns Grid
//               gap: "20px",
//               padding: "20px"
//             }}>
//               {filteredDepartments.length === 0 ? (
//                 <p>No departments found</p>
//               ) : (
//                 filteredDepartments.map((dept, index) => (
//                   <div key={index} className="card-3" style={{
//                     border: "1px solid #ddd",
//                     padding: "15px",
//                     borderRadius: "10px",
//                     backgroundColor: "#fff",
//                     boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
//                   }}>
//                     <div className="one-div">
//                       <div><h1>{dept.name}</h1></div>
//                       <div className="special-div">
//                         {/* Edit Icon for the specific department */}
//                         <FontAwesomeIcon 
//                           icon="fa-solid fa-pen-to-square" 
//                           onClick={() => handleCardClick(dept.id)} 
//                         />
//                         <FontAwesomeIcon icon="fa-solid fa-trash-can" />
//                       </div>
//                     </div>
//                     <hr className="new-hr" />
//                     <div className="two-div">
//                       <div>
//                         <img src={test} alt="Department Head" className="My-profile" />
//                       </div>
//                       <div>
//                         <p>Department Head</p>
//                         <h2>{dept.hod ? `${dept.hod.first_name} ${dept.hod.last_name}` : 'Not Assigned'}</h2>
//                       </div>
//                     </div>
//                     <div className="three-div">
//                       <div className="new-div">
//                         <div><FontAwesomeIcon icon="fa-solid fa-users" className="new-div-icon" /></div>
//                         <div>
//                           <p>Team Members</p>
//                           <h2>{dept.staff_size !== undefined ? dept.staff_size : 0}</h2>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="four-div">
//                       <div className="div-2-2">
//                         <p>Description</p>
//                         <h1>{dept.description || 'No description available'}</h1>
//                       </div>
//                     </div>
//                     <div className="five-div">
//                       {/* View Department Button */}
//                       <button onClick={() => handleViewDepartmentClick(dept)}>View Department</button>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Department;


import { React, useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import test from '../assets/test.png';
import '../pages/Department.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import EmployerNavbar from '../components/EmployerNavbar';

library.add(fas);

const Department = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeletePopup, setShowDeletePopup] = useState(false); // State to control popup visibility
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null); // Store the department to be deleted

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setLoading(true);
        const companyId = localStorage.getItem("company_id");
        if (!companyId) throw new Error("Company ID is missing. Please log in again.");
  
        const storedAuthData = localStorage.getItem("authData");
        if (!storedAuthData) throw new Error("Authentication data is missing. Please log in.");
  
        let authData;
        try {
          authData = JSON.parse(storedAuthData);
        } catch (error) {
          throw new Error("Invalid authentication data format. Please log in again.");
        }
  
        const token = authData?.token;
        if (!token) throw new Error("Authentication token is missing. Please log in.");
  
        const apiUrl = `https://proximahr.onrender.com/departments/?company_id=${companyId}`;
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) throw new Error("Failed to fetch department list.");
  
        const data = await response.json();
  
        // ✅ Log the API response in the console
        console.log("API Response:", data);
  
        setDepartments(data.departments || []);
        setFilteredDepartments(data.departments || []);
        localStorage.setItem('total_departments', JSON.stringify(data.departments || []));
      } catch (err) {
        console.error("Error fetching departments:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };  

    fetchDepartments();
  }, []);

  const handleFilter = (departmentName) => {
    setSelectedFilter(departmentName);
    setIsOpen(false);
    if (departmentName === "All") {
      setFilteredDepartments(departments);
    } else {
      setFilteredDepartments(departments.filter(dept => dept.name.toLowerCase() === departmentName.toLowerCase()));
    }
  };

  // 🔹 Handle Delete Department Confirmation
  const handleDeleteDepartment = async () => {
    try {
      const companyId = localStorage.getItem("company_id");
      const authToken = JSON.parse(localStorage.getItem("authData"))?.token;

      if (!companyId || !authToken) {
        setError('You are not authorized to delete this department.');
        return;
      }

      const response = await fetch(
        `https://proximahr.onrender.com/departments/${selectedDepartmentId}/delete-department?company_id=${companyId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error:', errorData);
        setError(`Failed to delete department: ${errorData.detail || 'Unknown error'}`);
        return;
      }

      const data = await response.json();
      setSuccessMessage('Department deleted successfully!');
      // Remove deleted department from local state
      setDepartments(prevDepartments => prevDepartments.filter(department => department.id !== selectedDepartmentId));
      setTimeout(() => {
        window.location.reload(); // Reload the page after deletion
      }, 1000); // Delay to allow the success message to appear
    } catch (error) {
      setError(`Error: ${error.message}`);
    }
    // Close the popup after deletion
    setShowDeletePopup(false);
  };

  const handleCardClick = async (departmentId) => {
    try {
      const token = JSON.parse(localStorage.getItem("authData"))?.token;
      if (!token) throw new Error("Authentication token is missing.");
  
      const companyId = localStorage.getItem("company_id");
  
      // Construct the API URL with query parameters
      const apiUrl = `https://proximahr.onrender.com/employee-management/all-employees?company_id=${companyId}&page=1&page_size=10`;
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) throw new Error("Failed to fetch employees.");
  
      const data = await response.json();
      console.log("Employee Data:", data); // Log the full employee data response
  
      // Now you can inspect the structure of the employee data
      if (data && data.data) {
        console.log("List of Employees:", data.data); // Log the list of employees
      }
  
      // Find the department by its ID to get the department name
      const department = departments.find(dept => dept.id === departmentId);
      if (!department) {
        throw new Error("Department not found.");
      }
  
      const departmentName = department.name; // Get the department name
  
      // Filter employees by department name
      const departmentEmployees = data.data.filter(employee => employee.department === departmentName); // Filter by department name
      console.log("Filtered Employees for Department Name:", departmentEmployees); // Log the filtered employees
  
      // Store department data and filtered employees in localStorage
      localStorage.setItem("department_data", JSON.stringify(department));
      localStorage.setItem("staff_data", JSON.stringify(departmentEmployees)); // Store filtered staff data
  
      navigate(`/department/first-edit-department`);
    } catch (error) {
      console.error("Error fetching employees:", error.message);
      setError(error.message);
    }
  };
  
  
  
  

  const handleViewDepartmentClick = (department) => {
    console.log("Department:", department);
    const staffData = department.staff || []; 
    localStorage.setItem('staff_data', JSON.stringify(staffData)); 
    console.log("Stored staff data:", staffData);

    localStorage.setItem('department_data', JSON.stringify(department));
    localStorage.setItem('department_id', department.id);
  
    navigate(`/department/add-employee-department`);
  };



  // const newHandleViewDepartmentClick = (department) => {
  //   console.log("Department:", department);
  //   const staffData = department.staff || []; 
  //   localStorage.setItem('staff_data', JSON.stringify(staffData)); 
  //   console.log("Stored staff data:", staffData);

  //   localStorage.setItem('department_data', JSON.stringify(department));
  //   localStorage.setItem('department_id', department.id);
  
  //   navigate(`/department/edit-department`);
  // };


  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term === "") {
      setFilteredDepartments(departments);
    } else {
      setFilteredDepartments(departments.filter(dept => dept.name.toLowerCase().includes(term)));
    }
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
            <h5>Department</h5>
            <h6>{new Date().toDateString()}</h6>
          </div>

          {/* Success or Error Messages */}
          {error && <div className="message error">{error}</div>}
          {successMessage && <div className="message success">{successMessage}</div>}

          <div className="number-of-employee">
            <div className="new-div-1">
              <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" className="glass-icon" />
              <input
                type="text"
                placeholder="Search Department"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div className="div-2">
              <div className="btn-1">
                <button onClick={() => setIsOpen(!isOpen)}>
                  <FontAwesomeIcon icon="fa-solid fa-filter" /> {selectedFilter}
                </button>
              </div>
              {isOpen && (
                <div className="dropdownstyle">
                  <p onClick={() => handleFilter("All")}>All</p>
                  {departments.map((dept, index) => (
                    <p key={index} onClick={() => handleFilter(dept.name)}>
                      {dept.name}
                    </p>
                  ))}
                </div>
              )}
              <div className="btn">
                <Link to={"/department/add-new-department"}>
                  <button><FontAwesomeIcon icon="fa-solid fa-plus" />Add New Department</button>
                </Link>
              </div>
            </div>
          </div>

          {loading ? (
            <p>Loading departments...</p>
          ) : error ? (
            <p style={{ color: 'red' }}>{error}</p>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "20px",
              padding: "20px"
            }}>
              {filteredDepartments.length === 0 ? (
                <p>No departments found</p>
              ) : (
                filteredDepartments.map((dept, index) => (
                <div key={index} className="card-3">
                  <div className="one-div">
                    <div><h1>{dept.name}</h1></div>
                    <div className="special-div">
                      {/* Edit Icon */}
                      <FontAwesomeIcon
                        icon="fa-solid fa-pen-to-square"
                        onClick={() => handleCardClick(dept.id)}  // Pass department ID dynamically
                        style={{cursor:'pointer'}}
                      />
                      {/* Delete Icon */}
                      <FontAwesomeIcon
                        icon="fa-solid fa-trash-can"
                        onClick={() => {
                          setSelectedDepartmentId(dept.id);
                          setShowDeletePopup(true);
                        }} 
                        style={{cursor:'pointer'}}  
                      />
                    </div>
                  </div>
                  <hr className="new-hr" />
                  <div className="two-div">
                    <div>
                      <img src={test} alt="Department Head" className="My-profile" />
                    </div>
                    <div>
                      <p>Department Head</p>
                      <h2>{dept.hod ? `${dept.hod.first_name} ${dept.hod.last_name}` : 'Not Assigned'}</h2>
                    </div>
                  </div>
                  <div className="three-div">
                    <div className="new-div">
                      <div><FontAwesomeIcon icon="fa-solid fa-users" className="new-div-icon" /></div>
                      <div>
                        <p>Team Members</p>
                        <h2>{dept.staff_size !== undefined ? dept.staff_size : 0}</h2>
                      </div>
                    </div>
                  </div>
                  <div className="four-div">
                    <div className="div-2-2">
                      <p>Description</p>
                      <h1>{dept.description || 'No description available'}</h1>
                    </div>
                  </div>
                  <div className="five-div">
                    <button onClick={() => handleViewDepartmentClick(dept)}>View Department</button>
                  </div>
                </div>

                ))
              )}
            </div>
          )}
        </div>
      </div>


      {/* Delete Confirmation Popup */}
      {showDeletePopup && (
        <div className="delete-popup show">
          <div className="check-icon">
            <FontAwesomeIcon icon="fa-solid fa-exclamation-circle" />
          </div>
          <h2>Are you sure you want to delete this department?</h2>
          <div className="options">
            <button className="btn" onClick={handleDeleteDepartment}>Yes, Delete</button>
            <button className="cancel-btn" onClick={() => setShowDeletePopup(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Department;
