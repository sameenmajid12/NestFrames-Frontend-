import { useContext, useState, useEffect, useMemo } from "react";
import { UserContext } from "../Contexts/UserContext";
import Add from "./AddFriend.jsx";
import AddPfp from "./AddPfp.jsx";
import ProfileMenu from "../Utils/ProfileMenu.jsx";

function ProfileInfo({ profile, setProfile, screen650 }) {
  const { user } = useContext(UserContext);
  const [addPfpVisibility, setAddPfpVisibility] = useState(false);
  const [menuVisibility, setMenuVisibility] = useState(false);
  const toggleMenuVisibility = ()=>{
    setMenuVisibility(prev=>!prev);
  }
  const isUser = useMemo(
    () => profile.username === user.username,
    [profile.username, user.username]
  );
  const isFriend = useMemo(
    () => user.friends.some((friend) => friend.username === profile.username),
    [user.friends, profile.username]
  );
  const isPending = useMemo(
    () =>
      user.friendRequestsSent.some(
        (request) => request.username === profile.username
      ),
    [user.friendRequestsSent, profile.username]
  );
  const isIncoming = useMemo(
    () =>
      user.friendRequestsReceived.some(
        (request) => request.username === profile.username
      ),
    [user.friendRequestsReceived, profile.username]
  );
  return (
    <>
      {addPfpVisibility && (
        <AddPfp setProfile={setProfile} setVisibility={setAddPfpVisibility} />
      )}
      <div className="profile-info-container">
        <img
          onClick={() => {
            isUser ? setAddPfpVisibility(true) : "";
          }}
          className="profile-image"
          src={
            profile.profilePic
              ? profile.profilePic.fileUrl
              : "/assets/default-avatar.png"
          }
          alt="Profile"
        />

        <div className="profile-info">
          <div className="profile-name">
            <div className="profile-header">
              <h1>{isUser ? user.fullname : profile.fullname}</h1>
              <div className="profile-buttons">
                {isUser ? (
                  <>
                    <button className="profile-button">
                      {screen650 ? "Edit" : "Edit Profile"}
                    </button>
                    <button className="profile-button">
                      {screen650 ? "Create" : "Create Post"}
                    </button>
                  </>
                ) : (
                  <>
                    <button className="profile-button">Message</button>
                    {isFriend ? (
                      <button className="profile-button">
                        Friend
                        <i
                          className={
                            "fa-solid fa-chevron-down sort-button-arrowDown"
                          }
                          style={{ color: "white" }}
                        ></i>
                      </button>
                    ) : isPending ? (
                      <button className="profile-button">Requested</button>
                    ) : isIncoming ? (
                      <button className="profile-button">Accept</button>
                    ) : (
                      <Add
                        stylingClass={"profile-button"}
                        receiverUsername={profile.username}
                      />
                    )}
                  </>
                )}
                <div className="profile-ellipsis-container">
                  <i onClick={toggleMenuVisibility} className="fa-solid fa-ellipsis profile-ellipsis"></i>
                  {menuVisibility && <ProfileMenu toggleVisibility={toggleMenuVisibility}/>}
                </div>
              </div>
            </div>
            <p className="profile-username">@{profile.username}</p>
          </div>
          <div className="profile-about">
            <p>Long Island | RU'27</p>
          </div>
          <div className="profile-stats">
            <p>{profile.albums.length} Albums</p>
            <p>{profile.friends.length} Friends</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileInfo;
