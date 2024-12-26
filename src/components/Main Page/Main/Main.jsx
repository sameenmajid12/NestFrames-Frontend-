import React, { useContext, useEffect, useState } from "react";
import Header from "./Header.jsx";
import SideBar from "./SideBar.jsx";
import { Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext.jsx";
import Loading from "./Loading.jsx";

function Main() {
  const { user, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [sideBarFull, setSideBarFull] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function updateOnRefresh() {
      let timeoutId;
      try {
        const localUser = JSON.parse(localStorage.getItem("user"));
        if (localUser) {
          const response = await fetch(
            `http://localhost:3002/users/${localUser.username}`
          );
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
          const userUpdates = await response.json();
          setUser(userUpdates);
          localStorage.setItem("user", JSON.stringify(userUpdates));
        } else {
          navigate("/Sign-in");
        }
      } catch (error) {
        console.log(error);
      } finally {
        timeoutId = setTimeout(()=>{
          setIsLoading(false); 
        },[1000])
      }
    }
    updateOnRefresh();
    return()=>{
        clearTimeout(timeoutId);
    }
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Header sideBarFull={sideBarFull} setSideBarFull={setSideBarFull} />
      <SideBar sideBarFull={sideBarFull} />
      <Outlet />
    </>
  );
}

export default Main;
