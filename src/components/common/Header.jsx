import React, { useState, useEffect, useRef } from 'react';
import { FaBell, FaUserCircle, FaCog, FaSignOutAlt, FaTimes } from 'react-icons/fa';
import { MdOutlineCurrencyExchange } from "react-icons/md";
import { MdArrowDropDown } from "react-icons/md";
import logo from '../../assets/logo.png';
import { FaSearch } from 'react-icons/fa';
// Replace with actual image path

const Header = () => {
 
  const [showProfile, setShowProfile] = useState(false);
 
  const profileRef = useRef(null);

  
  const toggleProfile = () => {
    setShowProfile(!showProfile);
    setShowNotifications(false); 
  };

 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current && !notificationRef.current.contains(event.target) &&
        profileRef.current && !profileRef.current.contains(event.target)
      ) {
        setShowProfile(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="flex items-center justify-between bg-white shadow-md px-8 py-4 relative">
      {/* Logo Section */}
      <div className="flex items-center">
        <img src={logo} alt="TalentID Logo" className="h-8 w-auto" />
      </div>
      <div className="flex gap-5 space-y-4">
      {/* Search Form */}
      <form className="form relative top-1">
        {/* Search Icon */}
        <button
          type="button"
          className="absolute left-2 -translate-y-1/2 top-1/2 p-1 text-gray-700"
        >
          <FaSearch className="w-5 h-5 " />
        </button>

        {/* Search Input */}
        <input
          className="input pl-10 rounded-full px-8 py-3 border-2 border-transparent focus:outline-none focus:border-purple-500 placeholder-gray-400 transition-all duration-300 shadow-md w-full"
          placeholder="Search a company"
          required
          type="text"
        />

        
      </form>

      {/* User Profile Section */}
      <div className="flex items-center space-x-6">
        {/* User Profile Icon with Dropdown */}
        <div className="relative flex items-center" ref={profileRef}>
          <FaUserCircle
            className="text-gray-600 text-2xl cursor-pointer hover:text-purple-900 transition duration-300"
          />
          <span className="ml-2 text-gray-600">Welcome V, Jai</span>
          <MdArrowDropDown
            size={30}
            className="mt-1 cursor-pointer"
            onClick={toggleProfile}
          />
          {showProfile && (
            <div className="absolute z-40 right-0 top-0 mt-11 w-56 bg-white border border-gray-200 rounded-lg shadow-lg">
              <div className="flex justify-between items-center p-4 border-b">
                <p className="text-gray-800 font-semibold">User Profile</p>
                <FaTimes
                  className="text-gray-600 cursor-pointer hover:text-red-500"
                  onClick={() => setShowProfile(false)}
                />
              </div>
              <div className="p-4 text-center">
                <img
                  src="https://via.placeholder.com/150" // Replace with actual image URL
                  alt="User"
                  className="w-16 h-16 rounded-full mx-auto"
                />
                <p className="text-gray-800 font-semibold mt-2">John Doe</p>
                <p className="text-gray-500 text-sm">johndoe@example.com</p>
              </div>
              <ul className="space-y-2 p-2">
                <li className="flex items-center text-gray-600 border-b hover:bg-gray-100 p-2 cursor-pointer">
                  <FaUserCircle className="mr-2" /> My Profile
                </li>
                <li className="flex items-center text-gray-600 border-b hover:bg-gray-100 p-2 cursor-pointer">
                  <FaCog className="mr-2" /> Settings
                </li>
                <li className="flex items-center text-gray-600 border-b hover:bg-gray-100 p-2 cursor-pointer">
                  <MdOutlineCurrencyExchange className="mr-2" /> Subscription
                </li>
                <li className="flex items-center text-gray-600 hover:bg-gray-100 p-2 cursor-pointer">
                  <FaSignOutAlt className="mr-2 text-red-500" /> Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
    </header>
  );
};

export default Header;

