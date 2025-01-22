import { useContext, useState } from "react";
import { AuthContext } from "../../AuthContext";
import { UserContext } from "../../UserContext";
import { NotificationContext } from '../../NotificationContext';
import { SocketContext } from "../../SocketContext";
function Add({stylingClass, receiverUsername}){
  const {addNotification} = useContext(NotificationContext);
  const {token} = useContext(AuthContext);
  const {socket} = useContext(SocketContext);
  const {user,setUser} = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const sendRequest = async()=>{
    setLoading(true);
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
      setLoading(false);
    }
    else{
      setLoading(false);
      addNotification(false, "Request could not be sent!")
    }
    const data = await response.json();
    const friend = data.receiver;
    const newFriendRequests = [...user.friendRequestsSent, friend];
    setUser(prev=>({...prev, friendRequestsSent:newFriendRequests}));
  }
  return(
    <button onClick={sendRequest}className={stylingClass || ""}>{!loading?'Add':<div className="add-loader"></div>}</button>
  )
}

export default Add;