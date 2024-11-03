import React, { useState, useContext } from 'react';
import '../../../styles/create.css';
import { UserContext } from '../../UserContext';

function Create({ visibility, setVisibility }) {
  const { user } = useContext(UserContext);
  const [filePresent, setFilePresent] = useState(false);
  const [file, setFile] = useState(null);
  
  const uploadFile = () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('userId', user._id);
      fetch('http://localhost:3002/photos/upload', {
        method: 'POST',
        body: formData
      });
      setFilePresent(false);
    }
  };

  const fileInputChange = (e) => {
    if (e.target.files) {
      setFilePresent(true);
      setFile(e.target.files[0]);
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      document.querySelector('.create-image').src = imageUrl;
    }
  };

  if (!visibility) return null; // Only render if visibility is true

  return (
    <div className="create-container-page">
      <div className="create-container">
        <i
          onClick={() => setVisibility(false)} // Close when clicked
          className="fa-solid fa-multiply create-exit"
        ></i>
        <div className="create-container-header">Create New Post</div>
        <img className="create-image" src="./assets/Poop.png" alt="Preview" />
        {filePresent ? (
          <div className="post-submit-container">
            <input
              placeholder="Enter Caption"
              className="post-submit-caption"
              type="text"
            />
            <select>
              <option disabled selected>Select Album</option>
              <option>Summer 24</option>
            </select>
            <button onClick={uploadFile} className="post-submit-button">
              Submit
            </button>
          </div>
        ) : (
          <div className="create-container-body">
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
                  style={{ color: 'white' }}
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