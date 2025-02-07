import '../../../styles/utils.css'
function PostMenu({toggleVisibility, post}){
  const handleNavAlbum=()=>{

  }
  const handleSave=()=>{

  }
  const handleHide=()=>{

  }
  return(<div className="menu-container">
    <p onClick={()=>handleNavAlbum}>Go to Album</p>
    <p onClick={()=>handleSave}>Save Post</p>
    <p onClick={()=>handleHide}>Hide Post</p>
    <p>Cancel</p>
  </div>)
}
export default PostMenu;