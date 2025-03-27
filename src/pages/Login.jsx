import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaLock } from "react-icons/fa";
import logo from "../assets/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../constants/store"; 

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { isAuthenticated, fetchCandidateDetails } = useAuthStore(); 

    useEffect(() => {
        fetchCandidateDetails(); 
    }, [fetchCandidateDetails]);

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/"); 
        }
    }, [isAuthenticated, navigate]);

    async function submitHandler(data) {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(
                "http://localhost:4000/api/candidate/candidate-login",
                data,
                { withCredentials: true }
            );
            console.log("Login successful:", response.data);
            await fetchCandidateDetails();
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex h-screen">
            <div className="w-full bg-[#652D96] text-white flex flex-col justify-between items-start p-10 relative">
                <div className="w-full flex justify-center items-center">
                    <div className="w-full max-w-[30rem] p-8 bg-white rounded-lg">
                        <div className="flex flex-col justify-center items-center text-center gap-3 mb-6">
                            <img src={logo} alt="TalentID Logo" width={200} height={200} />
                            <h2 className="text-3xl font-normal mt-2 text-slate-700">
                                Candidate Login
                            </h2>
                            <p className="text-gray-500 text-md">
                                Enter your email and password to access your account
                            </p>
                            {error && <p className="text-red-600">{error}</p>}
                        </div>
                        <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col gap-4">
                            <div className="relative">
                                <label className="text-gray-700 font-medium">Email</label>
                                <div className="flex items-center border-2 border-gray-300 focus-within:border-indigo-500 rounded-md overflow-hidden">
                                    <span className="px-3 text-gray-500">
                                        <FaEnvelope />
                                    </span>
                                    <input
                                        {...register("email", { required: "Email is Required" })}
                                        className="w-full p-3 focus:outline-none text-black"
                                        placeholder="Enter your email"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
                                )}
                            </div>
                            <div className="relative">
                                <label className="text-gray-700 font-medium">Password</label>
                                <div className="flex items-center border-2 border-gray-300 focus-within:border-indigo-500 rounded-md overflow-hidden">
                                    <span className="px-3 text-gray-500">
                                        <FaLock />
                                    </span>
                                    <input
                                        type="password"
                                        {...register("password", { required: "Password is Required" })}
                                        className="w-full p-3 focus:outline-none text-black"
                                        placeholder="Enter your password"
                                    />
                                </div>
                                {errors.password && (
                                    <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
                                )}
                            </div>
                            <div className="flex justify-between items-center text-sm mb-4">
                                <label className="flex items-center text-black">
                                    <input type="checkbox" className="mr-2" />
                                    Remember Me
                                </label>
                                <a href="#" className="text-purple-900 font-semibold">
                                    Recovery Password
                                </a>
                            </div>
                            <div className="flex justify-center items-center">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-black w-1/2 hover:bg-gray-900 transition-all text-white text-lg rounded-full p-3 mt-4 shadow-md"
                                >
                                    {loading ? "Logging in..." : "Login"}
                                </button>
                            </div>
                        </form>
                        <div className="text-center">
                            <p className="text-gray-600 mt-4">
                                Don’t have an account?{" "}
                                <a href="/signup" className="text-purple-600 font-semibold hover:underline">
                                    SignUp
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;