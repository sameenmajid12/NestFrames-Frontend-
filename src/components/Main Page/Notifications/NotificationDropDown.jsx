import { useEffect, useRef } from "react";
function NotificationDropDown({
  receivedNotifications,
  setVisibility,
  notificationBellRef,
}) {
  const containerRef = useRef(null);
  const handleVisibility = (e) => {
    console.log(e.target);
    if (
      containerRef.current&&
      !containerRef.current.contains(e.target) &&
      !notificationBellRef.current.contains(e.target)
    ) {
      setVisibility((prev) => !prev);
    }
  };
  useEffect(() => {
    document.body.addEventListener("mousedown", handleVisibility);
    return () => {
      document.body.removeEventListener("mousedown", handleVisibility);
    };
  }, []);
  return (
    <div ref={containerRef} className="notification-drop-down-container">
      <h1 className="notification-drop-down-header">Notifications</h1>
      <div className="notification-drop-down-body">
        {receivedNotifications.length > 0 ? (
          receivedNotifications.map((notification, index) => {
            return (
              <div key={index} className="notification-drop-down-notification">
                <div className="notification-drop-down-details">
                  <img src={notification.image?notification.image.fileUrl:''} className="notification-drop-down-image">
                  </img>
                  <p>{notification.message}</p>
                </div>
                {!notification.read ? (
                  <span className="notification-read"></span>
                ) : (
                  ""
                )}
              </div>
            );
          })
        ) : (
          <p className="notification-drop-down-none">
            You're all caught up! No new notifications at the moment.{" "}
            <i className="fa-regular fa-face-smile"></i>
          </p>
        )}
      </div>
    </div>
  );
}
export default NotificationDropDown;
