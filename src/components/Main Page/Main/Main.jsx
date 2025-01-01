import React, { useContext, useEffect, useState } from "react";
import Header from "./Header.jsx";
import SideBar from "./SideBar.jsx";
import { Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext.jsx";
import Loading from "./Loading.jsx";

function Main() {
  const { user, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true); 
  const [sideBarFull, setSideBarFull] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let timeoutId = null;
    async function updateOnRefresh() {
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
        timeoutId = setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    }
    updateOnRefresh();
    return () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    };
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
