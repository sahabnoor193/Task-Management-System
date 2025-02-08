import React, { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { TaskItem } from './components/TaskItem';
import { TaskForm } from './components/TaskForm';
import { useNotification } from './hooks/useNotification';

function App() {
  const [tasks, setTasks] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date'); // Options: 'date', 'priority', 'title'
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' or 'desc'
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const { requestNotificationPermission, scheduleNotification } = useNotification();

  // Load tasks from localStorage
  useEffect(() => {
    requestNotificationPermission();
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  // Save tasks to localStorage on update
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Filter and sort tasks
  const filteredAndSortedTasks = tasks
    .filter(task => {
      return (
        (activeFilter === 'all' || (activeFilter === 'completed' ? task.completed : !task.completed)) &&
        (priorityFilter === 'all' || task.priority === priorityFilter) &&
        (searchQuery === '' || task.title.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    })
    .sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      switch (sortBy) {
        case 'date':
          return sortOrder === 'asc'
            ? new Date(a.createdAt) - new Date(b.createdAt)
            : new Date(b.createdAt) - new Date(a.createdAt);
        case 'priority':
          return sortOrder === 'asc'
            ? priorityOrder[a.priority] - priorityOrder[b.priority]
            : priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'title':
          return sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

  const handleTaskSubmit = (taskData) => {
    setTasks(prevTasks => {
      const updatedTasks = editingTask
        ? prevTasks.map(task => (task.id === taskData.id ? taskData : task))
        : [...prevTasks, { ...taskData, id: Date.now() }];
      return updatedTasks;
    });

    if (taskData.reminderDate) {
      scheduleNotification(taskData.title, taskData.description || 'Task reminder', new Date(taskData.reminderDate));
    }

    handleFormClose();
  };

  const handleTaskToggle = (taskId) => {
    setTasks(prevTasks => prevTasks.map(task => (task.id === taskId ? { ...task, completed: !task.completed } : task)));
  };

  const handleTaskEdit = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleTaskDelete = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar
        activeFilter={activeFilter}
        priorityFilter={priorityFilter}
        onFilterChange={setActiveFilter}
        onPriorityChange={setPriorityFilter}
      />

      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {activeFilter === 'completed' ? 'Completed Tasks' : activeFilter === 'pending' ? 'Pending Tasks' : 'All Tasks'}
              {priorityFilter !== 'all' && ` - ${priorityFilter} Priority`}
            </h2>
            <button onClick={() => setIsFormOpen(true)} className="btn btn-primary flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add Task
            </button>
          </div>

          {/* Search & Sorting */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
              >
                <option value="date">Sort by Date</option>
                <option value="priority">Sort by Priority</option>
                <option value="title">Sort by Title</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-200 transition"
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>
          </div>

          {/* Task List */}
          <div className="space-y-4">
            {filteredAndSortedTasks.length > 0 ? (
              filteredAndSortedTasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={() => handleTaskToggle(task.id)}
                  onEdit={() => handleTaskEdit(task)}
                  onDelete={() => handleTaskDelete(task.id)}
                />
              ))
            ) : (
              <p className="text-gray-500 text-center">No tasks found.</p>
            )}
          </div>
        </div>
      </main>

      {/* Task Form Modal */}
      {isFormOpen && (
        <TaskForm
          task={editingTask}
          onSubmit={handleTaskSubmit}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
}

export default App;
