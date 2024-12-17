import React, { useState } from 'react';
import Input from '../common/Input';
import { contactUsFormData } from '../../utils/data';
import Button from '../common/Button';

// import toast from 'react-hot-toast';

import toast from 'react-hot-toast';

const ContactUsForm = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    contactSupport: '',
    message: '',
  });

  // Handler to update state on input change
  function changeHandler(event) {

    console.log(event.target.name);
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  // Form submission handler
// Form submission handler
function handleSubmit(event) {
    event.preventDefault();
    console.log('Form Data Submitted:', formData);
  
    // Reset form data
    setFormData({
      name: '',
      email: '',
      phone: '',
      contactSupport: '',
      message: '',
    });
  
    // Show success toast
    toast.success("Form submitted successfully");
  }
  

  return (
    <div className=" relative w-full p-6 px-10 mt-2 py-11 flex flex-col justify-center items-center rounded-xl bg-[#F8F2F2]">
      <h1 className="text-base text-center font-medium text-wrap mb-4 text-[#272727] w-[26vw]">
        Fill the form and our sales representative will call your back within 24 hours
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        {contactUsFormData.map((data) => (
          <Input
            type={data.type}
            placeholder={data.label}
            key={data.label}
            value={formData[data.name]} // Bind the value from state
            required={data.required}
            name={data.name} // Convert label to lowercase key
            onChange={changeHandler}
          />

        ))}

        <Button text="Submit"></Button>

      </form>
    </div>
  );
};

export default ContactUsForm;
