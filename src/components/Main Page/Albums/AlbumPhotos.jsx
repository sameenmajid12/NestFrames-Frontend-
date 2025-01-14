import React from "react";
import "../../../styles/albums.css";

function AlbumPhotos({ album }) {
  console.log(album.posts);
  return (
    <div className="album-photos-container">
      {album.posts.map((post, index) => (
        <img key={index} src={post.photo.fileUrl} alt={`Photo ${index}`} />
      ))}
    </div>
  );
}

export default AlbumPhotos;