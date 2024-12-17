
import React from 'react'
import { registorHeroSectionData } from '../../utils/data';

import RegistrationForm from './RegistrationForm';

const HeroSection = () => {
    return (
        <div className='relative w-full mt-9'>


            <div className='flex mb-6'>

                {/* left section  */}

                
                <div className=' relative flex flex-col gap-3 w-[70%]'>

                    <div className='relative flex flex-col gap-5'>

                        <div className='flex flex-col gap-2'>

                            <h1 className='text-[#272727] text-5xl font-semibold'>More Than Just Logistics:</h1>
                            <h1 className='text-[#272727] text-5xl font-semibold'>Your Growth Partner</h1>

                        </div>

                        <div className='flex flex-col'>

                            <p className='text-[#535353] text-lg'>Our seamless logistics solutions empower brands to grow faster and smarter.</p>
                            <p className='text-[#535353] text-lg'> Let's move your business forward</p>

                        </div>

                    </div>

                    <div className=' relative w-full flex gap-7 mt-6'>

                        {

                            registorHeroSectionData.map((data, index) => (

                                <div className='flex flex-col w-[30%] gap-7 hover:bg-[#F8F2F2] p-4 px-8 rounded-md'>

                                    <img src={data.image} alt="" className='w-14 h-11' />
                                    <p className='text-[#272727] font-semibold text-lg'>{data.text}</p>

                                </div>
                            ))
                        }
                    </div>

                    <div className='flex flex-col gap-11 mt-10'>

                        <div className='flex flex-col gap-2'>


                            <h1 className='text-[#272727] text-4xl font-medium'>Partner with the Best</h1>
                            <p className='text-[#535353] text-lg'>Trusted by top brands and small businesses alike.</p>


                        </div>

                        <div>

                            <img src="/images/companies-logo-combinedImage.png" alt="" className='object-contain'/>

                        </div>

                    </div>

                </div>

                <div className='relative flex-[30] max-w-full'>

                    <RegistrationForm></RegistrationForm>

                </div>

            </div>



        </div>
    )
}

export default HeroSection;


