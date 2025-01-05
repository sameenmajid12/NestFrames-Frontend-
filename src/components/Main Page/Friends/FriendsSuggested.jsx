import { useContext, useEffect, useMemo, useState } from "react";
import FriendsCSS from "../../../styles/friends.module.css";
import { UserContext } from "../../UserContext";
import { useOutletContext } from "react-router-dom";

function FriendsSuggested() {
  const { user, setUser } = useContext(UserContext);
  const { token } = useOutletContext();
  const [suggested, setSuggested] = useState([]);
  useEffect(() => {
    const getSuggested = async () => {
      const response = await fetch(
        `http://localhost:3002/users/${user._id}/suggested-friends`,
        {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (data) {
        setSuggested(data);
      }
    };
    getSuggested();
  }, [user._id]);

  const add = async (friend) => {
    const response = await fetch(
      `http://localhost:3002/users/${friend.username}/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          senderId: user._id,
          receiverUsername: friend.username,
        }),
      }
    );
    const data = await response.json();
    setUser((prev) => ({
      ...prev,
      friendRequestsSent: [...prev.friendRequestsSent, data.receiver],
    }));
  };
  const ignore = (friend) => {
    setSuggested((prev) =>
      prev.filter((prevSuggested) => prevSuggested.user._id !== friend._id)
    );
  };
  const added = useMemo(() => {
    const addedUsernames = new Set(
      user.friendRequestsSent.map((friend) => friend.username)
    );
    return suggested.map((suggestedFriend) => ({
      ...suggestedFriend,
      isAdded: addedUsernames.has(suggestedFriend.user.username),
    }));
  }, [suggested, user.friendRequestsSent]);

  return (
    <div className={FriendsCSS.requestContainer}>
      {added.length === 0 ? (
        <div>No Suggested</div>
      ) : (
        added.map((suggestedFriend, index) => (
          <div key={index} className={FriendsCSS.request}>
            <div className={FriendsCSS.requestUserInfo}>
              <img
                className={FriendsCSS.requestUserImage}
                src={
                  suggestedFriend.user.profilePic
                    ? suggestedFriend.user.profilePic.fileUrl
                    : "/assets/default-avatar.png"
                }
                alt="user-avatar"
              />
              <div>
                <h2 className={FriendsCSS.name}>
                  {suggestedFriend.user.fullname}
                </h2>
                <p className={FriendsCSS.username}>
                  @{suggestedFriend.user.username}
                </p>
                <p className={FriendsCSS.mutualFriends}>
                  {suggestedFriend.mutualFriends} Mutual Friends
                </p>
              </div>
            </div>
            <div className={FriendsCSS.requestButtons}>
              <button
                onClick={() => ignore(suggestedFriend.user)}
                className={FriendsCSS.ignoreButton}
              >
                Ignore
              </button>
              <button
                onClick={() => add(suggestedFriend.user)}
                className={FriendsCSS.acceptButton}
                disabled={suggestedFriend.isAdded}
              >
                {suggestedFriend.isAdded ? "Added" : "Add"}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default FriendsSuggested;
