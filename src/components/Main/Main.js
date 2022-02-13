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
  articles,
  setArticles,
  isLoggedIn,
  handleLogout,
  handleLogin,
  handleRegister,
  name,
  handleRequestNews,
  searchStatus
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
    if (searchStatus === 'not searched') {
      return;
    } else if (searchStatus === 'is searching') {
      return <Preloader />;
    } else if (searchStatus === 'results' || searchStatus === 'error') {
      return (
        <NewsCardList
          articles={articles}
          setArticles={setArticles}
          isLoggedIn={isLoggedIn}
          searchStatus={searchStatus}
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
