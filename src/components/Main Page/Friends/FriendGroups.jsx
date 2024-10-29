import FriendsCSS from '../../../styles/friends.module.css';
import FriendsSelectionButtons from './FriendsSelectionButtons';
function FriendGroups(){
  return(
    <div className={FriendsCSS.friendsPageContainer}>
      <h1 className={FriendsCSS.friendRequestHeader}>Groups</h1>
      <FriendsSelectionButtons/>
    </div>
  )
}

export default FriendGroups;