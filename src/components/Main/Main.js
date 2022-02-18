import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import NoResults from '../NoResults/NoResults';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import ConfirmationPopup from '../ConfirmationPopup/ConfirmationPopup';
import Login from '../Login/Login';

export default function Main({
  articles,
  setArticles,
  isLoggedIn,
  handleLogout,
  handleLogin,
  handleRegister,
  name,
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
  handleUnsaveCard
}) {

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
