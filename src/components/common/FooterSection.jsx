import { FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { footerData } from "../../utils/data";

const FooterSection = () => {
  return (
    <footer className="relative w-full mt-24 py-12">
      <div className="container mx-auto px-6 md:px-12">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b pb-8 border-b-gray-300 gap-6 md:gap-0">
          {/* Logo and Description */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <img
              src="/images/company-logo-2.png"
              alt="Company Logo"
              className="w-44 h-12 object-contain"
            />
            <p className="text-gray-700 text-sm md:text-base max-w-sm leading-relaxed">
              Optimizing supply chains through warehousing and transportation
              services.
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-4">
            <div className="rounded-full flex justify-center items-center w-10 h-10 md:w-12 md:h-12 border border-gray-400 hover:bg-gray-200 transition">
              <FaLinkedinIn className="text-gray-600 text-lg" />
            </div>
            <div className="rounded-full flex justify-center items-center w-10 h-10 md:w-12 md:h-12 border border-gray-400 hover:bg-gray-200 transition">
              <FaInstagram className="text-gray-600 text-lg" />
            </div>
            <div className="rounded-full flex justify-center items-center w-10 h-10 md:w-12 md:h-12 border border-gray-400 hover:bg-gray-200 transition">
              <IoLogoYoutube className="text-gray-600 text-lg" />
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-10">
          {/* Company */}
          <div className="flex flex-col gap-4">
            <h4 className="text-lg font-semibold text-gray-800">Company</h4>
            <ul className="flex flex-col gap-2">
              {footerData.company.map((item, index) => (
                <li
                  key={index}
                  className="text-gray-600 hover:text-gray-900 text-sm md:text-base"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="flex flex-col gap-4">
            <h4 className="text-lg font-semibold text-gray-800">Services</h4>
            <ul className="flex flex-col gap-2">
              {footerData.services.map((item, index) => (
                <li
                  key={index}
                  className="text-gray-600 hover:text-gray-900 text-sm md:text-base"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="flex flex-col gap-4">
            <h4 className="text-lg font-semibold text-gray-800">Resources</h4>
            <ul className="flex flex-col gap-2">
              {footerData.resources.map((item, index) => (
                <li
                  key={index}
                  className="text-gray-600 hover:text-gray-900 text-sm md:text-base"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="flex flex-col gap-4">
            <h4 className="text-lg font-semibold text-gray-800">Support</h4>
            <ul className="flex flex-col gap-2">
              {footerData.support.map((item, index) => (
                <li
                  key={index}
                  className="text-gray-600 hover:text-gray-900 text-sm md:text-base"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Transportation Network */}
          <div className="flex flex-col gap-4">
            <h4 className="text-lg font-semibold text-gray-800">
              Transportation Network
            </h4>
            <ul className="flex flex-col gap-2">
              {footerData.transportationNetwork.map((item, index) => (
                <li
                  key={index}
                  className="text-gray-600 hover:text-gray-900 text-sm md:text-base"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-6 border-t border-gray-300 text-gray-600 text-sm md:flex md:justify-between md:items-center">
          <p className="text-center md:text-left">
            &copy; 2024 AAJ Swift. All Rights Reserved.
          </p>
          <div className="mt-4 md:mt-0 flex flex-col md:flex-row gap-2 md:gap-4 text-center md:text-left">
            <p>ISO 9001: 2015, ISO 27001: 2013 Certified Company</p>
            <p>CIN: L63090DL2011PLC221234</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
