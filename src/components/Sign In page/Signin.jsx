import React, { createContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/sign-in.css";
import { useContext } from "react";
import { UserContext } from "../UserContext";
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
  const {user,setUser} = useContext(UserContext)
  const [passwordVisibility,setPasswordVisibility] = useState(false);
  const home = "Home";
  const handlePasswordChange = ({ target }) => {
    setPassword(target.value);
  };
  const handleEyeClick=()=>{
    setPasswordVisibility(!passwordVisibility)
  }
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await fetch("http://localhost:3002/Sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.status === 200) {
        const json = await response.json();
        setUser(json);
        localStorage.setItem('user', JSON.stringify(json));
        navigate("/");
      } else {
         document.querySelector('.sign-in-error').style.display = 'block';
         setPassword('');
        throw new Error("Wrong password");
       
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="sign-in-page">
      <div className="sign-in-container">
        <div className="sign-in-welcome">
          <h1>Sign in</h1>
          <div>
            <p>Need an account?</p>
            <Link to="/Register">
              <span className="link">Register</span>
            </Link>
          </div>
        </div>
        <div className="sign-in-input">
          <div className="sign-in-username-input">
            <p className="input-header">Email or Username</p>
            <input
              onChange={({ target }) => {
                setUsername(target.value);
              }}
            ></input>
          </div>
          <div className="sign-in-password-container">
            <p>Password</p>
            <div className="sign-in-password-input">
              <input
              type={passwordVisibility?'text':'password'}
              value={password}
                className="password-input"
                onChange={handlePasswordChange}
              ></input>
              <i onClick={handleEyeClick}
              className={`fa-solid ${passwordVisibility?'fa-eye':'fa-eye-slash'} eye`}></i>
              
            </div>
            <div className="sign-in-error">
              <i className="fa-solid fa-circle-exclamation" style={{color: "#ff0000"}}></i>
              <p className="sign-in-error-message">Wrong email or password. Try again</p>
            </div>
            
            <span className="link">Forgot your password?</span>

          </div>
          <div>
            <Link to="/">
              <button onClick={handleSubmit} className="login-button">
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
