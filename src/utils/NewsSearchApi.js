const checkResponse = (res) => {
  console.log(res);
  return res.ok
    ? res.json()
    : Promise.reject(`Error: ${res.status} - ${res.message}`);
};

const fetchNews = (searchString) => {
  const toDate = new Date().toISOString();
  const fromDate = new Date(
    new Date().getTime() - 7 * 24 * 60 * 60 * 1000
  ).toISOString();
  const apiKey = '444eb4b36be849fabd97c1d959391725';

  const url = `https://newsapi.org/v2/everything?q=${searchString}&from=${fromDate}&to=${toDate}&pageSize=100`;

  const init = {
    method: 'GET',
    headers: {
      'X-Api-Key': apiKey,
    },
  };

  return fetch(url, init).then(checkResponse);
};

export default fetchNews;
