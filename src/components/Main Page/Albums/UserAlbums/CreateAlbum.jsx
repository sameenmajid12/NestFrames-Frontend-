import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../UserContext";
function CreateAlbum({ setVisibility }) {
  const {user} = useContext(UserContext);
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
  const [photoUrls, setPhotoUrls] = useState([]);
  const [albumPhotoClickerCount, setAlbumPhotoClickerCount] = useState(0);
  const uploadCover = (e) => {
    if (e.target.files) {
      const photo = e.target.files[0];
      setCoverPhoto(photo);
    }
  };
  const removeCover = () => {
    setCoverPhoto(null);
  };
  const uploadPhoto = (e)=>{
    if(e.target.files){
      const photo = e.target.files[0];
      const photoUrl = URL.createObjectURL(photo);
      setPhotoUrls(prevUrls=>[...prevUrls,photoUrl]);
      setAlbumPhotos(prevPhotos=>[...prevPhotos,photo]);
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
    const formData = new FormData();
    formData.append('coverPhoto', coverPhoto);
    formData.append('albumName', albumName);
    albumPhotos.forEach(photo=>{
      formData.append('photos',photo);
    })
    formData.append('userId', user._id);
    console.log(formData);
    const response = await fetch('http://localhost:3002/Albums/Create',{
      method:"POST",
      body:formData
    }
    )
    if(response){
      const albumId = await response.json();
      setVisibility(false);
      navigate(`/album/${albumId}`);
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
              <img className="create-album-cover-photo" src={URL.createObjectURL(coverPhoto)}></img>
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
              {photoUrls.length > 0 ? (
                <img src={photoUrls[0 + albumPhotoClickerCount]}></img>
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
              {photoUrls.length > 1 ? (
                <img src={photoUrls[1 + albumPhotoClickerCount]}></img>
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
              {photoUrls.length > 2 ? (
                <img src={photoUrls[2 + albumPhotoClickerCount]}></img>
              ) : (
                <div className="create-album-photo-plus-container">
                  <i
                    className="fa-solid fa-plus"
                    style={{ color: "white", fontSize: "24px" }}
                  ></i>
                </div>
              )}
            </div>
            {photoUrls.length>3 && albumPhotoClickerCount<photoUrls.length-3?
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
