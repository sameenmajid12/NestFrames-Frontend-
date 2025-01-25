import { Link, Outlet, useNavigate } from "react-router-dom";
import "../../styles/settings.css";
import { useContext, useEffect } from "react";
import { UserContext } from "../Main Page/Contexts/UserContext";
import { useState } from "react";
function Settings() {
  useEffect(() => {
    document.body.className = "body-settings";
    return () => {
      document.body.className = "";
    };
  }, []);
  const { setUser } = useContext(UserContext);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(`/${localStorage.getItem('sideBarNav')||''}`);
  };
  const logOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/Sign-in");
  };

  return (
    <div className="settings-page-container">
      <div className="settings-header-container">
        <div className="settings-header">Settings</div>
        <div className="settings-close">
          <i onClick={goBack} className="fa-solid fa-multiply"></i>
        </div>
      </div>
      <div className="settings-body">
        <div className="settings-side-bar-container">
          <div className="settings-selector">
            <span
              className="settings-selector-line"
              style={{ top: `${index * 54}px` }}
            ></span>
          </div>
          <div className="settings-side-bar">
            <Link to="">
              <div
                onClick={() => {
                  setIndex(0);
                  setBackNav(prev => prev+1);
                }}
                className="settings-side-bar-item"
              >
                <i className="fa-solid fa-user-pen"></i>
                <p>Profile</p>
              </div>
            </Link>
            <Link to="albums">
              <div
                onClick={() => {
                  setIndex(1);
                  setBackNav(prev => prev+1);
                  console.log(backNav);

                }}
                className="settings-side-bar-item"
              >
                <i className="fa-solid fa-images"></i>
                <p>Albums</p>
              </div>
            </Link>
            <Link to="notifications">
              <div
                onClick={() => {
                  setIndex(2);
                  setBackNav(prev => prev+1);
                  console.log(backNav);

                }}
                className="settings-side-bar-item"
              >
                <i className="fa-solid fa-bell"></i>
                <p>Notification</p>
              </div>
            </Link>
            <Link to="security">
              <div
                onClick={() => {
                  setIndex(3);
                  setBackNav(prev => prev+1);
                  console.log(backNav);

                }}
                className="settings-side-bar-item"
              >
                <i className="fa-solid fa-shield-halved"></i>
                <p>Security</p>
              </div>
            </Link>
            <Link to="help">
              <div
                onClick={() => {
                  setIndex(4);
                  setBackNav(prev => prev+1);
                  console.log(backNav);

                }}
                className="settings-side-bar-item"
              >
                <i className="fa-solid fa-circle-question"></i>
                <p>Help</p>
              </div>
            </Link>
          </div>
        </div>
        <div className="settings-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Settings;
