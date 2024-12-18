import React from 'react';

import Navbar from '../components/common/Navbar';
import HeroSection from '../components/contactUs/HeroSection';
import CompanySection from '../components/contactUs/CompanySection';

import FooterSection from '../components/common/FooterSection';

const ContactUs = () => {
    return (
        <div className='relative w-full h-full overflow-x-hidden'> {/* Added overflow-x-hidden here */}
            <div className='relative w-full flex-col'>
                <Navbar />
                <div className='relative flex flex-col mt-16 w-11/12 mx-auto overflow-hidden'> {/* Keep w-11/12 */}
                    <HeroSection />
                    <CompanySection />
                    <FooterSection></FooterSection>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
