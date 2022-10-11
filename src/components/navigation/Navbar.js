import { useContext, useRef } from "react";
import MainContext from "../../context/MainContext";
import "./Navbar.css";
import { GoSearch } from "react-icons/go";

const Navbar = () => {
  const { setKeyword } = useContext(MainContext);
  const inputRef = useRef();

  const handleSearch = (e) => {
    e.preventDefault();
    setKeyword(inputRef.current.value);
  };

  return (
    <div className="nav-bar">
      <div className="nav-bar-logo">Logo</div>
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
        <div>Genres</div>
      </div>
    </div>
  );
};

export default Navbar;
