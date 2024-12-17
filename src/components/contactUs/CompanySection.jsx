import React from 'react';
import { contactUsCompaniesLogo } from '../../utils/data';

const CompanySection = () => {
  return (
    <div className='relative w-full flex flex-col gap-5 bg-white mt-12'>

      {/* Header Section */}
      <div className="text-center px-4">
        <h1 className="text-3xl md:text-5xl font-medium text-gray-800">
          Logistics Partner for Exponential Growth
        </h1>
        <p className="text-md md:text-lg text-[#414042] mt-5">
          Trusted by top brands and small businesses alike
        </p>
      </div>

      {/* Grid Section */}
      <div className="relative w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 mt-5">
        {contactUsCompaniesLogo.map((data, index) => (
          <div
            key={index}
            className="flex items-center justify-center border border-[#BEBEBE] p-4 md:p-6 w-full"
          >
            {

                data.image == "" ? (<p className="w-full h-28 p-5 px-7 md:h-28 object-contain bg-contain mix-blend-multiply"></p>):(

                    <img
                    src={data.image}
                    alt="Company Logo"
                    className="w-full h-28 p-5 px-7 md:h-28 object-contain bg-contain mix-blend-multiply"
                  />
                )
            }

          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanySection;
