import { Nav } from "../components/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Movie } from "../components/Movie";

export default function Movies() {
  const [searchValue, setSearchValue] = useState();
  const [movies, setMovies] = useState();
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(true);
  const page = useRef(0);
  const [totalPages, setTotalPages] = useState(0);
  const initial = useRef(false);

  useEffect(() => {
    const value = window.localStorage.getItem("VALUE");
    setSearchValue(value);
    initial.current = true;
  }, []);

  useEffect(() => {
    window.localStorage.setItem("VALUE", searchValue);
  }, [searchValue]);

  useEffect(() => {
    initial.current && onSearch();
  }, [initial.current]);

  function onSearch() {
    if (searchValue) {
      fetchMovies(searchValue, 1);
      page.current = 1;
      setSearched(true);
    } else {
      setSearched(false);
      page.current = 0;
      setTotalPages(0);
    }
  }

  async function fetchMovies(value, pageNo) {
    setLoading(true);
    const { data } = await axios.get(
      `https://www.omdbapi.com/?apikey=6f07cddd&s=${value}&page=${pageNo}`
    );
    setMovies(data.Search);
    setLoading(false);
    setTotalPages(Math.ceil(data.totalResults / 10) || 0);
    if (data.Response === "False") {
      page.current = 0;
    }
  }

  function nextPage() {
    if (page.current < totalPages) {
      page.current = page.current + 1;
      fetchMovies(searchValue, page.current);
    }
  }

  function prevPage() {
    if (page.current > 1) {
      page.current = page.current - 1;
      fetchMovies(searchValue, page.current);
    }
  }

  return (
    <>
      <section id="top">
        <Nav />
        <div className="search">
          <h1>Search Movies</h1>
          <div className="search__bar">
            <input
              type="text"
              placeholder="Search movies by title"
              defaultValue={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              onKeyPress={(event) => event.key === "Enter" && onSearch()}
            />
            <FontAwesomeIcon
              icon="magnifying-glass"
              className="search__icon"
              onClick={() => onSearch()}
            />
          </div>
        </div>
      </section>
      <main>
        <div className="container">
          <h1 className="search-heading">Search Results :</h1>
          <div className="page-info">
            <h3>
              Page: {page.current} of {totalPages}
              <FontAwesomeIcon
                icon="arrow-left"
                className="arrow"
                onClick={prevPage}
              />
              <FontAwesomeIcon
                icon="arrow-right"
                className="arrow"
                onClick={nextPage}
              />
            </h3>
          </div>
          <section id="results">
            {!searched ? (
              <h3 className="msg">Search something to show results !!</h3>
            ) : loading ? (
              new Array(10).fill(0).map((_, index) => (
                <div className="movie skeleton" key={index}>
                  <div className="movie__img img-skeleton"></div>
                  <div className="movie__desc">
                    <h2 className="title-skeleton"></h2>
                    <p className="para-skeleton"></p>
                  </div>
                </div>
              ))
            ) : movies ? (
              movies.map((movie) => (
                <Movie
                  movie={movie}
                  searchValue={searchValue}
                  key={movie.imdbID}
                />
              ))
            ) : (
              <h3 className="msg">Error. Search something else. !!</h3>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
