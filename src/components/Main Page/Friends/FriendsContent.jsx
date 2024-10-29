import FriendsCSS from '../../../styles/friends.module.css'
import FriendsSelectionButtons from './FriendsSelectionButtons';
import FriendsList from './FriendsList.jsx';
function FriendsContent(){  
  return(<div className={FriendsCSS.friendsPageContainer}>
    <div className={FriendsCSS.friendsHeader}>
      <h1 className={FriendsCSS.header}>My Friends</h1>
    </div>
    <FriendsSelectionButtons/>
    <div className={FriendsCSS.friendsContainer}>
    <FriendsList/>
    </div>
    </div>
  )
 
}

export default FriendsContent;