import { useContext, useState } from "react";
import { UserContext } from "../../UserContext";
import CreateAlbum from "./CreateAlbum";
import { useNavigate } from "react-router-dom";
function AlbumContent() {
  const { user } = useContext(UserContext);
  console.log(user);
  const navigate = useNavigate();
  const [createAlbumVisibility, setCreateAlbumVisibility] = useState(false);
  const showCreateAlbum = () => {
    setCreateAlbumVisibility((prevVisibility) => !prevVisibility);
  };
  return (
    <>
      {createAlbumVisibility && <CreateAlbum setVisibility={showCreateAlbum} />}
      <div className="albums-container">
        {user
          ? user.albums.map((album, index) => {
              console.log(album);
              return (
                <div
                  onClick={() => {
                    navigate(`/album/${album._id}`);
                  }}
                  className="album-cover-container"
                >
                  <img src={`${album.coverPhoto.fileUrl}`}></img>
                  <div className="album-cover-gradient"><p className="album-cover-name">{album.name}</p></div>
                </div>
              );
            })
          : ""}
        {user ? (
          user.albums.length === 0 ? (
            <div onClick={showCreateAlbum} className="album-add">
              <div className="album-plus-background">
                <i class="fa-solid fa-plus"></i>
              </div>
              <p>Create album</p>
            </div>
          ) : (
            <div onClick={showCreateAlbum} className="media-add">
              <i class="fa-solid fa-plus"></i>
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
