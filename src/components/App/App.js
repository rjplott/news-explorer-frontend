import './App.css';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';
import fetchNews from '../../utils/NewsSearchApi';
import {SAVED_CARDS} from '../../utils/constants';

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
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    setUsername('Placeholder');
    setIsLoggedIn(true);
  };
  const handleLogout = () => setIsLoggedIn(false);
  const handleRegister = (name) => {
    setUsername(name);
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
    }
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Main
              isLoggedIn={isLoggedIn}
              handleLogin={handleLogin}
              handleLogout={handleLogout}
              handleRegister={handleRegister}
              name={username}
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
              name={username}
              articles={SAVED_CARDS}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
