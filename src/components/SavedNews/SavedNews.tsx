import * as React from 'react';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';
import Footer from '../Footer/Footer';
import { Articles } from '../../shared/types';

export type SavedNewsProps = {
  savedArticles: Articles;
  isLoggedIn: boolean;
  handleLogout: () => void;
  handleUnsaveCard: (
    id: string,
    setId: React.Dispatch<React.SetStateAction<string>>
  ) => void;
};

const SavedNews = ({
  savedArticles,
  isLoggedIn,
  handleLogout,
  handleUnsaveCard,
}: SavedNewsProps): JSX.Element => {
  const path = 'saved-news';

  return (
    <div className='saved-news'>
      <SavedNewsHeader
        isLoggedIn={isLoggedIn}
        articles={savedArticles}
        handleLogout={handleLogout}
      />
      <NewsCardList
        articles={savedArticles}
        handleUnsaveCard={handleUnsaveCard}
        path={path}
      />
      <Footer />
    </div>
  );
};

export default SavedNews;
