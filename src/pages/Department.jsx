  // import { React, useState, useEffect } from 'react';
  // import Sidebar from '../components/Sidebar';
  // import test from '../assets/test.png';
  // import '../pages/Department.css';
  // import { library } from '@fortawesome/fontawesome-svg-core';
  // import { fas } from '@fortawesome/free-solid-svg-icons';
  // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  // import { Link, useNavigate, useLocation } from 'react-router-dom';
  // import EmployerNavbar from '../components/EmployerNavbar';
  // import { toast, ToastContainer } from 'react-toastify';  // Import Toastify

  // library.add(fas);

  // const Department = () => {
  //   const navigate = useNavigate();
  //   const location = useLocation();
  //   const shouldRefetch = location.state?.refetch;

  //   const [isOpen, setIsOpen] = useState(false);
  //   const [departments, setDepartments] = useState([]);
  //   const [filteredDepartments, setFilteredDepartments] = useState([]);
  //   const [loading, setLoading] = useState(true);
  //   const [error, setError] = useState("");
  //   const [successMessage, setSuccessMessage] = useState("");
  //   const [selectedFilter, setSelectedFilter] = useState("All");
  //   const [searchTerm, setSearchTerm] = useState("");
  //   const [showDeletePopup, setShowDeletePopup] = useState(false);
  //   const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);

  //   useEffect(() => {
  //     const fetchDepartments = async () => {
  //       try {
  //         setLoading(true);
  //         const companyId = localStorage.getItem("company_id");
  //         const storedAuthData = localStorage.getItem("authData");

  //         if (!storedAuthData) throw new Error("Authentication data is missing.");
  //         const authData = JSON.parse(storedAuthData);
  //         const token = authData?.access_token;
  //         if (!token) throw new Error("Authentication token is missing.");

  //         const apiUrl = `https://proximahr.onrender.com/api/v2/departments`;
  //         console.log("📡 API request sent to:", apiUrl);

  //         const response = await fetch(apiUrl, {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json", 
  //             Authorization: `Bearer ${token}`,
  //           },
  //         });

  //         if (!response.ok) throw new Error("Failed to fetch department list.");
  //         const data = await response.json();

  //         // Log the received data to verify the updated department
  //         console.log("📥 Fetched departments from backend:", data);

  //         setDepartments(data.departments || []);
  //         setFilteredDepartments(data.departments || []);
  //         setSelectedFilter("All");
  //         setSearchTerm("");
  //       } catch (err) {
  //         console.error("❌ Error fetching departments:", err.message);
  //         setError(err.message);
  //         toast.error(`Error: ${err.message}`);  // Show error message using Toastify
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchDepartments();
  //   }, [location.state?.refetch]);

  //   const handleFilter = (departmentName) => {
  //     setSelectedFilter(departmentName);
  //     setIsOpen(false);
  //     if (departmentName === "All") {
  //       setFilteredDepartments(departments);
  //     } else {
  //       setFilteredDepartments(departments.filter(dept => dept.name.toLowerCase() === departmentName.toLowerCase()));
  //     }
  //   };

  //   // 🔹 Handle Delete Department Confirmation
  //   const handleDeleteDepartment = async () => {
  //     try {
  //       const companyId = localStorage.getItem("company_id");
  //       const authToken = JSON.parse(localStorage.getItem("authData"))?.access_token;

  //       // if (!companyId || !authToken) {
  //       //   setError('You are not authorized to delete this department.');
  //       //   toast.error('You are not authorized to delete this department.');  // Show error message using Toastify
  //       //   return;
  //       // }

  //       const response = await fetch(
  //         `https://proximahr.onrender.com/api/v2/departments/${selectedDepartmentId}/delete-department`,
  //         {
  //           method: 'DELETE',
  //           headers: {
  //             'Content-Type': 'application/json',
  //             'Authorization': `Bearer ${authToken}`,
  //           },
  //         }
  //         );

  //       if (!response.ok) {
  //         const errorData = await response.json();
  //         console.error('Error:', errorData);
  //         setError(`Failed to delete department: ${errorData.detail || 'Unknown error'}`);
  //         toast.error(`Failed to delete department: ${errorData.detail || 'Unknown error'}`);  // Show error message using Toastify
  //         return;
  //       }

  //       const data = await response.json();
  //       setSuccessMessage('Department deleted successfully!');
  //       toast.success('Department deleted successfully!');  // Show success message using Toastify

  //       // Remove deleted department from local state
  //       setDepartments(prevDepartments => prevDepartments.filter(department => department.id !== selectedDepartmentId));
  //       setTimeout(() => {
  //         window.location.reload(); // Reload the page after deletion
  //       }, 1000); // Delay to allow the success message to appear
  //     } catch (error) {
  //       setError(`Error: ${error.message}`);
  //       toast.error(`Error: ${error.message}`);  // Show error message using Toastify
  //     }
  //     // Close the popup after deletion
  //     setShowDeletePopup(false);
  //   };

  //   const handleCardClick = async (departmentId) => {
  //     try {
  //       const token = JSON.parse(localStorage.getItem("authData"))?.access_token;
  //       const companyId = localStorage.getItem("company_id");
  //       const apiUrl = `https://proximahr.onrender.com/api/v2/employee-management/all-employees`;

  //       const response = await fetch(apiUrl, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       if (!response.ok) throw new Error("Failed to fetch employees.");
  //       const data = await response.json();

  //       const department = departments.find(dept => dept.id === departmentId);
  //       const departmentEmployees = data.data.filter(emp => emp.department === department.name);

  //       localStorage.setItem("department_data", JSON.stringify(department));
  //       localStorage.setItem("staff_data", JSON.stringify(departmentEmployees));
  //       localStorage.setItem("department_id", department.id);

  //       navigate(`/department/first-edit-department`);
  //     } catch (error) {
  //       setError(error.message);
  //       toast.error(error.message);  // Show error message using Toastify
  //     }
  //   };

  //   const handleViewDepartmentClick = (department) => {
  //     const staffData = department.staff || [];
  //     localStorage.setItem('staff_data', JSON.stringify(staffData));
  //     localStorage.setItem('department_data', JSON.stringify(department));
  //     localStorage.setItem('department_id', department.id);
  //     navigate(`/department/add-employee-department`, {
  //       state: { refetch: true }
  //     });
  //   };

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
  //           <EmployerNavbar />
  //           <hr className="horizontal" />
  //           <div className="dashboard-details" style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}} >
  //             <h5 style={{marginBottom:'15px'}} >Department</h5>
  //             <h6>{new Date().toLocaleDateString('en-GB', { day: '2-digit', weekday: 'long', month: 'long', year: 'numeric' })}</h6>
  //           </div>

  //           {error && <div className="message error">{error}</div>}
  //           {successMessage && <div className="message success">{successMessage}</div>}

  //           <div className="number-of-employee" style={{marginTop:"20px", marginBottom:'20px'}} >
  //             <div className="new-div-1">
  //               <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" className="glass-icon" />
  //               <input type="text" placeholder="Search Department" value={searchTerm} onChange={handleSearch} />
  //             </div>
  //             <div className="div-2">
  //               <div className="btn-1" style={{ position: 'relative', display: 'inline-block' }}>
  //                 <button 
  //                   onClick={() => setIsOpen(!isOpen)} 
  //                   style={{
  //                     padding: '10px 20px', 
  //                     backgroundColor: 'white', 
  //                     color: '#007BFF', 
  //                     border: '1px solid #007BFF', 
  //                     borderRadius: '5px', 
  //                     cursor: 'pointer',
  //                     display: 'flex', 
  //                     alignItems: 'center',
  //                     justifyContent: 'center',
  //                     gap: '8px',
  //                     fontSize: '12px',
  //                     width:'200px',
  //                     marginLeft:'-50px',
  //                   }}
  //                 >
  //                   <FontAwesomeIcon icon="fa-solid fa-filter" />
  //                   {selectedFilter}
  //                 </button>

  //                 {isOpen && (
  //                   <div 
  //                     className="dropdownstyle" 
  //                     style={{
  //                       position: 'absolute', 
  //                       top: '100%', // Position it directly under the button
  //                       left: 0,
  //                       backgroundColor: '#fff', 
  //                       boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)', 
  //                       borderRadius: '5px',
  //                       width: '200px', // Ensure the dropdown is the same width as the button
  //                       zIndex: 1000, 
  //                       marginTop: '8px', // Space between button and dropdown
  //                       padding: '10px 0', 
  //                       textAlign:'left',
  //                       marginLeft:'-50px',
  //                     }}
  //                   >
  //                     <p 
  //                       onClick={() => handleFilter("All")} 
  //                       style={{
  //                         padding: '8px 20px',
  //                         margin: 0,
  //                         cursor: 'pointer',
  //                         fontSize: '14px',
  //                         fontWeight: '500',
  //                       }}
  //                     >
  //                       All
  //                     </p>
  //                     {departments.map((dept, index) => (
  //                       <p 
  //                         key={index} 
  //                         onClick={() => handleFilter(dept.name)} 
  //                         style={{
  //                           padding: '8px 20px',
  //                           margin: 0,
  //                           cursor: 'pointer',
  //                           fontSize: '14px',
  //                           fontWeight: '500',
  //                         }}
  //                       >
  //                         {dept.name}
  //                       </p>
  //                     ))}
  //                   </div>
  //                 )}
  //               </div>

  //               <div className="btn">
  //                 <Link to={"/department/add-new-department"}>
  //                   <button style={{backgroundColor:'#007BFF', color: '#ffff', border:'none'}} ><FontAwesomeIcon icon="fa-solid fa-plus"  />Add New Department</button>
  //                 </Link>
  //               </div>
  //             </div>
  //           </div>

  //           <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px", padding: "20px" }}>
  //             {filteredDepartments.length === 0 ? (
  //               <p>No departments found</p>
  //             ) : (
  //               filteredDepartments.map((dept, index) => (
  //                 <div key={index} className="card-3" style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px', width: '450px', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)', marginBottom: '20px', marginLeft:'-20px' }}>
  //                   <div className="one-div" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  //                     <h1 style={{ fontSize: '20px', fontWeight: '600' }}>{dept.name}</h1>
  //                     <div className="special-div" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
  //                       <FontAwesomeIcon icon="fa-solid fa-pen-to-square" style={{ cursor: 'pointer', fontSize: '16px' }} onClick={() => handleCardClick(dept.id)} />
  //                       <FontAwesomeIcon icon="fa-solid fa-trash-can" style={{ cursor: 'pointer', fontSize: '16px' }} onClick={() => {
  //                         setSelectedDepartmentId(dept.id);
  //                         setShowDeletePopup(true);
  //                       }} />
  //                     </div>
  //                   </div>

  //                   <hr className="new-hr" style={{ border: '1px solid #ddd', margin: '10px 0', width:'450px', marginLeft: '-20px' }} />

  //                   <div className="two-div" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
  //                     <div><img src={test} alt="HOD" className="My-profile" style={{ width: '40px', height: '40px', borderRadius: '50%' }} /></div>
  //                     <div>
  //                       <p style={{ fontSize: '14px', color: '#6C757D' }}>Department Head</p>
  //                       <h2 style={{ fontSize: '16px', fontWeight: '500' }}>{dept.hod ? `${dept.hod.first_name} ${dept.hod.last_name}` : 'Not Assigned'}</h2>
  //                     </div>
  //                   </div>

  //                   <div className="three-div" style={{ marginTop: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
  //                     <div style={{ display: 'flex', alignItems: 'center', background: '#f8f9fa', padding: '8px 15px', borderRadius: '20px' }}>
  //                       <FontAwesomeIcon icon="fa-solid fa-users" className="new-div-icon" style={{ fontSize: '16px', color: '#007BFF' }} />
  //                       <p style={{ fontSize: '14px', marginLeft: '5px' }}>Team Members</p>
  //                       <h2 style={{ fontSize: '16px', fontWeight: '500', marginLeft: '5px' }}>{dept.staff_size || 0}</h2>
  //                     </div>
  //                   </div>

  //                   <div className="four-div" style={{ marginTop: '15px' }}>
  //                     <div className="div-2-2">
  //                       <p style={{ fontSize: '14px', color: '#6C757D' }}>Description</p>
  //                       <h1 style={{ fontSize: '16px', fontWeight: '400' }}>{dept.description || 'No description available'}</h1>
  //                     </div>
  //                   </div>

  //                   <div className="five-div" style={{ marginTop: '20px' }}>
  //                     <button onClick={() => handleViewDepartmentClick(dept)} style={{ width: '100%', padding: '10px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '500' }}>
  //                       View Department
  //                     </button>
  //                   </div>
  //                 </div>

  //                 ))
  //               )}
  //             </div>
  //           </div>
  //         </div>

  //         {/* Delete Confirmation Popup */}
  //         {showDeletePopup && (
  //         <div className="delete-popup show">
  //           <div className="check-icon">
  //             <FontAwesomeIcon icon="fa-solid fa-exclamation-circle" />
  //           </div>
  //           <h2>Are you sure you want to delete this department?</h2>
  //           <div className="options">
  //             <button className="btn" onClick={handleDeleteDepartment}>Yes, Delete</button>
  //             <button className="cancel-btn" onClick={() => setShowDeletePopup(false)}>Cancel</button>
  //           </div>
  //         </div>
  //       )}

  //       {/* Toastify container for displaying messages */}
  //       <ToastContainer />  {/* Add ToastContainer at the bottom */}
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
  import { Link, useNavigate, useLocation } from 'react-router-dom';
  import EmployerNavbar from '../components/EmployerNavbar';
  import { toast, ToastContainer } from 'react-toastify';  // Import Toastify

  library.add(fas);

  const Department = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const shouldRefetch = location.state?.refetch;

    const [isOpen, setIsOpen] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [filteredDepartments, setFilteredDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);

    useEffect(() => {
      const fetchDepartments = async () => {
        try {
            setLoading(true);
            const companyId = localStorage.getItem("company_id");
            const storedAuthData = localStorage.getItem("authData");

            if (!storedAuthData) throw new Error("Authentication data is missing.");
            const authData = JSON.parse(storedAuthData);
            const token = authData?.access_token;
            if (!token) throw new Error("Authentication token is missing.");

            const apiUrl = `https://proximahr.onrender.com/api/v2/departments`;
            const response = await fetch(apiUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error("Failed to fetch department list.");
            const data = await response.json();
            setDepartments(data.departments || []);
            setFilteredDepartments(data.departments || []);  // Set filteredDepartments to the same as departments initially

        } catch (err) {
            console.error("Error fetching departments:", err.message);
            setError(err.message);
            toast.error(`Error: ${err.message}`);
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
        const authToken = JSON.parse(localStorage.getItem("authData"))?.access_token;

        // if (!companyId || !authToken) {
        //   setError('You are not authorized to delete this department.');
        //   toast.error('You are not authorized to delete this department.');  // Show error message using Toastify
        //   return;
        // }

        const response = await fetch(
          `https://proximahr.onrender.com/api/v2/departments/${selectedDepartmentId}/delete-department`,
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
          toast.error(`Failed to delete department: ${errorData.detail || 'Unknown error'}`);  // Show error message using Toastify
          return;
        }

        const data = await response.json();
        setSuccessMessage('Department deleted successfully!');
        toast.success('Department deleted successfully!');  // Show success message using Toastify

        // Remove deleted department from local state
        setDepartments(prevDepartments => prevDepartments.filter(department => department.id !== selectedDepartmentId));
        setTimeout(() => {
          window.location.reload(); // Reload the page after deletion
        }, 1000); // Delay to allow the success message to appear
      } catch (error) {
        setError(`Error: ${error.message}`);
        toast.error(`Error: ${error.message}`);  // Show error message using Toastify
      }
      // Close the popup after deletion
      setShowDeletePopup(false);
    };

    const handleCardClick = async (departmentId) => {
      try {
        const token = JSON.parse(localStorage.getItem("authData"))?.access_token;
        // const companyId = localStorage.getItem("company_id");
        const apiUrl = `https://proximahr.onrender.com/api/v2/employee-management/all-employees`;

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch employees.");
        const data = await response.json();

        const department = departments.find(dept => dept.id === departmentId);
        const departmentEmployees = data.data.filter(emp => emp.department === department.name);

        localStorage.setItem("department_data", JSON.stringify(department));
        localStorage.setItem("staff_data", JSON.stringify(departmentEmployees));
        localStorage.setItem("department_id", department.id);

        navigate(`/department/first-edit-department`);
      } catch (error) {
        setError(error.message);
        toast.error(error.message);  // Show error message using Toastify
      }
    };

    const handleViewDepartmentClick = (department) => {
      // Pass the department ID in the URL when clicking "View Department"
      navigate(`/department/add-employee-department/${department.id}`);
  };

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
            <EmployerNavbar />
            <hr className="horizontal" />
            <div className="dashboard-details" style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}} >
              <h5 style={{marginBottom:'15px'}} >Department</h5>
              <h6>{new Date().toLocaleDateString('en-GB', { day: '2-digit', weekday: 'long', month: 'long', year: 'numeric' })}</h6>
            </div>

            {error && <div className="message error">{error}</div>}
            {successMessage && <div className="message success">{successMessage}</div>}

            <div className="number-of-employee" style={{marginTop:"20px", marginBottom:'20px'}} >
              <div className="new-div-1">
                <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" className="glass-icon" />
                <input type="text" placeholder="Search Department" value={searchTerm} onChange={handleSearch} />
              </div>
              <div className="div-2">
                <div className="btn-1" style={{ position: 'relative', display: 'inline-block' }}>
                  <button 
                  // className='dept-btn'
                    onClick={() => setIsOpen(!isOpen)} 
                    style={{
                      padding: '10px 20px', 
                      backgroundColor: 'white', 
                      color: '#007BFF', 
                      border: '1px solid #007BFF', 
                      borderRadius: '5px', 
                      cursor: 'pointer',
                      display: 'flex', 
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      fontSize: '12px',
                      width:'200px',
                      marginLeft:'-50px',
                    }}
                  >
                    <FontAwesomeIcon icon="fa-solid fa-filter" />
                    {selectedFilter}
                  </button>

                  {isOpen && (
                    <div 
                      className="dropdownstyle " 
                      style={{
                        position: 'absolute', 
                        top: '100%', // Position it directly under the button
                        left: 0,
                        backgroundColor: '#fff', 
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)', 
                        borderRadius: '5px',
                        width: '200px', // Ensure the dropdown is the same width as the button
                        zIndex: 1000, 
                        marginTop: '8px', // Space between button and dropdown
                        padding: '10px 0', 
                        textAlign:'left',
                        marginLeft:'-50px',
                      }}
                    >
                      <p 
                      className='dropdown-item '
                        onClick={() => handleFilter("All")} 
                        style={{
                          padding: '8px 20px',
                          margin: 0,
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: '500',
                        }}
                      >
                        All
                      </p>
                      {departments.map((dept, index) => (
                        <p 
                        className='dropdown-item'
                          key={index} 
                          onClick={() => handleFilter(dept.name)} 
                          style={{
                            padding: '8px 20px',
                            margin: 0,
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '500',
                          }}
                        >
                          {dept.name}
                        </p>
                      ))}
                    </div>
                  )}
                </div>

                <div className="btn">
                  <Link to={"/department/add-new-department"}>
                    <button className='dept-btn' style={{backgroundColor:'#007BFF', color: '#ffff', border:'none'}} ><FontAwesomeIcon icon="fa-solid fa-plus"  />Add New Department</button>
                  </Link>
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px", padding: "20px" }}>
              {filteredDepartments.length === 0 ? (
                <p>No departments found</p>
              ) : (
                filteredDepartments.map((dept, index) => (
                  <div key={index} className="card-3" style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px', width: '450px', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)', marginBottom: '20px', marginLeft:'-20px' }}>
                    <div className="one-div" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h1 style={{ fontSize: '20px', fontWeight: '600' }}>{dept.name}</h1>
                      <div className="special-div" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <FontAwesomeIcon icon="fa-solid fa-pen-to-square" style={{ cursor: 'pointer', fontSize: '16px' }} onClick={() => handleCardClick(dept.id)} />
                        <FontAwesomeIcon icon="fa-solid fa-trash-can" style={{ cursor: 'pointer', fontSize: '16px' }} onClick={() => {
                          setSelectedDepartmentId(dept.id);
                          setShowDeletePopup(true);
                        }} />
                      </div>
                    </div>

                    <hr className="new-hr" style={{ border: '1px solid #ddd', margin: '10px 0', width:'450px', marginLeft: '-20px' }} />

                    <div className="two-div" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                      <div><img src={test} alt="HOD" className="My-profile" style={{ width: '40px', height: '40px', borderRadius: '50%' }} /></div>
                      <div>
                        <p style={{ fontSize: '14px', color: '#6C757D' }}>Department Head</p>
                        <h2 style={{ fontSize: '16px', fontWeight: '500' }}>{dept.hod ? `${dept.hod.first_name} ${dept.hod.last_name}` : 'Not Assigned'}</h2>
                      </div>
                    </div>

                    <div className="three-div" style={{ marginTop: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', background: '#f8f9fa', padding: '8px 15px', borderRadius: '20px' }}>
                        <FontAwesomeIcon icon="fa-solid fa-users" className="new-div-icon" style={{ fontSize: '16px', color: '#007BFF' }} />
                        <p style={{ fontSize: '14px', marginLeft: '5px' }}>Team Members</p>
                        <h2 style={{ fontSize: '16px', fontWeight: '500', marginLeft: '5px' }}>{dept.staff_size || 0}</h2>
                      </div>
                    </div>

                    <div className="four-div" style={{ marginTop: '15px' }}>
                      <div className="div-2-2">
                        <p style={{ fontSize: '14px', color: '#6C757D' }}>Description</p>
                        <h1 style={{ fontSize: '16px', fontWeight: '400' }}>{dept.description || 'No description available'}</h1>
                      </div>
                    </div>

                    <div className="five-div" style={{ marginTop: '20px' }}>
                      <button className='dept-btn' onClick={() => handleViewDepartmentClick(dept)} style={{ width: '100%', padding: '10px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '500' }}>
                        View Department
                      </button>
                    </div>
                  </div>

                  ))
                )}
              </div>
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

        {/* Toastify container for displaying messages */}
        <ToastContainer />  {/* Add ToastContainer at the bottom */}
      </div>
    );
  };

  export default Department;



























