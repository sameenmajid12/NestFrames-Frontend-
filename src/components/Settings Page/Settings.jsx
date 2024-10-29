import { Link, useNavigate } from "react-router-dom";
import '../../styles/settings.css'
import { useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
function Settings(){
  useEffect(()=>{
    document.body.className = 'body-settings';
    return ()=>{
      document.body.className = '';
    }
  },[])
  const {setUser} = useContext(UserContext);
  const navigate = useNavigate();
  const logOut = () =>{
    localStorage.removeItem('user');
    setUser(null);
    navigate('/Sign-in');
  }

  return(
    <div className="settings-page-container">
      <div className=" settings-container settings-header">
      <i className="fa-solid fa-gear fa-3x" style={{color:'#114085'}}></i>
        <h1 className="main-header">Settings</h1>
        <Link to="/">
        <i class="fa-solid fa-xmark fa-3x" style={{color:'#114085'}}></i>
        </Link>
      </div>
      <div className=" settings-container settings-body-containers">
        <h1 className="settings-section-headers">Account Settings</h1>
        <div className="settings-options">
          <p>Name</p>
          <p>Username</p>
          <p>Email</p>
          <p>Password</p>
        </div>
      </div>
      <div className=" settings-container settings-body-containers">
        <h1 className="settings-section-headers">Privacy Settings</h1>
        <div className="settings-options">
          <p>Account Privacy</p>
          <p>Blocked Accounts</p>
        </div>
      </div>
      <div className=" settings-container settings-body-containers">
        <h1 className="settings-section-headers">More</h1>
        <div className="settings-options">
          <p>Help</p>
          <p>Terms and Services</p>
          <p className="delete-account">Delete Account</p>
        </div>
      </div>
      <h1 onClick={logOut} className="logout-button">Logout</h1>
      
    </div>
  )
}

export default Settings;