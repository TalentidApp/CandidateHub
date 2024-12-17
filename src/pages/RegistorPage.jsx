
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

            <div className=' relative flex flex-col w-11/12 mx-auto'>

                <HeroSection></HeroSection>

                <LogisticFeatureSection></LogisticFeatureSection>

                <div className=' relative mt-14'>

                    <div className=' relative flex gap-7'>


                        <div className='flex flex-col justify-start items-start'>

                            <div className='flex flex-col justify-center items-center gap-5'>

                                <div className='flex flex-col gap-4'>

                                    <h1 className='text-[#272727] text-4xl font-semibold w-[60%]'>Is Your Business Held Hostage by a Single Transporter?</h1>

                                    <p className='text-[#535353] text-lg w-[68%]'>With our wide range of transporter network, you gain the flexibility to switch and save on every shipment. </p>

                                </div>


                            </div>

                            <div className='w-[30%] justify-start items-start mt-8'>

                                <Button text="Registor"></Button>

                            </div>

                        </div>

                        <div className="relative flex items-center justify-center">
                            {/* Red Circular Background */}
                            <div className="w-80 h-80 bg-[#C2202B] rounded-full absolute right-20 bottom-[-0.7rem]"></div>

                            {/* Foreground Image */}
                            <img
                                src="/images/registor/userImage.png"
                                alt="Delivery Person"
                                className="relative z-10 w-auto h-auto"
                            />

                            {/* Smaller Rounded Images */}
                            <div className="absolute w-16 h-16 bg-white rounded-full flex items-center justify-center top-0 left-0 shadow-md">
                                <img
                                    src="/images/registor/logo1.png"
                                    alt="Logo 1"
                                    className="w-12 h-12 rounded-full"
                                />
                            </div>

                            <div className="absolute w-16 h-16 bg-white rounded-full flex items-center justify-center top-0 right-5 shadow-md">
                                <img
                                    src="/images/registor/logo2.png"
                                    alt="Logo 2"
                                    className="w-12 h-12 rounded-full"
                                />
                            </div>

                            <div className="absolute w-16 h-16 bg-white rounded-full flex items-center justify-center bottom-[-1rem] left-3 shadow-md">
                                <img
                                    src="/images/registor/logo3.png"
                                    alt="Logo 3"
                                    className="w-12 h-12 rounded-full"
                                />
                            </div>

                            <div className="absolute w-16 h-16 bg-white rounded-full flex items-center justify-center bottom-[-1rem] right-10 shadow-md">
                                <img
                                    src="/images/registor/logo4.png"
                                    alt="Logo 4"
                                    className="w-12 h-12 rounded-full"
                                />
                            </div>

                            <div className="absolute w-16 h-16 bg-white rounded-full flex items-center justify-center bottom-[50%] right-[-1rem] shadow-md">
                                <img
                                    src="/images/registor/logo5.png"
                                    alt="Logo 5"
                                    className="w-12 h-12 rounded-full"
                                />
                            </div>
                            
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


