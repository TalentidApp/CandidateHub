/* eslint-disable no-undef */
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaLock } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../constants/store";


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
  const { isAuthenticated, login, fetchCandidateDetails, error: authError, clearAuthState } = useAuthStore();

  useEffect(() => {
    console.log("Login component mounted, auth state:", { isAuthenticated }); // Debug log
    clearAuthState();
  }, [clearAuthState]);

  useEffect(() => {
    if (isAuthenticated) {
      console.log("Authenticated, redirecting to dashboard"); // Debug log
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const submitHandler = async (data) => {
    setLoading(true);
    setError(null);
    console.log("Attempting login with:", data); // Debug log
    const success = await login(data);
    if (success) {
      console.log("Login successful, fetching candidate details"); // Debug log
      await fetchCandidateDetails();
      console.log("Redirecting to dashboard"); // Debug log
      navigate("/", { replace: true });
    } else {
      console.log("Login failed, error:", authError); // Debug log
      setError(authError || "Login failed");
    }
    setLoading(false);
  };

  const handleForgotPassword = async () => {
    setLoading(true);
    setError(null);
    console.log("Sending OTP for forgot password:", forgotEmail); // Debug log
    try {
      await axios.post(`${API_URL}/api/candidate/forgot-password-email`, {
        email: forgotEmail,
      });
      setShowForgotPopup(false);
      setShowOtpPopup(true);
    } catch (err) {
      console.error("Forgot password error:", err.response?.data); // Debug log
      setError(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    setError(null);
    console.log("Verifying OTP:", { email: forgotEmail, otp }); // Debug log
    try {
      await axios.post(`${API_URL}/api/candidate/verify-otp`, {
        email: forgotEmail,
        otp,
      });
      setShowOtpPopup(false);
      setShowResetPopup(true);
    } catch (err) {
      console.error("OTP verification error:", err.response?.data); // Debug log
      setError(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (data) => {
    setLoading(true);
    setError(null);
    console.log("Resetting password for:", forgotEmail); // Debug log
    try {
      await axios.post(`${API_URL}/api/candidate/forgot-password`, {
        email: forgotEmail,
        password: data.password,
        confirmPasswordValue: data.confirmPassword,
      });
      setShowResetPopup(false);
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Reset password error:", err.response?.data); // Debug log
      setError(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex relative max-md:flex-col max-sm:justify-center overflow-hidden bg-gradient-to-br from-white via-purple-200 to-purple-300">
      <div className="md:w-1/2 flex justify-center max-md:h-[40vh] max-sm:hidden h-screen gap-3 items-center relative">
        <div className="h-1/2 relative w-5/6 max-sm:-mt-10">
          <div className="relative mt-4">
            <p className="lg:text-6xl md:text-5xl max-md:text-3xl leading-[80px] font-semibold flex flex-wrap gap-2">
              <span className="grpHover">Sign</span>
              <span className="grpHover">In</span>
              <span className="grpHover">to</span>
              <span className="grpHover">Your</span>
              <span className="grpHover">Candidate</span>
              <span className="grpHover">Hub</span>
            </p>
          </div>
          <div className="relative mt-10 text-gray-700">
            <p>
              Accept offer letters, search for top companies, and manage your
              candidate profile all in one place.
            </p>
          </div>
        </div>
      </div>

      <div className="md:w-1/2 flex flex-col justify-center items-center p-8">
        <div className="max-w-md w-full relative rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold mb-1">Login</h1>
          <p className="mb-10 text-gray-600">
            Access your candidate dashboard and take control of your career.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit(submitHandler)}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  <FaEnvelope />
                </span>
                <input
                  type="email"
                  id="email"
                  {...register("email", { required: "Email is required" })}
                  className="p-2 pl-10 block w-full border border-gray-300 bg-transparent outline-none rounded-md focus:ring-2 focus:ring-[#652d96]"
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  <FaLock />
                </span>
                <input
                  type="password"
                  id="password"
                  {...register("password", { required: "Password is required" })}
                  className="p-2 pl-10 block w-full border border-gray-300 outline-none bg-transparent rounded-md focus:ring-2 focus:ring-[#652d96]"
                  placeholder="Enter your password"
                />
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            <p className="mt-4 text-center text-sm text-gray-600">
              <span
                onClick={() => setShowForgotPopup(true)}
                className="text-indigo-600 cursor-pointer hover:underline"
              >
                Forgot Password?
              </span>
            </p>

            <p className="mt-4 text-center text-sm text-[#652d96]">
              Don’t have an account?{" "}
              <span onClick={() => navigate("/signup")} className="cursor-pointer hover:underline">
                Sign Up for free
              </span>
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-[#652d96] text-white rounded-md transition-all"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>
        </div>
      </div>

      {showForgotPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
            <input
              type="email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              placeholder="Enter your email"
              className="p-2 block w-full border border-gray-300 rounded-md mb-4"
            />
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowForgotPopup(false)}
                className="py-2 px-4 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleForgotPassword}
                disabled={loading || !forgotEmail}
                className="py-2 px-4 bg-[#652d96] text-white rounded-md hover:bg-indigo-700"
              >
                {loading ? "Submitting..." : "Send OTP"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showOtpPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="p-2 block w-full border border-gray-300 rounded-md mb-4"
            />
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowOtpPopup(false)}
                className="py-2 px-4 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleVerifyOtp}
                disabled={loading || !otp}
                className="py-2 px-4 bg-[#652d96] text-white rounded-md hover:bg-indigo-700"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showResetPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
            <form onSubmit={handleResetSubmit(handleResetPassword)}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">New Password</label>
                <input
                  type="password"
                  {...resetRegister("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className="p-2 block w-full border border-gray-300 rounded-md"
                />
                {resetErrors.password && (
                  <p className="text-red-500 text-sm">{resetErrors.password.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  {...resetRegister("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value, context) => value === context.password || "Passwords do not match",
                  })}
                  className="p-2 block w-full border border-gray-300 rounded-md"
                />
                {resetErrors.confirmPassword && (
                  <p className="text-red-500 text-sm">{resetErrors.confirmPassword.message}</p>
                )}
              </div>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowResetPopup(false)}
                  className="py-2 px-4 bg-gray-300 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="py-2 px-4 bg-[#652d96] text-white rounded-md hover:bg-indigo-700"
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
