import React, {useState,useEffect} from 'react';
import '../../../styles/Profile.css';
import { Link } from 'react-router-dom';
function ProfileNav({profile, screen650}){
  const [activeTab, setActiveTab] = useState('albums');
  const [profileData, setProfileData] = useState({
    username:''
  });

  useEffect(()=>{
    if(profile){
      setProfileData(profile);
    }
  },[profile])
  return (
    <div className="profile-nav">
      <Link
        to={`/${profileData.username}`}
        className={`nav-item ${activeTab === 'albums' ? 'active' : ''}`}
        onClick={() => setActiveTab('albums')}
      >
        Albums
      </Link>
      <Link
        to={`/${profileData.username}/Photos`}
        className={`nav-item ${activeTab === 'photos' ? 'active' : ''}`}
        onClick={() => setActiveTab('photos')}
      >
        Photos
      </Link>
      {!screen650?<Link 
        to={`/${profileData.username}/Friends`}
        className={`nav-item ${activeTab === 'friends' ? 'active' : ''}`}
        onClick={() => setActiveTab('friends')} 
      >Friends</Link>:""}
        
      
      <Link
        to={`/${profileData.username}/Activity`}
        className={`nav-item ${activeTab === 'activity' ? 'active' : ''}`}
        onClick={() => setActiveTab('activity')}
      >
        Activity
      </Link>
      {!screen650?<Link
        to={`/${profileData.username}/About`}
        className={`nav-item ${activeTab === 'about' ? 'active' : ''}`}
        onClick={() => setActiveTab('about')}
      >
        About
      </Link>:''}
    </div>
  );
};

export default ProfileNav;