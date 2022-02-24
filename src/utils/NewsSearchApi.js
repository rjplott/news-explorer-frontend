import checkResponse from './apiHelpers';

const fetchNews = (searchString) => {
  const toDate = new Date().toISOString();
  const fromDate = new Date(
    new Date().getTime() - 7 * 24 * 60 * 60 * 1000
  ).toISOString();
  const apiKey = '444eb4b36be849fabd97c1d959391725';

  const url = `https://nomoreparties.co/news/v2/everything?q=${searchString}&from=${fromDate}&to=${toDate}&pageSize=100&apiKey=${apiKey}`;

  const init = {
    method: 'GET',
  };

  return fetch(url, init).then(checkResponse);
};

export default fetchNews;
