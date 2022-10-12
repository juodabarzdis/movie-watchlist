import { useEffect, useContext } from "react";
import Axios from "axios";
import MainContext from "../../context/MainContext";
import "./Genres.css";

const Genres = () => {
  const {
    genres,
    setGenres,
    selectedGenres,
    setSelectedGenres,
    setPage,
    displayGenres,
    setKeyword,
  } = useContext(MainContext);

  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  useEffect(() => {
    Axios.get(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
        API_KEY +
        "&language=en-US"
    )
      .then((response) => {
        setGenres(response.data.genres);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleAdd = (genre) => {
    setKeyword("");
    setSelectedGenres([...selectedGenres, genre]);
    setPage(1);
  };

  const handleRemove = (genre) => {
    selectedGenres.includes(genre) &&
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    setPage(1);
  };

  return (
    <>
      {displayGenres && (
        <div className="genres">
          {genres.map((genre) => {
            return (
              <div
                {...(selectedGenres.includes(genre.id) && {
                  style: { backgroundColor: "red", color: "#fff" },
                })}
                className="genre"
                key={genre.id}
                onClick={() => {
                  if (selectedGenres.includes(genre.id)) {
                    handleRemove(genre.id);
                  } else {
                    handleAdd(genre.id);
                  }
                }}
              >
                {genre.name}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Genres;
