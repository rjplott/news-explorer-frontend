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

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [token, setToken] = useState('');

  const handleLogin = ({ email, password }) => {
    
    user.login({ email, password })
      .then(data => {
        console.log(data);
        localStorage.setItem('token', JSON.stringify(data.token));
      })
      .catch(err => console.log(err));

    
    setIsLoggedIn(true);
  };
  const handleLogout = () => setIsLoggedIn(false);
  const handleRegister = ({ name, email, password }) => {
    
    user.register({name, email, password})
      .then(data => console.log(data))
      .catch(err => console.log(err));
    setIsLoggedIn(true);

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

  useEffect(() => {
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

      const existingToken = localStorage.getItem('token');

      if (existingToken) {
        setToken(existingToken);
        user.getInformation(existingToken)
          .then(info => {
            setUserInfo(info.data);
            setIsLoggedIn(true);
          });
      }
    }
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
