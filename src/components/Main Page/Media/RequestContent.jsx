import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import { useNavigate, useOutletContext } from "react-router-dom";
import useAlbumActions from "../../../hooks/useAlbumActions";
function RequestContent() {
  const { user, setUser } = useContext(UserContext);
  const {requests, setRequests, setAlbums} = useOutletContext();
  const {acceptInvitation} = useAlbumActions();
  const navigate = useNavigate();
  const navigateToAlbum = (id) => {
    navigate(`/album/${id}`);
  };
  
  return (
    <div className="album-request-container">
      {requests?requests.map((request,index) => {
        return (
          <div key={index} className="album-request">
            <img
              onClick={() => {
                navigateToAlbum(request._id);
              }}
              src={
                request
                  ? request.coverPhoto
                    ? request.coverPhoto.fileUrl
                    : ""
                  : ""
              }
            ></img>
            <div
              onClick={() => {
                navigateToAlbum(request._id);
              }}
              className="album-request-info"
            >
              <h3>{request.name}</h3>
              <p>Created by @{request.users[0].username}</p>
            </div>
            <div className="album-request-buttons">
              <button
                onClick={()=>{declineRequest(request._id)}}
                className="album-request-decline"
              >
                Decline
              </button>
              <button onClick={()=>{acceptInvitation(request._id)}} className="album-request-accept">Accept</button>
            </div>
          </div>
        );
      }):''}
    </div>
  );
}

export default RequestContent;
