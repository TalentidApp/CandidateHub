import React from "react";

const LogisticFeatureBox = ({ title, description, image }) => {
    return (
        <div className=" relative border w-[280px] h-[354px] px-14 border-gray-200 rounded-lg shadow-md p-6 bg-white hover:shadow-lg transition duration-300 flex flex-col items-center text-center">
            {image && (
                <img
                    src={image}
                    alt={title}
                    className="w-16 h-14 mb-4 object-contain"
                />
            )}

            <div className=" flex flex-col gap-3">


                <h2 className="text-xl font-semibold mb-2 text-gray-800">{title}</h2>
                <p className="text-gray-600">{description}</p>

            </div>

        </div>
    );
};

export default LogisticFeatureBox;


