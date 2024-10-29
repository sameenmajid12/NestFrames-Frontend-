import { useState } from 'react';
import '../../../styles/create.css'

function Create(){
  const [filePresent, setFilePresent] = useState(false);
  function fileInputChange(e){
    if(e.target.files){
      setFilePresent(true);
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      document.querySelector('.create-image').src = imageUrl;
    }
    
  }
  return(
    <div className='create-container-page'>
      <div className= "create-container">
      
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
        <button className='post-submit-button'>Submit</button>
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