import React, { useState } from 'react';
import Input from '../common/Input'; // Import the reusable Input component
import { registrationFormData } from '../../utils/data';

import Button from '../common/Button';
import toast from 'react-hot-toast';
const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        mobile: '',
        isBusiness: 'Yes',
        companyName: '',
        companyAddress: '',
        state: '',
        pincode: '',
        gstNumber: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        // Perform form validation and submission logic here
        console.log('Form submitted:', formData);

        setFormData({

            email: '',
            mobile: '',
            isBusiness: 'Yes',
            companyName: '',
            companyAddress: '',
            state: '',
            pincode: '',
            gstNumber: '',

        });

        toast.success("form submitted successfully ");


    };

    return (
        <div className=" relative w-full max-w-lg mx-auto p-6 bg-white shadow-xl rounded-xl">
            <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>

            <form className="space-y-4" onSubmit={submitHandler}>
                {registrationFormData.map((field, index) => (
                    <div key={index}>
                        <label className="block text-sm font-medium mb-1" htmlFor={field.name}>
                            {field.label}
                        </label>

                        {field.type === 'radio' ? (
                            <div className="flex gap-4">
                                {field.options.map((option, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        className={`px-4 py-2 rounded-md border ${formData.isBusiness === option
                                            ? 'bg-red-500 text-white'
                                            : 'border-gray-300 text-gray-700'
                                            }`}
                                        onClick={() => setFormData({ ...formData, [field.name]: option })}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <Input
                                type={field.type}
                                name={field.name}
                                placeholder={`Enter ${field.label}`}
                                value={formData[field.name]}
                                onChange={handleChange}
                                required={field.required}
                            />
                        )}
                    </div>
                ))}

                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        className="px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white"
                    >
                        Add New GST
                    </button>
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#C2202B] text-white py-2 rounded-md hover:bg-red-600"
                >
                    Register
                </button>

                <p className="text-center text-sm text-gray-500 mt-4">
                    By continuing you agree to the{' '}
                    <a href="#" className="text-blue-500 underline">
                        Terms & Conditions
                    </a>
                </p>
            </form>
        </div>
    );
};

export default RegistrationForm;
