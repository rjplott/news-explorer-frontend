import { Link } from 'react-router-dom';
import './Navigation.css';

export default function Navigation({ isLoggedIn, user }) {
  if (isLoggedIn) {
    return (
      <ul className="navigation">
        <li className="navigation__list-item">
          <Link to="/" className="navigation__link navigation__link_current">
            Home
          </Link>
        </li>
        <li className="navigation__list-item">
          <Link to="/" className="navigation__link">
            Saved Articles
          </Link>
        </li>
        <li className="navigation__list-item">
          <Link to="/" className="navigation__link">
            {user}
          </Link>
        </li>
      </ul>
    );
  } else {
    return (
      <ul className="navigation">
        <li className="navigation__list-item">
          <Link to="/" className="navigation__link">
            Home
          </Link>
        </li>
        <li className="navigation__list-item">
          <Link to="/" className="navigation__link">
            Sign In
          </Link>
        </li>
      </ul>
    );
  }
}
