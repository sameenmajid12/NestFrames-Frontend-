import FriendsCSS from "../../../styles/friends.module.css";
import Loading from "../Main/Loading";
import { useOutletContext } from "react-router-dom";
function FriendsContent() {
  const { friends } = useOutletContext();
  if (!friends) {
    return <Loading />;
  }
  return (
    <div className={FriendsCSS.friendsContainer}>
      {friends.map((friend, index) => {
        return (
          <div key={index} className={FriendsCSS.friend}>
            <img
              className={FriendsCSS.friendImage}
              src={
                friend.profilePic
                  ? friend.profilePic.fileUrl
                  : "./assets/default-avatar.png"
              }
            ></img>
            <div className={FriendsCSS.friendInfo}>
              <div>
                <h1 className={FriendsCSS.friendName}>{friend.fullname}</h1>
                <h2
                  className={FriendsCSS.friendUser}
                >{`@${friend.username}`}</h2>
              </div>
              <div className={FriendsCSS.friendButtons}>
                <button className={FriendsCSS.messageButton}>Message</button>
                <div className={FriendsCSS.ellipsisContainer}>
                  <i
                    className={`fa-solid fa-ellipsis ${FriendsCSS.ellipsis}`}
                  ></i>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default FriendsContent;
