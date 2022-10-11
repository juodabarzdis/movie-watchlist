import { useContext, useState, useEffect } from "react";
import Navbar from "./components/navigation/Navbar";
import Main from "./Main";
import MainContext from "./context/MainContext";
import Genres from "./components/genres/Genres";

const App = () => {
  const [keyword, setKeyword] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [page, setPage] = useState(null);
  const [genres, setGenres] = useState([]);
  const [displayGenres, setDisplayGenres] = useState(false);
  const contextValues = {
    keyword,
    setKeyword,
    selectedGenres,
    setSelectedGenres,
    page,
    setPage,
    genres,
    setGenres,
    displayGenres,
    setDisplayGenres,
  };

  return (
    <div className="App">
      <MainContext.Provider value={contextValues}>
        <Navbar />
        <Genres />
        <Main />
      </MainContext.Provider>
    </div>
  );
};

export default App;
