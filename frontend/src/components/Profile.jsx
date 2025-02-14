import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaUserEdit } from "react-icons/fa";

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
  const [avatarType, setAvatarType] = useState("url");

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
        name: "John Doe",
        email: "johndoe@example.com",
        avatar: "https://via.placeholder.com/150",
        bio: "A passionate web developer.",
        linkedin: "",
        github: "",
      });
    }
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    if (avatarType === "file") {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setUser({ ...user, avatar: reader.result });
        };
        reader.readAsDataURL(file);
      }
    } else {
      handleChange(e);
    }
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
    <div className="flex min-h-screen bg-gray-950 text-white">
      <Sidebar activeFilter="profile" priorityFilter="all" onFilterChange={() => {}} onPriorityChange={() => {}} />
      <motion.div 
        className="flex-1 flex flex-col items-center justify-center p-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-semibold mb-6 text-center flex items-center gap-2">
            <FaUserEdit className="text-green-500" /> Edit Profile
          </h1>

          <div className="flex flex-col items-center space-y-4">
            <motion.img
              src={user.avatar}
              alt="User Avatar"
              className="w-28 h-28 rounded-full border-4 border-green-500 shadow-md"
              whileHover={{ scale: 1.1 }}
            />
            
            <select 
              className="p-2 w-full bg-gray-800 border border-gray-700 rounded"
              value={avatarType}
              onChange={(e) => setAvatarType(e.target.value)}
            >
              <option value="url">Use Image URL</option>
              <option value="file">Upload Image</option>
            </select>

            {avatarType === "url" ? (
              <input
                type="text"
                name="avatar"
                value={user.avatar}
                onChange={handleAvatarChange}
                placeholder="Avatar URL"
                className="p-2 w-full bg-gray-800 border border-gray-700 rounded focus:ring-2 focus:ring-green-500"
              />
            ) : (
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="p-2 w-full bg-gray-800 border border-gray-700 rounded"
              />
            )}
          </div>

          <div className="mt-4 space-y-3">
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="p-2 w-full bg-gray-800 border border-gray-700 rounded"
            />
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="p-2 w-full bg-gray-800 border border-gray-700 rounded"
            />
            <input
              type="text"
              name="bio"
              value={user.bio}
              onChange={handleChange}
              placeholder="Short Bio"
              className="p-2 w-full bg-gray-800 border border-gray-700 rounded"
            />
            <input
              type="text"
              name="linkedin"
              value={user.linkedin}
              onChange={handleChange}
              placeholder="LinkedIn Profile"
              className="p-2 w-full bg-gray-800 border border-blue-500 rounded"
            />
            <input
              type="text"
              name="github"
              value={user.github}
              onChange={handleChange}
              placeholder="GitHub Profile"
              className="p-2 w-full bg-gray-800 border border-gray-500 rounded"
            />
          </div>

          <div className="flex justify-between mt-6">
            <motion.button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg shadow-md"
              whileHover={{ scale: 1.1 }}
            >
              Save Changes
            </motion.button>
            <motion.button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg shadow-md"
              whileHover={{ scale: 1.1 }}
            >
              Logout
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

