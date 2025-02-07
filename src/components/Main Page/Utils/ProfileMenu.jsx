function ProfileMenu({ isUser, toggleVisibility }) {
  return (
    <div className="menu-container">
      {isUser ? (
        <>
          <p>View Albums</p>
          <p>View Friends</p>
          <p>Edit Profile</p>
          <p>Notifications</p>
          <p>Log out</p>
          <p onClick={toggleVisibility}>Cancel</p>
        </>
      ) : (
        <>
          <p>View Albums</p>
          <p>View Friends</p>
          <p>Message</p>
          <p>Unfriend</p>
          <p onClick={toggleVisibility}>Cancel</p>
        </>
      )}
    </div>
  );
}
export default ProfileMenu;
