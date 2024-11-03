import React, { useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import '../../../styles/Header.css';

function ImageDropDown({ visible, setVisible, toggleCreateContainer }) {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const dropDownRef = useRef(null);

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setVisible]);

  if (!visible) return null;

  return (
    <div ref={dropDownRef} className="image-drop-down-container">
      <div className="drop-down-profile">
        <div className="drop-down-profile-info">
          <img src="./assets/me.jpg" alt="Profile" />
          <div>
            <h2>{user.fullname}</h2>
            <p>{`@${user.username}`}</p>
          </div>
        </div>
        <i
          onClick={() => {
            setUser(null);
            navigate('/Sign-in');
          }}
          className="fa-solid fa-arrow-right-from-bracket fa-xl logout-icon"
        ></i>
      </div>
      <div className="drop-down-setting">
        <div onClick={() => {
          setVisible(false);
          toggleCreateContainer();
        }} className="drop-down-setting-section">
          <i className="fa-solid fa-circle-plus"></i>
          <p>Create</p>
        </div>
        <div onClick={() => {
          navigate(`/${user.username}`);
          setVisible(false);
        }} className="drop-down-setting-section">
          <i className="fa-solid fa-user"></i>
          <p>Profile</p>
        </div>
        <div className="drop-down-setting-section">
          <i className="fa-solid fa-circle-question"></i>
          <p>Help</p>
        </div>
        <div onClick={() => navigate('/Settings')} className="drop-down-setting-section">
          <i className="fa-solid fa-gears"></i>
          <p>Settings</p>
        </div>
      </div>
    </div>
  );
}

export default ImageDropDown;