import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../UserContext";
import SelectorList from "../../Main/SelectorList";
import CreatePost from "../CreatePost/CreatePost";
import { AuthContext } from "../../../AuthContext";
import CreateAlbumPostUpload from "./CreateAlbumPostUpload";
import CreateAlbumCoverPhoto from "./CreateAlbumCoverPhoto";
import CreateAlbumPostContainer from './CreateAlbumPostContainer';
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
  const [albumName, setAlbumName] = useState("");
  const [albumPosts, setAlbumPosts] = useState([]);
  const [albumCollaborators, setAlbumCollaborators] = useState([]);
  const [isFriendSelectorVisible, setIsFriendSelectorVisible] = useState(false);
  const [postModalFile, setPostModalFile] = useState(null);
  const [isPostModalVisible, setIsPostModalVisibile] = useState(false);
  const { token } = useContext(AuthContext);
 

  const handlePostModalUpload = (newPost) => {
    setAlbumPosts(prev=>[...prev, newPost]);
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

  

  const handleAlbumNameChange = (e) => {
    setAlbumName(e.target.value);
  };

  const handleCreateAlbum = async () => {
    if (!albumName) {
      return;
    }
    const formData = new FormData();
    formData.append("coverPhoto", coverPhoto);
    formData.append("name", albumName);
    formData.append("users",user._id);
    albumCollaborators.forEach((collaborator) => {
      formData.append("users", collaborator._id);
    });

    albumPosts.forEach((post) => {
      const { photo, ...otherProps } = post;
    formData.append(`posts`, JSON.stringify(otherProps));

    // Add the photo property as a separate file
    if (photo) {
      formData.append(`photos`, photo);
    }
    });
    
    const response = await fetch("http://localhost:3002/Albums/Create", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
          <CreatePost
            onConfirm={handlePostModalUpload}
            fileProp={postModalFile}
            setVisibility={setIsPostModalVisibile}
          />
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
              <CreateAlbumCoverPhoto
                coverPhoto={coverPhoto}
                setCoverPhoto={setCoverPhoto}
              />
              <input
                className="create-album-name"
                placeholder="Album name"
                type="text"
                value={albumName}
                onChange={handleAlbumNameChange}
              />
              <div
                onClick={
                  albumCollaborators.length == 0 ? toggleFriendSelector : null
                }
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
                      value={
                        albumCollaborators.length !== 0
                          ? albumCollaborators
                              .map((friend) => `@${friend.username}`)
                              .join(", ")
                          : ""
                      }
                      onKeyDown={({ key }) => {
                        if (key === "Backspace") {
                          setAlbumCollaborators((prev) => {
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
              <CreateAlbumPostUpload
                setIsPostModalVisibile={setIsPostModalVisibile}
                setPostModalFile={setPostModalFile}
              />
              <CreateAlbumPostContainer albumPosts={albumPosts}/>
              <button
                onClick={handleCreateAlbum}
                className="create-album-button"
              >
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
