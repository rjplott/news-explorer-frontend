import React from 'react';
import Header from '../Header/Header';
import './SavedNewsHeader.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useContext } from 'react';

const SavedNewsHeader = ({ articles, isLoggedIn, handleLogout }) => {

  const user = useContext(CurrentUserContext);

  const determineKeywords = () => {

    const keywords = {};

    articles.forEach((article) =>
      keywords[article.keyword]
        ? keywords[article.keyword]++
        : (keywords[article.keyword] = 1)
    );

    const sortedKeywords = Object.entries(keywords).sort((a, b) => b[1] - a[1]);

    if (sortedKeywords.length > 2) return ` ${sortedKeywords[0][0]}, ${sortedKeywords[1][0]}, and ${sortedKeywords.length - 2} others`;

    if (sortedKeywords.length === 2) return ` ${sortedKeywords[0][0]} and ${sortedKeywords[1][0]}`;

    if (sortedKeywords.length === 1) return " " + sortedKeywords[0][0];

    return 'No keywords found.'
  
  }

  return (
    <section className="saved-news-header">
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <div className="saved-news-header__text-wrapper">
        <p className="saved-news-header__intro">Saved articles</p>
        <h1 className="saved-news-header__title">
          {`${user.name}, you have ${articles.length} saved articles`}
        </h1>
        <p className="saved-news-header__keywords">
          By keywords:
          <span className="saved-news-header__keywords-listed">{determineKeywords()}</span>
        </p>
      </div>
    </section>
  );
};

export default SavedNewsHeader;
