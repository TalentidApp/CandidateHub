import React from 'react';

const Input = ({
    type = 'text', // Default input type is 'text'
    placeholder = '',
    value = '',
    onChange,
    className = '',
    name = '',
    ...props
}) => {
    // Conditionally render input or textarea
    if (type === 'textarea' || name === 'message') {
        return (
            <textarea
                placeholder={placeholder}
                value={value}
                name={name}
                onChange={onChange}
                className={`w-full placeholder:text-[#414042] placeholder:text-start placeholder:pl-2 text-[#414042] px-4 ${name === 'message' ? 'h-32 text-start' : 'py-2'
                    } border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
                {...props}
            />
        );
    }

    // Default to input element
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            name={name}
            onChange={onChange}
            className={`w-full placeholder:text-[#414042] placeholder:text-start placeholder:pl-2 text-[#414042] px-4 ${name === 'message' ? 'h-32 text-start' : 'py-2'
                } border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
            {...props}
        />
    );
};

export default Input;
