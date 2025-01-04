import React, { useContext, useEffect, useState } from "react";
import Header from "./Header.jsx";
import SideBar from "./SideBar.jsx";
import { Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext.jsx";
import Loading from "./Loading.jsx";
import { AuthContext } from "../../AuthContext.jsx";

function Main() {
  const { user, setUser } = useContext(UserContext);
  const {token,refreshToken,logOut} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true); 
  const [loadingUser, setLoadingUser] = useState(true);
  const [sideBarFull, setSideBarFull] = useState(true);
  const navigate = useNavigate();
  useEffect(()=>{
    if(!token){
      refreshToken();
    }
  },[token])
  useEffect(() => {
    let timeoutId = null;
    console.log('refreshed');
    async function updateOnRefresh() {
      try {
        let currentToken = token;
        if (!currentToken) {
          currentToken = await refreshToken();
        }
  
        const localUser = JSON.parse(localStorage.getItem("user"));
        if (localUser) {
          const response = await fetch(
            `http://localhost:3002/users/${localUser.username}`,
            {
              method:"GET",
              headers: {
                Authorization: `Bearer ${currentToken}`,
              },
              credentials: "include",
            }
          );
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
  
          const userUpdates = await response.json();
          setUser(userUpdates);
          console.log(userUpdates);
          localStorage.setItem("user", JSON.stringify(userUpdates));
          setLoadingUser(false);
        } else {
          console.log('signed out')
          navigate("/Sign-in");
        }
      } catch (error) {
        console.error("Error updating user:", error);
        logOut();
      } finally {
        timeoutId = setTimeout(() => setIsLoading(false), 1000);
      }
    }
  
    updateOnRefresh();
  
    return () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    };
  }, []);
  
  useEffect(() => {
    if (!user && !loadingUser) {
      navigate("/sign-in");
      console.log('signed out through use effect')
    }
  }, [user, navigate]);
  if (isLoading) {
    return <Loading />;
  }
  return (
    user?<>
      <Header sideBarFull={sideBarFull} setSideBarFull={setSideBarFull} />
      <SideBar sideBarFull={sideBarFull} />
      <Outlet />
    </>:''
  );
}

export default Main;
