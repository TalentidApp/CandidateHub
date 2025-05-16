import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import useAuthStore from "../constants/store";

const cities = [
  "Agra", "Ahmedabad", "Ajmer", "Akola", "Aligarh", "Allahabad", "Ambattur", 
  "Amravati", "Amritsar", "Asansol", "Aurangabad", "Bangalore", "Bareilly", 
  "Belgaum", "Bellary", "Berhampur", "Bhavnagar", "Bhiwandi", "Bhilai", 
  "Bhopal", "Bhubaneswar", "Bikaner", "Bilaspur", "Chandigarh", "Chennai", 
  "Coimbatore", "Cuttack", "Davanagere", "Dehradun", "Delhi", "Dhanbad", 
  "Durgapur", "Erode", "Faridabad", "Firozabad", "Gaya", "Ghaziabad", 
  "Gorakhpur", "Gulbarga", "Guntur", "Gurgaon", "Guwahati", "Gwalior", 
  "Howrah", "Hubli-Dharwad", "Hyderabad", "Indore", "Jabalpur", "Jaipur", 
  "Jalandhar", "Jalgaon", "Jammu", "Jamnagar", "Jamshedpur", "Jhansi", 
  "Jodhpur", "Kakinada", "Kalyan-Dombivli", "Kanpur", "Kochi", "Kolhapur", 
  "Kolkata", "Kollam", "Kota", "Kozhikode", "Kurnool", "Lucknow", "Ludhiana", 
  "Madurai", "Maheshtala", "Malegaon", "Mangalore", "Meerut", "Moradabad", 
  "Mumbai", "Muzaffarpur", "Mysore", "Nagpur", "Nanded", "Nashik", 
  "Navi Mumbai", "Nellore", "Noida", "Patna", "Pimpri-Chinchwad", "Pune", 
  "Raipur", "Rajahmundry", "Rajkot", "Ranchi", "Rourkela", "Saharanpur", 
  "Salem", "Sangli-Miraj & Kupwad", "Shimla", "Siliguri", "Solapur", 
  "Srinagar", "Surat", "Thane", "Thrissur", "Tiruchirappalli", "Tirunelveli", 
  "Tiruppur", "Udaipur", "Ujjain", "Ulhasnagar", "Vadodara", "Varanasi", 
  "Vasai-Virar", "Vijayawada", "Visakhapatnam", "Warangal"
];

const companySizes = ["1-50", "51-200", "201-500", "501-1000", "1001+"];
const roles = [
  "Backend Developer", "Business Analyst", "Cloud Architect", "Content Strategist", 
  "Cybersecurity Specialist", "Data Engineer", "Data Scientist", "Database Administrator", 
  "Designer", "DevOps Engineer", "Financial Analyst", "Frontend Developer", 
  "Full Stack Developer", "HR Specialist", "Machine Learning Engineer", 
  "Marketing Specialist", "Mobile Developer", "Network Engineer", "Operations Manager", 
  "Product Manager", "QA Engineer", "Sales Manager", "Software Engineer", 
  "UI/UX Designer", "Other"
];

const SearchableSelect = ({ options, value, onChange, placeholder, name, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // eslint-disable-next-line react/prop-types
  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (option) => {
    onChange({ target: { value: option } });
    setIsOpen(false);
    setSearch("");
    setFocusedIndex(-1);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
      setSearch("");
      setFocusedIndex(-1);
    }
  };

  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === "Enter" || e.key === " ") {
        setIsOpen(true);
        setTimeout(() => inputRef.current?.focus(), 0);
      }
      return;
    }

    if (e.key === "Escape") {
      setIsOpen(false);
      setSearch("");
      setFocusedIndex(-1);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex(prev => (prev < filteredOptions.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex(prev => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter" && focusedIndex >= 0) {
      e.preventDefault();
      handleSelect(filteredOptions[focusedIndex]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && dropdownRef.current) {
      const focusedElement = dropdownRef.current.querySelector(`[data-index="${focusedIndex}"]`);
      focusedElement?.scrollIntoView({ block: "nearest" });
    }
  }, [focusedIndex, isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) setTimeout(() => inputRef.current?.focus(), 0);
        }}
        role="combobox"
        aria-expanded={isOpen}
        aria-controls={`dropdown-${name}-${index}`}
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        {value || placeholder}
      </div>
      {isOpen && (
        <div
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-[50vh] overflow-auto"
          id={`dropdown-${name}-${index}`}
        >
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setFocusedIndex(-1);
            }}
            className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:ring-0 sticky top-0 bg-white"
            placeholder={`Search ${name}s...`}
            aria-label={`Search ${name} for preference ${index + 1}`}
          />
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, idx) => (
              <div
                key={option}
                data-index={idx}
                className={`px-4 py-2 cursor-pointer text-gray-700 ${idx === focusedIndex ? "bg-indigo-100" : "hover:bg-indigo-100"}`}
                onClick={() => handleSelect(option)}
                role="option"
                aria-selected={value === option}
              >
                {option}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

const JobPreferencesForm = () => {
  const navigate = useNavigate();
  const { isAuthenticated, token, checkAuth, user } = useAuthStore();
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    locationPreferences: ["", "", "", ""],
    expectedCTC: "",
    companySizePreferences: ["", "", "", ""],
    rolePreferences: ["", "", "", ""],
    customRole: ""
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const verifyAuth = async () => {
      if (isAuthenticated && token) {
        setIsAuthChecked(true);
        return;
      }
      const isValid = await checkAuth();
      setIsAuthChecked(true);
      if (!isValid) {
        console.log("Not authenticated, redirecting to login from JobPreferencesForm");
        localStorage.setItem('redirectAfterLogin', '/preferences');
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
      newErrors.expectedCTC = "Please enter a valid expected CTC (in USD)";
    }
    if (formData.companySizePreferences.some(pref => !pref)) {
      newErrors.companySizePreferences = "Please select all company size preferences";
    }
    if (formData.rolePreferences.some(pref => !pref)) {
      newErrors.rolePreferences = "Please select all role preferences";
    }
    if (formData.rolePreferences.includes("Other") && !formData.customRole.trim()) {
      newErrors.customRole = "Please specify the custom role";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateCTC = (value) => {
    if (!value || isNaN(value) || value <= 0) {
      setErrors(prev => ({ ...prev, expectedCTC: "Please enter a valid expected CTC (in USD)" }));
    } else {
      setErrors(prev => ({ ...prev, expectedCTC: undefined }));
    }
  };

  const handleChange = (e, field, index) => {
    const value = e.target.value;
    setFormData(prev => {
      const updatedField = [...prev[field]];
      updatedField[index] = value;
      return { ...prev, [field]: updatedField };
    });
    // Clear errors for the field when updated
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleCTCChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, expectedCTC: value }));
  };

  const handleCustomRoleChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, customRole: value }));
    if (value.trim()) {
      setErrors(prev => ({ ...prev, customRole: undefined }));
    }
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
      console.error("Error saving preferences data:", error);
      if (error.response?.status === 401) {
        useAuthStore.getState().clearAuthState();
        localStorage.setItem('redirectAfterLogin', '/preferences');
        navigate("/login", { replace: true });
      } else {
        toast.error(error.response?.data?.message || "Failed to save preferences");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthChecked) {
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
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-200 to-purple-300 text-gray-800 flex items-center justify-center py-12">
      <div className="w-full max-w-5xl mx-auto px-6 py-10 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-[#652d96] mb-6 text-center">Job Preferences</h2>
        <p className="text-gray-600 mb-8 text-center">
          Customize your job preferences to receive personalized job recommendations that align with your career goals.
        </p>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Location Preferences */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Location Preferences</h3>
            <p className="text-sm text-gray-500 mb-4">Select your top 4 preferred cities in India.</p>
            {formData.locationPreferences.map((pref, index) => (
              <div key={index} className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preference {index + 1}
                </label>
                <SearchableSelect
                  options={cities}
                  value={pref}
                  onChange={(e) => handleChange(e, "locationPreferences", index)}
                  placeholder="Select a city"
                  name="city"
                  index={index}
                />
                {errors.locationPreferences && index === 0 && (
                  <p className="text-red-500 text-sm mt-1">{errors.locationPreferences}</p>
                )}
              </div>
            ))}
          </div>

          {/* Expected CTC */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Expected CTC</h3>
            <p className="text-sm text-gray-500 mb-4">Enter your expected annual compensation (in USD).</p>
            <input
              type="number"
              value={formData.expectedCTC}
              onChange={handleCTCChange}
              onBlur={(e) => validateCTC(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., 100000"
              min="0"
              aria-label="Expected CTC in USD"
            />
            {errors.expectedCTC && (
              <p className="text-red-500 text-sm mt-1">{errors.expectedCTC}</p>
            )}
          </div>

          {/* Company Size Preferences */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Company Size Preferences</h3>
            <p className="text-sm text-gray-500 mb-4">Select your top 4 preferred company sizes (employee count).</p>
            {formData.companySizePreferences.map((pref, index) => (
              <div key={index} className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preference {index + 1}
                </label>
                <select
                  value={pref}
                  onChange={(e) => handleChange(e, "companySizePreferences", index)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
                  aria-label={`Select company size for preference ${index + 1}`}
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

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Role Preferences</h3>
            <p className="text-sm text-gray-500 mb-4">Select your top 4 preferred roles or specify a custom role.</p>
            {formData.rolePreferences.map((pref, index) => (
              <div key={index} className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preference {index + 1}
                </label>
                <SearchableSelect
                  options={roles}
                  value={pref}
                  onChange={(e) => handleChange(e, "rolePreferences", index)}
                  placeholder="Select a role"
                  name="role"
                  index={index}
                />
                {pref === "Other" && (
                  <input
                    type="text"
                    value={formData.customRole}
                    onChange={handleCustomRoleChange}
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Specify custom role (e.g., AI Research Scientist)"
                    aria-label="Specify custom role"
                  />
                )}
                {errors.rolePreferences && index === 0 && (
                  <p className="text-red-500 text-sm mt-1">{errors.rolePreferences}</p>
                )}
                {pref === "Other" && errors.customRole && (
                  <p className="text-red-500 text-sm mt-1">{errors.customRole}</p>
                )}
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-[#652d96] text-white px-4 py-3 rounded-lg hover:bg-[#652d96b2] transition-all duration-300 disabled:bg-indigo-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            disabled={isLoading}
            aria-label="Save preferences"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
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
                Saving...
              </span>
            ) : (
              "Save Preferences"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobPreferencesForm;