import { useState } from "react";

function CreateAlbum({ setVisibility }) {
  const [coverPhoto, setCoverPhoto] = useState(null);
  return (
    <div className="create-album-page">
      <div className="create-album-container">
        <div className="create-album-header">
          <p>Create album</p>
          <i className="fa-solid fa-multiply create-album-close"></i>
        </div>
        <div className="create-album-body">
          {coverPhoto ? (
            <img src={URL.createObjectURL(coverPhoto)}></img>
          ) : (
            <div className="create-album-picture-placeholder">
              <input id="create-album-cover-input" type="file"></input>
              <label htmlFor="create-album-cover-input">
              <div className="create-album-plus-container">
                <i className="fa-solid fa-plus fa-2x" style={{color:"white"}}></i>
              </div>
              <p>Add cover photo</p>
              </label>
              
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateAlbum;
