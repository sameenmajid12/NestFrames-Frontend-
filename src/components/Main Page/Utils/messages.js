export const formatMessage = (message) => {
  if (message.length > 20) {
    return message.substring(0, 20) + "...";
  }
  return message;
};

export const checkRead = (conversation, userId) => {

  if (!conversation.lastMessage) {
    return true;
  }
  if(conversation.lastMessage.sentBy.toString() !== userId.toString()){
    return conversation.lastMessage.read;
  }
  return true;
};

export const formatTime = (lastTime)=>{
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
}
