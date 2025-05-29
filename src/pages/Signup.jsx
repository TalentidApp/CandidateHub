import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaLock, FaUser, FaSearch, FaClipboardList } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const TalentIDSignup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (data) => {
    if (!data.terms) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `https://talentid-backend-v2.vercel.app/api/candidate/candidate-signup`,
        {
          fullName: data.fullName,
          email: data.email,
          password: data.password,
        }
      );
      console.log("Signup successful:", response.data);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
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
          <div className="lg:w-3/5 bg-gradient-to-br from-white to-purple-200 p-8 lg:p-12 flex flex-col justify-center">
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

          {/* Right Side - Signup Form */}
          <div className="lg:w-2/5 p-8 lg:p-12 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
              {/* Logo and Branding */}
              <div className="mb-8 flex items-center gap-3">
                <img
                  src={"https://res.cloudinary.com/dfz0wkqij/image/upload/v1743994510/Group_18_zpgswd.png"}
                  alt="talentid Logo"
                  className="h-6 w-auto cursor-pointer"
                  onClick={() => navigate('/')}
                />
              </div>

              {/* Welcome Message */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Your Account</h2>
                <p className="text-gray-500 text-sm">Start your career journey with talentid</p>
              </div>

              {/* Signup Form */}
              <form className="space-y-6" onSubmit={handleSubmit(submitHandler)}>
                {/* Full Name Field */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                      <FaUser />
                    </span>
                    <input
                      type="text"
                      id="fullName"
                      {...register("fullName", { required: "Full Name is required" })}
                      className="w-full px-4 py-3 pl-10 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#652d96] focus:border-transparent outline-none transition-all duration-200 text-gray-700"
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                  )}
                </div>

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
                      type={showPassword ? "text" : "password"}
                      id="password"
                      {...register("password", { required: "Password is required" })}
                      className="w-full px-4 py-3 pl-10 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#652d96] focus:border-transparent outline-none transition-all duration-200 text-gray-700"
                      placeholder="Create your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464m1.414 1.414L15.12 15.12m-4.242-4.242L15.12 15.12"
                          />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                  )}
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="terms"
                    {...register("terms", { required: "You must accept the terms and conditions" })}
                    className="w-4 h-4 text-[#652d96] bg-gray-100 border-gray-300 rounded focus:ring-[#652d96] focus:ring-2 mt-1"
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                    I agree to the{" "}
                    <a href="/terms" target="_blank" className="text-[#652d96] hover:text-[#4b2272]">
                      Terms and Conditions
                    </a>
                  </label>
                </div>
                {errors.terms && (
                  <p className="text-red-500 text-sm mt-1">{errors.terms.message}</p>
                )}
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#652d96] hover:bg-[#4b2272] text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
                >
                  {loading ? "Creating..." : "Create Account"}
                </button>

                {/* Login Link */}
                <div className="text-center">
                  <p className="text-gray-600 text-sm">
                    Already have an account?{" "}
                    <Link
                      to={"/login"}
                      className="text-[#652d96] hover:text-[#4b2272] font-medium"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentIDSignup;