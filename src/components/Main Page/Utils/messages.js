export const handleAddFriendToMessages = async (friend) => {
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
      updatedConversations = [conversation, ...messageThreads];
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

export const formatMessage = (message) => {
  if (message.length > 20) {
    return message.substring(0, 20) + "...";
  }
  return message;
};

export const checkRead = (conversation, userId) => {
  if (!conversation.messages || conversation.messages.length === 0) {
    return null;
  }
  let index = conversation.messages.length - 1;
  if (conversation.messages[index].sentBy !== userId) {
    return conversation.messages[index];
  }
  return null;
};

export const getLastMessage = (lastTime) => {
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