import React, { useState } from 'react';
import { Plus, Search, Filter, Bell, Calendar, Clock, AlertCircle } from 'lucide-react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import DeleteConfirmation from './DeleteConfirmation';

function Dashboard() {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    search: '',
  });

  const handleCreateTask = (task) => {
    // TODO: Implement task creation
    setShowTaskForm(false);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setShowTaskForm(true);
  };

  const handleDeleteTask = (task) => {
    setSelectedTask(task);
    setShowDeleteConfirm(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
          <p className="text-gray-600 mt-1">Manage and organize your tasks efficiently</p>
        </div>
        <button
          onClick={() => setShowTaskForm(true)}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors shadow-md hover:shadow-lg"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Task
        </button>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
        <div className="md:col-span-5 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="pl-10 w-full p-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
          />
        </div>
        <div className="md:col-span-7 flex flex-wrap gap-3">
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="p-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <select
            value={filters.priority}
            onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
            className="p-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
          >
            <option value="all">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Task List */}
      <TaskList
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
        filters={filters}
      />

      {/* Task Form Modal */}
      {showTaskForm && (
        <TaskForm
          task={selectedTask}
          onClose={() => {
            setShowTaskForm(false);
            setSelectedTask(null);
          }}
          onSubmit={handleCreateTask}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <DeleteConfirmation
          task={selectedTask}
          onClose={() => {
            setShowDeleteConfirm(false);
            setSelectedTask(null);
          }}
          onConfirm={() => {
            // TODO: Implement delete
            setShowDeleteConfirm(false);
            setSelectedTask(null);
          }}
        />
      )}
    </div>
  );
}

export default Dashboard;