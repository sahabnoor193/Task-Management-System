import React, { useEffect, useState } from "react";
import { ListTodo, CheckSquare, Clock, AlertTriangle, AlertCircle, Bell, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export function Sidebar({ activeFilter, priorityFilter, onFilterChange, onPriorityChange }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };
    fetchUser();
    window.addEventListener("storage", fetchUser);
    return () => {
      window.removeEventListener("storage", fetchUser);
    };
  }, []);


  // Load saved filters from localStorage on component mount
  useEffect(() => {
    const savedFilter = localStorage.getItem("activeFilter") || "all";
    const savedPriority = localStorage.getItem("priorityFilter") || "all";
    onFilterChange(savedFilter);
    onPriorityChange(savedPriority);
  }, []);

  // Save filters when they change
  useEffect(() => {
    localStorage.setItem("activeFilter", activeFilter);
    localStorage.setItem("priorityFilter", priorityFilter);
  }, [activeFilter, priorityFilter]);

  return (
    <div className="w-full md:w-72 bg-gray-900 border-b md:border-r border-gray-700 shadow-lg p-4 md:p-6 flex flex-col md:min-h-screen text-gray-300">
      
      {/* Logo + Notifications */}
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => navigate("/tasks")} 
          className="flex items-center gap-3 p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all hover:scale-105"
        >
          <ListTodo className="w-6 h-6 text-gray-400" />
          <h1 className="text-xl font-bold text-gray-100">taskify</h1>
        </button>

        {/* Notifications Icon */}
        <button 
          onClick={() => navigate("/notifications")} 
          className={`p-2 rounded-lg transition-all hover:scale-105 ${
            location.pathname === "/notifications" ? "bg-gray-700" : "bg-gray-800 hover:bg-gray-700"
          }`}
        >
          <Bell className="w-6 h-6 text-gray-400" />
        </button>
      </div>

      {/* Status Filters */}
      <div className="mt-4">
        <h2 className="text-sm font-semibold text-gray-500 mb-2 px-4">Status</h2>
        <nav className="space-y-1">
          {["all", "completed", "pending"].map((key) => (
            <button
              key={key}
              onClick={() => {
                onFilterChange(key);
                navigate("/tasks");
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:scale-105 ${
                activeFilter === key ? "bg-gray-700 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-gray-200"
              }`}
            >
              {key === "all" ? <ListTodo className="w-5 h-5" /> : key === "completed" ? <CheckSquare className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
              <span className="font-medium capitalize">{key} Tasks</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Priority Filters */}
      <div className="mt-6">
        <h2 className="text-sm font-semibold text-gray-500 mb-2 px-4">Priority</h2>
        <nav className="space-y-1">
          {["all", "high", "medium", "low"].map((key) => (
            <button
              key={key}
              onClick={() => {
                onPriorityChange(key);
                navigate("/tasks");
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:scale-105 ${
                priorityFilter === key ? "bg-gray-700 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-gray-200"
              }`}
            >
              {key === "high" ? <AlertTriangle className="w-5 h-5" /> : key === "medium" ? <AlertCircle className="w-5 h-5" /> : <Bell className="w-5 h-5" />}
              <span className="font-medium capitalize">{key} Priority</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Profile (At Bottom) */}
      <div className="mt-auto text-center">
        <button
          onClick={() => navigate("/profile")}
          className={`w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg transition-all hover:scale-105 ${
            location.pathname === "/profile" ? "bg-gray-700" : "bg-gray-800 hover:bg-gray-700"
          } text-gray-300`}
        >
          <User className="w-6 h-6 text-gray-400" />
          {/* <span className="font-medium">Profile</span> */}
          {user ? (
          <p className="text-sm font-bold text-gray-100">Welcome, {user.name}</p>
        ) : (
          <p className="text-sm font-bold text-gray-100">Not Logged In</p>
        )}
        </button>
      </div>
    </div>
  );
}
