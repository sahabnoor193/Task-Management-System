import React, { useState, useEffect } from "react";
import { TaskItem } from "../components/TaskItem";

export function TasksPage({ activeFilter, priorityFilter }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // 🔹 Load tasks from localStorage
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  // ✅ Apply filtering logic
  const filteredTasks = tasks.filter((task) => {
    // 🔹 Filter by status
    if (activeFilter === "completed" && !task.completed) return false;
    if (activeFilter === "pending" && task.completed) return false;

    // 🔹 Filter by priority
    if (priorityFilter !== "all" && task.priority !== priorityFilter) return false;

    return true;
  });

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Tasks ({filteredTasks.length})</h2>
      <ul className="space-y-2">
        {filteredTasks.length === 0 ? (
          <p className="text-gray-400">No tasks found.</p>
        ) : (
          filteredTasks.map((task) => <TaskItem key={task._id} task={task} />)
        )}
      </ul>
    </div>
  );
}
