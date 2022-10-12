import { useEffect, useState, useContext, useRef } from "react";
import MainContext from "./context/MainContext";
import "./App.css";
import Axios from "axios";
import { Pagination, Paper, Button } from "@mui/material";
import styled from "@emotion/styled";
import Modal from "./components/movie-modal/Modal";
import Card from "./components/movie-card/Card";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { keyword, selectedGenres, page, setPage } = useContext(MainContext);
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [trailer, setTrailer] = useState(null);
  const handleOpen = () => setOpen(true);
  const [topRated, setTopRated] = useState([]);
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1180,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
    ],
  };

  // Popular Movies
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
  // Search Movies
  useEffect(() => {
    if (keyword !== "") {
      Axios.get(
        "https://api.themoviedb.org/3/search/movie?api_key=" +
          API_KEY +
          "&query=" +
          keyword +
          "&page=" +
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
    }
  }, [keyword, page]);
  // Genre Movies
  useEffect(() => {
    Axios.get(
      "https://api.themoviedb.org/3/discover/movie?api_key=" +
        API_KEY +
        "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=" +
        selectedGenres.join(",") +
        "&page=" +
        page
    )
      .then((response) => {
        setCurrentPage(response.data.page);
        setTotalPages(response.data.total_pages);
        setData(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedGenres]);

  const getTrailer = (id) => {
    setTrailer(null);
    Axios.get(
      "https://api.themoviedb.org/3/movie/" +
        id +
        "/videos?api_key=" +
        API_KEY +
        "&language=en-US"
    )
      .then((response) => {
        const results = response.data.results;
        console.log(results);
        if (results.length > 0) {
          results.filter((result) => {
            if (result.name === "Official Trailer") {
              setTrailer(result.key);
            } else if (
              result.name.includes("Trailer") ||
              result.name.includes("Teaser")
            ) {
              setTrailer(result.key);
            }
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    Axios.get(
      "https://api.themoviedb.org/3/movie/top_rated?api_key=" +
        API_KEY +
        "&language=en-US&page=1"
    )
      .then((response) => {
        setTopRated(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(topRated);
  return (
    <div className="App">
      <Modal
        key={modalData.id}
        data={modalData}
        open={open}
        setOpen={setOpen}
        trailer={trailer}
      />
      {keyword === "" && selectedGenres.length === 0 && (
        <div className="top-rated">
          <h2>Top Rated Movies</h2>
          <div className="top-rated-container">
            <Slider {...settings}>
              {topRated.map((movie) => (
                <div
                  className="top-rated-card"
                  key={movie.id}
                  onClick={(e) => {
                    handleOpen();
                    setModalData(movie);
                    getTrailer(movie.id);
                  }}
                >
                  <Card key={movie.id} data={movie} />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}

      <div className="movies">
        <div>
          {keyword === "" && selectedGenres.length === 0 && (
            <h3>Explore Popular Movies</h3>
          )}
          {keyword !== "" && <h3>Search Results for "{keyword}"...</h3>}
          {selectedGenres.length > 0 && <h3>Explore Movies by Genre</h3>}
        </div>
        <div className="movies-container">
          {data.length > 0 ? (
            data.map(
              (movie) =>
                movie.poster_path && (
                  <div
                    key={movie.id}
                    onClick={(e) => {
                      handleOpen();
                      setModalData(movie);
                      getTrailer(movie.id);
                    }}
                  >
                    <Card data={movie} />
                  </div>
                )
            )
          ) : (
            <div className="movies-container-not-found">
              <div>
                <h3>No Movies Found</h3>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="pagination-container">
        <StyledPagination
          count={totalPages}
          page={currentPage}
          color="primary"
          defaultPage={1}
          siblingCount={1}
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
