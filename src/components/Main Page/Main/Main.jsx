import React, { useContext, useEffect, useState } from "react";
import Header from "./Header.jsx";
import SideBar from "./SideBar.jsx";
import { Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext.jsx";
import Loading from "./Loading.jsx";
import { AuthContext } from "../../AuthContext.jsx";

function Main() {
  const { user, setUser } = useContext(UserContext);
  const { token, setToken, refreshToken, logOut } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);
  const [sideBarFull, setSideBarFull] = useState(true);
  const [smallSideBarFull, setSmallSideBarFull] = useState(false);
  const [sideBarDisabled, setSideBarDisabled] = useState(
    window.innerWidth <= 1000 || false
  );
  const [screen1000, setScreen1000] = useState(window.innerWidth<=1000);
  const [screen425, setScreen425] = useState(window.innerWidth<=425);
  const [screen650, setScreen650] = useState(window.innerWidth<=650);
  useEffect(() => {

    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (window.innerWidth <= 1000) {
          if(window.innerWidth<=650){
            setSideBarDisabled(false);
            setScreen650(true);
            if(window.innerWidth<=425){
              setScreen425(true);
            }
            else{
              setScreen425(false);
            }
          }
          else{
            setSideBarDisabled(true);
            setScreen650(false);
          }
          setScreen1000(true);
          setSideBarFull(false);
          setSideBarDisabled(true);
        } else {
          setScreen1000(false);
          setScreen650(false);

          setSideBarDisabled(false);
        }
      }, 100);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const navigate = useNavigate();
  useEffect(() => {
    const intervalId = setInterval(() => {
      refreshToken();
    }, 10 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);
  useEffect(()=>{
    if(window.innerWidth<=650){
      document.documentElement.style.setProperty("--body-padding", "0px");
    }
    else{
      document.documentElement.style.setProperty("--body-padding", "69.1px");
    }
  },[screen650])
  useEffect(() => {
    let timeoutId = null;
    console.log("refreshed");
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
              method: "GET",
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
          console.log("signed out");
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
      console.log("signed out through use effect");
    }
  }, [user, navigate]);
  if (isLoading) {
    return <Loading />;
  }
  return user ? (
    <>
      <Header
        sideBarFull={sideBarFull}
        setSideBarFull={setSideBarFull}
        sideBarDisabled={sideBarDisabled}
        screen425={screen425}
        screen650={screen650}
        setSmallSideBarFull={setSmallSideBarFull}
      />
      <SideBar sideBarFull={sideBarFull} screen650={screen650} smallSideBarFull={smallSideBarFull}/>
      <Outlet context={{screen1000:screen1000}}/>
    </>
  ) : (
    ""
  );
}

export default Main;
