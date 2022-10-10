import { useContext, useState, useEffect } from "react";
import Navbar from "./components/navigation/Navbar";
import Main from "./Main";
import MainContext from "./context/MainContext";

const App = () => {
  const [keyword, setKeyword] = useState("");
  const contextValues = { keyword, setKeyword };

  console.log(keyword);
  return (
    <div className="App">
      <MainContext.Provider value={contextValues}>
        <Navbar />
        <Main />
      </MainContext.Provider>
    </div>
  );
};

export default App;
