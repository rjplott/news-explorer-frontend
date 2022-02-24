import { Link } from 'react-router-dom';
import './Navigation.css';
import logout from '../../images/logout.svg';
import logoutLight from '../../images/logout-light.svg';
import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function Navigation({
  isLoggedIn,
  path,
  onSignInClick,
  handleLogout,
  isMenuOpen,
  setIsMenuOpen,
}) {
  const hamburgerIcon = (
    <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="#fff" d="M4 8h16v2H4zM4 14h16v2H4z" />
    </svg>
  );

  const lightHamburgerIcon = (
    <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="#1A1B22" d="M4 8h16v2H4zM4 14h16v2H4z" />
    </svg>
  );

  const closeIcon = (
    <svg width="26" height="26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M26 11.556H14.444V0h-2.888v11.556H0v2.888h11.556V26h2.888V14.444H26v-2.888z"
        fill="#fff"
      />
    </svg>
  );

  const handleLoginClick = () => {
    setIsMenuOpen(false);
    onSignInClick();
  };

  const handleLogoutClick = () => {
    setIsMenuOpen(false);
    handleLogout();
  };

  const handleOpenMenu = () => setIsMenuOpen(true);

  const handleCloseMenu = () => setIsMenuOpen(false);

  const user = useContext(CurrentUserContext);


  if (isLoggedIn) {
    return (
      <div className="navigation__wrapper">
        <div
          className={`navigation__overlay ${
            isMenuOpen ? 'navigation__overlay_active' : ''
          }`}
        ></div>
        {isMenuOpen ? (
          <button className="navigation__close-icon" onClick={handleCloseMenu}>
            {closeIcon}
          </button>
        ) : (
          <button
            className="navigation__hamburger-icon"
            onClick={handleOpenMenu}
          >
            {path === '/saved-news' ? lightHamburgerIcon : hamburgerIcon}
          </button>
        )}
        <ul className={`navigation ${isMenuOpen ? 'navigation_active' : ''}`}>
          <li className="navigation__list-item">
            <Link
              to="/"
              className={`navigation__link navigation__link_type_home-logged-in ${
                path === '/saved-news'
                  ? 'navigation__link_light-theme '
                  : 'navigation__link_current'
              }`}
            >
              Home
            </Link>
          </li>
          <li className="navigation__list-item">
            <Link
              to="/saved-news"
              className={`navigation__link navigation__link_type_saved ${
                path === '/saved-news'
                  ? 'navigation__link_light-theme navigation__link_current navigation__link_current_light-theme'
                  : ''
              }`}
            >
              Saved Articles
            </Link>
          </li>
          <li className="navigation__list-item" onClick={handleLogoutClick}>
            <Link
              to="/"
              className={`navigation__link navigation__link_type_logout ${
                path === '/saved-news'
                  ? 'navigation__link_light-theme navigation__link_type_logout_light-theme'
                  : ''
              }`}
            >
              <span className="navigation__user-name">{user.name}</span>
              <img
                src={path === '/saved-news' ? logoutLight : logout}
                alt="Logout icon"
                className="navigation__logout-icon"
              />
            </Link>
          </li>
        </ul>
      </div>
    );
  } else {
    return (
      <div className="navigation__wrapper">
        <div
          className={`navigation__overlay ${
            isMenuOpen ? 'navigation__overlay_active' : ''
          }`}
        ></div>
        {isMenuOpen ? (
          <button className="navigation__close-icon" onClick={handleCloseMenu}>
            {closeIcon}
          </button>
        ) : (
          <button
            className="navigation__hamburger-icon"
            onClick={handleOpenMenu}
          >
            {path === '/saved-news' ? lightHamburgerIcon : hamburgerIcon}
          </button>
        )}

        <ul className={`navigation ${isMenuOpen ? 'navigation_active' : ''}`}>
          <li className="navigation__list-item">
            <Link
              to="/"
              className="navigation__link navigation__link_current navigation__link_type_home-logged-out"
            >
              Home
            </Link>
          </li>
          <li className="navigation__list-item">
            <Link
              to="/"
              className="navigation__link navigation__link_type_login"
              onClick={handleLoginClick}
            >
              Sign In
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}
