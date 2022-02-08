import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import NoResults from '../NoResults/NoResults';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import { useState } from 'react';

export default function Main({
  cards,
  isLoggedIn,
  handleLogout,
  handleLogin,
  handleRegister,
  name,
  handleRequestNews,
  numCards,
  displayCards,
  setNumCards,
  setDisplayCards,
  isSearching,
  hasSearched,
  apiError,
}) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const handleOpenLogin = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  };

  const handleOpenRegister = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  };

  const handleClosePopups = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
  };

  const renderResults = () => {
    if (!hasSearched) {
      return;
    } else if (isSearching) {
      return <Preloader />;
    } else if (apiError || cards.length > 1) {
      return (
        <NewsCardList
          cards={cards}
          isLoggedIn={isLoggedIn}
          numCards={numCards}
          displayCards={displayCards}
          setNumCards={setNumCards}
          setDisplayCards={setDisplayCards}
          apiError={apiError}
        />
      );
    } else {
      return <NoResults />;
    }
  };

  return (
    <div className="page">
      <Register
        isOpen={isRegisterOpen}
        handleClosePopup={handleClosePopups}
        handleLinkClick={handleOpenLogin}
        handleRegister={handleRegister}
      />
      <Login
        isOpen={isLoginOpen}
        handleClosePopup={handleClosePopups}
        handleLinkClick={handleOpenRegister}
        handleLogin={handleLogin}
      />
      <SearchForm
        isLoggedIn={isLoggedIn}
        onSignInClick={handleOpenLogin}
        handleLogout={handleLogout}
        name={name}
        handleRequestNews={handleRequestNews}
      />
      <main className="main">
        {renderResults()}
        <About />
      </main>
      <Footer />
    </div>
  );
}
