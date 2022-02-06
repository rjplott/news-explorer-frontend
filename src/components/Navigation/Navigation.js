import { Link } from 'react-router-dom';
import './Navigation.css';
import logout from '../../images/logout.svg';
import logoutLight from '../../images/logout-light.svg';

export default function Navigation({
  isLoggedIn,
  name,
  path,
  onSignInClick,
  handleLogout,
}) {
  if (isLoggedIn) {
    return (
      <ul className="navigation">
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
        <li className="navigation__list-item" onClick={handleLogout}>
          <Link
            to="/"
            className={`navigation__link navigation__link_type_logout ${
              path === '/saved-news'
                ? 'navigation__link_light-theme navigation__link_type_logout_light-theme'
                : ''
            }`}
          >
            <span className="navigation__user-name">{name}</span>
            <img
              src={path === '/saved-news' ? logoutLight : logout}
              alt="Logout icon"
              className="navigation__logout-icon"
            />
          </Link>
        </li>
      </ul>
    );
  } else {
    return (
      <ul className="navigation">
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
            onClick={onSignInClick}
          >
            Sign In
          </Link>
        </li>
      </ul>
    );
  }
}
