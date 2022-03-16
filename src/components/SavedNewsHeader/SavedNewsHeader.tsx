import React from 'react';
import Header from '../Header/Header';
import './SavedNewsHeader.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useContext } from 'react';
import { Articles, User } from '../../shared/types';

interface Props {
  articles: Articles;
  isLoggedIn: boolean;
  handleLogout: () => void;
}

interface Keywords {
  [k: string]: number;
}

const SavedNewsHeader = ({
  articles,
  isLoggedIn,
  handleLogout,
}: Props): JSX.Element => {
  const user: User | null = useContext(CurrentUserContext);

  const determineKeywords = (): string => {
    const keywords: Keywords = {};

    articles.cards.forEach((article) =>
      keywords[article.keyword]
        ? keywords[article.keyword]++
        : (keywords[article.keyword] = 1)
    );

    const sortedKeywords = Object.entries(keywords).sort((a, b) => b[1] - a[1]);

    if (sortedKeywords.length > 2)
      return ` ${sortedKeywords[0][0]}, ${sortedKeywords[1][0]}, and ${
        sortedKeywords.length - 2
      } others`;

    if (sortedKeywords.length === 2)
      return ` ${sortedKeywords[0][0]} and ${sortedKeywords[1][0]}`;

    if (sortedKeywords.length === 1) return ' ' + sortedKeywords[0][0];

    return 'No keywords found.';
  };

  return (
    <section className='saved-news-header'>
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <div className='saved-news-header__text-wrapper'>
        <p className='saved-news-header__intro'>Saved articles</p>
        <h1 className='saved-news-header__title'>
          {`${user !== null ? user.name : 'User'}, you have ${
            articles.cards.length
          } saved articles`}
        </h1>
        <p className='saved-news-header__keywords'>
          By keywords:
          <span className='saved-news-header__keywords-listed'>
            {determineKeywords()}
          </span>
        </p>
      </div>
    </section>
  );
};

export default SavedNewsHeader;
