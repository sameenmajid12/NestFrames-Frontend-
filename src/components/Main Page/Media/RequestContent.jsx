import { useContext } from "react";
import { UserContext } from "../../UserContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function RequestContent() {
  const { user } = useContext(UserContext);
  const [requests, setRequests] = useState(user.albumRequests);
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
      setRequests((prev) => {
        prev.filter((album) => {
          album._id !== data.albumId;
        });
      });
    }
  };
  const declineRequest = () => {};
  return (
    <div className="album-request-container">
      {requests.map((request) => {
        console.log(request);
        return (
          <div className="album-request">
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
                onClick={() => {
                  console.log("poop");
                }}
                className="album-request-decline"
              >
                Decline
              </button>
              <button onClick={()=>{acceptRequest(request._id)}} className="album-request-accept">Accept</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default RequestContent;
