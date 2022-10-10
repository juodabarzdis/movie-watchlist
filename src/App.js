import { useContext, useState, useEffect } from "react";
import Navbar from "./components/navigation/Navbar";
import Main from "./Main";
import MainContext from "./context/MainContext";
import Genres from "./components/genres/Genres";

const App = () => {
  const [keyword, setKeyword] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const contextValues = {
    keyword,
    setKeyword,
    selectedGenres,
    setSelectedGenres,
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
