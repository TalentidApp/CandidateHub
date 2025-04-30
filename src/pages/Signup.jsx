import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MoveLeft } from "lucide-react";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const API_URL = 'https://talentid-backend-v2.vercel.app';
  
  async function submitHandler(data) {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${API_URL}/api/candidate/candidate-signup`,
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
  }

  return (
    <div className="min-h-screen flex relative max-md:flex-col max-sm:justify-center overflow-hidden bg-gradient-to-br from-white via-purple-200 to-purple-300">
      <div className="md:w-1/2 flex justify-center max-md:h-[40vh] max-sm:hidden h-screen gap-3 items-center relative">
        <div className="h-1/2 relative w-5/6 max-sm:-mt-10">
          <div className="relative h-14 flex -mt-5">
            <span
              className="cursor-pointer hover:bg-[#652d96] opacity-80 spanArrow transition-all relative w-14 h-full flex items-center justify-center selection:bg-none rounded-full text-white"
              onClick={() => navigate("/")}
            >
              <MoveLeft className="opacity-60 arrowIcon" size={30} />
            </span>
          </div>
          <div className="relative mt-4">
            <p className="lg:text-6xl md:text-5xl max-md:text-3xl leading-[80px] font-semibold flex flex-wrap gap-2">
              <span className="grpHover">Join</span>
              <span className="grpHover">Our</span>
              <span className="grpHover">Candidate</span>
              <span className="grpHover">Network</span>
            </p>
          </div>
          <div className="relative mt-10 text-gray-700">
            <p>
              Sign up to accept offer letters, search top companies, and manage
              your candidate profile effortlessly.
            </p>
          </div>
        </div>
      </div>

      <div className="md:w-1/2 flex flex-col justify-center items-center p-8">
        <div className="max-w-md w-full relative rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold mb-1 ">Sign Up</h1>
          <p className="mb-10 text-gray-600">
            Create your account and start your career journey today.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit(submitHandler)}>
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <div className="mt-1 relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  <FaUser />
                </span>
                <input
                  type="text"
                  id="fullName"
                  {...register("fullName", { required: "Full Name is required" })}
                  className="p-2 pl-10  bg-transparent block w-full border border-gray-300 outline-none rounded-md focus:ring-2 focus:ring-[#652d96]"
                  placeholder="Enter your full name"
                />
              </div>
              {errors.fullName && (
                <p className="text-red-500 text-sm">{errors.fullName.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
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
                  className="p-2 pl-10 block w-full bg-transparent border border-gray-300 outline-none rounded-md focus:ring-2 focus:ring-[#652d96]"
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
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
                  className="p-2 pl-10 block w-full bg-transparent border border-gray-300 outline-none rounded-md focus:ring-2 focus:ring-[#652d96]"
                  placeholder="Create your password"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>

            {/* Login Link */}
            <p className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-[#652d96] cursor-pointer hover:underline"
              >
                Log in
              </span>
            </p>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-[#652d96] text-white rounded-md hover:bg-indigo-700 transition-all"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;