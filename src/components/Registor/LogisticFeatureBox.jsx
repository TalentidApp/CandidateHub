import React from "react";

const LogisticFeatureBox = ({ title, description, image }) => {
  return (
    <div className="relative border w-full sm:w-[300px] lg:w-[320px] max-w-full h-auto p-6 border-gray-200 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
      {/* Image Section */}
      {image && (
        <img
          src={image}
          alt={title}
          className="w-16 h-16 sm:w-20 sm:h-20 mb-4 object-contain"
        />
      )}

      {/* Content Section */}
      <div className="flex flex-col gap-3">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
          {title}
        </h2>
        <p className="text-sm sm:text-base text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default LogisticFeatureBox;
