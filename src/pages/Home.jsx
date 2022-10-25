import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Nav } from "../components/Nav";
import dance1 from "../assets/dance1.png";
import dance2 from "../assets/dance2.png";

export default function Home() {
  const navigate = useNavigate();
  const [title, setTitle] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.localStorage.removeItem('VALUE');
  }, []);

  function movieSearch(title) {
    if (title) {
      setLoading(true);
      window.localStorage.setItem('VALUE', title);
      setTimeout(() => {
        navigate("/movies");
      }, 1000);
    }
  }

  function onSearch() {
    movieSearch(title);
  }

  return (
    <div className="home__container">
      <Nav />
      <h1>ABC'S most liked movie search platform</h1>
      <div className="home__search">
        <input
          className="abc"
          type="text"
          placeholder="Search Movies by title"
          onChange={(e) => setTitle(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && e.target.value && onSearch()}
        />
        <div className="home__search--icon" onClick={onSearch}>
          {!loading ? (
            <FontAwesomeIcon icon="magnifying-glass" />
          ) : (
            <FontAwesomeIcon icon="spinner" />
          )}
        </div>
      </div>
      <div className="home__img">
        <figure className="dance1">
          <img src={dance1} alt="" className="dance" />
        </figure>
        <figure className="dance2">
          <img src={dance2} alt="" className="dance" />
        </figure>
      </div>
    </div>
  );
}
