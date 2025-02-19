import React from "react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-purple-50 text-gray-900">
      {/* Header */}
      {/* <header className="flex justify-between items-center p-4 bg-purple-700 text-white shadow-md">
        <h1 className="text-2xl font-bold">talent<span className="text-red-500">id</span></h1>
        <div className="flex items-center space-x-2">
          <span className="text-lg">Welcome, V Jai</span>
        </div>
      </header> */}

      {/* Main Content */}
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Welcome, V Jai</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cards */}
          <div className="p-4 border-2 border-purple-700 rounded-lg shadow-md bg-white">
            <h3 className="font-semibold">Offer letter - Talentid.app</h3>
            <p className="text-sm text-gray-600 mt-2">Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum</p>
            <button className="mt-4 px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800">View More</button>
          </div>

          <div className="p-4 border-2 border-purple-700 rounded-lg shadow-md bg-white">
            <h3 className="font-semibold">Engagement 1 - Talentid.app</h3>
            <p className="text-sm text-gray-600 mt-2">Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum</p>
            <button className="mt-4 px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800">Start</button>
          </div>

          <div className="p-4 border-2 border-purple-700 rounded-lg shadow-md bg-white">
            <h3 className="font-semibold">Engagement 2 - Talentid.app</h3>
            <p className="text-sm text-gray-600 mt-2">Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum</p>
            <button className="mt-4 px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800">Start</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
