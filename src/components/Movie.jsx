import { useNavigate } from "react-router-dom";

export const Movie = ({ movie, searchValue }) => {
  const navigate = useNavigate();

  function openInfo(id) {
    navigate(`/movies/${id}`);
  }

  return (
    <div className="movie">
      <img
        src={movie.Poster}
        alt="Poster"
        className="movie__img"
        onClick={() => openInfo(movie.imdbID)}
      />
      <div className="movie__desc">
        <h2 onClick={() => openInfo(movie.imdbID)}>{movie.Title}</h2>
        <p>Year : {movie.Year}</p>
      </div>
    </div>
  );
};
