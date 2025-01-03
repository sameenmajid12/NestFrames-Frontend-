import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../../styles/side-bar.css';
import { UserContext } from '../../UserContext';

function SideBar({sideBarFull}) {
  const [active, setActive] = useState(localStorage.getItem('sideBarNav')||'');
  const { user } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(()=>{
      setActive(location.pathname.split("/")[1].toLowerCase() || "");
      console.log(location.pathname.split("/")[1]);
  },[location])
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className={`side-bar-container ${sideBarFull?'':'side-bar-container-closed'}`}>
      <div className='side-bar-sections'>
        <div
          className={`sideBar-item ${active === '' ? 'side-bar-active' : ''}`}
          onClick={() => handleNavigation('/')}
        >
          <i className={`fa-solid fa-house ${sideBarFull?'icons':'side-bar-closed-icons'}`}></i>
          <p className={sideBarFull?'side-bar-text':'side-bar-small-text'}>Home</p>
        </div>

        <div
          className={`sideBar-item ${active === 'friends' ? 'side-bar-active' : ''}`}
          onClick={() => handleNavigation('/friends')}
        >
          <i className={`fa-solid fa-user-group ${sideBarFull?'icons':'side-bar-closed-icons'}`}></i>
          <p className={sideBarFull?'side-bar-text':'side-bar-small-text'}>Friends</p>
        </div>

        <div
          className={`sideBar-item ${active === 'media' ? 'side-bar-active' : ''}`}
          onClick={() => handleNavigation('/media')}
        >
          <i className={`fa-solid fa-images ${sideBarFull?'icons':'side-bar-closed-icons'}`}></i>
          <p className={sideBarFull?'side-bar-text':'side-bar-small-text'}>Media</p>
        </div>

        <div
          className={`sideBar-item ${active === 'messages' ? 'side-bar-active' : ''}`}
          onClick={() => handleNavigation('/messages')}
        >
          <i className={`fa-solid fa-comment ${sideBarFull?'icons':'side-bar-closed-icons'}`}></i>
          <p className={sideBarFull?'side-bar-text':'side-bar-small-text'}>Messages</p>
        </div>

        {user && (
          <div
            className={`sideBar-item ${active === user.username ? 'side-bar-active' : ''}`}
            onClick={() => handleNavigation(`/${user.username}`)}
          >
            <i className={`fa-solid fa-circle-user ${sideBarFull?'icons':'side-bar-closed-icons'}`}></i>
            <p className={sideBarFull?'side-bar-text':'side-bar-small-text'}>Profile</p>
            </div>
        )}
      </div>

      <div
        className='sideBar-item'
        onClick={() => navigate('/settings')}
      >
        <i className={`fa-solid fa-gear ${sideBarFull?'icons':'side-bar-closed-icons'}`}></i>
      </div>
    </div>
  );
}

export default SideBar;