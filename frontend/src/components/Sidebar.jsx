import React, { useState, useEffect } from 'react';
import { ListTodo, CheckSquare, Clock, Settings, AlertTriangle, AlertCircle, Bell, X } from 'lucide-react';

export function Sidebar({ activeFilter, priorityFilter, onFilterChange, onPriorityChange }) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className="w-full md:w-72 bg-white dark:bg-gray-900 border-b md:border-r border-gray-200 dark:border-gray-700 shadow-lg p-4 md:p-6 flex flex-col md:min-h-screen">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-blue-100 dark:bg-blue-700 rounded-lg">
          <ListTodo className="w-6 h-6 text-blue-600 dark:text-blue-200" />
        </div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Task Manager</h1>
      </div>

      <div className="space-y-6">
        {/* Status Filter */}
        <div>
          <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2 px-4">Status</h2>
          <nav className="space-y-1">
            {['all', 'completed', 'pending'].map((filter) => (
              <button
                key={filter}
                onClick={() => onFilterChange(filter)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeFilter === filter
                    ? 'bg-blue-50 dark:bg-blue-700 text-blue-700 dark:text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {filter === 'all' && <ListTodo className="w-5 h-5" />}
                {filter === 'completed' && <CheckSquare className="w-5 h-5" />}
                {filter === 'pending' && <Clock className="w-5 h-5" />}
                <span className="font-medium capitalize">{filter} Tasks</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Priority Filter */}
        <div>
          <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2 px-4">Priority</h2>
          <nav className="space-y-1">
            {[
              { label: 'All Priorities', value: 'all', icon: Bell },
              { label: 'High Priority', value: 'high', icon: AlertTriangle },
              { label: 'Medium Priority', value: 'medium', icon: AlertCircle },
              { label: 'Low Priority', value: 'low', icon: Bell },
            ].map(({ label, value, icon: Icon }) => (
              <button
                key={value}
                onClick={() => onPriorityChange(value)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  priorityFilter === value
                    ? 'bg-blue-50 dark:bg-blue-700 text-blue-700 dark:text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Settings Button */}
      <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700">
        <button
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
          onClick={toggleSettings}
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </button>
      </div>

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Settings</h2>
              <button onClick={toggleSettings} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Dark Mode Toggle */}
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300 font-medium">Dark Mode</span>
                <button
                  onClick={toggleDarkMode}
                  className={`w-12 h-6 flex items-center bg-gray-300 dark:bg-gray-600 rounded-full p-1 transition ${
                    darkMode ? 'bg-blue-600' : ''
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow-md transform transition ${
                      darkMode ? 'translate-x-6' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Task Sorting */}
              <div className="flex flex-col">
                <span className="text-gray-700 dark:text-gray-300 font-medium mb-1">Task Sorting</span>
                <select className="border dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-300 rounded-lg px-3 py-2">
                  <option value="priority">By Priority</option>
                  <option value="date">By Due Date</option>
                  <option value="name">By Name</option>
                </select>
              </div>

              {/* Enable Notifications */}
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300 font-medium">Enable Notifications</span>
                <button className="w-12 h-6 flex items-center bg-gray-300 dark:bg-gray-600 rounded-full p-1 transition">
                  <div className="w-5 h-5 bg-white rounded-full shadow-md transform transition" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
