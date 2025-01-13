function CreateAlbumCoverPhoto({coverPhoto, setCoverPhoto}){
  const handleCoverPhotoUpload = (e) => {
    if (e.target.files) {
      const photo = e.target.files[0];
      setCoverPhoto(photo);
    }
  };

  const handleRemoveCoverPhoto = () => {
    setCoverPhoto(null);
  };
  return(
    coverPhoto ? (
      <div className="create-album-cover-photo-container">
        <img
          className="create-album-cover-photo"
          src={URL.createObjectURL(coverPhoto)}
        ></img>
        <div className="cover-photo-remove-container">
          <i
            onClick={handleRemoveCoverPhoto}
            className="fa-solid fa-multiply cover-photo-remove"
          ></i>
        </div>
      </div>
    ) : (
      <div className="create-album-picture-placeholder">
        <input
          onChange={handleCoverPhotoUpload}
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
    )
  )
}
export default CreateAlbumCoverPhoto;