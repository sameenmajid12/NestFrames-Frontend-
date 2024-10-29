import { useContext } from "react"
import { UserContext } from "../../UserContext"
import { useParams } from "react-router-dom";

function Add(){
  const {user} = useContext(UserContext);
  const receiverUsername = useParams().username;
  const sendRequest = async()=>{
    fetch(`http://localhost:3002/users/${receiverUsername}/add`,{
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({senderId:user._id,receiverUsername:receiverUsername})
    })
  }
  return(
    <button onClick={sendRequest}className="profile-button">Add</button>
  )
}

export default Add;