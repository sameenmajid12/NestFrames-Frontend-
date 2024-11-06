import React, { useState, useContext } from "react";
import "../../../styles/create.css";
import { UserContext } from "../../UserContext";

function Create({ visibility, setVisibility }) {
  const { user } = useContext(UserContext);
  const [filePresent, setFilePresent] = useState(false);
  const [file, setFile] = useState(null);
  const [postData, setPostData] = useState({});
  const [isPublic, setIsPublic] = useState(true);
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

  const fileInputChange = (e) => {
    if (e.target.files) {
      setFilePresent(true);
      setFile(e.target.files[0]);
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      document.querySelector(".create-image").src = imageUrl;
    }
  };
  const toggleSwitch = () => {
    setIsPublic((prevPrivacy) => !prevPrivacy);
  };
  if (!visibility) return null;

  return (
    <div className="create-container-page">
      <div className="create-container">
        <i
          onClick={() => setVisibility(false)}
          className="fa-solid fa-multiply create-exit"
        ></i>
        <div className="create-container-header">Create New Post</div>

        {filePresent ? (
          <div className="post-upload-container">
            <img
              className="post-upload-image"
              src={URL.createObjectURL(file)}
            ></img>
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
                  <p id="post-upload-privacy-setting">{isPublic?'Public':'Private'}</p>
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

              <button onClick={uploadFile} className="post-upload-button">
                Post
              </button>
            </div>
          </div>
        ) : (
          <div className="create-container-body">
            <img
              className="create-image"
              src="./assets/Poop.png"
              alt="Preview"
            />
            <input
              onChange={fileInputChange}
              type="file"
              id="create-input"
              accept="image/*,video/*"
            />
            <label htmlFor="create-input">
              Add Photo or Video to upload
              <div>
                <i
                  className="fa-solid fa-circle-plus fa-2x"
                  style={{ color: "white" }}
                ></i>
              </div>
            </label>
          </div>
        )}
      </div>
    </div>
  );
}

export default Create;
