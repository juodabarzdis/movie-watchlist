import React from "react";
import "./Card.css";

const Card = (props) => {
  const { data } = props;

  return (
    <div className="movie-card" key={data.id}>
      <div className="movie-image">
        <img
          src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
          alt="movie poster"
        />
        <div
          className="rating"
          style={{
            backgroundColor: data.vote_average > 7 ? "green" : "orange",
          }}
        >
          <div className="rating-value">{data.vote_average}</div>
        </div>
      </div>
      <div className="movie-info">
        <div className="movie-title">
          <h2>{data.title}</h2>
        </div>
      </div>
    </div>
  );
};

export default Card;
