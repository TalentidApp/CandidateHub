import React from 'react';
import { registorHeroSectionData } from '../../utils/data';
import RegistrationForm from './RegistrationForm';

const HeroSection = () => {
  return (
    <div className="relative w-full mt-9 px-4 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Section */}
        <div className="relative flex-[70%] flex flex-col gap-8 w-full">
          {/* Heading and Subheading */}
          <div className="flex flex-col gap-4">
            <h1 className="text-[#272727] text-3xl sm:text-4xl lg:text-5xl font-semibold">
              More Than Just Logistics:
            </h1>
            <h1 className="text-[#272727] text-3xl sm:text-4xl lg:text-5xl font-semibold">
              Your Growth Partner
            </h1>
            <p className="text-[#535353] text-sm sm:text-base lg:text-lg">
              Our seamless logistics solutions empower brands to grow faster and smarter.
              Let’s move your business forward.
            </p>
          </div>

          {/* Features Section */}
          <div className="flex flex-wrap gap-4 mt-6">
            {registorHeroSectionData.map((data, index) => (
              <div
                key={index}
                className="flex flex-col w-full sm:w-[45%] lg:w-[30%] gap-4 hover:bg-[#F8F2F2] p-4 rounded-md transition-all duration-300"
              >
                <img src={data.image} alt="" className="w-12 h-10 sm:w-14 sm:h-11 object-contain" />
                <p className="text-[#272727] font-semibold text-sm sm:text-base lg:text-lg">
                  {data.text}
                </p>
              </div>
            ))}
          </div>

          {/* Partners Section */}
          <div className="flex flex-col gap-6 mt-8">
            <h1 className="text-[#272727] text-2xl sm:text-3xl lg:text-4xl font-medium">
              Partner with the Best
            </h1>
            <p className="text-[#535353] text-sm sm:text-base lg:text-lg">
              Trusted by top brands and small businesses alike.
            </p>
            <img
              src="/images/companies-logo-combinedImage.png"
              alt="Companies Logo"
              className="object-contain w-full max-w-[80%] sm:max-w-[60%] lg:max-w-[50%] "
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="relative flex-[30%] w-full lg:max-w-[400px]">
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;


