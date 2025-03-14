import { useContext } from "react";
import FriendsCSS from "../../../styles/friends.module.css";
import Loading from "../Utils/Loading";
import { useNavigate, useOutletContext } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";
import { AuthContext } from "../Contexts/AuthContext";
function FriendsContent({ friendProp }) {
  const { user, setUser } = useContext(UserContext);
  const { token } = useContext(AuthContext);
  const {friends: contextFriends } = useOutletContext() || {};
  const {searchRef} = useOutletContext();
  let friends = contextFriends || friendProp;
  const navigate = useNavigate();
  if (!friends) {
    return <Loading />;
  }
  const message = async (friend) => {
    const response = await fetch(
      `http://localhost:3002/messages/${user._id}/message/${friend._id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to retrieve or create conversation");
    }
    const { newConversation, conversation, message } = await response.json();
    if (newConversation) {
      const updatedConversations = [...user.conversations, newConversation];
      setUser((prev) => {
        console.log(prev);
        return { ...prev, conversations: updatedConversations };
      });
      navigate(`/messages/${newConversation._id}`);
      return;
    }
    navigate(`/Messages/${conversation._id}`);
  };
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
                  onClick={() => message(friend)}
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
