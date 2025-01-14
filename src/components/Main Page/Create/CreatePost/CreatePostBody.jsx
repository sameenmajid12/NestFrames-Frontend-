import { useContext, useState } from "react";
import { UserContext } from "../../../UserContext";

function CreatePostBody({file,onConfirm, setFilePresent, setVisibility}) {
  const [caption, setCaption] = useState("");
  const [album, setAlbum] = useState(null);
  const [isPublic, setIsPublic] = useState(true);
  const {user} = useContext(UserContext);
  const toggleSwitch = () => {
    setIsPublic((prevPrivacy) => !prevPrivacy);
  };
  const handleCaptionChange=(e)=>{
      setCaption(e.target.value);
    }
    const handleAlbumChange=(e)=>{
      setAlbum(e.target.value)
    }
    const uploadPost = () => {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("userId", user._id);
        fetch("http://localhost:3002/photos/upload", {
          method: "POST",
          body: formData,
        });
        setFilePresent(false);
      }
    };
    const uploadForAlbum = () => {
      if (file) {
        const post ={
          caption:caption,
          postedBy:user._id,
          privacy:!isPublic,
          photo:file
        }
        onConfirm(post);
      }
      setFilePresent(false);
      setVisibility(false);
    };
  return (
    <div className="post-upload-container">
      <img className="post-upload-image" src={URL.createObjectURL(file)}></img>
      <div className="post-upload-details">
        <div>
          <p className="post-upload-input-headers">Albums</p>
          <select value={album || ""} onChange={handleAlbumChange} className="post-upload-album-select">
            <option disabled value="">
              Select Album
            </option>
            {
              user.albums.map((album)=>{
                return <option value={album._id}>{album.name}</option>
              })
            }
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
          <p className="post-upload-input-headers">Tagged</p>
          <input
            className="post-upload-tag-input"
            placeholder="Tag friends"
            type="text"
          ></input>
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
