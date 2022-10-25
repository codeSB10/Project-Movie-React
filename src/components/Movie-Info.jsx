import { Ratings } from "./Ratings";

export const MovieInfo = ({ movie }) => {
  return (
    <div className="info__movie">
      <div className="info__head">
        <a href={movie?.Poster} target="_blank">
          <img src={movie?.Poster} alt="Poster" className="info__img" />
        </a>
        <div className="info__head--desc">
          <h2 className="info__name">{movie?.Title}</h2>
          <h3 className="info__title">{movie?.Released}</h3>
          <h3 className="info__title">{movie?.Runtime}</h3>
        </div>
      </div>
      <div className="info__body">
        <h3 className="info__title">Plot</h3>
        <p className="info__para">{movie?.Plot}</p>
        <div className="info__genre">{movie?.Genre}</div>
        <h3 className="info__title">Director</h3>
        <p className="info__para">{movie?.Director}</p>
        <h3 className="info__title">Writer</h3>
        <p className="info__para">{movie?.Writer}</p>
        <h3 className="info__title">Cast</h3>
        <p className="info__para">{movie?.Actors}</p>
        <Ratings data={movie?.Ratings} />
      </div>
    </div>
  );
};
