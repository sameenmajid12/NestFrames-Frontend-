import MessagesCSS from "../../../styles/messages.module.css";

function AddFriendToMessageList({
  friends,
  setIsFriendListVisible,
  addToMessages,
}) {
  return (
    <div id="friendListContainer" className={MessagesCSS.friendListContainer}>
      <div className={MessagesCSS.friendList}>
        <div className={MessagesCSS.friendListHead}>
          <h1>Send message to..</h1>
          <i
            onClick={() => setIsFriendListVisible(false)}
            className={`fa-solid fa-xmark fa-xl ${MessagesCSS.xmark}`}
          ></i>
        </div>
        <div className={MessagesCSS.list}>
          {friends.map((friend, index) => (
            <div
              key={index}
              onClick={addToMessages}
              data-username={friend.username}
              className={MessagesCSS.friend}
            >
              {`${friend.fullname}`}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AddFriendToMessageList;
