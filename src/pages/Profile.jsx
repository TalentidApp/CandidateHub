import  useAuthStore  from "../constants/store"; // Adjust path to your auth store
import { FaEnvelope, FaUser, FaFileDownload, FaCode, FaBriefcase } from "react-icons/fa";

const ProfilePage = () => {
  const { user, loading, error } = useAuthStore();

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-900"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-red-600 text-lg font-semibold">Error: {error}</p>
      </div>
    );
  }

  // If no user data
  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-gray-600 text-lg font-semibold">No user data available.</p>
      </div>
    );
  }

  const { email, name, resumeLink, skills, offers } = user;

  return (
    <div className="min-h-screen bg-gray-100 pt-20"> {/* Padding for fixed navbar */}
      <div className="max-w-5xl mx-auto p-6">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 transform hover:scale-105 transition duration-300">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-32 h-32 rounded-full bg-purple-100 flex items-center justify-center">
              <FaUser className="text-5xl text-purple-900" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {name === "unknown" ? "Anonymous Candidate" : name}
              </h1>
              <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600 mb-2">
                <FaEnvelope />
                <p>{email}</p>
              </div>
              {resumeLink && (
                <a
                  href={resumeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 transition duration-200"
                >
                  <FaFileDownload />
                  Download Resume
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Skills Section */}
        {skills?.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaCode className="text-purple-900" /> Skills
            </h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-purple-100 text-purple-900 rounded-full text-sm font-medium shadow-sm hover:bg-purple-200 transition duration-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Offers Section */}
        {offers?.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <FaBriefcase className="text-purple-900" /> Job Offers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {offers.map((offer) => (
                <div
                  key={offer._id}
                  className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition duration-200"
                >
                  <h3 className="text-lg font-semibold text-gray-800">{offer.jobTitle}</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Offer ID: {offer._id}
                  </p>
                  <p className="text-gray-600 text-sm">
                    Expiration: {new Date(offer.expirationDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-500 text-xs mt-2">
                    Received on: {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;