import React, { useRef } from "react";
import "../../../styles/albums.css";
import AlbumCollaborators from "./AlbumCollaborators";

function AlbumHeader({ albumName, setAlbumName, albumId,album, setAlbum, collaborators, setCollaborators }) {
  const inputRef = useRef(null);
  const [nameChange, setNameChange] = React.useState({
    active: false,
    newName: "",
  });

  const toggleNameChange = () => {
    setNameChange((prev) => ({ ...prev, active: !prev.active }));
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  const changeName = async () => {
    if (nameChange.newName.trim() === "") {
      alert("Album name cannot be empty.");
      return;
    }
    try {
      const res = await fetch(`http://localhost:3002/albums/${albumId}/name`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: nameChange.newName }),
      });

      if (res.ok) {
        const updatedAlbum = await res.json();
        setAlbumName(updatedAlbum.name);
        setNameChange({ active: false, newName: "" });
      } else {
        alert("Error updating album name. Please try again.");
      }
    } catch (error) {
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="album-head">
      <div className="album-head-left">
        <div className="album-main-header">
          <h1 id="albumName">
            {nameChange.active ? (
              <div className="album-name-change">
                <input
                  ref={inputRef}
                  placeholder="Enter new name"
                  className="album-name-input"
                  onChange={(e) =>
                    setNameChange((prev) => ({
                      ...prev,
                      newName: e.target.value,
                    }))
                  }
                  value={nameChange.newName}
                />
                <i
                  onClick={toggleNameChange}
                  className="fa-solid fa-circle-xmark album-name-xmark"
                ></i>
                <i
                  onClick={changeName}
                  className="fa-solid fa-circle-check album-name-check"
                ></i>
              </div>
            ) : (
              <>
                {albumName}{" "}
                <i
                  onClick={toggleNameChange}
                  className="fa-solid fa-edit edit-album-name"
                ></i>
              </>
            )}
          </h1>
          <div className="album-interactions">
            <div className="album-interaction-icons">
              <i className="fa-solid fa-heart"></i>
            </div>
            <div className="album-interaction-icons">
              <i className="fa-solid fa-plus"></i>
            </div>
            <div className="album-interaction-icons">
              <i className="fa-solid fa-clock-rotate-left"></i>
            </div>
            <div className="album-interaction-icons">
              <i className="fa-solid fa-arrow-up-from-bracket"></i>
            </div>
          </div>
        </div>
        <div className="album-cover-photo">
          <img src={album.coverPhoto.fileUrl} alt="Album Cover" />
        </div>
      </div>
      <AlbumCollaborators album={album} albumId={albumId} setAlbum={setAlbum} collaborators={collaborators} setCollaborators={setCollaborators}/>
    </div>
  );
}

export default AlbumHeader;