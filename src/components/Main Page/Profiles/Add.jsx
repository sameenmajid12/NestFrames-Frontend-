import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../AuthContext";

function Add({user, setUser}){
  const receiverUsername = useParams().username;
  const {token} = useContext(AuthContext);
  const sendRequest = async()=>{
    const response = await fetch(`http://localhost:3002/users/${receiverUsername}/add`,{
      method:"POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization":`Bearer ${token}`
      },
      body:JSON.stringify({senderId:user._id,receiverUsername:receiverUsername})
    });
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