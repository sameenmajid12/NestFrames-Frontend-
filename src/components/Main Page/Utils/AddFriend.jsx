import { useContext, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { UserContext } from "../Contexts/UserContext";
import { NotificationContext } from '../Contexts/NotificationContext';
import { SocketContext } from "../Contexts/SocketContext";
import useFriendsActions from "../../../hooks/useFriendsActions";
function AddFriend({stylingClass, receiverUsername}){
  const {sendRequest, loading} = useFriendsActions();
  return(
    <button onClick={()=>sendRequest(receiverUsername)} className={stylingClass || ""}>{!loading?'Add':<div className="add-loader"></div>}</button>
  )
}

export default AddFriend;