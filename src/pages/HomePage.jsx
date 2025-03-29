import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import video from "../assets/v.mp4";
import useAuthStore from "../constants/store";
import axios from "axios";
import Loader from "../components/common/Loader";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, loading, error, fetchCandidateDetails, isAuthenticated } = useAuthStore();
  const [offers, setOffers] = useState([]);
  const [offersLoading, setOffersLoading] = useState(false);
  const [offersError, setOffersError] = useState(null);
  
  // State for the popup
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedDocumentUrl, setSelectedDocumentUrl] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) fetchCandidateDetails();
  }, [fetchCandidateDetails, isAuthenticated]);

  useEffect(() => {
    if (!loading && !isAuthenticated && error) navigate("/login");
  }, [loading, isAuthenticated, error, navigate]);

  const fetchOffers = async () => {
    setOffersLoading(true);
    setOffersError(null);
    try {
      const response = await axios.get("http://localhost:4000/api/offer/offers", { withCredentials: true });
      setOffers(response.data.data || []);
    } catch (err) {
      setOffersError(err.response?.data?.message || "Failed to fetch offers");
    } finally {
      setOffersLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user?.email) fetchOffers();
  }, [isAuthenticated, user]);

  const handleSignOffer = (offerLink, offerId) => navigate("/sign-offer", { state: { offerLink, offerId } });

  const handleRejectOffer = async (offerId) => {
    try {
      await axios.post(
        "http://localhost:4000/api/offer/offer/Declined", 
        { offerId }, 
        { withCredentials: true }
      );
      fetchOffers();
    } catch (err) {
      setOffersError(err.response?.data?.message || "Failed to reject offer");
    }
  };

  const handleViewFile = (acceptedLetterUrl) => {
    setSelectedDocumentUrl(acceptedLetterUrl);
    setIsPopupOpen(true);
  };

  // Function to close the popup
  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedDocumentUrl(null);
  };

  if (loading || offersLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-indigo-50 to-indigo-200">
        <Loader/>
      </div>
    );
  }

  if (error || offersError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-indigo-50 to-indigo-200">
        <div className="text-red-500 text-xl font-semibold">{error || offersError}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-indigo-50 to-indigo-200 text-gray-900">
      <Header />
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-8 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Hey {user?.name || "User"}, Your Career Hub!
          </h2>
          <p className="mt-2 text-lg">
            Discover offers, connect with companies, and take charge.
          </p>
        </div>

        <div className="relative flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-2/3 space-y-6">
            {offers.length > 0 ? (
              offers.map((offer) => (
                <div
                  key={offer._id}
                  className="relative bg-white/30 rounded-xl p-6 transform hover:-translate-y-2 transition-all duration-300 shadow-md hover:shadow-lg border border-indigo-100 group"
                >
                  <div className="absolute -top-3 -left-3 w-6 h-6 bg-indigo-500 rounded-full opacity-80 group-hover:scale-125 transition-all"></div>
                  <h3 className="font-semibold text-xl text-indigo-700 group-hover:text-indigo-800 transition-all">
                    {offer.jobTitle}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {offer.hr?.company || "Talentid.app"}
                  </p>
                  <div className="mt-3 space-y-1">
                    <p className="text-sm text-gray-500">
                      Status: <span className="font-medium text-indigo-600">{offer.status}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Offered: {new Date(offer.offerDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      Joining: {offer.joiningDate ? new Date(offer.joiningDate).toLocaleDateString() : "N/A"}
                    </p>
                  </div>
                  {offer.status === "Pending" ? (
                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={() => handleSignOffer(offer.offerLink, offer._id)}
                        className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 hover:scale-105 transition-all duration-200"
                      >
                        Sign Now
                      </button>
                      <button
                        onClick={() => handleRejectOffer(offer._id)}
                        className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 hover:scale-105 transition-all duration-200"
                      >
                        Reject
                      </button>
                    </div>
                  ) : offer.status === "Declined" ? (
                    <button
                      className="mt-4 px-5 py-2 bg-red-500 text-white rounded-lg cursor-default"
                      disabled
                    >
                      Rejected
                    </button>
                  ) : (
                    <button
                      onClick={() => handleViewFile(offer.acceptedLetter)}
                      className="mt-4 px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 hover:scale-105 transition-all duration-200"
                    >
                      View File
                    </button>
                  )}
                </div>
              ))
            ) : (
              <div className="bg-white rounded-xl p-6 shadow-md border border-indigo-100 text-center">
                <h3 className="font-semibold text-xl text-indigo-700">No Offers Yet</h3>
                <p className="text-gray-600 mt-2">
                  Search companies and unlock new opportunities!
                </p>
                <button
                  onClick={() => navigate('/carrerpage')}
                  className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all"
                >
                  Explore Now
                </button>
              </div>
            )}
          </div>

          <div className="w-full md:w-1/3 md:sticky md:top-20 self-start">
            <div className="relative">
              <video
                className="w-full rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                controls
                autoPlay
                muted
              >
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute -top-3 -right-3 w-6 h-6 bg-indigo-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Popup for displaying the accepted letter */}
      {isPopupOpen && selectedDocumentUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-4xl h-[80vh] relative">
            <button
              onClick={handleClosePopup}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl font-bold"
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold text-indigo-700 mb-4">Signed Offer Letter</h3>
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
    </div>
  );
};

export default Dashboard;