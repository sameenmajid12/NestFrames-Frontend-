import { Outlet, Link, useParams, useLocation } from "react-router-dom";
import FriendsCSS from "../../../styles/friends.module.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../UserContext";
import FriendsSelectionButtons from "./FriendsSelectionButtons";
import { AuthContext } from "../../AuthContext";
function Friends() {
  useEffect(() => {
    document.body.className = "body-default";
  }, []);
  const { user } = useContext(UserContext);
  const [requests, setRequests] = useState(user.friendRequestsReceived);
  const [friends, setFriends] = useState(user.friends);
  const [active, setActive] = useState("Friends");
  const location = useLocation();
  useEffect(() => {}, [location]);
  const {token} = useContext(AuthContext);
  console.log(token);
  return (
    <div className={FriendsCSS.friendsPageContainer}>
      <div className={FriendsCSS.friendsHeader}>
        {active === "Friends" ? (
          <h1 className={FriendsCSS.header}>My Friends</h1>
        ) : active === "Requests" ? (
          <h1 className={FriendsCSS.requestHeader}>
            Requests{" "}
            <span className={FriendsCSS.requestCount}>({requests.length})</span>
          </h1>
        ) : active === "Suggested" ? (
          <h1 className={FriendsCSS.requestHeader}>Suggested</h1>
        ) : (
          ""
        )}
      </div>
      <FriendsSelectionButtons
        active={active}
        setActive={setActive}
        setFriends={setFriends}
      />
      <div className={FriendsCSS.friendsOuletContainer}>
        <Outlet
          context={{
            requests: requests,
            setRequests: setRequests,
            friends: friends,
            setFriends: setFriends,
            active: active,
            setActive: setActive,
            token:token
          }}
        />
      </div>
    </div>
  );
}

export default Friends;
