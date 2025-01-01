import FriendsCSS from '../../../styles/friends.module.css';
import { Link, useLocation, useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Search from '../Main/Search';
function FriendsSelectionButtons({active, setActive, setFriends}){
  const location = useLocation().pathname.split("/")[2] || "";
  return(
    <div className={FriendsCSS.friendsButtonsContainer}>
      <div className={FriendsCSS.friendsButtons}>
        <Link to="/friends">
          <button className={`${FriendsCSS.button} ${active==='Friends'?FriendsCSS.active:''}`} onClick={()=>{setActive('Friends')}} >Friends</button>
        </Link>
       <Link to="/friends/sent">
        <button onClick={()=>{setActive('Sent')}} className={`${FriendsCSS.button} ${active==='Sent'?FriendsCSS.active:''}`}>Groups</button>
       </Link>
       <Link to="/friends/requests">
        <button className={`${FriendsCSS.button} ${active==='Requests'?FriendsCSS.active:''}`} onClick={()=>{setActive('Requests')}} >Requests</button>
       </Link>
        
      </div>
      {location===""?<Search setFriends={setFriends} selector="friend"/>:''}
    </div>
    
  );
}

export default FriendsSelectionButtons;