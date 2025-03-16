import FriendsCSS from '../../../styles/friends.module.css';
import { useOutletContext } from "react-router-dom";
import useFriendsActions from "../../../hooks/useFriendsActions";
function FriendRequests(){
  const {requests} = useOutletContext();
  const {acceptRequest, ignoreRequest} = useFriendsActions(); 
  return (
      <div className={FriendsCSS.requestContainer}>
        
        {requests.length===0?<div>No Friend Requests</div>:requests.map((request, index) => {
          return (
            <div key={index} className={FriendsCSS.request}>
              <div className={FriendsCSS.requestUserInfo}>
                <img className={FriendsCSS.requestUserImage} src={request.profilePic?request.profilePic.fileUrl:'../assets/default-avatar.png'}/>
                <div>
                  <h2 className={FriendsCSS.name}>{request.fullname}</h2>
                  <p className={FriendsCSS.username}>@{request.username}</p>
                </div>
              </div>
              <div className={FriendsCSS.requestButtons}>
                <button onClick={()=>ignoreRequest(request.username)} className={FriendsCSS.ignoreButton}>Ignore</button>
                <button onClick={()=>acceptRequest(request.username)}className={FriendsCSS.acceptButton}>Accept</button>
              </div>
            </div>
          )
        })}
      </div>

    
  )
}

export default FriendRequests;  