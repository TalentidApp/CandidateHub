import Header from "../components/common/Header";
import { FaStar } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import defaultLogo from '../assets/kb.png';

const CareerPage = () => {
  const { state } = useLocation();
  const initialCompany = state?.company || {};
  const [companyData, setCompanyData] = useState({
    logo: defaultLogo,
    name: initialCompany.companyName || "Unknown Company",
    address: "Location not specified",
    website: "#",
    about: `No information available about ${initialCompany.companyName || "this company"}.`,
    contactPhone: "N/A",
    contactEmail: "N/A",
    rating: 4,
  });

  // Fetch company details from Proxycurl API
  const fetchCompanyDetails = async () => {
    try {
      const linkedinUrl = `https://www.linkedin.com/company/${companyData?.name.toLowerCase().replace(/\s+/g, '-')}`;
      const response = await axios.get(
        'https://nubela.co/proxycurl/api/v2/linkedin',
        {
          params: {
            url: linkedinUrl,
            fallback_to_cache: 'on-error', // Use cached data if live fetch fails
            use_cache: 'if-present', // Use cache if available
          },
          headers: {
            Authorization: "Bearer 5YNaBc83fDkUalGaRoW10w", // Replace with your Proxycurl API key
          },
        }
      );

      const data = response.data;
      setCompanyData(prev => ({
        ...prev,
        logo: data.logo || prev.logo,
        name: data?.name || prev.name,
        address: data.location || prev.address,
        website: data.website || prev.website,
        about: data.description || prev.about,
        contactPhone: data.phone || prev.contactPhone,
        contactEmail: data.email || prev.contactEmail,
        rating: data.rating || prev.rating,
      }));
    } catch (error) {
      console.error("Error fetching company details from Proxycurl:", error);
    }
  };

  useEffect(() => {
    if (initialCompany.companyName) {
      fetchCompanyDetails();
    }
  }, [initialCompany]);

  return (
    <div className="overflow-y-auto no-scrollbar">
      <Header />
      <div className="max-w-5xl h-[600px] no-scrollbar overflow-y-auto mx-auto p-6 bg-white relative top-2">
        <div className="bg-purple-900 text-white text-center py-6 text-5xl font-semibold h-40">
          <h3 className="px-20">Know if your candidate is double dating you.</h3>
          <div className="absolute left-10 top-48 transform -translate-y-1/2 w-40 h-40">
            <img
              src={companyData.logo}
              alt="Company Logo"
              className="w-full h-full rounded-full border-4 border-white shadow-lg"
            />
          </div>
        </div>

        <div className="flex justify-between mt-28">
          <div className="w-2/3">
            <h2 className="text-2xl font-bold">{companyData.name}</h2>
            <p className="text-gray-600">{companyData.address}</p>
            <a href={companyData.website} className="text-blue-500 underline">
              {companyData.website}
            </a>
          </div>

          <div className="w-1/3 text-gray-700 text-end">
            <div className="flex justify-end">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  size={22}
                  key={star}
                  className={`${star <= companyData.rating ? "text-yellow-500" : "text-gray-300"}`}
                />
              ))}
            </div>
            <h3 className="font-semibold text-md">Contact</h3>
            <p>{companyData.contactPhone}</p>
            <h3 className="font-semibold text-md">Email</h3>
            <p className="text-blue-500 underline">{companyData.contactEmail}</p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">About Company</h3>
          <p className="text-gray-600 leading-relaxed">{companyData.about}</p>
        </div>
      </div>
    </div>
  );
};

export default CareerPage;