import { useContext, useState } from "react";
import { UserContext } from "../components/Main Page/Contexts/UserContext";
import { NotificationContext } from "../components/Main Page/Contexts/NotificationContext";
import { AuthContext } from "../components/Main Page/Contexts/AuthContext";

function useAlbumActions() {
  const { user, setUser } = useContext(UserContext);
  const { addSentNotification } = useContext(NotificationContext);
  const { token } = useContext(AuthContext);
  const createAlbum = () => {};
  const sendRequest = () => {}; //Sent from a user not in the album
  const sendInvitation = async (users, albumId) => {
    let userIds = [];
    users.forEach((user) => {
      userIds.push(user._id);
    });
    const response = await fetch(
      `http://localhost:3002/albums/${albumId}/invite-collaborators`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userIds: userIds }),
      }
    );
    const data = await response.json();
    if (response.ok) {
      addSentNotification(true, data.message);
    } else {
      addSentNotification(false, data.message);
    }
  }; //Sent to a user not in the album

  const acceptInvitation = async (requestId) => {
    const response = await fetch(
      `http://localhost:3002/albums/${requestId}/accept-invitation`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: user._id }),
      }
    );
    const data = await response.json();
    if (response.ok) {
      setUser((prev) => ({
        ...prev,
        albumRequests: prev.albumRequests.filter(
          (request) => request._id.toString() !== requestId
        ),
        albums: [...prev.albums, { ...data.album }],
      }));
      addSentNotification(true, data.message);
    } else if (response.status === 400) {
      setUser((prev) => ({
        ...prev,
        albumRequests: prev.albumRequests.filter(
          (request) => request._id.toString() !== requestId
        ),
      }));
      addSentNotification(false, data.message);
    } else {
      addSentNotification(false, data.message);
    }
  };

  const acceptRequest = () => {};
  const declineInvitation = async (requestId) => {
    const response = await fetch(
      `http://localhost:3002/albums/${requestId}/decline-invitation`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user._id }),
      }
    );
    const data = await response.json();
    if (response.ok) {
      setUser((prev) => ({
        ...prev,
        albumRequests: prev.albumRequests.filter(
          (request) => request._id.toString() !== requestId
        ),
      }));
      addSentNotification(true, data.message);
    } else {
      addSentNotification(false, data.message);
    }
  };
  const declineRequest = () => {};
  const likeAlbum = async(albumId, setAlbum) => {
    const response = await fetch(`http://localhost:3002/albums/${albumId}/like`,{
      method:'PATCH',
      body: JSON.stringify({userId:user._id}),
      headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      }
    });
    const data = await response.json();
    if(response.status===201){
      setAlbum((prev)=>({...prev, likedBy:[...prev.likedBy,data.user._id]}));
    }
    else if(response.status===200){
      setAlbum((prev)=>({...prev, likedBy: prev.likedBy.filter((liker)=>liker.toString()!==data.user._id.toString())}))
    }
    else{
      addSentNotification(false, data.message)
    }
  };
  const deleteAlbum = () => {};
  return {
    createAlbum,
    sendInvitation,
    sendRequest,
    acceptRequest,
    acceptInvitation,
    declineRequest,
    declineInvitation,
    likeAlbum,
    deleteAlbum,
  };
}

export default useAlbumActions;
