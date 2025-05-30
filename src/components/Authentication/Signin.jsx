import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/sign-in.css";
import { useContext } from "react";
import { UserContext } from '../Main Page/Contexts/UserContext';
import { AuthContext } from "../Main Page/Contexts/AuthContext";
function Signin() {
  const navigate = useNavigate();
  useEffect(() => {
    document.body.className = "body-signIn";
    return () => {
      document.body.className = "";
    };
  }, []);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [error, setError] = useState(false);
  const {setToken} = useContext(AuthContext);
  const [smallScreen, setSmallScreen] = useState(false);
  useEffect(() => {
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (window.innerWidth <= 740) {
          setSmallScreen(true);
        } else {
          setSmallScreen(false);
        }
      }, 100);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const handlePasswordChange = ({ target }) => {
    setPassword(target.value);
  };
  const handleEyeClick = () => {
    setPasswordVisibility(!passwordVisibility);
  };
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await fetch("http://localhost:3002/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });
      if (response.status === 200) {
        const data = await response.json();
        setUser(data.user);
        setToken(data.accessToken);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
      } else {
        setError(true);
        setPassword("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="sign-in-page">
      <div className="sign-in-container">
        <div className="sign-in-welcome">
          <img className="sign-in-logo" src={smallScreen?'/assets/White Logo.png':'/assets/BOO.png'}></img>
          <img className="sign-in-image" src="/assets/Sign In Image.png"></img>
        </div>
        <div className="sign-in-input">
          <div className="sign-in-header">
            <h1>Welcome!</h1>
            <p>Login to continute</p>
          </div>
          <div className="sign-in-input-body">
            <div className="sign-in-username-input">
              <p className="input-header">Email or Username</p>
              <input
                onChange={({ target }) => {
                  setUsername(target.value);
                }}
                id="usernameInput"
              ></input>
            </div>
            <div className="sign-in-password-container">
              <p className="input-header">Password</p>
              <div className="sign-in-password-input">
                <input
                id="passwordInput"
                  type={passwordVisibility ? "text" : "password"}
                  value={password}
                  className="password-input"
                  onChange={handlePasswordChange}
                ></input>
                <i
                  onClick={handleEyeClick}
                  className={`fa-solid ${
                    passwordVisibility ? "fa-eye" : "fa-eye-slash"
                  } eye`}
                ></i>
              </div>

              <span className="link">Forgot your password?</span>
            </div>
            <div className="sign-in-buttons">
              <div>
                <button onClick={handleSubmit} className="login-button">
                  Login
                </button>
                {error && (
                  <div className="sign-in-error">
                    <i
                      className="fa-solid fa-circle-exclamation"
                      style={{ color: "#ff0000" }}
                    ></i>
                    <p className="sign-in-error-message">
                      Wrong email or password. Try again
                    </p>
                  </div>
                )}
              </div>
              <div className="sign-in-or">
                <span>or</span>
              </div>
              <button onClick={handleSubmit} className="sign-in-google-button">
                <div className="sign-in-google-text">
                <div className="sign-in-google-container">
                  <img
                    className="sign-in-google"
                    src="./assets/googleLogo.png"
                    alt="Google Logo"
                  />
                </div>
                Google
                </div>
              </button>
              <p className="sign-in-register-text" >
                Need an account?<Link to="/Register"><span className="link">&nbsp;Register</span></Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
