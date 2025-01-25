import FriendsContent from "../../Friends/FriendsContent";
import { UserContext } from "../../Contexts/UserContext";
import { useContext } from "react";
import { Link, useOutletContext } from "react-router-dom";
function ProfileFriends() {
  const {user} = useContext(UserContext);
  const {profile} = useOutletContext();
  const friends = profile.friends;
  const checkUser = () =>{
    return (user.username===profile.username);
  }
  const isUser = checkUser();
  const checkFriend = (friend) => {
    return (user.friends.find(userFriend => userFriend.username===friend.username))
  }

  return (
    <FriendsContent friendProp={friends}/>
  );
}

export default ProfileFriends;
