import React from 'react';
import '../components/Footer.css'
import Image from '../assets/hrm logo.JPG'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';


const Footer = () => {
  return (
    <footer class="footer">
  <div class="footer-container">
    {/* <!-- Left Section --> */}
    <div class="footer-left">
      <div class="footer-logo">
        <img src={Image} alt="Proxima HR Logo" class="footer-logo-img" />
        <span class="footer-logo-text">Proxima HR</span>
      </div>
      <div class="footer-social-icons">
      <a href="#" class="social-icon">
        <FontAwesomeIcon icon={faLinkedin} />
      </a>
      <a href="#" class="social-icon">
        <FontAwesomeIcon icon={faTwitter} />
      </a>
      </div>
      <div class="footer-links">
        <a href="#" class="footer-link">Privacy policy</a>
        <a href="#" class="footer-link">Terms of use</a>
      </div>
      <p class="footer-copy">&copy;2024 Proxima HR</p>
    </div>

    {/* <!-- Right Section --> */}
    <div class="footer-right">
      <div class="footer-links">
        <h4>Company</h4>
        <a href="#" class="footer-link">Features</a> <br />
        <a href="#" class="footer-link">How it Works</a> <br />
        <a href="#" class="footer-link">Benefit</a> <br />
        <a href="#" class="footer-link">FAQ</a>
      </div>
      <div class="footer-email">
        <h4>Join Our Email List</h4>
        <form class="email-form">
          <input type="email" placeholder="Enter Email" class="email-input" />
          <button type="submit" class="email-btn">Join Email List</button>
        </form>
      </div>
    </div>
  </div>
</footer>

  );
};

export default Footer;
