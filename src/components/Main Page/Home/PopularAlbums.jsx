import { useNavigate } from "react-router-dom";

function PopularAlbums({albums}) {
  const navigate = useNavigate();
  return (
    <div className="popular-albums-container">
      <h1 className="popular-albums-header">Popular Albums</h1>
      <div className="popular-albums-body">
        {albums.map((album)=>{
          return(<div onClick={()=>navigate(`/album/${album._id}`)} key={album._id} className="popular-album">
            <div className="popular-album-details">
              <h2 className="popular-album-name">{album.name}</h2>
              <div className="popular-album-stats-container">
                <p className="popular-album-stat">{album.users.length} collaborators</p>
                <p className="popular-album-stat">{album.likes} likes</p>
                <p className="popular-album-stat">{album.posts.length} posts</p>
              </div>
            </div>
              <img className="popular-album-cover" src={album.coverPhoto.fileUrl}></img>
          </div>)
          
        })}
      </div>
    </div>
  );
}
export default PopularAlbums;
