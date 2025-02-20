import React, { useState } from "react";
import Header from "../components/common/Header";
import { IoBriefcaseSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { FaGraduationCap } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";

const CandidateProfileForm = () => {
  const [showEmploymentModal, setShowEmploymentModal] = useState(false);
  const [showEducationModal, setShowEducationModal] = useState(false);

  const [employmentData, setEmploymentData] = useState([]);
  const [educationData, setEducationData] = useState([]);

  const [employmentForm, setEmploymentForm] = useState({
    position: "",
    company: "",
    fromDate: "",
    toDate: "",
    location: "",
  });

  const [educationForm, setEducationForm] = useState({
    university: "",
    degree: "",
    fromDate: "",
    toDate: "",
  });

  const [editingEmploymentIndex, setEditingEmploymentIndex] = useState(null);
  const [editingEducationIndex, setEditingEducationIndex] = useState(null);

  const editEmployment = (index) => {
    setEditingEmploymentIndex(index);
    setEmploymentForm(employmentData[index]);
    setShowEmploymentModal(true);
  };

  const deleteEmployment = (index) => {
    setEmploymentData(employmentData.filter((_, i) => i !== index));
  };

  const editEducation = (index) => {
    setEditingEducationIndex(index);
    setEducationForm(educationData[index]);
    setShowEducationModal(true);
  };

  const deleteEducation = (index) => {
    setEducationData(educationData.filter((_, i) => i !== index));
  };

  const saveEmployment = () => {
    if (editingEmploymentIndex !== null) {
      const updatedEmployment = [...employmentData];
      updatedEmployment[editingEmploymentIndex] = employmentForm;
      setEmploymentData(updatedEmployment);
      setEditingEmploymentIndex(null);
    } else {
      setEmploymentData([...employmentData, employmentForm]);
    }
    setShowEmploymentModal(false);
  };

  const saveEducation = () => {
    if (editingEducationIndex !== null) {
      const updatedEducation = [...educationData];
      updatedEducation[editingEducationIndex] = educationForm;
      setEducationData(updatedEducation);
      setEditingEducationIndex(null);
    } else {
      setEducationData([...educationData, educationForm]);
    }
    setShowEducationModal(false);
  };

  const handleEmploymentChange = (e) => {
    setEmploymentForm({ ...employmentForm, [e.target.name]: e.target.value });
  };

  const handleEducationChange = (e) => {
    setEducationForm({ ...educationForm, [e.target.name]: e.target.value });
  };

  const addEmployment = () => {
    setEmploymentData([...employmentData, employmentForm]);
    setEmploymentForm({
      position: "",
      company: "",
      fromDate: "",
      toDate: "",
      location: "",
    });
    setShowEmploymentModal(false);
  };

  const addEducation = () => {
    setEducationData([...educationData, educationForm]);
    setEducationForm({ university: "", degree: "", fromDate: "", toDate: "" });
    setShowEducationModal(false);
  };

  const [formData, setFormData] = useState({
    fullname: "",
    gender: "",
    website: "",
    email: "",
    bio: "",
    resume: null,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
      if (!validTypes.includes(file.type)) {
        alert("Only PDF and Word documents are allowed.");
        e.target.value = ""; // Clear the input field
      }
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData); // Replace with API call for backend integration
  };

  return (
    <div className=" bg-white ">
      <Header />

      <div className="max-w-4xl h-full overflow-y-auto flex flex-col justify-center items-center mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Candidate Profile
        </h1>

        <form className="w-full px-20" onSubmit={handleSubmit}>
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Basic Info
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-900"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-900"
                  placeholder="Enter email"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Gender
                </label>
                <input
                  type="text"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-900"
                  placeholder="Enter gender"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Website
                </label>
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-900"
                  placeholder="Enter website"
                />
              </div>
            </div>
            <div className="mt-5">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Website
              </label>
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-900"
                placeholder="Enter website"
              />
            </div>
            <div className="mt-5">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-900"
              />
            </div>
          </div>
          <div className="  space-y-8 mb-5">
            {/* Employment Section */}
            <div className=" ">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  Employment Info
                </h2>
                <button
                  className="px-4 py-2 border rounded-full bg-purple-900 text-white flex justify-center items-center gap-2"
                  onClick={() => setShowEmploymentModal(true)}
                >
                  <IoBriefcaseSharp size={20} /> Add Employment
                </button>
              </div>

              {/* Employment Modal */}
              {showEmploymentModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                  <div className="bg-white p-8 space-y-4 rounded-lg shadow-lg w-[30%]">
                    <h2 className="text-lg font-semibold mb-4">
                      Add Employment Info
                    </h2>
                    <div className="space-y-2">
                      <label>Position/Designation</label>
                      <input
                        type="text"
                        name="position"
                        placeholder="Enter Designation"
                        className="border p-2 w-full mb-2 rounded-lg"
                        onChange={handleEmploymentChange}
                        value={employmentForm.position}
                      />
                    </div>
                    <div className="space-y-1">
                      <label>Company</label>
                      <input
                        type="text"
                        name="company"
                        placeholder="Enter Company name"
                        className="border p-2 w-full mb-2 rounded-lg"
                        onChange={handleEmploymentChange}
                        value={employmentForm.company}
                      />
                    </div>
                    <div className="flex gap-5">
                      <div className="space-y-1">
                        <label>Start Date</label>
                        <input
                          type="date"
                          name="fromDate"
                          className="border p-2 w-full mb-2 rounded-lg"
                          onChange={handleEmploymentChange}
                          value={employmentForm.fromDate}
                        />
                      </div>
                      <div className="space-y-1">
                        <label>End Date</label>
                        <input
                          type="date"
                          name="toDate"
                          className="border p-2 w-full mb-2 rounded-lg"
                          onChange={handleEmploymentChange}
                          value={employmentForm.toDate}
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label>Location</label>
                      <input
                        type="text"
                        name="location"
                        placeholder="Enter location"
                        className="border p-2 w-full mb-4 rounded-lg"
                        onChange={handleEmploymentChange}
                        value={employmentForm.location}
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        className="px-6 py-2 bg-purple-900 text-white font-semibold rounded-full mr-5"
                        onClick={addEmployment}
                      >
                        Save
                      </button>
                      <button
                        className="px-6 py-2 bg-gray-200 rounded-full"
                        onClick={() => setShowEmploymentModal(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Display Employment Entries */}
              <div className="mt-6">
                {employmentData.length === 0 ? (
                  <p className="text-gray-600">No employment records added.</p>
                ) : (
                  <div>
                    {employmentData.map((job, index) => (
                      <div
                        key={index}
                        className="border p-4 flex justify-between rounded-lg shadow-md bg-white"
                      >
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {job.position}
                          </h3>
                          <p className="text-gray-600">{job.company}</p>
                          <p className="text-sm text-gray-500">
                            {job.fromDate} to {job.toDate}
                          </p>
                          <p className="text-sm text-gray-500">
                            {job.location}, India
                          </p>
                        </div>
                        <div className="flex gap-2 mt-2">
                          <button
                            className=" py-1  text-black rounded-md"
                            onClick={() => editEmployment(index)}
                          >
                            <FaRegEdit size={20} />
                          </button>
                          <button
                            className="px-4 py-1  text-black rounded-md"
                            onClick={() => deleteEmployment(index)}
                          >
                            <MdDelete size={20} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Education Section */}
            <div className=" ">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  Education Info
                </h2>
                <button
                  className="px-6 py-2 border rounded-full bg-purple-900 text-white flex justify-center items-center gap-2"
                  onClick={() => setShowEducationModal(true)}
                >
                  <FaGraduationCap size={22} /> Add Education
                </button>
              </div>

              {/* Education Modal */}
              {showEducationModal && (
                <div className="fixed inset-0  bg-gray-500 bg-opacity-50 flex justify-center items-center">
                  <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                    <h2 className="text-lg font-semibold mb-4">
                      Add Education Info
                    </h2>
                    <div className="space-y-1">
                      <label>University</label>
                      <input
                        type="text"
                        name="university"
                        placeholder="Enter university name"
                        className="border p-2 w-full mb-2 rounded-lg"
                        onChange={handleEducationChange}
                        value={educationForm.university}
                      />
                    </div>
                    <div className="space-y-1">
                      <label>Degree Program</label>
                      <input
                        type="text"
                        name="degree"
                        placeholder="Enter Degree Program"
                        className="border p-2 w-full mb-2 rounded-lg"
                        onChange={handleEducationChange}
                        value={educationForm.degree}
                      />
                    </div>
                    <div className="space-y-1">
                      <label>Start Date</label>
                      <input
                        type="date"
                        name="fromDate"
                        className="border p-2 w-full mb-2 rounded-lg "
                        onChange={handleEducationChange}
                        value={educationForm.fromDate}
                      />
                    </div>
                    <div className="space-y-1">
                      <label>End Date</label>
                      <input
                        type="date"
                        name="toDate"
                        className="border p-2 w-full mb-4 rounded-lg"
                        onChange={handleEducationChange}
                        value={educationForm.toDate}
                      />
                    </div>
                    <div className="flex justify-end mt-4">
                      <button
                        className="px-6 py-2 bg-purple-900 text-white font-semibold rounded-full mr-5"
                        onClick={addEducation}
                      >
                        Save
                      </button>
                      <button
                        className="px-6 py-2 bg-gray-300 rounded-full"
                        onClick={() => setShowEducationModal(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Display Education Entries */}

              <div className="mt-6">
                {educationData.length === 0 ? (
                  <p className="text-gray-600">No education records added.</p>
                ) : (
                  <div className="">
                    {educationData.map((edu, index) => (
                      <div
                        key={index}
                        className="border p-4 flex justify-between rounded-lg shadow-md bg-white"
                      >
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {edu.degree}
                          </h3>
                          <p className="text-gray-600">{edu.university}</p>
                          <p className="text-sm text-gray-500">
                            {edu.fromDate} to {edu.toDate}
                          </p>
                        </div>
                        <div className="flex  mt-2">
                          <button
                            className=" py-1  text-black rounded-md"
                            onClick={() => editEducation(index)}
                          >
                            <FaRegEdit size={20} />
                          </button>
                          <button
                            className="px-4 py-1  text-black rounded-md"
                            onClick={() => deleteEducation(index)}
                          >
                            <MdDelete size={20} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Upload Resume Section */}
          <div className="mb-6">
  <label
    className="block text-gray-700 text-md font-semibold mb-2"
    htmlFor="resume"
  >
    Upload Resume
  </label>
  <div className="flex items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg p-6">
    <input
      type="file"
      id="resume"
      accept=".pdf, .doc, .docx"
      className="hidden"
      onChange={handleFileUpload}
    />
    <label
      htmlFor="resume"
      className="text-purple-600 cursor-pointer hover:text-purple-700"
    >
      Click to upload
    </label>
  </div>
</div>


          {/* Submit Button */}
          <div className="flex justify-end gap-5">
            <button
              type="submit"
              className="bg-gray-400 text-white px-8 py-2 rounded-full hover:bg-purple-700 transition duration-300"
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-purple-900 text-white px-8 py-2 rounded-full hover:bg-purple-700 transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CandidateProfileForm;
