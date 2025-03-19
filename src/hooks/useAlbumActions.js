import { useContext, useState } from "react";
import { UserContext } from "../components/Main Page/Contexts/UserContext";
import { NotificationContext } from "../components/Main Page/Contexts/NotificationContext";
import { AuthContext } from "../components/Main Page/Contexts/AuthContext";

function useAlbumActions() {
  const { user, setUser } = useContext(UserContext);
  const { addSentNotification } = useContext(NotificationContext);
  const { token } = useContext(AuthContext);


  const sendRequest = async (albumId) => {
    const response = await fetch(
      `https://localhost:3002/albums/${albumId}/send-request`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user._id }),
      }
    );
    const data = await response.json();
    if (response.ok) {
      addSentNotification(true, data.message);
    } else {
      addSentNotification(false, data.message);
    }
  }; //Sent from a user not in the album


  const sendInvitation = async (users, albumId) => {
    let userIds = [];
    users.forEach((user) => {
      userIds.push(user._id);
    });
    const response = await fetch(
      `http://localhost:3002/albums/${albumId}/send-invite`,
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
  };//Accept collaboration invite from user in an album


  const acceptRequest = async (albumId, userId, setAlbum) => {
    const response = await fetch(
      `http://localhost:3002/albums/${albumId}/accept-request`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: userId }),
      }
    );
    const data = await response.json();
    if (response.ok) {
      addSentNotification(true, data.message);
      setAlbum((prev) => ({
        ...prev,
        users: [...prev.users, data.user],
        userRequests: prev.userRequests.filter(
          (req) => req._id.toString() !== data.user._id.toString()
        ),
      }));
    } else {
      addSentNotification(false, data.message);
    }
  };//Accept collaboration request from user not in an album
  

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
  };//Decline collaboration invitation from user in an album


  const declineRequest = async(albumId, userId, setAlbum) => {
    const response = await fetch(
      `http://localhost:3002/albums/${albumId}/decline-request`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: userId }),
      }
    );
    const data = await response.json();
    if (response.ok) {
      addSentNotification(true, data.message);
      setAlbum((prev) => ({
        ...prev,
        userRequests: prev.userRequests.filter(
          (req) => req._id.toString() !== data.user._id.toString()
        ),
      }));
    } else {
      addSentNotification(false, data.message);
    }
  };//Decline collaboration request from user not in an album


  const likeAlbum = async (albumId, setAlbum) => {
    const response = await fetch(
      `http://localhost:3002/albums/${albumId}/like`,
      {
        method: "PATCH",
        body: JSON.stringify({ userId: user._id }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    if (response.status === 201) {
      setAlbum((prev) => ({
        ...prev,
        likedBy: [...prev.likedBy, data.user._id],
      }));
    } else if (response.status === 200) {
      setAlbum((prev) => ({
        ...prev,
        likedBy: prev.likedBy.filter(
          (liker) => liker.toString() !== data.user._id.toString()
        ),
      }));
    } else {
      addSentNotification(false, data.message);
    }
  };


  const deleteAlbum = async (albumId) => {
    const response = await fetch(`http://localhost:3002/albums/${albumId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      addSentNotification(true, data.message);
    } else {
      addSentNotification(false, data.message);
    }
  };

  return {
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
