import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import CreatePost from "../Create/CreatePost/CreatePost";
function PhotosContent() {
  const { posts } = useOutletContext();
  const [createVisibility, setCreateVisibility] = useState(false);
  const toggleCreate = () =>{
    setCreateVisibility((prevVisibility)=>!prevVisibility);
  }
  return (
    <>
      {createVisibility && <CreatePost visibility={createVisibility} setVisibility={setCreateVisibility}/>}
      <div className="photos-container">
        {posts.map((post, index) => {
          console.log(post);
          return (
            <div key={index}>
              <img className="photos" src={post.photo.fileUrl}></img>
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
