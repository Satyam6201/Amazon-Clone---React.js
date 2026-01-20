import React, { useEffect, useState } from 'react';
import '../styles/Navbar.css';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { HiOutlineLocationMarker } from "react-icons/hi";
import SearchBar from './SearchBar';
import CountrySelector from './CountrySelector';
import AccountAndLists from './AccountAndLists';
import CartIndicator from './CartIndicator';
import axios from 'axios';

const Navbar = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("Select location");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const res = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
          setLocation(res.data.city || res.data.principalSubdivision || "Overseas");
        } catch (err) {
          setLocation("Update location");
        }
      });
    }
  }, []);

  return (
    <nav className='navbar'>
      {/* 1. Logo */}
      <img src={logo} onClick={() => navigate('/')} alt="Amazon" />

      {/* 2. Address (Hidden on mobile) */}
      <div className='addressContainer'>
        <HiOutlineLocationMarker color='white' size={20} />
        <div className='addressContainer_in'>
          <p>Deliver to Satyam</p>
          <h3>{location}</h3>
        </div>
      </div>

      {/* 3. Search Bar (Full width on mobile) */}
      <SearchBar />

      {/* 4. Right Section */}
      <div className='right'>
        <div className="desktop-only">
            <CountrySelector />
        </div>
        
        <div className="nav-clickable" onClick={() => navigate('/login')}>
          <AccountAndLists />
        </div>

        <div className="nav-clickable" onClick={() => navigate('/cart')}>
          <CartIndicator />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;