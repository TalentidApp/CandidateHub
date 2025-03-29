import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignDocument = () => {
  const { state } = useLocation();
  const { offerId, offerLink } = state || {};
  const pdfUrl = offerLink; // Cloudinary PDF URL
  const [documentId, setDocumentId] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  let token = '';

  const initializeSigning = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        'http://localhost:4000/api/candidate/uploadDocument',
        { pdfUrl },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const { documentId , authId } = response.data;
      setDocumentId(documentId);
      token = authId

      console.log(response)
      const options = {
        environment: 'sandbox',
        is_iframe: true,
        callback: async function (response) {
          if (Object.prototype.hasOwnProperty.call(response, 'error_code')) {
            console.log('Error:', response);
            setError('Signing failed: ' + response.message);
          } else {
            console.log('Success:', response);

            const documentId = response.digio_doc_id; // e.g., DID250214125320019EUTVXRAKEPT1IW
            console.log(documentId + "   " + offerId);
            try {
              const backendResponse = await axios.post(
                'http://localhost:4000/api/candidate/handleSignedDocument',
                {
                  offerId: offerId, // The offerId from the state
                  documentId: documentId, // The Digio document ID
                },
                { headers: { 'Content-Type': 'application/json' } }
              );

              console.log('Backend response:', backendResponse.data);
              alert('Document signed successfully! Redirecting to dashboard...');
              setTimeout(() => navigate('/'), 2000); // Redirect after 2 seconds
            } catch (err) {
              console.error('Error calling backend API:', err);
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
      digio.init(); // Create iframe
      digio.submit(documentId, 'chavarahul7@gmail.com',token);
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to initiate signing process');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (pdfUrl) {
      // Load Digio SDK dynamically if not already loaded
      if (!window.Digio) {
        const script = document.createElement('script');
        script.src = 'https://ext-gateway.digio.in/sdk/v11/digio.js'; // Sandbox
        script.async = true;
        script.onload = () => initializeSigning();
        document.body.appendChild(script);
      } else {
        initializeSigning();
      }
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

      {/* Main Content */}
      <div className="p-6 max-w-7xl mx-auto">
        <div className="text-center md:text-left mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-700 tracking-tight">
            Sign Your Offer Letter
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Review the offer letter below and sign it securely with Digio.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg shadow-md">
            <p>{error}</p>
          </div>
        )}

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
          <div className="flex flex-col md:flex-row gap-6">
            {/* PDF Preview */}
            <div className="w-full md:w-1/2 bg-white rounded-xl p-6 shadow-md border border-indigo-100">
              <h2 className="text-xl font-semibold text-indigo-700 mb-4">Offer Letter Preview</h2>
              <div className="w-full h-[60vh] rounded-lg border border-gray-200">
                <iframe
                  src={pdfUrl}
                  title="Offer Letter Preview"
                  className="w-full h-full rounded-lg"
                  onError={() => setError('Failed to load the offer letter PDF.')}
                />
              </div>
            </div>

            {/* Digio Signing Interface */}
            <div className="w-full md:w-1/2 bg-white rounded-xl p-6 shadow-md border border-indigo-100">
              <h2 className="text-xl font-semibold text-indigo-700 mb-4">Sign the Document</h2>
              <div className="w-full h-[60vh] rounded-lg border border-gray-200">
                <div id="digio-iframe-container" className="w-full h-full">
                  {/* Digio iframe will be appended here */}
                  {!documentId && !isLoading && !error && (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-gray-600">Waiting for Digio to initialize...</p>
                    </div>
                  )}
                </div>
              </div>
              {documentId && (
                <p className="mt-4 text-sm text-gray-600">
                  Document ID: <span className="font-medium">{documentId}</span>
                </p>
              )}
            </div>
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