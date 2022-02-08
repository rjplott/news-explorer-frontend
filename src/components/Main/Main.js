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
    console.log(isRegisterOpen);
  };

  const handleClosePopups = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
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
        {!hasSearched ? (
          <></>
        ) : isSearching ? (
          <Preloader />
        ) : cards.length < 1 ? (
          <NoResults />
        ) : (
          <NewsCardList
            cards={cards}
            isLoggedIn={isLoggedIn}
            numCards={numCards}
            displayCards={displayCards}
            setNumCards={setNumCards}
            setDisplayCards={setDisplayCards}
          />
        )}
        <About />
      </main>
      <Footer />
    </div>
  );
}
