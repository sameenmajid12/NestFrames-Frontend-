import React, { useContext, useEffect, useState, useRef } from "react";
import Header from "./Header.jsx";
import SideBar from "./SideBar.jsx";
import { Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext.jsx";
import Loading from "../Utils/Loading.jsx";
import { AuthContext } from "../Contexts/AuthContext.jsx";

function App() {
  const { user, setUser } = useContext(UserContext);
  const { token, setToken, refreshToken, logOut } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);
  const [sideBarFull, setSideBarFull] = useState(true);
  const [smallSideBarFull, setSmallSideBarFull] = useState(false);
  const searchRef = useRef(null);
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
          setScreen1000(true);
          setSideBarFull(false);
          setSideBarDisabled(true);
          if(window.innerWidth<=650){
            document.documentElement.style.setProperty("--body-padding", "0px");
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
            document.documentElement.style.setProperty("--body-padding", "69.1px");
            setSideBarDisabled(true);
            setScreen650(false);
          }
          
        } else {
          setScreen1000(false);
          setScreen650(false);
          setSideBarFull(true);
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
  useEffect(()=>{
    if(sideBarFull){
      document.documentElement.style.setProperty("--body-padding", "160px");
    }
    else if(window.innerWidth>=650){
        document.documentElement.style.setProperty("--body-padding", "69.1px");
    }
  },[sideBarFull])
  const navigate = useNavigate();
  useEffect(() => {
    const intervalId = setInterval(() => {
      refreshToken();
    }, 10 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);
  useEffect(()=>{
    if(window.innerWidth<=650){
      
    }
    else{
      
    }
  },[screen650])
  useEffect(() => {
    let timeoutId = null;
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
          localStorage.setItem("user", JSON.stringify(userUpdates));
          setLoadingUser(false);
        } else {
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
  useEffect(()=>{
    console.log(searchRef);
  },[searchRef.current])
  useEffect(() => {
    if (!user && !loadingUser) {
      navigate("/sign-in");
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
        searchRef={searchRef}
      />
      <SideBar sideBarFull={sideBarFull} screen650={screen650} smallSideBarFull={smallSideBarFull} setSmallSideBarFull={setSmallSideBarFull}/>
      <Outlet context={{screen1000:screen1000, screen650:screen650, searchRef:searchRef}}/>
      
    </>
  ) : (
    ""
  );
}

export default App;
