import { useContext, useEffect, useState } from "react";
import "../../../styles/Profile.css";
import { UserContext } from "../../UserContext";
function AddPfp({ setVisibility, setProfile }) {
  const [imageFile, setImageFile] = useState(null);
  const [filePresent, setFilePresent] = useState(false);
  const {user} = useContext(UserContext);
  const handleWheel = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    document.body.addEventListener(
      "wheel",handleWheel,{passive:false}
    );
    return () => {
      document.body.removeEventListener("wheel", handleWheel);
    };
  }, []);
  const imageInputChange = (e) => {
    if (e.target.files) {
      setFilePresent(true);
      setImageFile(e.target.files[0]);
    }
  };
  const removeFile = () =>{
    setFilePresent(false);
    setImageFile(null);
  }
  const uploadImage = async() =>{
    if(filePresent){
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('userId',user._id);
      const response = await fetch('http://localhost:3002/photos/uploadProfilePic',{
        method:'Post',
        body:formData
      });
      const profilePic = (await response.json()).photo;
      setProfile(prev => ({ ...prev, profilePic: profilePic }));
      setVisibility(false);
    }}
  return (
    <div className="add-pfp-page-container">
      <div className="add-pfp-page-body">
        {filePresent ? (
          <div className="add-pfp-image">
            <img src={URL.createObjectURL(imageFile)}></img>
            <button onClick={uploadImage}>Save</button> 
            <i onClick={removeFile}
            className="fa-solid fa-angle-left add-pfp-image-back"></i>
          </div>
        ) : (
          <>
            <h1>Change Profile Picture</h1>
            <input onChange={imageInputChange} type="file" id="pfp-input"></input>
            <label className="add-pfp-page-body-item" htmlFor="pfp-input">
              Upload Photo
            </label>
            <p
              className="add-pfp-page-body-item"
              onClick={() => setVisibility(false)}
            >
              Cancel
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default AddPfp;
