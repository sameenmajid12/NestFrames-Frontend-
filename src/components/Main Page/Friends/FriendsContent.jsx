import FriendsCSS from "../../../styles/friends.module.css";
import Loading from "../Utils/Loading";
import useFriendsActions from "../../../hooks/useFriendsActions";
import { useOutletContext } from "react-router-dom";
function FriendsContent({ friendProp }) {
  const {messageFriend} = useFriendsActions();
  const {friends: contextFriends } = useOutletContext() || {};
  const {searchRef} = useOutletContext();
  let friends = contextFriends || friendProp;
  if (!friends) {
    return <Loading />;
  }
 
  const focusSearch=()=>{
    if(searchRef.current){
      searchRef.current.focus();
    }
  }
  return friends.length > 0 ? (
    <div className={FriendsCSS.friendsContainer}>
      {friends.map((friend, index) => {
        return (
          <div key={index} className={FriendsCSS.friend}>
            <img
              className={FriendsCSS.friendImage}
              src={
                friend.profilePic
                  ? friend.profilePic.fileUrl
                  : "/assets/default-avatar.png"
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
                <button
                  onClick={() => messageFriend(friend._id)}
                  className={FriendsCSS.messageButton}
                >
                  {friendProp ? "Add" : "Message"}
                </button>
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
  ) : (
    <div className={FriendsCSS.friendsEmptyState}>
      <div className={FriendsCSS.friendsEmptyStateBody}>
        <img src="/assets/FriendEmpty.png"></img>
        <div className={FriendsCSS.friendsEmptyStateText}>
          <h2>No Friends Yet</h2>
          <p>
            Start connecting by sending friend requests and sharing the fun.
          </p>
        </div>

        <button onClick={focusSearch}>Search for friends</button>
      </div>
    </div>
  );
}
export default FriendsContent;
