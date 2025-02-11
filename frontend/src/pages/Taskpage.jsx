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
  const [user, setUser] = useState(null); // 🔹 Store logged-in user info
  const { permission, requestNotificationPermission, scheduleNotification } = useNotification();

  const handleEditTask = async (updatedTask) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No token found");
        return;
      }
  
      const response = await fetch(`http://localhost:5000/api/tasks/${updatedTask._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedTask),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update task");
      }
  
      fetchTasks(); // Refresh tasks after updating
      setIsFormOpen(false);
      setEditingTask(null);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  
  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
  
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No token found");
        return;
      }
  
      const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
  
      fetchTasks(); // Refresh task list after deletion
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };  
  
  // Fetch user details
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/signin');
        return;
      }

      const response = await fetch('http://localhost:5000/api/auth/user', {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }

      const userData = await response.json();
      setUser(userData); // 🔹 Store the user's details
    } catch (error) {
      console.error('Error fetching user:', error);
      navigate('/signin'); // Redirect if user fetch fails
    }
  };

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/signin');
        return;
      }

      const response = await fetch('http://localhost:5000/api/tasks', {
        headers: { 'Authorization': `Bearer ${token}` },
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
    fetchUser();  // 🔹 Fetch user data
    fetchTasks();
    if (permission === 'default') {
      requestNotificationPermission();
    }
  }, []);

  // Filter tasks based on status, priority, and search
  useEffect(() => {
    let filtered = [...tasks];

    if (activeFilter !== 'all') {
      filtered = filtered.filter(task => 
        activeFilter === 'completed' ? task.completed : !task.completed
      );
    }

    if (priorityFilter !== 'all') {
      filtered = filtered.filter(task => task.priority === priorityFilter);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(query) ||
        task.description?.toLowerCase().includes(query)
      );
    }

    setFilteredTasks(filtered);
  }, [tasks, activeFilter, priorityFilter, searchQuery]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // Also remove user info
    setUser(null);
    navigate('/signin');
  };
  
  
  return (
    <div className="min-h-screen bg-gray-800 flex flex-col md:flex-row">
      <Sidebar
        user={user}  // 🔹 Pass user data to Sidebar
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
              <motion.div layout className="space-y-4">
                {filteredTasks.map(task => (
                  <TaskItem
                    key={task._id}
                    task={task}
                    onEdit={(task) => {
                      setEditingTask(task);
                      setIsFormOpen(true);
                    }}
                    onDelete={handleDeleteTask}
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
                  {searchQuery ? 'No tasks found matching your search' : 'No tasks yet. Click "Add Task" to get started!'}
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
            onSubmit={() => {
              fetchTasks(); // Reload tasks after a new task is added
              setIsFormOpen(false);
              setEditingTask(null);
            }}
            onDelete={handleDeleteTask}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
