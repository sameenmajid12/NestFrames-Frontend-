import { Outlet,Link } from 'react-router-dom';
import FriendsCSS from '../../../styles/friends.module.css';
import { useContext, useEffect,useState } from 'react';
import { UserContext } from '../../UserContext';
import FriendsSelectionButtons from './FriendsSelectionButtons';
function Friends(){
    useEffect(()=>{
      document.body.className = 'body-default';
    },[]);
    const {user} = useContext(UserContext);
    const [requests, setRequests] = useState(user.friendRequestsReceived);
    const [friends, setFriends] = useState(user.friends);
    const [active,setActive] = useState('Friends');
    return(
      
        <Outlet context={{requests: requests, setRequests: setRequests, friends: friends, setFriends: setFriends, active:active, setActive:setActive}}/>

  )
}

export default Friends;