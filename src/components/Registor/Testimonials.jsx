import React, { useRef } from 'react';

import { testimonialsData } from '../../utils/data';

import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa";


const Testimonials = () => {


    const sliderRef = useRef(null);

    const scrollLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    return (
        <div className=" relative w-full text-white mt-12">

            <div className='w-full bg-black p-10 flex flex-col gap-6 rounded-xl'>

                <div className='flex justify-between items-center'>

                    <h2 className="text-center text-4xl font-medium mb-8">Client Testimonials</h2>

                    <div className='flex gap-5'>

                        <div className='w-9 h-9 rounded-full flex cursor-pointer justify-center items-center border border-white bg-black text-white' onClick={scrollLeft}>

                            <FaArrowLeft></FaArrowLeft>

                        </div>

                        <div className='w-9 h-9 rounded-full cursor-pointer flex justify-center items-center border border-white bg-black text-white' onClick={scrollRight}>

                            <FaArrowRight></FaArrowRight>

                        </div>

                    </div>

                </div>

                <div className="relative">
                    {/* Left Arrow */}

                    {/* Slider */}
                    <div
                        ref={sliderRef}
                        className="flex overflow-x-auto space-x-6 hidden-scrollbar"
                        style={{ scrollBehavior: 'smooth' }}
                    >
                        {testimonialsData.map((testimonial, index) => (
                            <div
                                key={index}
                                className="flex-none bg-white text-black rounded-lg p-6 w-80 shadow-md"
                            >
                                <p className="text-sm mb-4">{testimonial.text}</p>
                                <div className="flex items-center space-x-4">
                                    <img
                                        src="https://sfrbucket.s3.ap-south-1.amazonaws.com/Kunal.jpeg"
                                        alt={testimonial.author}
                                        className="h-12 w-12 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="font-bold text-sm">{testimonial.author}</p>
                                        <p className="text-xs text-gray-600">{testimonial.position}</p>
                                        <p className="text-xs font-semibold">{testimonial.company}</p>
                                    </div>
                                </div>
                                <img
                                    src={testimonial.logo}
                                    alt={testimonial.company}
                                    className="h-8 mt-4"
                                />
                            </div>
                        ))}
                    </div>

                </div>

            </div>

        </div>
    );
};

export default Testimonials;
