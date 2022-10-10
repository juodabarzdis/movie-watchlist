import "./App.css";
import { useEffect, useState, useContext } from "react";
import Axios from "axios";
import Card from "./components/movie-card/Card";
import MainContext from "./context/MainContext";
import { Pagination } from "@mui/material";
import styled from "@emotion/styled";
import Modal from "./components/movie-modal/Modal";

function App() {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);
  const { keyword } = useContext(MainContext);
  const [page, setPage] = useState(null);
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const handleOpen = () => setOpen(true);

  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  console.log(process.env);

  const StyledPagination = styled(Pagination)`
    button {
      color: #fff;
    }
    button:hover {
      background-color: #121212;
      color: #fff;
    }
    div {
      color: #fff;
    }
  `;

  useEffect(() => {
    Axios.get(
      "https://api.themoviedb.org/3/movie/popular?api_key=" +
        API_KEY +
        "&language=en-US&page=" +
        page
    )
      .then((response) => {
        setData(response.data.results);
        setTotalPages(response.data.total_pages);
        setCurrentPage(response.data.page);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page, keyword === ""]);

  useEffect(() => {
    if (keyword !== "") {
      Axios.get(
        "https://api.themoviedb.org/3/search/movie?api_key=" +
          API_KEY +
          "&query=" +
          keyword
      )
        .then((response) => {
          setData(response.data.results);
          setTotalPages(response.data.total_pages);
          setCurrentPage(response.data.page);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [keyword, page]);

  console.log(currentPage, totalPages);

  return (
    <div className="App">
      <Modal data={modalData} open={open} setOpen={setOpen} />

      <div className="movies-container">
        {data &&
          data.map(
            (movie) =>
              movie.poster_path && (
                <div
                  onClick={(e) => {
                    handleOpen();
                    setModalData(movie);
                  }}
                >
                  <Card key={movie.id} data={movie} />
                </div>
              )
          )}
      </div>
      <div className="pagination-container">
        <StyledPagination
          count={totalPages}
          page={currentPage}
          color="primary"
          defaultPage={1}
          siblingCount={2}
          onChange={(e, page) => {
            setPage(page);
          }}
          className="pagination"
        />
      </div>
    </div>
  );
}

export default App;
