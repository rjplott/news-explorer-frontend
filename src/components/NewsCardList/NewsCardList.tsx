import NewsCard from '../NewsCard/NewsCard';
import React from 'react';
import './NewsCardList.css';
import { useHistory } from 'react-router-dom';
import { Articles } from '../../shared/types';

interface Props {
  articles: Articles;
  setArticles?: React.Dispatch<React.SetStateAction<Articles>>;
  isLoggedIn?: boolean;
  searchStatus?: string;
  handleSaveCard?: () => void;
  handleUnsaveCard: (
    id: string,
    setId: React.Dispatch<React.SetStateAction<string>>
  ) => void;
  handleOpenRegister?: () => void;
}

export default function NewsCardList({
  articles,
  setArticles,
  isLoggedIn,
  searchStatus,
  handleSaveCard,
  handleUnsaveCard,
  handleOpenRegister,
}: Props) {
  const handleShowMoreClick = () => {
    if (articles.numDisplayed > articles.cards.length || !setArticles) return;
    setArticles({
      ...articles,
      numDisplayed: articles.numDisplayed + 3,
      displayedCards: articles.cards.slice(0, articles.numDisplayed + 3),
    });
  };

  const displayedCards = articles.displayedCards || articles;

  const path = useHistory().location.pathname;

  const renderCards = (): JSX.Element | JSX.Element[] => {
    if (searchStatus === 'error') {
      return (
        <p className='news-card-list__api-error'>
          Sorry, something went wrong during the request. There may be a
          connection issue or the server may be down. Please try again later.
        </p>
      );
    } else if (displayedCards.length > 0) {
      return displayedCards.map((card) => (
        <NewsCard
          handleSaveCard={handleSaveCard}
          handleUnsaveCard={handleUnsaveCard}
          key={card.link}
          card={card}
          isLoggedIn={isLoggedIn}
          handleOpenRegister={handleOpenRegister}
        />
      ));
    } else {
      return <></>;
    }
  };

  return (
    <section className='news-card-list'>
      {path !== '/saved-news' ? (
        <h2 className='news-card-list__title'>Search results</h2>
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
        {renderCards()}
      </div>
      {path === '/' ? (
        <button
          type='button'
          aria-label='Show more articles'
          className='news-card-list__button'
          onClick={handleShowMoreClick}
        >
          Show more
        </button>
      ) : (
        <></>
      )}
    </section>
  );
}
