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