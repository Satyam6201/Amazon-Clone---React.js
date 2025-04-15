import React from 'react';
import FooterLinks from './FooterLinks';
import logo from '../assets/logo.png';
import { CiGlobe } from 'react-icons/ci';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <div className="footer">
      <div className="back-to-top">
        <a href="#top">Back to top</a>
      </div>

      <div className="footer-content">
        <div className="footer-section">
          <h3>Get to Know Us</h3>

          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press Releases</a></li>
            <li><a href="#">Amazon Science</a></li>
          </ul>

        </div>

        <div className="footer-section">
          <h3>Connect with Us</h3>

          <ul>
            <li><a href="https://www.facebook.com/profile.php?id=100024550755973">Facebook</a></li>
            <li><a href="https://x.com/satyamkmishraa?t=kATgYsKWGY4_ZJfpr1l7pg&s=09">Twitter</a></li>
            <li><a href="https://www.instagram.com/satyammishra_467">Instagram</a></li>
          </ul>

        </div>

        <div className="footer-section">
          <h3>Make Money with Us</h3>

          <ul>
            <li><a href="#">Sell on Amazon</a></li>
            <li><a href="#">Sell under Amazon Accelerator</a></li>
            <li><a href="#">Protect and Build Your Brand</a></li>
            <li><a href="#">Amazon Global Selling</a></li>
            <li><a href="#">Become an Affiliate</a></li>
            <li><a href="#">Fulfillment by Amazon</a></li>
            <li><a href="#">Advertise Your Products</a></li>
          </ul>

        </div>

        <div className="footer-section">
          <h3>Let Us Help You</h3>

          <ul>
            <li><a href="#">Your Account</a></li>
            <li><a href="#">Returns Centre</a></li>
            <li><a href="#">100% Purchase Protection</a></li>
            <li><a href="#">Amazon App Download</a></li>
            <li><a href="#">Help</a></li>
          </ul>
          
        </div>
      </div>

      <div className="footer-bottom">
        <img
          src={logo}
          alt="Amazon Logo"
          className="logo"
          onClick={() => window.location.href = '/'}
        />
        <div className="footer-buttons">
          <div className="language-select">
            <CiGlobe />
            <select>
              <option value="en">English</option>
              <option value="hi">हिन्दी (Hindi)</option>
              <option value="ta">தமிழ் (Tamil)</option>
              <option value="te">తెలుగు (Telugu)</option>
              <option value="kn">ಕನ್ನಡ (Kannada)</option>
              <option value="ml">മലയാളം (Malayalam)</option>
              <option value="mr">मराठी (Marathi)</option>
              <option value="bn">বাংলা (Bengali)</option>
            </select>
          </div>

          <button className="country-btn">
            <img src="https://flagcdn.com/w320/in.png" alt="India Flag" className="flag-icon" />
            India
          </button>
        </div>
      </div>

      <FooterLinks />
    </div>
  );
};

export default Footer;
