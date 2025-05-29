import { useEffect, useRef } from "react";
import useAuthStore from "../constants/store";
import { FaEnvelope, FaUser, FaCode, FaBriefcase, FaCalendarAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import Header from "@/components/common/Header";

const ProfilePage = () => {
  const { user, loading, error, fetchCandidateDetails } = useAuthStore();
  const profileRef = useRef(null);
  const skillsRef = useRef(null);
  const offersRef = useRef(null);

  useEffect(() => {
    fetchCandidateDetails();
  }, [fetchCandidateDetails]);

  console.log("User from store:", user);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
        <div className="bg-white p-8 rounded-2xl shadow-xl border-l-4 border-red-500 max-w-md mx-4">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Error Loading Profile</h3>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md mx-4 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaUser className="text-2xl text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No Profile Data</h3>
          <p className="text-gray-600">Unable to load user information at this time.</p>
        </div>
      </div>
    );
  }

  const { email, name, skills = [], offers = [], createdAt } = user.data || {};

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'accepted':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header/>
      
      {/* Hero Section with Profile */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 to-blue-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
          <section ref={profileRef} className="mb-8">
            <div className=" rounded-3xl shadow-2xl border border-white/20 p-8 lg:p-12">
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                <div className="relative">
                  <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-3xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform duration-300">
                    <FaUser className="text-5xl lg:text-6xl text-white" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg"></div>
                </div>

                {/* Profile Info */}
                <div className="flex-1 text-center lg:text-left">
                  <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                    {name || "Anonymous Candidate"}
                  </h1>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-center lg:justify-start gap-3 text-gray-700">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <FaEnvelope className="text-purple-600" />
                      </div>
                      <span className="text-lg font-medium">{email || "No email provided"}</span>
                    </div>
                    
                    <div className="flex items-center justify-center lg:justify-start gap-3 text-gray-600">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <FaCalendarAlt className="text-blue-600" />
                      </div>
                      <span className="text-base">
                        Member since {createdAt ? new Date(createdAt).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        }) : "N/A"}
                      </span>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                    <div className="bg-purple-50 px-4 py-2 rounded-full border border-purple-200">
                      <span className="text-purple-700 font-semibold">{skills.length} Skills</span>
                    </div>
                    <div className="bg-blue-50 px-4 py-2 rounded-full border border-blue-200">
                      <span className="text-blue-700 font-semibold">{offers.length} Job Offers</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-8">
        
        {/* Skills Section */}
        {skills.length > 0 && (
          <section ref={skillsRef}>
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 lg:p-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <FaCode className="text-xl text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">Technical Skills</h2>
                  <p className="text-gray-600">Technologies and tools I work with</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="group bg-gradient-to-br from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 border border-purple-200/50 rounded-2xl p-4 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                  >
                    <div className="w-8 h-8 bg-white rounded-full mx-auto mb-2 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                      <div className="w-3 h-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full"></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-800 transition-colors">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Job Offers Section */}
        {offers.length > 0 && (
          <section ref={offersRef}>
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 lg:p-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <FaBriefcase className="text-xl text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">Job Opportunities</h2>
                  <p className="text-gray-600">Current and past job offers</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {offers.map((offer) => (
                  <div
                    key={offer._id}
                    className="group bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                        <FaBriefcase className="text-white text-lg" />
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(offer.status)}`}>
                        {offer.status || "N/A"}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors">
                      {offer.jobTitle}
                    </h3>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <FaClock className="text-gray-400" />
                        <span>Expires: {new Date(offer.expirationDate).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-gray-400" />
                        <span>Received: {new Date(offer.offerDate || createdAt).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                    </div>
                  
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Empty States */}
        {skills.length === 0 && (
          <section className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 lg:p-10 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCode className="text-3xl text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Skills Added Yet</h3>
            <p className="text-gray-600 mb-4">Start building your profile by adding your technical skills.</p>
            <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-2 px-6 rounded-xl transition-all duration-300 hover:shadow-lg">
              Add Skills
            </button>
          </section>
        )}

        {offers.length === 0 && (
          <section className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 lg:p-10 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaBriefcase className="text-3xl text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Job Offers Yet</h3>
            <p className="text-gray-600 mb-4">Your job opportunities will appear here once you start receiving offers.</p>
            <button className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-semibold py-2 px-6 rounded-xl transition-all duration-300 hover:shadow-lg">
              Browse Jobs
            </button>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;