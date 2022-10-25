import Logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Nav = () => {
  function openMenu() {
    document.body.classList += " menu--open";
  }

  function closeMenu() {
    document.body.classList.remove("menu--open");
  }

  const navigate = useNavigate();

  return (
    <nav>
      <img
        src={Logo}
        alt="Logo"
        className="logo"
        onClick={() => navigate("/")}
      />
      <ul className="nav__links">
        <li className="nav__link">
          <Link to="/">Home</Link>
        </li>
        <li className="nav__link">
          <Link to="/movies">Movies</Link>
        </li>
        <li className="nav__link">
          <a className="a__no">Contact</a>
        </li>
      </ul>
      <button onClick={openMenu} className="menu-btn">
        <FontAwesomeIcon icon="bars" />
      </button>
      <div className="menu__dropdown">
        <button onClick={closeMenu} className="menu-btn">
          <FontAwesomeIcon icon="xmark" />
        </button>
        <ul className="menu__links">
          <li className="menu__link" onClick={closeMenu}>
            <Link to="/">Home</Link>
          </li>
          <li className="menu__link" onClick={closeMenu}>
            <Link to="/movies">Movies</Link>
          </li>
          <li
            className="menu__link"
            onClick={() => {
              closeMenu();
              window.localStorage.removeItem("VALUE");
            }}
          >
            <a className="a__no">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
