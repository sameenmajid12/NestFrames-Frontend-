import { useNavigate } from "react-router-dom";
import MessagesCSS from "../../../styles/messages.module.css";
import { useState } from "react";
import { checkRead, formatMessage, formatTime } from "../Utils/messages";
import Loading from "../Utils/Loading";
function ConversationList({
  screen1000,
  activeConversation,
  toggleListVisibility,
  messageThreads,
  setActiveConversation,
  user,
  loading,
}) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  if (loading) {
    return <Loading />;
  }

  return (
    <>
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
          {loading ? (
            <div></div>
          ) : (
            <div
              id="conversationsContainer"
              className={MessagesCSS.messageThreadsContainer}
            >
              {messageThreads.map((conversation) => {
                return (
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
                    {!checkRead(conversation, user._id) ? (
                      <i
                        className={`fa-solid fa-circle-dot ${MessagesCSS.unreadMessageDot}`}
                      ></i>
                    ) : (
                      ""
                    )}
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
                        <p
                          className={`${
                            !checkRead(conversation, user._id)
                              ? MessagesCSS.unreadMessageText
                              : MessagesCSS.lastMessageSent
                          }`}
                        >
                          {conversation.lastMessage !== null
                            ? formatMessage(conversation.lastMessage.text)
                            : ""}
                        </p>
                        <p className={MessagesCSS.messageTime}>
                          {conversation.lastMessage !== null
                            ? formatTime(conversation.lastUpdate)
                            : ""}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className={MessagesCSS.addMoreMessages}>
            <i className="fa-solid fa-circle-plus"></i>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
export default ConversationList;
