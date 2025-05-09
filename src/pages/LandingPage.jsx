import React from 'react'
import Logo from '../assets/hrm logo.JPG'
import '../pages/LandingPage.css'
import HeroImage from '../assets/HeroImg.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EmployeeIcon from '../assets/employee-icon.jpg'
import DollarIcon from '../assets/dollar-icon.jpg'
import TaskIcon from '../assets/leave-manangment-icon.jpg'
import LandingPageNavbar from '../components/LandingPageNavbar';
import ImageOne from '../assets/why we choose.jpg'
import ImageTwo from '../assets/why we choose-2.jpg'
import CardOne from '../components/CardOne'
import CardTwo from '../components/CardTwo'
import CardThree from '../components/CardThree'
import FAQ from '../components/FAQ'
import LastSlide from '../assets/LastSIDE.png'
import Footer from '../components/Footer';
import {Link} from 'react-router-dom'
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'



const LandingPage = () => {

  // State to toggle the dropdown visibility
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };


const navigate = useNavigate();

const handleNavigate = () => {
  navigate('/companyregister');
};

  return (
    <div>
      <div className="LandingPage">

      <nav className="navbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 100px' }}>
      <div className="logo" style={{ display: 'flex', alignItems: 'center' }}>
        <a href="#home">
          <img src={Logo} alt="Logo" className="logo-img" style={{ width: '40px', height: '40px', marginRight: '10px' }} />
        </a>
        <span className="logo-text" style={{ color: '#2E2E2E', fontSize: '18px', fontWeight: '400' }}>Proxima HR</span>
      </div>
      
      <ul className="nav-links" style={{ display: 'flex', listStyleType: 'none', margin: 0, padding: 0 }}>
        <li style={{ margin: '0 10px' }}><a href="#features" style={{ color: '#2E2E2E', textDecoration: 'none' }}>Features</a></li>
        <li style={{ margin: '0 10px' }}><a href="#how-it-works" style={{ color: '#2E2E2E', textDecoration: 'none' }}>How It Works</a></li>
        <li style={{ margin: '0 10px' }}><a href="#benefits" style={{ color: '#2E2E2E', textDecoration: 'none' }}>Benefits</a></li>
        <li style={{ margin: '0 10px' }}><a href="#faq" style={{ color: '#2E2E2E', textDecoration: 'none' }}>FAQ</a></li>
      </ul>

      <div style={{ position: 'relative' }}>
        <Link to="/companyregister" style={{ textDecoration: 'none' }}>
        <button
          className="demo-button"
          onClick={toggleDropdown}
          style={{
            backgroundColor: '#155EEF',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            fontSize: '16px',
            borderRadius: '5px',
            cursor: 'pointer',
            width: '200px'
          }}
        >
          Request Demo
          <span className="arrow-icon" style={{ marginLeft: '10px' }}>➔</span>
        </button>
        </Link>
        
        {/* Dropdown menu
        {dropdownVisible && (

          <div
            className="dropdown-menu"
            style={{
              position: 'absolute',
              top: '50px', // Adjust based on your design
              right: '0',
              backgroundColor: '#fff',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              borderRadius: '5px',
              zIndex: '1000'
            }}
          >
            <Link to="/companyregister" style={{ textDecoration: 'none' }}>
              <button className="demo-button">
                Signup as Admin
              </button>
            </Link>
            <Link to="/EmployeeLogin" style={{ textDecoration: 'none' }}>
              <button className="demo-button">
                Login as Employee
              </button>
            </Link>
          </div>
        )} */}
      </div>
    </nav>

    {/* hero section */}

    <div className="hero-section" id='home'>
        <h1>Stop Wasting Time on Manual HR Tasks <br />
        <span>Simplify</span> Management</h1>
        <p style={{fontSize:'20px'}}>Streamline attendance, payroll, leave tracking, and reporting to save time and <br /> boost productivity</p>
        <Link to={'/companyregister'} ><button className='hero-btn' >Request Demo <FontAwesomeIcon icon="fa-solid fa-arrow-right" /> </button></Link>
        <img src={HeroImage} alt="" />
    </div>


      <div className='sub-info-h1' style={{lineHeight:'70px', fontSize:'18px'}} >
        <h1>Everything You Need to Manage Your Workforce</h1>
      </div>

    <div className="sub-info">

      <div className="sub-info-div">
        <img src={EmployeeIcon} alt="" />
        <h1>Efficient Employee Management</h1>
        <p>Keep all employee details in one <br /> place.</p>
      </div>

      <div className="sub-info-div">
        <img src={DollarIcon} alt="" />
        <h1>Accurate Payroll Processing</h1>
        <p>Effortlessly calculate salaries, deductions, <br /> and taxes in one go.</p>
      </div>

      <div className="sub-info-div">
        <img src={TaskIcon} alt="" />
        <h1>Simple Leave Tracking</h1>
        <p>Track employee leave balances with <br /> no hassle.</p>
      </div>

    </div>

    <div className='sub-info-h1' style={{lineHeight:'40px', fontSize:'16px', fontWeight:'600'}} >
        <h1>Your Complete Workforce <br /> Management Solution</h1>
    </div>

    <div className='sub-info-p' id="features" style={{lineHeight:'25px', fontSize :'8px', fontWeight:'100'}} >
        <h1>Streamline your HR processes with a platform <br /> designed to manage every aspect of your workforce</h1>
    </div>

   <div >
    <LandingPageNavbar/>
   </div>

    <div className="why-we-choose" id='benefits'>
      <h1>Why Choose Our HRMS</h1>
      <p>Manage your workforce with ease, precision, <br /> and clarity.</p>
    </div>

    <div className='why-we-choose-dev'>
      <img src={ImageOne} alt="" />
      <img src={ImageTwo} alt="" />
    </div>

    <div className="why-we-choose">
      <h1>Get started in Three steps</h1>
      <p>Set up your HRMS and simplify team management.</p>
    </div>

    <div className="cards" id="how-it-works">
      <CardOne/>
      <CardTwo/>
      <CardThree/>
    </div>

    <div className="FAQ" id='faq'>
      <h1>Frequently Asked Questions</h1>
      <FAQ/>
    </div>

    <div className="Last-side">
      <div className="left-col">
        <h1>Streamline Your HR Operations with Proxima Hr </h1>
        <p>Proxima Hr is a cutting-edge Human Resource Management System that revolutionizes workforce management. It empowers HR professionals to handle complex tasks effortlessly, from payroll to attendance tracking. By centralizing data , it saves time and reduces errors, allowing focus on building a productive workforce.</p>
        <button class="demo-button" onClick={handleNavigate} >
            Request Demo
            <span class="arrow-icon">➔</span>
        </button>
      </div>
      <div className="right-col">
        <img src={LastSlide} alt="" />
      </div>
    </div>

    <div className="requestdemo">
      <h1 onClick={handleNavigate} >Request a Demo <FontAwesomeIcon icon="fa-solid fa-arrow-right" /></h1>
      </div>
    </div>

    <div className="footer">
      <Footer/>
    </div>
    

  </div>
      
  )
}

export default LandingPage
