import { useContext, useState } from "react";
import { UserContext } from "../../../UserContext";
import CreateAlbum from "./CreateAlbum";
function AlbumContent(){
  const {user} = useContext(UserContext)
  const [createAlbumVisibility, setCreateAlbumVisibility] = useState(false);
  const showCreateAlbum = ()=>{
    setCreateAlbumVisibility(prevVisibility=>!prevVisibility);
  }
  return(
    <>
      {createAlbumVisibility && <CreateAlbum setVisibility={showCreateAlbum}/>}
      <div className="albums-container">
        <div className="album-add">
          <div className="album-plus-background">
            <i onClick={showCreateAlbum} class="fa-solid fa-plus"></i>
          </div>
          <p>Create album</p>
        </div>
        {user?user.albums.map((album,index)=>{
          
        }):''}
      </div>
    </>
  )
}

export default AlbumContent;