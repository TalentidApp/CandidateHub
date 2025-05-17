import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import video from "../assets/v.mp4";
import useAuthStore from "../constants/store";
import Loader from "../components/common/Loader";
import { api } from "../lib/api";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [offers, setOffers] = useState([]);
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

  const fetchOffers = async () => {
    setOffersLoading(true);
    setOffersError(null);
    try {
      const response = await api.get("/api/offer/offers");
      console.log("Fetch offers response:", response.data);
      setOffers(response.data.data || []);
    } catch (err) {
      console.error("Fetch offers error:", err.response?.data);
      if (err.response?.status === 401) {
        setOffersError("Session expired. Please log in again.");
        useAuthStore.getState().clearAuthState();
        navigate("/login", { replace: true });
      } else {
        setOffersError(err.response?.data?.message || "Failed to fetch offers");
      }
    } finally {
      setOffersLoading(false);
    }
  };

  useEffect(() => {
    if (user?.data?.email) {
      console.log("Fetching offers");
      fetchOffers();
    }
  }, [user]);

  const handleSignOffer = (offerLink, offerId) => navigate("/sign-offer", { state: { offerLink, offerId } });

  const handleRejectOffer = async (offerId) => {
    setOfferToReject(offerId);
    setIsConfirmOpen(true);
  };

  const confirmRejectOffer = async () => {
    try {
      await api.post("/api/offer/offer/updateStatus", { offerId: offerToReject, status: "Declined" });
      fetchOffers();
    } catch (err) {
      console.error("Reject offer error:", err.response?.data);
      if (err.response?.status === 401) {
        setOffersError("Session expired. Please log in again.");
        useAuthStore.getState().clearAuthState();
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
    if (!feedbackOffer?.hr) {
      setFeedbackError("Recruiter information not available");
      return;
    }
    setFeedbackError(null);
    setFeedbackSuccess(null);
    try {
      await api.post("/api/feedback/submit", {
        reviewerId: user.data._id,
        reviewerModel: "HiringCandidate",
        recipientId: feedbackOffer.hr,
        recipientModel: "User",
        rating: feedbackRating,
        comment: feedbackComment,
      });
      setFeedbackSuccess("Feedback submitted successfully!");
      setTimeout(() => {
        handleCloseFeedbackPopup();
      }, 1500);
    } catch (err) {
      console.error("Submit feedback error:", err.response?.data);
      if (err.response?.status === 401) {
        setFeedbackError("Session expired. Please log in again.");
        useAuthStore.getState().clearAuthState();
        navigate("/login", { replace: true });
      } else {
        setFeedbackError(err.response?.data?.message || "Failed to submit feedback");
      }
    }
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
            {offers.length > 0 ? (
              offers.map((offer) => (
                <div
                  key={offer._id}
                  className="relative bg-white/30 rounded-xl p-6 transform hover:-translate-y-2 transition-all duration-300 shadow-md hover:shadow-lg border border-indigo-100 group"
                >
                  <div className="absolute -top-3 -left-3 w-6 h-6 bg-[#652d96] rounded-full opacity-80 group-hover:scale-125 transition-all"></div>
                  <h3 className="font-semibold text-xl text-[#652d96] transition-all">{offer.jobTitle}</h3>
                  <p className="text-sm text-gray-600 mt-1">{offer.hr?.company || "Talentid.app"}</p>
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
                          className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 hover:scale-105 transition-all duration-200"
                        >
                          Write Feedback
                        </button>
                      </>
                    ) : offer.status === "Retracted" ? (
                      <>
                        <button className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200">Retracted</button>
                        <button
                          onClick={() => handleOpenFeedbackPopup(offer)}
                          className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 hover:scale-105 transition-all duration-200"
                        >
                          Write Feedback
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleViewFile(offer.acceptedLetter)}
                          className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 hover:scale-105 transition-all duration-200"
                        >
                          View File
                        </button>
                        <button
                          onClick={() => handleOpenFeedbackPopup(offer)}
                          className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 hover:scale-105 transition-all duration-200"
                        >
                          Write Feedback
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))
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
            <h3 className="text-xl font-semibold text-[#652d96] mb-4">Submit Feedback</h3>
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
                  placeholder="Share your feedback about the recruiter..."
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