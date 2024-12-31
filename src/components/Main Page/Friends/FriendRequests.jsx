import { useContext,useState } from "react";
import { UserContext } from "../../UserContext";
import FriendsCSS from '../../../styles/friends.module.css';
import FriendsSelectionButtons from "./FriendsSelectionButtons";
import { useOutletContext } from "react-router-dom";

function FriendRequests(){
  const { user,setUser } = useContext(UserContext);
  const {requests,setFriends, setRequests} = useOutletContext();
  async function handleRequest(e){
    const requestElement = e.target.closest(`.${FriendsCSS.request}`);
    const username = requestElement.querySelector(`.${FriendsCSS.username}`).dataset.username;
    const userId = user._id;
    const response = await fetch(`http://localhost:3002/users/${userId}/accept-request`,{
      method:"PUT",
      body:JSON.stringify({username}),
      headers: {
        "Content-Type": "application/json",
      }
    })
    const {status} = response;
    if(status===200||status===409){
      const data = await response.json();
      const friend = data.sender;
      const updatedFriends = [...user.friends, friend];
      const updatedRequests = requests.filter((req)=>req.username!==friend.username);
      setRequests(updatedRequests);
      if(status===200){
        setFriends(updatedFriends);
        setUser(prev=>({...prev, friends:updatedFriends, friendRequestsReceived:updatedRequests}));
      }
      else{
        setUser(prev=>({...prev, friendRequestsReceived:updatedRequests}));
      }
    }
    else{

    }
  }
  return (
      <div className={FriendsCSS.requestContainer}>
        
        {requests.length===0?<div>No Friend Requests</div>:requests.map((request, index) => {
          return (
            <div key={index} className={FriendsCSS.request}>
              <div className={FriendsCSS.requestUserInfo}>
                <img className={FriendsCSS.requestUserImage} src={request.profilePic?request.profilePic.fileUrl:'../assets/default-avatar.png'}/>
                <div>
                  <h2 className={FriendsCSS.name}>{request.fullname}</h2>
                  <p className={FriendsCSS.username} data-username={request.username}>@{request.username}</p>
                </div>
              </div>
              <div className={FriendsCSS.requestButtons}>
                <button className={FriendsCSS.ignoreButton}>Ignore</button>
                <button onClick={(e)=>{handleRequest(e)}}className={FriendsCSS.acceptButton}>Accept</button>
              </div>
            </div>
          )
        })}
      </div>

    
  )
}

export default FriendRequests;  