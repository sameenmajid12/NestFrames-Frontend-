import { UserContext } from "../../UserContext";
import { useContext } from "react";
import FriendsCSS from '../../../styles/friends.module.css'

function FriendsList(){
  const {user} = useContext(UserContext);
  const friends = user.friends;
  return(
    friends.map((friend, index)=>{
    return(
    <div key={index} className={FriendsCSS.friend}>
      <img className={FriendsCSS.friendImage} src='./assets/me.jpg'></img>
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
export default FriendsList