import ProfileNav from "./ProfileNav";
import ProfileInfo from "./ProfileInfo";
import { Outlet, useOutletContext, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "../../AuthContext";
import  {UserContext} from '../../UserContext';
import Loading from "../Utils/Loading";
function Profiles() {
  const [profile, setProfile] = useState();
  const [loading, setLoading] = useState(true);
  const { username } = useParams();
  const {user} = useContext(UserContext);
  const { token, refreshToken } = useContext(AuthContext);
  const {screen650} = useOutletContext();
  useEffect(() => {
    document.body.className = "body-default";
    async function getProfile() {
      try {
        let currentToken = token;
        if (!currentToken) {
          currentToken = await refreshToken();
        }
        if(username === user.username){
          setProfile(user);
        }
        else{
          const response = await fetch(
            `http://localhost:3002/users/${username}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${currentToken}`,
              },
              credentials: "include",
            }
          );
          const profileData = await response.json();
          setProfile(profileData);
        }
      } catch (error) {
        console.log(`Error fetching profile data, ${error}`);
      } finally {
        setLoading(false);
      }
    }
    getProfile();
  }, [username]);

  return (
    <div className="profile-page-container">
      {loading ? (
        <Loading />
      ) : (
        <>
          <ProfileInfo profile={profile} setProfile={setProfile} screen650={screen650}/>
          <ProfileNav profile={profile} setProfile={setProfile} screen650={screen650}/>
          <div className="profile-content-container">
            <Outlet context={{ profile }} />
          </div>
        </>
      )}
    </div>
  );
}

export default Profiles;
