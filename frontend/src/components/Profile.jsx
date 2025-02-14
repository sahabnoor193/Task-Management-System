import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    avatar: "",
    bio: "",
    linkedin: "",
    github: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    } else {
      setUser({
        name: "User",
        email: "user@example.com",
        avatar: "https://via.placeholder.com/100",
        bio: "",
        linkedin: "",
        github: "",
      });
    }
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(user));
    alert("Profile updated successfully!");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("Logged out successfully!");
    navigate("/signin");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-300 p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>

      {/* Profile Picture */}
      <img
        src={user.avatar}
        alt="User Avatar"
        className="w-24 h-24 rounded-full border-2 border-gray-500 mb-4"
      />
      <input
        type="text"
        name="avatar"
        value={user.avatar}
        onChange={handleChange}
        placeholder="Avatar URL"
        className="p-2 mb-2 w-64 bg-gray-800 border border-gray-600 rounded"
      />

      {/* Name & Email */}
      <input
        type="text"
        name="name"
        value={user.name}
        onChange={handleChange}
        placeholder="Your Name"
        className="p-2 mb-2 w-64 bg-gray-800 border border-gray-600 rounded"
      />
      <input
        type="email"
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Your Email"
        className="p-2 mb-4 w-64 bg-gray-800 border border-gray-600 rounded"
      />

      {/* Bio */}
      <textarea
        name="bio"
        value={user.bio}
        onChange={handleChange}
        placeholder="Write something about yourself..."
        className="p-2 mb-4 w-64 bg-gray-800 border border-gray-600 rounded"
      />

      {/* Social Links */}
      <input
        type="text"
        name="linkedin"
        value={user.linkedin}
        onChange={handleChange}
        placeholder="LinkedIn Profile URL"
        className="p-2 mb-2 w-64 bg-gray-800 border border-gray-600 rounded"
      />
      <input
        type="text"
        name="github"
        value={user.github}
        onChange={handleChange}
        placeholder="GitHub Profile URL"
        className="p-2 mb-4 w-64 bg-gray-800 border border-gray-600 rounded"
      />

      {/* Buttons */}
      <button
        onClick={handleSave}
        className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded transition mb-2"
      >
        Save Changes
      </button>

      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded transition"
      >
        Logout
      </button>
    </div>
  );
}
