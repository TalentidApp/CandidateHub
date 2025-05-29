import { useEffect, useRef } from "react";
import useAuthStore from "../constants/store";
import { FaEnvelope, FaUser, FaCode, FaBriefcase, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaStar, FaEye, FaHeart } from "react-icons/fa";
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
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-white to-purple-200">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-300 border-t-purple-600 mx-auto mb-4"></div>
          <p className="text-purple-800 font-medium text-lg">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-white to-purple-200">
        <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md mx-4 border-2" style={{ borderColor: '#652d96' }}>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#652d96' }}>
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ color: '#652d96' }}>Error Loading Profile</h3>
            <p className="text-gray-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-white to-purple-200">
        <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md mx-4 text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#652d96' }}>
            <FaUser className="text-2xl text-white" />
          </div>
          <h3 className="text-xl font-bold mb-2" style={{ color: '#652d96' }}>No Profile Data</h3>
          <p className="text-gray-700">Unable to load user information at this time.</p>
        </div>
      </div>
    );
  }

  const { email, name, skills = [], offers = [], createdAt } = user.data || {};

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-200">
      <Header/>
      
      {/* Main Container with Sidebar Layout */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
          
          {/* Left Sidebar - Profile Card */}
          <div className="lg:col-span-4">
            <div ref={profileRef} className="bg-white rounded-3xl shadow-2xl p-8">
              {/* Profile Avatar */}
              <div className="text-center mb-8">
                <div className="relative inline-block">
                  <div className="w-32 h-32 rounded-full flex items-center justify-center shadow-xl mx-auto mb-4" style={{ backgroundColor: '#652d96' }}>
                    <FaUser className="text-5xl text-white" />
                  </div>
                  <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white"></div>
                </div>
                
                <h1 className="text-2xl font-bold mb-2" style={{ color: '#652d96' }}>
                  {name || "Anonymous Candidate"}
                </h1>
                
                <div className="flex items-center justify-center gap-2 text-gray-600 mb-4">
                  <FaEnvelope className="text-sm" />
                  <span className="text-sm">{email || "No email provided"}</span>
                </div>
                
                <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
                  <FaCalendarAlt />
                  <span>
                    Joined {createdAt ? new Date(createdAt).toLocaleDateString('en-US', { 
                      month: 'short', 
                      year: 'numeric' 
                    }) : "N/A"}
                  </span>
                </div>
              </div>

              {/* Profile Stats */}
              <div className="space-y-4 border-t pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#652d96' }}>
                      <FaCode className="text-white" />
                    </div>
                    <span className="font-medium text-gray-800">Skills</span>
                  </div>
                  <span className="font-bold text-xl" style={{ color: '#652d96' }}>{skills.length}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#652d96' }}>
                      <FaBriefcase className="text-white" />
                    </div>
                    <span className="font-medium text-gray-800">Job Offers</span>
                  </div>
                  <span className="font-bold text-xl" style={{ color: '#652d96' }}>{offers.length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Skills Section */}
            {skills.length > 0 ? (
              <section ref={skillsRef}>
                <div className="bg-white rounded-3xl shadow-xl p-8">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg" style={{ backgroundColor: '#652d96' }}>
                      <FaCode className="text-xl text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold" style={{ color: '#652d96' }}>Technical Skills</h2>
                      <p className="text-gray-600">My technology expertise</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {skills.map((skill, index) => (
                      <div
                        key={index}
                        className="group bg-gray-50 hover:bg-white border-2 border-transparent hover:shadow-lg rounded-2xl p-4 text-center transition-all duration-300 cursor-pointer"
                        style={{ 
                          '--hover-border': '#652d96'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.borderColor = '#652d96'}
                        onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
                      >
                        <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center shadow-sm" style={{ backgroundColor: '#652d96' }}>
                          <div className="w-4 h-4 bg-white rounded-full"></div>
                        </div>
                        <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">
                          {skill}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            ) : (
              <section className="bg-white rounded-3xl shadow-xl p-8 text-center">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#652d96' }}>
                  <FaCode className="text-3xl text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#652d96' }}>No Skills Added Yet</h3>
                <p className="text-gray-600 mb-6">Build your profile by showcasing your technical expertise</p>
                <button className="text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:scale-105" style={{ backgroundColor: '#652d96' }}>
                  Add Skills
                </button>
              </section>
            )}

            {/* Job Offers Section */}
            {offers.length > 0 ? (
              <section ref={offersRef}>
                <div className="bg-white rounded-3xl shadow-xl p-8">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg" style={{ backgroundColor: '#652d96' }}>
                      <FaBriefcase className="text-xl text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold" style={{ color: '#652d96' }}>Job Opportunities</h2>
                      <p className="text-gray-600">Your career prospects</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {offers.map((offer) => (
                      <div
                        key={offer._id}
                        className="group border-2 border-gray-100 hover:border-gray-200 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md flex-shrink-0" style={{ backgroundColor: '#652d96' }}>
                              <FaBriefcase className="text-white" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h3 className="text-lg font-bold text-gray-900 mb-2">
                                {offer.jobTitle}
                              </h3>
                              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                  <FaClock />
                                  <span>Expires: {new Date(offer.expirationDate).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <FaCalendarAlt />
                                  <span>Received: {new Date(offer.offerDate || createdAt).toLocaleDateString()}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(offer.status)}`}>
                              {offer.status || "Pending"}
                            </span>
                            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                              <FaEye className="text-gray-400" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            ) : (
              <section className="bg-white rounded-3xl shadow-xl p-8 text-center">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#652d96' }}>
                  <FaBriefcase className="text-3xl text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#652d96' }}>No Job Offers Yet</h3>
                <p className="text-gray-600 mb-6">Your opportunities will appear here as you grow your career</p>
                <button className="text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:scale-105" style={{ backgroundColor: '#652d96' }}>
                  Explore Jobs
                </button>
              </section>
            )}

            {/* Additional Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#652d96' }}>
                    <FaEye className="text-white text-sm" />
                  </div>
                  <div>
                    <h4 className="font-bold" style={{ color: '#652d96' }}>Profile Views</h4>
                    <p className="text-sm text-gray-600">This month</p>
                  </div>
                </div>
                <p className="text-2xl font-bold" style={{ color: '#652d96' }}>147</p>
              </div>
              
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#652d96' }}>
                    <FaHeart className="text-white text-sm" />
                  </div>
                  <div>
                    <h4 className="font-bold" style={{ color: '#652d96' }}>Profile Score</h4>
                    <p className="text-sm text-gray-600">Completeness</p>
                  </div>
                </div>
                <p className="text-2xl font-bold" style={{ color: '#652d96' }}>85%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;