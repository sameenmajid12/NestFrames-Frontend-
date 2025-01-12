import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import Create from "../Create/CreatePost";
function PhotosContent() {
  const { photos } = useOutletContext();
  const [createVisibility, setCreateVisibility] = useState(false);
  const toggleCreate = () =>{
    setCreateVisibility((prevVisibility)=>!prevVisibility);
  }
  return (
    <>
      {createVisibility && <Create visibility={createVisibility} setVisibility={setCreateVisibility}/>}
      <div className="photos-container">
        {photos.map((photo, index) => {
          console.log(photo);
          return (
            <div key={index}>
              <img className="photos" src={photo}></img>
            </div>
          );
        })}
        <div onClick={toggleCreate} className="media-add">
          <i className="fa-solid fa-plus"></i>
          <div className="tooltip">
            <span className="tooltip-text">Create post</span>
          </div>
        </div>
      </div>
    </>
  );
}
export default PhotosContent;
