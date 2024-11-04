import FriendsContent from "../../Friends/FriendsContent";
import { UserContext } from "../../../UserContext";
import { useContext } from "react";
import { Link, useOutletContext } from "react-router-dom";
function ProfileFriends() {
  const {user} = useContext(UserContext);
  const {profile} = useOutletContext();
  const friends = profile.friends;
  const checkUser = () =>{
    return (user.username===profile.username);
  }
  const isUser = checkUser();
  const checkFriend = (friend) => {
    return (user.friends.find(userFriend => userFriend.username===friend.username))
  }

  return (
    <div className="profile-friends-container">
      {friends.map((friend, index) => {
        return (
          <div className="profile-friend" key={index}>
            <div className="profile-friend-image">
              <img
                className="profile-friend-imageSrc"
                src={friend.profilePic?friend.profilePic.fileUrl:'./assets/default-avatar.png'}
              />
              <div className="profile-friend-slideContainer">
                
                <div className="profile-friend-icons">
                  <i className={`fa-solid fa-user-${isUser?'check':checkFriend(friend)?'check':'plus'}`}></i>
                </div>
                <div className="profile-friend-icons">
                  <Link to={`/${friend.username}`}  style={{ textDecoration: 'none', color: 'inherit' }}>
                  <i className="fa-solid fa-circle-user"></i>
                  </Link>
                </div>
                <div className="profile-friend-icons">
                  <i className="fa-solid fa-comment"></i>
                </div>
              </div>
            </div>
            <div className="profile-friend-name">{friend.fullname}</div>
          </div>
        );
      })}
    </div>
  );
}

export default ProfileFriends;
