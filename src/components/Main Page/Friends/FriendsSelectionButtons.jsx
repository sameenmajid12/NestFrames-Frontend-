import FriendsCSS from '../../../styles/friends.module.css';
import { Link, useLocation, useOutletContext } from 'react-router-dom';
import Search from '../Utils/Search';
function FriendsSelectionButtons({active, setActive, setFriends, screen1000}){
  return(
    <div className={FriendsCSS.friendsButtonsContainer}>
      <div className={FriendsCSS.friendsButtons}>
        <Link to="/friends">
          <button className={`${FriendsCSS.button} ${active==='friends'?FriendsCSS.active:''}`}>Friends</button>
        </Link>
       <Link to="/friends/suggested">
        <button className={`${FriendsCSS.button} ${active==='suggested'?FriendsCSS.active:''}`}>Suggested</button>
       </Link>
       <Link to="/friends/requests">
        <button className={`${FriendsCSS.button} ${active==='Requests'?FriendsCSS.active:''}`}>Requests</button>
       </Link>
        
      </div>
      {active==="friends"?<div className={FriendsCSS.searchInput}><Search setFriends={setFriends} selector="friend"/></div>:''}
    </div>
    
  );
}

export default FriendsSelectionButtons;