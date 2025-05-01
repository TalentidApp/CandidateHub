import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuthStore from '../constants/store';

const SignDocument = () => {
  const { state } = useLocation();
  const { offerId, offerLink, newtoken } = state || {};
  const pdfUrl = offerLink?.replace('http://', 'https://');
  const [, setDocumentId] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  let token = '';
  const { user } = useAuthStore();

  const API_URL = 'https://talentid-backend-v2.vercel.app';

  const initializeSigning = async () => {
    if (!window.Digio) {
      setError('Digio SDK is not loaded yet. Please try again.');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${API_URL}/api/candidate/uploadDocument`,
        { pdfUrl , email:user?.data.email , name:user?.data.name },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const { documentId, authId } = response.data;
      setDocumentId(documentId);
      token = authId;

      const options = {
        environment: 'production',
        is_iframe: true,
        callback: async function (response) {
          if (Object.prototype.hasOwnProperty.call(response, 'error_code')) {
            setError('Signing failed: ' + response.message);
          } else {
            const documentId = response.digio_doc_id;
            try {
              await axios.post(
                `${API_URL}/api/candidate/handleSignedDocument`,
                { offerId, documentId },
                { headers: { 'Content-Type': 'application/json' } }
              );
              try {
                await axios.post(
                  `${API_URL}/api/offer/offer/updateStatus`,
                  { offerId: offerId, status: "Ghosted" },
                  {
                    headers: { Authorization: `Bearer ${newtoken}` },
                    withCredentials: true,
                  }
                );
              } catch (err) {
                console.log(err)
              }
              alert('Document signed successfully! Redirecting to dashboard...');
              setTimeout(() => navigate('/'), 2000);
            } catch (err) {
              console.log(err)

              setError('Failed to process signed document');
            }
          }
        },
        theme: {
          primaryColor: '#AB3498',
          secondaryColor: '#000000',
        },
      };

      const digio = new window.Digio(options);
      digio.init();
      digio.submit(documentId, user?.data.email, token);
    } catch (err) {
      console.log(err)
      setError('Failed to initiate signing process');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (pdfUrl && !window.Digio) {
      const script = document.createElement('script');
      script.src = 'https://app.digio.in/sdk/v11/digio.js';
      script.async = true;
      script.onload = () => console.log('Digio SDK loaded successfully');
      script.onerror = () => setError('Failed to load Digio SDK');
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [pdfUrl]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-indigo-50 to-indigo-200 text-gray-900">
      {/* Header */}
      <header className="p-4 flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-indigo-700 hover:text-indigo-900 transition-all"
        >
          <span className="text-lg font-semibold">Back to Dashboard</span>
        </button>
      </header>

      <div className="p-6 max-w-7xl mx-auto">
        <div className="text-center md:text-left mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-700 tracking-tight">
            Sign Your Offer Letter
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Review the offer letter below and sign it securely with Us.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center mb-6">
            <div className="text-indigo-700 text-xl font-semibold animate-pulse">
              Loading Signing Interface...
            </div>
          </div>
        )}

        {/* PDF and Signing Interface */}
        {pdfUrl ? (
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            {/* PDF Preview */}
            <div className="w-full bg-white rounded-xl p-6 shadow-md border border-indigo-100">
              <h2 className="text-xl font-semibold text-indigo-700 mb-4">Offer Letter Preview</h2>
              <div className="w-full h-[60vh] rounded-lg border border-gray-200">
                <iframe
                  src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                  title="Offer Letter Preview"
                  className="w-full h-full rounded-lg"
                  onError={() =>
                    setError('Failed to load the offer letter PDF. Please ensure the URL is correct and accessible.')
                  }
                  style={{ border: 'none' }}
                />
              </div>
              {error && (
                <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg shadow-md">
                  <p>{error}</p>
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-700 underline"
                  >
                    Open PDF in new tab
                  </a>
                </div>
              )}
            </div>
            <button
              className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 hover:scale-105 transition-all duration-200"
              onClick={initializeSigning}
            >
              Esign
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl p-6 shadow-md border border-indigo-100 text-center">
            <h3 className="font-semibold text-xl text-indigo-700">No Offer Letter Provided</h3>
            <p className="text-gray-600 mt-2">
              Please navigate from a valid offer page to sign a document.
            </p>
            <button
              onClick={() => navigate('/')}
              className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all"
            >
              Back to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignDocument;