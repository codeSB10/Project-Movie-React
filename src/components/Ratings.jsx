import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import tomato from "../assets/tomato.png";

export const Ratings = ({ data }) => {
  const imdb = data?.filter(
    (elem) => elem.Source === "Internet Movie Database"
  )[0].Value;
  const rotten = data?.filter((elem) => elem.Source === "Rotten Tomatoes")[0]
    ?.Value;

  return (
    <div className="info__ratings">
      <div className="info__ratings--rating">
        <FontAwesomeIcon icon="fab fa-imdb" className="rating-icon" />
        <span className="rating">{imdb}</span>
      </div>
      <div className="info__ratings--rating">
        <img src={tomato} alt="Rotten Tomatoes" className="rating-icon tomato-icon" />
        <span className="rating">{rotten}</span>
      </div>
    </div>
  );
};
