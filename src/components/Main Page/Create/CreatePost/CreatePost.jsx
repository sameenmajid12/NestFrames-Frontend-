import React, { useState, useEffect } from "react";
import "../../../../styles/create.css";
import CreatePostBody from "./CreatePostBody";

function CreatePost({ fileProp, albumName, setVisibility, onConfirm }) {
  const [filePresent, setFilePresent] = useState(false);
  const [file, setFile] = useState(null);
  useEffect(() => {
    const handleWheel = (event) => {
      event.preventDefault();
    };
    document.addEventListener("wheel", handleWheel, { passive: false });

    if (fileProp) { 
      setFilePresent(true);
      setFile(fileProp); 
      console.log(fileProp.name);
    }
    return () => {
      document.removeEventListener("wheel", handleWheel);
    };
  }, []);
    
  const fileInputChange = (e) => {
    if (e.target.files) {
      setFilePresent(true);
      setFile(e.target.files[0]);
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      document.querySelector(".create-image").src = imageUrl;
    }
  };
  return (
    <div className={"create-container-page"}>
      <div className="create-container">
        <i
          onClick={() => setVisibility(false)}
          className="fa-solid fa-multiply create-exit"
        ></i>
        <div className="create-container-header">Create New Post</div>

        {filePresent ? (
          <CreatePostBody file={file} onConfirm={onConfirm} setFilePresent={setFilePresent} setVisibility={setVisibility} albumName={albumName}/>
        ) : (
          <div className="create-container-body">
            <img
              className="create-image"
              src="/assets/Poop.png"
              alt="Preview"
            />
            <input
              onChange={fileInputChange}
              type="file"
              id="create-input"
              accept="image/*,video/*"
            />
            <label htmlFor="create-input">
              Add Photo or Video to upload
              <div>
                <i
                  className="fa-solid fa-circle-plus fa-2x"
                  style={{ color: "white" }}
                ></i>
              </div>
            </label>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreatePost;
