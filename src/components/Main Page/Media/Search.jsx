import "../../../styles/media.css";
import { useEffect, useState, useRef, useContext } from "react";
import { UserContext } from "../../UserContext";
function Search({ setAlbums }) {
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
    const searchAlbum = () => {
      if (search.trim().length > 0) {
        const regex = new RegExp(search, "i");
        const filteredAlbums = user.albums.filter((album) =>
          regex.test(album.name)
        );
        setAlbums(filteredAlbums);
      } else {
        setAlbums(user.albums);
      }
    };
    searchAlbum();
  }, [search]);
  return (
    <div className="search-container">
      <div
        className={`search-i ${isOpen ? "open" : ""}`}
        onClick={toggleSearch}
      >
        <div className="tooltip">
          <span className="tooltip-text">Search albums</span>
        </div>
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
      <input
        ref={inputRef}
        disabled={!isOpen}
        onChange={handleSearch}
        value={search}
        type="text"
        className={`search-input ${isOpen ? "open" : ""}`}
        placeholder={isOpen ? "Search album..." : ""}
      />
    </div>
  );
}

export default Search;
