import { useContext, useEffect, useRef, useState } from "react";
import {
  Outlet,
  useLocation,
  useNavigate,
  useOutlet,
  useOutletContext,
} from "react-router-dom";
import { UserContext } from "../../UserContext";
import MessagesCSS from "../../../styles/messages.module.css";
import SelectorList from "../Main/SelectorList";
import { SocketContext } from "../../SocketContext";
function Messages() {
  const [searchTerm, setSearchTerm] = useState("");
  const { socket } = useContext(SocketContext);
  const [messageThreads, setMessageThreads] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [friendListVisibility, setFriendListVisibility] = useState(false);
  const conversationContainer = useRef(null);
  const { user } = useContext(UserContext);
  const { screen1000 } = useOutletContext();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const getConvo = async () => {
      if (location.pathname.split("/")[2]) {
        const conversationId = location.pathname.split("/")[2];
        const response = await fetch(
          `http://localhost:3002/Messages/Conversation/${conversationId}`
        );
        const conversation = await response.json();
        if (conversation) {
          setActiveConversation(conversation);
        }
      }
    };
    getConvo();
  }, [location]);
  useEffect(() => {
    document.body.className = "body-default";
    const fetchConversations = async () => {
      const response = await fetch(
        `http://localhost:3002/Messages/${user._id}`
      );
      const conversations = await response.json();
      setMessageThreads(conversations);
    };
    fetchConversations();
    return () => {
      setActiveConversation(null);
    };
  }, [user._id, user.conversations]);
  useEffect(() => {
    if (!socket) return;

    const addToMessageList = (message, conversation) => {
      if (message.text.length < 600) {
        if (conversation) {
          // Update active conversation
          if (activeConversation?._id === conversation._id) {
            setActiveConversation((prev) => ({
              ...prev,
              messages: [...prev.messages, message],
            }));
          }

          // Update message threads
          setMessageThreads((prevThreads) => {
            let conversationIndex;
            const newThreads = prevThreads.map((thread, index) => {
              if (thread._id === conversation._id) {
                conversationIndex = index;
                return { ...thread, messages: [...thread.messages, message] };
              }
              return thread;
            });

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
  }, [socket, messageThreads, activeConversation]); // Add dependencies

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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const getLastMessage = (lastTime) => {
    const messageTime = new Date(lastTime);
    if (Date.now() - messageTime.getTime() >= 1000 * 60 * 60 * 24) {
      return (
        Math.floor(
          (Date.now() - messageTime.getTime()) / (1000 * 60 * 60 * 24)
        ) + "d"
      );
    }
    let hours = messageTime.getHours();
    let minutes = messageTime.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours %= 12;
    hours = hours === 0 ? 12 : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    const timeString = `${hours}:${minutes}${ampm}`;
    return timeString;
  };

  const handleAddFriendToMessages = async (friend) => {
    const username = user.username;
    const friendUsername = friend[0].username;
    const response = await fetch(
      `http://localhost:3002/Messages/${username}/with/${friendUsername}`
    );
    let conversation = null;
    const convoData = await response.json();
    const { convoExists } = convoData;
    conversation = convoData.conversation;
    if (
      friend &&
      !messageThreads.some(
        (thread) =>
          thread.user2.username === friendUsername ||
          thread.user1.username === friendUsername
      )
    ) {
      let updatedConversations;
      if (convoExists) {
        updatedConversations = [...messageThreads, conversation];
      } else {
        const response = await fetch(
          `http://localhost:3002/Messages/${friend[0]._id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ senderId: user._id }),
          }
        );
        conversation = await response.json();
        updatedConversations = [...messageThreads, conversation];
      }
      setMessageThreads(updatedConversations);
      navigate(`/Messages/${conversation._id}`);
      setActiveConversation(conversation);
    } else {
      navigate(`/Messages/${conversation._id}`);
      setActiveConversation(conversation);
    }

    setFriendListVisibility(false);
  };
  const formatMessage = (message) => {
    if (message.length > 20) {
      return message.substring(0, 20) + "...";
    }
    return message;
  };
  const checkRead = (conversation) => {
    if (!conversation.messages || conversation.messages.length === 0) {
      return null;
    }
    let index = conversation.messages.length-1;
    while(index>=0){
      if(conversation.messages[index].sentBy!==user._id){
        console.log(conversation.messages[index].read);
        return conversation.messages[index].read;
      }
      index--;
    }
    return null;
  };
  return (
    <>
      <div className={MessagesCSS.messagesPageContainer}>
        {!screen1000 || !activeConversation ? (
          <div className={MessagesCSS.messagesFriendsSelector}>
            <div className={MessagesCSS.messagesHeaderContainer}>
              <div className={MessagesCSS.messagesFriendsHeader}>
                <h1>Messages</h1>
                <i
                  onClick={toggleListVisibility}
                  className={`fa-solid fa-pen-to-square ${MessagesCSS.addMessage}`}
                ></i>
              </div>
              <div className={MessagesCSS.searchMessage}>
                <i
                  className={`fa-solid fa-magnifying-glass ${MessagesCSS.searchIcon}`}
                ></i>
                <input
                  placeholder="Search Messages"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </div>

            <div
              id="conversationsContainer"
              className={MessagesCSS.messageThreadsContainer}
            >
              {messageThreads.map((conversation) => (
                <div
                  onClick={() => {
                    navigate(`/Messages/${conversation._id}`);
                    setActiveConversation(conversation);
                  }}
                  key={conversation._id}
                  className={`${MessagesCSS.threads} ${
                    activeConversation
                      ? activeConversation._id === conversation._id
                        ? MessagesCSS.activeConversation
                        : ""
                      : ""
                  }`}
                >
                  {checkRead(conversation)===false?<i class={`fa-solid fa-circle-dot ${MessagesCSS.unreadMessage}`}></i>:''}
                  <div className={MessagesCSS.activeLine}></div>
                  <div className={MessagesCSS.threadReceiverInfo}>
                    <img
                      src={
                        conversation[
                          conversation.user1.username === user.username
                            ? "user2"
                            : "user1"
                        ].profilePic
                          ? conversation[
                              conversation.user1.username === user.username
                                ? "user2"
                                : "user1"
                            ].profilePic.fileUrl
                          : "/assets/default-avatar.png"
                      }
                    ></img>
                    <div className={MessagesCSS.threadReceiverText}>
                      <p className={MessagesCSS.threadReceiverUsername}>
                        {
                          conversation[
                            conversation.user1.username === user.username
                              ? "user2"
                              : "user1"
                          ].fullname
                        }
                      </p>
                      <p className={MessagesCSS.lastMessageSent}>
                        {conversation.messages.length !== 0
                          ? formatMessage(
                              conversation.messages[
                                conversation.messages.length - 1
                              ].text
                            )
                          : ""}
                      </p>
                      <p className={MessagesCSS.messageTime}>
                        {conversation.messages.length !== 0
                          ? getLastMessage(
                              conversation.messages[
                                conversation.messages.length - 1
                              ].createdAt
                            )
                          : ""}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={MessagesCSS.addMoreMessages}>
              <i className="fa-solid fa-circle-plus"></i>
            </div>
          </div>
        ) : (
          ""
        )}
        {activeConversation ? (
          <Outlet
            context={{
              screen1000: screen1000,
              conversation: activeConversation,
              setConversation: setActiveConversation,
              socketConnection: socket,
              user,
              messageThreads,
              setMessageThreads,
              conversationContainer,
              scrollToBottom,
            }}
          />
        ) : (
          <div className={MessagesCSS.messageDefaultPage}>
            <div className={MessagesCSS.messageDefaultContainer}>
              <img src="/assets/messageIcon.png"></img>
              <p>
                Start a chat<br></br> and <br></br>connect instantly
              </p>
              <button>Send message</button>
            </div>
          </div>
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
