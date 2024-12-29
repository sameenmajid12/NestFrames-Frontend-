import { useContext, useState } from "react";
import { UserContext } from "../../UserContext";
import CreateAlbum from "./CreateAlbum";
import { useNavigate, useOutletContext } from "react-router-dom";
function AlbumContent() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [createAlbumVisibility, setCreateAlbumVisibility] = useState(false);
  const { albums } = useOutletContext();
  console.log("Albums in AlbumContent:", albums);
  const showCreateAlbum = () => {
    setCreateAlbumVisibility((prevVisibility) => !prevVisibility);
  };
  return (
    <>
      {createAlbumVisibility && <CreateAlbum setVisibility={showCreateAlbum} />}
      <div className="albums-container">
        {albums
          ? albums.map((album) => {
              return (
                <div
                key={album._id}
                  onClick={() => {
                    navigate(`/album/${album._id}`);
                  }}
                  className="album-cover-container"
                >
                  <img src={`${album.coverPhoto.fileUrl}`}></img>
                  <div className="album-cover-gradient">
                    <p className="album-cover-name">{album.name}</p>
                  </div>
                </div>
              );
            })
          : ""}
        {user ? (
          user.albums.length === 0 ? (
            <div onClick={showCreateAlbum} className="album-add">
              <div className="album-plus-background">
                <i className="fa-solid fa-plus"></i>
              </div>
              <p>Create album</p>
            </div>
          ) : (
            <div onClick={showCreateAlbum} className="media-add">
              <i className="fa-solid fa-plus"></i>
              <div className="tooltip">
                <span className="tooltip-text">Create album</span>
              </div>
            </div>
          )
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default AlbumContent;
