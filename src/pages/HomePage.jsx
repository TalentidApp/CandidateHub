import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import video from "../assets/v.mp4";
import useAuthStore from "../constants/store"; 
import { useEffect } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, loading, error, fetchCandidateDetails, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      fetchCandidateDetails();
    }
  }, [fetchCandidateDetails, isAuthenticated]);

  console.log(loading,isAuthenticated,fetchCandidateDetails)
  useEffect(() => {
    if (!loading && !isAuthenticated && error) {
      navigate("/login");
    }
  }, [loading, isAuthenticated, error, navigate]);

  const handleSignOffer = () => {
    navigate("/sign-offer");
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-purple-50 text-gray-900">
      <Header />
      {/* Main Content */}
      <div className="p-6 bg-white h-screen flex flex-col md:flex-row gap-6">
        {/* Left Section: Content */}
        <div className="w-full md:w-2/1">
          <h2 className="text-3xl font-bold">Welcome Back, {user?.name || "User"}!</h2>
          <p className="text-gray-500 mb-4">Here{"'"}s what{"'"}s happening in your store today</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Offer Letter Card */}
            <div className="p-4 bg-white rounded-2xl border shadow-lg">
              <h3 className="font-semibold text-xl">Offer letter - Talentid.app</h3>
              <p className="text-sm text-gray-600 mt-2">Lorem ipsum Lorem ipsum Lorem ipsum...</p>
              <p className="text-sm text-gray-600 mt-2">Lorem ipsum Lorem ipsum Lorem ipsum...</p>
              <p className="text-sm text-gray-600 mt-2">Lorem ipsum Lorem ipsum Lorem ipsum...</p>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleSignOffer}
                  className="px-6 py-2 bg-purple-700 text-white font-medium rounded-full hover:scale-105 transition-all"
                >
                  Sign the offer
                </button>
                <button className="px-9 py-2 bg-red-700 text-white font-medium rounded-full hover:scale-105 transition-all">
                  Reject
                </button>
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl border shadow-lg">
              <h3 className="font-semibold text-xl">Engagement 1 - Talentid.app</h3>
              <p className="text-sm text-gray-600 mt-2">Lorem ipsum Lorem ipsum Lorem ipsum...</p>
              <p className="text-sm text-gray-600 mt-2">Lorem ipsum Lorem ipsum Lorem ipsum...</p>
              <p className="text-sm text-gray-600 mt-2">Lorem ipsum Lorem ipsum Lorem ipsum...</p>
              <div className="flex justify-center items-center gap-3 mt-4">
                <button className="px-20 py-2 bg-purple-700 text-white font-medium rounded-full hover:scale-105 transition-all">
                  Start
                </button>
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl border shadow-lg">
              <h3 className="font-semibold text-xl">Engagement 2 - Talentid.app</h3>
              <p className="text-sm text-gray-600 mt-2">Lorem ipsum Lorem ipsum Lorem ipsum...</p>
              <p className="text-sm text-gray-600 mt-2">Lorem ipsum Lorem ipsum Lorem ipsum...</p>
              <p className="text-sm text-gray-600 mt-2">Lorem ipsum Lorem ipsum Lorem ipsum...</p>
              <div className="flex justify-center items-center gap-3 mt-4">
                <button className="px-20 py-2 bg-purple-700 text-white font-medium rounded-full hover:scale-105 transition-all">
                  Start
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Video */}
        <div className="w-full md:w-1/3 flex justify-start items-start border-l-2 border-gray-300 pl-3 md:pt-[4.6rem]">
          <video className="w-full h-fit my-2 rounded-lg shadow-lg" controls autoPlay muted>
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;