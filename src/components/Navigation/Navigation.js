import { Link } from 'react-router-dom';
import './Navigation.css';
import logout from '../../images/logout.svg';

export default function Navigation({ isLoggedIn, user }) {
  if (isLoggedIn) {
    return (
      <ul className="navigation">
        <li className="navigation__list-item">
          <Link
            to="/"
            className="navigation__link navigation__link_current navigation__link_type_home-logged-in"
          >
            Home
          </Link>
        </li>
        <li className="navigation__list-item">
          <Link to="/" className="navigation__link navigation__link_type_saved">
            Saved Articles
          </Link>
        </li>
        <li className="navigation__list-item">
          <Link
            to="/"
            className="navigation__link navigation__link_type_logout"
          >
            <span className="navigation__user-name">{user}</span>
            <img
              src={logout}
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
          <Link to="/" className="navigation__link navigation__link_type_login">
            Sign In
          </Link>
        </li>
      </ul>
    );
  }
}
