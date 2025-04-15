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
  const [location, setLocation] = useState("Detecting...");

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await axios.get(
            `https://api.bigdatacloud.net/data/reverse-geocode-client`,
            {
              params: {
                latitude,
                longitude,
                localityLanguage: 'en',
              },
            }
          );

          const { city, principalSubdivision, countryName } = response.data;
          setLocation(`${city || principalSubdivision}, ${countryName}`);
        } catch (err) {
          console.error("Error in API call:", err);
          setLocation("Location unavailable");
        }
      },
      (error) => {
        console.error("Geolocation error:", error.message);
        setLocation("Permission denied");
      }
    );
  }, []);

  return (
    <div className='navbar'>
      <img src={logo} onClick={() => navigate('/')} alt="Logo" />
      <div className='addressContainer'>
        <HiOutlineLocationMarker color='white' size={25} />
        <div className='addressContainer_in'>
          <p>Deliver to Satyam</p>
          <h3>{location}</h3>
        </div>
      </div>
      <SearchBar />

      <div className='right'>
        <CountrySelector />
        
        <div onClick={() => navigate('/login')}>
          <AccountAndLists />
        </div>

        <div onClick={() => navigate('/cart')}>
          <CartIndicator />
        </div>

      </div>
    </div>
  );
};

export default Navbar;
