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
      setDueDate(
        task.dueDate ? format(new Date(task.dueDate), "yyyy-MM-dd'T'HH:mm") : ""
      );
      setReminderDate(
        task.reminderDate
          ? format(new Date(task.reminderDate), "yyyy-MM-dd'T'HH:mm")
          : ""
      );
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      id: task?.id || crypto.randomUUID(),
      title,
      description,
      priority,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      reminderDate: reminderDate ? new Date(reminderDate).toISOString() : null,
      completed: task?.completed || false,
      createdAt: task?.createdAt || new Date().toISOString(),
    });

    setTitle("");
    setDescription("");
    setPriority("medium");
    setDueDate("");
    setReminderDate("");
    onClose();
  };

  const priorityIcons = {
    high: <AlertTriangle className="w-5 h-5 text-red-500" />,
    medium: <AlertCircle className="w-5 h-5 text-yellow-500" />,
    low: <Bell className="w-5 h-5 text-green-500" />,
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-gray-900 text-white rounded-2xl w-full max-w-md shadow-2xl p-6"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
        <div className="flex items-center justify-between border-b border-gray-700 pb-4">
          <h2 className="text-2xl font-bold">{task ? "Edit Task" : "Create Task"}</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-blue-400 text-white focus:outline-none"
            required
          />
          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-blue-400 text-white focus:outline-none"
            rows={3}
          ></textarea>

          <div className="flex justify-between">
            {["high", "medium", "low"].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPriority(p)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 focus:outline-none ${
                  priority === p
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-gray-800 text-gray-400 border-gray-600 hover:bg-gray-700"
                }`}
              >
                {priorityIcons[p]} {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>

          <input
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-blue-400 text-white focus:outline-none"
          />
          <input
            type="datetime-local"
            value={reminderDate}
            onChange={(e) => setReminderDate(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-blue-400 text-white focus:outline-none"
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <motion.button
              type="submit"
              className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
