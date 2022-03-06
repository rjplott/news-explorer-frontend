import Navigation from '../Navigation/Navigation';
import './Header.css';
import { useHistory } from 'react-router-dom';
import * as React from 'react';

type Props = {
  isLoggedIn: boolean;
  onSignInClick?: () => void;
  handleLogout: () => void;
};

export default function Header({
  isLoggedIn,
  onSignInClick,
  handleLogout,
}: Props) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

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
        {typeof onSignInClick === 'undefined' ? 
        <Navigation
        isLoggedIn={isLoggedIn}
        path={path}
        handleLogout={handleLogout}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      :
      <Navigation
          isLoggedIn={isLoggedIn}
          path={path}
          onSignInClick={onSignInClick}
          handleLogout={handleLogout}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />}
      </div>
    </header>
  );
}
