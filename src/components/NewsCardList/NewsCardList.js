import NewsCard from '../NewsCard/NewsCard';
import React from 'react';
import './NewsCardList.css';

export default function NewsCardList({ cards, isLoggedIn }) {
  const [numCards, setNumCards] = React.useState(3);
  const [displayCards, setDisplayCard] = React.useState(
    cards.slice(0, numCards)
  );

  const handleShowMoreClick = () => {
    if (numCards > cards.length) return;
    setNumCards(numCards + 3);
    setDisplayCard(cards.slice(0, numCards + 3));
  };

  return (
    <section className="news-card-list">
      <h2 className="news-card-list__title">Search results</h2>
      <div className="news-card-list__card-wrapper">
        {displayCards.map((card, index) => (
          <NewsCard key={index} card={card} isLoggedIn={isLoggedIn} />
        ))}
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
