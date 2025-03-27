import { useState, useEffect, useRef } from 'react';
import { FaUserCircle, FaCog, FaSignOutAlt, FaTimes, FaSearch } from 'react-icons/fa';
import { MdOutlineCurrencyExchange, MdArrowDropDown } from "react-icons/md";
import logo from '../../assets/logo.png';
import useAuthStore from '../../constants/store'; // Adjust path if needed
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [allCompanies, setAllCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]); // Start empty
  const profileRef = useRef(null);
  const searchRef = useRef(null);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  // Fetch all companies
  const fetchAllCompanies = async () => {
    try {
      const response = await axios.get(
        'http://localhost:4000/api/users/search-companies',
        { withCredentials: true }
      );
      const companies = response.data.data || [];
      setAllCompanies(companies);
      // Do NOT set filteredCompanies here; keep it empty until user interaction
    } catch (error) {
      console.error('Error fetching all companies:', error);
      setAllCompanies([]);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query) {
      const filtered = allCompanies.filter(company =>
        company.companyName.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCompanies(filtered);
    } else {
      setFilteredCompanies([]); // Hide dropdown when query is empty
    }
  };

  // Show all companies when input is focused
  const handleFocus = () => {
    setFilteredCompanies(allCompanies);
  };

  // Navigate to CareerPage with company data
  const handleCompanyClick = (company) => {
    navigate('/carrerpage', { state: { company } });
    setSearchQuery('');
    setFilteredCompanies([]); // Clear dropdown after selection
  };

  // Fetch companies on mount
  useEffect(() => {
    fetchAllCompanies();
  }, []);

  // Handle click outside for profile and search dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setFilteredCompanies([]); // Hide search results
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="flex items-center justify-between bg-white shadow-md px-8 py-4 relative">
      <div className="flex items-center">
        <img src={logo} alt="TalentID Logo" className="h-8 w-auto" />
      </div>

      <div className="flex gap-5 space-y-4">
        <div className="form relative top-1" ref={searchRef}>
          <button
            type="button"
            className="absolute left-2 -translate-y-1/2 top-1/2 p-1 text-gray-700"
          >
            <FaSearch className="w-5 h-5" />
          </button>
          <input
            className="input pl-10 rounded-full px-8 py-3 border-2 border-transparent focus:outline-none focus:border-purple-500 placeholder-gray-400 transition-all duration-300 shadow-md w-full"
            placeholder="Search a company"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={handleFocus} // Show all companies on focus
          />
          {filteredCompanies.length > 0 && (
            <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {filteredCompanies.map((company, index) => (
                <div
                  key={index}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleCompanyClick(company)}
                >
                  {company.companyName}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-6">
          <div className="relative flex items-center" ref={profileRef}>
            <FaUserCircle className="text-gray-600 text-2xl cursor-pointer hover:text-purple-900 transition duration-300" />
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
                  <p className="text-gray-800 font-semibold mt-2">{user?.name}</p>
                  <p className="text-gray-500 text-sm">{user?.email}</p>
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
                  <li
                    className="flex items-center text-gray-600 hover:bg-gray-100 p-2 cursor-pointer"
                    onClick={() => {
                      logout();
                      navigate('/login');
                    }}
                  >
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