import { useContext, useState } from "react";
import { UserContext } from "../components/Main Page/Contexts/UserContext";
import { AuthContext } from "../components/Main Page/Contexts/AuthContext";
function useFriendsActions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, setUser } = useContext(UserContext);
  const { token } = useContext(AuthContext);
  const sendRequest = async (username) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3002/friends/${username}/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userUsername: user.username }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
        throw new Error(errorData.message || "Failed to send request");
      }
      const data = await response.json();
      addSentNotification(true, `Friend request sent to ${username}!`);
      socket.emit("notification",{receiverUsername:receiverUsername, sender:user, message:`You have a new friend request from ${user.username}!`,createdAt:Date.now(), read:false, image:user.profilePic});
      setUser((prev)=>({...prev, friendRequestsSent:[...prev.friendRequestsSent, data.receiver]}));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const acceptRequest = async (username) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3002/friends/${username}/accept-request`,
        {
          method: "PUT",
          body: JSON.stringify({ userUsername: user.username }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
        throw new Error(errorData.message || "Failed to accept request");
      }

      const data = await response.json();
      setUser((prev) => ({
        ...prev,
        friends: [...prev.friends, data.sender],
        friendRequestsReceived: prev.friendRequestsReceived.filter(
          (request) => request.username !== username
        ),
      }));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const ignoreRequest = async (username) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3002/friends/${username}/ignore-request`,
        {
          method: "PUT",
          body: JSON.stringify({ userUsername: user.username }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 204) {
        setUser((prev) => ({
          ...prev,
          friendRequestsReceived: prev.friendRequestsReceived.filter(
            (request) => request.username !== username
          ),
        }));
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return { ignoreRequest, sendRequest, acceptRequest, loading, error };
}
export default useFriendsActions;
