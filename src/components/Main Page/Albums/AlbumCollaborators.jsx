  import useAlbumActions from "../../../hooks/useAlbumActions";
import "../../../styles/albums.css";
import { AuthContext } from "../Contexts/AuthContext";
import { NotificationContext } from "../Contexts/NotificationContext";
  import SelectorList from "../Utils/SelectorList";
  import { useContext, useState } from "react";
  function AlbumCollaborators({
    collaborators,
    album
  }) {
    console.log(album);
    const {token} = useContext(AuthContext);
    const {sendInvitation} = useAlbumActions();
    const [friendListVisibility, setFriendListVisibility] = useState(false);
    const [collaboratorVisibility, setCollaboratorVisibility] = useState(false);
    const toggleFriendVisibility = () => {
      setFriendListVisibility((prev) => !prev);
    };
    const toggleCollaboratorVisibility = () => {
      setCollaboratorVisibility((prev) => !prev);
    };
    return (
      <>
        {friendListVisibility && (
          <SelectorList
            toggleVisibility={toggleFriendVisibility}
            onConfirm={(selectedUsers)=>sendInvitation(selectedUsers, album._id)}
          />
        )}
        {
          collaboratorVisibility && <SelectorList toggleVisibility={toggleCollaboratorVisibility} header="Collaborators" users={collaborators}/>
        }
        <div className="album-collaborator-container">
          <h2>Collaborators</h2>
          <div className="album-collaborators-body">
            <div className="album-collaborators">
              {collaborators
                ? collaborators.slice(0, 6).map((user, index) => {
                    return (
                      <div key={index} className="album-collaborator">
                        <img
                          className="album-collaborator-image"
                          src={
                            user
                              ? user.profilePic
                                ? user.profilePic.fileUrl
                                : "/assets/default-avatar.png"
                              : ""
                          }
                        ></img>
                        <div>
                          <h3 className="album-collaborator-name">
                            {user.fullname}
                          </h3>
                          <p className="album-collaborator-username">
                            @{user.username}
                          </p>
                        </div>
                      </div>
                    );
                  })
                : ""}
              {collaborators.length < 6 ? (
                <div
                  onClick={toggleFriendVisibility}
                  className="album-collaborator"
                >
                  <i className="fa-solid fa-circle-plus"></i>
                  <h3 className="album-collaborator-name"> Add collaborator</h3>
                </div>
              ) : (
                ""
              )}
            </div>

            {collaborators.length >= 6 ? (
              <button onClick={toggleCollaboratorVisibility} className="album-view-collaborators">View all</button>
            ) : (
              ""
            )}
          </div>
        </div>
      </>
    );
  }
  export default AlbumCollaborators;
