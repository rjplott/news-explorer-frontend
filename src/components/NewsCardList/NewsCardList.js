import NewsCard from '../NewsCard/NewsCard';
import React from 'react';
import './NewsCardList.css';
import { useHistory } from 'react-router-dom';

export default function NewsCardList({
  cards,
  isLoggedIn,
  numCards,
  setNumCards,
  setDisplayCards,
  displayCards,
  apiError,
}) {
  const handleShowMoreClick = () => {
    if (numCards > cards.length) return;
    setNumCards(numCards + 3);
    setDisplayCards(cards.slice(0, numCards + 3));
  };

  const path = useHistory().location.pathname;

  return (
    <section className="news-card-list">
      {path !== '/saved-news' ? (
        <h2 className="news-card-list__title">Search results</h2>
      ) : (
        ''
      )}
      <div
        className={`news-card-list__card-wrapper ${
          path === '/saved-news'
            ? 'news-card-list__card-wrapper_saved-view'
            : ''
        }`}
      >
        {apiError ? (
          <p className="news-card-list__api-error">
            Sorry, something went wrong during the request. There may be a
            connection issue or the server may be down. Please try again later.
          </p>
        ) : (
          displayCards.map((card, index) => (
            <NewsCard key={index} card={card} isLoggedIn={isLoggedIn} />
          ))
        )}
      </div>
      <button
        type="button"
        aria-label="Show more articles"
        className="news-card-list__button"
        onClick={handleShowMoreClick}
      >
        Show more
      </button>
    </section>
  );
}
