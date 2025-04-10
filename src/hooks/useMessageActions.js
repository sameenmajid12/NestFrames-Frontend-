import { useContext } from "react";
import { UserContext } from "../components/Main Page/Contexts/UserContext";
import { AuthContext } from "../components/Main Page/Contexts/AuthContext";
import { NotificationContext } from "../components/Main Page/Contexts/NotificationContext";
import { useNavigate } from "react-router-dom";

function useMessageActions() {
  const { user, setUser } = useContext(UserContext);
  const { token } = useContext(AuthContext);
  const { addSentNotification } = useContext(NotificationContext);
  const navigate = useNavigate();
  const getMessages = async(conversationId, setMessageList)=>{
      try{
        const response = await fetch(`http://localhost:3002/messages/${conversationId}/getMessages`,{
          method:"GET",
          headers:{
            "Authorization":`Bearer ${token}`
          }
        });
        if(!response.ok){
          setError(true);
          return false;
        }
        const data = await response.json();
        setMessageList(data);
        return true;
      }
      catch(error){
        setError(true);
        return false;
      }
    }
  const messageFriend = async (friendId) => {
    try {
      const response = await fetch(
        `http://localhost:3002/messages/message/${friendId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        addSentNotification(false, data.message);
      }

      if (data.conversation && data.conversation._id) {
        if (response.status === 201) {
          setUser((prev) => ({
            ...prev,
            conversations: [...prev.conversations, data.conversation],
          }));
        }
        navigate(`/messages/${data.conversation._id}`);
      } else {
        throw new Error("Conversation not found.");
      }
    } catch (error) {
      addSentNotification(false, error.message);
    }
  };
  
  const handleAddFriendToMessages = async (friend) => {
    try {
      const friendId = friend[0]._id;
      const response = await fetch(
        `http://localhost:3002/Messages/message/${friendId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        addSentNotification(false, data.message);
      }
      if (response.status == 201) {
        setUser((prev) => ({
          ...prev,
          conversations: [...prev.conversations, data.conversation],
        }));
        navigate(`/Messages/${data.conversation._id}`);
      } else {
        navigate(`/Messages/${data.conversation._id}`);
      }
    } catch (error) {
      addSentNotification(false, error.message);
    }
  };
  return {
    messageFriend,
    getMessages,
    handleAddFriendToMessages,
  };
}

export default useMessageActions;
