
function SentNotification({success,message, setNotifications}) {
  return(
    <div className={`notification-container notification-${success?"success":"error"}`}>
      <div className="notification-left">
        <i className={`fa-solid fa-${success?"circle-check success-icon":"circle-xmark error-icon"}`}></i>
        <div className="notification-message">
          <p className={`${success?"success-":"error-"}notification-message-head`}>{success?"Success":"Error"}</p>
          <p className={`${success?"success-":"error-"}notification-message-message`}>{message}</p>
        </div>
      </div>
      <div className={`notification-right ${success?"success-":"error-"}right`}>
      <i onClick={()=>setNotifications(prev=>prev.slice(1))} className={`fa-solid fa-xmark ${success?"success-":"error-"}xmark`}></i>
      </div>
    </div>
  )
}

export default SentNotification;
