import React from 'react';
import Header from '../Header/Header';
import './SavedNewsHeader.css';

const SavedNewsHeader = ({ user, savedArticles }) => {
  return (
    <section className="saved-news-header">
      <Header route="saved-news" />
      <div className="saved-news-header__text-wrapper">
        <p className="saved-news-header__intro">Saved articles</p>
        <h1 className="saved-news-header__title">
          {`${user}, you have ${savedArticles.length} saved articles`}
        </h1>
        <p className="saved-news-header__keywords">
          By keywords:
          <span className="saved-news-header__keywords-listed"> Geography</span>
        </p>
      </div>
    </section>
  );
};

export default SavedNewsHeader;
