import React from 'react';
import Header from '../Header/Header';
import './SavedNewsHeader.css';

const SavedNewsHeader = ({ name, articles, isLoggedIn, handleLogout }) => {

  const determineKeywords = () => {
    const keywords = articles.displayedCards.reduce((keywordArray, currArticle) => {
      if (keywordArray.indexOf(currArticle.tag) < 0) {
        keywordArray.push(currArticle.tag);
      }

      return keywordArray;
    }, []);

    if (keywords.length > 2) return ` ${keywords[0]}, ${keywords[1]}, and ${keywords.length - 2} others`;

    if (keywords.length === 2) return ` ${keywords[0]} and ${keywords[1]}`;

    if (keywords.length === 1) return " " + keywords[0];

    return 'No keywords found.'
  
  }

  return (
    <section className="saved-news-header">
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} name={name} />
      <div className="saved-news-header__text-wrapper">
        <p className="saved-news-header__intro">Saved articles</p>
        <h1 className="saved-news-header__title">
          {`${name}, you have ${articles.displayedCards.length} saved articles`}
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
