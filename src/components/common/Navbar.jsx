
import React from 'react';

import { navbarData } from '../../utils/data';

import { useNavigate } from 'react-router-dom';

import { CiLocationOn } from "react-icons/ci";
import Button from './Button';

import HeaderSection from '../contactUs/HeroSection';


const Navbar = () => {

    const navigate = useNavigate();

    return (
        <div className='relative w-full border-b-2 backdrop:border-b-[#D9D9D9]'>

            <div className='relative w-11/12 gap-10 mx-auto'>

                <div className='flex relative w-full justify-between items-center p-2'>

                    <img src="/images/Company-logo.png" alt="" className='w-40 h-8' />

                    <div className='flex gap-14'>

                        {

                            navbarData.map((data, index) => (

                                <div key={index} onClick={() => {

                                    navigate(data.url);


                                }} className='text-lg font-normal cursor-pointer'>

                                    {data.title}

                                </div>
                            ))

                        }

                    </div>

                    <div className='flex gap-4'>

                        <div className='flex justify-center items-center gap-1'>

                            <CiLocationOn className="text-[#C2202B] font-semibold" size={20}></CiLocationOn>
                            <p className='text-[#C2202B] font-medium underline text-lg'>Track Shipment</p>

                        </div>
                        <div>

                            <Button text="Login" onClick={()=>{

                                navigate("/register")

                            }}></Button>

                        </div>

                    </div>
                </div>

            </div>

        </div>
    )
}

export default Navbar;
