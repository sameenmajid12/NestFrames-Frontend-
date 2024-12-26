import React, { useContext, useEffect, useState } from "react";
import Header from "./Header.jsx";
import SideBar from "./SideBar.jsx";
import { Outlet, useNavigate } from "react-router-dom";
import Create from "./Create.jsx";
import { UserContext } from "../../UserContext.jsx";
import FriendList from "./FriendsList.jsx";
import Loading from "./Loading.jsx";
function Main() {
  const { user, setUser } = useContext(UserContext);
  const [sideBarFull, setSideBarFull] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (user === null) {
      navigate("/Sign-in");
    }
  }, [navigate]);
  useEffect(() => {
    async function updateOnRefresh() {
      try {
        if (user) {
          const response = await fetch(
            `http://localhost:3002/users/${user.username}`
          );
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
          const userUpdates = await response.json();
          setUser(userUpdates);
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (user) {
    }
    updateOnRefresh();
  }, []);
  return (
    <>
      <Header sideBarFull={sideBarFull} setSideBarFull={setSideBarFull} />
      <SideBar sideBarFull={sideBarFull} />
      <Outlet />
    </>
  );
}

export default Main;
