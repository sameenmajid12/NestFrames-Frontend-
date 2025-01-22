import "../../../styles/media.css";
import { useEffect, useState, useRef, useContext } from "react";
import { UserContext } from "../../UserContext";
function Search({ setAlbums, setFriends, selector }) {
  const { user } = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);
  const toggleSearch = () => {
    setSearch("");
    setIsOpen((prev) => !prev);
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    document.body.className = "body-default";
  }, []);
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);
  useEffect(() => {
    const searchArr = () => {
      if (search.trim().length > 0) {
        const regex = new RegExp(search, "i");
        if (selector === "album") {
          const filtered = user.albums.filter((album) =>
            regex.test(album.name)
          );
          setAlbums(filtered);
          console.log(filtered);
        } else {
          const filtered = user.friends.filter(
            (friend) =>
              regex.test(friend.fullname) || regex.test(friend.username)
          );
          setFriends(filtered);
        }
      } else {
        selector === "album"
          ? setAlbums(user.albums)
          : setFriends(user.friends);
      }
    };
    searchArr();
  }, [search]);
  return (
    <div className="search-container">
      <div
        className={`search-i ${isOpen ? "open" : ""}`}
        onClick={toggleSearch}
      >
        <div className="tooltip">
          <span className="tooltip-text">Search {selector}</span>
        </div>
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
      <input
        autocomplete="off"
        id="friendAlbumSearchInput"
        ref={inputRef}
        disabled={!isOpen}
        onChange={handleSearch}
        value={search}
        type="text"
        className={`search-input ${isOpen ? "open" : ""}`}
        placeholder={isOpen ? `Search ${selector}...` : ""}
      />
    </div>
  );
}

export default Search;
