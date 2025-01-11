import { useContext, useEffect } from "react";
import { createContext, useState } from "react";
import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";
import { UserContext } from "./UserContext";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { user } = useContext(UserContext);
  useEffect(() => {
    const newSocket = io(`http://localhost:3002`);
    setSocket(newSocket);
    console.log(newSocket);
    return () => {
      newSocket.emit("removeUser", user.username);
      newSocket.disconnect();
    };
  }, []);
  useEffect(() => {
    if (user && socket) {
      console.log(`Registering user: ${user.username}`);  
      socket.emit("registerUser", user.username);
    }
  }, [user, socket]);
  const value = { socket, setSocket };
  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
