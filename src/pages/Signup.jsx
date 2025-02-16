import React from 'react';
import { useForm } from "react-hook-form";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const Signup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    async function submitHandler(data) {
        console.log(data);
    }

    return (
        <div className='bg-gradient-to-r from-purple-500 to-indigo-600 w-screen min-h-screen flex justify-center items-center px-4'>
            <div className='flex flex-col w-full max-w-md bg-white p-8 rounded-2xl shadow-lg'>
                <div className='flex flex-col justify-center items-center mb-6'>
                    <h1 className='text-2xl font-bold text-gray-800'>Company Logo</h1>
                    <h2 className='text-lg font-semibold text-gray-600'>Candidate Signup</h2>
                </div>
                <form onSubmit={handleSubmit(submitHandler)} className='flex flex-col gap-5'>
                    {/* Name */}
                    <div className='relative'>
                        <label className='text-gray-700 font-medium'>Name</label>
                        <div className='flex items-center border-2 border-gray-300 focus-within:border-indigo-500 rounded-md overflow-hidden'>
                            <span className='px-3 text-gray-500'><FaUser /></span>
                            <input
                                {...register("fullName", { required: "Full Name is Required" })}
                                className='w-full p-3 focus:outline-none'
                                placeholder='Enter your name'
                            />
                        </div>
                        {errors.fullName && <p className='text-sm text-red-600 mt-1'>{errors.fullName.message}</p>}
                    </div>

                    {/* Email */}
                    <div className='relative'>
                        <label className='text-gray-700 font-medium'>Email</label>
                        <div className='flex items-center border-2 border-gray-300 focus-within:border-indigo-500 rounded-md overflow-hidden'>
                            <span className='px-3 text-gray-500'><FaEnvelope /></span>
                            <input
                                {...register("email", { required: "Email is Required" })}
                                className='w-full p-3 focus:outline-none'
                                placeholder='Enter your email'
                            />
                        </div>
                        {errors.email && <p className='text-sm text-red-600 mt-1'>{errors.email.message}</p>}
                    </div>

                    {/* Password */}
                    <div className='relative'>
                        <label className='text-gray-700 font-medium'>Password</label>
                        <div className='flex items-center border-2 border-gray-300 focus-within:border-indigo-500 rounded-md overflow-hidden'>
                            <span className='px-3 text-gray-500'><FaLock /></span>
                            <input
                                type='password'
                                {...register("password", { required: "Password is Required" })}
                                className='w-full p-3 focus:outline-none'
                                placeholder='Enter your password'
                            />
                        </div>
                        {errors.password && <p className='text-sm text-red-600 mt-1'>{errors.password.message}</p>}
                    </div>

                    <button type='submit' className='bg-indigo-600 hover:bg-indigo-700 transition-all text-white text-lg rounded-full p-3 mt-4 shadow-md'>
                        Create Account
                    </button>
                </form>
                <div className='flex justify-center items-center mt-4'>
                    <p className='text-gray-600'>Already have an account? <span className='text-indigo-600 font-semibold cursor-pointer hover:underline'>Log In</span></p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
