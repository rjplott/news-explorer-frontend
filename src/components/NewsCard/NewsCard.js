import './NewsCard.css';

export default function NewsCard({ isLoggedIn, card, currentView }) {
  if (currentView === 'home') {
    return (
      <article className="news-card">
        <button
          className="news-card__save-button news-card__button"
          type="button"
          aria-label="Save Article"
        >
          <svg
            width="14"
            height="19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="news-card__button-icon news-card__button-icon_type_save"
          >
            <path
              d="M6.382 12.714L1 16.942V1h12v15.942l-5.382-4.228L7 12.228l-.618.486z"
              stroke="#B6BCBF"
              strokeWidth="2"
            />
          </svg>
        </button>
        <img className="news-card__image" src={card.image} alt="" />
        <p className="news-card__date">{card.date}</p>
        <h2 className="news-card__title">{card.title}</h2>
        <p className="news-card__content">{card.content}</p>
        <p className="news-card__source">{card.source}</p>
      </article>
    );
  }

  return (
    <article className="news-card">
      <p className="news-card__tag">{card.tag}</p>
      <button
        className="news-card__delete-button news-card__button"
        type="button"
        aria-label="Delete Article"
      ></button>
      <img className="news-card__image" src={card.image} alt="" />
      <p className="news-card__date">{card.date}</p>
      <h2 className="news-card__title">{card.title}</h2>
      <p className="news-card__content">{card.content}</p>
      <p className="news-card__source">{card.source}</p>
    </article>
  );
}
