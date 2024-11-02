import React, { useState } from 'react';
import '../../../styles/create.css'
import { UserContext } from '../../UserContext';
import { useContext } from 'react';
function Create(props){
  console.log(props)
  const {user} = useContext(UserContext);
  const [filePresent, setFilePresent] = useState(false);
  const [file,setFile] = useState(null);
  const uploadFile = () =>{
    if(file){
      console.log(file);
      setFilePresent(false);
      const formData = new FormData();
      formData.append('file',file);
      formData.append('userId',user._id);
      fetch('http://localhost:3002/photos/upload',{
      method: 'POST',
      body: formData
    })
    }
    
  }
  function fileInputChange(e){
    if(e.target.files){
      setFilePresent(true);
      setFile(e.target.files[0]);
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      document.querySelector('.create-image').src = imageUrl;
    }
    
  }
  return(
    <div className='create-container-page'>
      <div className= "create-container">
      <i
      onClick={()=>setVisibility}
      className='fa-solid fa-multiply create-exit'></i>
      <div className="create-container-header">
        Create New Post
      </div>
      <img className='create-image' src='./assets/Poop.png'></img>
      {filePresent?
      <div className='post-submit-container'>
        <input placeholder="Enter Caption"className='post-submit-caption' type="text"></input>
        <select>
          <option disabled selected>Select Album</option>
          <option>Summer 24</option>
        </select>
        <button onClick={uploadFile} className='post-submit-button'>Submit</button>
      </div>:<div className='create-container-body'>
        <input onChange={fileInputChange} type='file' id='create-input' accept="image/*,video/*"></input>
        <label htmlFor='create-input'> Add Photo or Video to upload
        <div><i className="fa-solid fa-circle-plus fa-2x" style={{color:'white'}}></i></div></label>
       
        
      </div>}

      
    </div>
    </div>
    
  )
}

export default Create;