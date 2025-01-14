import React from "react";
import "../../../styles/albums.css";
import AlbumCollaborators from "./AlbumCollaborators";

function AlbumPhotos({ album, screen1000, albumId, setAlbum, collaborators, setCollaborators }) {
  return (
    <div className="album-photos-container">
      {screen1000?<AlbumCollaborators albumId={albumId}collaborators={collaborators} setCollaborators={setCollaborators} screen1000={screen1000}/>:''}
      {album.posts.map((post, index) => (
        <img className="album-photos" key={index} src={post.photo.fileUrl} alt={`Photo ${index}`} />
      ))}
    </div>
  );
}

export default AlbumPhotos;