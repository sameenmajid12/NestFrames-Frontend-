import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { SocketContext } from "./SocketContext";
import SentNotification from "../Notifications/SentNotification";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [sentNotifications, setSentNotifications] = useState([]);
  const [receivedNotifications, setReceivedNotifications] = useState([]);
  const { user } = useContext(UserContext);
  const { socket } = useContext(SocketContext);
  const fetchNotifications = async () => {
    const response = await fetch(
      `http://localhost:3002/notifications/${user._id}/getNotifications`
    );
    if (response.ok) {
      const { notifications } = await response.json();
      setReceivedNotifications(notifications);
    }
  };
  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user]);

  let timeoutId = null;
  const addSentNotification = (success, message) => {
    if(timeoutId)clearTimeout(timeoutId);
    setSentNotifications((prev) => {
      return [...prev, { success, message }];
    });
    timeoutId = setTimeout(() => {
      setSentNotifications((prev) => prev.slice(1));
    }, 5000);
  };
  const removeSentNotification = () => {
    clearTimeout(timeoutId);
    setSentNotifications((prev) => prev.slice(1));
    timeoutId=null;
  };
  const addReceivedNotification = (notification) => {
    setReceivedNotifications((prev) => {
      return Array.isArray(prev) ? [notification, ...prev] : [notification];
    });
  };

  useEffect(() => {
    if (user && socket) {
      socket.on("notification", (notification) => {
        addReceivedNotification(notification);
      });
    }

    return () => {
      if (socket) socket.off("notification");
    };
  }, [user, socket]);

  const value = {
    addSentNotification,
    addReceivedNotification,
    receivedNotifications,
    setReceivedNotifications,
    removeSentNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      {sentNotifications.length > 0 && (
        <SentNotification
          success={sentNotifications[0].success}
          message={sentNotifications[0].message}
          removeNotification={removeSentNotification}
        />
      )}
    </NotificationContext.Provider>
  );
};
