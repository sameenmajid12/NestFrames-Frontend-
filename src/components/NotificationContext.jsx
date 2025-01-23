import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { SocketContext } from "./SocketContext";
import SentNotification from "../components/Main Page/Utils/SentNotification";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [sentNotifications, setSentNotifications] = useState([]); 
  const [receivedNotifications, setReceivedNotifications] = useState([]); 
  const { user } = useContext(UserContext);
  const { socket } = useContext(SocketContext);
  let timeoutId;

  const addSentNotification = (success, message) => {
    clearTimeout(timeoutId);
    setSentNotifications((prev) => {console.log([...prev,{success,message}]); return[...prev, {success, message}]});
    timeoutId = setTimeout(() => {
      setSentNotifications((prev) => prev.slice(1));
    }, 5000);
  };

  const addReceivedNotification = (notification) => {
    setReceivedNotifications((prev) => [...prev, notification]);
  };

  useEffect(() => {
    if (user && socket) {
      socket.on("notification", (notification) => {
        console.log(notification);
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
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      {sentNotifications.length > 0 && (
        <SentNotification success={sentNotifications[0].success} message={sentNotifications[0].message} />
      )}
    </NotificationContext.Provider>
  );
};
