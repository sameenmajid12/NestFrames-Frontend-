import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { NotificationContext } from '../../NotificationContext';
import { SocketContext } from "../../SocketContext";
function Add({user, setUser}){
  const {addNotification} = useContext(NotificationContext);
  const receiverUsername = useParams().username;
  const {token} = useContext(AuthContext);
  const {socket} = useContext(SocketContext);
  const sendRequest = async()=>{
    const response = await fetch(`http://localhost:3002/users/${receiverUsername}/add`,{
      method:"POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization":`Bearer ${token}`
      },
      body:JSON.stringify({senderId:user._id,receiverUsername:receiverUsername})
    });
    if(response.ok){
      addNotification(true, "Friend request sent!"); 
      socket.emit("notification",{receiverUsername:receiverUsername, message:"You have a new friend request!",success:true});
    }
    else{
      addNotification(false, "Request could not be sent!")
    }
    const data = await response.json();
    const friend = data.receiver;
    const newFriendRequests = [...user.friendRequestsSent, friend];
    setUser(prev=>({...prev, friendRequestsSent:newFriendRequests}));
  }
  return(
    <button onClick={sendRequest}className="profile-button">Add</button>
  )
}

export default Add;