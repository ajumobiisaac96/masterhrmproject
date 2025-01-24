import { React} from 'react'
import Sidebar from '../components/Sidebar'
import test from '../assets/test.png'
import '../pages/AdminProfile.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react'
import HRActionTable from '../components/HRActionTable';

const AdminProfile = () => {

  const [editField, setEditField] = useState(null);  // Track which field (email or phone) is being edited

  const handleEditClick = (field) => {
    setEditField(field);  // Set the field to edit (email or phone)
  };

  const handleSave = () => {
    if (editField === "password") {
      const newPassword = document.querySelector('input[placeholder="Enter new password"]').value;
      const confirmPassword = document.querySelector('input[placeholder="Confirm new password"]').value;
  
      if (newPassword !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      console.log("Password updated successfully:", newPassword);
    }
  
    if (editField === "email") {
      const newEmail = document.querySelector('input[placeholder="Michael Chen@robotec.com"]').value;
      console.log("Email updated successfully:", newEmail);
    }
  
    setEditField(null); // Close the pop-up after saving
  };
  
  

  return (
    <div>

<div className="main-dashboard">
        <Sidebar />
      
        <div className="dashboard">
        <div className="slide-one-1">
            <div className="slide-one-1">
              <div className="name">
                <h5>Joseph Dooley</h5>
                <h6>Good Morning</h6>
              </div> 
            </div>
            <div className="slide-one-2-1">
              <div className="notification">
                <FontAwesomeIcon icon="fa-solid fa-bell" />
                <h6>6</h6>
              </div>

              <div className="user-profile">
                <img src={test} alt="My profile" className="My-profile" />
              </div>
            </div> 
          </div>

          <hr className="horizontal" />

          <div className="dashboard-details-1">
                <div className="new-number-of-employee">
                  <div className="div-1">
                    <div className="div1-1">
                      <img src={test} alt="My profile" className ="My-profile" />
                    </div>
                    <div className="div1-2">
                      <h1>Michael Chen</h1>
                    </div>
                  </div>
                  <div className="div-2">
                    <div className="btn">
                        <h2><FontAwesomeIcon icon="fa-envelope" className = "icon" />michaelchen@rotech.com</h2>
                        <h2><FontAwesomeIcon icon="fa-solid fa-phone" className = "icon" />08052567231</h2>
                        <h2><FontAwesomeIcon icon="fa-solid fa-location-dot" className = "icon" />New York office, Floor 5v</h2>
                    </div>
                  </div>
                </div>
            </div>
  
            <div className="dashboard-details-1">
              <div className="first-grid" style={{width: '300px'}} >
                <FontAwesomeIcon icon="fa-solid fa-users" className="dashboard-icon"/>
                <div>
                  <h6>Total employees</h6>
                  <h5>40</h5>
                </div>
              </div>
  
              <div className="first-grid" style={{width: '300px'}}>
              <FontAwesomeIcon icon="fa-solid fa-building"  className="dashboard-icon"/>
                <div>
                  <h6>Department</h6>
                  <h5>13</h5>
                </div>
              </div>
  
              <div className="first-grid" style={{width: '300px'}}>
              <FontAwesomeIcon icon="fa-solid fa-calendar" className="dashboard-icon" />
                <div>
                  <h6>pending Leaves</h6>
                  <h5>7</h5>
                </div>
              </div>
            </div>

            <div className="dashboard-details-1">
              <div className="first-grid" style={{width: '200px', height: '70px'}} >
                <FontAwesomeIcon icon="fa-solid fa-users" className="dashboard-icon"/>
                <div>
                  <h6> Add employees</h6>
                </div>
              </div>
  
              <div className="first-grid" style={{width: '200px', height: '70px'}}>
              <FontAwesomeIcon icon="fa-solid fa-building"  className="dashboard-icon"/>
                <div>
                  <h6>Edit Department</h6>
                </div>
              </div>
  
              <div className="first-grid" style={{width: '200px' , height: '70px' }}>
              <FontAwesomeIcon icon="fa-solid fa-calendar" className="dashboard-icon" />
                <div>
                  <h6>View report</h6>
                </div>
              </div>
            </div>

            <div className="personal-details">
              <p>Personal Details</p>
              <div className="personal-details-section">
                <div className="DOB">
                  <h1>Date of Birth</h1>
                  <h2>1998-03-15</h2>
                </div>
                <div className="gender">
                  <h1>Gender</h1>
                  <h2>male</h2>
                </div>
                <div className="address">
                  <h1>Address</h1>
                  <h2>1234 Tech Lane, Silicon Valley, CA 94000</h2>
                </div>
              </div>
            </div>

            <div className="communication-channel">
            <h1>Account Details</h1>
            <div className="communication-type">
              <label htmlFor="">Email</label>
              <div className="communication-type-1">
                <input type="text" placeholder='Michael Chen@robotec.com' />
                <p onClick={() => handleEditClick('email')}>Edit</p>
              </div>
            </div>
            <div className="communication-type">
              <label htmlFor="">Password</label> 
              <div className="communication-type-1">
                <input type="password" placeholder='**********' />
                <FontAwesomeIcon icon="fa-solid fa-eye-slash" style={{ paddingRight: "15px", color:'#4E4E4E', cursor:'pointer' }} /><p  onClick={() => handleEditClick('phone')}>Edit</p>
              </div>
            </div>
          </div>

          {editField && (
            <div className="email-popUp" style={{height:'400px'}} >
              <label htmlFor="">
                {editField === "email" ? "Edit Email" : "Edit Password"}
              </label>
              <br />
              {editField === "email" ? (
                // For editing email
                <input
                  type="text"
                  placeholder="Michael Chen@robotec.com"
                  style={{ paddingRight: "15px", color: "#4E4E4E" }}
                />
              ) : (
                // For editing password
                <>
                <div className="password-div" >
                <label htmlFor="" style={{fontSize:'16px'}} >Change Password</label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    style={{ paddingRight: "15px", color: "#4E4E4E" }}
                  />
                  <label htmlFor="" style={{fontSize:'16px'}} >New Password</label>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    style={{ paddingRight: "15px", color: "#4E4E4E" }}
                  />
                  <label htmlFor="" style={{fontSize:'16px'}} >Re-enter New Password</label>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    style={{ paddingRight: "15px", color: "#4E4E4E" }}
                  />
                  </div>
                </>
              )}

              <div className="my-button">
                <div className="btn-1" onClick={() => setEditField(null)}>
                  Cancel
                </div>
                <div className="btn-2" onClick={handleSave}>
                  Save Changes
                </div>
              </div>
            </div>
            )}

            <div className="Action-table">
              <HRActionTable/>
            </div>
            
            <div className="security-info">
              <h1>Security Information</h1>
              <div className="thesecurity-info">
                  <div className="info1">
                    <h1>Last Login</h1>
                    <p>2024-12-02 08:15</p>
                  </div>
                  <div className="info1">
                    <h1>Password Changed</h1>
                    <p>2024-12-02 08:15</p>
                  </div>
              </div>
            </div>
        

            <div className="logout-btn" >
              <button style={{width:'200px', background:'red', color:'#fff', marginLeft:'800px'}} ><FontAwesomeIcon icon="fa-solid fa-right-from-bracket" />Logout</button>
            </div>

        </div>
      </div>

        






    </div>
  )
}

export default AdminProfile
