import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaLock, FaUser, FaSearch, FaClipboardList } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../constants/store";
import { toast } from "sonner";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    register: resetRegister,
    handleSubmit: handleResetSubmit,
    formState: { errors: resetErrors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForgotPopup, setShowForgotPopup] = useState(false);
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [showResetPopup, setShowResetPopup] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const API_URL = 'https://talentid-backend-v2.vercel.app';
  const { isAuthenticated, login, fetchCandidateDetails, error: authError, clearAuthState } = useAuthStore();

  useEffect(() => {
    console.log("Login component mounted, auth state:", { isAuthenticated });
    clearAuthState();
  }, [clearAuthState]);

  useEffect(() => {
    if (isAuthenticated) {
      console.log("Authenticated, redirecting to dashboard");
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const submitHandler = async (data) => {
    setLoading(true);
    setError(null);
    console.log("Attempting login with:", data);
    const success = await login(data);
    if (success) {
      await fetchCandidateDetails();
      toast.success('Login Successful', {
        style: {
          backgroundColor: '#652d96',
          color: '#ffffff',
        },
      });
      navigate("/", { replace: true });
    } else {
      console.log("Login failed, error:", authError);
      setError(authError || "Login failed");
    }
    setLoading(false);
  };

  const handleForgotPassword = async () => {
    setLoading(true);
    setError(null);
    try {
      await axios.post(`${API_URL}/api/candidate/forgot-password-email`, {
        email: forgotEmail,
      });
      setShowForgotPopup(false);
      setShowOtpPopup(true);
    } catch (err) {
      console.error("Forgot password error:", err.response?.data);
      setError(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    setError(null);
    console.log("Verifying OTP:", { email: forgotEmail, otp });
    try {
      await axios.post(`${API_URL}/api/candidate/verify-otp`, {
        email: forgotEmail,
        otp,
      });
      setShowOtpPopup(false);
      setShowResetPopup(true);
    } catch (err) {
      console.error("OTP verification error:", err.response?.data);
      setError(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (data) => {
    setLoading(true);
    setError(null);
    try {
      await axios.post(`${API_URL}/api/candidate/forgot-password`, {
        email: forgotEmail,
        password: data.password,
        confirmPasswordValue: data.confirmPassword,
      });
      setShowResetPopup(false);
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Reset password error:", err.response?.data);
      setError(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: <FaEnvelope className="text-white text-xl" />,
      title: "Accept Offer Letters",
      description: "Review and accept job offers directly through our secure platform.",
      bgColor: "bg-[#652d96]",
    },
    {
      icon: <FaSearch className="text-white text-xl" />,
      title: "Search Top Companies",
      description: "Discover and apply to positions at leading organizations in your field.",
      bgColor: "bg-[#652d96]",
    },
    {
      icon: <FaUser className="text-white text-xl" />,
      title: "Manage Your Profile",
      description: "Keep your professional information updated and showcase your skills.",
      bgColor: "bg-[#652d96]",
    },
    {
      icon: <FaClipboardList className="text-white text-xl" />,
      title: "Track Applications",
      description: "Monitor your job applications and interview progress in real-time.",
      bgColor: "bg-[#652d96]",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-200 flex items-center justify-center p-4">
      <div className="w-full max-w-7xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row min-h-[700px]">
          {/* Left Side - Features */}
          <div className="lg:w-3/5 bg-gradient-to-br from-white to-purple-200 p-8 lg:p-12 flex flex-col justify-center max-lg:order-2">
            <div className="max-w-2xl mx-auto">
              {/* Main Heading */}
              <div className="text-center mb-12">
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4 leading-tight">
                  Manage your career journey in one place
                </h2>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className={`${feature.bgColor} w-12 h-12 rounded-full flex items-center justify-center shadow-lg flex-shrink-0`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Quote */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#652d96] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 leading-relaxed">
                    Join thousands of professionals who have already streamlined their job search and career management with talentid.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-2/5 p-8 lg:p-12 flex flex-col justify-center max-lg:order-1" >
            <div className="max-w-md mx-auto w-full">
              <div className="mb-8 flex items-center gap-3">
                <img
                  src={"https://res.cloudinary.com/dfz0wkqij/image/upload/v1743994510/Group_18_zpgswd.png"}
                  alt="TalentID Logo"
                  className="h-6 w-auto cursor-pointer"
                  onClick={() => navigate('/')}
                />
              </div>

              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Log In</h2>
                <p className="text-gray-500 text-sm">Access your talentid dashboard</p>
              </div>

              {/* Login Form */}
              <form className="space-y-6" onSubmit={handleSubmit(submitHandler)}>
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                      <FaEnvelope />
                    </span>
                    <input
                      type="email"
                      id="email"
                      {...register("email", { required: "Email is required" })}
                      className="w-full px-4 py-3 pl-10 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#652d96] focus:border-transparent outline-none transition-all duration-200 text-gray-700"
                      placeholder="example@email.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                  {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                      <FaLock />
                    </span>
                    <input
                      type="password"
                      id="password"
                      {...register("password", { required: "Password is required" })}
                      className="w-full px-4 py-3 pl-10 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#652d96] focus:border-transparent outline-none transition-all duration-200 text-gray-700"
                      placeholder="Enter your password"
                    />
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                  )}
                </div>

                {/* Forgot Password Link */}
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => setShowForgotPopup(true)}
                    className="text-sm text-[#652d96] hover:text-[#4b2272] font-medium"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Sign Up Link */}
                <div className="text-center">
                  <p className="text-gray-600 text-sm">
                    Don’t have an account?{" "}
                    <Link
                      to={"/signup"}
                      className="text-[#652d96] hover:text-[#4b2272] font-medium"
                    >
                      Sign up
                    </Link>
                  </p>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#652d96] hover:bg-[#4b2272] text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
                >
                  {loading ? "Logging in..." : "Log In"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {showForgotPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Forgot Password</h2>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                <FaEnvelope />
              </span>
              <input
                type="email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 pl-10 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#652d96] focus:border-transparent outline-none transition-all duration-200 text-gray-700 mb-4"
              />
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowForgotPopup(false)}
                className="py-2 px-4 bg-gray-200 rounded-xl hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleForgotPassword}
                disabled={loading || !forgotEmail}
                className="py-2 px-4 bg-[#652d96] hover:bg-[#4b2272] text-white rounded-xl transition-colors disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Send OTP"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showOtpPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Verify OTP</h2>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#652d96] focus:border-transparent outline-none transition-all duration-200 text-gray-700 mb-4"
            />
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowOtpPopup(false)}
                className="py-2 px-4 bg-gray-200 rounded-xl hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleVerifyOtp}
                disabled={loading || !otp}
                className="py-2 px-4 bg-[#652d96] hover:bg-[#4b2272] text-white rounded-xl transition-colors disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Password Popup */}
      {showResetPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Reset Password</h2>
            <form onSubmit={handleResetSubmit(handleResetPassword)}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <FaLock />
                  </span>
                  <input
                    type="password"
                    {...resetRegister("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    className="w-full px-4 py-3 pl-10 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#652d96] focus:border-transparent outline-none transition-all duration-200 text-gray-700"
                  />
                </div>
                {resetErrors.password && (
                  <p className="text-red-500 text-sm mt-1">{resetErrors.password.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <FaLock />
                  </span>
                  <input
                    type="password"
                    {...resetRegister("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value, context) => value === context.password || "Passwords do not match",
                    })}
                    className="w-full px-4 py-3 pl-10 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#652d96] focus:border-transparent outline-none transition-all duration-200 text-gray-700"
                  />
                </div>
                {resetErrors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{resetErrors.confirmPassword.message}</p>
                )}
              </div>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowResetPopup(false)}
                  className="py-2 px-4 bg-gray-200 rounded-xl hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="py-2 px-4 bg-[#652d96] hover:bg-[#4b2272] text-white rounded-xl transition-colors disabled:opacity-50"
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;