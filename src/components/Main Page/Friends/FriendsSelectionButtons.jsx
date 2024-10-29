import FriendsCSS from '../../../styles/friends.module.css';
import { Link, useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';
function FriendsSelectionButtons(){
  const {active,setActive} = useOutletContext();
  return(
    <div className={FriendsCSS.friendsButtonsContainer}>
      <div className={FriendsCSS.friendsButtons}>
        <Link to="/Friends">
          <button className={`${FriendsCSS.button} ${active==='Friends'?FriendsCSS.active:''}`} onClick={()=>{setActive('Friends')}} >Friends</button>
        </Link>
       <Link to="/Friends/Groups">
        <button onClick={()=>{setActive('Groups')}} className={`${FriendsCSS.button} ${active==='Groups'?FriendsCSS.active:''}`}>Groups</button>
       </Link>
       <Link to="/Friends/Requests">
        <button className={`${FriendsCSS.button} ${active==='Requests'?FriendsCSS.active:''}`} onClick={()=>{setActive('Requests')}} >Requests</button>
       </Link>
        
      </div>
       <p className={FriendsCSS.sortText}>Sort by <span className={FriendsCSS.defaultText}>Default</span><i className={"fa-solid fa-caret-down " + FriendsCSS.arrowDown}></i></p>
    </div>
    
  );
}

export default FriendsSelectionButtons;