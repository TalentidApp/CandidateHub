
import React from 'react'
import HeroSection from '../components/Registor/HeroSection';

import Navbar from '../components/common/Navbar';
import LogisticFeatureSection from '../components/Registor/LogisticFeatureSection';
import Testimonials from '../components/Registor/Testimonials';
import FooterSection from '../components/common/FooterSection';
import Button from '../components/common/Button';
const RegistorPage = () => {
    return (
        <div className='flex flex-col relative w-full h-full'>

            <Navbar></Navbar>

            <div className=' relative mt-16 flex flex-col w-11/12 mx-auto'>

                <HeroSection></HeroSection>

                <LogisticFeatureSection></LogisticFeatureSection>

                <div className="relative mt-14">
                    <div className="relative flex flex-wrap md:flex-nowrap gap-7 items-center">
                        {/* Text Section */}
                        <div className="flex flex-col justify-start items-start w-full md:w-1/2 space-y-8">
                            <div className="flex flex-col gap-4">
                                <h1 className="text-[#272727] text-2xl md:text-4xl font-semibold">
                                    Is Your Business Held Hostage by a Single Transporter?
                                </h1>
                                <p className="text-[#535353] text-base md:text-lg">
                                    With our wide range of transporter network, you gain the flexibility to switch and save on every shipment.
                                </p>
                            </div>
                            <div>
                                <Button text="Register" />
                            </div>
                        </div>

                        {/* Image Section */}
                        <div className="relative flex justify-center items-center w-full md:w-1/2">
                            {/* Red Circular Background */}
                            <div className="w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 bg-[#C2202B] rounded-full absolute right-0 md:right-10 bottom-[-0.7rem]"></div>

                            {/* Foreground Image */}
                            <img
                                src="/images/registor/userImage.png"
                                alt="Delivery Person"
                                className="relative z-10 w-[70%] sm:w-[50%] md:w-auto h-auto max-w-full object-contain"
                            />

                        </div>
                    </div>
                </div>



                <Testimonials></Testimonials>

                <FooterSection></FooterSection>

            </div>

        </div>

    )
}

export default RegistorPage;


