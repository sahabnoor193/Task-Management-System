// import React, { useEffect, useState } from "react";
// import { Sidebar } from "./Sidebar"; // Import Sidebar component

// export function Notifications() {
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     // Fetch tasks from localStorage or API
//     const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
//     const dynamicNotifications = storedTasks.map((task, index) => ({
//       id: index + 1,
//       message: `Task '${task.title}' is due ${task.dueDate || "soon"}.`,
//       time: task.createdAt || "Just now",
//     }));

//     setNotifications(dynamicNotifications);
//   }, []);

//   return (
//     <div className="flex">
//       {/* Sidebar */}
//       <Sidebar 
//         activeFilter="all"
//         priorityFilter="all"
//         onFilterChange={() => {}}
//         onPriorityChange={() => {}}
//       />

//       {/* Main Notifications Content */}
//       <div className="flex-1 max-w-2xl mx-auto p-6 bg-gray-900 text-gray-300 rounded-lg shadow-lg">
//         <h2 className="text-2xl font-bold text-gray-100 mb-4">Notifications</h2>
//         <div className="space-y-3">
//           {notifications.length > 0 ? (
//             notifications.map((notif) => (
//               <div key={notif.id} className="p-4 bg-gray-800 rounded-lg flex justify-between items-center">
//                 <span>{notif.message}</span>
//                 <span className="text-sm text-gray-400">{notif.time}</span>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-400">No new notifications.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Bell, Clock, Trash2 } from "lucide-react";
import { format } from "date-fns";

export function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/tasks", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include auth token
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }

        const tasks = await response.json();
        checkNotifications(tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    const checkNotifications = (tasks) => {
      const today = new Date().toISOString().split("T")[0];

      const newNotifications = tasks
        .filter((task) => task.reminderDate && task.reminderDate.split("T")[0] <= today)
        .map((task) => ({
          id: task._id,
          // message: `🔔 Reminder: '${task.title}' is due on ${task.dueDate || "soon"}.`,
          message: `🔔 Reminder: '${task.title}' is due on ${format(new Date(task.dueDate), "MMM d, yyyy")}.`,
          time: new Date(task.reminderDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }));

      setNotifications(newNotifications);
    };

    fetchTasks();
    const interval = setInterval(fetchTasks, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar activeFilter="all" priorityFilter="all" onFilterChange={() => {}} onPriorityChange={() => {}} />

      <div className="flex-1 max-w-2xl mx-auto p-6 bg-gray-900 text-gray-300 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-100 mb-6 flex items-center gap-2">
          <Bell className="text-yellow-400" /> Notifications
        </h2>

        <div className="space-y-4">
          {notifications.length > 0 ? (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className="p-5 bg-gray-800 hover:bg-gray-700 transition-all duration-300 ease-in-out rounded-lg shadow flex justify-between items-center"
              >
                <span className="text-lg">{notif.message}</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-400 flex items-center gap-1">
                    <Clock className="w-4 h-4 text-yellow-400" /> {notif.time}
                  </span>
                  <button
                    onClick={() => removeNotification(notif.id)}
                    className="text-red-500 hover:text-red-400 transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center text-lg py-6">No new notifications 🎉</p>
          )}
        </div>
      </div>
    </div>
  );
}
