
import React from 'react'
import HeroSection from '../components/Registor/HeroSection';

import Navbar from '../components/common/Navbar';
import LogisticFeatureSection from '../components/Registor/LogisticFeatureSection';
import Testimonials from '../components/Registor/Testimonials';
import FooterSection from '../components/common/FooterSection';
import Button from '../components/common/Button';
const RegistorPage = () => {

    const companiesLogo = [

        "images/registor/companies/gati.png",
        "images/registor/companies/metroplus.png",
        "images/registor/companies/amazon_shipping.png",
        "images/registor/companies/delhivery.png",
        "images/registor/companies/blueDart.png"
    ]

    return (
        <div className='flex flex-col relative w-full h-full'>

            <Navbar></Navbar>

            <div className=' relative mt-16 flex flex-col w-11/12 mx-auto'>

                <HeroSection></HeroSection>

                <LogisticFeatureSection></LogisticFeatureSection>

                <div className="relative mt-14">
                    <div className="relative flex flex-wrap md:flex-nowrap gap-7">
                        {/* Text Section */}
                        <div className="flex flex-col justify-start items-start w-full md:w-1/2 space-y-8">
                            <div className="flex flex-col gap-4">
                                <h1 className="text-[#272727] text-xl md:text-4xl font-semibold">
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
                        <div className="relative justify-center items-center w-full md:w-1/2 mt-14 h-auto mb-24 hidden xl:flex">
                            {/* Red Circular Background */}
                            <div className="bg-[#C2202B] rounded-full w-[300px] h-[300px] z-10"></div>
                            <img
                                src="/images/registor/userImage.png"
                                alt="Delivery Person"
                                className="w-[400px] h-[394px] object-contain z-40 absolute left-[11.4rem] bottom-[-1.7rem]"
                            />
                            <div className="w-[7rem] h-[7rem] z-50 bg-white absolute right-[4.6rem] top-[-0.4rem] rounded-full flex items-center shadow-xl justify-center">
                                <img src="/images/registor/companies/gati.png" alt="GATI" className="w-[70%] h-[70%] mix-blend-multiply object-contain" />
                            </div>

                            <div className="w-[7rem] z-50 h-[7rem] left-[10.6rem] top-[-6rem] absolute bg-white rounded-full flex items-center justify-center shadow-xl">
                                <img src="/images/registor/companies/vrl.png" className="w-[70%] h-[70%] object-contain mix-blend-multiply" />
                            </div>

                            <div className="w-[7rem] h-[7rem] absolute shadow-xl z-50 left-[6.7rem] top-[2rem] bg-white rounded-full flex items-center justify-center">
                                <img src="/images/registor/companies/metroplus.png" alt="Metroplus" className="w-[70%] h-[70%] mix-blend-multiply object-contain" />
                            </div>

                            <div className="w-[7rem] h-[7rem] absolute bottom-[-1rem] left-[5.4rem] z-50 bg-white shadow-xl rounded-full flex items-center justify-center">
                                <img src="/images/contactUS/company-logo/tynor.png" alt="Delhivery" className="w-[70%] h-[70%] mix-blend-multiply object-contain" />
                            </div>

                            <div className="w-[7rem] h-[7rem] absolute shadow-xl z-30 left-[40%] top-[90%] bg-white rounded-full flex items-center justify-center opacity-80">
                                <img src="/images/registor/companies/blueDart.png" alt="Metroplus" className="w-[70%] h-[70%] mix-blend-multiply object-contain" />
                            </div>

                            <div className="w-[7rem] h-[7rem] absolute shadow-xl z-30 right-[4.4rem] top-[60%] bg-white rounded-full flex items-center justify-center opacity-80">
                                <img src="/images/registor/companies/amazon_shipping.png" alt="Metroplus" className="w-[70%] h-[70%] mix-blend-multiply object-contain" />
                            </div>

                            <div className="w-[7rem] h-[7rem] absolute shadow-xl z-30 right-[12rem] top-[-30%] bg-white rounded-full flex items-center justify-center">
                                <img src="/images/registor/companies/ddtc.png" alt="ddtc" className="w-[70%] h-[70%] mix-blend-multiply object-contain" />
                            </div>

                            {/* Foreground Image */}
                            <div className="hidden md:flex flex-col items-center relative z-10">
                                {/* Logos Section */}
                                <div className="grid grid-cols-3 gap-4 mt-4">
                                    {/* Add logos with circular backgrounds */}

                                    {/* <div className="w-[5rem] h-[5rem] bg-white border rounded-full flex items-center justify-center">
                                        <img src="/images/registor/companies/gati.png" className="w-[80%] h-[80%]  mix-blend-multiply object-contain" />
                                    </div>

                                    <div className="w-[5rem] h-[5rem] bg-white border rounded-full flex items-center justify-center">
                                        <img src="/images/registor/companies/amazon_shipping.png" alt="Amazon Shipping" className="w-[80%] h-[80%] mix-blend-multiply object-contain" />
                                    </div>
                                    <div className="w-[5rem] h-[5rem] bg-white border rounded-full flex items-center justify-center">
                                        <img src="/images/registor/companies/blueDart.png" alt="Blue Dart" className="w-[80%] h-[80%] mix-blend-multiply object-contain" />
                                    </div> */}
                                </div>
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


