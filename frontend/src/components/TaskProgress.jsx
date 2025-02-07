import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

export function TaskProgress({ tasks }) {
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.length - completedTasks;

  const data = [
    { name: "Completed", value: completedTasks },
    { name: "Pending", value: pendingTasks },
  ];

  const colors = {
    Completed: <style>color="#4CAF50"</style>,  
     Pending: "#FF9800", // Orange
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-3">Task Progress</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} layout="vertical" margin={{ left: 40 }}>
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" />
          <Tooltip />
          <Legend />
          <Bar dataKey="value">
            {data.map((entry, index) => (
              <Bar key={`bar-${index}`} fill={colors[entry.name]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
