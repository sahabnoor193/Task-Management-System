import React from "react";

const TaskItem = ({ task }) => {
  return (
    <li>
      <span>{task.title}</span>
      <span> - {task.priority}</span>
      <span> - {task.completed ? "Completed" : "Pending"}</span>
    </li>
  );
};

export default TaskItem;
