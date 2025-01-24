import {React} from 'react';
import Sidebar from '../components/Sidebar'
import test from '../assets/test.png'
import '../pages/AddDepartment.css'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom';
import UserNavbar from '../components/UserNavbar';

library.add(fas);

const AddDepartment = () => {
    
    return (
        <div>
          <div className="main-dashboard">
            <Sidebar/>
            <div className="dashboard">
              <UserNavbar/>
              <hr className="horizontal" />
    
              <div className="dashboard-details">
                <Link to={'/department'}><h5><FontAwesomeIcon icon="fa-solid fa-arrow-left" className = "left-arrow" />Add New Department</h5></Link>
                <h6>24 Thursday October 2024</h6>
              </div>
                    
            <div className="add-department">
                <div className="add-department-feilds">
                    <label htmlFor="">Department Name</label>
                    <input type="text" placeholder='Enter Department' />
                </div>
                <div className="add-department-feilds-1">
                    <div>
                        <label htmlFor="">Add Employee</label>
                        <input type="text" placeholder='Select Employee' />
                    </div>
                    <Link to={"/search-employee"}><button>Add Employee</button></Link>                   
                </div>
                <div className="add-department-feilds">
                    <label htmlFor="">Department Head</label>
                    <input type="text" placeholder='select Department Head' />
                </div>
                <div className="add-department-feilds">
                    <label htmlFor="">Department Name</label>
                    <input type="text-area" placeholder='provide a brief description of the department function.' />
                </div>
            </div>
            
            <div className="department-button">
                <Link to={"/department/edit-department"}><button>Add New Department</button></Link>
            </div>
              
            </div>
    
          </div>
        </div>
      )
}

export default AddDepartment
