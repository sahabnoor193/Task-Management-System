import React from 'react';
import { Check, Pencil, Trash2, AlertTriangle, AlertCircle, Bell, Calendar, Clock } from 'lucide-react';
import { format, isToday, isTomorrow } from 'date-fns';



export function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id);
    }
  };

  const priorityIcons = {
    high: <AlertTriangle className="w-5 h-5" />,
    medium: <AlertCircle className="w-5 h-5" />,
    low: <Bell className="w-5 h-5" />,
  };

  const priorityColors = {
    high: 'text-red-600 bg-red-50',
    medium: 'text-orange-600 bg-orange-50',
    low: 'text-green-600 bg-green-50',
  };

  const formatDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    if (isToday(d)) return 'Today';
    if (isTomorrow(d)) return 'Tomorrow';
    return format(d, 'MMM d');
  };

  return (
    <div className={`group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${
      task.completed
        ? 'bg-gray-50 border-gray-200'
        : 'bg-white border-gray-200 hover:border-blue-200'
    }`}>
      <div className="flex items-start gap-4 mb-4 sm:mb-0">
        <button
          onClick={() => onToggle(task.id)}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
            task.completed
              ? 'bg-green-500 border-green-500 hover:bg-green-600 hover:border-green-600'
              : 'border-gray-300 hover:border-green-500'
          }`}
        >
          {task.completed && <Check className="w-4 h-4 text-white" />}
        </button>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className={`text-lg font-medium transition-all duration-200 ${
              task.completed ? 'text-gray-500 line-through' : 'text-gray-900'
            }`}>
              {task.title}
            </h3>
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-sm ${priorityColors[task.priority]}`}>
              {priorityIcons[task.priority]}
              <span className="capitalize">{task.priority}</span>
            </span>
          </div>
          
          {task.description && (
            <p className="text-gray-600 text-sm mt-1 line-clamp-2">{task.description}</p>
          )}
          
          <div className="flex flex-wrap gap-3 mt-2">
            {task.dueDate && (
              <span className="inline-flex items-center gap-1 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                Due {formatDate(task.dueDate)}
              </span>
            )}
            {task.reminderDate && (
              <span className="inline-flex items-center gap-1 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                Reminder {formatDate(task.reminderDate)}
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={() => onEdit(task)}
          className="p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-200"
          title="Edit task"
        >
          <Pencil className="w-5 h-5" />
        </button>
        <button
          onClick={handleDelete}
          className="p-2 text-gray-600 hover:text-red-600 rounded-lg hover:bg-red-50 transition-all duration-200"
          title="Delete task"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}