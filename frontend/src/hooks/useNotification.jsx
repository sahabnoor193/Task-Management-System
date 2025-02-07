import { useState, useCallback } from 'react';

export function useNotification() {
  const [permission, setPermission] = useState(Notification.permission);

  const requestNotificationPermission = useCallback(async () => {
    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result;
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return 'denied';
    }
  }, []);

  const scheduleNotification = useCallback((title, body, date) => {
    if (permission !== 'granted') return;

    const now = new Date().getTime();
    const scheduledTime = new Date(date).getTime();
    
    if (scheduledTime <= now) return;

    const timeout = scheduledTime - now;
    
    setTimeout(() => {
      try {
        new Notification(title, {
          body,
          icon: '/vite.svg', // Replace this with your app's icon
          badge: '/vite.svg',
          vibrate: [200, 100, 200],
        });
      } catch (error) {
        console.error('Error showing notification:', error);
      }
    }, timeout);
  }, [permission]);

  return { 
    permission, 
    requestNotificationPermission, 
    scheduleNotification 
  };
}
