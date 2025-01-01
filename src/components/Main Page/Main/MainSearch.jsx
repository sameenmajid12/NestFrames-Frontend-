import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";
function MainSearch() {
  const {user}= useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isActive, setIsActive] = useState(false);
  function handleChange({ target }) {
    setSearchQuery(target.value);
    if (target.value.length > 0) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }
  useEffect(() => {
    const search = async () => {
      if (isActive) {
        const response = await fetch(
          `http://localhost:3002/search/?searchQuery=${searchQuery}`
        );
        if (response.ok) {
          const data = await response.json();
          setSearchResults(data);
        } else {
          setSearchResults([]);
        }
      }
    };
    const timeoutId = setTimeout(search, 150);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchQuery]);

  function onBlur() {
    setTimeout(() => {
      setIsActive(false);
    }, 100);
  };
  const checkFriend = (profile)=>{
    return user.friends.some((friend)=>friend.username===profile.username);
  }
  return (
    <div className="search-bar-container">
        <i className='fa-solid fa-magnifying-glass search-icon'></i>
      <input
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
                <img src={result.profilePic?result.profilePic.fileUrl:'/assets/default-avatar.png'}></img>
                <div className="search-result-info">
                  <h1>{result.fullname}</h1>
                  <h2>{result.username} {checkFriend(result)?'• Friends':''}</h2>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default MainSearch;
