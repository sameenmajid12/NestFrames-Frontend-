import React, { useContext, useEffect, useRef, useState } from "react";
import "../../../styles/header.css";
import { Link, useNavigate } from "react-router-dom";
import MainSearch from "./MainSearch";
import { UserContext } from "../../UserContext";
import Create from "./Create";

function Header({ sideBarFull, setSideBarFull }) {
  const dropDownRef = useRef(null);
  const profileImageRef = useRef(null);

  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [dropDownVisible, setDropDownVisible] = useState(false);
  const [createContainerVisibility, setCreateContainerVisibility] =
    useState(false);

  const handleVisibility = (e) => {
    if (
      dropDownRef.current &&
      !dropDownRef.current.contains(e.target) &&
      !profileImageRef.current.contains(e.target)
    ) {
      setDropDownVisible(false);
    }
  };

  useEffect(() => {
    document.body.addEventListener("mousedown", handleVisibility);
    return () => {
      document.body.removeEventListener("mousedown", handleVisibility);
    };
  }, []);

  const toggleCreateContainer = () => {
    setCreateContainerVisibility((prevVisibility) => !prevVisibility);
  };
  const logOut = ()=>{
    localStorage.setItem('user',null);
    setUser(null);
    navigate('/Sign-in')
  }


  function changeSideBar() {
    const sideBarFullVisible = !sideBarFull;
    setSideBarFull(sideBarFullVisible);

    if (!sideBarFullVisible) {
      document.querySelectorAll(".sideBar-item").forEach((item) => {
        item.style.flexDirection = "column";
      });
      document.documentElement.style.setProperty("--body-padding", "93.1px");
    } else {
      document.documentElement.style.setProperty("--body-padding", "187.125px");
      document.querySelectorAll(".sideBar-item").forEach((item) => {
        item.style.flexDirection = "";
      });
    }
  }

  return (
    <>
      {createContainerVisibility && (
        <Create
          visibility={createContainerVisibility}
          setVisibility={toggleCreateContainer}
        />
      )}
      <div className="header-container">
        <div className="left-header-container">
          <i
            onClick={changeSideBar}
            className="fa-solid fa-bars-staggered menu-bars"
          ></i>
          <img className="logo" src="/assets/BOO.png" alt="Logo" />
        </div>
        <MainSearch />
        <div className="right-header-container">
          <img
            onClick={() => setDropDownVisible(!dropDownVisible)}
            ref={profileImageRef}
            className="header-profile-image"
            src={
              user
                ? user.profilePic
                  ? user.profilePic.fileUrl
                  : "./assets/default-avatar.png"
                : ""
            }
            alt="Profile"
          />
          {dropDownVisible && (
            <div ref={dropDownRef} className="image-drop-down-container">
              <div className="drop-down-profile">
                <div className="drop-down-profile-info">
                  <img
                    src={
                      user
                        ? user.profilePic
                          ? user.profilePic.fileUrl
                          : "./assets/default-avatar.png"
                        : ""
                    }
                    alt="Profile Thumbnail"
                  />
                  <div>
                    <h2>{user.fullname}</h2>
                    <p>{`@${user.username}`}</p>
                  </div>
                </div>
                <i
                  onClick={logOut}
                  className="fa-solid fa-arrow-right-from-bracket fa-xl logout-icon"
                ></i>
              </div>
              <div className="drop-down-setting">
                <div
                  onClick={() => {
                    setDropDownVisible(false);
                    toggleCreateContainer();
                  }}
                  className="drop-down-setting-section"
                >
                  <i className="fa-solid fa-circle-plus"></i>
                  <p>Create</p>
                </div>
                <div
                  onClick={() => {
                    navigate(`/${user.username}`);
                    setDropDownVisible(false);
                  }}
                  className="drop-down-setting-section"
                >
                  <i className="fa-solid fa-user"></i>
                  <p>Profile</p>
                </div>
                <div className="drop-down-setting-section">
                  <i className="fa-solid fa-circle-question"></i>
                  <p>Help</p>
                </div>
                <div
                  onClick={() => navigate("/Settings")}
                  className="drop-down-setting-section"
                >
                  <i className="fa-solid fa-gears"></i>
                  <p>Settings</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
