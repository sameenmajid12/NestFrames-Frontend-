function CreateAlbumPostUpload({ setPostModalFile, setIsPostModalVisibile}) {
  const handlePhotoUpload = (e) => {
    if (e.target.files) {
      const photo = e.target.files[0];
      setPostModalFile(photo);
      setIsPostModalVisibile(true);
    }
  };
  return (
    <div className="create-album-upload-photos-container">
      <input
        onChange={handlePhotoUpload}
        id="create-album-photos-input"
        type="file"
        multiple
        accept="image/*"
      ></input>
      <label htmlFor="create-album-photos-input">
        <i className="fa-solid fa-images"></i>
        <p>Upload photo</p>
      </label>
    </div>
  );
}
export default CreateAlbumPostUpload;
