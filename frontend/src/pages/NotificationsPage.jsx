// Display stored notifications and allow deletion
import React, { useState, useEffect } from 'react';

export function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch('http://localhost:5000/api/notifications', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to fetch notifications');
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/notifications/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setNotifications(notifications.filter((n) => n._id !== id));
    } catch (error) {
      console.error('Failed to delete notification', error);
    }
  };

  return (
    <div className="p-6 bg-gray-800 min-h-screen text-white">
      <h2 className="text-xl font-bold mb-4">Notifications</h2>
      {notifications.length > 0 ? (
        <ul className="space-y-3">
          {notifications.map((notification) => (
            <li
              key={notification._id}
              className="flex justify-between items-center bg-gray-700 p-3 rounded-lg"
            >
              <span>{notification.message}</span>
              <button
                onClick={() => deleteNotification(notification._id)}
                className="text-red-400 hover:text-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No notifications</p>
      )}
    </div>
  );
}
