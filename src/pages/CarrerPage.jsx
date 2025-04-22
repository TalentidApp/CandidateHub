import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaStar, FaBuilding, FaUsers, FaCalendarAlt, FaGlobe, FaPhone, FaEnvelope, FaChevronDown, FaChevronUp } from "react-icons/fa";
import Header from "../components/common/Header";
import defaultLogo from '../assets/kb.png';
import companies from '../constants/data';

const CareerPage = () => {
  const { companyName } = useParams();
  const [companyData, setCompanyData] = useState({
    logo: defaultLogo,
    companyName: "Unknown Company",
    address: "Location not specified",
    hqLocation: "Unknown",
    website: "#",
    about: "No information available about this company.",
    shortDescription: "No description available.",
    contactPhone: "N/A",
    contactEmail: "N/A",
    rating: 4,
    industry: "Unknown",
    employeeCount: 0,
    foundedYear: 0
  });
  const [error, setError] = useState(null);
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);

  // Fetch company details from static data
  useEffect(() => {
    const fetchCompanyDetails = () => {
      try {
        const normalizedName = decodeURIComponent(companyName).toLowerCase().replace(/[-_\s]+/g, '');
        const company = companies.find(
          (c) => c.companyName.toLowerCase().replace(/[-_\s]+/g, '') === normalizedName
        );
        if (!company) {
          throw new Error(`Company "${companyName}" not found`);
        }
        setCompanyData({
          logo: company.logo || defaultLogo,
          companyName: company.companyName || "Unknown Company",
          address: company.address || "Location not specified",
          hqLocation: company.hqLocation || "Unknown",
          website: company.website || "#",
          about: company.about || `No information available about ${company.companyName || "this company"}.`,
          shortDescription: company.shortDescription || "No description available.",
          contactPhone: company.contactPhone || "N/A",
          contactEmail: company.contactEmail || "N/A",
          rating: company.rating || 4,
          industry: company.industry || "Unknown",
          employeeCount: company.employeeCount || 0,
          foundedYear: company.foundedYear || 0
        });
        setError(null);
      } catch (err) {
        setError(err.message);
        setCompanyData({
          logo: defaultLogo,
          companyName: decodeURIComponent(companyName) || "Unknown Company",
          address: "Location not specified",
          hqLocation: "Unknown",
          website: "#",
          about: `No information available about ${decodeURIComponent(companyName) || "this company"}.`,
          shortDescription: "No description available.",
          contactPhone: "N/A",
          contactEmail: "N/A",
          rating: 4,
          industry: "Unknown",
          employeeCount: 0,
          foundedYear: 0
        });
      }
    };

    if (companyName) {
      fetchCompanyDetails();
    }
  }, [companyName]);

  const toggleAbout = () => setIsAboutExpanded(!isAboutExpanded);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6 animate-fade-in">
            {error}
          </div>
        )}

        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-purple-700 to-purple-900 text-white rounded-xl shadow-2xl overflow-hidden mb-12">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative flex flex-col md:flex-row items-center p-8 md:p-12">
            <img
              src={companyData.logo}
              alt={`${companyData.companyName} Logo`}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-lg object-cover mb-4 md:mb-0 md:mr-6 animate-fade-in"
              onError={(e) => (e.target.src = defaultLogo)}
            />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold animate-slide-in">{companyData.companyName}</h1>
              <p className="text-lg md:text-xl mt-2 animate-slide-in delay-100">{companyData.shortDescription}</p>
              <div className="flex items-center mt-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    size={20}
                    className={star <= Math.round(companyData.rating) ? "text-yellow-400" : "text-gray-300"}
                  />
                ))}
                <span className="ml-2 text-sm font-semibold">{companyData.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Company Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Stats Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 animate-fade-in">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Company Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <FaBuilding className="text-purple-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Industry</p>
                  <p className="font-semibold">{companyData.industry}</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaUsers className="text-purple-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Employees</p>
                  <p className="font-semibold">{companyData.employeeCount.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaCalendarAlt className="text-purple-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Founded</p>
                  <p className="font-semibold">{companyData.foundedYear || "N/A"}</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaGlobe className="text-purple-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Headquarters</p>
                  <p className="font-semibold">{companyData.hqLocation}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 animate-fade-in delay-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-semibold flex items-center">
                  <FaPhone className="text-purple-600 mr-2" />
                  {companyData.contactPhone}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <a
                  href={`mailto:${companyData.contactEmail}`}
                  className="font-semibold text-purple-600 hover:text-purple-800 flex items-center transition-all duration-200"
                  aria-label={`Email ${companyData.companyName}`}
                >
                  <FaEnvelope className="mr-2" />
                  {companyData.contactEmail}
                </a>
              </div>
              <div>
                <p className="text-sm text-gray-500">Website</p>
                <a
                  href={companyData.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-purple-600 hover:text-purple-800 flex items-center transition-all duration-200"
                  aria-label={`Visit ${companyData.companyName} website`}
                >
                  <FaGlobe className="mr-2" />
                  {companyData.website.replace(/^https?:\/\//, '')}
                </a>
              </div>
            </div>
          </div>

          {/* Location Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 animate-fade-in delay-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Location</h3>
            <p className="text-gray-600">{companyData.address}</p>
            <div className="mt-4">
              <button
                className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 hover:scale-105 transition-all duration-200"
                onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(companyData.address)}`, '_blank')}
                aria-label={`View ${companyData.companyName} on Google Maps`}
              >
                View on Map
              </button>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-12 animate-fade-in">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-800">About {companyData.companyName}</h3>
            <button
              className="text-purple-600 hover:text-purple-800 transition-all duration-200"
              onClick={toggleAbout}
              aria-label={isAboutExpanded ? "Collapse about section" : "Expand about section"}
            >
              {isAboutExpanded ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>
          <div className={`mt-4 text-gray-600 leading-relaxed transition-all duration-300 ${isAboutExpanded ? 'max-h-96' : 'max-h-24'} overflow-hidden`}>
            {companyData.about}
          </div>
        </div>

        {/* Highlights Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-12 animate-fade-in delay-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Company Highlights</h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
              Recognized as a leader in {companyData.industry} by industry analysts.
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
              Serving clients in over {Math.ceil(companyData.employeeCount / 100)} countries.
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
              Committed to sustainability and innovation since {companyData.foundedYear || "its founding"}.
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default CareerPage;