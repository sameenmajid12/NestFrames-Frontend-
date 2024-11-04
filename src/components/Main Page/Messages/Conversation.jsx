import { useState, useRef } from "react";
import MessagesCSS from "../../../styles/messages.module.css";
import { useOutletContext, useParams } from "react-router-dom";
import { useEffect } from "react";
function Conversation() {
  console.log('conversation')
  const [loaded, setLoaded] = useState(false);
  const [message, setMessage] = useState("");
  const conversationContainer = useRef(null);
  const { conversationId } = useParams();
  const {
    conversation,
    setConversation,
    socketConnection,
    user,
    setMessageThreads,
  } = useOutletContext();
  console.log(conversation);
  const [messageList, setMessageList] = useState([]);
  if (!conversation) {
    if (conversationId) {
      async function getConvo(id) {
        const c = await fetch(
          `http://localhost:3002/Messages/Conversation/${id}`
        );
        const convo = await c.json();
        setConversation(convo);
        console.log(convo);
      }
      getConvo(conversationId);
    }

    if (!conversationId) {
    }
  }
  useEffect(() => {
    if (conversation) {
      setLoaded(true);
      setMessageList(conversation.messages);
      if (socketConnection) {
        function addToMessagelist(message) {
          setMessageList((prevMessages) => [...prevMessages, message]);
          setMessageThreads((prevThreads) => {
            const newThreads = prevThreads.map((thread) => {
              if (thread._id === conversation._id) {
                return { ...thread, messages: [...thread.messages, message] };
              }
              return thread;
            });
            return newThreads;
          });
        }
        socketConnection.off("messageSent").on("messageSent", addToMessagelist);
        socketConnection
          .off("messageReceived")
          .on("messageReceived", addToMessagelist);
      }
    }
  }, [conversation]);

  useEffect(() => {
    if (conversationContainer.current) {
      conversationContainer.current?.lastElementChild?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messageList]);
  let userUsername;
  let receiverUsername;
  let receiverName;
  let receiverProfilePicUrl;
  if (conversation) {
    userUsername = user.username;
    receiverUsername =
      conversation[
        `user${conversation.user1.username === userUsername ? 2 : 1}`
      ].username;
    receiverName =
      conversation[
        `user${conversation.user1.username === userUsername ? 2 : 1}`
      ].fullname;
    receiverProfilePicUrl =
      conversation[
        `user${conversation.user1.username === userUsername ? 2 : 1}`
      ].profilePic;
  }
  console.log(receiverProfilePicUrl)
  const handleMessage = (e) => setMessage(e.target.value);
  const sendMessage = async () => {
    if (message) {
      if (socketConnection && conversationContainer.current) {
        const sentMessage = {
          sentBy: user._id,
          receivedBy: receiverUsername,
          createdAt: Date.now(),
          text: message,
        };
        socketConnection.emit("messageSent", sentMessage);
        setMessage("");
      }
    }
  };

  return loaded ? (
    <div className={MessagesCSS.messagesContainer}>
      <div className={MessagesCSS.messageHeader}>{`@${receiverUsername}`}</div>
      <div className={MessagesCSS.messageInputContainer}>
        <div className={MessagesCSS.inputContainer}>
          <i className="fa-solid fa-paperclip"></i>
          <input
            id="messageInput"
            placeholder="Send Message"
            value={message}
            onChange={handleMessage}
            className={MessagesCSS.messageInput}
          ></input>
          <i className="fa-regular fa-image"></i>
          <i className="fa-solid fa-arrow-up" onClick={sendMessage}></i>
        </div>
      </div>
      <div
        key={conversation._id}
        ref={conversationContainer}
        className={MessagesCSS.conversationContainer}
      >
        <p className={MessagesCSS.conversationStartMessage}>
          This is the beginning of your conversation with{" "}
          {`@${receiverUsername}`}
        </p>
        {messageList.map((message, index, array) => {
          const nextMessage = array[index + 1];
          const lastMessage = array[index - 1];
          let nextMessageUser;
          let lastMessageUser;
          if (nextMessage) {
            nextMessageUser = nextMessage.sentBy;
          }
          if (lastMessage) {
            lastMessageUser = lastMessage.sentBy;
          }

          if (message.sentBy === user._id) {
            return (
              <div
                key={message._id || `sender-${index}`}
                className={MessagesCSS.senderMessage}
              >
                <p>{message.text}</p>
              </div>
            );
          } else {
            return (
              <div
                key={message._id || `receiver-${index}`}
                className={MessagesCSS.receiverMessage}
              >
                {nextMessageUser === message.sentBy ? (
                  <div
                    key={`marginedTextContainer-${index}`}
                    className={MessagesCSS.marginedTextContainer}
                  >
                    {lastMessageUser === message.sentBy ? (
                      ""
                    ) : (
                      <div className={MessagesCSS.receiverUsername}>
                        {receiverName}
                      </div>
                    )}
                    <p>{message.text}</p>
                  </div>
                ) : (
                  <>
                    <img
                      key={`image-${index}`}
                      src={
                        receiverProfilePicUrl
                          ? receiverProfilePicUrl.fileUrl
                          : "./assets/default-avatar.png"
                      }
                      alt="receiver"
                    />
                    <div
                      key={`textContainer-${index}`}
                      className={MessagesCSS.textContainer}
                    >
                      {lastMessageUser === message.sentBy ? (
                        ""
                      ) : (
                        <div className={MessagesCSS.receiverUsername}>
                          {receiverName}
                        </div>
                      )}
                      <p>{message.text}</p>
                    </div>
                  </>
                )}
              </div>
            );
          }
        })}
      </div>
    </div>
  ) : (
    <div>
      <input></input>
      <p>POop</p>
      <div>
        <input></input>
      </div>
    </div>
  );
}

export default Conversation;
