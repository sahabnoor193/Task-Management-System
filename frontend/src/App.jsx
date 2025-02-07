import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Plus, Search } from "lucide-react";
import { Sidebar } from "./components/Sidebar";
import { TaskItem } from "./components/TaskItem";
import { TaskForm } from "./components/TaskForm";
import { useNotification } from "./hooks/useNotification";
import Auth from "./pages/Auth";


function App() {
  const [tasks, setTasks] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const { requestNotificationPermission, scheduleNotification } = useNotification();

  const [user, setUser] = useState(null);

  useEffect(() => {
    requestNotificationPermission();
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const filteredAndSortedTasks = tasks
    .filter(task => {
      const statusMatch = activeFilter === "all" ? true : activeFilter === "completed" ? task.completed : !task.completed;
      const priorityMatch = priorityFilter === "all" ? true : task.priority === priorityFilter;
      const searchMatch = searchQuery === "" ? true : task.title.toLowerCase().includes(searchQuery.toLowerCase());
      return statusMatch && priorityMatch && searchMatch;
    })
    .sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      switch (sortBy) {
        case "date":
          return sortOrder === "asc" ? new Date(a.createdAt) - new Date(b.createdAt) : new Date(b.createdAt) - new Date(a.createdAt);
        case "priority":
          return sortOrder === "asc" ? priorityOrder[a.priority] - priorityOrder[b.priority] : priorityOrder[b.priority] - priorityOrder[a.priority];
        case "title":
          return sortOrder === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

  return (
    <Router>
      <Routes>
        {/* Authentication Route */}
        <Route path="/auth" element={<Auth />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            user ? (
              <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
                <Sidebar activeFilter={activeFilter} priorityFilter={priorityFilter} onFilterChange={setActiveFilter} onPriorityChange={setPriorityFilter} />
                
                <main className="flex-1 p-4 md:p-8 overflow-auto">
                  <div className="max-w-3xl mx-auto">
                    <div className="flex flex-col gap-4 mb-8">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                          {activeFilter === "completed" ? "Completed Tasks" : activeFilter === "pending" ? "Pending Tasks" : "All Tasks"}
                          {priorityFilter !== "all" && ` - ${priorityFilter} Priority`}
                        </h2>

                        <button onClick={() => setIsFormOpen(true)} className="btn btn-primary flex items-center gap-2 w-full sm:w-auto justify-center">
                          <Plus className="w-5 h-5" />
                          Add Task
                        </button>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Search tasks..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
                          />
                        </div>

                        <div className="flex gap-2">
                          <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
                          >
                            <option value="date">Sort by Date</option>
                            <option value="priority">Sort by Priority</option>
                            <option value="title">Sort by Title</option>
                          </select>
                          <button
                            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                            className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200"
                          >
                            {sortOrder === "asc" ? "↑" : "↓"}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {filteredAndSortedTasks.map(task => (
                        <TaskItem key={task.id} task={task} onToggle={() => {}} onEdit={() => {}} onDelete={() => {}} />
                      ))}

                      {filteredAndSortedTasks.length === 0 && (
                        <div className="text-center py-12">
                          <p className="text-gray-500 text-lg mb-4">
                            {searchQuery ? "No tasks found matching your search" : "No tasks found"}
                          </p>
                          <button onClick={() => setIsFormOpen(true)} className="btn btn-primary inline-flex items-center gap-2">
                            <Plus className="w-5 h-5" />
                            Create your first task
                          </button>
                        </div>
                      )}
                    </div>

                    <button onClick={handleLogout} className="mt-6 btn btn-secondary">
                      Logout
                    </button>
                  </div>
                </main>

                {isFormOpen && <TaskForm task={editingTask} onSubmit={() => {}} onClose={() => setIsFormOpen(false)} />}
              </div>
            ) : (
              <Navigate to="/auth" />
            )
          }
        />

        {/* Default Route */}
        <Route path="*" element={<Navigate to={user ? "/dashboard" : "/auth"} />} />
      </Routes>
    </Router>
  );
}

export default App;
