import { useContext, useState } from "react";
import { UserContext } from "../../UserContext";

function CreatePostBody({file,onConfirm}) {
  const [caption, setCaption] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const {user} = useContext(UserContext);
  const toggleSwitch = () => {
    setIsPublic((prevPrivacy) => !prevPrivacy);
  };
  const handleCaptionChange=(e)=>{
      setCaption(e.target.value);
    }
    const uploadFile = () => {
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
        const formData = new FormData();
        formData.append("file", file);
        formData.append("userId", user._id);
        console.log(file);
        console.log(user._id);
        console.log(formData);
        for (let pair of formData.entries()) {
          console.log(pair[0] + ': ' + pair[1]);
        }
        onConfirm(formData);
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
          <select className="post-upload-album-select">
            <option disabled selected>
              Select Album
            </option>
            <option>Summer 24</option>
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
                isPublic ? "" : "toggle-background-off"
              }`}
            >
              <div
                className={`post-upload-toggle-switch ${
                  isPublic ? "" : "toggle-switch-off"
                }`}
              ></div>
            </div>
          </div>
        </div>

        <button
          onClick={!onConfirm ? uploadFile : uploadForAlbum}
          className="post-upload-button"
        >
          {!onConfirm ? "Post" : "Upload"}
        </button>
      </div>
    </div>
  );
}

export default CreatePostBody;
