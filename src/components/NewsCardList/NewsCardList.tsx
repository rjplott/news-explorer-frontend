import NewsCard from '../NewsCard/NewsCard';
import React from 'react';
import './NewsCardList.css';
import { Articles, Card } from '../../shared/types';

interface BaseProps {
  articles: Articles;
  handleUnsaveCard: (
    id: string,
    setId: React.Dispatch<React.SetStateAction<string>>
  ) => void;
}
interface HomeProps extends BaseProps {
  path: 'home';
  setArticles: React.Dispatch<React.SetStateAction<Articles>>;
  handleSaveCard: (
    article: Card,
    setId: React.Dispatch<React.SetStateAction<string>>
  ) => void;
  handleOpenRegister: () => void;
  isLoggedIn?: boolean;
  searchStatus?: string;
}

interface SavedNewsProps extends BaseProps {
  path: 'saved-news';
}

type Props = HomeProps | SavedNewsProps;

export default function NewsCardList(props: Props) {
  if (props.path === 'saved-news') {
    return (
      <section className='news-card-list'>
        <div className='news-card-list__card-wrapper news-card-list__card-wrapper_saved-view'>
          {props.articles.cards.map((card) => {
            return (
              <NewsCard
                handleUnsaveCard={props.handleUnsaveCard}
                key={card.link}
                card={card}
              />
            );
          })}
        </div>
      </section>
    );
  } else {
    const {
      setArticles,
      handleSaveCard,
      handleOpenRegister,
      isLoggedIn,
      searchStatus,
      handleUnsaveCard,
      articles,
    } = props;

    const handleShowMoreClick = () => {
      if (articles.numDisplayed > articles.cards.length) return;
      setArticles({
        ...articles,
        numDisplayed: articles.numDisplayed + 3,
        displayedCards: articles.cards.slice(0, articles.numDisplayed + 3),
      });
    };

    const renderCards = (): JSX.Element | JSX.Element[] => {
      if (searchStatus === 'error') {
        return (
          <p className='news-card-list__api-error'>
            Sorry, something went wrong during the request. There may be a
            connection issue or the server may be down. Please try again later.
          </p>
        );
      } else if (articles.displayedCards.length > 0) {
        return articles.displayedCards.map((card) => (
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
        <h2 className='news-card-list__title'>Search results</h2>
        <div className='news-card-list__card-wrapper'>{renderCards()}</div>
        <button
          type='button'
          aria-label='Show more articles'
          className='news-card-list__button'
          onClick={handleShowMoreClick}
        >
          Show more
        </button>
      </section>
    );
  }
}
