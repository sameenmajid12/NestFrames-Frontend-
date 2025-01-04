import { createContext, useContext, useState } from "react";
import { UserContext } from "./UserContext";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const { logOutUser } = useContext(UserContext);

  const refreshToken = async () => {
    try {
      const response = await fetch("http://localhost:3002/Sign-in/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to refresh token");
      }
      const data = await response.json();
      const accessToken = data.accessToken;
      if (!accessToken) {
        logOut();
        return null;
      }
      setToken(accessToken);
      return accessToken;
    } catch (error) {
      console.error("Error refreshing token:", error);
      logOut();
      return null;
    }
  };

  const deleteRefreshToken = async() => {
    await fetch("http://localhost:3002/sign-in/logOut",{
      method:"POST",
      credentials:"include"
    });
  };

  const logOut = () => {
    logOutUser();
    setToken(null);
    deleteRefreshToken();
    localStorage.removeItem('user');
  };

  const value = { token, setToken, refreshToken, logOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
