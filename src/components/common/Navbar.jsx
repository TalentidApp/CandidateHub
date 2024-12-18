import React, { useState } from 'react';
import { navbarData } from '../../utils/data';
import { useNavigate } from 'react-router-dom';
import { CiLocationOn } from "react-icons/ci";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import Button from './Button';

const Navbar = () => {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="fixed top-0 left-0 w-full border-b border-[#D9D9D9] bg-white z-50">
            <div className="relative w-11/12 mx-auto">
                {/* Top Section */}
                <div className="flex justify-between items-center p-2">
                    {/* Logo */}
                    <img 
                        src="/images/Company-logo.png" 
                        alt="Company Logo" 
                        className="w-24 sm:w-32 lg:w-40 h-8"
                    />

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex gap-4 lg:gap-8">
                        {navbarData.map((data, index) => (
                            <div 
                                key={index} 
                                onClick={() => navigate(data.url)} 
                                className="text-sm lg:text-lg font-medium text-gray-700 cursor-pointer hover:text-[#C2202B] transition"
                            >
                                {data.title}
                            </div>
                        ))}
                    </div>

                    {/* Right Section */}
                    <div className="flex gap-2 sm:gap-4 items-center">
                        {/* Track Shipment */}
                        <div className="hidden sm:flex items-center gap-1">
                            <CiLocationOn className="text-[#C2202B]" size={20} />
                            <p className="text-[#C2202B] font-medium underline text-sm sm:text-base">
                                Track Shipment
                            </p>
                        </div>

                        {/* Login Button */}
                        <Button 
                            text="Login" 
                            onClick={() => navigate("/register")} 
                            className="text-sm sm:text-base px-3 sm:px-4 py-1 sm:py-2"
                        />

                        {/* Mobile Menu Icon */}
                        <div 
                            className="flex md:hidden cursor-pointer"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? (
                                <HiX size={24} />
                            ) : (
                                <HiOutlineMenuAlt3 size={24} />
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden mt-2 bg-white border-t border-[#D9D9D9] shadow-sm">
                        <div className="flex flex-col gap-3 py-4">
                            {navbarData.map((data, index) => (
                                <div 
                                    key={index} 
                                    onClick={() => {
                                        navigate(data.url);
                                        setIsMobileMenuOpen(false);
                                    }} 
                                    className="text-base font-medium text-gray-700 text-center cursor-pointer hover:text-[#C2202B] transition"
                                >
                                    {data.title}
                                </div>
                            ))}

                            <div 
                                onClick={() => {
                                    navigate("/register");
                                    setIsMobileMenuOpen(false);
                                }} 
                                className="text-base font-medium text-center text-[#C2202B] cursor-pointer hover:underline transition"
                            >
                                Login
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
