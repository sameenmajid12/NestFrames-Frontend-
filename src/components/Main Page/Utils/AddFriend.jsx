import { useContext, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { UserContext } from "../Contexts/UserContext";
import { NotificationContext } from '../Contexts/NotificationContext';
import { SocketContext } from "../Contexts/SocketContext";
function AddFriend({stylingClass, receiverUsername}){
  const {addSentNotification} = useContext(NotificationContext);
  const {token} = useContext(AuthContext);
  const {socket} = useContext(SocketContext);
  const {user,setUser} = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const sendRequest = async()=>{
    setLoading(true);
    const response = await fetch(`http://localhost:3002/friends/${receiverUsername}/add`,{
      method:"POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization":`Bearer ${token}`
      },
      body:JSON.stringify({senderId:user._id,receiverUsername:receiverUsername})
    });
    if(response.ok){
      console.log(user.profilePic);
      addSentNotification(true, `Friend request sent to ${receiverUsername}!`);
      socket.emit("notification",{receiverUsername:receiverUsername, sender:user, message:`You have a new friend request from ${user.username}!`,createdAt:Date.now(), read:false, image:user.profilePic});
      setLoading(false);
    }
    else{
      setLoading(false);
      addSentNotification(false, "Request could not be sent!")
    }
    const data = await response.json();
    const friend = data.receiver;
    const newFriendRequests = [...user.friendRequestsSent, friend];
    setUser(prev=>({...prev, friendRequestsSent:newFriendRequests}));
  }
  return(
    <button onClick={sendRequest} className={stylingClass || ""}>{!loading?'Add':<div className="add-loader"></div>}</button>
  )
}

export default AddFriend;