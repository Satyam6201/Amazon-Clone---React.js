import React, { useState, useEffect, useRef } from 'react';
import '../styles/CountrySelector.css';
import { FaCaretDown, FaCaretUp, FaSearch } from 'react-icons/fa';

const languages = [
  { code: 'EN', label: 'English', flag: 'https://flagcdn.com/w320/us.png' },
  { code: 'HI', label: 'हिंदी', flag: 'https://flagcdn.com/w320/in.png' },
  { code: 'TA', label: 'தமிழ்', flag: 'https://flagcdn.com/w320/in.png' },
  { code: 'BN', label: 'বাংলা', flag: 'https://flagcdn.com/w320/in.png' },
  { code: 'TE', label: 'తెలుగు', flag: 'https://flagcdn.com/w320/in.png' },
  { code: 'MR', label: 'मराठी', flag: 'https://flagcdn.com/w320/in.png' }
];

const CountrySelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef(null);

  const handleSelect = (lang) => {
    setSelectedLanguage(lang);
    setShowDropdown(false);
    setSearch('');
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredLanguages = languages.filter(lang =>
    lang.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='languageSelector' ref={dropdownRef}>
      <div
        className='selectedLanguage'
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <img src={selectedLanguage.flag} alt='' className='flag-icon' />
        <p>{selectedLanguage.label}</p>
        {showDropdown ? <FaCaretUp /> : <FaCaretDown />}
      </div>

      {showDropdown && (
        <div className='languageDropdown animate-dropdown'>
          <div className='searchBar'>
            <FaSearch className='searchIcon' />
            <input
              type='text'
              placeholder='Search language...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {filteredLanguages.map((lang) => (
            <div
              key={lang.code}
              className={`languageOption ${selectedLanguage.code === lang.code ? 'active' : ''}`}
              onClick={() => handleSelect(lang)}
            >
              <img src={lang.flag} alt='' className='flag-icon' />
              <span>{lang.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CountrySelector;