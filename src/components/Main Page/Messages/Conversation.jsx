import { useState, useRef } from "react";
import MessagesCSS from "../../../styles/messages.module.css";
import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import MessageMenu from "../Utils/MessageMenu";
import { checkRead } from "../Utils/messages";
function Conversation() {
  const [loaded, setLoaded] = useState(false);
  const [message, setMessage] = useState("");
  const [messageMenuVis, setMessageMenuVis] = useState(false);
  const inputRef = useRef(null);
  const {
    conversation,
    setConversation,
    screen1000,
    socket,
    user,
    conversationContainer,
    scrollToBottom,
    messageList,
    setMessageThreads
  } = useOutletContext();
  useEffect(() => {
    if (conversation) {
      if (!checkRead(conversation, user._id)) {
        socket.emit("read", {
          conversation: conversation,
        });
        setMessageThreads((prev) =>
          prev.map((thread) =>
            thread._id.toString() === conversation._id.toString()
              ? {
                  ...conversation,
                  lastMessage: { ...conversation.lastMessage, read: true },
                }
              : thread
          )
        );
      }
      scrollToBottom();
      if (inputRef.current) {
        inputRef.current.focus();
      }
      return () => {
        setMessage("");
      };
    }
  }, [conversation]);
  useEffect(() => {
    if (messageList) {
      setLoaded(true);
    }
  }, [messageList]);
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };
  const toggleMenuVisibility = () => {
    setMessageMenuVis((prev) => !prev);
  };
  const isUser1 = conversation.user1.username === user.username ? true : false;
  const receiver = isUser1 ? conversation.user2 : conversation.user1;

  const handleMessage = (e) => setMessage(e.target.value);
  const sendMessage = async () => {
    if (message) {
      if (socket && conversationContainer.current) {
        const sentMessage = {
          sentBy: user._id,
          receivedBy: receiver._id,
          createdAt: Date.now(),
          conversation: conversation._id,
          text: message,
        };
        socket.emit("messageSent", sentMessage);
        setMessage("");
      }
    }
  };

  return loaded ? (
    <div className={MessagesCSS.conversationContainer}>
      <div className={MessagesCSS.conversationHeader}>
        <div>
          {screen1000 ? (
            <i
              onClick={() => setConversation(null)}
              className="fa-solid fa-circle-chevron-left"
            ></i>
          ) : (
            ""
          )}
          {receiver.fullname}
        </div>

        <i
          onClick={toggleMenuVisibility}
          className={`fa-solid fa-ellipsis ${MessagesCSS.ellipsis}`}
        >
          {messageMenuVis && (
            <MessageMenu
              setVisibility={toggleMenuVisibility}
              conversation={conversation}
            />
          )}
        </i>
      </div>
      <div
        key={conversation._id}
        className={MessagesCSS.conversationMessagesContainer}
      >
        <div className={MessagesCSS.messages} ref={conversationContainer}>
          <div className={MessagesCSS.conversationStart}>
            <img
              className={MessagesCSS.conversationStartImage}
              src={
                receiver.profilePic
                  ? receiver.profilePic.fileUrl
                  : "/assets/default-avatar.png"
              }
            ></img>
            <p className={MessagesCSS.conversationStartFullName}>
              {receiver.fullname}
            </p>
            <p className={MessagesCSS.conversationStartUsername}>
              {receiver.username}
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
                        <div className={MessagesCSS.senderUsername}>You</div>
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
                          <div className={MessagesCSS.senderUsername}>You</div>
                        )}

                        <p>{message.text}</p>
                      </div>
                      <img
                        key={`image-${index}`}
                        src={
                          user.profilePic
                            ? user.profilePic.fileUrl
                            : "/assets/default-avatar.png"
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
                          {receiver.fullname}
                        </div>
                      )}
                      <p>{message.text}</p>
                    </div>
                  ) : (
                    <>
                      <img
                        key={`image-${index}`}
                        src={
                          receiver.profilePic
                            ? receiver.profilePic.fileUrl
                            : "/assets/default-avatar.png"
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
                            {receiver.fullname}
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
        <div className={MessagesCSS.messageIcons}>
          <i className="fa-solid fa-plus"></i>
        </div>
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
              <i
                className="fa-regular fa-paper-plane"
                onClick={sendMessage}
              ></i>
            </div>
          </div>
        </div>
        <div className={MessagesCSS.messageIcons}>
          <i className="fa-solid fa-microphone-lines"></i>
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
}

export default Conversation;
