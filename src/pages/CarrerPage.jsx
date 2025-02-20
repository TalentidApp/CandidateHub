import Header from "../components/common/Header";
import { FaStar } from "react-icons/fa";  // Import FontAwesome stars
import lg from '../assets/kb.png';

const CareerPage = () => {
  const companyData = {
    logo: lg,
    name: "Kotak Mahindra Bank",
    address: "Hyderabad, Telangana, India",
    website: "https://www.kotak.com/",
    about: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
    contactPhone: "779526789",
    contactEmail: "jobs@kotak.com",
    rating: 4,
  };

  return (
    <div className="overflow-y-auto no-scrollbar">
      <Header/>
      
      <div className="max-w-5xl h-[600px] no-scrollbar overflow-y-auto mx-auto p-6 bg-white relative top-2">
        {/* Company Banner */}
        <div className="bg-purple-900 text-white text-center py-6 text-5xl font-semibold h-40">
          <h3 className="px-20"> Know if your candidate is double dating you.</h3> 
          {/* Company Logo (Half in Banner, Half Below) */}
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

        {/* About Section */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">About Company</h3>
          <p className="text-gray-600 leading-relaxed">{companyData.about}</p>
        </div>
      </div>
    </div>
  );
};

export default CareerPage;
