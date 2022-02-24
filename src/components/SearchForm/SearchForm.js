import './SearchForm.css';
import Header from '../Header/Header';
import { useState } from 'react';

export default function SearchForm({
  isLoggedIn,
  onSignInClick,
  handleLogout,
  name,
  handleRequestNews,
}) {
  const [searchValue, setSearchValue] = useState('');
  const [canSearch, setCanSearch] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRequestNews(searchValue);
    setSearchValue('');
    setCanSearch(false);
  };

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
    setCanSearch(e.target.validity.valid);
  };

  return (
    <div className="news-search">
      <Header
        isLoggedIn={isLoggedIn}
        onSignInClick={onSignInClick}
        handleLogout={handleLogout}
        name={name}
      />
      <form className="seach-form" onSubmit={handleSubmit}>
        <h2 className="search-form__title">What's going on in the world?</h2>
        <p className="search-form__subtitle">
          Find the latest news on any topic and save them to your personal
          account.
        </p>
        <div className="search-form__search-wrapper">
          <input
            type="text"
            required
            id="news-search-input"
            name="news-search-input"
            className="search-form__text-input"
            placeholder="Nature"
            minLength="2"
            maxLength="30"
            value={searchValue}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            aria-label="Submit Form"
            className={`search-form__submit-button ${
              canSearch ? '' : 'search-form__submit-button_disabled'
            }`}
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
