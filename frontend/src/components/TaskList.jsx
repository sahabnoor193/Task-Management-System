import React from 'react';
import { CheckCircle, Edit2, Trash2, Clock, Calendar, AlertCircle } from 'lucide-react';

function TaskList({ onEdit, onDelete, filters }) {
  // TODO: Replace with actual data
  const tasks = [
    {
      id: 1,
      title: 'Complete project proposal',
      description: 'Write and submit the project proposal document',
      priority: 'high',
      status: 'pending',
      dueDate: '2024-02-10',
      reminderTime: '2024-02-09T10:00',
    },
    // Add more sample tasks
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesStatus = filters.status === 'all' || task.status === filters.status;
    const matchesPriority = filters.priority === 'all' || task.priority === filters.priority;
    const matchesSearch = task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                         task.description.toLowerCase().includes(filters.search.toLowerCase());
    return matchesStatus && matchesPriority && matchesSearch;
  });

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="divide-y divide-gray-200">
        {filteredTasks.map((task) => (
          <div key={task.id} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <button
                  onClick={() => {
                    // TODO: Implement status toggle
                  }}
                  className={`mt-1 ${
                    task.status === 'completed'
                      ? 'text-green-500'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <CheckCircle className="h-6 w-6" />
                </button>
                <div>
                  <h3 className={`text-lg font-semibold ${
                    task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900'
                  }`}>
                    {task.title}
                  </h3>
                  <p className="mt-1 text-gray-600">{task.description}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-4">
                    <div className="flex items-center">
                      <AlertCircle className={`h-4 w-4 mr-1 ${getPriorityColor(task.priority)}`} />
                      <span className="text-sm capitalize">{task.priority}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span className="text-sm">{new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>
                    {task.reminderTime && (
                      <div className="flex items-center text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        <span className="text-sm">
                          {new Date(task.reminderTime).toLocaleTimeString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => onEdit(task)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                >
                  <Edit2 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onDelete(task)}
                  className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {filteredTasks.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No tasks found. Create a new task to get started!
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskList;