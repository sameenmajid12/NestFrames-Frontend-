import FriendsCSS from '../../../styles/friends.module.css';
import { Link, useLocation, useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Search from '../Main/Search';
function FriendsSelectionButtons({active, setActive, setFriends, screen1000}){
  const location = useLocation().pathname.split("/")[2] || "";
  return(
    <div className={FriendsCSS.friendsButtonsContainer}>
      <div className={FriendsCSS.friendsButtons}>
        <Link to="/friends">
          <button className={`${FriendsCSS.button} ${active==='Friends'?FriendsCSS.active:''}`} onClick={()=>{setActive('Friends')}} >Friends</button>
        </Link>
       <Link to="/friends/suggested">
        <button onClick={()=>{setActive('Suggested')}} className={`${FriendsCSS.button} ${active==='Suggested'?FriendsCSS.active:''}`}>Suggested</button>
       </Link>
       <Link to="/friends/requests">
        <button className={`${FriendsCSS.button} ${active==='Requests'?FriendsCSS.active:''}`} onClick={()=>{setActive('Requests')}} >Requests</button>
       </Link>
        
      </div>
      {location===""?<div className={FriendsCSS.searchInput}><Search setFriends={setFriends} selector="friend"/></div>:''}
    </div>
    
  );
}

export default FriendsSelectionButtons;