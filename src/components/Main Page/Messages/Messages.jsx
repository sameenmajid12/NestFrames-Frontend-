import { useContext, useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import MessagesCSS from "../../../styles/messages.module.css";
import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";
import SelectorList from '../Main/SelectorList'
function Messages() {
  const [searchTerm, setSearchTerm] = useState("");
  const [socketConnection, setSocketConnection] = useState(null);
  const [messageThreads, setMessageThreads] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [friendListVisibility, setFriendListVisibility] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(()=>{
    const getConvo=async()=>{
      if(location.pathname.split('/')[2]){
        const conversationId = location.pathname.split('/')[2];
        const response = await fetch(`http://localhost:3002/Messages/Conversation/${conversationId}`);
        const conversation = await response.json();
        if(conversation){
          setActiveConversation(conversation);
        }
      }
    }
    getConvo();
  },[location]);
  useEffect(() => {
    document.body.className = "body-default";

    const socket = io(`http://localhost:3002`);
    setSocketConnection(socket);

    const fetchConversations = async () => {
      const response = await fetch(
        `http://localhost:3002/Messages/${user._id}`
      );
      const conversations = await response.json();
      setMessageThreads(conversations);
    };

    fetchConversations();

    return () => {
      socket.disconnect();
    };
  }, [user._id, user.conversations]);
  const toggleListVisibility = ()=>{
    setFriendListVisibility(prev=>!prev);
  }

  const handleJoinConversation = (conversation) => {
    if (socketConnection) {
      socketConnection.emit("joinRoom", conversation);
      console.log(`Connected to conversation ${conversation._id}`);
    }
  };


  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const getLastMessage = (dateNow) => {
    const now = new Date(dateNow);
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours %= 12;
    hours = hours === 0 ? 12 : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    const timeString = `${hours}:${minutes}`;
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
    const {convoExists} = convoData;
    conversation = convoData.conversation;
    if (
      friend &&
      !messageThreads.some(
        (thread) =>
          (thread.user2.username=== friendUsername || thread.user1.username=== friendUsername) 
      )
    ) {

      let updatedConversations;
      if (convoExists) {
        console.log(convoExists);
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
      console.log(conversation);
      setMessageThreads(updatedConversations);
      navigate(`/Messages/${conversation._id}`);
      handleJoinConversation(conversation);
      setActiveConversation(conversation);


    } else {
      navigate(`/Messages/${conversation._id}`);
      handleJoinConversation(conversation);
      setActiveConversation(conversation);
    }

    setFriendListVisibility(false);
  };
  const formatMessage = (message)=>{
    if(message.length>30){
      return message.substring(0,30)+"..."
    }
    return message;
  }
  return (
    <>
    <div className={MessagesCSS.messagesPageContainer}>
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
                handleJoinConversation(conversation);
                setActiveConversation(conversation);
              }}
              key={conversation._id}
              className={`${MessagesCSS.threads} ${activeConversation?activeConversation._id===conversation._id?MessagesCSS.activeConversation:'':''}`}
            >
              <div className={MessagesCSS.activeLine}></div>
              <div className={MessagesCSS.threadReceiverInfo}>
                <img
                  src={
                    conversation[
                      conversation.user1.username === user.username
                        ? "user2"
                        : "user1"
                    ].profilePic?conversation[
                      conversation.user1.username === user.username
                        ? "user2"
                        : "user1"
                    ].profilePic.fileUrl:'/assets/default-avatar.png'
                  }
                ></img>
                <div className={MessagesCSS.threadReceiverText}>
                  <p
                    className={MessagesCSS.threadReceiverUsername}
                  >
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
                      ? formatMessage(conversation.messages[conversation.messages.length - 1]
                          .text)
                      : ""}
                  </p>
                  <p className={MessagesCSS.messageTime}>
                  {conversation.messages.length !== 0
                    ? getLastMessage(
                        conversation.messages[conversation.messages.length - 1]
                          .createdAt
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
      {activeConversation?<Outlet
        context={{
          conversation: activeConversation,
          setConversation: setActiveConversation,
          socketConnection,
          user,
          messageThreads,
          setMessageThreads,
        }}
      />:<div className={MessagesCSS.messageDefaultPage}>
          <div className={MessagesCSS.messageDefaultContainer}>
            <img src="/assets/messageIcon.png"></img>
            <p>Start a chat<br></br> and <br></br>connect instantly</p>
            <button>Send message</button>
          </div>
        </div>}
      </div>
      {friendListVisibility && <SelectorList toggleVisibility={toggleListVisibility} onConfirm={handleAddFriendToMessages}/>}
     </>
  );
}

export default Messages;
