// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Sidebar } from "./Sidebar";
// import { motion } from "framer-motion";
// import { FaLinkedin, FaGithub, FaUserEdit } from "react-icons/fa";

// export function Profile() {
//   const navigate = useNavigate();
//   const [user, setUser] = useState({
//     name: "",
//     email: "",
//     avatar: "",
//     bio: "",
//     linkedin: "",
//     github: "",
//   });
//   const [avatarType, setAvatarType] = useState("url");

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await fetch("http://localhost:5000/api/auth/user", {
//           method: "GET",
//           headers: { Authorization: `Bearer ${token}` },
//         });
  
//         if (!response.ok) throw new Error("Failed to fetch user");
  
//         const userData = await response.json();
//         setUser(userData);
//       } catch (error) {
//         console.error("Error fetching user:", error);
//       }
//     };
  
//     fetchUserData();
//   }, []);  

//   const handleChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   const handleAvatarChange = (e) => {
//     if (avatarType === "file") {
//       const file = e.target.files[0];
//       if (file) {
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           setUser({ ...user, avatar: reader.result });
//         };
//         reader.readAsDataURL(file);
//       }
//     } else {
//       handleChange(e);
//     }
//   };

//   const handleSave = async () => {
//     try {
//       const token = localStorage.getItem("token"); // Get user token
//       const response = await fetch("http://localhost:5000/api/auth/update", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(user),
//       });
  
//       if (!response.ok) throw new Error("Failed to update profile");
  
//       const updatedUser = await response.json();
//       localStorage.setItem("user", JSON.stringify(updatedUser));
//       alert("Profile updated successfully!");
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       alert("Error updating profile");
//     }
//   };  

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     alert("Logged out successfully!");
//     navigate("/signin");
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-950 text-white">
//       <Sidebar activeFilter="profile" priorityFilter="all" onFilterChange={() => {}} onPriorityChange={() => {}} />
      
//       <motion.div 
//         className="flex-1 flex flex-col items-center justify-center p-10"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <div className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-md w-full">
//           <h1 className="text-2xl font-semibold mb-6 text-center flex items-center gap-2">
//             <FaUserEdit className="text-green-500" /> Edit Profile
//           </h1>

//           <div className="flex flex-col items-center space-y-4">
//             <motion.img
//               src={user.avatar || "https://via.placeholder.com/150"}  // Fix for empty avatar
//               alt="User Avatar"
//               className="w-28 h-28 rounded-full border-4 border-green-500 shadow-md"
//               whileHover={{ scale: 1.1 }}
//             />
            
//             <select 
//               className="p-2 w-full bg-gray-800 border border-gray-700 rounded"
//               value={avatarType}
//               onChange={(e) => setAvatarType(e.target.value)}
//             >
//               <option value="url">Use Image URL</option>
//               <option value="file">Upload Image</option>
//             </select>

//             {avatarType === "url" ? (
//               <input
//                 type="text"
//                 name="avatar"
//                 value={user.avatar}
//                 onChange={handleAvatarChange}
//                 placeholder="Avatar URL"
//                 className="p-2 w-full bg-gray-800 border border-gray-700 rounded focus:ring-2 focus:ring-green-500"
//               />
//             ) : (
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleAvatarChange}
//                 className="p-2 w-full bg-gray-800 border border-gray-700 rounded"
//               />
//             )}
//           </div>

//           <div className="mt-4 space-y-3">
//             <input
//               type="text"
//               name="name"
//               value={user.name}
//               onChange={handleChange}
//               placeholder="Your Name"
//               className="p-2 w-full bg-gray-800 border border-gray-700 rounded"
//             />
//             <input
//               type="email"
//               name="email"
//               value={user.email}
//               onChange={handleChange}
//               placeholder="Your Email"
//               className="p-2 w-full bg-gray-800 border border-gray-700 rounded"
//             />
//             <input
//               type="text"
//               name="bio"
//               value={user.bio}
//               onChange={handleChange}
//               placeholder="Short Bio"
//               className="p-2 w-full bg-gray-800 border border-gray-700 rounded"
//             />
//             <input
//               type="text"
//               name="linkedin"
//               value={user.linkedin}
//               onChange={handleChange}
//               placeholder="LinkedIn Profile"
//               className="p-2 w-full bg-gray-800 border border-blue-500 rounded"
//             />
//             <input
//               type="text"
//               name="github"
//               value={user.github}
//               onChange={handleChange}
//               placeholder="GitHub Profile"
//               className="p-2 w-full bg-gray-800 border border-gray-500 rounded"
//             />
//           </div>

//           <div className="flex justify-between mt-6">
//             <motion.button
//               onClick={handleSave}
//               className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg shadow-md"
//               whileHover={{ scale: 1.1 }}
//             >
//               Save Changes
//             </motion.button>
//             <motion.button
//               onClick={handleLogout}
//               className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg shadow-md"
//               whileHover={{ scale: 1.1 }}
//             >
//               Logout
//             </motion.button>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// }


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
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/auth/user", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch user");

        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUserData();
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

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/auth/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      const updatedUser = await response.json();
      localStorage.setItem("user", JSON.stringify(updatedUser));
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile");
    }
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
        className="flex-1 flex items-center justify-center p-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-[600px] flex flex-col items-center">
          {/* Profile Header */}
          <h1 className="text-xl font-semibold text-center flex items-center gap-2 text-green-500">
            <FaUserEdit /> Edit Profile
          </h1>

          {/* Profile Image */}
          <motion.img
            src={user.avatar || "https://via.placeholder.com/150"}
            alt="User Avatar"
            className="w-28 h-28 rounded-full border-4 border-green-500 shadow-md mt-3"
            whileHover={{ scale: 1.1 }}
          />

          {/* Avatar Type Selector */}
          <select
            className="p-2 mt-6 mb-4 bg-gray-800 border border-gray-700 rounded w-full"
            value={avatarType}
            onChange={(e) => setAvatarType(e.target.value)}
          >
            <option value="url">Use Image URL</option>
            <option value="file">Upload Image</option>
          </select>

          {/* Avatar Input */}
          {avatarType === "url" ? (
            <input
              type="text"
              name="avatar"
              value={user.avatar}
              onChange={handleAvatarChange}
              placeholder="Avatar URL"
              className="p-2 bg-gray-800 border border-gray-700 rounded w-full"
            />
          ) : (
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="p-2 bg-gray-800 border border-gray-700 rounded w-full"
            />
          )}

          {/* Form Fields - Two Column Layout */}
          <div className="grid grid-cols-2 gap-4 w-full mt-4">
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="p-2 bg-gray-800 border border-gray-700 rounded"
            />
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="p-2 bg-gray-800 border border-gray-700 rounded"
            />
            <input
              type="text"
              name="bio"
              value={user.bio}
              onChange={handleChange}
              placeholder="Short Bio"
              className="p-2 bg-gray-800 border border-gray-700 rounded"
            />
            <input
              type="text"
              name="linkedin"
              value={user.linkedin}
              onChange={handleChange}
              placeholder="LinkedIn Profile"
              className="p-2 bg-gray-800 border border-blue-500 rounded"
            />
            <input
              type="text"
              name="github"
              value={user.github}
              onChange={handleChange}
              placeholder="GitHub Profile"
              className="p-2 bg-gray-800 border border-gray-500 rounded"
            />
            <input
              type="text"
              name="discord"
              value={user.discord}
              onChange={handleChange}
              placeholder="Discord Profile"
              className="p-2 bg-gray-800 border border-gray-500 rounded"
            />
          </div>

          {/* Buttons Section */}
          <div className="flex justify-between w-full mt-6">
            <motion.button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-md text-sm"
              whileHover={{ scale: 1.1 }}
            >
              Save
            </motion.button>
            <motion.button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-md text-sm"
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
