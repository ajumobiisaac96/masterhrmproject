import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import test from '../assets/test.png'
import '../pages/Department.css'
import ToggleButton from '../components/ToggleButton'
import '../pages/Notification.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Notification = () => {
  const [editField, setEditField] = useState(null);  // Track which field (email or phone) is being edited

  const handleEditClick = (field) => {
    setEditField(field);  // Set the field to edit (email or phone)
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

          <div className="dashboard-details" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <h5>Notification settings</h5>
            <h6>configure how and when you receive system notifications</h6>
          </div>

          <div className="notification-type">
            <h1>Systemwide Notification Channels</h1>
            <div className='type-1-1'>
              <div className="type-1">
                <h1>Email</h1>
                <ToggleButton />
              </div>
              <div className="type-1">
                <h1>Push Notifications</h1>
                <ToggleButton />
              </div>
              <div className="type-1">
                <h1>In-App Notifications</h1>
                <ToggleButton />
              </div>
            </div>
          </div>

          <div className="communication-channel">
            <h1>Communications channels</h1>
            <div className="communication-type">
              <label htmlFor="">Email</label>
              <div className="communication-type-1">
                <input type="text" placeholder='Michael Chen@robotec.com' />
                <p onClick={() => handleEditClick('email')}>Edit</p>
              </div>
            </div>
            <div className="communication-type">
              <label htmlFor="">Phone</label> 
              <div className="communication-type-1">
                <input type="text" placeholder='+234 (555) 123-4567' />
                <p onClick={() => handleEditClick('phone')}>Edit</p>
              </div>
            </div>
          </div>

          {editField && (
            <div className="email-popUp">
              <label htmlFor="">{editField === 'email' ? 'Edit Email' : 'Edit Phone'}</label> <br />
              <input type="text" placeholder={editField === 'email' ? 'Michael Chen@robotec.com' : '+234 (555) 123-4567'} />
              <div className="my-button">
                <div className="btn-1" onClick={() => setEditField(null)}>cancel</div>
                <div className="btn-2">save changes</div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default Notification;
