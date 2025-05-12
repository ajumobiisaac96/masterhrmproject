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
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7 }
};

const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  transition: { duration: 0.7 }
};

const fadeInLeft = {
  initial: { opacity: 0, x: -80 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 0.8 }
};

const fadeInRight = {
  initial: { opacity: 0, x: 80 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 0.8 }
};

const fadeInDiagonal = {
  initial: { opacity: 0, x: 80, y: 80 },
  whileInView: { opacity: 1, x: 0, y: 0 },
  transition: { duration: 0.9 }
};

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

        {/* Navbar (optional animation) */}
        <motion.nav
          {...fadeIn}
          viewport={{ once: false }}
          className="navbar"
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 100px' }}
        >
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
        </motion.nav>

        {/* Hero Section */}
        <motion.div
          className="hero-section"
          {...fadeInLeft}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h1>Stop Wasting Time on Manual HR Tasks <br />
          <span>Simplify</span> Management</h1>
          <p style={{fontSize:'20px'}}>Streamline attendance, payroll, leave tracking, and reporting to save time and <br /> boost productivity</p>
          <Link to={'/companyregister'} >
            <motion.button
              className="hero-btn"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
            >
              Request Demo <FontAwesomeIcon icon="fa-solid fa-arrow-right" />
            </motion.button>
          </Link>
          <img src={HeroImage} alt="" />
        </motion.div>

        {/* Section: Everything You Need */}
        <motion.div
          className="sub-info-h1"
          style={{ lineHeight: '70px', fontSize: '18px' }}
          {...fadeInUp}
          viewport={{ once: true }}
        >
          <h1>Everything You Need to Manage Your Workforce</h1>
        </motion.div>

        {/* Section: Features */}
        <motion.div
          className="sub-info"
          {...fadeInRight}
          viewport={{ once: true, amount: 0.3 }}
        >
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
        </motion.div>

        {/* Section: Complete Workforce Solution */}
        <motion.div
          className="sub-info-h1"
          style={{ lineHeight: '40px', fontSize: '16px', fontWeight: '600' }}
          {...fadeInUp}
          viewport={{ once: true }}
        >
          <h1>Your Complete Workforce <br /> Management Solution</h1>
        </motion.div>

        {/* Section: Platform Description */}
        <motion.div
          className="sub-info-p"
          id="features"
          style={{ lineHeight: '25px', fontSize: '8px', fontWeight: '100' }}
          {...fadeInUp}
          viewport={{ once: true }}
        >
          <h1>Streamline your HR processes with a platform <br /> designed to manage every aspect of your workforce</h1>
        </motion.div>

        {/* Navbar Section */}
        <motion.div {...fadeIn} viewport={{ once: false }}>
          <LandingPageNavbar />
        </motion.div>

        {/* Why Choose Section */}
        <motion.div className="why-we-choose" id='benefits' {...fadeInDiagonal} viewport={{ once: true, amount: 0.3 }}>
          <h1>Why Choose Our HRMS</h1>
          <p>Manage your workforce with ease, precision, <br /> and clarity.</p>
        </motion.div>

        {/* Why Choose Images */}
        <motion.div className='why-we-choose-dev' {...fadeInUp} viewport={{ once: true }}>
          <img src={ImageOne} alt="" />
          <img src={ImageTwo} alt="" />
        </motion.div>

        {/* Get Started Section */}
        <motion.div className="why-we-choose" {...fadeInUp} viewport={{ once: true }}>
          <h1>Get started in Three steps</h1>
          <p>Set up your HRMS and simplify team management.</p>
        </motion.div>

        {/* Cards Section */}
        <motion.div
          className="cards"
          id="how-it-works"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <CardOne />
          <CardTwo />
          <CardThree />
        </motion.div>

        {/* FAQ Section */}
        <motion.div className="FAQ" id='faq' {...fadeInUp} viewport={{ once: true }}>
          <h1>Frequently Asked Questions</h1>
          <FAQ/>
        </motion.div>

        {/* Last Side Section */}
        <motion.div className="Last-side" {...fadeInUp} viewport={{ once: true }}>
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
        </motion.div>

        {/* Request Demo CTA */}
        <motion.div className="requestdemo" {...fadeInUp} viewport={{ once: true }}>
          <h1 onClick={handleNavigate} >Request a Demo <FontAwesomeIcon icon="fa-solid fa-arrow-right" /></h1>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div className="footer" {...fadeIn} viewport={{ once: false }}>
        <Footer/>
      </motion.div>
    </div>
  );
}

export default LandingPage
