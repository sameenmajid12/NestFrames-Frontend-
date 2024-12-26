import React from "react";
import "../../../styles/albums.css";

function AlbumPhotos({ album }) {
  return (
    <div className="album-photos-container">
      {album.photos.map((photo, index) => (
        <img key={index} src={photo.fileUrl} alt={`Photo ${index}`} />
      ))}
    </div>
  );
}

export default AlbumPhotos;