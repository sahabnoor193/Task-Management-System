import React from 'react';
import { motion } from 'framer-motion';
import { Check, Pencil, Trash2, AlertTriangle, AlertCircle, Bell, Calendar, Clock } from 'lucide-react';
import { format, isToday, isTomorrow } from 'date-fns';

export function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task._id);
    }
  };

  const priorityIcons = {
    high: <AlertTriangle className="w-5 h-5 text-red-400 drop-shadow-lg" />, 
    medium: <AlertCircle className="w-5 h-5 text-yellow-400 drop-shadow-lg" />, 
    low: <Bell className="w-5 h-5 text-green-400 drop-shadow-lg" />, 
  };

  const priorityColors = {
    high: 'text-red-400 bg-red-900/20',
    medium: 'text-yellow-400 bg-yellow-900/20',
    low: 'text-green-400 bg-green-900/20',
  };

  const formatDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    if (isToday(d)) return 'Today';
    if (isTomorrow(d)) return 'Tomorrow';
    return format(d, 'MMM d');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-gray-700 bg-gray-900 transition-all duration-200 hover:shadow-xl hover:border-gray-500"
    >
      <div className="flex items-start gap-4 mb-4 sm:mb-0">
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={() => onToggle(task._id)}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 shadow-lg ${
            task.completed
              ? 'bg-blue-500 border-blue-500 hover:bg-blue-600 hover:border-blue-600'
              : 'border-gray-500 hover:border-blue-500'
          }`}
        >
          {task.completed && <Check className="w-4 h-4 text-white" />}
        </motion.button>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className={`text-lg font-medium transition-all duration-200 ${
              task.completed ? 'text-gray-500 line-through' : 'text-white'
            }`}>
              {task.title}
            </h3>
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-sm ${priorityColors[task.priority]}`}>
              {priorityIcons[task.priority]}
              <span className="capitalize">{task.priority}</span>
            </span>
          </div>
          
          {task.description && (
            <p className="text-gray-400 text-sm mt-1 line-clamp-2">{task.description}</p>
          )}
          
          <div className="flex flex-wrap gap-3 mt-2 text-gray-500">
            {task.dueDate && (
              <span className="inline-flex items-center gap-1 text-sm">
                <Calendar className="w-4 h-4 text-gray-400" />
                Due {formatDate(task.dueDate)}
              </span>
            )}
            {task.reminderDate && (
              <span className="inline-flex items-center gap-1 text-sm">
                <Clock className="w-4 h-4 text-gray-400" />
                Reminder {formatDate(task.reminderDate)}
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={() => onEdit(task)}
          className="p-2 text-gray-400 hover:text-blue-400 rounded-lg hover:bg-blue-900/30 transition-all duration-200"
          title="Edit task"
        >
          <Pencil className="w-5 h-5" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={handleDelete}
          className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-900/30 transition-all duration-200"
          title="Delete task"
        >
          <Trash2 className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
}
