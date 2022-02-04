import React from 'react';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';
import Footer from '../Footer/Footer';

const SavedNews = ({ savedCards }) => {
  return (
    <div className="saved-news">
      <SavedNewsHeader user="Joe" savedArticles={[]} />
      <NewsCardList cards={savedCards} />
      <Footer />
    </div>
  );
};

export default SavedNews;
