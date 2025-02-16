import React, { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar"; // Import Sidebar component

export function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch tasks from localStorage or API
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
    const dynamicNotifications = storedTasks.map((task, index) => ({
      id: index + 1,
      message: `Task '${task.title}' is due ${task.dueDate || "soon"}.`,
      time: task.createdAt || "Just now",
    }));

    setNotifications(dynamicNotifications);
  }, []);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar 
        activeFilter="all"
        priorityFilter="all"
        onFilterChange={() => {}}
        onPriorityChange={() => {}}
      />

      {/* Main Notifications Content */}
      <div className="flex-1 max-w-2xl mx-auto p-6 bg-gray-900 text-gray-300 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-100 mb-4">Notifications</h2>
        <div className="space-y-3">
          {notifications.length > 0 ? (
            notifications.map((notif) => (
              <div key={notif.id} className="p-4 bg-gray-800 rounded-lg flex justify-between items-center">
                <span>{notif.message}</span>
                <span className="text-sm text-gray-400">{notif.time}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No new notifications.</p>
          )}
        </div>
      </div>
    </div>
  );
}