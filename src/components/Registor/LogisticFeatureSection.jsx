import React from 'react';

import LogisticFeatureBox from './LogisticFeatureBox';
import { logisticsFeatures } from '../../utils/data';

const LogisticFeatureSection = () => {
    return (
        <div className="relative w-full h-full mt-8">
            {/* Hero Section */}
            <div className="relative h-full mx-auto flex flex-col justify-center items-center bg-gradient-to-r from-gray-800 via-gray-900 to-black p-8">
                {/* Heading Section */}
                <div className=" relative w-full flex flex-col text-center mb-12 max-w-3xl">
                    <h1 className="text-white text-3xl sm:text-4xl lg:text-4xl font-semibold mb-6 leading-snug">
                        Transforming Logistics, Scaling Businesses
                    </h1>
                    <p className="text-gray-300 text-xs sm:text-xs md:text-sm ">
                        Simplifying transportation so you can focus on growing your business.
                    </p>
                </div>

                {/* Features Grid Section */}
                <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-7xl">
                    {logisticsFeatures.map((data, index) => (
                        <LogisticFeatureBox key={index} {...data} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LogisticFeatureSection;
