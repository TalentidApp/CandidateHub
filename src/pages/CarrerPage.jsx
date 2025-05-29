import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaStar, FaGlobe, FaPhone, FaEnvelope, FaChevronDown, FaChevronUp, FaPen } from "react-icons/fa";
import Header from "../components/common/Header";
import defaultLogo from "../assets/kb.png";
import { api } from "../lib/api";
import useAuthStore from "../constants/store";
import toast from "react-hot-toast";
import Loader from "@/components/common/Loader";

// FeedbackCard component remains unchanged
const FeedbackCard = ({ rating, comment, createdAt, reviewer }) => {
  return (
    <div className="flex flex-col p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-purple-100">
      <div className="flex items-center mb-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-100">
          <span className="text-lg font-semibold text-purple-600">{rating}/5</span>
        </div>
        <p className="ml-4 text-sm font-medium text-gray-700">
          From: {reviewer?.name || "Anonymous"}
        </p>
      </div>
      <p className="text-sm text-gray-700">{comment || "No comment provided."}</p>
      <p className="text-xs text-gray-500 mt-2">
        Posted: {createdAt ? new Date(createdAt).toLocaleDateString() : "N/A"}
      </p>
    </div>
  );
};

const CareerPage = () => {
  const { companyName } = useParams();
  const { user, token } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true); // New loading state
  const [companyData, setCompanyData] = useState({
    _id: null,
    logo: defaultLogo,
    companyName: decodeURIComponent(companyName) || "Unknown Company",
    address: "Location not specified",
    hqLocation: "Unknown",
    website: "#",
    about: `No information available about ${decodeURIComponent(companyName) || "this company"}.`,
    shortDescription: "No description available.",
    contactPhone: "N/A",
    contactEmail: "N/A",
    rating: 4, // Not used for display
    industry: "Unknown",
    employeeCount: 0,
    foundedYear: 0,
  });
  const [feedbackData, setFeedbackData] = useState([]);
  const [error, setError] = useState(null);
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState(1);
  const [feedbackComment, setFeedbackComment] = useState("");
  const [feedbackError, setFeedbackError] = useState(null);
  const [feedbackSuccess, setFeedbackSuccess] = useState(null);

  // Calculate average rating from feedbackData
  const averageRating =
    feedbackData.length > 0
      ? feedbackData.reduce((sum, feedback) => sum + feedback.rating, 0) / feedbackData.length
      : 0;

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        console.log(`🚀 Fetching company: ${companyName}`);
        const response = await api.get(`/api/company/${companyName}`);
        console.log("✅ API response:", response.data);
        const company = response.data.data;
        setCompanyData({
          _id: company._id || null,
          logo: company.logo || defaultLogo,
          companyName: company.companyName || decodeURIComponent(companyName) || "Unknown Company",
          address: company.address || "Location not specified",
          hqLocation: company.address || "Unknown",
          website: company.website || "#",
          about: company.about || `No information available about ${company.companyName || decodeURIComponent(companyName) || "this company"}.`,
          shortDescription: company.shortDescription || "No description available.",
          contactPhone: company.contactPhone || "N/A",
          contactEmail: company.contactEmail || "N/A",
          rating: company.rating,
          industry: company.industry || "Unknown",
          employeeCount: company.employeeCount || 0,
          foundedYear: company.foundedYear || 0,
        });
        setError(null);
      } catch (err) {
        console.error("❌ Error fetching company:", err.response?.data);
        setError(err.response?.status === 404 ? `Company "${decodeURIComponent(companyName)}" not found` : "Failed to load company data.");
        setCompanyData({
          _id: null,
          logo: defaultLogo,
          companyName: decodeURIComponent(companyName) || "Unknown Company",
          address: "Location not specified",
          hqLocation: "Unknown",
          website: "#",
          about: `No information available about ${decodeURIComponent(companyName) || "this company"}.`,
          shortDescription: "No description available.",
          contactPhone: "N/A",
          contactEmail: "N/A",
          rating: 4,
          industry: "Unknown",
          employeeCount: 0,
          foundedYear: 0,
        });
      } finally {
        setIsLoading(false); // Stop loading after fetch
      }
    };

    const fetchFeedback = async () => {
      if (!companyData._id) return;
      try {
        const response = await api.get(`/api/feedback/received/Company/${companyData._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFeedbackData(response.data.feedback || []);
      } catch (err) {
        console.error("❌ Error fetching feedback:", err.response?.data);
        setFeedbackData([]);
        toast.error("Failed to load company feedback.");
      }
    };

    if (companyName) {
      fetchCompanyDetails();
    }
    if (companyData._id) {
      fetchFeedback();
    }
  }, [companyName, companyData._id, token]);

  const handleSubmitFeedback = async () => {
    if (!token) {
      toast.error("Please log in to submit feedback.");
      setShowFeedbackForm(false);
      return;
    }
    if (!user?.data?._id) {
      setFeedbackError("User information not available.");
      return;
    }
    if (!companyData._id) {
      setFeedbackError("Company information not available.");
      return;
    }
    setFeedbackError(null);
    setFeedbackSuccess(null);
    try {
      await api.post(
        `/api/feedback/submit`,
        {
          reviewerId: user.data._id,
          reviewerModel: "HiringCandidate",
          recipientId: companyData._id,
          recipientModel: "Company",
          companyId: companyData._id,
          rating: feedbackRating,
          comment: feedbackComment,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setFeedbackSuccess("Feedback submitted successfully!");
      toast.success("Feedback submitted successfully!");
      setTimeout(() => {
        setShowFeedbackForm(false);
        setFeedbackRating(1);
        setFeedbackComment("");
        setFeedbackSuccess(null);
        api.get(`/api/feedback/received/Company/${companyData._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        }).then((response) => setFeedbackData(response.data.feedback || []));
      }, 1500);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      const errorMessage = error.response?.data?.message || "Failed to submit feedback.";
      setFeedbackError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const toggleAbout = () => setIsAboutExpanded(!isAboutExpanded);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
          <Loader/>
        </div>
      ) : (
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6 animate-fade-in">
              {error}
            </div>
          )}

          <div className="relative bg-gradient-to-r from-purple-700 to-purple-900 text-white rounded-xl shadow-2xl overflow-hidden mb-12">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative flex flex-col md:flex-row items-center p-8 md:p-12">
              <img
                src={companyData.logo}
                alt={`${companyData.companyName} Logo`}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-lg object-cover mb-4 md:mb-0 md:mr-6 animate-fade-in"
                onError={(e) => (e.target.src = defaultLogo)}
              />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h1 className="text-3xl md:text-4xl font-bold animate-slide-in">{companyData.companyName}</h1>
                  <button
                    onClick={() => setShowFeedbackForm(true)}
                    className="flex items-center text-sm font-semibold text-white bg-purple-500 hover:bg-purple-600 px-3 py-1.5 rounded-lg transition-all duration-200"
                    aria-label={`Write feedback for ${companyData.companyName}`}
                  >
                    <FaPen className="mr-2" />
                    Write Feedback
                  </button>
                </div>
                <div className="flex items-center mt-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      size={20}
                      className={star <= Math.round(averageRating || 4) ? "text-yellow-400" : "text-gray-300"}
                    />
                  ))}
                  <span className="ml-2 text-sm font-semibold">{averageRating ? averageRating.toFixed(1) : "N/A"}</span>
                </div>
              </div>
            </div>
          </div>

          {showFeedbackForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-4 rounded-lg shadow-xl max-w-sm w-full">
                <h3 className="text-base font-semibold text-purple-800 mb-2">Feedback for {companyData.companyName}</h3>
                <div className="space-y-3 mb-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Rating (1–5)</label>
                    <select
                      value={feedbackRating}
                      onChange={(e) => setFeedbackRating(Number(e.target.value))}
                      className="block w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-purple-500"
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Comment (optional)</label>
                    <textarea
                      value={feedbackComment}
                      onChange={(e) => setFeedbackComment(e.target.value)}
                      maxLength={500}
                      rows={3}
                      className="block w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-purple-500"
                      placeholder="Share your feedback about the company..."
                    ></textarea>
                  </div>
                  {feedbackError && <p className="text-red-500 text-xs">{feedbackError}</p>}
                  {feedbackSuccess && <p className="text-green-500 text-xs">{feedbackSuccess}</p>}
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => {
                      setShowFeedbackForm(false);
                      setFeedbackRating(1);
                      setFeedbackComment("");
                      setFeedbackError(null);
                      setFeedbackSuccess(null);
                    }}
                    className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded text-xs font-medium hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitFeedback}
                    className="px-3 py-1.5 bg-purple-600 text-white rounded text-xs font-medium hover:bg-purple-700"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Company Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Stats Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 animate-fade-in">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Company Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <FaGlobe className="text-purple-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Headquarters</p>
                    <p className="font-semibold">{companyData.hqLocation}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 animate-fade-in delay-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-semibold flex items-center">
                    <FaPhone className="text-purple-600 mr-2" />
                    {companyData.contactPhone}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <a
                    href={`mailto:${companyData.contactEmail}`}
                    className="font-semibold text-purple-600 hover:text-purple-800 flex items-center transition-all duration-200"
                    aria-label={`Email ${companyData.companyName}`}
                  >
                    <FaEnvelope className="mr-2" />
                    {companyData.contactEmail}
                  </a>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Website</p>
                  <a
                    href={companyData.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-purple-600 hover:text-purple-800 flex items-center transition-all duration-200"
                    aria-label={`Visit ${companyData.companyName} website`}
                  >
                    {companyData.website.replace(/^https?:\/\//, "")}
                  </a>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 animate-fade-in delay-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Location</h3>
              <p className="text-gray-600">{companyData.address}</p>
              <div className="mt-4">
                <button
                  className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 hover:scale-105 transition-all duration-200"
                  onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(companyData.address)}`, "_blank")}
                  aria-label={`View ${companyData.companyName} on Google Maps`}
                >
                  View on Map
                </button>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12 animate-fade-in">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-800">About {companyData.companyName}</h3>
              <button
                className="text-purple-600 hover:text-purple-800 transition-all duration-200"
                onClick={toggleAbout}
                aria-label={isAboutExpanded ? "Collapse about section" : "Expand about section"}
              >
                {isAboutExpanded ? <FaChevronUp /> : <FaChevronDown />}
              </button>
            </div>
            <div className={`mt-4 text-gray-600 leading-relaxed transition-all duration-300 ${isAboutExpanded ? "max-h-96" : "max-h-24"} overflow-hidden`}>
              {companyData.about}
            </div>
          </div>

          {/* Feedback Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12 animate-fade-in">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Company Feedback</h3>
            {feedbackData.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {feedbackData.map((feedback, index) => (
                  <FeedbackCard
                    key={`feedback-${index}`}
                    rating={feedback.rating}
                    comment={feedback.comment}
                    createdAt={feedback.createdAt}
                    reviewer={feedback.reviewerId}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No feedback available for {companyData.companyName}.</p>
            )}
          </div>
        </main>
      )}
    </div>
  );
};

export default CareerPage;