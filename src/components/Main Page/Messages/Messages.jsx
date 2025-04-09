import { useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  Outlet,
  useLocation,
  useOutletContext,
} from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";
import MessagesCSS from "../../../styles/messages.module.css";
import SelectorList from "../Utils/SelectorList";
import { SocketContext } from "../Contexts/SocketContext";
import useMessageActions from "../../../hooks/useMessageActions";
import ConversationList from "./ConversationList";
import MessagesEmptyState from "./MessagesEmptyState";
function Messages() {
  const { socket } = useContext(SocketContext);
  const [activeConversation, setActiveConversation] = useState(null);
  const [friendListVisibility, setFriendListVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const conversationContainer = useRef(null);
  const { user, setUser } = useContext(UserContext);
  const { screen1000 } = useOutletContext();
  const { getConversation ,handleAddFriendToMessages } = useMessageActions();
  const location = useLocation();
  console.log(user);
  const messageThreads = useMemo(()=>{
    return user.conversations;
  },[user]);
  useEffect(()=>{
    if(messageThreads.length!==0 && user.conversations.length!==0){
      setLoading(false);
    }
  },[messageThreads])
  useEffect(() => {
    document.body.className = "body-default";
    return () => {
      setActiveConversation(null);
    };
  }, []);
  useEffect(() => {
      if(location.pathname.split("/")[2]){
        getConversation(location.pathname.split("/")[2], setActiveConversation);
      }
    
  }, [location]);
  
  useEffect(() => {
    if (!socket) return;
    const addToMessageList = (message, conversation) => {
      if (message.text.length < 600) {
        if (conversation) {
          if (activeConversation?._id.toString() === conversation._id.toString()) {
            setActiveConversation((prev) => ({
              ...prev,
              messages: [...prev.messages, message],
            }));
          }
          const conversationIndex = user.conversations.findIndex((thread)=>thread._id.toString() === conversation._id.toString());
          let newThreads = user.conversations;
          if(conversationIndex!==undefined){
            const firstThread = newThreads[0];
              if (firstThread._id.toString() !== conversation._id.toString()) {
                newThreads.splice(conversationIndex, 1);
                newThreads.unshift(conversation);
              }
              else{
                newThreads[0].messages =  [...newThreads[0].messages, message];
              }
          }
          setUser((prev)=>({...prev, conversations:newThreads}))
        }
      } else {
        throw new Error("Message too big");
      }
    };

    socket.on("messageSent", addToMessageList);
    socket.on("messageReceived", addToMessageList);

    return () => {
      socket.off("messageSent", addToMessageList);
      socket.off("messageReceived", addToMessageList);
    };
  }, [socket, messageThreads, activeConversation]);
  const scrollToBottom = () => {
    if (conversationContainer.current) {
      conversationContainer.current?.lastElementChild?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };
  const toggleListVisibility = () => {
    setFriendListVisibility((prev) => !prev);
  };
  return (
    <>
      <div className={MessagesCSS.messagesPageContainer}>
        <ConversationList
          screen1000={screen1000}
          activeConversation={activeConversation}
          toggleListVisibility={toggleListVisibility}
          messageThreads={messageThreads}
          setActiveConversation={setActiveConversation}
          user={user}
          loading={loading}
        />
        {activeConversation ? (
          <Outlet
            context={{
              screen1000: screen1000,
              conversation: activeConversation,
              setConversation: setActiveConversation,
              socket,
              user,
              messageThreads,
              conversationContainer,
              scrollToBottom,
            }}
          />
        ) : (
          <MessagesEmptyState/>
        )}
      </div>
      {friendListVisibility && (
        <SelectorList
          toggleVisibility={toggleListVisibility}
          onConfirm={handleAddFriendToMessages}
        />
      )}
    </>
  );
}

export default Messages;
