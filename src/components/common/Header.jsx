import { useState, useEffect, useRef } from 'react';
import { FaUserCircle, FaCog, FaSignOutAlt, FaTimes, FaSearch, FaAngleDown, FaFileAlt } from 'react-icons/fa';
import logo from '../../assets/logo.png';
import useAuthStore from '../../constants/store';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../lib/api';

const Header = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [allCompanies, setAllCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const profileRef = useRef(null);
  const searchRef = useRef(null);
  const { user, logout, loading, error, isAuthenticated, token } = useAuthStore();
  const navigate = useNavigate();

  const toggleProfile = () => setShowProfile(!showProfile);

  useEffect(() => {
    if (!isAuthenticated || !token) {
      console.log("Redirecting to login from Header due to missing auth or token");
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, token, navigate]);

  useEffect(() => {
    const fetchCompanies = async () => {
      if (!token) {
        navigate("/login", { replace: true });
        return;
      }
      try {
        const res = await api.get(`/api/users/search-companies`);
        setAllCompanies(res.data.data || []);
      } catch (err) {
        console.error("Fetch companies error:", err.response?.data);
        if (err.response?.status === 401) {
          useAuthStore.getState().clearAuthState();
          navigate("/login", { replace: true });
        } else {
          console.log(err.response?.data?.message || "Failed to fetch companies");
        }
      }
    };

    if (isAuthenticated && token) {
      fetchCompanies();
    }
  }, [isAuthenticated, token, navigate]);

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
    navigate(`/career/${encodeURIComponent(company.companyName)}`);
    setSearchQuery('');
    setFilteredCompanies([]);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setShowProfile(false);
      navigate('/login', { replace: true });
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) setShowProfile(false);
      if (searchRef.current && !searchRef.current.contains(event.target)) setFilteredCompanies([]);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="flex items-center justify-between border-b border-purple-100 bg-transparent px-4 py-3 sm:px-6 lg:px-8 shadow-sm">
      <div className="flex items-center">
        <img
          src={logo}
          alt="TalentID Logo"
          className="h-8 w-auto cursor-pointer transition-transform hover:scale-105"
          onClick={() => navigate('/')}
        />
      </div>

      {isAuthenticated && (
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="relative group" ref={searchRef}>
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#652d96] group-hover:text-[#4b2270] transition-colors">
              <FaSearch className="w-4 h-4" />
            </span>
            <input
              className="pl-10 pr-4 py-2 rounded-lg border border-purple-200 bg-purple-50 text-[#652d96] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#652d96] focus:bg-white w-full sm:w-64 md:w-80 transition-all duration-300"
              placeholder="Search companies..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={handleFocus}
              aria-label="Search companies"
            />
            {filteredCompanies.length > 0 && (
              <div className="absolute z-20 mt-2 w-full bg-white border border-purple-100 rounded-lg shadow-lg max-h-60 overflow-y-auto animate-fade-in">
                {filteredCompanies.map((company, index) => (
                  <div
                    key={index}
                    className="p-3 hover:bg-purple-50 cursor-pointer text-[#652d96] hover:text-[#4b2270] flex items-center gap-2 transition-colors"
                    onClick={() => handleCompanyClick(company)}
                  >
                    <span className="w-2 h-2 bg-[#652d96] rounded-full"></span>
                    {company.companyName}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative flex items-center group" ref={profileRef}>
            <FaUserCircle className="text-[#652d96] text-2xl cursor-pointer group-hover:text-[#4b2270] transition-colors" />
            <FaAngleDown
              className="text-[#652d96] text-2xl cursor-pointer group-hover:text-[#4b2270] transition-colors"
              onClick={toggleProfile}
              aria-label="Toggle profile menu"
            />
            {showProfile && (
              <div className="absolute z-40 right-0 top-full mt-3 w-64 bg-white border border-purple-100 rounded-lg shadow-lg animate-fade-in">
                <div className="flex justify-between items-center p-3 border-b border-purple-50">
                  <p className="text-[#652d96] font-semibold">My Account</p>
                  <FaTimes
                    className="text-gray-500 cursor-pointer hover:text-red-500 transition-colors"
                    onClick={() => setShowProfile(false)}
                    aria-label="Close profile menu"
                  />
                </div>
                <div className="p-3 text-center">
                  <p className="text-[#652d96] font-semibold">{user?.data?.name || "User"}</p>
                  <p className="text-gray-500 text-sm truncate">{user?.data?.email || ""}</p>
                </div>
                <ul className="space-y-1 p-2">
                  <li>
                    <Link
                      to="/profile"
                      className="flex items-center text-[#652d96] hover:bg-purple-50 hover:text-[#4b2270] p-2 rounded-md transition-colors"
                      onClick={() => setShowProfile(false)}
                    >
                      <FaUserCircle className="mr-2 text-[#652d96]" /> My Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/tests"
                      className="flex items-center text-[#652d96] hover:bg-purple-50 hover:text-[#4b2270] p-2 rounded-md transition-colors"
                      onClick={() => setShowProfile(false)}
                    >
                      <FaFileAlt className="mr-2 text-[#652d96]" /> Tests
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/formula"
                      className="flex items-center text-[#652d96] hover:bg-purple-50 hover:text-[#4b2270] p-2 rounded-md transition-colors"
                      onClick={() => setShowProfile(false)}
                    >
                      <FaCog className="mr-2 text-[#652d96]" /> Offer Preferences
                    </Link>
                  </li>
                  <li
                    className="flex items-center text-[#652d96] hover:bg-purple-50 hover:text-red-500 p-2 rounded-md cursor-pointer transition-colors"
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
      )}
    </header>
  );
};

export default Header;