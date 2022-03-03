import './NewsCard.css';
import { useHistory } from 'react-router-dom';
import * as React from 'react';
import { useState } from 'react';

type Card = {
  _id: string;
  date: Date;
  image: string;
  title: string;
  text: string;
  source: string;
  keyword: string;
};

type Props = {
  isLoggedIn: boolean;
  card: Card;
  handleSaveCard: (
    card: Card,
    setId: React.Dispatch<React.SetStateAction<string>>
  ) => void;
  handleUnsaveCard: (
    id: string,
    setId: React.Dispatch<React.SetStateAction<string>>
  ) => void;
  handleOpenRegister: () => void;
};

export default function NewsCard({
  isLoggedIn,
  card,
  handleSaveCard,
  handleUnsaveCard,
  handleOpenRegister,
}: Props): JSX.Element {
  const path = useHistory().location.pathname;
  const [isHovering, setIsHovering] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [id, setId] = useState('' || card._id);

  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  } as const;
  const convertedDate = new Date(card.date).toLocaleString(
    'en-US',
    dateOptions
  );

  const bookmark = (
    <svg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M11.382 15.714 6 19.942V4h12v15.942l-5.382-4.228-.618-.486-.618.486Z'
        stroke='#B6BCBF'
        strokeWidth='2'
      />
    </svg>
  );

  const hoverBookermark = (
    <svg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M11.382 15.714 6 19.942V4h12v15.942l-5.382-4.228-.618-.486-.618.486Z'
        stroke='#1A1B22'
        strokeWidth='2'
      />
    </svg>
  );

  const savedBookmark = (
    <svg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M5 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v18l-7-5.5L5 22V4Z'
        fill='#2F71E5'
      />
    </svg>
  );

  const trashIcon = (
    <svg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M15 3H9v2H3v2h18V5h-6V3ZM5 9v11a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9h-2v11H7V9H5Zm4 0v9h2V9H9Zm4 0v9h2V9h-2Z'
        fill='#B6BCBF'
      />
    </svg>
  );

  const hoverTrashIcon = (
    <svg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M15 3H9v2H3v2h18V5h-6V3ZM5 9v11a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9h-2v11H7V9H5Zm4 0v9h2V9H9Zm4 0v9h2V9h-2Z'
        fill='#1A1B22'
      />
    </svg>
  );
  const handleHover = (): void => {
    setIsHovering((currentState) => !currentState);
  };

  const handleSaveClick = (): void => {
    if (!isLoggedIn) {
      handleOpenRegister();
      return;
    }

    if (!isBookmarked) {
      handleSaveCard(card, setId);
      setIsBookmarked(true);
    } else {
      handleUnsaveCard(id, setId);
      setIsBookmarked(false);
    }
  };

  const handleDeleteClick = (): void => {
    handleUnsaveCard(id, setId);
  };

  if (path === '/') {
    return (
      <article className='news-card'>
        {!isLoggedIn ? (
          <div
            className={`news-card__tooltip ${
              isHovering && 'news-card__tooltip_visible'
            }`}
          >
            Sign in to save articles
          </div>
        ) : isBookmarked ? (
          <div
            className={`news-card__tooltip ${
              isHovering && 'news-card__tooltip_visible'
            }`}
          >
            Remove from saved
          </div>
        ) : (
          ''
        )}
        <button
          className='news-card__save-button news-card__button'
          type='button'
          aria-label='Save Article'
          onMouseEnter={handleHover}
          onMouseLeave={handleHover}
          onClick={handleSaveClick}
        >
          {isBookmarked
            ? savedBookmark
            : isHovering
            ? hoverBookermark
            : bookmark}
        </button>
        <img className='news-card__image' src={card.image} alt='' />
        <p className='news-card__date'>{convertedDate}</p>
        <h2 className='news-card__title'>{card.title}</h2>
        <p className='news-card__content'>{card.text}</p>
        <p className='news-card__source'>{card.source}</p>
      </article>
    );
  }

  return (
    <article className='news-card'>
      <div className='news-card__tag'>{card.keyword}</div>
      <div
        className={`news-card__tooltip ${
          isHovering && 'news-card__tooltip_visible'
        }`}
      >
        Remove from saved
      </div>
      <button
        className='news-card__delete-button news-card__button'
        type='button'
        aria-label='Delete Article'
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
        onClick={handleDeleteClick}
      >
        {isHovering ? hoverTrashIcon : trashIcon}
      </button>
      <img className='news-card__image' src={card.image} alt='' />
      <p className='news-card__date'>{convertedDate}</p>
      <h2 className='news-card__title'>{card.title}</h2>
      <p className='news-card__content'>{card.text}</p>
      <p className='news-card__source'>{card.source}</p>
    </article>
  );
}
