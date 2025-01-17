function FindFriends({ friends }) {
  console.log(friends);
  return (
    <div className="find-friends-container">
      <h1 className="find-friends-header">Find Friends</h1>
      <div className="find-friends-body">
        {friends.map((friend) => {
          return(
          <div key={friend._id} className="find-friend">
            <div className="find-friend-details">
              <img
                className="find-friend-image"
                src={friend.profilePic.fileUrl}
              ></img>
              <div className="find-friend-name">
                <h3>{friend.fullname}</h3>
                <p>{friend.username}</p>
              </div>
            </div>
            <button className="find-friend-add">Add</button>
          </div>);
        })}
      </div>
    </div>
  );
}

export default FindFriends;
