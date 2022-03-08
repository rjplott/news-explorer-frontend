import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import NoResults from '../NoResults/NoResults';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import ConfirmationPopup from '../ConfirmationPopup/ConfirmationPopup';
import Login from '../Login/Login';
import { Articles, Card } from '../../shared/types';
import React from 'react';

interface Props {
  articles: Articles;
  setArticles: React.Dispatch<React.SetStateAction<Articles>>;
  isLoggedIn: boolean;
  handleLogout: () => void;
  handleLogin: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => void;
  handleRegister: ({
    email,
    name,
    password,
  }: {
    email: string;
    password: string;
    name: string;
  }) => void;
  handleRequestNews: (search: string) => void;
  searchStatus: string;
  serverError: string;
  isLoginOpen: boolean;
  isRegisterOpen: boolean;
  isConfirmationOpen: boolean;
  handleOpenLogin: () => void;
  handleOpenRegister: () => void;
  handleClosePopups: () => void;
  handleSaveCard: (
    article: Card,
    setId: React.Dispatch<React.SetStateAction<string>>
  ) => void;
  handleUnsaveCard: (
    id: string,
    setId: React.Dispatch<React.SetStateAction<string>>
  ) => void;
}

export default function Main({
  articles,
  setArticles,
  isLoggedIn,
  handleLogout,
  handleLogin,
  handleRegister,
  handleRequestNews,
  searchStatus,
  serverError,
  isLoginOpen,
  isRegisterOpen,
  isConfirmationOpen,
  handleOpenLogin,
  handleOpenRegister,
  handleClosePopups,
  handleSaveCard,
  handleUnsaveCard,
}: Props) {
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
          handleSaveCard={handleSaveCard}
          handleUnsaveCard={handleUnsaveCard}
          handleOpenRegister={handleOpenRegister}
          path='home'
        />
      );
    } else {
      return <NoResults />;
    }
  };

  return (
    <div className='page'>
      <Register
        isOpen={isRegisterOpen}
        handleClosePopup={handleClosePopups}
        handleLinkClick={handleOpenLogin}
        handleRegister={handleRegister}
        serverError={serverError}
      />
      <ConfirmationPopup
        isOpen={isConfirmationOpen}
        onClose={handleClosePopups}
        onLinkClick={handleOpenLogin}
      />
      <Login
        isOpen={isLoginOpen}
        handleClosePopup={handleClosePopups}
        handleLinkClick={handleOpenRegister}
        handleLogin={handleLogin}
        serverError={serverError}
      />
      <SearchForm
        isLoggedIn={isLoggedIn}
        onSignInClick={handleOpenLogin}
        handleLogout={handleLogout}
        handleRequestNews={handleRequestNews}
      />
      <main className='main'>
        {renderResults()}
        <About />
      </main>
      <Footer />
    </div>
  );
}
