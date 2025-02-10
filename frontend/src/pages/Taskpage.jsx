import React, { useState, useEffect } from 'react';
import { Plus, Search, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { TaskForm } from '../components/TaskForm';
import { TaskItem } from '../components/TaskItem';
import { useNotification } from '../hooks/useNotification';

export function TasksPage() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const { permission, requestNotificationPermission, scheduleNotification } = useNotification();

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/signin');
        return;
      }

      const response = await fetch('http://localhost:5000/api/tasks', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }

      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Initial fetch and notification setup
  useEffect(() => {
    fetchTasks();
    if (permission === 'default') {
      requestNotificationPermission();
    }
  }, []);

  // Filter tasks based on status, priority, and search
  useEffect(() => {
    let filtered = [...tasks];

    // Status filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter(task => 
        activeFilter === 'completed' ? task.completed : !task.completed
      );
    }

    // Priority filter
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(task => task.priority === priorityFilter);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(query) ||
        task.description?.toLowerCase().includes(query)
      );
    }

    setFilteredTasks(filtered);
  }, [tasks, activeFilter, priorityFilter, searchQuery]);

  // Handle task creation/update
  const handleTaskSubmit = async (taskData) => {
    try {
      const token = localStorage.getItem('token');
      const isEditing = Boolean(editingTask);
      const url = isEditing 
        ? `http://localhost:5000/api/tasks/${editingTask._id}`
        : 'http://localhost:5000/api/tasks';
      
      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error('Failed to save task');
      }

      const savedTask = await response.json();
      
      if (isEditing) {
        setTasks(tasks.map(t => t._id === savedTask._id ? savedTask : t));
      } else {
        setTasks([savedTask, ...tasks]);
      }

      // Schedule notification if reminder is set
      if (taskData.reminderDate) {
        scheduleNotification(
          taskData.title,
          taskData.description || 'Task reminder',
          taskData.reminderDate
        );
      }

      setIsFormOpen(false);
      setEditingTask(null);
    } catch (error) {
      console.error('Error saving task:', error);
      alert('Failed to save task. Please try again.');
    }
  };

  // Handle task toggle
  const handleTaskToggle = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/tasks/${taskId}/toggle`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to toggle task');
      }

      const updatedTask = await response.json();
      setTasks(tasks.map(t => t._id === taskId ? updatedTask : t));
    } catch (error) {
      console.error('Error toggling task:', error);
      alert('Failed to update task status. Please try again.');
    }
  };

  // Handle task deletion
  const handleTaskDelete = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      setTasks(tasks.filter(t => t._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task. Please try again.');
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/signin');
  };

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col md:flex-row">
      <Sidebar
        activeFilter={activeFilter}
        priorityFilter={priorityFilter}
        onFilterChange={setActiveFilter}
        onPriorityChange={setPriorityFilter}
        onTaskifyClick={() => {
          setActiveFilter('all');
          setPriorityFilter('all');
          setSearchQuery('');
        }}
      />

      <main className="flex-1 p-4 md:p-6 overflow-auto">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setEditingTask(null);
                  setIsFormOpen(true);
                }}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>Add Task</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          <AnimatePresence mode="popLayout">
            {filteredTasks.length > 0 ? (
              <motion.div
                layout
                className="space-y-4"
              >
                {filteredTasks.map(task => (
                  <TaskItem
                    key={task._id}
                    task={task}
                    onToggle={handleTaskToggle}
                    onEdit={(task) => {
                      setEditingTask(task);
                      setIsFormOpen(true);
                    }}
                    onDelete={handleTaskDelete}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <p className="text-gray-400 text-lg">
                  {searchQuery
                    ? 'No tasks found matching your search'
                    : 'No tasks yet. Click "Add Task" to get started!'}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <AnimatePresence>
        {isFormOpen && (
          <TaskForm
            task={editingTask}
            onSubmit={handleTaskSubmit}
            onClose={() => {
              setIsFormOpen(false);
              setEditingTask(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}