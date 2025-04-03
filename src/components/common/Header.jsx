import { useState, useEffect, useRef } from 'react';
import { FaUserCircle, FaCog, FaSignOutAlt, FaTimes, FaSearch } from 'react-icons/fa';
import { MdArrowDropDown } from "react-icons/md";
import logo from '../../assets/logo.png';
import useAuthStore from '../../constants/store';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [allCompanies, setAllCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const profileRef = useRef(null);
  const searchRef = useRef(null);
  const { user, logout, loading, error } = useAuthStore();
  const navigate = useNavigate();

  const toggleProfile = () => setShowProfile(!showProfile);

  const fetchAllCompanies = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/users/search-companies', { 
        withCredentials: true 
      });
      setAllCompanies(response.data.data || []);
    } catch (error) {
      console.error('Error fetching all companies:', error);
      setAllCompanies([]);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query) {
      const filtered = allCompanies.filter(company =>
        company.companyName.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCompanies(filtered);
    } else {
      setFilteredCompanies([]);
    }
  };

  const handleFocus = () => setFilteredCompanies(allCompanies);

  const handleCompanyClick = (company) => {
    navigate('/carrerpage', { state: { company } });
    setSearchQuery('');
    setFilteredCompanies([]);
  };

  const handleLogout = async () => {
    try {
      const success = await logout();
      if (success) {
        setShowProfile(false);
        navigate('/login');
      } else {
        console.error('Logout failed:', error);
        // Optionally show an error message to the user
      }
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  useEffect(() => {
    fetchAllCompanies();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) setShowProfile(false);
      if (searchRef.current && !searchRef.current.contains(event.target)) setFilteredCompanies([]);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="flex items-center justify-between border-b px-6 py-4 md:px-8">
      {/* Logo */}
      <div className="flex items-center">
        <img
          src={logo}
          alt="TalentID Logo"
          className="h-7 w-auto transform transition-all duration-300 cursor-pointer"
          onClick={() => navigate('/')}
        />
      </div>

      {/* Search and Profile */}
      <div className="flex items-center gap-6">
        {/* Search Bar */}
        <div className="relative group" ref={searchRef}>
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-500 group-hover:text-indigo-700 transition-all">
            <FaSearch className="w-5 h-5" />
          </span>
          <input
            className="pl-10 pr-4 py-2 rounded-lg border border-indigo-200 bg-indigo-50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white w-64 md:w-80 transition-all duration-300"
            placeholder="Search companies..."
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={handleFocus}
          />
          {filteredCompanies.length > 0 && (
            <div className="absolute z-20 mt-2 w-full bg-white border border-indigo-100 rounded-lg shadow-md max-h-60 overflow-y-auto transform scale-95 origin-top transition-all duration-200">
              {filteredCompanies.map((company, index) => (
                <div
                  key={index}
                  className="p-3 hover:bg-indigo-100 cursor-pointer text-gray-700 hover:text-indigo-800 flex items-center gap-2 transition-all"
                  onClick={() => handleCompanyClick(company)}
                >
                  <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
                  {company.companyName}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative flex items-center group" ref={profileRef}>
          <FaUserCircle className="text-indigo-500 text-2xl cursor-pointer group-hover:text-indigo-700 transition-all duration-300" />
          <MdArrowDropDown
            size={28}
            className="text-indigo-500 cursor-pointer group-hover:text-indigo-700 transition-all duration-300"
            onClick={toggleProfile}
          />
          {showProfile && (
            <div className="absolute z-40 right-0 top-full mt-3 w-64 bg-white border border-indigo-100 rounded-lg shadow-md transform scale-95 origin-top-right transition-all duration-200">
              <div className="flex justify-between items-center p-3 border-b border-indigo-50">
                <p className="text-indigo-700 font-semibold">My Account</p>
                <FaTimes
                  className="text-gray-500 cursor-pointer hover:text-red-500 transition-all"
                  onClick={() => setShowProfile(false)}
                />
              </div>
              <div className="p-3 text-center">
                <p className="text-indigo-700 font-semibold">{user?.data.name || "User"}</p>
                <p className="text-gray-500 text-sm">{user?.data.email}</p>
              </div>
              <ul className="space-y-1 p-2">
                <Link to={"/profile"} className="flex items-center text-gray-700 hover:bg-indigo-50 p-2 rounded-md cursor-pointer transition-all">
                  <FaUserCircle className="mr-2 text-indigo-500" /> My Profile
                </Link>
                <li className="flex items-center text-gray-700 hover:bg-indigo-50 p-2 rounded-md cursor-pointer transition-all">
                  <FaCog className="mr-2 text-indigo-500" /> Settings
                </li>
                <li
                  className="flex items-center text-gray-700 hover:bg-indigo-50 p-2 rounded-md cursor-pointer transition-all"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt className="mr-2 text-red-500" />
                  {loading ? 'Logging out...' : 'Logout'}
                </li>
              </ul>
              {error && (
                <p className="text-red-500 text-sm p-2 text-center">{error}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;