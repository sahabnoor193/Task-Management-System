import { useState, useCallback } from "react";

export function useNotification() {
  const [permission, setPermission] = useState(Notification.permission);

  const requestNotificationPermission = useCallback(async () => {
    try {
      const result = await Notification.requestPermission();
      setPermission(result);

      if (result === "denied") {
        alert("Notifications are blocked. Enable them in your browser settings.");
      }
      return result;
    } catch (error) {
      console.error("Error requesting notification permission:", error);
      return "denied";
    }
  }, []);

  const scheduleNotification = useCallback((title, body, date) => {
    if (permission !== "granted") {
      alert("Notifications are not enabled. Please allow them to receive alerts.");
      return;
    }

    const now = new Date().getTime();
    const scheduledTime = new Date(date).getTime();

    if (scheduledTime <= now) {
      alert("Scheduled time must be in the future.");
      return;
    }

    const timeout = scheduledTime - now;

    setTimeout(() => {
      try {
        new Notification(title, {
          body,
          icon: "/icons/notification-dark.svg", // Use a dark-mode-friendly icon
          badge: "/icons/notification-badge.svg",
          vibrate: [300, 100, 300], // Custom vibration pattern
        });
      } catch (error) {
        console.error("Error showing notification:", error);
      }
    }, timeout);
  }, [permission]);

  return {
    permission,
    requestNotificationPermission,
    scheduleNotification,
  };
}
