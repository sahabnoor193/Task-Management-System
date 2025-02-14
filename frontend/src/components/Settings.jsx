import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Settings() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "User",
    email: "user@example.com",
    avatar: "/images/default-avatar.png",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser((prevUser) => ({ ...prevUser, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(user));
    alert("Profile updated successfully!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-300 p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <div className="relative w-24 h-24 mb-4">
        <img src={user.avatar} alt="User Avatar" className="w-24 h-24 rounded-full border-2 border-gray-500" />
        <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleAvatarChange} />
      </div>

      <div className="w-full max-w-md mb-4">
        <label className="block text-sm font-semibold mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          className="w-full p-2 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
      </div>

      <div className="w-full max-w-md mb-4">
        <label className="block text-sm font-semibold mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          className="w-full p-2 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
      </div>

      <button onClick={handleSave} className="w-full max-w-md p-2 bg-green-700 hover:bg-green-600 rounded-lg transition-all">
        Save Changes
      </button>

      <button onClick={() => navigate(-1)} className="w-full max-w-md mt-4 p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all">
        Back
      </button>
    </div>
  );
}
