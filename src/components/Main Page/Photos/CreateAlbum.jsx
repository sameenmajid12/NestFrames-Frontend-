import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function CreateAlbum({ setVisibility }) {
  useEffect(()=>{
    const albumName = document.querySelector('.create-album-name');
    const removePlaceholder = ()=>{
      albumName.placeholder = "";
    }
    const restorePlaceholder = ()=>{
      albumName.placeholder = "Album name"
    }
    albumName.addEventListener('focus', removePlaceholder);
    albumName.addEventListener('blur', restorePlaceholder);
    return ()=>{
      albumName.removeEventListener('focus', removePlaceholder);
      albumName.removeEventListener('blur', restorePlaceholder);
    }
  },[]);
  const navigate = useNavigate();
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [albumName, setAlbumName] = useState(null);
  const [albumPhotos, setAlbumPhotos] = useState([]);
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
    }
  }
  const iterateToNextPhoto = ()=>{
      setAlbumPhotoClickerCount(prevCount=>prevCount+1);
  }
  const iterationToPreviousPhoto =()=>{
    setAlbumPhotoClickerCount(prevCount=>prevCount-1);
  }
  const nameInputChange = (e)=>{
    setAlbumName(e.target.value)
  }
  const createAlbum = async()=>{
    if(!albumName){
      return;
    }
    const album = {
      name:albumName,
      coverPhoto:coverPhoto,
      photos:albumPhotos,
      users:[]
    }
    const response = await fetch('http://localhost:3002/Albums/Create',{
      method:"POST",
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify(album)
    }
    )
    const data = await response.json();
    if(data){
      setVisibility(false);
      navigate(`${data._id}`);
    }
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
            value={albumName}
            onChange={nameInputChange}
          />
          <div className="create-album-tag-container">
            <i className="fa-solid fa-user-group"></i>
            <p>Add Friends</p>
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
                <img src={albumPhotos[0 + albumPhotoClickerCount]}></img>
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
              {albumPhotos.length > 1 ? (
                <img src={albumPhotos[1 + albumPhotoClickerCount]}></img>
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
              {albumPhotos.length > 2 ? (
                <img src={albumPhotos[2 + albumPhotoClickerCount]}></img>
              ) : (
                <div className="create-album-photo-plus-container">
                  <i
                    className="fa-solid fa-plus"
                    style={{ color: "white", fontSize: "24px" }}
                  ></i>
                </div>
              )}
            </div>
            {albumPhotos.length>3 && albumPhotoClickerCount<albumPhotos.length-3?
            <div onClick={iterateToNextPhoto} className="create-album-photo-next">
              <i className="fa-solid fa-chevron-right"></i>
            </div>:''}
            {albumPhotoClickerCount>0?
              <div onClick={iterationToPreviousPhoto} className="create-album-photo-previous">
                <i className="fa-solid fa-chevron-left">
                </i>
              </div>:''
            }
          </div>
          <button onClick={createAlbum} className="create-album-button">Create</button>
        </div>
      </div>
    </div>
  );
}

export default CreateAlbum;
