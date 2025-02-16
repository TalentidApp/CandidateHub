import React, { useState } from "react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "V Jai",
    role: "Full Stack Developer",
    email: "vjai@example.com",
    phone: "+91 9876543210",
    company: "TalentID",
    location: "Bangalore, India",
    image: "https://via.placeholder.com/150"
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 flex flex-col items-center p-10 text-white">
      <div className="w-full max-w-4xl p-10 bg-white shadow-xl rounded-3xl border-4 border-purple-700 flex flex-col items-center text-center text-gray-900">
        <h2 className="text-5xl font-bold text-purple-800 mb-6">Profile</h2>
        <div className="relative mt-4">
          <img
            src={profile.image}
            alt="Profile Picture"
            className="w-40 h-40 rounded-full border-4 border-purple-700 shadow-lg"
          />
        </div>
        <div className="mt-6 w-full flex flex-col items-center">
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="text-3xl font-semibold mt-2 p-2 border border-gray-300 rounded-lg text-center"
            />
          ) : (
            <p className="text-3xl font-semibold mt-2">{profile.name}</p>
          )}
          <p className="text-lg text-gray-600">{profile.role}</p>
        </div>
        <div className="mt-6 w-full grid grid-cols-2 gap-6 text-left">
          {Object.entries(profile).slice(2, 6).map(([key, value]) => (
            <div key={key} className="text-lg font-medium">
              <span className="font-bold capitalize">{key}: </span>
              {isEditing ? (
                <input
                  type="text"
                  name={key}
                  value={value}
                  onChange={handleChange}
                  className="ml-2 p-2 border border-gray-300 rounded-lg w-full"
                />
              ) : (
                <span className="text-gray-600">{value}</span>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="mt-8 px-6 py-3 bg-purple-700 text-white text-lg rounded-xl shadow-md hover:bg-purple-800 transition-all"
        >
          {isEditing ? "Save Profile" : "Edit Profile"}
        </button>
      </div>
    </div>
  );
};

export default Profile;