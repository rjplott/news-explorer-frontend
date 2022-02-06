import './App.css';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { useState } from 'react';
function App() {
  const cards = [
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

  const [isLoggedIn, setIsLoggedIn] = useState(true);
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

  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Main
              isLoggedIn={isLoggedIn}
              cards={cards}
              handleLogin={handleLogin}
              handleLogout={handleLogout}
              handleRegister={handleRegister}
              name={username}
            />
          </Route>
        </Switch>
        <Switch>
          <Route path="/saved-news">
            <SavedNews
              isLoggedIn={isLoggedIn}
              savedCards={cards}
              handleLogout={handleLogout}
              name={username}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
