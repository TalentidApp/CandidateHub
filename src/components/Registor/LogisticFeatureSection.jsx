import React from 'react';

import LogisticFeatureBox from './LogisticFeatureBox';
import { logisticsFeatures } from '../../utils/data';

const LogisticFeatureSection = () => {
    return (
        <div className='relative w-full h-full mt-8'>
            <div className='relative h-full mx-auto flex flex-col justify-center items-center bg-black p-8'>
                <div className='flex flex-col text-center mb-8'>
                    <h1 className='text-white text-5xl font-medium mb-4'>Transforming Logistics, Scaling Businesses</h1>
                    <p className='text-white text-lg'>Simplifying transportation so you can focus on growing your business.</p>
                </div>

                {/* Grid Layout for 4 Columns */}
                <div className='relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-7'>
                    {
                        logisticsFeatures.map((data, index) => (
                            <LogisticFeatureBox key={index} {...data} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default LogisticFeatureSection;


