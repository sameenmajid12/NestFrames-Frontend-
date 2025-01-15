import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../../styles/side-bar.css";
import { UserContext } from "../../UserContext";

function SideBar({
  sideBarFull,
  screen650,
  smallSideBarFull,
  setSmallSideBarFull,
}) {
  const [active, setActive] = useState("");
  const { user } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    setActive(location.pathname.split("/")[1].toLowerCase() || "");
  }, [location]);
  const handleNavigation = (path) => {
    navigate(path);
  };
  const closeSmallScreenSideBar = () => {
    setSmallSideBarFull((prev) => !prev);
  };
  return (
    <div
      className={`${
        !screen650
          ? `side-bar-container ${
              sideBarFull ? "" : "side-bar-container-closed"
            }`
          : `small-side-bar-container ${
              smallSideBarFull ? "small-side-bar-visible" : ""
            }`
      }`}
    >
      <div
        className={`${
          screen650 ? "side-bar-sections-small" : "side-bar-sections"
        }`}
      >
        <div
          className={`sideBar-item ${
            !sideBarFull && !screen650 ? "sideBar-item-closed" : ""
          } ${active === "" ? "side-bar-active" : ""}`}
          onClick={() => {
            handleNavigation("/");
            closeSmallScreenSideBar();
          }}
        >
          <i
            className={`fa-solid fa-house ${
              sideBarFull || screen650 ? "icons" : "side-bar-closed-icons"
            }`}
          ></i>
          <p
            className={`${
              sideBarFull ? "side-bar-text" : "side-bar-small-text"
            } ${screen650 ? "hidden-text" : ""}`}
          >
            Home
          </p>
        </div>

        <div
          className={`sideBar-item ${
            !sideBarFull && !screen650 ? "sideBar-item-closed" : ""
          } ${active === "friends" ? "side-bar-active" : ""}`}
          onClick={() => {
            handleNavigation("/friends");
            closeSmallScreenSideBar();
          }}
        >
            <i
              className={`fa-solid fa-user-group ${
                sideBarFull || screen650 ? "icons" : "side-bar-closed-icons"
              }`}
            ></i>
          <p
            className={`${
              sideBarFull ? "side-bar-text" : "side-bar-small-text"
            } ${screen650 ? "hidden-text" : ""}`}
          >
            Friends
          </p>
          {user.friendRequestsReceived.length!==0?<span className={`side-bar-notifications ${!sideBarFull?"notification-closed":''}`}></span>:''}

        </div>

        <div
          className={`sideBar-item ${
            !sideBarFull && !screen650 ? "sideBar-item-closed" : ""
          } ${active === "media" ? "side-bar-active" : ""}`}
          onClick={() => {
            handleNavigation("/media");
            closeSmallScreenSideBar();
          }}
        >
          <i
            className={`fa-solid fa-images ${
              sideBarFull || screen650 ? "icons" : "side-bar-closed-icons"
            }`}
          ></i>
          <p
            className={`${
              sideBarFull ? "side-bar-text" : "side-bar-small-text"
            } ${screen650 ? "hidden-text" : ""}`}
          >
            Media
          </p>
        </div>

        <div
          className={`sideBar-item ${
            !sideBarFull && !screen650 ? "sideBar-item-closed" : ""
          } ${active === "messages" ? "side-bar-active" : ""}`}
          onClick={() => {
            handleNavigation("/messages");
            closeSmallScreenSideBar();
          }}
        >
          <i
            className={`fa-solid fa-comment ${
              sideBarFull || screen650 ? "icons" : "side-bar-closed-icons"
            }`}
          ></i>
          <p
            className={`${
              sideBarFull ? "side-bar-text" : "side-bar-small-text"
            } ${screen650 ? "hidden-text" : ""}`}
          >
            Messages
          </p>
        </div>

        {user && (
          <div
            className={`sideBar-item ${
              !sideBarFull && !screen650 ? "sideBar-item-closed" : ""
            } ${active === user.username ? "side-bar-active" : ""}`}
            onClick={() => {
              handleNavigation(`/${user.username}`);
              closeSmallScreenSideBar();
            }}
          >
            <i
              className={`fa-solid fa-circle-user ${
                sideBarFull || screen650 ? "icons" : "side-bar-closed-icons"
              }`}
            ></i>
            <p
              className={`${
                sideBarFull ? "side-bar-text" : "side-bar-small-text"
              } ${screen650 ? "hidden-text" : ""}`}
            >
              Profile
            </p>
          </div>
        )}
      </div>

      <div
        className={`sideBar-item ${!sideBarFull ? "sideBar-item-closed" : ""} ${
          screen650 ? "settings-small" : ""
        }`}
        onClick={() => navigate("/settings")}
      >
        <i
          className={`fa-solid fa-gear ${
            sideBarFull ? "icons" : "side-bar-closed-icons"
          }`}
        ></i>
      </div>
    </div>
  );
}

export default SideBar;
