import React from 'react';
import { ListTodo, CheckSquare, Clock, Settings, AlertTriangle, AlertCircle, Bell } from 'lucide-react';

export function Sidebar({ activeFilter, priorityFilter, onFilterChange, onPriorityChange }) {
  return (
    <div className="w-full md:w-72 bg-white border-b md:border-r border-gray-200 shadow-lg p-4 md:p-6 flex flex-col md:min-h-screen">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-blue-100 rounded-lg">
          <ListTodo className="w-6 h-6 text-blue-600" />
        </div>
        <h1 className="text-xl font-bold text-gray-900">Task Manager</h1>
      </div>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-sm font-semibold text-gray-600 mb-2 px-4">Status</h2>
          <nav className="space-y-1">
            <button
              onClick={() => onFilterChange('all')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                activeFilter === 'all'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <ListTodo className="w-5 h-5" />
              <span className="font-medium">All Tasks</span>
            </button>
            
            <button
              onClick={() => onFilterChange('completed')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                activeFilter === 'completed'
                  ? 'bg-green-50 text-green-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <CheckSquare className="w-5 h-5" />
              <span className="font-medium">Completed</span>
            </button>
            
            <button
              onClick={() => onFilterChange('pending')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                activeFilter === 'pending'
                  ? 'bg-yellow-50 text-yellow-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Clock className="w-5 h-5" />
              <span className="font-medium">Pending</span>
            </button>
          </nav>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-gray-600 mb-2 px-4">Priority</h2>
          <nav className="space-y-1">
            <button
              onClick={() => onPriorityChange('all')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                priorityFilter === 'all'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Bell className="w-5 h-5" />
              <span className="font-medium">All Priorities</span>
            </button>
            
            <button
              onClick={() => onPriorityChange('high')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                priorityFilter === 'high'
                  ? 'bg-red-50 text-red-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <AlertTriangle className="w-5 h-5" />
              <span className="font-medium">High Priority</span>
            </button>
            
            <button
              onClick={() => onPriorityChange('medium')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                priorityFilter === 'medium'
                  ? 'bg-orange-50 text-orange-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <AlertCircle className="w-5 h-5" />
              <span className="font-medium">Medium Priority</span>
            </button>
            
            <button
              onClick={() => onPriorityChange('low')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                priorityFilter === 'low'
                  ? 'bg-green-50 text-green-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Bell className="w-5 h-5" />
              <span className="font-medium">Low Priority</span>
            </button>
          </nav>
        </div>
      </div>
      
      <div className="mt-auto pt-6 border-t border-gray-200">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200">
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </button>
      </div>
    </div>
  );
}