import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../UserContext";
import CreateAlbum from "../Create/CreateAlbum/CreateAlbum";
import { useNavigate, useOutletContext } from "react-router-dom";
function AlbumContent({albumProps}) {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [createAlbumVisibility, setCreateAlbumVisibility] = useState(false);
  const { albums:contextAlbums } = useOutletContext() || {};
  let albums = contextAlbums || albumProps;
  const showCreateAlbum = () => {
    setCreateAlbumVisibility((prevVisibility) => !prevVisibility);
  };
  useEffect(()=>{
    if(albumProps){
      albums = albumProps;
    }
  },[])
  const formatNum=(num)=>{
    if(num>999999){
      num = `${Math.round(num/1000000)}M`;
    }
    else if(num>999){
      num = `${Math.round(num/1000)}k`
    }
    return num;
  }
  return (
    <>
      {createAlbumVisibility && <CreateAlbum setVisibility={showCreateAlbum} />}
      <div className={`albums-container ${albumProps?'profile-albums-container':''}`}>
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
                  <div className="album-info">
                    <p>{album.name} {albumProps?'':<span className="album-info-collaborators">&nbsp;•  {albumProps?'':`${album.posts.length} Posts`} </span>}</p>
                    <div className="album-info-right">
                      <div>
                        <i className="fa-solid fa-heart heart"></i>
                        <p>{formatNum(album.likes) || 0}</p>
                      </div>
                     
                      <div>
                      <i className="fa-solid fa-eye"></i>
                        <p>{formatNum(album.views) || 0}</p>
                      </div>
                      
                    </div>
                  </div>
                </div>
              );
            })
          : ""}
        {!albumProps?user ? (
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
        ):''}
      </div>
    </>
  );
}

export default AlbumContent;
