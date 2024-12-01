import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../styles/side-bar.css';
import { UserContext } from '../../UserContext';

function SideBar({sideBarFull}) {
  const [active, setActive] = useState('');
  const { user } = useContext(UserContext);
  
  const navigate = useNavigate();

  const handleNavigation = (path, activeItem) => {
    setActive(activeItem);
    navigate(path);
  };

  return (
    <div className='side-bar-container'>
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
          className={`sideBar-item ${active === 'Photos' ? 'side-bar-active' : ''}`}
          onClick={() => handleNavigation('/photos', 'Photos')}
        >
          <i className={`fa-solid fa-camera ${sideBarFull?'icons':'side-bar-closed-icons'}`}></i>
          <p className={sideBarFull?'side-bar-text':'side-bar-small-text'}>Photos</p>
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
            className={`sideBar-item ${active === 'Profile' ? 'side-bar-active' : ''}`}
            onClick={() => handleNavigation(`/${user.username}`, 'Profile')}
          >
            <i className={`fa-solid fa-circle-user ${sideBarFull?'icons':'side-bar-closed-icons'}`}></i>
            <p className={sideBarFull?'side-bar-text':'side-bar-small-text'}>Profile</p>
            </div>
        )}
      </div>

      <div
        className='sideBar-item'
        onClick={() => handleNavigation('/settings', 'Settings')}
      >
        <i className={`fa-solid fa-gear ${sideBarFull?'icons':'side-bar-closed-icons'}`}></i>
      </div>
    </div>
  );
}

export default SideBar;