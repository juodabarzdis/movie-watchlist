import { useEffect, useState, useRef, useContext } from "react";
import Axios from "axios";
import "./Suggestions.css";
import MainContext from "../../context/MainContext";
import YouTube from "react-youtube";

const Suggestions = () => {
  const { selectedGenres } = useContext(MainContext);
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  const [data, setData] = useState([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const suggestionsRef = useRef(null);
  const imgRef = useRef(null);
  const [trailer, setTrailer] = useState(null);

  const opts = {
    height: "520px",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  setTimeout(() => {
    if (suggestionIndex <= data.length - 2) {
      setSuggestionIndex(suggestionIndex + 1);
    } else {
      setSuggestionIndex(0);
    }
  }, 30000);

  useEffect(() => {
    imgRef.current.classList.add("fadeIn");
    setTimeout(() => {
      imgRef.current.classList.remove("fadeIn");
    }, 2000);
  }, [suggestionIndex]);

  useEffect(() => {
    Axios.get(
      "https://api.themoviedb.org/3/discover/movie?api_key=" +
        API_KEY +
        "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_watch_monetization_types=flatrate&vote_count.gte=20000"
    )
      .then((response) => {
        setData(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    Axios.get(
      "https://api.themoviedb.org/3/movie/" +
        data[suggestionIndex]?.id +
        "/videos?api_key=" +
        API_KEY +
        "&language=en-US"
    )
      .then((response) => {
        const results = response.data.results;
        if (results.length > 0) {
          results.filter((result) => {
            if (result.type === "Trailer") {
              setTrailer(result.key);
            }
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [suggestionIndex]);

  console.log(trailer);
  return (
    <div ref={suggestionsRef} className="suggestions">
      <div className="suggestion">
        <div className="suggestion-left">
          <div ref={imgRef} className="suggestion-left-video-container">
            <YouTube videoId={trailer} opts={opts} />

            {/* <div className="suggestion-left-poster">
              <img
                style={{
                  opacity: data[suggestionIndex]?.poster_path ? 1 : 0,
                }}
                src={`https://image.tmdb.org/t/p/w500${data[suggestionIndex]?.poster_path}`}
                alt="movie poster"
              />
            </div> */}
          </div>
        </div>

        <div className="suggestion-right">
          <div className="suggestion-right-title">
            <h2>{data[suggestionIndex]?.title}</h2>
          </div>
          <div className="suggestion-right-overview">
            <p>{data[suggestionIndex]?.overview}</p>
          </div>
          <div className="suggestion-right-details">
            <div
              style={{
                backgroundColor:
                  data[suggestionIndex]?.vote_average > 7 ? "green" : "orange",
              }}
            >
              {data[suggestionIndex]?.vote_average}
            </div>
            <div>Votes: {data[suggestionIndex]?.vote_count}</div>
            <div>Popularity: {data[suggestionIndex]?.popularity}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
