import React from 'react';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';
import Footer from '../Footer/Footer';

const SavedNews = ({
  articles,
  isLoggedIn,
  handleLogout,
  name,
}) => {
  return (
    <div className="saved-news">
      <SavedNewsHeader
        name={name}
        isLoggedIn={isLoggedIn}
        articles={articles}
        handleLogout={handleLogout}
      />
      <NewsCardList articles={articles} />
      <Footer />
    </div>
  );
};

export default SavedNews;
