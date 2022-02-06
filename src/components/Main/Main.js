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
}) {
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isRegisterVisible, setIsRegisterVisible] = useState(false);

  const handleOpenLogin = () => {
    setIsRegisterVisible(false);
    setIsLoginVisible(true);
    setIsPopupOpen(true);
  };

  const handleClosePopups = () => {
    setIsPopupOpen(false);
    setIsRegisterVisible(false);
    setIsLoginVisible(false);
  };

  const handleSwapPopups = () => {
    setIsLoginVisible((previousState) => !previousState);
    setIsRegisterVisible((previousState) => !previousState);
  };

  return (
    <div className="page">
      <Register
        isOpen={isPopupOpen}
        isVisible={isRegisterVisible}
        handleClosePopup={handleClosePopups}
        handleLinkClick={handleSwapPopups}
        handleRegister={handleRegister}
      />
      <Login
        isOpen={isPopupOpen}
        isVisible={isLoginVisible}
        handleClosePopup={handleClosePopups}
        handleLinkClick={handleSwapPopups}
        handleLogin={handleLogin}
      />
      <SearchForm
        isLoggedIn={isLoggedIn}
        onSignInClick={handleOpenLogin}
        handleLogout={handleLogout}
        name={name}
      />
      <main className="main">
        <NewsCardList cards={cards} isLoggedIn={isLoggedIn} />
        <Preloader />
        <NoResults />
        <About />
      </main>
      <Footer />
    </div>
  );
}
