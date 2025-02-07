import React from "react";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const tasks = [
    { id: 1, title: "Task 1", priority: "High", completed: false },
    { id: 2, title: "Task 2", priority: "Medium", completed: true },
  ];

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;