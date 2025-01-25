import { UserContext } from "../Contexts/UserContext";
import "../../../styles/list.css";
import { useContext, useEffect, useState } from "react";

function SelectorList({ toggleVisibility, onConfirm }) {
  const { user } = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [friendList, setFriendList] = useState(user ? user.friends : []);
  const [selected, setSelected] = useState([]);

  const searchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSelected = (friend) => {
    const isAlreadySelected = selected.some(
      (user) => user.username === friend.username
    );

    if (!isAlreadySelected) {
      setSelected((prev) => [...prev, friend]);
      setSearch("");
    } else {
      setSelected((prev) =>
        prev.filter((user) => user.username !== friend.username)
      );
    }
  };

  const checkClicked = (username) => {
    return (
      selected &&
      Array.isArray(selected) &&
      selected.some((user) => user.username === username)
    );
  };

  useEffect(() => {
    const searchFriend = () => {
      if (search.trim().length > 0) {
        const regex = new RegExp(search, "i");
        const filteredFriends = user.friends.filter(
          (friend) => regex.test(friend.fullname) || regex.test(friend.username)
        );
        setFriendList(filteredFriends);
      } else {
        setFriendList(user.friends);
      }
    };
    const timeoutId = setTimeout(searchFriend, 150);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [search]);
  const handleConfirm = ()=>{
    onConfirm(selected);
  }
  return (
    <div className="list-page">
      <div className="friend-selector-container">
        <div className="friend-selector-header">Select friends</div>
        <div className="friend-selector-body">
          <div className="friend-selector-body-top">
            <input
              id="friendSelectorInput"
              placeholder="Search"
              onChange={searchChange}
              value={search}
            />
            <div className="friend-selector-list">
              {friendList.map((friend, index) => (
                <div
                  onClick={() => handleSelected(friend)}
                  key={index}
                  className="friend-selector-friend"
                >
                  <img
                    src={friend?friend.profilePic?friend.profilePic.fileUrl:'/assets/default-avatar.png':''}
                    className="friend-selector-image"
                  />
                  <div className="friend-selector-name">
                    <h3>{friend.fullname}</h3>
                    <p>@{friend.username}</p>
                  </div>
                  {checkClicked(friend.username) && (
                    <i className="fa-solid fa-circle-check friend-selector-check"></i>
                  )}
                </div>
              ))}
            </div>
          </div>
          {onConfirm?<div className="friend-selector-buttons">
            <button
              onClick={toggleVisibility}
              className="friend-selector-cancel"
            >
              Cancel
            </button>
            <button onClick={handleConfirm} className="friend-selector-confirm">
              Confirm
            </button>
          </div>:''}
        </div>
      </div>
    </div>
  );
}

export default SelectorList;
