import './NewsCard.css';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

export default function NewsCard({ isLoggedIn, card }) {
  const path = useHistory().location.pathname;
  const [isHovering, setIsHovering] = useState(false);

  const bookmark = (
    <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.382 15.714 6 19.942V4h12v15.942l-5.382-4.228-.618-.486-.618.486Z"
        stroke="#B6BCBF"
        strokeWidth="2"
      />
    </svg>
  );

  const hoverBookermark = (
    <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.382 15.714 6 19.942V4h12v15.942l-5.382-4.228-.618-.486-.618.486Z"
        stroke="#1A1B22"
        strokeWidth="2"
      />
    </svg>
  );

  const savedBookmark = (
    <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v18l-7-5.5L5 22V4Z"
        fill="#2F71E5"
      />
    </svg>
  );

  const handleHover = () => {
    setIsHovering((currentState) => !currentState);
  };

  if (path === '/') {
    return (
      <article className="news-card">
        {!isLoggedIn && (
          <div
            className={`news-card__tooltip ${
              isHovering && 'news-card__tooltip_visible'
            }`}
          >
            Sign in to save articles
          </div>
        )}
        <button
          className="news-card__save-button news-card__button"
          type="button"
          aria-label="Save Article"
          onMouseEnter={handleHover}
          onMouseLeave={handleHover}
        >
          {isHovering ? hoverBookermark : bookmark}
        </button>
        <img className="news-card__image" src={card.urlToImage} alt="" />
        <p className="news-card__date">{card.publishedAt}</p>
        <h2 className="news-card__title">{card.title}</h2>
        <p className="news-card__content">{card.content}</p>
        <p className="news-card__source">{card.source.name}</p>
      </article>
    );
  }

  return (
    <article className="news-card">
      <div className="news-card__tag">{card.tag}</div>
      <div
        className={`news-card__tooltip ${
          isHovering && 'news-card__tooltip_visible'
        }`}
      >
        Remove from saved
      </div>
      <button
        className="news-card__delete-button news-card__button"
        type="button"
        aria-label="Delete Article"
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
      >
        {isHovering ? hoverBookermark : savedBookmark}
      </button>
      <img className="news-card__image" src={card.image} alt="" />
      <p className="news-card__date">{card.date}</p>
      <h2 className="news-card__title">{card.title}</h2>
      <p className="news-card__content">{card.content}</p>
      <p className="news-card__source">{card.source}</p>
    </article>
  );
}
