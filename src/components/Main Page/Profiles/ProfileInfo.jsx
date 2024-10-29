import { useContext, useState,useEffect } from "react";
import { UserContext } from "../../UserContext";
import Add from "./Add";
import Create from '../Main/Create.jsx'
function ProfileInfo({ profile }) {
  const { user } = useContext(UserContext);
  const [profileData, setProfileData] = useState({
    fullname:"",
    username: "",
    friends:''
  });
  const isUser = compareToUser();
  const isFriend = checkFriend();
  const isPending = checkPending();
  const [profileStatus, setProfileStatus] = useState()
  useEffect(()=>{
    if(profile){
      setProfileData(profile);
    }
  },[profile])
  function compareToUser() {
    if (profileData.username === user.username) {
      return true;
    } else {
      return false;
    }
  }

  function checkFriend(){
    let isFriend = false;
      
    user.friends.forEach((friend)=>{ 
      if(friend.username === profileData.username)
      {
        isFriend = true;
      }
    })
    return isFriend;
  }
  function checkPending(){
    let isPending = false;

    user.friendRequestsReceived.forEach((request)=>{
      if(request.username===profileData.username){
        isPending = true;
      }
    })
    return isPending;
  }

  return (
    <div className="profile-info-container">
      <img className="profile-images" src="./assets/me.jpg"></img>
      <div className="profile-info">
        <div className="profile-name">
          <div className="profile-header">
            <h1>{isUser?user.fullname:profileData.fullname}</h1>
            <div className="profile-buttons">
              {isUser ? (
                <>
                  <button className="profile-button">Edit Profile</button>
                  <button onClick={()=>{
                  document.querySelector('.create-container-page').style.visibility='visible';
                  document.body.style.overflowY = 'hidden'

                }} className="profile-button">Create Post</button>
                  <Create/>
                </>
              ) : (
                <>
                  <button className="profile-button">Message</button>
                  {isFriend?<button className="profile-button">Friend<i className={"fa-solid fa-chevron-down sort-button-arrowDown"} style={{color:'white'}} ></i></button>:isPending?<button className="profile-button">Requested</button>:<Add/>}
                </>
              )}
              <button className="profile-button options-button">
                    <i className="fa-solid fa-ellipsis-vertical fa-xl" style={{color:'#333'}}></i>
                  </button>
            </div>
          </div>

          <p>@{profileData.username}</p>
        </div>

        <div className="profile-about">
          <p>Long Island | RU'27</p>
        </div>
        <div className="profile-stats">
          <p>16 Albums</p>
          <p>{profileData.friends.length} Friends</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;
