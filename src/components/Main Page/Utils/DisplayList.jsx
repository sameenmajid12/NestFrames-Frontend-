import { useNavigate } from "react-router-dom";

function DisplayList({ header, users, toggleVisibility }) {
  const navigate = useNavigate();
  const navigateToUser =(username)=>{
    navigate(`/${username}`);
  }
  return (
    <div className="list-page">
      <div className="display-list-container">
        <div className="display-list-header">
          <h2>{header}</h2>
          <i onClick={toggleVisibility} className="fa-solid fa-multiply"></i>
        </div>
        <div className="display-list-body">
          {users.map((user) => {
            return (
              <div key={user._id} className="display-list-user">
                <img
                  src={
                    user
                      ? user.profilePic
                        ? user.profilePic.fileUrl
                        : "/assets/default-avatar.png"
                      : ""
                  }
                ></img>
                <div onClick={()=>{navigateToUser(user.username)}} className="display-list-names">
                  <h3>{user.fullname}</h3>
                  <p>@{user.username}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default DisplayList;
