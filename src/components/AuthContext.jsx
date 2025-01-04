import { createContext, useContext } from "react";
import { useState } from "react";
import { UserContext } from "./UserContext";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const { setUser } = useContext(UserContext);
  const refreshToken = async () => {
    const response = await fetch("http://localhost:3002/Sign-in/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { accessToken } = await response.json();
    if (!accessToken) {
      logOut();
    }
    setToken(accessToken);
    return accessToken;
  };
  const logOut = () => {
    setUser(null);
    setToken(null);
    window.location.href = "/sign-in";
  };
  return (
    <AuthContext.Provider value={{ token, setToken, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
}
