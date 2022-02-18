import './App.css';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';
import fetchNews from '../../utils/NewsSearchApi';
import { SAVED_CARDS } from '../../utils/constants';
import { user } from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {
  const [articles, setArticles] = useState({
    cards: [],
    numDiplayed: 0,
    displayedCards: []
  });

  const [searchInfo, setSearchInfo] = useState({ status: 'not searched', term: '' });

  const handleRequestNews = (search) => {
    setSearchInfo({ status: 'is searching', term: search });
  };

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const handleOpenLogin = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
    setIsConfirmationOpen(false);
  };

  const handleOpenRegister = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
    setIsConfirmationOpen(false);
  };

  const handleOpenConfirmation = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
    setIsConfirmationOpen(true);
  };

  const handleClosePopups = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
    setIsConfirmationOpen(false);
    setServerError('');
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [token, setToken] = useState('');
  const [serverError, setServerError] = useState('')

  const handleLogin = ({ email, password }) => {
    setServerError("");
    user.login({ email, password })
      .then(data => {
        console.log(data);
        localStorage.setItem('token', data.token);
        validateToken(data.token);
        handleClosePopups();
      })
      .catch(() => setServerError('Email or password not recognized, please try again.'));
  };

  const handleLogout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('token');
    setUserInfo({});
  }

  const handleRegister = ({ name, email, password }) => {
    setServerError("");
    user.register({name, email, password})
      .then(() => handleOpenConfirmation())
      .catch(() => setServerError('Registration was not successful, please try again.'));
  };

  useEffect(() => {
    if (searchInfo.term) {
      fetchNews(searchInfo.term)
        .then((data) => {

          setArticles({
            cards: data.articles,
            numCards: 3,
            displayedCards: data.articles.slice(0, 3)
          })

          localStorage.setItem('cards', JSON.stringify(data.articles));

          if (data.articles.length > 0) {
            setSearchInfo({
              term: '',
              status: 'results'
            });
          } else {
            setSearchInfo({
              term: '',
              status: 'no results'
            });
          }
        })
        .catch(() => {
          setSearchInfo({
            term: '',
            status: 'error'
          });
          setArticles({
            cards: [],
            numCards: 0,
            displayedCards: []
          })
        });
    } 
  }, [searchInfo])

  const validateToken = (token) => {
    if (token) {
      setToken(token);
      user.getInformation(token).then((info) => {
        setUserInfo(info.data);
        setIsLoggedIn(true);
      })
        .catch((err) => console.log(err));
    }
  }

  const handleStoredArticles = () => {
    const storedCards = JSON.parse(localStorage.getItem('cards'));

    if (storedCards) {
      setArticles({
        cards: storedCards,
        numCards: 3,
        displayedCards: storedCards.slice(0, 3)
      })

      setSearchInfo({
        term: '',
        status: 'results'
      })
    }
  }

  useEffect(() => {
      const existingToken = localStorage.getItem('token');
      validateToken(existingToken);
      handleStoredArticles();
  }, []);

  return (
    <CurrentUserContext.Provider value={userInfo}>
      <div className="app">
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Main
                isLoggedIn={isLoggedIn}
                handleLogin={handleLogin}
                handleLogout={handleLogout}
                handleRegister={handleRegister}
                handleRequestNews={handleRequestNews}
                searchStatus={searchInfo.status}
                articles={articles}
                setArticles={setArticles}
                serverError={serverError}
                setServerError={setServerError}
                isConfirmationOpen={isConfirmationOpen}
                isLoginOpen={isLoginOpen}
                isRegisterOpen={isRegisterOpen}
                handleOpenLogin={handleOpenLogin}
                handleOpenRegister={handleOpenRegister}
                handleClosePopups={handleClosePopups}
              />
            </Route>
          </Switch>
          <Switch>
            <Route path="/saved-news">
              <SavedNews
                isLoggedIn={isLoggedIn}
                handleLogout={handleLogout}
                articles={SAVED_CARDS}
              />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
