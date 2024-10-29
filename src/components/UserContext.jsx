import { createContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export const UserContext = createContext();


export function UserProvider({children}){
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user'))||null);
  
  return(
    <UserContext.Provider value={{user,setUser}}>
      {children}
    </UserContext.Provider>
  )
}