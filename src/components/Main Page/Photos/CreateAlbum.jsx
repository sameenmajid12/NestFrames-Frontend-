import { useEffect, useState } from "react";

function CreateAlbum({ setVisibility }) {
  
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [albumPhotos, setAlbumPhotos] = useState([]);
  const [albumPhotoIteration, setAlbumPhotoIteration] = useState(0);
  const [albumPhotoClickerCount, setAlbumPhotoClickerCount] = useState(0);
  const uploadCover = (e) => {
    if (e.target.files) {
      const photo = e.target.files[0];
      const photoUrl = URL.createObjectURL(photo);
      setCoverPhoto(photoUrl);
    }
  };
  const removeCover = () => {
    setCoverPhoto(null);
  };
  const uploadPhoto = (e)=>{
    if(e.target.files){
      const photo = e.target.files[0];
      const photoUrl = URL.createObjectURL(photo);
      setAlbumPhotos(prevPhotos=>[...prevPhotos,photoUrl]);
      setAlbumPhotoIteration(prevCount=>prevCount++)
      console.log(photoUrl);
    }
  }
  const createAlbum = ()=>{

  }
  return (
    <div className="create-album-page">
      <div className="create-album-container">
        <div className="create-album-header">
          <p>Create album</p>
          <i
            onClick={setVisibility}
            className="fa-solid fa-multiply create-album-close"
          ></i>
        </div>
        <div className="create-album-body">
          {coverPhoto ? (
            <div className="create-album-cover-photo-container">
              <img className="create-album-cover-photo" src={coverPhoto}></img>
              <div className="cover-photo-remove-container">
                <i
                  onClick={removeCover}
                  className="fa-solid fa-multiply cover-photo-remove"
                ></i>
              </div>
            </div>
          ) : (
            <div className="create-album-picture-placeholder">
              <input
                onChange={uploadCover}
                id="create-album-cover-input"
                type="file"
              ></input>
              <label htmlFor="create-album-cover-input">
                <div className="create-album-cover-plus-container">
                  <i
                    className="fa-solid fa-plus fa-2x"
                    style={{ color: "white" }}
                  ></i>
                </div>
                <p>Add cover photo</p>
              </label>
            </div>
          )}
          <input
            className="create-album-name"
            placeholder="Album name"
            type="text"
          />
          <div className="create-album-tag-container">
            <i className="fa-solid fa-user-group"></i>
            <p>Tag Friends</p>
          </div>
          <div className="create-album-upload-photos-container">
            <input onChange={uploadPhoto } id="create-album-photos-input" type="file" multiple accept="image/*"></input>
            <label htmlFor="create-album-photos-input">
              <i className="fa-solid fa-images"></i>
              <p>Upload photo</p>
            </label>
            
          </div>
          <div className="create-album-photos-container">
            <div className="create-album-photo-upload">
              {albumPhotos.length > 0 ? (
                <img src={albumPhotos[0 + albumPhotoIteration]}></img>
              ) : (
                <div className="create-album-photo-plus-container">
                  <i
                    className="fa-solid fa-plus"
                    style={{ color: "white", fontSize: "24px" }}
                  ></i>
                </div>
              )}
            </div>
            <div className="create-album-photo-upload">
              {albumPhotos.length > 0 ? (
                <img src={albumPhotos[1 + albumPhotoIteration]}></img>
              ) : (
                <div className="create-album-photo-plus-container">
                  <i
                    className="fa-solid fa-plus"
                    style={{ color: "white", fontSize: "24px" }}
                  ></i>
                </div>
              )}
            </div>
            <div className="create-album-photo-upload">
              {albumPhotos.length > 0 ? (
                <img src={albumPhotos[2 + albumPhotoIteration]}></img>
              ) : (
                <div className="create-album-photo-plus-container">
                  <i
                    className="fa-solid fa-plus"
                    style={{ color: "white", fontSize: "24px" }}
                  ></i>
                </div>
              )}
            </div>
            {albumPhotos.length>2?
            <div className="create-album-photo-next">
              
            </div>:''}
          </div>
          <button className="create-album-button">Create</button>
        </div>
      </div>
    </div>
  );
}

export default CreateAlbum;
