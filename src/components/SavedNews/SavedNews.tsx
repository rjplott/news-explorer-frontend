import React from 'react';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';
import Footer from '../Footer/Footer';

const SavedNews = ({
  savedArticles,
  isLoggedIn,
  handleLogout,
  handleUnsaveCard
}) => {


  return (
    <div className="saved-news">
      <SavedNewsHeader
        isLoggedIn={isLoggedIn}
        articles={savedArticles}
        handleLogout={handleLogout}
      />
      <NewsCardList
        articles={savedArticles}
        handleUnsaveCard={handleUnsaveCard}
      />
      <Footer />
    </div>
  );
};

export default SavedNews;
