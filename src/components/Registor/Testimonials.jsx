import React, { useRef } from 'react';
import { testimonialsData } from '../../utils/data';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

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
        <div className="relative w-full text-white mt-12 ">
            <div className="w-full bg-black p-6 sm:p-10 flex flex-col gap-6 rounded-xl">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h2 className="text-center text-2xl sm:text-4xl font-medium mb-4 sm:mb-8">
                        Client Testimonials
                    </h2>
                    <div className="flex gap-4">
                        <div
                            className="w-9 h-9 rounded-full flex justify-center items-center border border-white bg-black text-white hover:bg-white hover:text-black"
                            onClick={scrollLeft}
                        >
                            <FaArrowLeft />
                        </div>
                        <div
                            className="w-9 h-9 rounded-full flex justify-center items-center border border-white bg-black text-white hover:bg-white hover:text-black"
                            onClick={scrollRight}
                        >
                            <FaArrowRight />
                        </div>
                    </div>
                </div>

                {/* Slider */}
                <div className="relative">
                    <div
                        ref={sliderRef}
                        className="flex overflow-x-auto space-x-4 hidden-scrollbar"
                    >
                        {testimonialsData.map((testimonial, index) => (
                            <div
                                key={index}
                                className="flex-none bg-white text-black rounded-lg p-4 sm:p-6 w-72 sm:w-80 shadow-md"
                            >
                                <p className="text-sm sm:text-base mb-4">{testimonial.text}</p>
                                <div className="flex items-center space-x-4">
                                    <img
                                        src="https://sfrbucket.s3.ap-south-1.amazonaws.com/Kunal.jpeg"
                                        alt={testimonial.author}
                                        className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="font-bold text-sm sm:text-base">
                                            {testimonial.author}
                                        </p>
                                        <p className="text-xs sm:text-sm text-gray-600">
                                            {testimonial.position}
                                        </p>
                                        <p className="text-xs sm:text-sm font-semibold">
                                            {testimonial.company}
                                        </p>
                                    </div>
                                </div>
                                {testimonial.logo && (
                                    <img
                                        src={testimonial.logo}
                                        alt={testimonial.company}
                                        className="h-6 sm:h-8 mt-4"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
