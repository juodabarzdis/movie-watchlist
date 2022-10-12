import { useContext, useRef, useState, useEffect } from "react";
import MainContext from "../../context/MainContext";
import "./Navbar.css";
import { GoSearch } from "react-icons/go";

const Navbar = () => {
  const { setKeyword, displayGenres, setDisplayGenres, setSelectedGenres } =
    useContext(MainContext);
  const inputRef = useRef();
  const [openDropdown, setOpenDropdown] = useState(false);
  const ref = useRef();

  const handleSearch = (e) => {
    e.preventDefault();
    setKeyword("");
    setKeyword(inputRef.current.value);
    setSelectedGenres([]);
    setDisplayGenres(false);
  };

  const handleLogo = () => {
    setKeyword("");
    setDisplayGenres(false);
    setSelectedGenres([]);
  };

  const handleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  return (
    <>
      <div className="nav-bar">
        <div
          className="nav-bar-logo"
          onClick={(e) => {
            handleLogo();
          }}
        >
          Logo
        </div>
        <form className="nav-bar-search" onSubmit={handleSearch}>
          <div>
            <input type="text" placeholder="Search" ref={inputRef} />
          </div>
          <div>
            <button className="btn" type="submit">
              <GoSearch />
            </button>
          </div>
        </form>
        <div className="nav-bar-links">
          <ul>
            <li className="nav-bar-btn" onClick={() => setDisplayGenres(false)}>
              Genres
            </li>
          </ul>
        </div>
        <div className="dropdown">
          <div
            onClick={(e) => {
              handleDropdown();
              setDisplayGenres(false);
            }}
            className="drop-btn btn"
          >
            MENU
          </div>
        </div>
      </div>
      {openDropdown && (
        <div className="dropdown-content">
          <ul>
            <li onClick={() => setDisplayGenres(!displayGenres)}>Genre</li>
            <li>
              <form
                className="nav-bar-search dropdown-search"
                onSubmit={handleSearch}
              >
                <input type="text" placeholder="Search" ref={inputRef} />
                <button className="btn" type="submit">
                  <GoSearch />
                </button>
              </form>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
