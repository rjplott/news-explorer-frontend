import './App.css';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import fetchNews from '../../utils/NewsSearchApi';
import { userApi, articleApi } from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import withProtectedRoute from '../withProtectedRoute/withProtectedRoute';
import { Card, Articles, ApiArticle, SavedArticles } from '../../shared/types';

function App() {
  const [articles, setArticles] = useState<Articles>({
    cards: [],
    numDisplayed: 0,
    displayedCards: [],
  });

  const [savedArticles, setSavedArticles] = useState<SavedArticles>({
    cards: [],
    numDisplayed: 0,
    displayedCards: [],
  });

  const [searchInfo, setSearchInfo] = useState({
    status: 'not searched',
    term: '',
  });

  const handleRequestNews = (search: string): void => {
    setSearchInfo({ status: 'is searching', term: search });
  };

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const handleApiError = (error: string): void => console.log(error);

  const handleOpenLogin = (): void => {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
    setIsConfirmationOpen(false);
  };

  const handleOpenRegister = (): void => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
    setIsConfirmationOpen(false);
  };

  const handleOpenConfirmation = (): void => {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
    setIsConfirmationOpen(true);
  };

  const handleClosePopups = (): void => {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
    setIsConfirmationOpen(false);
    setServerError('');
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<{
    name: string;
    email: string;
  } | null>(null);
  const [serverError, setServerError] = useState('');

  const handleLogin = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): void => {
    setServerError('');
    userApi
      .login({ email, password })
      .then((data) => {
        localStorage.setItem('token', data.token);
        validateToken(data.token);
        handleClosePopups();
      })
      .catch(() =>
        setServerError('Email or password not recognized, please try again.')
      );
  };

  const handleLogout = (): void => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    setUserInfo(null);
  };

  const handleRegister = ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }): void => {
    setServerError('');
    userApi
      .register({ name, email, password })
      .then(() => handleOpenConfirmation())
      .catch(() =>
        setServerError('Registration was not successful, please try again.')
      );
  };

  const handleSaveCard = (
    article: Card,
    setId: React.Dispatch<React.SetStateAction<string>>
  ): void => {
    articleApi
      .create(article)
      .then((data) => {
        if (data.data._id) setId(data.data._id);
        setSavedArticles({
          ...savedArticles,
          cards: [...savedArticles.cards, data.data],
        });
      })
      .catch(handleApiError);
  };

  const handleUnsaveCard = (
    id: string,
    setId: React.Dispatch<React.SetStateAction<string>>
  ): void => {
    articleApi
      .delete(id)
      .then(() => {
        setId('');
        setSavedArticles(
          (articles) => ({
            ...articles,
            cards: articles.cards.filter((art) => art._id !== id),
          }) // only save those articles whose id is not equal to the current id
        );
      })
      .catch(handleApiError);
  };

  useEffect((): void => {
    if (searchInfo.term) {
      fetchNews(searchInfo.term)
        .then((data) => {
          const cards = data.articles.map((article: ApiArticle) => {
            return {
              keyword: searchInfo.term,
              title: article.title,
              text: article.description,
              date: article.publishedAt,
              source: article.source.name,
              link: article.url,
              image: article.urlToImage,
            };
          });

          setArticles({
            cards: cards,
            numDisplayed: 3,
            displayedCards: cards.slice(0, 3),
          });

          localStorage.setItem('cards', JSON.stringify(cards));

          if (cards.length > 0) {
            setSearchInfo({
              term: '',
              status: 'results',
            });
          } else {
            setSearchInfo({
              term: '',
              status: 'no results',
            });
          }
        })
        .catch(() => {
          setSearchInfo({
            term: '',
            status: 'error',
          });
          setArticles({
            cards: [],
            numDisplayed: 0,
            displayedCards: [],
          });
        });
    }
  }, [searchInfo]);

  const validateToken = useCallback((token: string) => {
    const getSavedCards = (): void => {
      articleApi
        .getSavedArticles()
        .then((data) => {
          setSavedArticles((prevArticles) => ({
            ...prevArticles,
            cards: data.data,
          }));
        })
        .catch(handleApiError);
    };

    if (token) {
      articleApi.setToken(token);
      userApi
        .getInformation(token)
        .then((info) => {
          setUserInfo(info.data);
          setIsLoggedIn(true);
          getSavedCards();
        })
        .catch(handleApiError);
    }
  }, []);

  const handleStoredArticles = (): void => {
    let storedCards: Card[] | null = JSON.parse(
      localStorage.getItem('cards') || 'null'
    );

    if (storedCards) {
      setArticles({
        cards: storedCards,
        numDisplayed: 3,
        displayedCards: storedCards.slice(0, 3),
      });

      setSearchInfo({
        term: '',
        status: 'results',
      });
    }
  };

  useEffect((): void => {
    const existingToken = localStorage.getItem('token');
    if (existingToken) {
      validateToken(existingToken);
    }
    handleStoredArticles();
  }, [validateToken]);

  const ProtectedSavedNews = withProtectedRoute(SavedNews, isLoggedIn);

  return (
    <CurrentUserContext.Provider value={userInfo}>
      <div className='app'>
        <BrowserRouter>
          <Switch>
            <Route exact path='/'>
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
                isConfirmationOpen={isConfirmationOpen}
                isLoginOpen={isLoginOpen}
                isRegisterOpen={isRegisterOpen}
                handleOpenLogin={handleOpenLogin}
                handleOpenRegister={handleOpenRegister}
                handleClosePopups={handleClosePopups}
                handleSaveCard={handleSaveCard}
                handleUnsaveCard={handleUnsaveCard}
              />
            </Route>
          </Switch>
          <Switch>
            <Route path='/saved-news'>
              <ProtectedSavedNews
                isLoggedIn={isLoggedIn}
                handleLogout={handleLogout}
                savedArticles={savedArticles}
                handleUnsaveCard={handleUnsaveCard}
              />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
