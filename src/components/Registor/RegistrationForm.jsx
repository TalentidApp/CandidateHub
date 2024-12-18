import React, { useState } from 'react';
import Input from '../common/Input'; // Reusable Input component
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

        toast.success('Form submitted successfully!');
    };

    return (
        <div className="relative w-full max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-2xl md:p-10">
            {/* Header */}
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Register</h2>
            {/* <p className="text-center text-gray-600 mb-8">
                Fill in the form below to register your business.
            </p> */}

            {/* Form */}
            <form className="space-y-6" onSubmit={submitHandler}>
                {registrationFormData.map((field, index) => (
                    <div key={index} className="space-y-2">
                        <label
                            className="block text-sm font-medium text-gray-700"
                            htmlFor={field.name}
                        >
                            {field.label}
                        </label>

                        {field.type === 'radio' ? (
                            <div className="flex gap-4">
                                {field.options.map((option, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        className={`px-4 py-2 rounded-md border transition duration-200 ${
                                            formData.isBusiness === option
                                                ? 'bg-red-500 text-white border-red-500'
                                                : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                                        }`}
                                        onClick={() =>
                                            setFormData({ ...formData, [field.name]: option })
                                        }
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

                {/* GST Button */}
                <div className="flex justify-end">
                    <button
                        type="button"
                        className="px-6 py-2 text-sm border border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition duration-200"
                    >
                        Add New GST
                    </button>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-3 text-white bg-red-600 rounded-md hover:bg-red-700 transition duration-200"
                >
                    Register
                </button>

                {/* Terms and Conditions */}
                <p className="text-center text-sm text-gray-500 mt-4">
                    By continuing, you agree to the{' '}
                    <a href="#" className="text-blue-500 underline">
                        Terms & Conditions
                    </a>.
                </p>
            </form>
        </div>
    );
};

export default RegistrationForm;
