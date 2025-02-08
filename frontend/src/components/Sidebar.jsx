import React from 'react';
import { ListTodo, CheckSquare, Clock, AlertTriangle, AlertCircle, Bell } from 'lucide-react';

export function Sidebar({ activeFilter, priorityFilter, onFilterChange, onPriorityChange, onTaskifyClick }) {
  return (
    <div className="w-full md:w-72 bg-gray-900 border-b md:border-r border-gray-700 shadow-lg p-4 md:p-6 flex flex-col md:min-h-screen text-gray-300">
      <div className="flex items-center gap-3 mb-8">
        <button 
          onClick={onTaskifyClick} 
          className="flex items-center gap-3 p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all hover:scale-105"
        >
          <ListTodo className="w-6 h-6 text-gray-400" />
          <h1 className="text-xl font-bold text-gray-100">taskify</h1>
        </button>
      </div>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-sm font-semibold text-gray-500 mb-2 px-4">Status</h2>
          <nav className="space-y-1">
            {[  
              { key: 'all', label: 'All Tasks', icon: <ListTodo className="w-5 h-5" /> },
              { key: 'completed', label: 'Completed', icon: <CheckSquare className="w-5 h-5" />, bg: 'bg-green-700', text: 'text-green-200' },
              { key: 'pending', label: 'Pending', icon: <Clock className="w-5 h-5" />, bg: 'bg-yellow-700', text: 'text-yellow-200' }
            ].map(({ key, label, icon, bg = 'bg-gray-700', text = 'text-gray-100' }) => (
              <button
                key={key}
                onClick={() => onFilterChange(key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:scale-105 ${
                  activeFilter === key ? `${bg} ${text}` : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                }`}
              >
                {icon}
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-gray-500 mb-2 px-4">Priority</h2>
          <nav className="space-y-1">
            {[  
              { key: 'all', label: 'All Priorities', icon: <Bell className="w-5 h-5" /> },
              { key: 'high', label: 'High Priority', icon: <AlertTriangle className="w-5 h-5" />, bg: 'bg-red-700', text: 'text-red-200' },
              { key: 'medium', label: 'Medium Priority', icon: <AlertCircle className="w-5 h-5" />, bg: 'bg-orange-700', text: 'text-orange-200' },
              { key: 'low', label: 'Low Priority', icon: <Bell className="w-5 h-5" />, bg: 'bg-green-700', text: 'text-green-200' }
            ].map(({ key, label, icon, bg = 'bg-gray-700', text = 'text-gray-100' }) => (
              <button
                key={key}
                onClick={() => onPriorityChange(key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:scale-105 ${
                  priorityFilter === key ? `${bg} ${text}` : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                }`}
              >
                {icon}
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}