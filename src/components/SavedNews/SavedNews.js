import React from 'react';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';
import Footer from '../Footer/Footer';

const SavedNews = ({ savedCards, isLoggedIn, handleLogout, name }) => {
  return (
    <div className="saved-news">
      <SavedNewsHeader
        name={name}
        isLoggedIn={isLoggedIn}
        savedArticles={[]}
        handleLogout={handleLogout}
      />
      <NewsCardList cards={savedCards} />
      <Footer />
    </div>
  );
};

export default SavedNews;
