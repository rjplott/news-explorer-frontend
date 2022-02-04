import Navigation from '../Navigation/Navigation';
import './Header.css';

export default function Header({ route }) {
  return (
    <header
      className={`header ${
        route === 'saved-news' ? 'header__light-theme' : ''
      }`}
    >
      <div className="header__wrapper">
        <h1
          className={`header__title ${
            route === 'saved-news' ? 'header__title_light-theme' : ''
          }`}
        >
          NewsExplorer
        </h1>
        <Navigation isLoggedIn={true} route={route} user="Joe" />
      </div>
    </header>
  );
}
