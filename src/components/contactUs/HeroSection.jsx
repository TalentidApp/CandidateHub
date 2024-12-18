import React from 'react';
import ContactUsForm from './ContactUsForm';
import { contactUsHeroSectionData } from '../../utils/data';

const HeroSection = () => {
  return (
    <div className='relative w-full mt-7 flex flex-wrap gap-8 lg:flex-nowrap px-4 lg:px-0'>
      {/* Left Section */}
      <div className='relative flex-[55%] w-full mt-9'>
        <div className='flex flex-col gap-6 pb-8 border-b-2 border-b-[#D9D9D9] w-full lg:w-[90%]'>
          <h1 className='text-3xl sm:text-4xl lg:text-5xl font-semibold'>
            Contact Us
          </h1>
          <p className='text-[#414042] text-sm sm:text-md lg:text-lg font-medium w-full lg:w-[60%]'>
            Let’s Empower Your Supply Chain with Seamless and Reliable Logistics Solutions
          </p>
        </div>
        <div className='flex flex-col gap-8 w-full mt-8'>
          {contactUsHeroSectionData.map((data, index) => (
            <div key={index} className='flex gap-4 lg:gap-6 items-center'>
              <img 
                src={data.image} 
                alt="" 
                className='w-12 h-10 sm:w-14 sm:h-12 object-contain' 
              />
              <p className='text-sm sm:text-md lg:text-lg'>
                {data.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section */}
      <div className='relative flex-[45%] w-full'>
        <ContactUsForm />
      </div>
    </div>
  );
};

export default HeroSection;
