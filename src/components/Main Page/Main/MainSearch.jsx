import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";
function MainSearch({searchRef}) {
  const { user } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [notFound, setNotFound] = useState(false);
  useEffect(()=>{
    console.log(searchRef);
  },[])
  const handleChange = ({ target }) => {
    setSearchQuery(target.value);
    if (target.value.length > 0) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };
  useEffect(() => {
    const search = async () => {
      if (isActive) {
        const response = await fetch(
          `http://localhost:3002/search/?searchQuery=${searchQuery}`
        );
        if (response.ok) {
          const data = await response.json();
          setSearchResults(data);
          setNotFound(data.length === 0);
        } else {
          setSearchResults([]);
          setNotFound(true);
        }
      }
    };
    if(searchQuery.length===0){
      setSearchResults([]);
    }
    const timeoutId = setTimeout(search, 150);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchQuery]);

  const onBlur = () => {
    setTimeout(() => {
      setIsActive(false);
      setSearchQuery("");
      setNotFound(false);
      setSearchResults([]);
    }, 100);
  };
  const checkFriend = (profile) => {
    return user.friends.some((friend) => friend.username === profile.username);
  };
  return (
    <div className="search-bar-container">
      <i className="fa-solid fa-magnifying-glass search-icon"></i>
      <input
        ref={searchRef}
        autoComplete="off"
        id="mainSearchInput"
        value={searchQuery}
        onChange={handleChange}
        className="input-bar"
        placeholder="Search"
        onBlur={onBlur}
      ></input>
      <div
        className={`search-query-results-container ${
          isActive ? "search-active" : ""
        }`}
      >
        {searchResults.map((result, index) => {
          return (
            <Link key={index} to={`/${result.username}`}>
              <div key={index} className="search-result">
                <img
                  src={
                    result.profilePic
                      ? result.profilePic.fileUrl
                      : "/assets/default-avatar.png"
                  }
                ></img>
                <div className="search-result-info">
                  <h1>{result.fullname}</h1>
                  <h2>
                    {result.username} {checkFriend(result) ? "• Friends" : ""}
                  </h2>
                </div>
              </div>
            </Link>
          );
        })}
        {notFound ? (
          <div className="search-result-not-found">
            No results found <i class="fa-regular fa-face-frown-open"></i>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default MainSearch;
