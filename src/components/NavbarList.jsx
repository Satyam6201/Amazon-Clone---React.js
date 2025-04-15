import React from 'react';
import '../styles/NavbarList.css';
import { RxHamburgerMenu } from 'react-icons/rx';
import { FaCaretDown } from 'react-icons/fa';

const NavbarList = () => {
  const navItems = [
    { label: <><RxHamburgerMenu className="icon" /> All</> },
    { label: 'MX Player' },
    { label: 'Sell' },
    { label: 'Amazon Pay' },
    { label: 'Gift Cards' },
    { label: 'Buy Again' },
    { label: 'AmazonBasics' },
    { label: 'Gift Ideas' },
    { label: "Today's Deals" },
    { label: 'Customer Service' },
    { label: <>Browsing History <FaCaretDown className="icon" /></> },
    { label: "Satyam's Amazon.in" },
    { label: 'Mobiles' },
    { label: 'Subscribe & Save' },
    { label: 'Home Improvement' },
    { label: 'Health, Household & Personal Care' },
    { label: 'Books' },
    { label: 'New Releases' },
    { label: 'Best Sellers' },
    { label: 'Home & Kitchen' },
    { label: 'Prime' },
    { label: 'Electronics' },
    { label: 'Computers' },
    { label: 'Toys & Games' },
    { label: 'Sports, Fitness & Outdoors' },
    { label: 'Beauty & Personal Care' },
    { label: 'Kindle eBooks' },
  ];

  return (
    <div className='navbarList sticky-navbar'>
      <div className="navbarInner">
        {navItems.map((item, index) => (
          <p key={index}>{item.label}</p>
        ))}
      </div>
    </div>
  );
};

export default NavbarList;
