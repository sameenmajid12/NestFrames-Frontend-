import ProfileNav from "./ProfileNav";
import ProfileInfo from "./ProfileInfo";
import { Outlet, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "../../AuthContext";
function Profiles() {
  const [profile, setProfile] = useState();
  const [loading, setLoading] = useState(true);
  const { username } = useParams();
  const {token,refreshToken} = useContext(AuthContext);
  useEffect(() => {
    document.body.className = "body-default";
    async function getProfile() {
      try {
        let currentToken = token;
        if(!currentToken){
          currentToken = await refreshToken();
        }
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
      } catch (error) {
        console.log(`Error fetching profile data, ${error}`);
      } finally {
        setLoading(false);
      }
    }
    getProfile();
  }, [username]);
  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="profile-page-container">
      <ProfileInfo profile={profile} setProfile={setProfile} />
      <ProfileNav profile={profile} setProfile={setProfile} />
      <div className="profile-content-container">
        <Outlet context={{ profile }} />
      </div>
    </div>
  );
}

export default Profiles;
