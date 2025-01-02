import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../styles/side-bar.css';
import { UserContext } from '../../UserContext';

function SideBar({sideBarFull}) {
  const [active, setActive] = useState(localStorage.getItem('sideBarNav')||'');
  const { user } = useContext(UserContext);
  
  const navigate = useNavigate();

  const handleNavigation = (path, activeItem) => {
    setActive(activeItem);
    localStorage.setItem('sideBarNav', activeItem)
    navigate(path);
  };

  return (
    <div className={`side-bar-container ${sideBarFull?'':'side-bar-container-closed'}`}>
      <div className='side-bar-sections'>
        <div
          className={`sideBar-item ${active === '' ? 'side-bar-active' : ''}`}
          onClick={() => handleNavigation('/', '')}
        >
          <i className={`fa-solid fa-house ${sideBarFull?'icons':'side-bar-closed-icons'}`}></i>
          <p className={sideBarFull?'side-bar-text':'side-bar-small-text'}>Home</p>
        </div>

        <div
          className={`sideBar-item ${active === 'Friends' ? 'side-bar-active' : ''}`}
          onClick={() => handleNavigation('/friends', 'Friends')}
        >
          <i className={`fa-solid fa-user-group ${sideBarFull?'icons':'side-bar-closed-icons'}`}></i>
          <p className={sideBarFull?'side-bar-text':'side-bar-small-text'}>Friends</p>
        </div>

        <div
          className={`sideBar-item ${active === 'Media' ? 'side-bar-active' : ''}`}
          onClick={() => handleNavigation('/media', 'Media')}
        >
          <i className={`fa-solid fa-images ${sideBarFull?'icons':'side-bar-closed-icons'}`}></i>
          <p className={sideBarFull?'side-bar-text':'side-bar-small-text'}>Media</p>
        </div>

        <div
          className={`sideBar-item ${active === 'Messages' ? 'side-bar-active' : ''}`}
          onClick={() => handleNavigation('/messages', 'Messages')}
        >
          <i className={`fa-solid fa-comment ${sideBarFull?'icons':'side-bar-closed-icons'}`}></i>
          <p className={sideBarFull?'side-bar-text':'side-bar-small-text'}>Messages</p>
        </div>

        {user && (
          <div
            className={`sideBar-item ${active === user.username ? 'side-bar-active' : ''}`}
            onClick={() => handleNavigation(`/${user.username}`, user.username)}
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