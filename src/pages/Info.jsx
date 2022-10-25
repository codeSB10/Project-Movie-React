import { useNavigate, useParams } from "react-router-dom";
import { Nav } from "../components/Nav";
import axios from "axios";
import { useEffect, useState } from "react";
import { MovieInfo } from "../components/Movie-Info";

export default function Info() {
  const { id } = useParams();
  const [movie, setMovie] = useState();
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      fetchMovie();
    }, 300);
  }, []);

  async function fetchMovie() {
    setLoading(true);
    const { data } = await axios.get(
      `https://www.omdbapi.com/?apikey=6f07cddd&i=${id}`
    );
    setMovie(data);
    setLoading(false);
  }

  return (
    <>
      <Nav />
      <div className="movie-info">
          <h3 className="info__back"
            onClick={() => {
              navigate('/movies');
            }}
          >&larr; Back</h3>
        <div className="container">
          <h1 className="info-heading">Movie Info:</h1>
          {loading ? (
            <div className="info__movie">
              <div className="info__head">
                <div className="img-skeleton info__skeleton"></div>
                <div className="info__head--desc">
                  <h2 className="info__name title-skeleton info__skeleton"></h2>
                  <h3 className="info__title para-skeleton info__skeleton"></h3>
                  <h3 className="info__title para-skeleton info__skeleton"></h3>
                </div>
              </div>
              <div className="info__body">
                <h3 className="info__title">Plot</h3>
                <p className="info__para plot-skeleton info__skeleton"></p>
                <div className="info__genre"></div>
                <h3 className="info__title">Director</h3>
                <p className="info__para para-skeleton info__skeleton"></p>
                <h3 className="info__title">Writer</h3>
                <p className="info__para para-skeleton info__skeleton"></p>
                <h3 className="info__title">Cast</h3>
                <p className="info__para para-skeleton info__skeleton"></p>
              </div>
            </div>
          ) : (
            <MovieInfo movie={movie} />
          )}
        </div>
      </div>
    </>
  );
}
