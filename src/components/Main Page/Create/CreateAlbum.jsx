import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import SelectorList from "../Main/SelectorList";
import CreatePost from "./CreatePost";

function CreateAlbum({ setVisibility }) {
  const { user } = useContext(UserContext);

  useEffect(() => {
    const albumNameInput = document.querySelector(".create-album-name");

    const removePlaceholder = () => {
      albumNameInput.placeholder = "";
    };

    const restorePlaceholder = () => {
      albumNameInput.placeholder = "Album name";
    };

    albumNameInput.addEventListener("focus", removePlaceholder);
    albumNameInput.addEventListener("blur", restorePlaceholder);

    return () => {
      albumNameInput.removeEventListener("focus", removePlaceholder);
      albumNameInput.removeEventListener("blur", restorePlaceholder);
    };
  }, []);

  const navigate = useNavigate();

  const [coverPhoto, setCoverPhoto] = useState(null);
  const [albumName, setAlbumName] = useState(null);
  const [albumPosts, setAlbumPosts] = useState([]);
  const [photoUrls, setPhotoUrls] = useState([]);
  const [albumCollaborators, setAlbumCollaborators] = useState([]);
  const [isFriendSelectorVisible, setIsFriendSelectorVisible] = useState(false);
  const [postModalFile, setPostModalFile] = useState(null);
  const [isPostModalVisible, setIsPostModalVisibile] = useState(false);
  const [photoCarouselIndex, setPhotoCarouselIndex] = useState(0);

  const handleCoverPhotoUpload = (e) => {
    if (e.target.files) {
      const photo = e.target.files[0];
      setCoverPhoto(photo);
    }
  };

  const handleRemoveCoverPhoto = () => {
    setCoverPhoto(null);
  };


  const handlePostModalUpload = (file) => {
    console.log(file);
  };

  const toggleFriendSelector = () => {
    setIsFriendSelectorVisible((prev) => !prev);
  };

  const handleAddFriends = (selectedFriends) => {
    const newCollaborators =
      albumCollaborators.length !== 0
        ? selectedFriends.filter(
            (friend) =>
              !albumCollaborators.some(
                (collaborator) => collaborator._id === friend._id
              )
          )
        : selectedFriends;

    setAlbumCollaborators((prev) => [...prev, ...newCollaborators]);
    toggleFriendSelector();
  };

  const handlePhotoUpload = (e) => {
    if (e.target.files) {
      const photo = e.target.files[0];
      const photoUrl = URL.createObjectURL(photo);
      setPhotoUrls((prevUrls) => [...prevUrls, photoUrl]);
      setPostModalFile(photo);
      setIsPostModalVisibile(true);
    }
  };

  const handleNextPhoto = () => {
    setPhotoCarouselIndex((prev) => prev + 1);
  };

  const handlePreviousPhoto = () => {
    setPhotoCarouselIndex((prev) => prev - 1);
  };

  const handleAlbumNameChange = (e) => {
    setAlbumName(e.target.value);
  };

  const handleCreateAlbum = async () => {
    if (!albumName) {
      return;
    }

    const formData = new FormData();
    formData.append("coverPhoto", coverPhoto);
    formData.append("albumName", albumName);

    albumPosts.forEach((post) => {
      formData.append("posts", post);
    });

    albumCollaborators.forEach((collaborator) => {
      formData.append("collaborators", collaborator);
    });

    formData.append("userId", user._id);


    const response = await fetch("http://localhost:3002/Albums/Create", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const { albumId } = await response.json();
      setVisibility(false);
      navigate(`/album/${albumId}`);
    }
  };

  return (
    <>
      <div className="create-album-page">
        {postModalFile && isPostModalVisible ? (
          <CreatePost onConfirm={handlePostModalUpload} fileProp={postModalFile} setVisibility={setIsPostModalVisibile}/>
        ) : isFriendSelectorVisible ? (
          <SelectorList
            
            onConfirm={handleAddFriends}
            toggleVisibility={toggleFriendSelector}
          />
        ) : (
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
              )}
              <input
                className="create-album-name"
                placeholder="Album name"
                type="text"
                value={albumName}
                onChange={handleAlbumNameChange}
              />
              <div
                onClick={albumCollaborators.length == 0 ? toggleFriendSelector : null}
                className="create-album-tag-container"
              >
                {albumCollaborators.length == 0 ? (
                  <>
                    <i className="fa-solid fa-user-group"></i>
                    <p>Add Friends</p>
                  </>
                ) : (
                  <>
                    <input
                      className="create-album-tag-input"
                      onChange={(e) => {
                        // Prevent editing the input by resetting the value
                        e.target.value = albumCollaborators
                          .map((friend) => `@${friend.username}`)
                          .join(", ");
                      }}
                      value={albumCollaborators
                        .map((friend) => `@${friend.username}`)
                        .join(", ")}
                      onKeyDown={({ key }) => {
                        if (key === "Backspace") {
                          console.log("pooop");
                          setAlbumCollaborators((prev) => {
                            console.log(prev.slice(0, -1));
                            return prev.slice(0, -1);
                          });
                        }
                      }}
                    ></input>
                    <i
                      onClick={toggleFriendSelector}
                      className="fa-solid fa-circle-plus"
                    ></i>
                  </>
                )}
              </div>
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
              <div className="create-album-photos-container">
                <div className="create-album-photo-upload">
                  {photoUrls.length > 0 ? (
                    <img src={photoUrls[0 + photoCarouselIndex]}></img>
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
                    <img src={photoUrls[1 + photoCarouselIndex]}></img>
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
                    <img src={photoUrls[2 + photoCarouselIndex]}></img>
                  ) : (
                    <div className="create-album-photo-plus-container">
                      <i
                        className="fa-solid fa-plus"
                        style={{ color: "white", fontSize: "24px" }}
                      ></i>
                    </div>
                  )}
                </div>
                {photoUrls.length > 3 &&
                photoCarouselIndex < photoUrls.length - 3 ? (
                  <div
                    onClick={handleNextPhoto}
                    className="create-album-photo-next"
                  >
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                ) : (
                  ""
                )}
                {photoCarouselIndex > 0 ? (
                  <div
                    onClick={handlePreviousPhoto}
                    className="create-album-photo-previous"
                  >
                    <i className="fa-solid fa-chevron-left"></i>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <button onClick={handleCreateAlbum} className="create-album-button">
                Create
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CreateAlbum;
