import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Outlet, useLocation, useOutletContext } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";
import MessagesCSS from "../../../styles/messages.module.css";
import SelectorList from "../Utils/SelectorList";
import { SocketContext } from "../Contexts/SocketContext";
import useMessageActions from "../../../hooks/useMessageActions";
import ConversationList from "./ConversationList";
import MessagesEmptyState from "./MessagesEmptyState";
function Messages() {
  const { user, setUser } = useContext(UserContext);
  const { socket } = useContext(SocketContext);
  const [activeConversation, setActiveConversation] = useState(null);
  const [friendListVisibility, setFriendListVisibility] = useState(false);
  const [messageList, setMessageList] = useState(null);
  const [loading, setLoading] = useState(false);
  const [messageThreads, setMessageThreads] = useState(user.conversations);
  const conversationContainer = useRef(null);
  const { screen1000 } = useOutletContext();
  const { handleAddFriendToMessages, getMessages } = useMessageActions();
  const location = useLocation();
  useEffect(()=>{
    setMessageThreads(user.conversations);
  },[user.conversations]);
  useEffect(() => {
    if (messageThreads.length !== 0 && user.conversations.length !== 0) {
      setLoading(false);
    }
  }, [messageThreads]);
  useEffect(() => {
    document.body.className = "body-default";
    return () => {
      setActiveConversation(null);
    };
  }, []);

  useEffect(() => {
    const conversationId = location.pathname.split("/")[2];
    if (conversationId) {
      const conversation = messageThreads.find(
        (thread) => thread._id.toString() === conversationId
      );

      setActiveConversation(conversation);
      getMessages(conversationId, setMessageList);
    }
  }, [location]);

  useEffect(() => {
    if (!socket) return;
    const addToMessageList = (message, conversation, eventType) => {
      if (message.text.length < 600) {
        if (conversation) {
          if (
            activeConversation?._id.toString() === conversation._id.toString()
          ) {
            setMessageList((prev) => [...prev, message]);
          }
          setMessageThreads((prev) => {
            const convoIndex = prev.findIndex(
              (c) => c._id.toString() === conversation._id.toString()
            );
            let newThreads = [...prev];

            if (convoIndex !== -1) {
              const updatedThread = {
                ...prev[convoIndex],
                lastMessage: message,
              };
              if (
                eventType === "messageReceived" &&
                activeConversation._id.toString() ===
                  conversation._id.toString()
              ) {
                updatedThread.lastMessage = {
                  ...updatedThread.lastMessage,
                  read: true,
                };
                socket.emit("read", {
                  conversation: conversation,
                });
              }
              newThreads.splice(convoIndex, 1);
              newThreads.unshift(updatedThread);
            } else {
              newThreads.unshift({
                ...conversation,
                lastMessage: message,
              });
            }
            return newThreads;
          });
        }
      } else {
        throw new Error("Message too big");
      }
    };
    const handleMessageSent = (message, conversation) => {
      addToMessageList(message, conversation, "messageSent");
    };

    const handleMessageReceived = (message, conversation) => {
      addToMessageList(message, conversation, "messageReceived");
    };

    socket.on("messageSent", handleMessageSent);
    socket.on("messageReceived", handleMessageReceived);

    return () => {
      socket.off("messageSent", handleMessageSent);
      socket.off("messageReceived", handleMessageReceived);
    };
  }, [socket, activeConversation]);
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
              messageList,
              setMessageList,
              setMessageThreads,
            }}
          />
        ) : (
          <MessagesEmptyState />
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
