import { useContext } from "react";
import { UserContext } from "../components/Main Page/Contexts/UserContext";
import { AuthContext } from "../components/Main Page/Contexts/AuthContext";
import { NotificationContext } from "../components/Main Page/Contexts/NotificationContext";
import { useNavigate } from "react-router-dom";

function useMessageActions(){
  const {user, setUser} = useContext(UserContext);
  const {token} = useContext(AuthContext);
  const {addSentNotification} = useContext(NotificationContext);
  const navigate = useNavigate();
  const getMessages = async(setMessageThreads)=>{
    try{
      const response = await fetch(`http://localhost:3002/messages/conversations`,{
        method:"GET",
        headers:{
          "Authorization":`Bearer ${token}`
        }
      });
      const data = await response.json();
      if(response.ok && data.conversations){
        console.log(data.conversations);
        setMessageThreads(data.conversations);
      }
      else{
        addSentNotification(false, data.message);
      }
    }
    catch(error){
      console.error(error);
      addSentNotification(false, error.message);
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
  const getConversation = async(conversationId, setActiveConversation)=>{
    try{
      const response = await fetch(`http://localhost:3002/Messages/Conversation/${conversationId}`,{
        method:"GET",
        headers:{
          "Authorization":`Bearer ${token}`
        }
      })
      const data = await response.json();
      if(response.ok){
        setActiveConversation(data.conversation);
      }
      else{
        addSentNotification(false, data.message);
      }
    }
    catch(error){
      addSentNotification(false, error.message);
    }
  }
  return {messageFriend, getMessages, getConversation};
}

export default useMessageActions;