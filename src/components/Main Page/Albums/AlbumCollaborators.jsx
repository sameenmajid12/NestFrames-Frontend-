import "../../../styles/albums.css";
import FriendList from "../Main/FriendsList";
import { useState } from "react";
function AlbumCollaborators({ album, albumId, setAlbum }) {

  const [friendListVisibility, setFriendListVisibility] = useState(false);
  const toggleVisibility = () => {
    setFriendListVisibility((prev) => !prev);
  };
  const addCollaborator = async (users) => {
    let userIds = [];
    users.forEach((user) => {
      userIds.push(user._id);
    });
    const response = await fetch(
      `http://localhost:3002/albums/${albumId}/collaborators`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userIds: userIds }),
      }
    );
    const newUsers = await response.json();
    setAlbum((prev) => ({ ...prev, users: [...prev.users, ...newUsers.users] }));
  };
  return (
    <>
      {friendListVisibility && (
        <FriendList
          toggleVisibility={toggleVisibility}
          onConfirm={addCollaborator}
        />
      )}
      <div className="album-collaborator-container">
        <h2>Collaborators</h2>
        <div className="album-collaborators-body">
          <div className="album-collaborators">
            {album.users.map((user, index) => {
              return (
                <div key={index} className="album-collaborator">
                  <img
                    className="album-collaborator-image"
                    src={user?user.profilePic?user.profilePic.fileUrl:'/assets/default-avatar.png':''}
                  ></img>
                  <div>
                    <h3 className="album-collaborator-name">{user.fullname}</h3>
                    <p className="album-collaborator-username">
                      @{user.username}
                    </p>
                  </div>
                </div>
              );
            })}
            {album.users.length < 7 ? (
              <div onClick={toggleVisibility} className="album-collaborator">
                <i className="fa-solid fa-circle-plus"></i>
                <h3 className="album-collaborator-name"> Add collaborator</h3>
              </div>
            ) : (
              ""
            )}
          </div>

          {album.users.length > 7 ? (
            <button className="album-view-collaborators">View all</button>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
export default AlbumCollaborators;
