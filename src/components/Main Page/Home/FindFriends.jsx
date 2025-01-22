import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../UserContext";
import Add from "../Profiles/AddFriend";
import { useNavigate } from "react-router-dom";

function FindFriends({ friends, setFriends }) {
  const { user } = useContext(UserContext);
  const [pendingRemovals, setPendingRemovals] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    pendingRemovals.forEach((username) => {
      const timeout = setTimeout(() => {
        setFriends((prev) => prev.filter((f) => f.username !== username));
        setPendingRemovals((prev) => prev.filter((u) => u !== username)); 
      }, 10000);

      return () => clearTimeout(timeout);
    });
  }, [pendingRemovals, setFriends]);

  const handleRequestCheck = (u) => {
    if (user.friendRequestsSent.some((v) => u.username === v.username)) {
      if (!pendingRemovals.includes(u.username)) {
        setPendingRemovals((prev) => [...prev, u.username]);
      }
      return true;
    }
    return false;
  };

  return (
    <div className="find-friends-container">
      <h1 className="find-friends-header">Find Friends</h1>
      <div className="find-friends-body">
        {friends.length>0?friends.map((friend) => (
          <div key={friend._id} className="find-friend">
            <div onClick={()=>navigate(`/${friend.username}`)} className="find-friend-details">
              <img
                className="find-friend-image"
                src={friend.profilePic.fileUrl}
                alt={`${friend.fullname}'s profile`}
              />
              <div className="find-friend-name">
                <h3>{friend.fullname}</h3>
                <p>{friend.username}</p>
              </div>
            </div>
            {handleRequestCheck(friend) ? (
              <button className="find-friend-requested"><i className="fa-solid fa-check"></i></button>
            ) : (
              <Add stylingClass={"find-friend-add"} receiverUsername={friend.username}/>
            )}
          </div>
        )):<div className="find-friend-empty">No friend suggestions at the moment. Check back later! 📦 </div>}
      </div>
    </div>
  );
}

export default FindFriends;
