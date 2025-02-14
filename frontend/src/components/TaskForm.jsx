import React, { useState, useEffect } from "react";
import { X, AlertTriangle, AlertCircle, Bell } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";

export function TaskForm({ task, onSubmit, onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [reminderDate, setReminderDate] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
      setPriority(task.priority || "medium");
      setDueDate(task.dueDate ? format(new Date(task.dueDate), "yyyy-MM-dd'T'HH:mm") : "");
      setReminderDate(task.reminderDate ? format(new Date(task.reminderDate), "yyyy-MM-dd'T'HH:mm") : "");
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    const newTask = {
      title,
      description,
      priority,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      reminderDate: reminderDate ? new Date(reminderDate).toISOString() : null,
      completed: task?.completed || false,
      createdAt: task?.createdAt || new Date().toISOString(),
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/tasks${task ? `/${task._id}` : ""}`,
        {
          method: task ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newTask),
        }
      );

      if (!response.ok) throw new Error("Failed to create/update task");
      onSubmit();
    } catch (error) {
      console.error("Error creating/updating task:", error);
    }
  };

  const priorityIcons = {
    high: <AlertTriangle className="w-6 h-6 text-red-500 drop-shadow-lg" />,
    medium: <AlertCircle className="w-6 h-6 text-yellow-500 drop-shadow-lg" />,
    low: <Bell className="w-6 h-6 text-green-500 drop-shadow-lg" />,
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-md flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-black text-white rounded-3xl w-full max-w-lg shadow-2xl p-6 border border-gray-700"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
        <div className="flex items-center justify-between border-b border-gray-700 pb-4">
          <h2 className="text-3xl font-bold">{task ? "Edit Task" : "Create Task"}</h2>
          <motion.button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-all duration-300 rounded-lg focus:outline-none"
            whileHover={{ rotate: 90 }}
          >
            <X className="w-7 h-7" />
          </motion.button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-blue-500 text-white focus:outline-none shadow-lg"
            required
          />
          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-blue-500 text-white focus:outline-none shadow-lg"
            rows={3}
          ></textarea>

          <div className="flex justify-between">
            {Object.keys(priorityIcons).map((p) => (
              <motion.button
                key={p}
                type="button"
                onClick={() => setPriority(p)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 focus:outline-none shadow-lg ${
                  priority === p ? "bg-blue-600 text-white border-blue-600 scale-105" : "bg-gray-900 text-gray-400 border-gray-700 hover:bg-gray-800"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {priorityIcons[p]} {p.charAt(0).toUpperCase() + p.slice(1)}
              </motion.button>
            ))}
          </div>

          <input
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-blue-500 text-white focus:outline-none shadow-lg"
          />
          <input
            type="datetime-local"
            value={reminderDate}
            onChange={(e) => setReminderDate(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-blue-500 text-white focus:outline-none shadow-lg"
          />

          <div className="flex justify-end gap-3">
            <motion.button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-lg"
              whileHover={{ scale: 1.1 }}
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              className="px-5 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-xl"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {task ? "Update Task" : "Create Task"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
