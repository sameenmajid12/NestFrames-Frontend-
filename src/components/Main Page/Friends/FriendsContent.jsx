import { UserContext } from "../../UserContext";
import { useContext } from "react";
import FriendsCSS from '../../../styles/friends.module.css'

function FriendsContent(){
  const {user} = useContext(UserContext);
  const friends = user?.friends || [];
  
  if (!friends || !friends.length) {  
    return <p>Loading friends...</p>;
  }

  return(
    friends.map((friend, index)=>{
    return(
    <div key={index} className={FriendsCSS.friend}>
      <img className={FriendsCSS.friendImage} src={friend.profilePic?friend.profilePic.fileUrl:'./assets/default-avatar.png'}></img>
      <div className={FriendsCSS.friendInfo}>
        <div>
          <h1 className={FriendsCSS.friendName}>{friend.fullname}</h1>
          <h2 className={FriendsCSS.friendUser}>{`@${friend.username}`}</h2>
        </div>
        <div>
          <button className={FriendsCSS.messageButton}>Message</button>
          <i className={`fa-solid fa-ellipsis-vertical fa-xl ${FriendsCSS.ellipsis}`} style={{color:'#444'}}></i>
          
        </div>
        
      </div>
      
    </div>)}))
}
export default FriendsContent;