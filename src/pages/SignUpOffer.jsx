// src/DigioSignPage.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DigioSignPage = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [documentId, setDocumentId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Digio Sandbox Credentials
  const clientId = 'ACK250225174345947U4PW1M941YUH7A';
  const clientSecret = 'TV9NUKZLWT45BCQM5QYGPDYPS67EI2HN';

  // Fetch Access Token
  const getAccessToken = async () => {
    try {
      const response = await axios.post(
        'https://api-sandbox.digio.in/oauth/token', // Replace with actual endpoint from Digio docs
        {
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: 'client_credentials',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data.access_token;
    } catch (err) {
      setError('Failed to authenticate with Digio.');
      return null;
    }
  };

  const initiateSigning = async () => {
    if (!accessToken) {
      setError('Authentication not completed.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const samplePdfBase64 = 'data:application/pdf;base64,JVBERi0xLj...'; 

      const response = await axios.post(
        'https://api-sandbox.digio.in/v2/documents/upload',
        {
          file: samplePdfBase64, 
          signers: [
            {
              identifier: '[email protected]', 
              name: 'V Jai',
            },
          ],
          notify_signers: true,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setDocumentId(response.data.id);
      alert('Document uploaded successfully! Signing process initiated.');
    } catch (err) {
      setError('Failed to initiate signing: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getAccessToken();
      setAccessToken(token);
      if (token) initiateSigning(); 
    };
    fetchToken();
  }, []);

  return (
    <div className="min-h-screen bg-purple-50 text-gray-900 p-6">
      <button
        onClick={() => navigate('/')}
        className="mb-4 px-4 py-2 bg-gray-700 text-white rounded-full hover:scale-105 transition-all"
      >
        Back to Dashboard
      </button>
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Sign Your Offer Letter</h2>
        {loading && <p className="text-gray-600">Processing your request...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {documentId ? (
          <div>
            <p className="text-green-600">Document ID: {documentId}</p>
            <p>Please check your email for the signing link from Digio.</p>
          </div>
        ) : (
          <p className="text-gray-600">Initiating the signing process...</p>
        )}
      </div>
    </div>
  );
};

export default DigioSignPage;