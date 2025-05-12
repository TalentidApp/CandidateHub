import { useEffect } from "react";
import useAuthStore from "../constants/store";
import { FaEnvelope, FaUser, FaFileDownload, FaCode, FaBriefcase } from "react-icons/fa";

const ProfilePage = () => {
  const { user, loading, error, fetchCandidateDetails } = useAuthStore();


  useEffect(() => {
    fetchCandidateDetails();
  }, [fetchCandidateDetails]);

  console.log("User from store:", user);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 to-gray-200">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 to-gray-200">
        <p className="text-red-600 text-lg font-semibold bg-white p-4 rounded-lg shadow-lg">
          Error: {error}
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 to-gray-200">
        <p className="text-gray-600 text-lg font-semibold bg-white p-4 rounded-lg shadow-lg">
          No user data available.
        </p>
      </div>
    );
  }

  const { email, name, resumeLink, skills = [], offers = [], createdAt } = user.data || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-gray-200 pt-20">
      <div className="max-w-5xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-2xl p-8 mb-8 transform hover:scale-[1.02] transition duration-300 relative">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-32 h-32 rounded-full bg-purple-200 flex items-center justify-center shadow-md">
              <FaUser className="text-5xl text-purple-900" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-extrabold text-gray-800 mb-2 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                {!name ? "Anonymous Candidate" : name}
              </h1>
              <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600 mb-4">
                <FaEnvelope className="text-purple-700" />
                <p className="text-lg">{email || "No email"}</p>
              </div>
              {resumeLink && (
                <a
                  href={resumeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition duration-300"
                >
                  <FaFileDownload />
                  Download Resume
                </a>
              )}
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4 text-center md:text-right">
            Joined: {createdAt ? new Date(createdAt).toLocaleDateString() : "N/A"}
          </p>
        </div>

        {skills.length > 0 && (
          <div className="bg-white rounded-xl shadow-xl p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <FaCode className="text-purple-900" /> Skills
            </h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-purple-100 text-purple-900 rounded-full text-sm font-medium shadow-sm hover:bg-purple-200 hover:scale-105 transition duration-200 transform"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {offers.length > 0 && (
          <div className="bg-white rounded-xl shadow-xl p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <FaBriefcase className="text-purple-900" /> Job Offers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {offers.map((offer) => (
                <div
                  key={offer._id}
                  className="border border-gray-200 rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1"
                >
                  <h3 className="text-lg font-semibold text-purple-800">{offer.jobTitle}</h3>
                  <p className="text-gray-600 text-sm mb-1">
                    Status:{" "}
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${offer.status === "Pending" ? "bg-yellow-200" : "bg-green-200"
                        }`}
                    >
                      {offer.status || "N/A"}
                    </span>
                  </p>
                  <p className="text-gray-600 text-sm">
                    Expires: {new Date(offer.expirationDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-500 text-xs mt-2">
                    Received: {new Date(offer.offerDate || createdAt).toLocaleDateString()}
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