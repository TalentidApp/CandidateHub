import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import useAuthStore from "../constants/store";

const cities = [
  "New York", "London", "Tokyo", "San Francisco", "Singapore",
  "Paris", "Sydney", "Berlin", "Toronto", "Mumbai"
];

const companySizes = ["1-50", "51-200", "201-500", "501-1000", "1001+"];
const roles = ["Software Engineer", "Product Manager", "Data Scientist", "Designer", "Marketing Specialist"];

const FormulaDocumentation = () => {
  const navigate = useNavigate();
  const { isAuthenticated, token, checkAuth, user } = useAuthStore();
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    locationPreferences: ["", "", "", ""],
    expectedCTC: "",
    companySizePreferences: ["", "", "", ""],
    rolePreferences: ["", "", "", ""],
  });
  const [errors, setErrors] = useState({});

  // Check authentication
  useEffect(() => {
    const verifyAuth = async () => {
      if (isAuthenticated && token) {
        setIsAuthChecked(true);
        return;
      }
      const isValid = await checkAuth();
      setIsAuthChecked(true);
      if (!isValid) {
        console.log("Not authenticated, redirecting to login from FormulaDocumentation");
        localStorage.setItem('redirectAfterLogin', '/formula');
        navigate("/login", { replace: true });
      }
    };
    verifyAuth();
  }, [isAuthenticated, token, checkAuth, navigate]);

  const validateForm = () => {
    const newErrors = {};
    if (formData.locationPreferences.some(pref => !pref)) {
      newErrors.locationPreferences = "Please select all location preferences";
    }
    if (!formData.expectedCTC || isNaN(formData.expectedCTC) || formData.expectedCTC <= 0) {
      newErrors.expectedCTC = "Please enter a valid expected CTC";
    }
    if (formData.companySizePreferences.some(pref => !pref)) {
      newErrors.companySizePreferences = "Please select all company size preferences";
    }
    if (formData.rolePreferences.some(pref => !pref)) {
      newErrors.rolePreferences = "Please select all role preferences";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e, field, index) => {
    const value = e.target.value;
    setFormData(prev => {
      const updatedField = [...prev[field]];
      updatedField[index] = value;
      return { ...prev, [field]: updatedField };
    });
  };

  const handleCTCChange = (e) => {
    setFormData(prev => ({ ...prev, expectedCTC: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill out all required fields correctly");
      return;
    }
    setIsLoading(true);
    try {
      await axios.post(
        'https://talentid-backend-v2.vercel.app/api/formula/formula',
        {
          candidateId: user?.data?._id,
          ...formData,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      toast.success("Preferences saved successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error saving formula data:", error);
      if (error.response?.status === 401) {
        useAuthStore.getState().clearAuthState();
        localStorage.setItem('redirectAfterLogin', '/formula');
        navigate("/login", { replace: true });
      } else {
        toast.error(error.response?.data?.message || "Failed to save preferences");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthChecked || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-purple-200 to-purple-300 flex items-center justify-center py-10">
        <svg
          className="animate-spin h-12 w-12 text-indigo-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white py-10 via-purple-200 to-purple-300 text-gray-800 flex items-center justify-center">
      <div className="w-full mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-indigo-600 mb-6">Formula Documentation (Offer Lens)</h2>
        <p className="text-gray-600 mb-8">
          Help us predict your interest in job offers by providing your preferences below.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Location Preferences */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Location Preferences</h3>
            <p className="text-sm text-gray-500 mb-4">Select your top 4 preferred cities.</p>
            {formData.locationPreferences.map((pref, index) => (
              <div key={index} className="mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Preference {index + 1}
                </label>
                <select
                  value={pref}
                  onChange={(e) => handleChange(e, "locationPreferences", index)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select a city</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                {errors.locationPreferences && index === 0 && (
                  <p className="text-red-500 text-sm mt-1">{errors.locationPreferences}</p>
                )}
              </div>
            ))}
          </div>

          {/* Expected CTC */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Expected CTC</h3>
            <p className="text-sm text-gray-500 mb-4">Enter your expected annual compensation (in USD).</p>
            <input
              type="number"
              value={formData.expectedCTC}
              onChange={handleCTCChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., 100000"
            />
            {errors.expectedCTC && (
              <p className="text-red-500 text-sm mt-1">{errors.expectedCTC}</p>
            )}
          </div>

          {/* Company Size Preferences */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Company Size Preferences</h3>
            <p className="text-sm text-gray-500 mb-4">Select your top 4 preferred company sizes (employee count).</p>
            {formData.companySizePreferences.map((pref, index) => (
              <div key={index} className="mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Preference {index + 1}
                </label>
                <select
                  value={pref}
                  onChange={(e) => handleChange(e, "companySizePreferences", index)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select a size</option>
                  {companySizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
                {errors.companySizePreferences && index === 0 && (
                  <p className="text-red-500 text-sm mt-1">{errors.companySizePreferences}</p>
                )}
              </div>
            ))}
          </div>

          {/* Role Preferences */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Role Preferences</h3>
            <p className="text-sm text-gray-500 mb-4">Select your top 4 preferred roles (offered role suggested first).</p>
            {formData.rolePreferences.map((pref, index) => (
              <div key={index} className="mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Preference {index + 1}
                </label>
                <select
                  value={pref}
                  onChange={(e) => handleChange(e, "rolePreferences", index)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select a role</option>
                  {roles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
                {errors.rolePreferences && index === 0 && (
                  <p className="text-red-500 text-sm mt-1">{errors.rolePreferences}</p>
                )}
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white px-4 py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 disabled:bg-indigo-400 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Preferences"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormulaDocumentation;