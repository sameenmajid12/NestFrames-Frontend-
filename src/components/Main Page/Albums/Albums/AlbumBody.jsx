import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../../../../styles/albums.css";
import { UserContext } from "../../../UserContext";
function AlbumBody() {
  useEffect(() => {
    document.body.className = "body-default";
  }, []);
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isCollaborator, setIsCollaborator] = useState(false);
  const location = useLocation();
  const albumId = location.pathname.split("/")[2];
  const getAlbum = async () => {
    const res = await fetch(`http://localhost:3002/albums/${albumId}`);
    if (res) {
      const album = await res.json();
      console.log(album);
      setAlbum(album);
      setLoading(false);
    } else {
      setNotFound(true);
    }
  };
  const checkAccess = () => {
    if (album) {
      if (album.users.find((u) => u.username === user.username)) {
        setIsCollaborator(true);
      }
    }
  };
  useEffect(() => {
    getAlbum();
    checkAccess();
  }, [albumId]);

  return album ? (
    <div className="album-page-container">
      <div className="album-head">
        <div className="album-head-left">
          <div className="album-main-header">
            <h1>
              {album.name} <i className="fa-solid fa-edit edit-album-name"></i>
            </h1>
            <div className="album-interactions">
              <div className="album-interaction-icons">
                <i className="fa-solid fa-heart"></i>
              </div>
              <div className="album-interaction-icons">
                <i className="fa-solid fa-plus"></i>
              </div>
              <div className="album-interaction-icons">
                <i class="fa-solid fa-clock-rotate-left"></i>
              </div>

              <div className="album-interaction-icons">
                <i class="fa-solid fa-arrow-up-from-bracket"></i>
              </div>
            </div>
          </div>
          <div className="album-cover-photo">
            <img src={album.coverPhoto.fileUrl}></img>
          </div>
        </div>
        <div className="album-collaborator-container">
          <h2>Collaborators</h2>
          <div className="album-collaborators-body">
            <div className="album-collaborators">
              {album.users.map((user) => {
                return (
                  <div className="album-collaborator">
                    <img
                      className="album-collaborator-image"
                      src={user.profilePic.fileUrl}
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
              })}
              {album.users.length < 6 ? (
                <div className="album-collaborator">
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
      </div>
      <hr className="album-body-divider"></hr>
      <div className="album-photos-container">
        <img src="/assets/Screenshot 2024-07-31 025422.png"></img>
        <img src="/assets/Screenshot 2024-07-31 025511.png"></img>
        <img src="/assets/Screenshot 2024-07-31 025753.png"></img>
        <img src="/assets/Screenshot 2024-07-31 025337.png"></img>
        <img src="/assets/Screenshot 2024-07-31 025422.png"></img>
        <img src="/assets/Screenshot 2024-07-31 025511.png"></img>
        <img src="/assets/Screenshot 2024-07-31 025753.png"></img>
      </div>
    </div>
  ) : (
    ""
  );
}

export default AlbumBody;
