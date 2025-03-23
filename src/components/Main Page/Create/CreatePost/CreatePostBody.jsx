import { useContext, useState } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { AuthContext } from "../../Contexts/AuthContext";
import { NotificationContext } from "../../Contexts/NotificationContext";

function CreatePostBody({
  file,
  onConfirm,
  setFilePresent,
  setVisibility,
  albumName,
}) {
  const [caption, setCaption] = useState("");
  const [album, setAlbum] = useState(albumName ? albumName : null);
  const [isPublic, setIsPublic] = useState(true);
  const [loading, setLoading] = useState(false);
  const {addSentNotification} = useContext(NotificationContext);
  const { user, setUser } = useContext(UserContext);
  const {token} = useContext(AuthContext);
  const selectAlbum = (album) => {
    if (!albumName) {
      setAlbum(album);
    }
  };
  const toggleSwitch = () => {
    setIsPublic((prevPrivacy) => !prevPrivacy);
  };
  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };
  const handleAlbumChange = (e) => {
    setAlbum(e.target.value);
  };
  const uploadPost = async() => {
    try{
      if (file) {
        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("album",album);
        formData.append("caption",caption);
        formData.append("public",isPublic);
        const response = await fetch(`http://localhost:3002/photos/${user._id}/upload`, {
          method: "POST",
          body: formData,
          headers:{
            "Authorization":`Bearer ${token}`
          }
        });
        const data = await response.json();
        if(response.ok){
          setUser((prev)=>({...prev, posts:[...prev.posts, data.post]}));
          addSentNotification(true, data.message);
          setFilePresent(false);
        }
        else{
          addSentNotification(false, data.message);
          setLoading(false);
        }
      }
    }
    catch(error){
      addSentNotification(false, error.message);
    }
    finally{
      setLoading(false);
    }
    
  };
  const uploadForAlbum = () => {
    if (file) {
      const post = {
        caption: caption,
        postedBy: user._id,
        privacy: !isPublic,
        timestamp: Date.now(),
        photo: file,
      };
      onConfirm(post);
    }
    setFilePresent(false);
    setVisibility(false);
  };
  console.log(album);
  return (
    <div className="post-upload-container">
      <img className="post-upload-image" src={URL.createObjectURL(file)}></img>
      <div className="post-upload-details">
        <div>
          <p className="post-upload-input-headers">Album</p>
          <select
            style={{ color: `${!album ? "#114085B3" : "var(--text-color)"}` }}
            value={album || ""}
            onChange={handleAlbumChange}
            className="post-upload-album-select"
          >
            {albumName ? (
              <option selected>{albumName}</option>
            ) : (
              <>
                <option disabled value="">
                  Choose an album
                </option>
                {user.albums.map((album) => {
                  return (
                    <option
                      onClick={() => selectAlbum(album)}
                      value={album._id}
                    >
                      {album.name}
                    </option>
                  );
                })}
              </>
            )}
          </select>
        </div>
        <div>
          <p className="post-upload-input-headers">Caption</p>
          <input
            className="post-upload-caption-input"
            value={caption}
            onChange={handleCaptionChange}
            placeholder="Enter Caption"
            type="text"
          />
        </div>
        <div>
          <p className="post-upload-input-headers">Privacy</p>
          <div className="post-upload-privacy">
            <p id="post-upload-privacy-setting">
              {isPublic ? "Public" : "Private"}
            </p>
            <div
              onClick={toggleSwitch}
              className={`post-upload-toggle ${
                isPublic ? "toggle-background-off" : ""
              }`}
            >
              <div
                className={`post-upload-toggle-switch ${
                  isPublic ? "toggle-switch-off" : ""
                }`}
              ></div>
            </div>
          </div>
        </div>

        <button
          onClick={!onConfirm ? uploadPost : uploadForAlbum}
          className="post-upload-button"
        >
          {!onConfirm ? "Post" : "Upload"}
        </button>
      </div>
    </div>
  );
}

export default CreatePostBody;
