// import React from 'react';
// import Sidebar from '../components/Sidebar';
// import test from '../assets/test.png';
// import '../pages/AddEmployeeToDepartment.css';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fas } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {Link} from 'react-router-dom'
// import EmployerNavbar from '../components/EmployerNavbar';

// library.add(fas);

// const AddEmployeeToDepartment = () => {
//     return (
//         <div>
//           <div className="main-dashboard">
//             <Sidebar />
//             <div className="dashboard">

//             <EmployerNavbar />

    
//               <hr className="horizontal" />
    
//               <div className="dashboard-detail-1">
//                 <Link to = "/department/edit-department" ><h1 className="employee-profile"><FontAwesomeIcon icon="fa-solid fa-arrow-left" className = "left-arrow"></FontAwesomeIcon>Add Employees</h1></Link>
//                 <h6>24 Thursday October 2024</h6>
//               </div>
    

//               <div className="Department-info">
//                 <div className="department-info-1">
//                   <div className="div-1">
//                     <label htmlFor="">Department Name</label>
//                     <input type="text" placeholder='Engineering Department' />
//                   </div>
//                 </div>
                

//                 <h3>Add Employee</h3>
  
//               <div className="employee-department-section">
  
//                   <div className="row-one">
//                       <p>Full Name</p>
//                       <p>Job Title</p>
//                       <p>Employee ID</p>
//                       <p>Edit</p>
//                   </div>
  
//   <hr />
  
//                   <div className="row-two">
//                       <div>
//                           <img src={test} alt="My profile" className="My-profile" /> 
//                           <p>Sarah Johnson</p>
//                       </div>
//                       <p>Software - Engineer</p>
//                       <p>0876</p>
//                       <p className = "grey-btn">Remove Employee</p>
//                   </div>
  
//                   <hr />
//                   <div className="row-two">
//                       <div>
//                           <img src={test} alt="My profile" className="My-profile" /> 
//                           <p>Sarah Johnson</p>
//                       </div>
//                       <p>Software - Engineer</p>
//                       <p>0876</p>
//                       <p className = "grey-btn">Remove Employee</p>
//                   </div>
  
//                   <hr />
//                   <div className="row-two">
//                       <div>
//                           <img src={test} alt="My profile" className="My-profile" /> 
//                           <p>Sarah Johnson</p>
//                       </div>
//                       <p>Software - Engineer</p>
//                       <p>0876</p>
//                       <p className = "grey-btn">Remove Employee</p>
//                   </div>
  
//                   <hr />
//                   <div className="row-two">
//                       <div>
//                           <img src={test} alt="My profile" className="My-profile" /> 
//                           <p>Sarah Johnson</p>
//                       </div>
//                       <p>Software - Engineer</p>
//                       <p>0876</p>
//                       <p className = "grey-btn">Remove Employee</p>
//                   </div>
  
//                   <hr />
  
//                   <div className="row-two">
//                       <div>
//                           <img src={test} alt="My profile" className="My-profile" /> 
//                           <p>Sarah Johnson</p>
//                       </div>
//                       <p>Software - Engineer</p>
//                       <p>0876</p>
//                       <p className = "grey-btn">Remove Employee</p>
//                   </div>
  
//                   <hr />
  
//                   <div className="row-two">
//                       <div>
//                           <img src={test} alt="My profile" className="My-profile" /> 
//                           <p>Sarah Johnson</p>
//                       </div>
//                       <p>Software - Engineer</p>
//                       <p>0876</p>
//                       <p className = "grey-btn">Remove Employee</p>
//                   </div>
  
//                   <hr />
  
//                   <div className="row-two">
//                       <div>
//                           <img src={test} alt="My profile" className="My-profile" /> 
//                           <p>Sarah Johnson</p>
//                       </div>
//                       <p>Software - Engineer</p>
//                       <p>0876</p>
//                       <p className = "grey-btn">Remove Employee</p>

//                   </div>
  
//               </div>
              
//               <button className='btn-2'>Approve</button>


//             <div className="department-Head">
//                 <label htmlFor="">Department Head</label>
//                 <select name="" id="">
//                     <option value="" className='select-option'>Select Department Head</option>
//                     <option value="" className='select-option'>option 1</option>
//                     <option value="" className='select-option'>option 1</option>
//                     <option value="" className='select-option'>option 1</option>
//                 </select>
//             </div>
            
//               <div className="department-description">
//                 <label htmlFor="">Department Description</label>
//                 <textarea name="" id="" placeholder='Develops and maintains technical systems and software'></textarea>

//               </div>

//               </div>

//               <div className="department-buttons">
//                 <button className='grey-btn'>cancel</button>
//                 <button>Save changes</button>
//               </div>


  
                
//             </div>
//           </div>
//         </div>
//       );
      
// }

// export default AddEmployeeToDepartment
















import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import test from '../assets/test.png';
import '../pages/AddEmployeeToDepartment.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import EmployerNavbar from '../components/EmployerNavbar';

library.add(fas);

const AddEmployeeToDepartment = () => {
  const navigate = useNavigate();
  const departmentId = localStorage.getItem('department_id');
  const oauthToken = JSON.parse(localStorage.getItem('authData'))?.access_token;
  const [departmentName, setDepartmentName] = useState('');
  const [hod, setHod] = useState('');
  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  // Fetch department details
  useEffect(() => {
    const fetchDepartmentData = async () => {
      try {
        const companyId = localStorage.getItem('company_id');
        const apiUrl = `https://proximahr.onrender.com/departments/${departmentId}/department-details?company_id=${companyId}`;
        
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${oauthToken}`,
          },
        });

        const data = await response.json();
        setDepartmentName(data.data.department_name);
        setHod(data.data.hod_details?.employee_id || '');
      } catch (err) {
        setError('Failed to fetch department details.');
      }
    };

    fetchDepartmentData();
  }, [departmentId, oauthToken]);

  // Fetch employees in the system
  const fetchEmployees = async () => {
    try {
      const apiUrl = `https://proximahr.onrender.com/api/v2/employee-management/all-employees?page=1&page_size=100&name=${searchTerm}`;
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${oauthToken}`,
        },
      });

      const data = await response.json();
      setEmployees(data.data);
    } catch (err) {
      setError('Failed to fetch employees.');
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [searchTerm]);

  // Handle selecting employees
  const handleEmployeeSelect = (employeeId) => {
    if (selectedEmployees.includes(employeeId)) {
      setSelectedEmployees(selectedEmployees.filter(id => id !== employeeId));
    } else {
      setSelectedEmployees([...selectedEmployees, employeeId]);
    }
  };

  // Handle approval of employees
  const handleApprove = () => {
    const selectedEmployeeDetails = employees.filter(emp => selectedEmployees.includes(emp.employee_id));
    localStorage.setItem('selected_employees', JSON.stringify(selectedEmployeeDetails));
    navigate('/department/edit-department');
  };

  return (
    <div>
      <div className="main-dashboard">
        <Sidebar />
        <div className="dashboard">
          <EmployerNavbar />
          <hr className="horizontal" />
        

          <div className="dashboard-details" style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}} >
          <Link to="/department/edit-department"> <h5 style={{marginBottom:'15px'}} > <FontAwesomeIcon icon="fa-solid fa-arrow-left" className="left-arrow"  style={{marginRight:'20px'}}/>Edit Department</h5> </Link>
            <h6>{new Date().toLocaleDateString('en-GB', { day: '2-digit', weekday: 'long', month: 'long', year: 'numeric' })}</h6>
          </div>
          
          <div className="Department-info">
            <div className="department-info-1">
              <div className="div-1">
                <label htmlFor="">Department Name</label>
                <input type="text" placeholder="Engineering Department" value={departmentName} readOnly />
              </div>
              <div className="div-2">
                <label htmlFor="">Department Head</label>
                <select value={hod} onChange={(e) => setHod(e.target.value)}>
                  <option value="">Select Department Head</option>
                  {employees.map(emp => (
                    <option key={emp.employee_id} value={emp.employee_id}>
                      {emp.first_name} {emp.last_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <h3>Select Employees</h3>
            <div className="employee-department-section">
              <div className="row-one">
                <p>Full Name</p>
                <p>Job Title</p>
                <p>Employee ID</p>
                <p>Select</p>
              </div>
              <hr />
              {employees.map(employee => (
                <div key={employee.employee_id} className="row-two">
                  <div>
                    <img src={test} alt="My profile" className="My-profile" />
                    <p>{employee.first_name} {employee.last_name}</p>
                  </div>
                  <p>{employee.job_title}</p>
                  <p>{employee.employee_id}</p>
                  <input
                    type="checkbox"
                    checked={selectedEmployees.includes(employee.employee_id)}
                    onChange={() => handleEmployeeSelect(employee.employee_id)}
                  />
                </div>
              ))}
            </div>
            <button className="btn-2" onClick={handleApprove}>Approve</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeToDepartment;
