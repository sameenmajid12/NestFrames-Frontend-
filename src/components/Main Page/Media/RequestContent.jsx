import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import { useNavigate, useOutletContext } from "react-router-dom";
function RequestContent() {
  const { user, setUser } = useContext(UserContext);
  const {requests, setRequests, setAlbums} = useOutletContext();
  const navigate = useNavigate();
  const navigateToAlbum = (id) => {
    navigate(`/album/${id}`);
  };
  const acceptRequest = async (requestId) => {
    const response = await fetch(
      `http://localhost:3002/albums/${requestId}/accept-request`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user._id }),
      }
    );
    if (response.ok) {
      const data = await response.json();
      setRequests((prev)=> prev.filter(request=>request._id!==data.album._id));
      setAlbums((prev) => [...prev, { ...data.album }]);
      setUser((prevUser) => ({
        ...prevUser,
        albumRequests: [...prevUser.albumRequests.filter(request=>request._id!==data.album._id)],
        albums: [...prevUser.albums, data.album],
      }));
    }
  };
  const declineRequest = async (requestId) => {
    const response = await fetch(
      `http://localhost:3002/albums/${requestId}/decline-request`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user._id }),
      }
    );
    if (response.ok) {
      const data = await response.json();
      setRequests((prev)=> prev.filter(request=>request._id!==data.albumId));
    }
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
              <button onClick={()=>{acceptRequest(request._id)}} className="album-request-accept">Accept</button>
            </div>
          </div>
        );
      }):''}
    </div>
  );
}

export default RequestContent;
