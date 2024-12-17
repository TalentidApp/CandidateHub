import React from 'react';
import ContactUsForm from './ContactUsForm';

import Button from '../common/Button';
import { contactUsHeroSectionData } from '../../utils/data';

const HeroSection = () => {
  return (
    <div className='relative w-full mt-7 flex gap-8 flex-wrap'> {/* Added flex-wrap */}
      {/* Left Section */}
      <div className='relative flex-[55] mt-9 max-w-full'> {/* Changed w-[55%] to flex-[55] */}
        <div className='flex flex-col gap-9 pb-9 border-b-2 border-b-[#D9D9D9] w-[90%] max-w-full'> {/* Adjusted to w-[90%] */}
          <h1 className='text-5xl font-semibold'>Contact Us</h1>
          <p className='text-[#414042] text-md text-wrap font-medium w-[60%] max-w-full'>
            Let’s Empower Your Supply Chain with Seamless and Reliable Logistics Solutions
          </p>
        </div>
        <div className='relative flex flex-col gap-11 w-full mt-10'> {/* Adjusted to w-[90%] */}
          {contactUsHeroSectionData.map((data, index) => (
            <div key={index} className='flex gap-6 justify-start items-center'> {/* Reduced gap */}
              <img src={data.image} alt="" className='w-14 h-12 object-contain' />
              <p className='text-lg'>{data.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section */}
      <div className='relative flex-[45] max-w-full'>
        <ContactUsForm />
      </div>
    </div>
  );
};

export default HeroSection;

