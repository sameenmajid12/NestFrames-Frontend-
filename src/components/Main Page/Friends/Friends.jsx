import { Outlet, Link, useParams, useLocation, useOutletContext } from "react-router-dom";
import FriendsCSS from "../../../styles/friends.module.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import FriendsSelectionButtons from "./FriendsSelectionButtons";
import { AuthContext } from "../Contexts/AuthContext";
function Friends() {
  useEffect(() => {
    document.body.className = "body-default";
  }, []);
  const { user } = useContext(UserContext);
  const {screen1000, searchRef} = useOutletContext();
  const [requests, setRequests] = useState(user.friendRequestsReceived);
  const [friends, setFriends] = useState(user.friends);
  const [active, setActive] = useState("Friends");
  const location = useLocation();
  useEffect(() => {console.log(searchRef)}, []);
  const {token} = useContext(AuthContext);
  return (
    <div className={FriendsCSS.friendsPageContainer}>
      <div className={FriendsCSS.friendsHeader}>
        {active === "Friends" ? (
          <h1 className={FriendsCSS.header}>Friends</h1>
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
        screen1000={screen1000}
      />
      <div className={`${FriendsCSS.friendsOuletContainer} ${!friends.length>0?FriendsCSS.empty:''}`}>
        <Outlet
          context={{
            searchRef:searchRef,
            requests: requests,
            setRequests: setRequests,
            friends: friends,
            setFriends: setFriends,
            active: active,
            setActive: setActive,
            token:token,
            screen1000:screen1000
          }}
        />
      </div>
    </div>
  );
}

export default Friends;
