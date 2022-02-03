import './SearchForm.css';
import Header from '../Header/Header';

export default function SearchForm() {
  return (
    <div className="news-search">
      <Header route="home" />
      <form className="seach-form">
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
            maxLength="20"
          />
          <button
            type="submit"
            aria-label="Submit Form"
            className="search-form__submit-button"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
