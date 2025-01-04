import { createContext } from "react";
import { useState } from "react";


export const UserContext = createContext();


export function UserProvider({children}){
  const [user, setUser] = useState(null);
  const logOutUser = ()=>{
    setUser(null);
  }
  return(
    <UserContext.Provider value={{user,setUser,logOutUser}}>
      {children}
    </UserContext.Provider>
  )
}