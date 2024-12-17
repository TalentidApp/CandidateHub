import React from "react";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";

import { footerData } from "../../utils/data";

const FooterSection = () => {
    return (
        <footer className="relative w-full mt-40">
            <div className="container">
                {/* Top Section */}
                <div className="flex flex-wrap justify-between mb-6 border-b pb-6 border-b-[#BEBEBE]">
                    <div className="flex gap-24">

                        <div className="w-56 h-11">

                            <img src="/images/company-logo-2.png" alt="" className=" w-full h-full bg-cover " />

                        </div>

                        <p className="text-[#272727] max-w-xs">

                            Optimizing supply chains through warehousing and transportation services

                        </p>

                    </div>
                    {/* Social Icons */}
                    <div className="flex space-x-4">

                        <div className="rounded-full flex justify-center items-center w-11 h-11 border border-[#C6BBBB]">

                            <FaLinkedinIn></FaLinkedinIn>

                        </div>

                        <div className="rounded-full flex justify-center items-center w-11 h-11 border border-[#C6BBBB]">

                            <FaInstagram></FaInstagram>

                        </div>

                        <div className="rounded-full flex justify-center items-center w-11 h-11 border border-[#C6BBBB]">

                            <IoLogoYoutube></IoLogoYoutube>

                        </div>

                    </div>

                </div>

                {/* Footer Links */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-10">
                    {/* Company */}
                    <div className="flex flex-col gap-6">
                        <h4 className="text-xl font-semibold text-[#272727] gap-6">Company</h4>
                        <ul className="flex flex-col gap-4">
                            {footerData.company.map((item, index) => (
                                <li key={index} className="text-[#272727] hover:text-gray-800 text-lg">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="flex flex-col gap-6">
                        <h4 className="text-xl font-semibold text-[#272727] gap-6">Services</h4>
                        <ul className="flex flex-col gap-4">
                            {footerData.services.map((item, index) => (
                                <li key={index} className="text-gray-600 hover:text-gray-800 text-lg">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="flex flex-col gap-6">
                        <h4 className="text-xl font-semibold text-[#272727] gap-6">Resources</h4>
                        <ul className="flex flex-col gap-4">
                            {footerData.resources.map((item, index) => (
                                <li key={index} className="text-gray-600 hover:text-gray-800 text-lg">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="flex flex-col gap-6">

                        <h4 className="text-xl font-semibold text-[#272727] gap-6">Support</h4>
                        <ul className="flex flex-col gap-4">
                            {footerData.support.map((item, index) => (
                                <li key={index} className="text-gray-600 hover:text-gray-800 text-lg">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Transportation Network */}
                    <div className="flex flex-col gap-6">

                        <h4 className="text-xl font-semibold text-[#272727] gap-6">
                            Transportation Network
                        </h4>
                        <ul className="flex flex-col gap-4">
                            {footerData.transportationNetwork.map((item, index) => (
                                <li key={index} className="text-gray-600 hover:text-gray-800 text-lg">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="text-center flex justify-between text-gray-500 mt-8 text-sm py-4 backdrop:border-t-[#BEBEBE] border-t-2">

                    <p>@2024 AAJ Swift. All Rights Reserved</p>

                    <div className="flex gap-4">

                        <p>ISO 9001: 2015, ISO 27001: 2013 Certified Company</p>

                        <p>CIN: L63090DL2011PLC221234</p>

                    </div>

                </div>
            </div>
        </footer>
    );
};

export default FooterSection;
