function AlbumPhotos() {
  return (
    <div className="album-photos-container">
      {album.photos.map((photo, index) => {
        return <img key={index} src={photo.fileUrl}></img>;
      })}
    </div>
  );
}

export default AlbumPhotos;
