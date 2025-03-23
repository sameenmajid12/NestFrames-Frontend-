import MessagesCSS from "../../../styles/messages.module.css";
function MessagesEmptyState(){
  return(
    <div className={MessagesCSS.messageDefaultPage}>
            <div className={MessagesCSS.messageDefaultContainer}>
              <img src="/assets/messageIcon.png"></img>
              <p>
                Start a chat<br></br> and <br></br>connect instantly
              </p>
              <button>Send message</button>
            </div>
          </div>
  )
}
export default MessagesEmptyState;