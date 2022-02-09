import './App.css';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';
import fetchNews from '../../utils/NewsSearchApi';

function App() {
  const [newsCards, setNewsCards] = useState([]);
  const [numCards, setNumCards] = useState(3);
  const [displayCards, setDisplayCards] = useState(
    newsCards.slice(0, numCards)
  );

  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [apiError, setApiError] = useState(false);

  const handleRequestNews = (search) => {
    setIsSearching(true);
    setHasSearched(true);
    setNumCards(3);
    setApiError(false);

    fetchNews(search)
      .then((data) => {
        setNewsCards(() => data.articles);
        localStorage.setItem('cards', JSON.stringify(data.articles));
        setDisplayCards(() => data.articles.slice(0, 3));
        setIsSearching(() => false);
      })
      .catch(() => {
        setApiError(true);
        setIsSearching(() => false);
        setNewsCards(() => []);
        setDisplayCards(() => []);
      });
  };

  const savedCards = [
    {
      date: 'January 2nd, 2020',
      title: 'Test Card 1',
      source: 'Joe.com',
      tag: 'Dummy card',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec facilisis sagittis mollis. Nulla condimentum elit sapien, eget iaculis odio mattis sit amet. Curabitur eu tellus libero. Aliquam bibendum leo quis tellus auctor ullamcorper. Phasellus iaculis maximus ipsum nec mattis. Sed nisl enim, fermentum sit amet vulputate id, mattis ac tortor.',
      image:
        'https://earthsky.org/upl/2012/09/moon_8-31-2012_Priya_Kumar_Muscat_Masqat_Oman.jpeg',
    },
    {
      date: 'January 2nd, 2020',
      title: 'Test Card 2',
      source: 'Joe.com',
      tag: 'Dummy card',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec facilisis sagittis mollis. Nulla condimentum elit sapien, eget iaculis odio mattis sit amet. Curabitur eu tellus libero. Aliquam bibendum leo quis tellus auctor ullamcorper. Phasellus iaculis maximus ipsum nec mattis. Sed nisl enim, fermentum sit amet vulputate id, mattis ac tortor.',
      image:
        'https://earthsky.org/upl/2012/09/moon_8-31-2012_Priya_Kumar_Muscat_Masqat_Oman.jpeg',
    },
    {
      date: 'January 2nd, 2020',
      title: 'Test Card 3',
      source: 'Joe.com',
      tag: 'Dummy card',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec facilisis sagittis mollis. Nulla condimentum elit sapien, eget iaculis odio mattis sit amet. Curabitur eu tellus libero. Aliquam bibendum leo quis tellus auctor ullamcorper. Phasellus iaculis maximus ipsum nec mattis. Sed nisl enim, fermentum sit amet vulputate id, mattis ac tortor.',
      image:
        'https://earthsky.org/upl/2012/09/moon_8-31-2012_Priya_Kumar_Muscat_Masqat_Oman.jpeg',
    },
    {
      date: 'January 2nd, 2020',
      title: 'Test Card 4',
      source: 'Joe.com',
      tag: 'Dummy card',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec facilisis sagittis mollis. Nulla condimentum elit sapien, eget iaculis odio mattis sit amet. Curabitur eu tellus libero. Aliquam bibendum leo quis tellus auctor ullamcorper. Phasellus iaculis maximus ipsum nec mattis. Sed nisl enim, fermentum sit amet vulputate id, mattis ac tortor.',
      image:
        'https://earthsky.org/upl/2012/09/moon_8-31-2012_Priya_Kumar_Muscat_Masqat_Oman.jpeg',
    },
  ];

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
    const storedCards = JSON.parse(localStorage.getItem('cards'));

    if (storedCards) {
      setNewsCards(() => storedCards);
      setDisplayCards(() => storedCards.slice(0, 3));
      setHasSearched(() => true);
    }
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Main
              isLoggedIn={isLoggedIn}
              cards={newsCards}
              handleLogin={handleLogin}
              handleLogout={handleLogout}
              handleRegister={handleRegister}
              name={username}
              handleRequestNews={handleRequestNews}
              numCards={numCards}
              displayCards={displayCards}
              setNumCards={setNumCards}
              setDisplayCards={setDisplayCards}
              isSearching={isSearching}
              hasSearched={hasSearched}
              apiError={apiError}
            />
          </Route>
        </Switch>
        <Switch>
          <Route path="/saved-news">
            <SavedNews
              isLoggedIn={isLoggedIn}
              savedCards={savedCards}
              handleLogout={handleLogout}
              name={username}
              displayCards={savedCards}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
