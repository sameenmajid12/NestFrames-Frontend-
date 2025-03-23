import { useContext, useEffect, useRef, useState } from "react";
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
import { handleAddFriendToMessages } from "../Utils/messages";
import MessagesEmptyState from "./MessagesEmptyState";
function Messages() {
  const { socket } = useContext(SocketContext);
  const [messageThreads, setMessageThreads] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [friendListVisibility, setFriendListVisibility] = useState(false);
  const [loading, setLoading] = useState(true);
  const conversationContainer = useRef(null);
  const { user } = useContext(UserContext);
  const { screen1000 } = useOutletContext();
  const { getMessages, getConversation } = useMessageActions();
  const location = useLocation();
  useEffect(() => {
    getMessages(setMessageThreads);
    setLoading(false);
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
          if (activeConversation?._id === conversation._id) {
            setActiveConversation((prev) => ({
              ...prev,
              messages: [...prev.messages, message],
            }));
          }

          setMessageThreads((prevThreads) => {
            const conversationIndex = prevThreads.findIndex(
              (thread) => thread._id === conversation._id
            );
            console.log(conversationIndex);
            let newThreads = prevThreads;
            if (conversationIndex !== undefined) {
              const firstThread = newThreads[0];
              if (firstThread._id !== conversation._id) {
                newThreads.splice(conversationIndex, 1);
                newThreads.unshift(conversation);
              }
            }
            return newThreads;
          });
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
  useEffect(() => {
    if (messageThreads && activeConversation) {
      setMessageThreads((prev) =>
        prev.map((conversation) => {
          return conversation._id === activeConversation._id
            ? activeConversation
            : conversation;
        })
      );
    }
  }, [activeConversation]);
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
              setMessageThreads,
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
