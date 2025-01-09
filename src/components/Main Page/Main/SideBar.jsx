import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../../styles/side-bar.css";
import { UserContext } from "../../UserContext";

function SideBar({ sideBarFull, screen650,  smallSideBarFull}) {
  console.log(sideBarFull);
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
  return (
    <div
      className={`${!screen650?`side-bar-container ${sideBarFull ? "" : "side-bar-container-closed"}`:`small-side-bar-container ${smallSideBarFull?'small-side-bar-visible':''}`}`}
    >
      <div className="side-bar-sections">
        <div
          className={`sideBar-item ${!sideBarFull&&!screen650?"sideBar-item-closed":""} ${active === "" ? "side-bar-active" : ""}`}
          onClick={() => handleNavigation("/")}
        >
          <i
            className={`fa-solid fa-house ${
              sideBarFull || screen650 ? "icons" : "side-bar-closed-icons"
            }`}
          ></i>
          <p className={sideBarFull || screen650 ? "side-bar-text" : "side-bar-small-text"}>
            Home
          </p>
        </div>

        <div
          className={`sideBar-item ${!sideBarFull&&!screen650?"sideBar-item-closed":""} ${
            active === "friends" ? "side-bar-active" : ""
          }`}
          onClick={() => handleNavigation("/friends")}
        >
          <i
            className={`fa-solid fa-user-group ${
              sideBarFull || screen650? "icons" : "side-bar-closed-icons"
            }`}
          ></i>
          <p className={sideBarFull || screen650 ? "side-bar-text" : "side-bar-small-text"}>
            Friends
          </p>
        </div>

        <div
          className={`sideBar-item ${!sideBarFull&&!screen650?"sideBar-item-closed":""} ${
            active === "media" ? "side-bar-active" : ""
          }`}
          onClick={() => handleNavigation("/media")}
        >
          <i
            className={`fa-solid fa-images ${
              sideBarFull || screen650  ? "icons" : "side-bar-closed-icons"
            }`}
          ></i>
          <p className={sideBarFull|| screen650  ? "side-bar-text" : "side-bar-small-text"}>
            Media
          </p>
        </div>

        <div
          className={`sideBar-item ${!sideBarFull&&!screen650?"sideBar-item-closed":""} ${
            active === "messages" ? "side-bar-active" : ""
          }`}
          onClick={() => handleNavigation("/messages")}
        >
          <i
            className={`fa-solid fa-comment ${
              sideBarFull || screen650 ? "icons" : "side-bar-closed-icons"
            }`}
          ></i>
          <p className={sideBarFull || screen650  ? "side-bar-text" : "side-bar-small-text"}>
            Messages
          </p>
        </div>

        {user && (
          <div
            className={`sideBar-item ${!sideBarFull&&!screen650?"sideBar-item-closed":""} ${
              active === user.username ? "side-bar-active" : ""
            }`}
            onClick={() => handleNavigation(`/${user.username}`)}
          >
            <i
              className={`fa-solid fa-circle-user ${
                sideBarFull || screen650 ? "icons" : "side-bar-closed-icons"
              }`}
            ></i>
            <p
              className={sideBarFull|| screen650  ? "side-bar-text" : "side-bar-small-text"}
            >
              Profile
            </p>
          </div>
        )}
      </div>

      <div className={`sideBar-item ${!sideBarFull&&!screen650?"sideBar-item-closed":""}`} onClick={() => navigate("/settings")}>
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
