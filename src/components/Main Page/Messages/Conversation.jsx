import { useState, useRef } from "react";
import MessagesCSS from "../../../styles/messages.module.css";
import { useOutletContext, useParams } from "react-router-dom";
import { useEffect } from "react";
function Conversation() {
  const [loaded, setLoaded] = useState(false);
  const [message, setMessage] = useState("");
  const conversationContainer = useRef(null);
  const inputRef = useRef(null);
  const { conversationId } = useParams();
  const {
    conversation,
    setConversation,
    socketConnection,
    user,
    setMessageThreads,
  } = useOutletContext();
  const [messageList, setMessageList] = useState([]);
  useEffect(()=>{
    if (!conversation) {
      if (conversationId) {
        async function getConvo(id) {
          const c = await fetch(
            `http://localhost:3002/Messages/Conversation/${id}`
          );
          const convo = await c.json();
          setConversation(convo);
        }
        getConvo(conversationId);
      }
    };
    return()=>{
      setConversation(null);
    }
  },[]);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  useEffect(()=>{
    if(inputRef.current){
      inputRef.current.focus();
    }  
    return()=>{
      setMessage("");
    }
  },[conversation])
 
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
  const handleKeyDown =(e)=>{
    if(e.key==='Enter'){
      sendMessage();
    }
  }
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
    <div className={MessagesCSS.conversationContainer}>
      <div className={MessagesCSS.conversationHeader}>{receiverName}<i className="fa-solid fa-ellipsis"></i></div>
      <div
        key={conversation._id}
        className={MessagesCSS.conversationMessagesContainer}
      >
        <div className={MessagesCSS.messages} ref={conversationContainer}>
          <div className={MessagesCSS.conversationStart}>
            <img
              className={MessagesCSS.conversationStartImage}
              src={receiverProfilePicUrl?receiverProfilePicUrl.fileUrl:'/assets/default-avatar.png'}
            ></img>
            <p className={MessagesCSS.conversationStartFullName}>
              {receiverName}
            </p>
            <p className={MessagesCSS.conversationStartUsername}>
              {receiverUsername}
            </p>
            <p className={MessagesCSS.conversationStartMessage}>
              This is the beginning of your conversation
            </p>
          </div>
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
                  style={
                    nextMessageUser !== message.sentBy
                      ? { marginBottom: "10px" }
                      : { marginBottom: "0" }
                  }
                >
                   {nextMessageUser === message.sentBy ? (
                    <div
                      key={`marginedTextContainer-${index}`}
                      className={MessagesCSS.senderMarginedTextContainer}
                    >
                      {lastMessageUser === message.sentBy ? (
                        ""
                      ) : (
                        <div className={MessagesCSS.senderUsername}>
                          {user.fullname}
                        </div>
                      )}
                      <p>{message.text}</p>
                    </div>
                  ) : (
                    <>
                      
                      <div
                        key={`textContainer-${index}`}
                        className={MessagesCSS.textContainer}
                      >
                        {lastMessageUser === message.sentBy ? (
                          ""
                        ) : (
                          <div className={MessagesCSS.senderUsername}>
                            {user.fullname}
                          </div>
                        )}
                      
                      <p>{message.text}</p>
                      </div>
                      <img
                        key={`image-${index}`}
                        src={
                          user.profilePic
                            ? user.profilePic.fileUrl
                            : "./assets/default-avatar.png"
                        }
                      />
                    </>
                  )}
                </div>
              );
            } else {
              return (
                <div
                  key={message._id || `receiver-${index}`}
                  className={MessagesCSS.receiverMessage}
                  style={
                    nextMessageUser !== message.sentBy
                      ? { marginBottom: "10px" }
                      : { marginBottom: "0" }
                  }
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
      <div className={MessagesCSS.messageInputContainer}>
      <div className={MessagesCSS.messageIcons}><i className="fa-solid fa-plus"></i></div>
        <div className={MessagesCSS.messageInput}>
          <input
          autoComplete="off"
            id="messageInput"
            placeholder="Send Message"
            value={message}
            onChange={handleMessage}
            ref={inputRef}
            className={MessagesCSS.input}
            onKeyDown={handleKeyDown}
          ></input>
          <div className={MessagesCSS.messageInputIcons}>
            <i className="fa-regular fa-face-smile"></i>
            <div className={MessagesCSS.messageSend}>
              <i className="fa-regular fa-paper-plane" onClick={sendMessage}></i>
            </div>
          </div>
        </div>
        <div className={MessagesCSS.messageIcons}><i className="fa-solid fa-microphone-lines"></i></div>
      </div>
    </div>
  ) : (
    <div></div>
  );
}

export default Conversation;
