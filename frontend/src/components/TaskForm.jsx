import React, { useState, useEffect } from 'react';
import { X, AlertTriangle, AlertCircle, Bell } from 'lucide-react';
import { format } from 'date-fns';

export function TaskForm({ task, onSubmit, onClose }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [reminderDate, setReminderDate] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setPriority(task.priority || 'medium');
      setDueDate(task.dueDate ? format(new Date(task.dueDate), 'yyyy-MM-dd\'T\'HH:mm') : '');
      setReminderDate(task.reminderDate ? format(new Date(task.reminderDate), 'yyyy-MM-dd\'T\'HH:mm') : '');
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      id: task?.id || crypto.randomUUID(),
      title,
      description,
      priority,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      reminderDate: reminderDate ? new Date(reminderDate).toISOString() : null,
      completed: task?.completed || false,
      createdAt: task?.createdAt || new Date().toISOString(),
    });
    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate('');
    setReminderDate('');
    onClose();
  };

  const priorityIcons = {
    high: <AlertTriangle className="w-5 h-5" />, 
    medium: <AlertCircle className="w-5 h-5" />, 
    low: <Bell className="w-5 h-5" />
  };

  const priorityColors = {
    high: 'text-red-600 bg-red-50',
    medium: 'text-orange-600 bg-orange-50',
    low: 'text-green-600 bg-green-50',
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {task ? 'Edit Task' : 'Create Task'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="task-input"
              placeholder="Enter task title"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description (optional)</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="task-input"
              placeholder="Enter task description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <div className="grid grid-cols-3 gap-2">
              {['high', 'medium', 'low'].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`flex items-center justify-center gap-2 p-2 rounded-lg border ${
                    priority === p
                      ? `${priorityColors[p]} border-transparent`
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {priorityIcons[p]}
                  <span className="capitalize">{p}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
              <input
                type="datetime-local"
                id="dueDate"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="task-input"
              />
            </div>

            <div>
              <label htmlFor="reminderDate" className="block text-sm font-medium text-gray-700 mb-1">Reminder</label>
              <input
                type="datetime-local"
                id="reminderDate"
                value={reminderDate}
                onChange={(e) => setReminderDate(e.target.value)}
                className="task-input"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="btn btn-secondary">Cancel</button>
            <button type="submit" className="btn btn-primary">{task ? 'Update Task' : 'Create Task'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
