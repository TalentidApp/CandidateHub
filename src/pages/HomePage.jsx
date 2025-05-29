import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Header from "../components/common/Header";
import video from "../assets/v.mp4";
import useAuthStore from "../constants/store";
import Loader from "../components/common/Loader";
import { api } from "../lib/api";
import { FileText, Pen } from "lucide-react";
import { FaStar } from "react-icons/fa";

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

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, token, isAuthenticated, offers, feedbackData, setOffers, setFeedbackData, clearAuthState } = useAuthStore();
  const [offersLoading, setOffersLoading] = useState(false);
  const [offersError, setOffersError] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedDocumentUrl, setSelectedDocumentUrl] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [offerToReject, setOfferToReject] = useState(null);
  const [isFeedbackPopupOpen, setIsFeedbackPopupOpen] = useState(false);
  const [feedbackOffer, setFeedbackOffer] = useState(null);
  const [feedbackRating, setFeedbackRating] = useState(1);
  const [feedbackComment, setFeedbackComment] = useState("");
  const [feedbackError, setFeedbackError] = useState(null);
  const [feedbackSuccess, setFeedbackSuccess] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const offersPerPage = 8;

  const fetchOffers = async () => {
    if (!token || !isAuthenticated) {
      setOffersError("Please log in to view offers.");
      return;
    }
    setOffersLoading(true);
    setOffersError(null);
    try {
      const response = await api.get("/api/offer/offers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Fetch offers response:", response.data);
      setOffers(response.data.data || []);
    } catch (err) {
      console.error("Fetch offers error:", err.response?.data);
      if (err.response?.status === 401) {
        setOffersError("Session expired. Please log in again.");
        clearAuthState();
        navigate("/login", { replace: true });
      } else {
        setOffersError(err.response?.data?.message || "Failed to fetch offers");
      }
    } finally {
      setOffersLoading(false);
    }
  };

  const fetchFeedback = async (companyId) => {
    if (!companyId || !token) return;
    try {
      const response = await api.get(`/api/feedback/received/Company/${companyId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFeedbackData(companyId, response.data.feedback || []);
    } catch (err) {
      console.error("Error fetching feedback:", err.response?.data);
      toast.error("Failed to load company feedback.", {
        style: { backgroundColor: "#ef4444", color: "#ffffff" },
      });
      setFeedbackData(companyId, []);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user?.data?.email && token) {
      console.log("Fetching offers");
      fetchOffers();
      toast.success("Login successful", {
        style: {
          backgroundColor: "#652d96",
          color: "#ffffff",
        },
      });
    }
  }, [isAuthenticated, user, token]);

  useEffect(() => {
    offers.forEach((offer) => {
      if (offer.companyId && !feedbackData[offer.companyId]) {
        fetchFeedback(offer.companyId);
      }
    });
  }, [offers, feedbackData, token]);

  const handleSignOffer = (offerLink, offerId) => navigate("/sign-offer", { state: { offerLink, offerId } });

  const handleRejectOffer = async (offerId) => {
    setOfferToReject(offerId);
    setIsConfirmOpen(true);
  };

  const confirmRejectOffer = async () => {
    if (!token) {
      toast.error("Please log in to reject offer.", {
        style: { backgroundColor: "#ef4444", color: "#ffffff" },
      });
      return;
    }
    try {
      await api.post(
        "/api/offer/offer/updateStatus",
        { offerId: offerToReject, status: "Declined" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchOffers();
    } catch (err) {
      console.error("Reject offer error:", err.response?.data);
      if (err.response?.status === 401) {
        setOffersError("Session expired. Please log in again.");
        clearAuthState();
        navigate("/login", { replace: true });
      } else {
        setOffersError(err.response?.data?.message || "Failed to reject offer");
      }
    } finally {
      setIsConfirmOpen(false);
      setOfferToReject(null);
    }
  };

  const handleViewFile = (acceptedLetterUrl) => {
    setSelectedDocumentUrl(acceptedLetterUrl);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedDocumentUrl(null);
  };

  const handleOpenFeedbackPopup = (offer) => {
    if (!isAuthenticated || !token) {
      toast.error("Please log in to submit feedback.", {
        style: { backgroundColor: "#ef4444", color: "#ffffff" },
      });
      return;
    }
    setFeedbackOffer(offer);
    setFeedbackRating(1);
    setFeedbackComment("");
    setFeedbackError(null);
    setFeedbackSuccess(null);
    setIsFeedbackPopupOpen(true);
  };

  const handleCloseFeedbackPopup = () => {
    setIsFeedbackPopupOpen(false);
    setFeedbackOffer(null);
  };

  const handleSubmitFeedback = async () => {
    if (!token) {
      toast.error("Please log in to submit feedback.", {
        style: { backgroundColor: "#ef4444", color: "#ffffff" },
      });
      setIsFeedbackPopupOpen(false);
      return;
    }
    if (!user?.data?._id) {
      setFeedbackError("User information not available.");
      return;
    }
    if (!feedbackOffer?.companyId) {
      setFeedbackError("Company information not available.");
      return;
    }
    setFeedbackError(null);
    setFeedbackSuccess(null);
    try {
      await api.post(
        "/api/feedback/submit",
        {
          reviewerId: user.data._id,
          reviewerModel: "HiringCandidate",
          recipientId: feedbackOffer.companyId,
          recipientModel: "Company",
          companyId: feedbackOffer.companyId,
          rating: feedbackRating,
          comment: feedbackComment,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setFeedbackSuccess("Feedback submitted successfully!");
      toast.success("Feedback submitted successfully!", {
        style: { backgroundColor: "#652d96", color: "#ffffff" },
      });
      setTimeout(() => {
        setIsFeedbackPopupOpen(false);
        setFeedbackRating(1);
        setFeedbackComment("");
        setFeedbackSuccess(null);
        fetchFeedback(feedbackOffer.companyId);
      }, 1500);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      const errorMessage = error.response?.data?.message || "Failed to submit feedback.";
      setFeedbackError(errorMessage);
      toast.error(errorMessage, {
        style: { backgroundColor: "#ef4444", color: "#ffffff" },
      });
    }
  };

  const indexOfLastOffer = currentPage * offersPerPage;
  const indexOfFirstOffer = indexOfLastOffer - offersPerPage;
  const currentOffers = offers.slice(indexOfFirstOffer, indexOfLastOffer);
  const totalPages = Math.ceil(offers.length / offersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (offersLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-indigo-50 to-indigo-200">
        <Loader />
      </div>
    );
  }

  if (offersError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-indigo-50 to-indigo-200">
        <div className="text-red-500 text-xl font-semibold">{offersError}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-200 to-purple-300 text-gray-800">
      <Header />
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-8 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Hey <span className="text-[#652d96]">{user?.data?.name || "User"}</span>, Your Career Hub!
          </h2>
          <p className="mt-2 text-lg">Discover offers, connect with companies, and take charge.</p>
        </div>

        <div className="relative flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-2/3 space-y-6">
            {currentOffers.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentOffers.map((offer) => (
                    <div
                      key={offer._id}
                      className="relative bg-white/30 rounded-xl p-6 transform hover:-translate-y-2 transition-all duration-300 shadow-md hover:shadow-lg border border-indigo-100 group"
                    >
                      <div className="absolute -top-3 -left-3 w-6 h-6 bg-[#652d96] rounded-full opacity-80 group-hover:scale-125 transition-all"></div>
                      <h3 className="font-semibold text-xl text-[#652d96] transition-all">{offer.jobTitle}</h3>
                      <p className="text-sm text-gray-600 mt-1">{offer.hr?.company || "Talentid.app"}</p>
                      <div className="flex items-center mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar
                            key={star}
                            size={16}
                            className={star <= Math.round(offer.rating || 4) ? "text-yellow-400" : "text-gray-300"}
                          />
                        ))}
                        <span className="ml-2 text-sm font-semibold">{(offer.rating || 4).toFixed(1)}</span>
                      </div>
                      <div className="mt-3 space-y-1">
                        <p className="text-sm text-gray-500">
                          Status: <span className="font-medium text-indigo-600">{offer.status === "Ghosted" ? "Accepted" : offer.status}</span>
                        </p>
                        <p className="text-sm text-gray-500">Offered: {new Date(offer.offerDate).toLocaleDateString()}</p>
                        <p className="text-sm text-gray-500">
                          Joining: {offer.joiningDate ? new Date(offer.joiningDate).toLocaleDateString() : "N/A"}
                        </p>
                      </div>
                      <div className="flex gap-3 mt-4">
                        {offer.status === "Pending" ? (
                          <>
                            <button
                              onClick={() => handleSignOffer(offer.offerLink || offer.offerLetterLink, offer._id)}
                              className="px-5 py-2 bg-[#652d96] text-white rounded-lg hover:scale-105 transition-all duration-200"
                            >
                              Sign Now
                            </button>
                            <button
                              onClick={() => handleRejectOffer(offer._id)}
                              className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 hover:scale-105 transition-all duration-200"
                            >
                              Reject
                            </button>
                          </>
                        ) : offer.status === "Declined" ? (
                          <>
                            <button className="px-5 py-2 bg-red-500 text-white rounded-lg cursor-default" disabled>
                              Rejected
                            </button>
                            <button
                              onClick={() => handleOpenFeedbackPopup(offer)}
                              title="Write feedback about the company"
                              className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 hover:scale-105 transition-all duration-200"
                            >
                              <Pen size={20} />
                            </button>
                          </>
                        ) : offer.status === "Retracted" ? (
                          <>
                            <button className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200">Retracted</button>
                            <button
                              onClick={() => handleOpenFeedbackPopup(offer)}
                              title="Write feedback about the company"
                              className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 hover:scale-105 transition-all duration-200"
                            >
                              <Pen size={20} />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleViewFile(offer.acceptedLetter)}
                              title="View signed offer letter"
                              className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 hover:scale-105 transition-all duration-200"
                            >
                              <FileText size={20} />
                            </button>
                            <button
                              onClick={() => handleOpenFeedbackPopup(offer)}
                              title="Write feedback about the company"
                              className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 hover:scale-105 transition-all duration-200"
                            >
                              <Pen size={20} />
                            </button>
                          </>
                        )}
                      </div>
                      {offer.companyId && feedbackData[offer.companyId]?.length > 0 ? (
                        <div className="mt-4">
                          <h4 className="text-sm font-semibold text-gray-800 mb-2">Company Feedback</h4>
                          <div className="space-y-4">
                            {feedbackData[offer.companyId].slice(0, 2).map((feedback, index) => (
                              <FeedbackCard
                                key={`feedback-${offer._id}-${index}`}
                                rating={feedback.rating}
                                comment={feedback.comment}
                                createdAt={feedback.createdAt}
                                reviewer={feedback.reviewerId}
                              />
                            ))}
                          </div>
                        </div>
                      ) : (
                        <p className="mt-4 text-sm text-gray-600">No feedback available for this company.</p>
                      )}
                    </div>
                  ))}
                </div>
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-4 mt-9">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 rounded-lg ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-[#652d96] text-white hover:bg-[#652d96c9]"} transition-all`}
                    >
                      Previous
                    </button>
                    <div className="flex gap-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-4 py-2 rounded-lg ${currentPage === page ? "bg-[#652d96] text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"} transition-all`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-[#652d96] text-white hover:bg-[#652d96c9]"} transition-all`}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white rounded-xl p-6 shadow-md border border-indigo-100 text-center">
                <h3 className="font-semibold text-xl text-[#652d96]">No Offers Yet</h3>
                <p className="text-gray-600 mt-2">Search companies and unlock new opportunities!</p>
                <button
                  onClick={() => navigate("/career")}
                  className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all"
                >
                  Explore Now
                </button>
              </div>
            )}
          </div>

          <div className="w-full md:w-1/3 md:sticky md:top-20 self-start">
            <div className="relative">
              <video className="w-full rounded-xl shadow-md hover:shadow-lg transition-all duration-300" controls autoPlay muted>
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute -top-3 -right-3 w-6 h-6 bg-indigo-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {isPopupOpen && selectedDocumentUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-4xl h-[80vh] relative">
            <button
              onClick={handleClosePopup}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl font-bold"
            >
              ×
            </button>
            <h3 className="text-xl font-semibold text-[#652d96] mb-4">Signed Offer Letter</h3>
            <div className="w-full h-[calc(100%-60px)]">
              <iframe
                src={selectedDocumentUrl}
                title="Signed Offer Letter"
                className="w-full h-full rounded-lg border border-gray-200"
              />
            </div>
          </div>
        </div>
      )}

      {isConfirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold text-[#652d96] mb-4">Confirm Rejection</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to reject this offer? This action cannot be undone.</p>
            <div className="flex gap-4 justify-end">
              <button
                onClick={() => setIsConfirmOpen(false)}
                className="px-5 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={confirmRejectOffer}
                className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}

      {isFeedbackPopupOpen && feedbackOffer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
            <button
              onClick={handleCloseFeedbackPopup}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl font-bold"
            >
              ×
            </button>
            <h3 className="text-xl font-semibold text-[#652d96] mb-4">Submit Feedback for {feedbackOffer.hr?.company || "Company"}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Rating (1–5)</label>
                <select
                  value={feedbackRating}
                  onChange={(e) => setFeedbackRating(Number(e.target.value))}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Comment (optional)</label>
                <textarea
                  value={feedbackComment}
                  onChange={(e) => setFeedbackComment(e.target.value)}
                  maxLength={500}
                  rows={4}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Share your feedback about the company..."
                />
              </div>
              {feedbackError && <p className="text-red-500 text-sm">{feedbackError}</p>}
              {feedbackSuccess && <p className="text-green-500 text-sm">{feedbackSuccess}</p>}
              <div className="flex gap-4 justify-end">
                <button
                  onClick={handleCloseFeedbackPopup}
                  className="px-5 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitFeedback}
                  className="px-5 py-2 bg-[#652d96] text-white rounded-lg hover:bg-[#652d96c9] transition-all"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;