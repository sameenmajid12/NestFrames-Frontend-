  import '../../../styles/utils.css'
  function MessageMenu({conversation, toggleVisibility}){
    return(<div className="menu-container">
      <p>View Profile</p>
      <p>Delete Conversation</p>
      <p onClick={()=>toggleVisibility}>Cancel</p>
    </div>)
  }
  export default MessageMenu;