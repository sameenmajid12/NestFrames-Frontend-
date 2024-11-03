import { useContext, useState, useEffect, useMemo } from "react";
import { UserContext } from "../../UserContext";
import Add from "./Add";
import Create from '../Main/Create.jsx';
import AddPfp from "./AddPfp.jsx";

function ProfileInfo({ profile }) {
  const { user } = useContext(UserContext);
  const [profileData, setProfileData] = useState({
    fullname: "",
    username: "",
    friends: ""
  });
  const [addPfpVisibility, setAddPfpVisibility] = useState(false);

  useEffect(() => {
    if (profile) {
      setProfileData(profile);
    }
  }, [profile]);

  const isUser = useMemo(() => profileData.username === user.username, [profileData.username, user.username]);
  const isFriend = useMemo(() => user.friends.some(friend => friend.username === profileData.username), [user.friends, profileData.username]);
  const isPending = useMemo(() => user.friendRequestsReceived.some(request => request.username === profileData.username), [user.friendRequestsReceived, profileData.username]);

  return (
    <>
    {addPfpVisibility && <AddPfp setVisibility={setAddPfpVisibility}/>}
    <div className="profile-info-container">
      {profile.profilePic ? (
        <img onClick={()=> setAddPfpVisibility(true)} className="profile-images" src={profile.profilePic.fileUrl} alt="Profile" />
      ) : (
        <div onClick={() => setAddPfpVisibility(true)}>
          <img className="profile-images" src="./assets/default-avatar.png" alt="Default Avatar" />
        </div>
      )}
      <div className="profile-info">
        <div className="profile-name">
          <div className="profile-header">
            <h1>{isUser ? user.fullname : profileData.fullname}</h1>
            <div className="profile-buttons">
              {isUser ? (
                <>
                  <button className="profile-button">Edit Profile</button>
                  <button className="profile-button">Create Post</button>
                </>
              ) : (
                <>
                  <button className="profile-button">Message</button>
                  {isFriend ? (
                    <button className="profile-button">Friend<i className={"fa-solid fa-chevron-down sort-button-arrowDown"} style={{ color: 'white' }}></i></button>
                  ) : isPending ? (
                    <button className="profile-button">Requested</button>
                  ) : (
                    <Add />
                  )}
                </>
              )}
              <button className="profile-button options-button">
                <i className="fa-solid fa-ellipsis-vertical fa-xl" style={{ color: '#333' }}></i>
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
    </>
  );
}

export default ProfileInfo;