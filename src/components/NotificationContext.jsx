import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { SocketContext } from "./SocketContext";
import Notification from "./Main Page/Main/Notification";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const { user } = useContext(UserContext);
  const { socket } = useContext(SocketContext);

  const addNotification = (success, message) => {
    setNotifications((prev) => [...prev, { success, message }]);

    setTimeout(() => {
      setNotifications((prev) => prev.slice(1));
    }, 10000);
  };

  useEffect(() => {
    if (user && socket) {
      socket.on("notification", (notification) => {
        addNotification(notification.success, notification.message);
      });
    }
    // Clean up the socket listener when component unmounts
    return () => {
      if (socket) socket.off("notification");
    };
  }, [user, socket]);

  const value = { addNotification,setNotifications };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      {notifications.length > 0 && (
        <Notification
          success={notifications[0].success}
          message={notifications[0].message}
          setNotifications={setNotifications}
        />
      )}
    </NotificationContext.Provider>
  );
};
