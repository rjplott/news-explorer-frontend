import Navigation from '../Navigation/Navigation';
import './Header.css';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

export default function Header({
  isLoggedIn,
  onSignInClick,
  handleLogout,
  name,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const path = useHistory().location.pathname;

  return (
    <header
      className={`header ${
        path === '/saved-news' ? 'header__light-theme' : ''
      }`}
    >
      <div
        className={`header__wrapper ${
          isMenuOpen ? 'header__wrapper_active' : ''
        }`}
      >
        <h1
          className={`header__title ${
            path === '/saved-news' ? 'header__title_light-theme' : ''
          }`}
        >
          NewsExplorer
        </h1>
        <Navigation
          isLoggedIn={isLoggedIn}
          path={path}
          name={name}
          onSignInClick={onSignInClick}
          handleLogout={handleLogout}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
      </div>
    </header>
  );
}
