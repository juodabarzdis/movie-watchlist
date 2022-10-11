import { useEffect, useState, useRef } from "react";
import Axios from "axios";
import "./Suggestions.css";

const Suggestions = () => {
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  const [data, setData] = useState([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const imgRef = useRef(null);
  setTimeout(() => {
    if (suggestionIndex <= data.length - 2) {
      setSuggestionIndex(suggestionIndex + 1);
    } else {
      setSuggestionIndex(0);
    }
  }, 10000);

  useEffect(() => {
    Axios.get(
      "https://api.themoviedb.org/3/discover/movie?api_key=" +
        API_KEY +
        "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_watch_monetization_types=flatrate&vote_count.gte=25000"
    )
      .then((response) => {
        console.log(response.data.results);
        setData(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(data[0]);

  return (
    <div className="suggestions">
      <div className="suggestion">
        <div className="suggestion-left">
          <div className="suggestion-left-image-container">
            <img
              ref={imgRef}
              src={`https://image.tmdb.org/t/p/w1280${data[suggestionIndex]?.backdrop_path}`}
              alt="movie poster"
            />
            <div className="suggestion-left-poster">
              <img
                src={`https://image.tmdb.org/t/p/w500${data[suggestionIndex]?.poster_path}`}
                alt="movie poster"
              />
            </div>
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
