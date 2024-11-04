import { useContext, useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import MessagesCSS from "../../../styles/messages.module.css";
import AddFriendToMessageList from "./AddFriendToMessageList";
import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";

function Messages() {
  // State variables
  const [searchTerm, setSearchTerm] = useState(""); // For searching messages
  const [socketConnection, setSocketConnection] = useState(null); // For socket connection
  const [messageThreads, setMessageThreads] = useState([]); // List of conversations
  const [activeConversation, setActiveConversation] = useState(null); // The currently active conversation
  const [isFriendListVisible, setIsFriendListVisible] = useState(false); // Controls friend list visibility
  // Context for user data
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Set body class
    document.body.className = "body-default";

    // Establish socket connection
    const socket = io(`http://localhost:3002`);
    setSocketConnection(socket);

    // Fetch conversations for the user
    const fetchConversations = async () => {
      const response = await fetch(
        `http://localhost:3002/Messages/${user._id}`
      );
      const conversations = await response.json();
      setMessageThreads(conversations);
    };

    fetchConversations();

    // Clean up socket connection when component unmounts
    return () => {
      socket.disconnect();
    };
  }, [user._id]);

  // Connect to a specific conversation
  const handleJoinConversation = (conversation) => {
    if (socketConnection) {
      socketConnection.emit("joinRoom", conversation);
      console.log(`Connected to conversation ${conversation._id}`);
    }
  };

  // User's friend list
  const friendList = user.friends;

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Add friend to message list or navigate to existing conversation
  const handleAddFriendToMessages = async (e) => {
    const { username } = e.target.dataset;
    const friend = friendList.find((f) => f.username === username);
    console.log(friend);
    const response = await fetch(
      `http://localhost:3002/Messages/${user.username}/with/${friend.username}`
    );
    const { convoExists, conversation } = await response.json();
    // Check if conversation already exists, if not, add a new conversation
    if (
      friend &&
      !messageThreads.some(
        (thread) =>
          (thread.user2.username || thread.user1.username) === username
      )
    ) {
      let updatedConversations;
      if (convoExists) {
        updatedConversations = [...messageThreads, conversation];
      } else {
        const response = await fetch(
          `http://localhost:3002/Messages/${friend.username}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ senderId: user._id }),
          }
        );
        updatedConversations = await response.json();
      }
      setMessageThreads(updatedConversations);
    } else {
      navigate(`/Messages/${friend.username}`);
    }

    setIsFriendListVisible(false);
  };

  return (
    <div className={MessagesCSS.messagesPageContainer}>
      {isFriendListVisible ? (
        <AddFriendToMessageList
          friends={friendList}
          setIsFriendListVisible={setIsFriendListVisible}
          addToMessages={handleAddFriendToMessages}
        />
      ) : (
        ""
      )}

      <div className={MessagesCSS.messagesFriendsSelector}>
        <div className={MessagesCSS.messagesHeaderContainer}>
          <div className={MessagesCSS.messagesFriendsHeader}>
            <h1>Messages</h1>
            <i
              onClick={() => setIsFriendListVisible(true)}
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
          className={MessagesCSS.conversationsContainer}
        >
          {messageThreads.map((conversation, index) => (
            <div
              onClick={() => {
                navigate(`/Messages/${conversation._id}`);
                handleJoinConversation(conversation);
                setActiveConversation(conversation);
              }}
              key={conversation._id}
              className={MessagesCSS.conversations}
            >
              <div className={MessagesCSS.conversationReceiverInfo}>
                <img src={
                  conversation[
                    conversation.user1.username === user.username
                    ? 'user2'
                    : 'user1'
                  ].profilePic.fileUrl
                }></img>
                <div className={MessagesCSS.conversationUserInfo}>
                  <p className={MessagesCSS.conversationUserInfoReceiverUsername}>
                    {
                      conversation[
                        conversation.user1.username === user.username
                          ? "user2"
                          : "user1"
                      ].username
                    }
                  </p>
                  <p className={MessagesCSS.lastMessageSent}>
                    {
                      conversation.messages.length!==0?conversation.messages[conversation.messages.length - 1]
                      .text:''
                    }
                    
                  </p>
                </div>
              </div>

              <i className="fa-solid fa-chevron-right fa-xs"></i>
            </div>
          ))}
        </div>
      </div>
      <Outlet
        context={{
          conversation: activeConversation,
          setConversation: setActiveConversation,
          socketConnection,
          user,
          messageThreads,
          setMessageThreads,
        }}
      />
    </div>
  );
}

export default Messages;
